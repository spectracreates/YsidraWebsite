import { cn } from "@/lib/utils";

export function Badge({
  children,
  tone = "saffron",
  className,
}: {
  children: React.ReactNode;
  tone?: "saffron" | "indigo" | "neutral";
  className?: string;
}) {
  const toneClass =
    tone === "indigo"
      ? "bg-indigo-50 text-indigo"
      : tone === "neutral"
      ? "bg-parchment-200 text-ink"
      : "bg-saffron-50 text-saffron-600";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        toneClass,
        className
      )}
    >
      {children}
    </span>
  );
}
