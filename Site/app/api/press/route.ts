import { anthropic } from "@ai-sdk/anthropic";
import { generateText } from "ai";
import { getWork, getWorks, getWorkImages, getHeroImages } from "@/lib/data";
import { displayUrl } from "@/lib/images";
import { rateLimit } from "@/lib/ratelimit";

function heroFor(workId: string): string | null {
  if (workId === "_practice") {
    const h = getHeroImages()[0];
    return h ? displayUrl(h.path) : null;
  }
  const imgs = getWorkImages(workId);
  const hero = imgs.find((i) => i.hero) ?? imgs[0];
  return hero ? displayUrl(hero.path) : null;
}

export const maxDuration = 30;

const AUDIENCE: Record<string, string> = {
  press: "a journalist / press outlet — newsworthy hook, vivid scene, quotable lines, the facts.",
  grant: "a grant or arts-funding committee — artistic merit, community impact, feasibility, lineage.",
  sponsor: "a festival sponsor / partner — audience, spectacle, brand-safe activation, what they get.",
};

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY)
    return Response.json({ error: "ANTHROPIC_API_KEY not set in environment." }, { status: 503 });

  const limit = rateLimit(req);
  if (!limit.ok)
    return Response.json({ error: "Rate limited — try again shortly." }, { status: 429 });

  const { workId, audience } = (await req.json()) as { workId: string; audience: string };
  const aud = AUDIENCE[audience] ?? AUDIENCE.press;

  let subject: string;
  if (workId === "_practice") {
    subject =
      "Charlie's whole practice — 'contraptionism': 30 years of community-built kinetic fire sculpture.\n\n" +
      getWorks()
        .filter((w) => w.confidence !== "low")
        .map((w) => `- ${w.title} (${w.year_start}): ${w.description}`)
        .join("\n");
  } else {
    const w = getWork(workId);
    if (!w) return Response.json({ error: "unknown work" }, { status: 404 });
    subject = JSON.stringify(w, null, 2);
  }

  const { text } = await generateText({
    // fast/cheap model for testing — swap back to claude-sonnet-4-6 (or opus) for production quality
    model: anthropic("claude-haiku-4-5"),
    temperature: 0.5,
    system:
      "You write tight, human, one-page kits for the artist Charlie \"Blackcat\" Smith. " +
      "Ground every claim in the provided record — do NOT invent specs, dates, or quotes. " +
      "If sources disagree on a number, hedge (e.g. '≈25–30 ft'). The Burning Book of Brian is an " +
      "INDEPENDENT memorial, not a verified 2026 Burning Man honorarium — never imply otherwise. " +
      "Avoid polished-AI fluff; write like a maker. Output clean Markdown: a punchy title, a 2-sentence " +
      "hook, 3-5 short sections with bold labels, a fast-facts list, and a one-line credit/contact footer.",
    prompt: `Write a one-page ${audience.toUpperCase()} kit for ${aud}\n\nSOURCE RECORD:\n${subject}`,
  });

  return Response.json({ text, hero: heroFor(workId) });
}
