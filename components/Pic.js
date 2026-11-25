import { img, srcSet, dims } from "@/lib/util";
import blur from "@/lib/blur.json";

// Responsive local photo: WebP at 480/800/1280 wide, browser picks the smallest that fits.
// A 16px blurred preview paints instantly underneath while the real photo downloads.
export default function Pic({ name, alt, className, eager, sizes = "(max-width: 760px) 100vw, 50vw", style }) {
  const d = dims(name);
  const ph = blur[name];
  return (
    <img
      src={img(name)}
      srcSet={srcSet(name)}
      sizes={sizes}
      alt={alt || ""}
      width={d.width}
      height={d.height}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={eager ? "high" : "auto"}
      className={className}
      style={ph ? { backgroundImage: `url(${ph})`, backgroundSize: "cover", backgroundPosition: "center", ...style } : style}
    />
  );
}
