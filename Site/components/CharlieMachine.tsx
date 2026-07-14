"use client";

import { Fragment, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { motion, useReducedMotion } from "motion/react";
import { displayUrl, BLUR } from "@/lib/images";
import isms from "@/data/charlie-isms.json";

type Work = { id: string; title: string };
type Ism = { q: string; g: string };
const POOL = isms as Ism[];

const PUNCHCARDS = [
  "What is contraptionism?",
  "Tell me about the Red Hot Cock.",
  "What's the Burning Book of Brian?",
  "Who's in ASS Camp?",
  "Why fire?",
];

function textOf(m: { parts?: { type: string; text?: string }[] }): string {
  return (m.parts ?? []).filter((p) => p.type === "text").map((p) => p.text).join("");
}

export function CharlieMachine({
  works,
  facePath,
  faceAlt,
}: {
  works: Work[];
  facePath: string;
  faceAlt: string;
}) {
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/ask" }),
  });
  const [input, setInput] = useState("");
  const [crank, setCrank] = useState(0); // bumps per submit → re-fires sparks + picks a fresh bark
  const reduce = useReducedMotion();
  const busy = status === "submitted" || status === "streaming";

  const sorted = useMemo(() => [...works].sort((a, b) => b.title.length - a.title.length), [works]);

  function submit(text: string) {
    if (!text.trim() || busy) return;
    setCrank((c) => c + 1);
    sendMessage({ text });
    setInput("");
  }

  // No API key (503) / network error → the machine still barks a canned Charlie-ism.
  const cannedMode = !!error;
  const bark = POOL[crank % POOL.length];

  const lastAssistant = [...messages].reverse().find((m) => m.role === "assistant");
  const mentioned = lastAssistant
    ? sorted.filter((w) => textOf(lastAssistant).toLowerCase().includes(w.title.toLowerCase())).slice(0, 3)
    : [];

  return (
    <div className="sticker relative overflow-hidden rounded-md border-[3px] border-[--color-ember] bg-gradient-to-b from-[--color-bg-2] to-[--color-bg] shadow-[6px_6px_0_0_rgba(0,0,0,0.6)]">
      {/* bulb ring */}
      <BulbRing reduce={!!reduce} />

      {/* maker's plate */}
      <div className="flex items-center justify-between border-b-2 border-[--color-line] bg-[--color-ember] px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-[--color-bg]">
        <span>Uncle Charlie · Model 1997</span>
        <span className="hidden sm:inline">⚙ no spectators · only operators ⚙</span>
        <span>● ● ●</span>
      </div>

      <div className="grid gap-0 md:grid-cols-[minmax(0,32%)_1fr]">
        {/* ── LEFT BAY: the face ── */}
        <div className="relative min-h-[260px] border-b-2 border-[--color-line] md:border-b-0 md:border-r-2">
          <Image
            src={displayUrl(facePath)}
            alt={faceAlt}
            fill
            sizes="(max-width:768px) 100vw, 32vw"
            placeholder="blur"
            blurDataURL={BLUR}
            className={`object-cover object-top ${reduce ? "" : "flicker"}`}
          />
          {/* flame wash + readout glow */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[--color-ember]/55 via-transparent to-[--color-bg]/30 mix-blend-multiply" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,122,46,0.35),transparent_60%)]" />
          {/* corner rivets = the "period" motif */}
          <Rivet className="left-2 top-2" />
          <Rivet className="right-2 top-2" />
          <Rivet className="left-2 bottom-2" />
          <Rivet className="right-2 bottom-2" />
          <div className="absolute inset-x-0 bottom-0 p-3">
            <div className="font-display text-3xl font-700 uppercase leading-[0.85] text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.9)]">
              The man,<br />the <span className="ember-text">machine</span>
            </div>
          </div>
        </div>

        {/* ── RIGHT BAY: the readout ── */}
        <div className="relative flex min-h-[360px] flex-col p-4">
          {/* spark burst, re-mounted each crank */}
          {!reduce && <SparkBurst key={crank} />}

          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[--color-flame]">
            ▸ the mouth of the machine
          </p>

          <div className="mt-3 flex-1 space-y-3 overflow-y-auto pr-1" style={{ maxHeight: 360 }}>
            {messages.length === 0 && !cannedMode && (
              <p className="font-mono text-sm text-[--color-ink-dim]">
                well hello, beautiful human. pull a card or yank the lever — ask me anything about
                the work, the crew, the fire.
              </p>
            )}

            {messages.map((m) => (
              <div key={m.id} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                <div
                  className={`max-w-[88%] whitespace-pre-wrap rounded-sm border px-3 py-2 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "border-[--color-line] bg-[--color-bg-2] text-[--color-ink]"
                      : "border-[--color-ember]/50 bg-[--color-ember]/10 text-[--color-ink]"
                  }`}
                >
                  {m.role === "assistant" && (
                    <span className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-[--color-flame]">
                      Uncle Charlie
                    </span>
                  )}
                  {m.role === "assistant" ? <Linkified text={textOf(m)} works={sorted} /> : textOf(m)}
                </div>
              </div>
            ))}

            {busy && <p className="font-mono text-xs text-[--color-steel]">…stoking the fire…</p>}

            {/* canned bark when the brain isn't wired yet */}
            {cannedMode && (
              <div className="flex justify-start">
                <div className="max-w-[88%] rounded-sm border border-[--color-ember]/50 bg-[--color-ember]/10 px-3 py-2 text-sm">
                  <span className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-[--color-flame]">
                    Uncle Charlie
                  </span>
                  <p className="font-display text-lg uppercase leading-tight text-[--color-ink]">{bark.q}</p>
                  <p className="mt-2 font-mono text-[10px] text-[--color-steel]">
                    (running on canned sparks — my full brain lights up once the key’s in)
                  </p>
                </div>
              </div>
            )}

            {!busy && mentioned.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="font-mono text-[10px] uppercase text-[--color-steel]">more →</span>
                {mentioned.map((w) => (
                  <Link
                    key={w.id}
                    href={`/works/${w.id}`}
                    className="rounded-full border border-[--color-line] px-2.5 py-0.5 font-mono text-[10px] text-[--color-ember-bright] hover:border-[--color-ember]"
                  >
                    {w.title} ↗
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* punch cards */}
          {messages.length === 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {PUNCHCARDS.map((s) => (
                <button
                  key={s}
                  onClick={() => submit(s)}
                  className="sticker rounded-[2px] border border-[--color-line] bg-[--color-bg] px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-[--color-ink-dim] transition hover:border-[--color-ember] hover:text-[--color-ember-bright]"
                >
                  ▦ {s}
                </button>
              ))}
            </div>
          )}

          {/* slot + lever */}
          <form onSubmit={(e) => { e.preventDefault(); submit(input); }} className="mt-3 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="feed a question into the slot…"
              aria-label="Ask Uncle Charlie a question"
              className="flex-1 rounded-sm border-2 border-[--color-line] bg-black/40 px-3 py-2.5 font-mono text-sm outline-none placeholder:text-[--color-steel] focus:border-[--color-ember]"
            />
            <motion.button
              type="submit"
              disabled={busy}
              whileTap={reduce ? undefined : { y: 3 }}
              className="sticker rounded-sm border-2 border-[--color-ember] bg-[--color-ember] px-4 font-display text-sm uppercase tracking-wide text-[--color-bg] transition hover:bg-[--color-ember-bright] disabled:opacity-50"
            >
              ↓ Lever
            </motion.button>
          </form>
          <p className="mt-2 font-mono text-[10px] text-[--color-steel]">
            Grounded in the <Link href="/works" className="text-[--color-ember-bright]">works archive</Link> — it won’t make things up.
          </p>
        </div>
      </div>
    </div>
  );
}

function Rivet({ className = "" }: { className?: string }) {
  return (
    <span
      className={`absolute h-2.5 w-2.5 rounded-full border border-black/60 bg-[--color-ink] shadow-[inset_0_-1px_1px_rgba(0,0,0,0.6)] ${className}`}
      aria-hidden
    />
  );
}

function BulbRing({ reduce }: { reduce: boolean }) {
  return (
    <div className="flex items-center justify-center gap-2 bg-[--color-bg] px-3 py-1.5" aria-hidden>
      {Array.from({ length: 24 }, (_, i) => (
        <span
          key={i}
          className={`h-1.5 w-1.5 rounded-full ${reduce ? "" : "flicker"}`}
          style={{
            background: i % 2 ? "var(--color-flame)" : "var(--color-ember-bright)",
            boxShadow: "0 0 5px 1px rgba(255,122,46,0.7)",
            animationDelay: `${(i % 6) * 0.4}s`,
          }}
        />
      ))}
    </div>
  );
}

// radial ember burst, re-mounted each submit (key) — mirrors CharlieIsm's spark feel
function SparkBurst() {
  return (
    <div className="pointer-events-none absolute right-6 top-6 z-10" aria-hidden>
      {Array.from({ length: 14 }, (_, i) => (
        <motion.span
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full"
          style={{
            background: i % 2 ? "var(--color-flame)" : "var(--color-ember-bright)",
            boxShadow: "0 0 6px 1px rgba(255,122,46,0.7)",
          }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: Math.cos((i / 14) * Math.PI * 2) * (50 + (i % 5) * 12),
            y: Math.sin((i / 14) * Math.PI * 2) * (40 + (i % 4) * 12),
            opacity: 0,
            scale: 0.3,
          }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

// linkify work-title mentions in the assistant's reply → /works/<id>
function Linkified({ text, works }: { text: string; works: Work[] }) {
  if (!works.length) return <>{text}</>;
  const escaped = works.map((w) => w.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const re = new RegExp(`(${escaped.join("|")})`, "gi");
  const parts = text.split(re);
  return (
    <>
      {parts.map((part, i) => {
        const match = works.find((w) => w.title.toLowerCase() === part.toLowerCase());
        return match ? (
          <Link key={i} href={`/works/${match.id}`} className="text-[--color-ember-bright] underline decoration-dotted underline-offset-2">
            {part}
          </Link>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        );
      })}
    </>
  );
}
