import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import {
  portrait,
  publications,
  industryExperience,
  projects,
  certifications,
  books,
} from "../data/portfolio.ts";

// Generated assets are committed. Ordinary builds stay offline and reproducible.
// Regenerate explicitly after changing images in data/portfolio.ts.
const root = path.resolve(import.meta.dirname, "..");
const output = path.join(root, "public/images/optimized");
await mkdir(output, { recursive: true });
const groups = [
  { images: [portrait], widths: [280, 560, 840], quality: 88 },
  {
    images: publications.map((x) => x.image),
    widths: [280, 430, 560, 860, 1290],
    quality: 95,
  },
  {
    images: industryExperience.map((x) => x.image),
    widths: [100, 200, 300],
    quality: 90,
  },
  {
    images: projects.map((x) => x.image),
    widths: [320, 480, 768, 1024, 1536, 2048],
    quality: 95,
  },
  {
    images: certifications.map((x) => x.image),
    widths: [220, 440, 660],
    quality: 95,
  },
  {
    images: books.map((x) => x.image),
    widths: [160, 240, 320, 480, 640, 800],
    quality: 90,
  },
];
const manifest = {};
const measurements = [];
// Optional local cache is only an authoring convenience, never a build input.
const cacheFile = process.env.PORTFOLIO_IMAGE_CACHE;
const cache = cacheFile ? JSON.parse(await readFile(cacheFile, "utf8")) : [];
for (const group of groups) {
  for (const image of group.images) {
    const cached = cache.find((entry) => entry.src === image.src);
    let source;
    if (cached) source = await readFile(cached.path);
    else {
      const response = await fetch(image.src, {
        signal: AbortSignal.timeout(45000),
      });
      if (!response.ok)
        throw new Error(
          `Could not fetch ${image.alt}: HTTP ${response.status}`,
        );
      source = Buffer.from(await response.arrayBuffer());
    }
    const metadata = await sharp(source).metadata();
    if (metadata.width !== image.width || metadata.height !== image.height) {
      throw new Error(
        `Image dimensions changed for ${image.alt}; update portfolio.ts before regenerating.`,
      );
    }
    const widths = [
      ...new Set(group.widths.map((width) => Math.min(width, image.width))),
    ];
    const variants = [];
    for (const width of widths) {
      const bytes = await sharp(source)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: group.quality, effort: 6, smartSubsample: true })
        .toBuffer();
      // Content-addressed names change whenever the encoded image changes.
      const hash = createHash("sha256")
        .update(bytes)
        .digest("hex")
        .slice(0, 16);
      const filename = `${hash}-${width}.webp`;
      await writeFile(path.join(output, filename), bytes);
      variants.push({
        src: `/images/optimized/${filename}`,
        width,
        bytes: bytes.length,
      });
    }
    manifest[image.src] = variants;
    measurements.push({
      alt: image.alt,
      originalBytes: source.length,
      variants: variants.map(({ width, bytes }) => ({ width, bytes })),
    });
  }
}
await writeFile(
  path.join(root, "data/image-variants.json"),
  JSON.stringify(manifest, null, 2) + "\n",
);
await writeFile(
  path.join(root, "docs/image-sizes.json"),
  JSON.stringify(measurements, null, 2) + "\n",
);
console.log(
  `Generated responsive variants for ${measurements.length} images. Original URLs remain untouched.`,
);
