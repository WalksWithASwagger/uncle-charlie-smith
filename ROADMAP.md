# Roadmap — what's next for the Charlie archive

The archive is now a solid **master-canonical foundation**: 338 captioned images, 22 works, an entity layer (`entities/`), a machine-readable export (`Catalog/manifest.json`), all versioned on GitHub. This is the springboard for "all sorts of flaming-steel carnival/Burning-Man tomfoolery." Sequenced by leverage.

## Now — close the loops (cheap, high-value)
- **Get Charlie's answers** to `entities/TO-CONFIRM-with-charlie.md` — turns the 2 candidate works (Big Charles, Encompassment) and the unidentified gallery frames into canon; settles the Red Hot Cock height; clarifies contraptionism.com intent.
- **Retry the video transcripts** (3 sparceland clips + Red Hot Cock build) — YouTube 429'd this session; retry later or get the files directly. Feeds the "Ask Uncle Charlie" agent.
- **Record an oral-history session with Charlie** before Burning Book 2026 ramps — capture the build/ritual stories while they're fresh; he's the only source for the 2009–2017 gap and the early works.

## ✅ Built — the site on top of the archive (2026-06-22)
The "build on top" payoff is **done and deployed**: a Next.js site (gallery, 22 work pages, "Ask Uncle Charlie" agent, press/grant generator, Burning Book microsite) lives in a separate repo, **`github.com/WalksWithASwagger/contraptionism-site`**, deployed to Vercel production. It reads this archive's `manifest.json` + `works.json` + `entities/` and serves images from this repo via GitHub raw. Its forward roadmap (image optimization, launch finalization, feature depth) is tracked in that repo's `ROADMAP.md`.

Launch is gated on three user actions: turn off Vercel Deployment Protection, add `ANTHROPIC_API_KEY`, and point the `contraptionism.com` domain.

## Later — depth & completeness
- **Fill photo-less works** — `gantry`, `teetering-cusps`, `bone-head`, `discombobulator`, `hot-mama`/`mr-nice-guy` burns (howhowhow.com per-event galleries, or from Charlie).
- **True RAW masters** — the 52 DNGs in-repo are 2560px proxies; pull the full 6720px Canon originals if they exist.
- **Printed monograph** — once the canon is confirmed and the hero set is curated, the works.json + heroes are monograph-ready.

## Maintenance contract (so it stays canonical)
- New facts → edit `Catalog/works.csv` + `Catalog/works.json`, then **regenerate** `entities/works/*.md` (they're generated, not hand-edited).
- New images → drop in the right folder, add an `images.csv` row (incl. `tags`), regenerate `manifest.json`.
- Keep `credit`/`rights` accurate; never delete originals; commit + push each batch.
