# Download Log — Public Image Archive Ingestion

**Run date:** 2026-06-21 · **Tooling:** gallery-dl 1.32.3, exiftool 13.55, fdupes 2.4.0, yt-dlp, curl
**Result:** archive grew ~15 MB → ~290 MB. 160 catalogued images (158 local files), 51 at ≥2000px, 15 hero shots.

## What was pulled, by source

| Source | Method | Pulled | Resolution notes |
|---|---|---|---|
| **Flickr (KK account)** | `gallery-dl` largest public size (= original) | 38 unique photos | 45 at ≥3000px — true originals (e.g. Red Hot Cock night-fire 4129×5555). `rights=kk-owned`. One frame credited `thru-my-eyes` → `rights=third-party`. |
| **sparceland.com** | curl Squarespace CDN (`?format=2500w`) | 64 kept (after dedup) | Mixed — 50 of the full sparceland pull were ≥2000px; many gallery images are whatever Charlie uploaded (some web-res). `rights=charlie-site`. |
| **howhowhow.com poems** | curl from `poems/<name>.html` | 17 poem scans | Small GIF/JPG typewriter-poem scans → `Poetry/scans/`. `rights=charlie-site`. |
| **howhowhow.com news** | curl `newspics/` | 6 | Old-site gallery images (synapses, tunnel, bonnaroo, contraptions). `rights=charlie-site`. |
| **Third-party press** | curl `og:image` + Leonardo gallery | 11 | AJC, ArtsATL, BeltLine, BM Journal (×3), Creative Loafing, Live&Listen, kriskrug.co (×2), Leonardo. `rights=third-party`. |
| **YouTube** | `img.youtube.com` maxres thumbnails | 4 | Reference stills only → `Video-stills/`. `rights=video-still`. |

## New folders created this run
`Poetry/scans/` · `howhowhow-news/` · `press/` · `Video-stills/`

## Dedup
- fdupes found 34 exact-duplicate sets. Removed **21 redundant copies created this session** (my sparceland re-downloads of BBB renders the prior session already had; one Facebook image pulled 4× across pages). Pruned 24 catalog rows. Every deletion verified to keep a surviving identical twin first.
- 12 duplicate sets remain — all **pre-existing** MOODBOARD / Hand-Drawings curation copies and accidental ` (1)` files. Left untouched (KK's existing structure; preserve unrelated dirt).

## Metadata added
Appended 5 columns to `images.csv` (existing 12 kept intact): `rights, width, height, capture_date, status`. Dimensions + capture dates via exiftool. 5 TBD frames captioned by visual inspection (incl. a newly-identified night-Fleeble **hero**, OMF16-04).

## Gaps / follow-ups
- **Owner-zip top-up candidates** (heroes < 1600px long-edge): `fleeblesunrise.jpg` (300px, pre-existing thumb); `Okeechobee-2016/OMF16-04…25114287604.jpg` (1080px — KK's 2016 share may have been size-capped; full original only via owner download).
- **Video transcripts NOT captured:** Red Hot Cock build 2018 (`eL3aEgK2YCs`) — YouTube returned HTTP 429 (rate-limited); retry later. Meet The Blackcats 2024 (`bRfHe2OxmY4`) — no captions exist. (Thumbnails saved as reference.)
- **Works with no local image yet:** `hearth` (only a BBB render exists), `mr-nice-guy` (the BM Journal 2015 lead image is actually Mr. Nice Guy — re-tag), `gantry`, `teetering-cusps`, `bone-head`, `discombobulator`, `solar-scope`. Most predate Charlie's web presence; would need howhowhow.com per-event galleries (mac.com album links are dead) or asking Charlie.
- **80 images have no `work_id`** — sparceland gallery + bio images + Charlie candids not tied to a specific piece. Enrich opportunistically.
- **sparceland gallery-shift** had 52 images; some duplicate project-page images across pages (resolved by dedup).

---

# Round 2 — Deep Slurp + 2018 Burning Man Master Set (2026-06-21)

**Result:** catalog 160 → **313 rows**; high-res (≥2000px) 51 → **193**; heroes 15 → 65. Archive ~290 MB → ~925 MB.

## Sparceland deep-slurp (4 project pages)
Round-1 already had the pages' CDN images. New this round:
- **3 embedded YouTube videos** catalogued + maxres thumbnails → `Video-stills/`: `aw3dDEIexYk` + `JfWAQRnY8e0` (247-time-star), `F3QwScSPnZI` (ride-shift). Auto-subs blocked by YouTube **HTTP 429** — retry later.
- Social/donation pointers (FB `charlieblackcatsmith` + `sparselandstudios`, IG `artofsuchnsuch`, `PayPal.Me/thewakingbird`) confirmed in KB.
- `the-waking-birddog-2018-2` genuinely has only 1 image; `burning-book-tech` has no video.

## Ingest: `/Users/kk/Downloads/Charlie Smith BLackcat` (637 MB)
- 158 files (104 JPG + 52 DNG + 2 MP4). Per KK's decision: **DNG → 2560px JPG previews** (`sips`); `.dng` masters left in Downloads (not in repo). 2 MP4s → `Video/`, one keyframe each → `Video-stills/`.
- New folder **`Red-Hot-Cock-BM2018/`** (148 JPGs after dedup) — the **Burning Man / BRC Aug-2018 honorarium** set (distinct from the Okeechobee-March `Red-Hot-Cock-2018/`). EXIF: Canon 5D Mark IV + Galaxy S9, ~Aug 2018.
- **Full visual captioning:** every frame captioned via 4 parallel subagents (subject, people, scene_type, work_id, event, hero). 150 new `rights=kk-owned` rows; **142/150 ≥2000px**; 0 blank subjects.
- **Data-integrity fix:** agents mis-transcribed long UUID filenames in their output, so rows were re-keyed **positionally** against the real batch lists (filenames taken from disk, captions from agent records); batch 0 was re-captioned for clean 1:1. Final check: 148 files == 148 rows, zero ghost rows.
- **Dedup:** 8 exact dupes removed — 4 were KK's own Flickr re-exports already pulled in Round 1 (`#OMF16_*_o.jpg`, `KK__*_OMF18.jpg`), 4 internal phone/DNG repeats. Overlap with the existing archive was small; the bulk is previously-unpublished.
- **Mislabel fix:** 6 frames the vision pass guessed as `time-star` were 2018 RHC build shots (Time Star is a 2012 work) → corrected to `red-hot-cock`, confidence=low.

## Gaps / follow-ups (Round 2)
- 5 DNG previews are genuinely dark/near-black frames (flagged in notes); low value.
- ~79 of the new frames have no `work_id` (camp/crew/portrait not tied to a specific sculpture) — enrich opportunistically.
- The 52 `.dng` raw masters remain only in `~/Downloads/Charlie Smith BLackcat` (not backed up in the repo by decision).
- Sparceland video transcripts still pending (YouTube 429).

---

# Round 3 — KB Re-architecture + Canon + DNGs (2026-06-21)

**Result:** catalog 313 → **337 rows**; high-res(≥2000px) 193 → **211**; works 17 → **22**; archive becomes an **entity-based KB** (works/people/motifs/orgs + tags on every image).

## DNG masters into the archive
- Copied all **52 `.dng`** masters → `Red-Hot-Cock-BM2018/raw/` (~31 MB); now versioned alongside their JPG previews (resolves the Round-2 gap where raws lived only in `~/Downloads`).

## New photos — Burning Man gallery (rights=third-party)
- Discovered the gallery search is server-rendered: **24 Charlie Smith assets** at `gallery.burningman.org`. Pulled all 24 via signed 2048px `og:image` → `BurningMan-archive/`.
- Fills works that had **zero photos**: HEARTH (3), Synapses (1), Fire Birds (1), Infinite Infant (2), plus more Red Hot Cock / Fleeble / Time Star frames.
- Surfaced candidate works from gallery titles: **"Big Charles"** (×4, photog. Shane Evans) and **"Encompassment / Directional Vessels of Fire"** — catalogued low-confidence, flagged for Charlie to confirm.

## Works canon
- Added **Fire Birds of the Fifth Direction (2011)**, **Big Bully (2013)**, **Infinite Infant and the Trail of Toys (2014)** to `works.csv` + 2 candidates → **22 works**.
- Resolved `bigbullysm.jpg` → `big-bully`; re-linked the "unknown winged sculpture" OMF17-05 → `fire-birds` (design match).
- New **`Catalog/works.json`** — structured artwork records (interaction, fire_system, crew_model, ritual, motifs, image_count, sources, confidence). Red Hot Cock height reconciled to "≈25–30 ft".

## Entity layer (`entities/`)
- `entities/works/*.md` (22, generated from `works.json`), `people.md`, `motifs.md` (the contraptionism thesis + tag glossary), `organizations.md`, `README.md` (the map). Cross-linked with `[[wiki]]` refs.

## Tags
- Added a `tags` column to `images.csv`; **all 337 rows tagged** deterministically (work_id → motifs, event, scene, source/rights, hero). `manifest.json` upgraded to v2 (per-image tags + works detail + entities index + top-tags).

## KB narrative
- Added: the social-machine contraptionism frame; the 2011–2014 honoraria works; the dated **CV facts**; BM-gallery/archive sources; pointer to `entities/`. Kept the Burning-Book "not a verified 2026 honorarium" caveat.

## Gaps / follow-ups (Round 3)
- `big-charles` / `encompassment` are unconfirmed — confirm with Charlie (could be nicknames or distinct pieces).
- 3 gallery photos remain `work_id`-blank ("Visiting Robots", "A Naust", "Charlie and Leo").
- Sparceland/Charlie video transcripts still pending (YouTube 429).
- Per-work `.md` files are generated — edit `works.json`, not the `.md`, then re-run the generator.
