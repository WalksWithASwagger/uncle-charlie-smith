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
