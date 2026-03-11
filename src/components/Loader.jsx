// ─── Loader (Amazon-style) ───────────────────────────────────────────

export default function Loader({ fullPage = true }) {
  const spinner = (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 border-4 border-[#FF9900]/20 rounded-full" />
        <div className="absolute inset-0 border-4 border-transparent border-t-[#FF9900] rounded-full animate-spin" />
      </div>
      <p className="text-sm text-gray-500 font-medium">Loading...</p>
    </div>
  );

  if (!fullPage) return spinner;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F1111]">
      {spinner}
    </div>
  );
}
