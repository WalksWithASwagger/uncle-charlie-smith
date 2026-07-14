import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getWork, getWorkImages } from "@/lib/data";
import { workHero } from "@/lib/workHero";
import { displayUrl } from "@/lib/images";
import { ParallaxBand } from "@/components/ParallaxBand";
import { PhotoWall } from "@/components/PhotoWall";

export const metadata: Metadata = {
  title: "The Burning Book of Brian",
  description:
    "A 2026 memorial fire sculpture for Brian Doherty — a 14-15 ft open book with a pulsing LPG heart. Community-built at Sparseland Studios.",
};

const STATS: [keyof NonNullable<ReturnType<typeof getWork>>, string][] = [
  ["dimensions", "Dimensions"],
  ["materials", "Materials"],
  ["fire_system", "Fire system"],
  ["event", "Burn"],
];
const BEATS: [keyof NonNullable<ReturnType<typeof getWork>>, string][] = [
  ["interaction", "The interaction"],
  ["ritual", "The ritual"],
  ["crew_model", "The crew"],
];

export default function BurningBookPage() {
  const work = getWork("burning-book");
  const images = getWorkImages("burning-book");
  if (!work) return null;
  const heroP = workHero("burning-book");
  const featureP = images.find((i) => i.path !== heroP)?.path ?? heroP;

  return (
    <article>
      {/* HERO */}
      {heroP ? (
        <section className="relative flex h-[72vh] min-h-[440px] items-end overflow-hidden border-b-2 border-[--color-ember]">
          <Image src={displayUrl(heroP)} alt={work.title} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[--color-bg] from-28% via-[--color-bg]/65 via-60% to-[--color-bg]/15" />
          <HeroCaption />
        </section>
      ) : (
        <section className="relative flex h-[55vh] min-h-[380px] items-end overflow-hidden border-b-2 border-[--color-ember] bg-[--color-bg-2]">
          <HeroCaption />
        </section>
      )}

      {/* PITCH */}
      <section className="mx-auto max-w-4xl px-5 py-16">
        <p className="text-2xl leading-snug text-[--color-ink] sm:text-3xl">
          A memorial fire sculpture for <strong>Brian Doherty</strong> — author of <em>This Is Burning Man</em>,
          LA Cacophony Society member, the man Charlie met at{" "}
          <Link href="/works/hearth" className="ember-text">HEARTH in 2000</Link>. A {work.dimensions} open book
          exposing a human heart through its core, with an LPG flame that{" "}
          <span className="ember-text">pulses like a heartbeat</span>.
        </p>
      </section>

      {/* CAVEAT BAND */}
      <div className="border-y-2 border-[--color-flame]/50 bg-[--color-flame]/10">
        <p className="mx-auto max-w-4xl px-5 py-4 font-mono text-xs leading-relaxed text-[--color-flame]">
          ⚑ Status: an <strong>independent, community-funded memorial</strong> — NOT a verified 2026 Burning Man
          honorarium (not on the 75-project funded list). Registered, non-funded works can still receive placement
          & artist-liaison support.
        </p>
      </div>

      {/* FEATURE RENDER BAND */}
      {featureP && (
        <ParallaxBand path={featureP} dim={0.5} height="h-[70vh]">
          <p className="max-w-2xl font-display text-3xl uppercase leading-tight text-white sm:text-5xl">
            The heart, exposed through the book’s core — pumped by the people who came to remember.
          </p>
        </ParallaxBand>
      )}

      {/* STATS */}
      <section className="border-y-2 border-[--color-line] bg-[--color-bg-2]">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-px sm:grid-cols-4">
          {STATS.map(([k, label]) => {
            const v = work[k];
            if (!v || typeof v !== "string") return null;
            return (
              <div key={label} className="px-5 py-6">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[--color-ember]">{label}</div>
                <div className="mt-1 text-sm text-[--color-ink]">{v}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* STORY BEATS */}
      <section className="mx-auto max-w-4xl space-y-10 px-5 py-16">
        {BEATS.map(([k, label]) => {
          const v = work[k];
          if (!v || typeof v !== "string") return null;
          return (
            <div key={label} className="border-l-2 border-[--color-ember] pl-5">
              <h3 className="font-display text-xl uppercase text-[--color-flame]">{label}</h3>
              <p className="mt-2 text-lg leading-relaxed text-[--color-ink]">{v}</p>
            </div>
          );
        })}
        <p className="text-lg leading-relaxed text-[--color-ink-dim]">
          Built through community workshops at Sparseland Studios in Atlanta; 8–10 artists inscribe the book’s pages
          with designs, text, and symbolism. A Wednesday-night procession, tied to the Cacophony Society Cocktail
          Hour, ends in a one-time burn.
        </p>
      </section>

      {/* RENDERS WALL */}
      {images.length > 0 && (
        <section className="border-t-2 border-[--color-line] px-2 py-8">
          <div className="mx-auto mb-4 flex max-w-[1600px] items-baseline gap-3 px-3">
            <h2 className="font-display text-3xl uppercase">Renders & build drawings</h2>
            <span className="font-mono text-sm text-[--color-steel]">{images.length}</span>
          </div>
          <PhotoWall images={images} />
        </section>
      )}

      {/* CTA */}
      <section className="border-t-2 border-[--color-ember] bg-[--color-ember] py-16 text-center text-[--color-bg]">
        <h2 className="font-display text-4xl uppercase sm:text-6xl">Help build it</h2>
        <p className="mx-auto mt-3 max-w-xl px-5">
          The Burning Book is community-funded. Support the fabrication, fuel, and the crew that makes the heart beat.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3 font-mono text-xs uppercase tracking-wider">
          <a href="https://PayPal.Me/thewakingbird" className="sticker rounded-sm bg-[--color-bg] px-6 py-3 text-[--color-ink] transition hover:text-[--color-ember-bright]">Support the build →</a>
          <a href="https://www.sparceland.com/bbb26" className="sticker rounded-sm border-2 border-[--color-bg] px-6 py-3 transition hover:bg-[--color-bg]/10">Full concept ↗</a>
          <Link href="/press" className="sticker rounded-sm border-2 border-[--color-bg] px-6 py-3 transition hover:bg-[--color-bg]/10">Make a grant sheet →</Link>
        </div>
      </section>
    </article>
  );
}

function HeroCaption() {
  return (
    <div className="relative w-full px-5 pb-10 [text-shadow:0_2px_24px_rgba(0,0,0,0.9)] sm:px-10">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-[--color-flame]">Burning Man 2026 · Memorial · Community Build</p>
      <h1 className="mt-3 font-display text-5xl font-700 uppercase leading-[0.82] text-white sm:text-8xl">
        The Burning Book<br />of Brian
      </h1>
    </div>
  );
}
