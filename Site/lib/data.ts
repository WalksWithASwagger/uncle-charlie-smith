import fs from "node:fs";
import path from "node:path";
import manifestJson from "@/data/manifest.json";
import worksJson from "@/data/works.json";
import cvJson from "@/data/cv.json";
import type { Manifest, ImageRecord, WorkRecord } from "./types";

const manifest = manifestJson as unknown as Manifest;

export type CV = {
  source: string;
  name: string;
  tagline: string;
  based: string;
  bio: string[];
  roles: string[];
  expertise: string[];
  career: { years: string; title: string; note: string }[];
  honoraria_grant_years: number[];
  honoraria_label: string;
  festivals: string[];
  clients: string[];
};

export function getCV(): CV {
  return cvJson as CV;
}

export function getManifest(): Manifest {
  return manifest;
}

let _images: ImageRecord[] | null = null;
export function getImages(): ImageRecord[] {
  if (_images) return _images;
  const seen = new Set<string>();
  _images = manifest.images.filter((i) => {
    if (i.status !== "local" || seen.has(i.path)) return false;
    seen.add(i.path);
    return true;
  });
  return _images;
}

export function getHeroImages(): ImageRecord[] {
  return getImages().filter((i) => i.hero);
}

export function getWorks(): WorkRecord[] {
  return (worksJson as { works: WorkRecord[] }).works;
}

export function getWork(id: string): WorkRecord | undefined {
  return getWorks().find((w) => w.work_id === id);
}

export function getWorkImages(id: string): ImageRecord[] {
  return getImages().filter((i) => i.work_id === id);
}

/** All distinct tags with counts, sorted by frequency. */
export function getTagCounts(): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const img of getImages())
    for (const t of img.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

/** Read a markdown entity file from the data snapshot (server-only). */
export function readEntity(relPath: string): string | null {
  const full = path.join(process.cwd(), "data", "entities", relPath);
  try {
    return fs.readFileSync(full, "utf8");
  } catch {
    return null;
  }
}
