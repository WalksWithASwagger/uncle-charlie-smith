import type { Metadata } from "next";
import { getWorks } from "@/lib/data";
import { PressClient } from "@/components/PressClient";

export const metadata: Metadata = {
  title: "Press Kit",
  description: "Generate a one-page press, grant, or sponsor kit for any of Charlie's works.",
};

export default function PressPage() {
  const works = getWorks()
    .filter((w) => w.confidence !== "low")
    .map((w) => ({ id: w.work_id, title: w.title, year: w.year_start }));
  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <h1 className="font-display text-6xl font-700 uppercase sm:text-7xl">Press <span className="ember-text">Kit</span></h1>
      <div className="forge-rule mt-3 w-40" />
      <p className="mt-3 text-sm text-[--color-ink-dim]">
        Pick a work and an audience — get a grounded one-pager drawn straight from the archive. Print
        it or save as PDF. Tuned first for <span className="ember-text">Burning Book 2026</span>{" "}
        fundraising.
      </p>
      <PressClient works={works} />
    </div>
  );
}
