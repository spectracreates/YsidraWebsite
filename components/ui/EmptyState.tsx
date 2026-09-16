import { ReactNode } from "react";

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-card border border-parchment-200 bg-parchment/60 px-6 py-16 text-center">
      <h3 className="font-display text-lg font-bold text-indigo">{title}</h3>
      {description && <p className="max-w-sm text-sm text-ink/70">{description}</p>}
      {action}
    </div>
  );
}
