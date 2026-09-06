import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, access, readdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
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
// CI verifies the deployable artifact without requiring the ignored legacy HTML.
for (const element of ["main", "footer"]) {
  const pattern = new RegExp(`<${element}\\b[^>]*>([\\s\\S]*?)<\\/${element}>`);
  assert(markup.match(pattern)?.[1].trim(), `Missing ${element} content`);
}
const ids = [...markup.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
assert.equal(new Set(ids).size, ids.length, "No duplicate IDs");
for (const match of markup.matchAll(/\bhref="#([^"]+)"/g))
  assert(ids.includes(match[1]), `Missing anchor ${match[1]}`);
assert.equal([...markup.matchAll(/<h1[\s>]/g)].length, 1, "Exactly one h1");
// The strict one-time migration comparison remains available as an explicit
// local command. Missing or changed source HTML still fails that command.
if (process.argv.includes("--compare-original")) {
  const original = await readFile(path.join(root, "grid-portfolio.html"), "utf8");
  assert.equal(
    createHash("sha256").update(original).digest("hex"),
    "35e380e85ba699bdedd421d32b9465ed74e2887f8d6b047c9b7f1a0b4ad2e085",
    "Original HTML must remain unchanged",
  );
  for (const element of ["main", "footer"]) {
    const pattern = new RegExp(`<${element}\\b[^>]*>([\\s\\S]*?)<\\/${element}>`);
    assert.equal(
      text(markup.match(pattern)[1]),
      text(original.match(pattern)[1]),
      `${element} content must match the original exactly`,
    );
  }
  const sourceBody = original.match(/<body>([\s\S]*?)<script>/)[1];
  // The owner supplied their exact Scholar profile after the migration.
  // Preserve the original HTML while recognizing this authorized link update.
  const updatedUrls = new Map([
    [
      "https://scholar.google.com/scholar?q=%22Rezab+Ud+Dawla%22",
      "https://scholar.google.com/citations?user=8CsMgtMAAAAJ&hl=en&oi=ao",
    ],
  ]);
  for (const match of sourceBody.matchAll(/\b(href|src)="([^"]+)"/g)) {
    const originalUrl = decode(match[2]);
    const expectedUrl = updatedUrls.get(originalUrl) ?? originalUrl;
    assert(
      decode(markup).includes(`${match[1]}="${expectedUrl}"`),
      `Expected URL missing: ${expectedUrl}`,
    );
  }
  console.log("Migration comparison verified: unchanged original HTML, exact main/footer content and URLs with documented owner updates.");
}
for (const match of html.matchAll(
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
  "Static export verified: main/footer content, anchors, unique IDs, responsive images, local scripts and fonts, metadata, robots, sitemap, favicon, and portable static files.",
);
