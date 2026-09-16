import { cn } from "@/lib/utils";

export function PullQuote({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-indigo-950 py-14", className)}>
      <span className="absolute -top-6 left-6 select-none font-display text-[8rem] leading-none text-white/10 sm:left-16">
        &ldquo;
      </span>
      <p className="relative mx-auto max-w-2xl px-6 text-center font-display text-2xl font-bold leading-snug text-white sm:text-3xl">
        {children}
      </p>
    </div>
  );
}
