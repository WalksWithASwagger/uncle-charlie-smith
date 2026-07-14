import fs from "node:fs";
import path from "node:path";
import { getImages, getWorks } from "./data";

const DATA = path.join(process.cwd(), "data");

function readDir(rel: string): string {
  const dir = path.join(DATA, rel);
  let out = "";
  try {
    for (const f of fs.readdirSync(dir)) {
      if (!f.endsWith(".md")) continue;
      out += `\n\n### FILE: ${rel}/${f}\n` + fs.readFileSync(path.join(dir, f), "utf8");
    }
  } catch {
    /* missing dir → skip */
  }
  return out;
}

let cached: string | null = null;

/** The full grounding corpus, stuffed into the system prompt (~25K tokens). */
export function buildCorpus(): string {
  if (cached) return cached;

  const works = getWorks()
    .map(
      (w) =>
        `- ${w.title} (${w.work_id}, ${w.year_start ?? "?"}): ${w.type}. ${w.description}` +
        (w.interaction ? ` Interaction: ${w.interaction}.` : "") +
        (w.confidence === "low" ? " [UNCONFIRMED — needs Charlie's word]" : ""),
    )
    .join("\n");

  // compact caption index grouped by work
  const byWork = new Map<string, string[]>();
  for (const img of getImages()) {
    const k = img.work_id ?? "(uncategorized)";
    if (!byWork.has(k)) byWork.set(k, []);
    byWork.get(k)!.push(img.subject);
  }
  const captions = [...byWork.entries()]
    .map(([k, subs]) => `## ${k} (${subs.length} photos)\n` + subs.slice(0, 30).map((s) => `- ${s}`).join("\n"))
    .join("\n\n");

  cached =
    `# WORKS (canonical list)\n${works}\n\n` +
    `# BRAND — voice, worldview, glossary${readDir("brand")}\n\n` +
    `# ENTITIES — works, people, motifs, organizations${readDir("entities")}${readDir("entities/works")}\n\n` +
    `# TRANSCRIPTS${readDir("transcripts")}\n\n` +
    `# PHOTO CAPTIONS BY WORK\n${captions}\n`;

  return cached;
}
