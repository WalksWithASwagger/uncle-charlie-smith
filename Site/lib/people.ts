import { getImages } from "./data";
import type { ImageRecord } from "./types";

// rank: hero first, then higher resolution (crisp reps, not thumbnails)
const rank = (a: ImageRecord, b: ImageRecord) =>
  (b.hero ? 1 : 0) - (a.hero ? 1 : 0) || (b.long_edge ?? 0) - (a.long_edge ?? 0);

// Find a representative photo whose subject mentions a name/keyword.
export function imageForName(keywords: string[]): ImageRecord | null {
  const imgs = getImages();
  for (const k of keywords) {
    const kk = k.toLowerCase();
    const m = imgs.filter((i) => i.subject.toLowerCase().includes(kk)).sort(rank)[0];
    if (m) return m;
  }
  return null;
}

/** Best (hero + high-res preferred) image carrying a given tag. */
export function imageForTag(tag: string): ImageRecord | null {
  return getImages().filter((i) => i.tags.includes(tag)).sort(rank)[0] ?? null;
}
