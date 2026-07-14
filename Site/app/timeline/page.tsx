import type { Metadata } from "next";
import { getWorks, getCV } from "@/lib/data";
import { workHero } from "@/lib/workHero";
import { Timeline, type TLItem } from "@/components/Timeline";
import { HonorariaStrip } from "@/components/HonorariaStrip";
import { CharlieIsm } from "@/components/CharlieIsm";

export const metadata: Metadata = {
  title: "30 Years of Tomfoolery",
  description: "The arc of Charlie “Blackcat” Smith's work, 2000–2026 — drag through the lineage.",
};

export default function TimelinePage() {
  const items: TLItem[] = getWorks()
    .filter((w) => w.year_start)
    .sort((a, b) => Number(a.year_start) - Number(b.year_start))
    .map((w) => ({ id: w.work_id, title: w.title, year: w.year_start!, type: w.type, hero: workHero(w.work_id) }));

  return (
    <div className="py-12">
      <div className="mx-auto max-w-5xl px-5">
        <h1 className="font-display text-6xl font-700 uppercase sm:text-8xl">30 Years of <span className="ember-text">Tomfoolery</span></h1>
        <div className="forge-rule mt-3 w-48" />
        <p className="mt-4 max-w-2xl text-lg text-[--color-ink-dim]">
          One deep pattern, remade in new bodies for three decades. Grab and drag through the arc — HEARTH (2000) to the Burning Book (2026).
        </p>
      </div>

      <div className="mt-10">
        <Timeline items={items} />
      </div>

      <div className="mt-12">
        <HonorariaStrip years={getCV().honoraria_grant_years} label={getCV().honoraria_label} />
      </div>

      <div className="mx-auto mt-16 max-w-5xl px-5">
        <CharlieIsm />
      </div>
    </div>
  );
}
