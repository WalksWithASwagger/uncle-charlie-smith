# Roadmap — what's next for the Charlie archive

The archive is now a solid **master-canonical foundation**: 338 captioned images, 22 works, an entity layer (`entities/`), a machine-readable export (`Catalog/manifest.json`), all versioned on GitHub. This is the springboard for "all sorts of flaming-steel carnival/Burning-Man tomfoolery." Sequenced by leverage.

## Now — close the loops (cheap, high-value)
- **Get Charlie's answers** to `entities/TO-CONFIRM-with-charlie.md` — turns the 2 candidate works (Big Charles, Encompassment) and the unidentified gallery frames into canon; settles the Red Hot Cock height; clarifies contraptionism.com intent.
- **Retry the video transcripts** (3 sparceland clips + Red Hot Cock build) — YouTube 429'd this session; retry later or get the files directly. Feeds the "Ask Uncle Charlie" agent.
- **Record an oral-history session with Charlie** before Burning Book 2026 ramps — capture the build/ritual stories while they're fresh; he's the only source for the 2009–2017 gap and the early works.

## Next — build ON TOP of the archive (the payoff)
The manifest + entities are designed to drive these with little rework:
- **Searchable web gallery** — `manifest.json` → a static site filtered by work/motif/tag/event/hero. Heroes (65) are pre-flagged.
- **"Ask Uncle Charlie" agent** — RAG over `Brand/` (voice/worldview/glossary) + `entities/` + `Transcripts/`. Talks in his voice, cites real works.
- **Press / grant one-pager generator** — pull a work's record + hero shots + the contraptionism frame into a kit (especially for Burning Book 2026 fundraising).
- **Burning Book of Brian 2026 microsite** — the BBB renders, tech diagrams, and memorial story are already catalogued; wire them to a build/fundraise page.
- **contraptionism.com** — the natural home for the whole thing as a named practice (currently a 404 naming claim). The entity model IS the content architecture for it.

## Later — depth & completeness
- **Fill photo-less works** — `gantry`, `teetering-cusps`, `bone-head`, `discombobulator`, `hot-mama`/`mr-nice-guy` burns (howhowhow.com per-event galleries, or from Charlie).
- **True RAW masters** — the 52 DNGs in-repo are 2560px proxies; pull the full 6720px Canon originals if they exist.
- **Printed monograph** — once the canon is confirmed and the hero set is curated, the works.json + heroes are monograph-ready.

## Maintenance contract (so it stays canonical)
- New facts → edit `Catalog/works.csv` + `Catalog/works.json`, then **regenerate** `entities/works/*.md` (they're generated, not hand-edited).
- New images → drop in the right folder, add an `images.csv` row (incl. `tags`), regenerate `manifest.json`.
- Keep `credit`/`rights` accurate; never delete originals; commit + push each batch.
