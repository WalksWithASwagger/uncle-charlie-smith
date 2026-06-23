#!/usr/bin/env python3
"""Regenerate Catalog/manifest.json from images.csv + works.json.

The manifest is the machine export the site consumes (via `npm run sync`).
Run from the archive root after editing images.csv:  python3 Catalog/build-manifest.py
"""
import csv, json, collections, datetime, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
CSV = ROOT / "Catalog" / "images.csv"
WORKS = ROOT / "Catalog" / "works.json"
OUT = ROOT / "Catalog" / "manifest.json"

ENTITIES = {
    "works": "entities/works/*.md",
    "people": "entities/people.md",
    "motifs": "entities/motifs.md",
    "organizations": "entities/organizations.md",
    "lore": "entities/lore/*.md",
    "works_structured": "Catalog/works.json",
}
TOP_TAG_MIN = 18  # a tag is a "top tag" once it appears on >= this many images


def s(v):
    """Empty string -> None (matches the hand-curated manifest)."""
    v = (v or "").strip()
    return v or None


def build_images():
    out = []
    with open(CSV, newline="") as f:
        for r in csv.DictReader(f):
            w = int(r["width"]) if r.get("width", "").strip() else None
            h = int(r["height"]) if r.get("height", "").strip() else None
            tags = sorted(t for t in (r.get("tags") or "").split(";") if t.strip())
            out.append({
                "file": r["file"],
                "path": f'{r["folder"]}/{r["file"]}',
                "work_id": s(r["work_id"]),
                "subject": s(r["subject"]),
                "event": s(r["event"]),
                "year": s(r["year"]),
                "credit": s(r["credit"]),
                "source": s(r["source"]),
                "rights": s(r["rights"]),
                "width": w,
                "height": h,
                "long_edge": max(w, h) if w and h else None,
                "capture_date": s(r["capture_date"]),
                "hero": (r.get("hero") or "").strip().lower() in ("yes", "true"),
                "confidence": s(r["confidence"]),
                "status": s(r["status"]),
                "tags": tags,
                "notes": (r.get("notes") or "").strip(),
            })
    return out


def build_stats(images, n_works):
    rights = collections.Counter(i["rights"] for i in images if i["rights"])
    tags = collections.Counter(t for i in images for t in i["tags"])
    top = {k: v for k, v in sorted(tags.items(), key=lambda kv: (-kv[1], kv[0])) if v >= TOP_TAG_MIN}
    return {
        "total_images": len(images),
        "local_files": sum(1 for i in images if i["status"] == "local"),
        "hero_shots": sum(1 for i in images if i["hero"]),
        "high_res_2000plus": sum(1 for i in images if (i["long_edge"] or 0) >= 2000),
        "works": n_works,
        "rights_breakdown": dict(rights),
        "top_tags": top,
    }


def main():
    works = json.load(open(WORKS))
    works = works["works"] if isinstance(works, dict) else works
    images = build_images()
    manifest = {
        "archive": 'Charlie "Blackcat" Smith — Public Image Archive',
        "generated": datetime.date.today().isoformat(),
        "schema_version": 2,
        "stats": build_stats(images, len(works)),
        "entities": ENTITIES,
        "works": works,
        "images": images,
    }
    json.dump(manifest, open(OUT, "w"), indent=2, ensure_ascii=False)
    open(OUT, "a").write("\n")
    print(f"manifest.json: {len(images)} images, {len(works)} works, "
          f"{manifest['stats']['hero_shots']} heroes, {len(manifest['stats']['top_tags'])} top tags")


if __name__ == "__main__":
    main()
