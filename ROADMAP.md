# Roadmap — what's next for the Charlie archive

The archive is now a solid **master-canonical foundation**: 369 captioned images, 23 works, an entity layer (`entities/`), a machine-readable export (`Catalog/manifest.json`), all versioned on GitHub. This is the springboard for "all sorts of flaming-steel carnival/Burning-Man tomfoolery." Sequenced by leverage.

## Now — close the loops (cheap, high-value)
- ✅ **Charlie's approved one-pager ingested (2026-06)** — landed as `entities/one-pager-charlie-approved.md` (canonical bio/CV) + structured `Catalog/cv.json`; reconciled across the KB, `people.md`, `organizations.md`, and Content-Drafts (BFA 1988–92, Carl André Davidt / Andre Studios, film-industry chapter, combined honoraria/grant years, full client + festival rosters). Residual unknowns parked in `TO-CONFIRM` §0. Powers the site's new `/about` page + `/timeline` honoraria strip.
- **Get Charlie's answers** to `entities/TO-CONFIRM-with-charlie.md` — now also includes the **bio/CV reconciliation** (§0: BFA start 1988, Davidt end 1993-vs-94, the net-new 2016 honorarium, "American nomad" origin); plus the 2 candidate works (Big Charles, Encompassment), unidentified frames, Red Hot Cock height, contraptionism.com intent.
- **Retry the video transcripts** (3 sparceland clips + Red Hot Cock build) — YouTube 429'd this session; retry later or get the files directly. Feeds the "Ask Uncle Charlie" agent.
- **Record an oral-history session with Charlie** before Burning Book 2026 ramps — capture the build/ritual stories while they're fresh; he's the only source for the 2009–2017 gap and the early works.

## ✅ Built — the site on top of the archive (2026-06-22; monorepo 2026-07-14)
The "build on top" payoff is **done and deployed**: a Next.js site (gallery, 23 work pages, an "Ask Uncle Charlie" agent, a `/about` living-contraption page, press/grant generator, Burning Book microsite) lives in **`Site/`** in this repo, deployed to Vercel (Root Directory = `Site`). It syncs `Catalog/*` + `entities/` + Brand + Transcripts into `Site/data/` and serves images via GitHub raw from this same repo. Forward site work: `Site/ROADMAP.md`.

Launch is gated on: Vercel Deployment Protection off, `ANTHROPIC_API_KEY`, `contraptionism.com` DNS, and Vercel connected to **this** repo with root `Site` (former `contraptionism-site` sibling retired).

## Later — depth & completeness
- **Fill photo-less works** — `gantry`, `teetering-cusps`, `bone-head`, `discombobulator`, `hot-mama`/`mr-nice-guy` burns (howhowhow.com per-event galleries, or from Charlie).
- **True RAW masters** — the 52 DNGs in-repo are 2560px proxies; pull the full 6720px Canon originals if they exist.
- **Printed monograph** — once the canon is confirmed and the hero set is curated, the works.json + heroes are monograph-ready.

## Maintenance contract (so it stays canonical)
- New facts → edit `Catalog/works.csv` + `Catalog/works.json`, then **regenerate** `entities/works/*.md` (they're generated, not hand-edited).
- New images → drop in the right folder, add an `images.csv` row (incl. `tags`), regenerate `manifest.json`.
- Keep `credit`/`rights` accurate; never delete originals; commit + push each batch.
