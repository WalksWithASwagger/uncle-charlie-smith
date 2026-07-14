// For each work, pick the brightest WIDE frame as its page hero (so a project
// page never opens on a near-black night shot). Writes data/work-heroes.json
// ({work_id: path}). Run after derivatives:  node scripts/build-work-heroes.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ARCHIVE =
  process.env.ARCHIVE_PATH || path.resolve(__dirname, "../..");
const m = JSON.parse(fs.readFileSync("data/manifest.json", "utf8"));
const works = JSON.parse(fs.readFileSync("data/works.json", "utf8")).works;

const byWork = new Map();
for (const i of m.images) {
  if (i.status !== "local" || !i.work_id || !i.width || !i.height) continue;
  if (!byWork.has(i.work_id)) byWork.set(i.work_id, []);
  byWork.get(i.work_id).push(i);
}

async function brightness(p) {
  const f = path.join(ARCHIVE, "web", p + ".jpg");
  if (!fs.existsSync(f)) return -1;
  try {
    const s = await sharp(f).stats();
    return 0.299 * s.channels[0].mean + 0.587 * s.channels[1].mean + 0.114 * s.channels[2].mean;
  } catch {
    return -1;
  }
}

const MIN_HERO_EDGE = 1000; // below this, a full-bleed hero is a pixelated blow-up → use a typographic hero instead

const out = {};
for (const w of works) {
  const imgs = byWork.get(w.work_id) || [];
  // prefer wide, real photos (not diagrams/renders), big enough not to pixelate
  const wide = imgs.filter(
    (i) => i.width / i.height > 1.3 && !i.tags.includes("diagram") && !i.tags.includes("render"),
  );
  const bigEnough = (wide.length ? wide : imgs).filter((i) => (i.long_edge ?? 0) >= MIN_HERO_EDGE);
  const pool = bigEnough.length ? bigEnough : []; // no decent-res frame → leave unmapped (typographic hero)
  // score blends brightness with a gentle resolution bonus so crisp, bright frames win
  let best = null, bestScore = -1;
  for (const i of pool) {
    const b = await brightness(i.path);
    if (b < 0) continue;
    const score = b + Math.min((i.long_edge ?? 0) / 1000, 4) * 6;
    if (score > bestScore) { bestScore = score; best = i.path; }
  }
  if (best) out[w.work_id] = best;
}
fs.writeFileSync("data/work-heroes.json", JSON.stringify(out, null, 1));
console.log(`work-heroes.json: ${Object.keys(out).length} works mapped`);
