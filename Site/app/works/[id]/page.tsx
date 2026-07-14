import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getWorks, getWork, getWorkImages } from "@/lib/data";
import { workHero } from "@/lib/workHero";
import { displayUrl } from "@/lib/images";
import { PhotoWall } from "@/components/PhotoWall";
import { ParallaxBand } from "@/components/ParallaxBand";
import { RockTheCock } from "@/components/RockTheCock";

export function generateStaticParams() {
  return getWorks().map((w) => ({ id: w.work_id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const w = getWork(id);
  if (!w) return {};
  const og = `/api/og?title=${encodeURIComponent(w.title)}&sub=${encodeURIComponent(`${w.year_start ?? ""} · Charlie “Blackcat” Smith`)}`;
  return { title: w.title, description: w.description.slice(0, 160), openGraph: { title: w.title, description: w.description.slice(0, 160), images: [og] }, twitter: { card: "summary_large_image", images: [og] } };
}

// curated, real pull-quotes for the marquee works (from the KB / Charlie's words)
const QUOTES: Record<string, string> = {
  "red-hot-cock": "ROCK THE COCK! — two groups of thirty jumping in sequence, rocking the gigantic teeter-totter as it howls fire across the sunrise.",
  "burning-book": "A human heart exposed through the book’s core, an LPG flame pulsing like a heartbeat — pumped by the people who came to remember.",
  hearth: "A twenty-foot iron heart that pulsed with fire and warmed people at night. Where Charlie met Brian.",
  "fleeble-flobbler": "A rotund clown you climb inside and ride — a monster toy, clanking metal and smoke, the return to the inner kid.",
  "fire-birds": "Four wood-fired birds, cut patterns lit from within at night, shadow-casting wings by day — congregation, then transformed into ONE.",
  "time-star": "A seven-sided star built by a hundred-plus hands — days, planets, chakras, virtues, the sun.",
};

const STAT_FIELDS: [keyof NonNullable<ReturnType<typeof getWork>>, string][] = [
  ["dimensions", "Dimensions"],
  ["materials", "Materials"],
  ["fire_system", "Fire system"],
  ["event", "Event / where"],
];
const BEAT_FIELDS: [keyof NonNullable<ReturnType<typeof getWork>>, string][] = [
  ["interaction", "The interaction"],
  ["ritual", "The ritual"],
  ["crew_model", "The crew"],
];

export default async function WorkPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const work = getWork(id);
  if (!work) notFound();
  const images = getWorkImages(id);
  const heroP = workHero(id);
  const unconfirmed = work.confidence === "low" && work.status === "unconfirmed";

  // wide frames for the parallax bands (skip the hero so we don't repeat it)
  const wide = images.filter((i) => (i.width ?? 1) / (i.height ?? 1) > 1.3 && i.path !== heroP);
  const quoteImg = wide[0]?.path ?? heroP;
  const flagImg = images.find((i) => i.tags.includes("black-dot-flag"));
  const rockImg =
    id === "red-hot-cock"
      ? (images.find((i) => i.tags.includes("jackal-rooster") && (i.long_edge ?? 0) >= 2000)?.path ??
         images.find((i) => (i.long_edge ?? 0) >= 2000)?.path ?? heroP)
      : null;
  const related = getWorks()
    .filter((w) => w.work_id !== id && w.image_count > 0 && w.motifs.some((m) => work.motifs.includes(m)))
    .slice(0, 4);

  return (
    <article>
      {/* ── HERO ── */}
      {heroP ? (
        <section className="relative flex h-[78vh] min-h-[460px] items-end overflow-hidden border-b-2 border-[--color-ember]">
          <Image src={displayUrl(heroP)} alt={work.title} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[--color-bg] from-28% via-[--color-bg]/65 via-60% to-[--color-bg]/15" />
          <HeroCaption work={work} unconfirmed={unconfirmed} />
        </section>
      ) : (
        <section className="relative flex h-[55vh] min-h-[380px] items-end overflow-hidden border-b-2 border-[--color-ember] bg-[--color-bg-2]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_-10%,rgba(240,83,28,0.25),transparent_55%)]" />
          <HeroCaption work={work} unconfirmed={unconfirmed} />
        </section>
      )}

      {/* ── THE PITCH ── */}
      <section className="mx-auto max-w-4xl px-5 py-16">
        {work.aka && <p className="font-mono text-xs uppercase tracking-[0.2em] text-[--color-flame]">aka {work.aka}</p>}
        <p className="mt-3 text-2xl leading-snug text-[--color-ink] sm:text-3xl">{work.description}</p>
      </section>

      {/* ── PULL-QUOTE BAND ── */}
      {QUOTES[id] && quoteImg && (
        <ParallaxBand path={quoteImg} dim={0.55} height="h-[70vh]">
          <p className="font-display text-3xl uppercase leading-tight text-white sm:text-5xl">{QUOTES[id]}</p>
        </ParallaxBand>
      )}

      {/* ── STATS ── */}
      <section className="border-y-2 border-[--color-line] bg-[--color-bg-2]">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-px sm:grid-cols-4">
          {STAT_FIELDS.map(([k, label]) => {
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

      {/* ── STORY BEATS ── */}
      <section className="mx-auto max-w-4xl space-y-10 px-5 py-16">
        {BEAT_FIELDS.map(([k, label]) => {
          const v = work[k];
          if (!v || typeof v !== "string") return null;
          return (
            <div key={label} className="border-l-2 border-[--color-ember] pl-5">
              <h3 className="font-display text-xl uppercase text-[--color-flame]">{label}</h3>
              <p className="mt-2 text-lg leading-relaxed text-[--color-ink]">{v}</p>
            </div>
          );
        })}
      </section>

      {/* ── ROCK THE COCK (interactive) ── */}
      {rockImg && <RockTheCock src={displayUrl(rockImg)} />}

      {/* ── BLACK-DOT FLAG LORE (where it flew) ── */}
      {flagImg && (
        <ParallaxBand path={flagImg.path} dim={0.6} height="h-[80vh]" align="items-start">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[--color-flame]">The black-dot flag · a hidden story</p>
          <p className="mt-4 max-w-2xl font-display text-2xl uppercase leading-tight text-white sm:text-4xl">
            “This is it. The end of a sentence. I fly the black on white — the circle complete. I am, and nothing more.”
          </p>
          <p className="mt-3 font-mono text-xs text-[--color-ink]">— Charlie, on the flag that flies across camp · <Link href="/motifs" className="text-[--color-ember-bright]">more symbols →</Link></p>
        </ParallaxBand>
      )}

      {/* ── LINEAGE + RELATED ── */}
      <section className="mx-auto max-w-5xl px-5 py-12">
        {work.motifs.length > 0 && (
          <>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[--color-steel]">Motifs</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {work.motifs.map((m) => (
                <Link key={m} href={`/gallery?tag=${m}`} className="sticker rounded-full border-2 border-[--color-line] bg-[--color-bg-2] px-3 py-1 font-mono text-[10px] text-[--color-ink-dim] hover:border-[--color-ember] hover:text-[--color-ember-bright]">{m}</Link>
              ))}
            </div>
          </>
        )}
        {related.length > 0 && (
          <div className="mt-10">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[--color-steel]">In the same lineage</h3>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {related.map((r) => {
                const rp = workHero(r.work_id);
                return (
                  <Link key={r.work_id} href={`/works/${r.work_id}`} className="group relative aspect-[4/5] overflow-hidden rounded-sm border-2 border-[--color-line] hover:border-[--color-ember]">
                    {rp && <Image src={displayUrl(rp)} alt={r.title} fill sizes="25vw" className="object-cover opacity-80 transition group-hover:scale-105 group-hover:opacity-100" />}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-2 font-display text-sm uppercase leading-tight">{r.title}</div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* ── THE WALL OF FIRE ── */}
      {images.length > 0 && (
        <section className="border-t-2 border-[--color-line] px-2 py-8">
          <div className="mx-auto mb-4 flex max-w-[1600px] items-baseline gap-3 px-3">
            <h2 className="font-display text-3xl uppercase">The wall of fire</h2>
            <span className="font-mono text-sm text-[--color-steel]">{images.length} frames</span>
          </div>
          <PhotoWall images={images} />
        </section>
      )}

      {work.sources.length > 0 && (
        <footer className="mx-auto max-w-5xl border-t-2 border-[--color-line] px-5 py-8">
          <h3 className="font-mono text-[10px] uppercase tracking-wider text-[--color-steel]">Sources</h3>
          <ul className="mt-2 space-y-1 font-mono text-xs text-[--color-ink-dim]">
            {work.sources.map((s) => <li key={s}>{s}</li>)}
          </ul>
        </footer>
      )}
    </article>
  );
}

function HeroCaption({ work, unconfirmed }: { work: NonNullable<ReturnType<typeof getWork>>; unconfirmed: boolean }) {
  return (
    <div className="relative w-full px-5 pb-10 [text-shadow:0_2px_24px_rgba(0,0,0,0.9)] sm:px-10">
      <Link href="/works" className="font-mono text-xs text-white/80 hover:text-[--color-ember-bright]">← all works</Link>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <h1 className="font-display text-5xl font-700 uppercase leading-[0.85] text-white sm:text-8xl">{work.title}</h1>
        {unconfirmed && <span className="sticker rounded-sm border-2 border-[--color-flame] bg-[--color-bg]/70 px-2 py-1 font-mono text-[10px] uppercase text-[--color-flame]">unconfirmed</span>}
      </div>
      <p className="mt-2 font-mono text-xs uppercase tracking-wider text-[--color-flame]">
        {work.year_start ?? "—"}{work.year_end && work.year_end !== work.year_start ? `–${work.year_end}` : ""} · {work.type} · {work.status}
      </p>
    </div>
  );
}
