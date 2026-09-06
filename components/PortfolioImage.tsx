import type { PortfolioImage as ImageData } from "@/data/portfolio";
import { getImageVariants } from "@/lib/images";

interface Props extends ImageData {
  className?: string;
  sizes: string;
  priority?: boolean;
}

// A server-rendered img needs no hydration or image server. Responsive files
// ship in out/; the exact original Supabase src remains the fallback.
export default function PortfolioImage({
  src,
  alt,
  width,
  height,
  sizes,
  className,
  priority = false,
}: Props) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- Static srcset supplies optimized images without a server or client component.
    <img
      src={src}
      srcSet={getImageVariants(src).srcSet}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      style={
        priority || className === "experience-logo"
          ? undefined
          : { aspectRatio: `${width} / ${height}` }
      }
      className={className}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
    />
  );
}
