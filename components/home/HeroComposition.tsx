import { DiagonalCorner } from "@/components/ui/DiagonalCorner";

const SPINES = [
  { label: "STRATEGY", bg: "#1B1C4D" },
  { label: "DESIGN", bg: "#EB7C05" },
  { label: "BOOKS", bg: "#3D3F9E" },
];

export function HeroComposition() {
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-gradient-to-br from-indigo-950 via-indigo-900 to-indigo-800 sm:aspect-[4/3] lg:aspect-[3/4]">
      <DiagonalCorner />

      {/* warm horizon glow, echoing the banner's sunset skyline */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-saffron/25 via-saffron/5 to-transparent" />

      {/* abstract skyline silhouette */}
      <div className="absolute inset-x-0 bottom-0 flex h-1/3 items-end gap-1.5 px-6 opacity-60">
        {[38, 60, 46, 72, 30, 55, 42, 65, 34].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-sm bg-indigo-950/80"
            style={{ height: `${h}%` }}
          >
            <div className="flex flex-wrap gap-1 p-1 pt-2 opacity-40">
              {Array.from({ length: 3 }).map((_, j) => (
                <span key={j} className="h-1 w-1 rounded-full bg-saffron" />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* lotus watermark, oversized and faint */}
      <svg
        viewBox="0 0 400 400"
        className="absolute -right-16 -top-16 h-64 w-64 opacity-[0.08]"
        aria-hidden="true"
      >
        <g stroke="#FFFFFF" strokeWidth="2" fill="none">
          {[0, 90, 180, 270].map((angle) => (
            <path
              key={angle}
              d="M200,200 C230,160 230,120 200,80 C170,120 170,160 200,200 Z"
              transform={`rotate(${angle} 200 200)`}
            />
          ))}
        </g>
      </svg>

      {/* stacked book "spines" — our three pillars, standing in for the
          banner's stacked books, tilted for depth */}
      <div className="absolute bottom-10 left-8 flex -rotate-3 flex-col shadow-2xl sm:bottom-12 sm:left-10">
        {SPINES.map((spine, i) => (
          <div
            key={spine.label}
            className="flex h-11 w-40 items-center border-b border-black/10 pl-4 shadow-lg sm:h-12 sm:w-48"
            style={{ backgroundColor: spine.bg, zIndex: SPINES.length - i }}
          >
            <span className="font-display text-[11px] font-extrabold tracking-[0.2em] text-white/90 sm:text-xs">
              {spine.label}
            </span>
          </div>
        ))}
      </div>

      {/* floating card — stands in for the banner's branded mug */}
      <div className="absolute bottom-24 right-6 w-32 -rotate-2 rounded-lg bg-ink/90 p-3 shadow-xl backdrop-blur sm:right-10 sm:w-36">
        <p className="font-display text-[10px] font-bold uppercase leading-tight tracking-wide text-white sm:text-[11px]">
          Ideas
          <br />
          People
          <br />
          Books
          <br />
          <span className="text-saffron">A brighter tomorrow</span>
        </p>
        <span className="mt-2 block h-px w-6 bg-saffron" />
      </div>
    </div>
  );
}
