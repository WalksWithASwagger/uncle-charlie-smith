# Uncle Charlie Smith — Archive

An upgraded, structured, queryable archive of the life and work of **Charlie "Blackcat" Smith** — Atlanta sculptor, fire artist, and "Johnny Appleseed of Burning Man." The goal: pull the scattered tentacles of a 30-year career (sites, photos, videos, transcripts, drawings) into **one common format with common metadata**, so we can build fun things on top — a website, a searchable gallery, an AI that talks like Charlie, grant/press kits, a Burning Book microsite, etc.

> Charlie has archived well over a long arc — "not perfect, but so much better than most, and a great breadcrumb trail." This repo upgrades that trail into something machine-usable.

Maintained by Kris Krüg (quartermaster & documentarian / archivist). Last updated: June 21, 2026.
Companion GitHub repo: **github.com/WalksWithASwagger/uncle-charlie-smith**

---

## Folder map

```
Uncle Charlie/
├── README.md                         ← you are here (archive guide + schema)
├── Charlie-BlackCat-Smith-Knowledge-Base.md   ← master narrative: bio, projects, 2026, network, sources
├── Brand/                            ← canonical voice/brand refs for agents
│   ├── Charlie-Voice-and-Style-Guide.md
│   ├── Charlie-Worldview-and-Values.md
│   └── Charlie-Glossary-and-Anti-Glossary.md
├── Transcripts/                      ← cleaned video/audio transcripts
│   ├── Transcript-Charlie-Interview-2023.md
│   └── Transcript-RedHotCock-and-Shrine-2023-KrisKrug.md
├── BBB/                              ← The Burning Book of Brian (2026 project) renders, diagrams, site plans
├── Hand-Drawings/                    ← Charlie's hand sketches (high-interest; transcribe the text!)
├── Poetry/                           ← his "Words" poems (transcriptions + catalog)
├── Media-Index.md                    ← all video/audio/podcast media + status
├── Red-Hot-Cock-2018/                ← Okeechobee 2018 photo set (captions/metadata; drop originals here)
├── portfolio-images/                 ← saved artwork photos (the growing visual archive)
├── Images/                           ← (reserved) processed/derivative images
└── Catalog/                          ← machine-readable indexes
    ├── works.csv                     ← one row per artwork/project (the canonical works list)
    ├── images.csv                    ← one row per image file (filename ↔ work ↔ event ↔ credit)
    └── image-wanted-list.md          ← galleries/sources still to pull, by work
```

---

## How the archive works (the metadata model)

Two CSV catalogs are the backbone. Everything else (folders of media) hangs off them.

### `Catalog/works.csv` — the canonical list of works
One row per artwork/project. Columns:
`work_id, name, aka, type, year_start, year_end, status, materials, scale, key_events, themes, description, confidence, sources`
- **work_id**: stable kebab-case id (e.g., `red-hot-cock`, `fleeble-flobbler`). Use this to link images → works.
- **confidence**: `high | medium | low` — how sure we are of the details (so we don't pass off guesses as fact).

### `Catalog/images.csv` — every image file, captioned
One row per image. Columns:
`file, folder, work_id, subject, event, location, year, credit, source, confidence, notes`
- **file / folder**: the filename and which folder it lives in.
- **work_id**: links to `works.csv` (or blank/`unknown` if unidentified).
- **credit**: photographer (e.g., "Jaime Ladet", "Kris Krüg").
- **source**: where it came from (sparceland.com, howhowhow.com gallery, Kris Flickr, etc.).

### Adding new material (the workflow)
1. Drop image files into `portfolio-images/` (or `Hand-Drawings/` for sketches, `BBB/` for the 2026 project).
2. Add a row to `Catalog/images.csv` with as much metadata as known (mark `confidence`).
3. If it's a new work, add a row to `Catalog/works.csv` first and reference its `work_id`.
4. Keep filenames descriptive where possible; never delete originals.

> **Naming convention (suggested for new saves):** `work-id__event-year__descriptor.jpg` (e.g., `red-hot-cock__brc-2018__sunrise-rock.jpg`). The current files keep their original names; `images.csv` carries the meaning.

---

## On image downloading (current limitation)

This environment can **read/render** web pages but can't reliably **bulk-download binary image files** into the folder. So the division of labor mirrors how Charlie and Kris already work: **Kris saves the image files** (drag them into the right folder), and **the archive provides the structure, metadata, and a "wanted list"** of exactly which galleries/photos to grab (see `Catalog/image-wanted-list.md`). Once files land in a folder, they get catalogued in `images.csv` with full context.

---

## Source map (where this archive draws from)
- **sparceland.com** (current site; alias artofsuchnsuch.com) — bio/CV, 2026 Burning Book, Time Star, Fleeble.
- **howhowhow.com/news.html** (old site) — 2003–2008 exhibition/works log + photo galleries.
- **Kris Krüg** — 2023 profile + Red Hot Cock/Shrine story (kriskrug.co); two YouTube videos (transcribed); Flickr albums.
- **Burning Man Journal / Leonardo / Reason** — third-party corroboration.
- Full source list in the Knowledge Base's Sources section.

## Ideas to build on top (later)
A searchable web gallery · a Burning Book 2026 microsite · an "Ask Uncle Charlie" agent (Brand/ docs + transcripts) · an interactive works timeline/map · a grant/press one-pager generator · a printed monograph.
