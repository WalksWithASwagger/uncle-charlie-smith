import type { Metadata } from "next";
import Link from "next/link";
import { getTagCounts, getWorks } from "@/lib/data";
import { imageForTag } from "@/lib/people";
import { displayUrl } from "@/lib/images";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Motifs",
  description: "The recurring vocabulary of Charlie's contraptionism — fire cauldrons, teeter-totters, mythic hybrids, log-sacrifice, congregation.",
};

// the load-bearing motifs (the rest are scene/source tags)
const CORE = [
  "contraptionism", "fire-cauldron", "mythic-hybrid", "community-built", "congregation",
  "teeter-totter", "log-sacrifice", "heart", "heartbeat", "book", "rooster", "jackal-rooster",
  "bird", "bull", "infant", "clown", "inner-child", "symbol-system", "seven", "sun", "time",
  "memorial", "transformation", "reused-components",
];

export default function MotifsPage() {
  const counts = new Map(getTagCounts().map((t) => [t.tag, t.count]));
  const motifs = CORE.filter((m) => counts.has(m)).map((m) => ({ tag: m, count: counts.get(m)! }));
  const works = getWorks();

  return (
    <div className="mx-auto max-w-4xl px-5 py-12">
      <h1 className="font-display text-6xl font-700 uppercase sm:text-8xl">Mo<span className="ember-text">tifs</span></h1>
      <div className="forge-rule mt-3 w-40" />
      <p className="mt-5 max-w-2xl leading-relaxed text-[--color-ink-dim]">
        Contraptionism is <span className="ember-text">ritual-scale, community-built, kinetic fire
        sculpture where the machine exists to make people gather, move, feed, witness, and remember
        together</span>. These are the recurring threads — the vocabulary that runs across 30 years
        of work. Click any to see the frames.
      </p>

      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {motifs.map((m) => {
          const img = imageForTag(m.tag);
          return (
            <Link
              key={m.tag}
              href={`/gallery?tag=${m.tag}`}
              className="group relative aspect-[4/3] overflow-hidden rounded-sm border-2 border-[--color-line] bg-[--color-bg-2] transition hover:border-[--color-ember]"
            >
              {img && (
                <Image src={displayUrl(img.path)} alt={m.tag} fill sizes="(max-width:640px) 50vw, 25vw" className="object-cover opacity-60 transition duration-500 group-hover:scale-110 group-hover:opacity-90" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3">
                <div className="font-display text-base uppercase leading-tight text-[--color-ink] group-hover:text-[--color-ember-bright]">{m.tag}</div>
                <div className="font-mono text-[10px] text-[--color-flame]">{m.count} frames →</div>
              </div>
            </Link>
          );
        })}
      </div>

      <h2 className="mt-14 font-display text-2xl uppercase">By work</h2>
      <div className="forge-rule mt-2 w-24" />
      <div className="mt-5 space-y-3">
        {works
          .filter((w) => w.motifs.length)
          .map((w) => (
            <div key={w.work_id} className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-[--color-line] pb-2">
              <Link href={`/works/${w.work_id}`} className="font-display text-sm uppercase text-[--color-ink] hover:text-[--color-ember-bright]">
                {w.title}
              </Link>
              <span className="font-mono text-[10px] text-[--color-steel]">
                {w.motifs.join(" · ")}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}
