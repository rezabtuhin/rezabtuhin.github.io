import variants from "@/data/image-variants.json";

interface Variant {
  src: string;
  width: number;
  bytes: number;
}
const manifest: Record<string, Variant[]> = variants;

// These slot sizes mirror the original CSS, including borders and section padding.
export const imageSizes = {
  portrait:
    "(max-width: 365px) calc(100vw - 86px), (max-width: 860px) 280px, (max-width: 960px) 230px, 280px",
  publication:
    "(max-width: 516px) calc(100vw - 86px), (max-width: 860px) 430px, 280px",
  company: "100px",
  project:
    "(max-width: 860px) calc(100vw - 88px), (max-width: 960px) calc((100vw - 120px) / 2), (max-width: 1148px) calc((100vw - 136px) / 2), 505px",
  certification: "220px",
  book: "(max-width: 600px) calc((100vw - 102px) / 2), (max-width: 860px) calc((100vw - 146px) / 4), (max-width: 960px) calc((100vw - 158px) / 4), (max-width: 1148px) calc((100vw - 214px) / 6), 156px",
} as const;

export function getImageVariants(src: string) {
  const images = manifest[src];
  return {
    srcSet: images?.map((image) => `${image.src} ${image.width}w`).join(", "),
    preloadSrc: images?.[images.length - 1]?.src ?? src,
  };
}
