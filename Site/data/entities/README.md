# Entities — the knowledge-base map

This folder turns the Charlie "Blackcat" Smith archive from a flat image catalog into an **entity-based knowledge base**. Records cross-link with `[[wiki-style]]` references so the archive can power a website, gallery, "Ask Uncle Charlie" agent, press kit, or monograph.

## Structure

```
entities/
├── README.md            ← you are here (the map)
├── works/<work_id>.md   ← one record per artwork (22) — the canonical artwork records
├── people.md            ← Charlie, KK, collaborators, crew
├── motifs.md            ← the "contraptionism" thesis + motif/tag glossary
└── organizations.md     ← Sparceland, Burning Man Project, BRAF, ASS Camp, etc.
```

## How the pieces relate

- **Images** (`Catalog/images.csv`, 337 rows) — every photo, captioned, with `work_id`, `rights`, dimensions, `capture_date`, and `tags`. The binaries live in the event/work folders.
- **Works** (`Catalog/works.csv` + `Catalog/works.json`, 22) — structured artwork records (interaction, fire system, crew model, ritual, motifs, sources, confidence). `works/*.md` are the human-readable view, generated from `works.json`.
- **Manifest** (`Catalog/manifest.json`) — the single machine-readable export joining images + works + tags + entity index, for downstream apps.
- **Motifs/tags** — the shared vocabulary that links images ↔ works ↔ the contraptionism frame (see `motifs.md`).
- **Narrative** — the long-form bio/story stays in `Charlie-BlackCat-Smith-Knowledge-Base.md`; these entity files are the structured spine beneath it.

## Confidence

Records carry a `confidence` flag. `big-charles` and `encompassment` are **candidate works** surfaced from Burning Man gallery titles — unconfirmed; verify with Charlie before treating as canon.

_Generated 2026-06-21. Work `.md` files are regenerated from `Catalog/works.json`; edit the JSON (or the source data), not the generated files._
