import { cn } from "@/lib/utils";

/**
 * A large, low-opacity lotus-petal motif for background texture — echoes
 * the mood-board treatment in the approved brand guidelines (Close page)
 * without repeating the literal logo mark as decoration.
 */
export function LotusWatermark({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  const stroke = tone === "dark" ? "#FFFFFF" : "#2F3080";
  return (
    <svg
      className={cn("pointer-events-none absolute", className)}
      viewBox="0 0 400 400"
      fill="none"
      aria-hidden="true"
    >
      <g opacity={tone === "dark" ? 0.08 : 0.06} stroke={stroke} strokeWidth="1.5">
        {[0, 90, 180, 270].map((angle) => (
          <path
            key={angle}
            d="M200,200 C230,160 230,120 200,80 C170,120 170,160 200,200 Z"
            transform={`rotate(${angle} 200 200)`}
          />
        ))}
        <circle cx="200" cy="200" r="150" strokeDasharray="2 6" />
      </g>
    </svg>
  );
}
