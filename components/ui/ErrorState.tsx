export function ErrorState({
  title = "Something went wrong",
  description = "Please try again in a moment.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-card border border-red-100 bg-red-50 px-6 py-12 text-center">
      <h3 className="font-display text-lg font-bold text-red-700">{title}</h3>
      <p className="max-w-sm text-sm text-red-600/80">{description}</p>
    </div>
  );
}
