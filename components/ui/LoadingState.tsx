export function LoadingState({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-ink/60">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-50 border-t-indigo" />
      <p className="text-sm">{label}</p>
    </div>
  );
}
