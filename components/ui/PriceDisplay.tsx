import { formatNaira } from "@/lib/utils";

export function PriceDisplay({
  amount,
  size = "md",
}: {
  amount: number;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClass =
    size === "lg" ? "text-2xl md:text-3xl" : size === "sm" ? "text-sm" : "text-lg";
  return (
    <span className={`font-display font-bold text-saffron ${sizeClass}`}>
      {formatNaira(amount)}
    </span>
  );
}
