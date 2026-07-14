// Refresh the site's data snapshot from the archive (repo root).
//   node scripts/sync-archive.mjs   (or: npm run sync)
// Override with ARCHIVE_PATH=... (defaults to ../.. from this script = repo root).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ARCHIVE =
  process.env.ARCHIVE_PATH || path.resolve(__dirname, "../..");
const DATA = path.join(process.cwd(), "data");

function copyFile(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}
function copyMd(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) return 0;
  let n = 0;
  for (const f of fs.readdirSync(srcDir)) {
    if (f.endsWith(".md")) { copyFile(path.join(srcDir, f), path.join(destDir, f)); n++; }
  }
  return n;
}

copyFile(path.join(ARCHIVE, "Catalog/manifest.json"), path.join(DATA, "manifest.json"));
copyFile(path.join(ARCHIVE, "Catalog/works.json"), path.join(DATA, "works.json"));
copyFile(path.join(ARCHIVE, "Catalog/cv.json"), path.join(DATA, "cv.json"));
const e1 = copyMd(path.join(ARCHIVE, "entities"), path.join(DATA, "entities"));
const e2 = copyMd(path.join(ARCHIVE, "entities/works"), path.join(DATA, "entities/works"));
const b = copyMd(path.join(ARCHIVE, "Brand"), path.join(DATA, "brand"));
const t = copyMd(path.join(ARCHIVE, "Transcripts"), path.join(DATA, "transcripts"));

const m = JSON.parse(fs.readFileSync(path.join(DATA, "manifest.json"), "utf8"));
console.log(
  `synced: manifest(${m.images.length} imgs) + works.json + cv.json + entities(${e1}+${e2}) + brand(${b}) + transcripts(${t})`,
);
