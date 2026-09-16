export function DiagonalCorner({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none absolute left-0 top-0 h-28 w-28 ${className}`}
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
    >
      <path d="M0 0H120L0 90V0Z" fill="#EB7C05" />
      <path d="M0 0H55L0 42V0Z" fill="#1B1C4D" />
    </svg>
  );
}
