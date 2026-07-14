import workHeroes from "@/data/work-heroes.json";
import { getWorkImages } from "./data";

const map = workHeroes as Record<string, string>;
const MIN_HERO_EDGE = 1000;

/**
 * Best bright + crisp wide frame to headline a work's page (from work-heroes.json).
 * Fallback: the highest-res image if it clears MIN_HERO_EDGE; otherwise null, so the
 * page renders a bold typographic hero instead of upscaling a tiny thumbnail.
 */
export function workHero(workId: string): string | null {
  if (map[workId]) return map[workId];
  const best = getWorkImages(workId)
    .filter((i) => (i.long_edge ?? 0) >= MIN_HERO_EDGE)
    .sort((a, b) => (b.long_edge ?? 0) - (a.long_edge ?? 0))[0];
  return best?.path ?? null;
}
