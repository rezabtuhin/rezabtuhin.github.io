import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, access, readdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const original = await readFile(path.join(root, "grid-portfolio.html"), "utf8");
assert.equal(
  createHash("sha256").update(original).digest("hex"),
  "35e380e85ba699bdedd421d32b9465ed74e2887f8d6b047c9b7f1a0b4ad2e085",
  "Original HTML must remain unchanged",
);
const html = await readFile(path.join(root, "out/index.html"), "utf8");
const markup = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
function decode(value) {
  return value.replace(
    /&(?:amp|lt|gt|quot|apos|#39|#x27|#8599);/g,
    (entity) =>
      ({
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&apos;": "'",
        "&#39;": "'",
        "&#x27;": "'",
        "&#8599;": "↗",
      })[entity],
  );
}
const text = (value) =>
  decode(value.replace(/<[^>]*>/g, "")).replace(/\s+/g, "");
for (const element of ["main", "footer"]) {
  const pattern = new RegExp(`<${element}\\b[^>]*>([\\s\\S]*?)<\\/${element}>`);
  assert.equal(
    text(markup.match(pattern)[1]),
    text(original.match(pattern)[1]),
    `${element} content must match the original exactly`,
  );
}
const ids = [...markup.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
assert.equal(new Set(ids).size, ids.length, "No duplicate IDs");
for (const match of markup.matchAll(/\bhref="#([^"]+)"/g))
  assert(ids.includes(match[1]), `Missing anchor ${match[1]}`);
assert.equal([...markup.matchAll(/<h1[\s>]/g)].length, 1, "Exactly one h1");
const sourceBody = original.match(/<body>([\s\S]*?)<script>/)[1];
for (const match of sourceBody.matchAll(/\b(href|src)="([^"]+)"/g)) {
  assert(
    decode(markup).includes(`${match[1]}="${decode(match[2])}"`),
    `Source URL changed: ${match[2]}`,
  );
}
for (const match of markup.matchAll(
  /<(?:img|link|script)\b[^>]*(?:src|href)="(\/_next\/[^"?]+)[^"]*"/g,
))
  await access(path.join(root, "out", match[1]));
assert.equal(
  [...markup.matchAll(/as="font"/g)].length,
  2,
  "Both local fonts must preload",
);
for (const file of ["robots.txt", "sitemap.xml", "icon.svg", ".nojekyll"])
  await access(path.join(root, "out", file));
const imageVariants = JSON.parse(
  await readFile(path.join(root, "data/image-variants.json"), "utf8"),
);
assert.equal(
  Object.keys(imageVariants).length,
  15,
  "Every source image must have static responsive variants",
);
for (const [source, variants] of Object.entries(imageVariants)) {
  assert(
    markup.includes(source),
    "Original image URL must remain available as fallback",
  );
  for (const variant of variants) {
    assert(variant.src.startsWith("/images/optimized/"));
    await access(path.join(root, "out", variant.src));
    assert(
      markup.includes(variant.src),
      "Generated image must be referenced by srcset",
    );
  }
}
const jsonLd = JSON.parse(
  html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1],
);
assert.equal(jsonLd["@type"], "Person");
assert.equal(jsonLd.sameAs.length, 3);
assert(
  /rel="canonical" href="https:\/\/rezabtuhin\.github\.io\/?"/.test(markup),
);
async function inspect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) await inspect(filename);
    else if (/\.(html|css|xml|txt)$/.test(entry.name)) {
      const content = await readFile(filename, "utf8");
      // Framework diagnostics in JavaScript bundles are not site destinations.
      assert(
        !/https?:\/\/(?:localhost|127\.0\.0\.1)|file:\/\//i.test(content),
        `Local URL in ${filename}`,
      );
      assert(
        !/fonts\.(?:googleapis|gstatic)\.com/.test(content),
        `External Google Font in ${filename}`,
      );
    }
  }
}
await inspect(path.join(root, "out"));
console.log(
  "Static export verified: unchanged source, exact main/footer content and URLs, anchors, unique IDs, local font preloads, metadata, robots, sitemap, favicon, and portable static files.",
);
