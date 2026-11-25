import { img, dims } from "@/lib/util";

// Plain responsive <img> for local photos. Eager only above the fold.
export default function Pic({ name, alt, className, eager, sizes = "(max-width: 760px) 100vw, 50vw", style }) {
  const d = dims(name);
  return (
    <img
      src={img(name)}
      alt={alt || ""}
      width={d.width}
      height={d.height}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={eager ? "high" : undefined}
      sizes={sizes}
      className={className}
      style={style}
    />
  );
}
