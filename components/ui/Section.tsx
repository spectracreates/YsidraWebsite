import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function Section({
  children,
  className,
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  tone?: "light" | "parchment" | "indigo";
}) {
  const toneClass =
    tone === "parchment"
      ? "bg-parchment"
      : tone === "indigo"
      ? "bg-indigo text-white"
      : "bg-white";
  return (
    <section className={cn("py-16 md:py-24", toneClass, className)}>
      {children}
    </section>
  );
}
