type Props = {
  /** Path prefix without extension, e.g. "/img/hero-charcoal". */
  base: string;
  widths: number[];
  alt: string;
  /** Rendered box ratio "w/h" — matches the CSS aspect-ratio on the element. */
  aspect: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

/** Reference intrinsic width, used only to derive honest width/height attrs. */
const REF_WIDTH = 1200;

/**
 * Local WebP with a real srcset. `aspect` must match the ratio the CSS paints
 * at, so the width/height attributes reserve exactly that space and the page
 * never shifts while images load.
 */
export default function Img({
  base,
  widths,
  alt,
  aspect,
  sizes,
  priority = false,
  className,
}: Props) {
  const [rw, rh] = aspect.split("/").map(Number) as [number, number];
  const height = Math.round((REF_WIDTH * rh) / rw);
  const largest = widths[widths.length - 1];

  return (
    <img
      className={className}
      src={`${base}-${largest}.webp`}
      srcSet={widths.map((width) => `${base}-${width}.webp ${width}w`).join(", ")}
      sizes={sizes}
      alt={alt}
      width={REF_WIDTH}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      // The hero image is the LCP element: fetch it early, do not lazy it.
      fetchPriority={priority ? "high" : "auto"}
    />
  );
}