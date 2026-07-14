import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getWorks } from "@/lib/data";
import { workHero } from "@/lib/workHero";
import { displayUrl } from "@/lib/images";
import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";

export const metadata: Metadata = {
  title: "Works",
  description: "The 30-year menagerie of Charlie “Blackcat” Smith — fire cauldrons, teeter-totters, and mythic machines.",
};

export default function WorksPage() {
  const works = getWorks().sort((a, b) => Number(b.year_start ?? 0) - Number(a.year_start ?? 0));

  return (
    <div className="mx-auto max-w-7xl px-5 py-12">
      <h1 className="font-display text-6xl font-700 uppercase sm:text-8xl">The <span className="ember-text">Works</span></h1>
      <div className="forge-rule mt-3 w-48" />
      <p className="mt-4 max-w-2xl text-lg text-[--color-ink-dim]">
        {works.length} catalogued works, 2000–2026. Two carry an <span className="ember-text">unconfirmed</span> badge — surfaced from gallery titles, awaiting Charlie’s word.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {works.map((w, idx) => {
          const p = workHero(w.work_id) ?? "";
          const unconfirmed = w.confidence === "low" && w.status === "unconfirmed";
          return (
            <Reveal key={w.work_id} delay={(idx % 3) * 0.05}>
              <TiltCard rotate={idx % 2 ? 1 : -1} className="sticker h-full">
                <Link href={`/works/${w.work_id}`} className="group flex h-full flex-col overflow-hidden rounded-sm border-2 border-[--color-line] bg-[--color-bg-2] transition hover:border-[--color-ember]">
                  <div className="relative aspect-[3/2] bg-black">
                    {p ? (
                      <Image src={displayUrl(p)} alt={w.title} fill sizes="(max-width:640px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-110" />
                    ) : (
                      <div className="flex h-full items-center justify-center font-mono text-xs text-[--color-steel]">no photo yet</div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <h2 className="absolute inset-x-0 bottom-0 p-3 font-display text-2xl uppercase leading-none">{w.title}</h2>
                    {unconfirmed && (
                      <span className="absolute right-2 top-2 rounded-sm border-2 border-[--color-flame] bg-[--color-bg]/80 px-1.5 py-0.5 font-mono text-[9px] uppercase text-[--color-flame]">unconfirmed</span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-[--color-flame]">
                      {w.year_start ?? "—"}{w.year_end && w.year_end !== w.year_start ? `–${w.year_end}` : ""} · {w.type}
                    </p>
                    <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-[--color-ink-dim]">{w.description}</p>
                    <div className="mt-auto pt-3 font-mono text-[10px] text-[--color-steel]">{w.image_count} frame{w.image_count === 1 ? "" : "s"} →</div>
                  </div>
                </Link>
              </TiltCard>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
