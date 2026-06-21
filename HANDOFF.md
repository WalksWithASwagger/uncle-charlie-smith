# HANDOFF — for Claude Code (photo + media ingestion)

**Why this exists:** The Cowork session built the *knowledge/metadata* archive but **cannot download web binaries** (no tool writes a remote file into the workspace; curl/wget/python web-fetch is blocked there). Claude Code **can** (curl, `gallery-dl`, `yt-dlp`, `exiftool`). This doc hands off the binary-ingestion work.

Repo root: `Uncle Charlie/` (GitHub: github.com/WalksWithASwagger/uncle-charlie-smith). Read `README.md` first (folder map + metadata model), then `Charlie-BlackCat-Smith-Knowledge-Base.md`.

---

## Priority 1 — Download the Flickr photos into the right folders

All target rows are already in **`Catalog/images.csv`** marked **`PENDING DOWNLOAD`**, each with the Flickr URL, `work_id`, event, credit, and a hero flag. Per-event drop targets + KK's labels are in each folder's `_captions.md` / `_about.md`.

**Albums → folders (owner is `kris krüg` / user `kk`; KK owns these, so full-res is allowed):**
| Album | Event | → Folder |
|---|---|---|
| `72157664196141677` | Okeechobee 2018 (#OMF18) — Red Hot Cock | `Red-Hot-Cock-2018/` |
| `72157665485765901` | Okeechobee 2016 (#OMF16) — Kulture Haus | `Okeechobee-2016/` |
| `72157665299462772` | Fleeble Flobbler (OMF16) | `Okeechobee-2016/` (or a `Fleeble/` subfolder) |
| OMF 2017 (find album id on kk's photostream) | Okeechobee 2017 | `Okeechobee-2017/` (Ganesha shots → `Ganesha/`) |

Individual hero/Ganesha/OMF17 photo IDs are the `PENDING DOWNLOAD` rows in `images.csv` (e.g., Ganesha build `33189087926`, detail `32386641124`; OMF17 portal `33098669092`).

**Recommended method** (any one):
- **Easiest:** Flickr → *You → Albums → [album] → Download* (owner zip, full-res) → unzip into the folder.
- **Scripted:** `gallery-dl "https://www.flickr.com/photos/kk/albums/<ALBUM_ID>"` (handles Flickr albums; supports auth for originals).
- **Per-photo (API):** `flickr.photos.getSizes` → grab the "Original"/largest URL → curl. Map by the photo IDs in `images.csv`.

**Naming convention:** `work-id__event-year__short-desc__<flickrid>.jpg` (e.g., `red-hot-cock__omf18__nightfire__25706908187.jpg`). Keep the Flickr ID in the name so it maps back to `images.csv`.

**After download, for each folder:**
1. `exiftool` → pull camera + capture date; write date/credit back into `images.csv`.
2. Dedupe (`fdupes -r .` or md5) — note: Cowork couldn't delete files; you can.
3. Open the "TBD" frames, write real subjects into the relevant `_captions.md` and `images.csv` (flip `PENDING DOWNLOAD` → the local filename).

---

## Priority 2 — Video transcripts (2 unviewed)

In `Media-Index.md`, two leads aren't transcribed. Use `yt-dlp` auto-subs:
```
yt-dlp --skip-download --write-auto-sub --sub-lang en --convert-subs srt "https://www.youtube.com/watch?v=eL3aEgK2YCs"   # Red Hot Cock build, 2018
yt-dlp --skip-download --write-auto-sub --sub-lang en --convert-subs srt "https://www.youtube.com/watch?v=bRfHe2OxmY4"   # "Meet The Blackcats" 2024-25
```
Clean → save as `Transcripts/Transcript-RedHotCock-Build-2018.md` and `Transcripts/Transcript-Meet-The-Blackcats-2024.md`; add stories/facts to the KB.

---

## Priority 3 — Best-20 MOODBOARD (after full-res lands)
`MOODBOARD/` currently holds 17 lower-res local copies + `_README.md` (with the hero-shot list + Midjourney style cues). Once full-res originals are in the event folders, replace the low-res ones with the flagged heroes and curate to the strongest 20.

---

## Remaining backlog (nice-to-have)
- Transcribe the other **14 poems** (GIFs at `howhowhow.com/poems/<name>.gif`; list in `Poetry/Charlie-Poetry.md`). OCR with `tesseract` or eyeball them.
- Save the **howhowhow.com news-page photo galleries** (per-event albums listed in the KB's exhibition timeline).
- **Git:** init/commit/push the whole archive to `uncle-charlie-smith`.
- Confirm with Charlie the open items: **Solar Scope** status, **contraptionism.com** intent (both have zero external footprint).

---

## Gotchas (don't regress these)
- **Disambiguation:** ignore other "Charlie Smith" artists (CHARLIE SMITH LONDON gallery; UK sculptor charliesmithsculpture). Ours = Atlanta / Burning Man / Sparseland / Blackcat / artofsuchnsuch.
- **ASS Camp** = "Art of Such & Such" (Charlie) AND "Art Support Services" (KK) — both are used.
- Crew has **both a "Lil Joe" and a "Little Ed"** (the 2023 interview's auto-caption "Little Joe" ≈ Lil Joe).
- **The Burning Book of Brian is NOT an official 2026 BM honorarium** (verified) — independent memorial.
- Time Star official BM title = **"Timing Is Everything"** (2012); BeltLine title = "A 24/7 Timestar Lives" (24 ft).
- One Fleeble/OMF16 photo (`25510149811`) is by Flickr user **thru-my-eyes**, not KK — keep that credit.
- Metadata schema is defined in `README.md`; keep `images.csv` / `works.csv` columns intact.
