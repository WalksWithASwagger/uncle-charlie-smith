// Honoraria/grant years as a light-up bulb board. CSS-only (flicker + hover ignite),
// so it's server-safe and respects prefers-reduced-motion via globals.css.

export function BulbBoard({
  years,
  label = "Burning Man Honoraria & Global Arts Grants",
}: {
  years: number[];
  label?: string;
}) {
  return (
    <div className="grain relative border-y-2 border-[--color-line] bg-[--color-bg-2] py-10">
      <div className="mx-auto max-w-5xl px-5">
        <p className="text-center font-mono text-[11px] uppercase tracking-[0.3em] text-[--color-flame]">
          {label}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {years.map((y, i) => (
            <span
              key={y}
              className="group relative grid h-14 w-14 place-items-center rounded-full border-2 border-[--color-ember]/40 bg-[--color-bg] font-display text-base font-700 text-[--color-ember-bright] transition-all duration-300 hover:scale-110 hover:border-[--color-ember] sm:h-16 sm:w-16 sm:text-lg"
              style={{
                boxShadow: "0 0 10px 0 rgba(255,122,46,0.45), inset 0 0 8px rgba(255,122,46,0.25)",
              }}
            >
              <span
                className="flicker"
                style={{ animationDelay: `${(i % 8) * 0.35}s` }}
              >
                ’{String(y).slice(2)}
              </span>
            </span>
          ))}
        </div>
        <p className="mt-6 text-center font-mono text-[10px] text-[--color-steel]">
          {years.length} lit · {years[0]}–{years[years.length - 1]} · dark years: 2006 · 2009 · 2010
        </p>
      </div>
    </div>
  );
}
