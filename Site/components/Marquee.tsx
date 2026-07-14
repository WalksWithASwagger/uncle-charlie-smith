// Infinite scrolling ticker. CSS-driven (animate-marquee translates -50%, so we
// render the items twice for a seamless loop). Pauses under reduced-motion via CSS.
export function Marquee({
  items,
  className = "",
  sep = "✦",
}: {
  items: string[];
  className?: string;
  sep?: string;
}) {
  const row = (
    <div className="flex shrink-0 items-center gap-6 pr-6">
      {items.map((t, i) => (
        <span key={i} className="flex items-center gap-6">
          <span>{t}</span>
          <span className="text-[--color-ember]">{sep}</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className={`flex overflow-hidden ${className}`} aria-hidden>
      <div className="flex animate-marquee whitespace-nowrap">
        {row}
        {row}
      </div>
    </div>
  );
}
