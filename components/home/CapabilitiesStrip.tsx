import { Target, PenTool, BookOpen, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

const ITEMS = [
  { icon: Target, label: "Strategy", body: "Clarity for a stronger tomorrow." },
  { icon: PenTool, label: "Design", body: "Ideas that look right and work." },
  { icon: BookOpen, label: "Books", body: "Remarkable books for lasting impact." },
  { icon: BarChart3, label: "Results", body: "From insight to measurable impact." },
];

export function CapabilitiesStrip({ className }: { className?: string }) {
  return (
    <div className={cn("grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4 sm:gap-x-0", className)}>
      {ITEMS.map((item, i) => (
        <div
          key={item.label}
          className={cn(
            "px-0 sm:px-5",
            i > 0 && "sm:border-l sm:border-indigo/15"
          )}
        >
          <item.icon className="h-6 w-6 text-saffron" strokeWidth={1.75} />
          <p className="mt-2 font-display text-sm font-extrabold uppercase tracking-wide text-indigo">
            {item.label}
          </p>
          <p className="mt-0.5 text-xs leading-snug text-ink/60">{item.body}</p>
        </div>
      ))}
    </div>
  );
}
