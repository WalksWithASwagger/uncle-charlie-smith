import Link from "next/link";
import Image from "next/image";
import { getWorks, getManifest, getImages } from "@/lib/data";
import { reelImages } from "@/lib/heroes";
import { displayUrl } from "@/lib/images";
import { HeroReel } from "@/components/HeroReel";
import { Sparks } from "@/components/Sparks";
import { Marquee } from "@/components/Marquee";
import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";
import { CountUp } from "@/components/CountUp";
import { CharlieIsm } from "@/components/CharlieIsm";

function heroPath(workId: string, file: string): string {
  const imgs = getImages();
  const img = imgs.find((i) => i.file === file && i.work_id === workId) ?? imgs.find((i) => i.file === file);
  return img?.path ?? "";
}

export default function Home() {
  const works = getWorks().filter((w) => w.image_count > 0);
  const stats = getManifest().stats;
  const reel = reelImages(10).map((i) => ({ path: i.path, width: i.width, height: i.height }));
  const thesisImg = getImages().find((i) => i.tags.includes("burn-night") && i.work_id === "red-hot-cock");

  return (
    <div>
      {/* ── HERO REEL ── */}
      <section className="relative h-[92vh] min-h-[560px] overflow-hidden border-b-2 border-[--color-ember]">
        <HeroReel frames={reel} />
        {/* bottom-weighted scrim only — let the image breathe */}
        <div className="absolute inset-0 bg-gradient-to-t from-[--color-bg] via-[--color-bg]/15 to-transparent" />
        <div className="absolute inset-0 bg-[--color-bg]/15" />
        <Sparks count={20} />

        <div className="relative flex h-full flex-col justify-end px-5 pb-16 [text-shadow:0_2px_24px_rgba(0,0,0,0.85)] sm:px-10">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-[--color-flame] flicker">
            Charlie “Blackcat” Smith · Atlanta · since 2000
          </p>
          <h1 className="mt-3 font-display text-[15vw] font-700 uppercase leading-[0.82] text-white sm:text-[11rem]">
            Contraption<span className="ember-text">ism</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-snug text-white sm:text-2xl">
            Community-built kinetic <span className="ember-text">fire sculpture</span>. The machine is
            the bait. <span className="text-[--color-flame]">The crew is the payload.</span>
          </p>
          <div className="mt-7 flex flex-wrap gap-3 font-mono text-xs uppercase tracking-wider">
            <Link href="/gallery" className="sticker rounded-sm bg-[--color-ember] px-5 py-2.5 text-[--color-bg] transition hover:bg-[--color-ember-bright]">
              Enter the gallery →
            </Link>
            <Link href="/ask" className="sticker rounded-sm border-2 border-[--color-ink] bg-[--color-bg]/40 px-5 py-2.5 backdrop-blur transition hover:border-[--color-ember] hover:text-[--color-ember-bright]">
              Ask Uncle Charlie
            </Link>
          </div>
        </div>
      </section>

      {/* ── MARQUEE BAND ── */}
      <div className="border-b-2 border-[--color-line] bg-[--color-ember] py-2 font-display text-lg uppercase tracking-wider text-[--color-bg]">
        <Marquee
          items={["Rock the Cock", "Flaming Steel", "30 Years of Tomfoolery", `${stats.total_images} Frames`, `${stats.works} Works`, "Johnny Appleseed of Burning Man"]}
        />
      </div>

      {/* ── STATS (count up) ── */}
      <section className="grain relative border-b-2 border-[--color-line] bg-[--color-bg-2]">
        <div className="mx-auto grid max-w-6xl grid-cols-2 sm:grid-cols-4">
          <div className="border-r border-[--color-line] px-5 py-10 text-center"><CountUp to={stats.total_images} label="images" /></div>
          <div className="border-r border-[--color-line] px-5 py-10 text-center"><CountUp to={stats.works} label="works" /></div>
          <div className="border-r border-[--color-line] px-5 py-10 text-center"><CountUp to={stats.hero_shots} label="hero shots" /></div>
          <div className="px-5 py-10 text-center"><CountUp to={26} label="years (2000–26)" /></div>
        </div>
      </section>

      {/* ── THESIS over imagery ── */}
      <section className="relative overflow-hidden border-b-2 border-[--color-line] py-24">
        {thesisImg && (
          <Image src={displayUrl(thesisImg.path)} alt="" fill sizes="100vw" className="object-cover opacity-25" />
        )}
        <div className="absolute inset-0 bg-[--color-bg]/50" />
        <Reveal className="relative mx-auto max-w-4xl px-5">
          <h2 className="font-display text-4xl uppercase leading-[0.95] sm:text-6xl">
            Builder of <span className="ember-text">social machines</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[--color-ink]">
            Rough ceremonial machines — part beast, part playground, part furnace, part social
            engine. A human-hearted book, a jackal-headed rooster, a clown you ride, fire birds, a
            human-headed bull, a maniacal infant towing old fire toys. Funny and grotesque and
            sacred at once. The public sees the fire. The crew lives the real piece.
          </p>
          <Link href="/motifs" className="mt-6 inline-block font-mono text-xs uppercase tracking-wider text-[--color-ember-bright] hover:underline">
            the whole vocabulary →
          </Link>
        </Reveal>
      </section>

      {/* ── MENAGERIE COLLAGE ── */}
      <section className="grain relative py-20">
        <div className="mx-auto max-w-7xl px-5">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-4xl uppercase sm:text-5xl">The <span className="ember-text">Menagerie</span></h2>
            <Link href="/works" className="font-mono text-xs uppercase text-[--color-ember-bright] hover:underline">all 22 works →</Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {works.slice(0, 8).map((w, idx) => {
              const p = w.hero_images[0] ? heroPath(w.work_id, w.hero_images[0]) : "";
              return (
                <Reveal key={w.work_id} delay={(idx % 4) * 0.06}>
                  <TiltCard rotate={idx % 2 ? 1.5 : -1.5} className="sticker block">
                    <Link href={`/works/${w.work_id}`} className="group relative block aspect-[4/5] overflow-hidden rounded-sm border-2 border-[--color-line]">
                      {p && (
                        <Image
                          src={displayUrl(p)}
                          alt={w.title}
                          fill
                          sizes="(max-width:640px) 50vw, 25vw"
                          className="object-cover transition duration-500 group-hover:scale-110"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/10 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-3">
                        <div className="font-display text-base uppercase leading-tight">{w.title}</div>
                        <div className="font-mono text-[10px] text-[--color-flame]">{w.year_start ?? "—"} · {w.image_count} frames</div>
                      </div>
                    </Link>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PULL A CHARLIE-ISM ── */}
      <section className="border-t-2 border-[--color-line] py-16">
        <Reveal className="mx-auto max-w-5xl px-5">
          <h2 className="mb-6 text-center font-display text-3xl uppercase sm:text-4xl">Talk like <span className="ember-text">Uncle Charlie</span></h2>
          <CharlieIsm />
        </Reveal>
      </section>

      {/* ── TIMELINE TEASER ── */}
      <section className="border-t-2 border-[--color-line] bg-[--color-bg-2] py-14">
        <Reveal className="mx-auto max-w-5xl px-5 text-center">
          <h2 className="font-display text-3xl uppercase sm:text-4xl">30 Years of <span className="ember-text">Tomfoolery</span></h2>
          <p className="mx-auto mt-3 max-w-xl text-[--color-ink-dim]">One deep pattern, remade in new bodies — HEARTH (2000) to the Burning Book (2026).</p>
          <Link href="/timeline" className="mt-6 inline-block sticker rounded-sm bg-[--color-ember] px-6 py-3 font-mono text-xs uppercase tracking-wider text-[--color-bg] transition hover:bg-[--color-ember-bright]">Drag through the arc →</Link>
        </Reveal>
      </section>

      {/* ── CTA ── */}
      <section className="border-t-2 border-[--color-ember] bg-[--color-ember] py-16 text-center text-[--color-bg]">
        <Reveal>
          <h2 className="font-display text-4xl uppercase sm:text-6xl">See it all burn</h2>
          <div className="mt-6 flex flex-wrap justify-center gap-3 font-mono text-xs uppercase tracking-wider">
            <Link href="/gallery" className="sticker rounded-sm bg-[--color-bg] px-6 py-3 text-[--color-ink] transition hover:text-[--color-ember-bright]">
              The gallery →
            </Link>
            <Link href="/burning-book" className="sticker rounded-sm border-2 border-[--color-bg] px-6 py-3 transition hover:bg-[--color-bg]/10">
              Burning Book 2026
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
