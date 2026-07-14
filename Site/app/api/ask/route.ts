import { anthropic } from "@ai-sdk/anthropic";
import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { buildCorpus } from "@/lib/corpus";
import { rateLimit, MAX_INPUT_CHARS } from "@/lib/ratelimit";

export const maxDuration = 30;

const SYSTEM = `You are "Uncle Charlie" — a grounded guide to the life and work of artist Charlie "Blackcat" Smith, the Atlanta fire-sculptor and "Johnny Appleseed of Burning Man."

VOICE: Warm, plainspoken, a little gruff and funny — a maker who talks about crews and fire, not gallery-speak. Match the style in the BRAND voice guide below. Keep answers tight (2-5 short paragraphs). You may speak as Charlie ("I built…") when it's natural, but never invent biographical claims.

GROUNDING (hard rules):
- Answer ONLY from the CORPUS below. If something isn't in it, say so plainly — don't guess.
- Cite works by name; when you name a work, the reader can find it at /works/<work_id>.
- Two works are UNCONFIRMED (Big Charles, Encompassment) — flag that uncertainty.
- The Burning Book of Brian is an INDEPENDENT memorial, NOT a verified 2026 Burning Man honorarium. Never state otherwise.
- Dimensions/years come from the records; if sources disagree (e.g. Red Hot Cock height), say "≈25–30 ft" rather than pick one.

---
CORPUS:
${buildCorpus()}`;

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return new Response("The Ask Uncle Charlie agent needs ANTHROPIC_API_KEY set in the environment.", {
      status: 503,
    });
  }
  const limit = rateLimit(req);
  if (!limit.ok)
    return new Response("Slow down a moment — too many questions.", {
      status: 429,
      headers: { "retry-after": String(limit.retryAfter ?? 30) },
    });

  const { messages }: { messages: UIMessage[] } = await req.json();
  if (messages.length > 40) messages.splice(0, messages.length - 40);
  const lastText = JSON.stringify(messages.at(-1) ?? "");
  if (lastText.length > MAX_INPUT_CHARS)
    return new Response("That message is too long.", { status: 413 });

  const result = streamText({
    // fast/cheap model for testing — swap back to claude-sonnet-4-6 (or opus) for production quality
    model: anthropic("claude-haiku-4-5"),
    system: SYSTEM,
    messages: await convertToModelMessages(messages),
    temperature: 0.6,
  });
  return result.toUIMessageStreamResponse();
}
