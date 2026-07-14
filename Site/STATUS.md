# Status — what's built (2026-06-24)

The record of where the Charlie "Blackcat" Smith project stands. Forward work lives in `ROADMAP.md`.

## Live
**https://contraptionism-site.vercel.app** — public (Deployment Protection off). Push-to-`main` auto-deploys. (Will move to `contraptionism.com` once DNS is pointed.)

## One repo (monorepo)
- **Archive** (repo root) — `github.com/WalksWithASwagger/uncle-charlie-smith` — canonical **data layer**: 369 catalogued images, 23 works, tags + `entities/` (works/people/motifs/orgs/**lore**), KB, `manifest.json`/`works.json` (regenerate via `Catalog/build-manifest.py`), plus `web/` 1600px JPEG derivatives served to the site. Non-photo design assets live outside the catalog in `Brand/assets/` + `BBB/source/`.
- **Site** (this folder) — `Site/` in the same repo — Next.js 16 + Tailwind 4 + Framer Motion. Vercel Root Directory = `Site`.

## Look & feel
**Maximalist carnival** — bold oversized display type, ember/flame on charcoal, marquees, sticker cards, grain, drifting sparks; honors `prefers-reduced-motion`. Distinctive, not generic-AI.

## Pages
- `/` — **cinematic hero reel**: brightness-curated full-bleed Ken-Burns crossfade (`data/reel.json`) + sparks + marquee + tilted sticker collage.
- `/about` — **THE UNCLE CHARLIE MACHINE**: a "living contraption" built from `data/cv.json` — a riveted steel console with Charlie's flame-lit face + the embedded Ask-Uncle-Charlie bot ("the mouth of the machine," with a canned-Charlie-ism fallback pre-key), an honoraria bulb-board, a draggable career film-reel, and festival/client bunting.
- `/gallery` — edge-to-edge **wall-of-fire** collage (varied tiles, `PhotoWall`), sticker filter chips, URL-synced filters, animated shared `Lightbox` (crossfade nav, swipe, keyboard, copy-credit).
- `/works` + `/works/[id]` — **cinematic scroll-story** per work: measured-bright hero (`workHero`) → big pitch → parallax pull-quote band → stats → story beats → **lore interstitials** (e.g. the black-dot flag on Red Hot Cock) → motifs + related-works lineage → wall-of-fire finish. Photo-less works get a typographic hero.
- `/burning-book` — same scroll-story for the 2026 memorial (sketchbook hero, "not a verified honorarium" caveat band, renders wall, fundraise CTA).
- `/people` — portrait-led (representative photo per person). `/motifs` — visual grid (a photo per motif → filtered gallery).
- `/timeline` — **30 Years of Tomfoolery**: draggable/flingable works-by-year arc (2000→2026).
- `/ask` — "Ask Uncle Charlie" (Claude via AI SDK, corpus-grounded, inline work-links + follow-ups). `/press` — grounded one-pager generator (hero image, print/PDF). `/credits`, `/api/og`, sitemap, robots, on-brand 404.

## Carnival features (Charlie's personality)
- **Pull a Charlie-ism** — slot-machine of his real phrases (glossary + flag lore), yank + spark burst (`data/charlie-isms.json`); on home + timeline.
- **Rock the Cock** — interactive teeter-totter on the Red Hot Cock page: tap/space rocks it, sparks poof, counts rocks, "howls fire" at milestones.
- **Easter eggs** — a chicken occasionally struts across screen; the **Konami code** unleashes a flock + a Charlie-ism toast.
- **Polish** — count-up stat tickers, the black-dot "period" back-to-top, spark bursts, springy hovers. All honor `prefers-reduced-motion`.

## Image quality
Hero/reel/representative selection is **resolution-aware** (`MIN_HERO_EDGE` 1000px): low-res-only works (big-bully 218px, hot-mama/contraptions/tunnel/triple-bypass) render a **bold typographic hero** instead of a pixelated blow-up. (Better source images for those 5 are a roadmap item.)

## Key infra (reusable)
`components/`: `HeroReel`, `Marquee`, `Sparks`, `Reveal`, `TiltCard`, `ParallaxBand`, `PhotoWall`, `Lightbox`, `CharlieIsm`, `RockTheCock`, `Timeline`, `Critters`, `CountUp`, `PeriodToTop`, `Nav`, `Footer`, `AskClient`, `PressClient`, `CharlieMachine`, `BulbBoard`, `CareerReel`, `Bunting`, `HonorariaStrip`.
`lib/`: `images`, `data`, `workHero`, `heroes`, `people`, `corpus`, `ratelimit`, `useKonami`.
`scripts/`: `sync-archive` (`npm run sync`), `build-derivatives` (`npm run derivatives`), `build-work-heroes` (`npm run work-heroes`).

## Data flow
Parent `Catalog/*` + `entities/*` + `Brand/*` + `Transcripts/*` → `npm run sync` → `Site/data/` → pages (server components, no DB). Images served from the archive's `web/` derivatives via GitHub raw (`displayUrl`); full-res originals via `imageUrl`. Brightness-measured hero/reel selection from the same derivatives.

## Not yet on
- **Ask Uncle Charlie + Press** return a graceful 503 until `ANTHROPIC_API_KEY` is set in Vercel env.
- **contraptionism.com** domain not pointed (using the `*.vercel.app` URL).

See `SHARE-WITH-CHARLIE.md` for the review link + paste-ready note, and `ROADMAP.md` for what's next.
