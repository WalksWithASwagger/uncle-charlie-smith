// Generate 1600px-long-edge JPEG derivatives for every local archive image,
// written into the archive repo at web/<path>.jpg. Serving small sources keeps
// next/image fast (originals are up to ~15 MB). Run from the site repo:
//   node scripts/build-derivatives.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ARCHIVE =
  process.env.ARCHIVE_PATH || path.resolve(__dirname, "../..");
const MANIFEST = path.join(ARCHIVE, "Catalog", "manifest.json");
const OUT_ROOT = path.join(ARCHIVE, "web");
const MAX_EDGE = 1600;

const images = JSON.parse(fs.readFileSync(MANIFEST, "utf8")).images.filter(
  (i) => i.status === "local",
);

let made = 0, skipped = 0, missing = 0;
for (const img of images) {
  const src = path.join(ARCHIVE, img.path);
  const out = path.join(OUT_ROOT, img.path) + ".jpg";
  if (!fs.existsSync(src)) { missing++; continue; }
  if (fs.existsSync(out) && fs.statSync(out).mtimeMs >= fs.statSync(src).mtimeMs) {
    skipped++; continue;
  }
  fs.mkdirSync(path.dirname(out), { recursive: true });
  try {
    await sharp(src, { failOn: "none" })
      .rotate()
      .resize(MAX_EDGE, MAX_EDGE, { fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(out);
    made++;
    if (made % 25 === 0) console.log(`  …${made} made`);
  } catch (e) {
    console.warn(`  ! ${img.path}: ${e.message}`);
    missing++;
  }
}
console.log(`DONE derivatives: made=${made} skipped=${skipped} missing/err=${missing} → ${OUT_ROOT}`);
