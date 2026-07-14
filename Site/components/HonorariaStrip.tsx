// Burning Man Honoraria & Global Arts Grant years as a row of torn ticket stubs.
// Presentational + server-safe; motion is pure CSS (hover flicker), so it respects
// prefers-reduced-motion via globals.css.

export function HonorariaStrip({
  years,
  label = "Burning Man Honoraria & Global Arts Grants",
}: {
  years: number[];
  label?: string;
}) {
  return (
    <div className="grain relative border-y-2 border-[--color-line] bg-[--color-bg-2] py-8">
      <div className="mx-auto max-w-6xl px-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[--color-flame]">
          {label}
        </p>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {years.map((y, i) => (
            <span
              key={y}
              className={`sticker rounded-sm border border-[--color-ember]/50 bg-[--color-bg] px-3 py-1.5 font-display text-lg font-700 text-[--color-ember-bright] transition-colors hover:bg-[--color-ember] hover:text-[--color-bg] ${
                i % 2 ? "tilt-r" : "tilt-l"
              }`}
            >
              ’{String(y).slice(2)}
            </span>
          ))}
        </div>
        <p className="mt-4 font-mono text-[10px] text-[--color-steel]">
          {years.length} grant/honorarium years · {years[0]}–{years[years.length - 1]} (gaps: 2006, 2009, 2010)
        </p>
      </div>
    </div>
  );
}
