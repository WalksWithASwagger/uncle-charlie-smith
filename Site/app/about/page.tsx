import type { Metadata } from "next";
import Link from "next/link";
import { getCV, getWorks, getImages } from "@/lib/data";
import { Sparks } from "@/components/Sparks";
import { Reveal } from "@/components/Reveal";
import { Marquee } from "@/components/Marquee";
import { CharlieMachine } from "@/components/CharlieMachine";
import { BulbBoard } from "@/components/BulbBoard";
import { CareerReel } from "@/components/CareerReel";
import { Bunting } from "@/components/Bunting";

export const metadata: Metadata = {
  title: "Charlie “Blackcat” Smith — the man, the machine",
  description:
    "Not a bio — a living contraption. Climb into the Uncle Charlie machine: pull a card, yank the lever, talk to the man himself.",
};

const FACE_PATH = "Red-Hot-Cock-2018/red-hot-cock__OMF18-late-charlie__38889696540.jpg";

export default function AboutPage() {
  const cv = getCV();
  const works = getWorks().map((w) => ({ id: w.work_id, title: w.title }));
  const faceImg = getImages().find((i) => i.path === FACE_PATH);
  const faceAlt = faceImg?.subject ?? "Charlie “Blackcat” Smith";

  return (
    <div>
      {/* ── THE MACHINE (hero) ── */}
      <section className="grain relative overflow-hidden border-b-2 border-[--color-ember] py-12 sm:py-16">
        <Sparks count={16} />
        <div className="relative mx-auto max-w-6xl px-5">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-[--color-flame] flicker">
            Step right up · the operator himself
          </p>
          <h1 className="mt-3 font-display text-[16vw] font-700 uppercase leading-[0.8] sm:text-[8rem]">
            <span className="text-stroke">Uncle</span> <span className="ember-text">Charlie</span>
            <span className="text-[--color-ember]">.</span>
          </h1>
          <p className="mb-8 mt-4 max-w-2xl text-lg leading-snug text-[--color-ink-dim] sm:text-xl">
            {cv.tagline} Not a bio page — a contraption. Like everything he builds, it only comes
            alive when you climb in and <span className="ember-text">work it</span>.
          </p>

          <CharlieMachine works={works} facePath={FACE_PATH} faceAlt={faceAlt} />

          {/* roles as a stamped gauge row */}
          <div className="mt-6 flex flex-wrap gap-2 font-mono text-[11px] uppercase tracking-wider">
            {cv.roles.map((r, i) => (
              <span
                key={r}
                className={`sticker rounded-sm border-2 border-[--color-line] bg-[--color-bg] px-3 py-1.5 text-[--color-ink-dim] ${i % 2 ? "tilt-r" : "tilt-l"}`}
              >
                {r}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERTISE MARQUEE ── */}
      <div className="border-b-2 border-[--color-line] bg-[--color-ember] py-2 font-display text-lg uppercase tracking-wider text-[--color-bg]">
        <Marquee items={cv.expertise} />
      </div>

      {/* ── HONORARIA BULB BOARD ── */}
      <BulbBoard years={cv.honoraria_grant_years} label={cv.honoraria_label} />

      {/* ── CAREER CRANK-REEL ── */}
      <section className="border-b-2 border-[--color-line] py-16">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="font-display text-3xl uppercase sm:text-4xl">
            Wind through how the <span className="ember-text">machine</span> got built
          </h2>
          <p className="mt-2 font-mono text-xs uppercase tracking-wider text-[--color-steel]">← drag the reel →</p>
        </div>
        <div className="mt-8">
          <CareerReel stops={cv.career} />
        </div>
      </section>

      {/* ── OPERATOR'S MANUAL (tight bio plate) ── */}
      <section className="grain relative border-b-2 border-[--color-line] bg-[--color-bg-2] py-16">
        <Reveal className="mx-auto max-w-3xl px-5">
          <h2 className="font-display text-3xl uppercase sm:text-4xl">
            The <span className="ember-text">operator’s</span> manual
          </h2>
          <div className="forge-rule mt-3 w-40" />
          <div className="mt-6 space-y-4 leading-relaxed text-[--color-ink]">
            {cv.bio.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── BUNTING: festivals + clients ── */}
      <section className="py-14">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-center font-display text-3xl uppercase sm:text-4xl">
            Where the <span className="ember-text">machines</span> have run
          </h2>
        </div>
        <div className="mt-6">
          <Bunting items={cv.festivals} />
        </div>
        <div className="mx-auto mt-6 max-w-6xl px-5">
          <h3 className="text-center font-mono text-[11px] uppercase tracking-[0.3em] text-[--color-flame]">
            Select clientele &amp; institutions
          </h3>
        </div>
        <div className="mt-2">
          <Bunting items={cv.clients} />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t-2 border-[--color-ember] bg-[--color-ember] py-16 text-center text-[--color-bg]">
        <Reveal>
          <h2 className="font-display text-4xl uppercase sm:text-6xl">Now go see it burn</h2>
          <div className="mt-6 flex flex-wrap justify-center gap-3 font-mono text-xs uppercase tracking-wider">
            <Link href="/gallery" className="sticker rounded-sm bg-[--color-bg] px-6 py-3 text-[--color-ink] transition hover:text-[--color-ember-bright]">
              The gallery →
            </Link>
            <Link href="/timeline" className="sticker rounded-sm border-2 border-[--color-bg] px-6 py-3 transition hover:bg-[--color-bg]/10">
              30 years of tomfoolery
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
