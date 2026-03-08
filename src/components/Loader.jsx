// ─── Loader Component ─────────────────────────────────────────────────
// Animated loading spinner for full-page and inline use.

export default function Loader({ fullPage = true }) {
  const spinner = (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-4 border-emerald-500/20 rounded-full" />
        <div className="absolute inset-0 border-4 border-transparent border-t-emerald-500 rounded-full animate-spin" />
      </div>
      <p className="text-sm text-gray-500 font-medium">Loading...</p>
    </div>
  );

  if (!fullPage) return spinner;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      {spinner}
    </div>
  );
}
