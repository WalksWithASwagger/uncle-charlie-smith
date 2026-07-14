"use client";

import { Fragment, useMemo, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import Link from "next/link";

type Work = { id: string; title: string };

const SUGGESTIONS = [
  "What is contraptionism?",
  "Tell me about the Red Hot Cock.",
  "Which works use fire cauldrons?",
  "What's the Burning Book of Brian?",
];

function textOf(m: { parts?: { type: string; text?: string }[] }): string {
  return (m.parts ?? []).filter((p) => p.type === "text").map((p) => p.text).join("");
}

export function AskClient({ works }: { works: Work[] }) {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/ask" }),
  });
  const [input, setInput] = useState("");
  const busy = status === "submitted" || status === "streaming";

  // longest titles first so "Red Hot Cock" wins over a substring
  const sorted = useMemo(() => [...works].sort((a, b) => b.title.length - a.title.length), [works]);

  function submit(text: string) {
    if (!text.trim() || busy) return;
    sendMessage({ text });
    setInput("");
  }

  // works named in the last assistant message → follow-up chips
  const lastAssistant = [...messages].reverse().find((m) => m.role === "assistant");
  const mentioned = lastAssistant
    ? sorted.filter((w) => textOf(lastAssistant).toLowerCase().includes(w.title.toLowerCase())).slice(0, 3)
    : [];

  return (
    <div className="mx-auto flex min-h-[calc(100vh-9rem)] max-w-3xl flex-col px-5 py-10">
      <h1 className="font-display text-4xl uppercase">Ask Uncle Charlie</h1>
      <div className="forge-rule mt-3 w-40" />
      <p className="mt-3 text-sm text-[--color-ink-dim]">
        A guide grounded only in the archive — works, transcripts, and Charlie’s own words. It won’t
        make things up; if it doesn’t know, it’ll tell you.
      </p>

      <div className="mt-6 flex-1 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => submit(s)}
                className="rounded-sm border border-[--color-line] px-3 py-1.5 font-mono text-xs text-[--color-ink-dim] transition hover:border-[--color-ember] hover:text-[--color-ember-bright]"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {messages.map((m) => (
          <div key={m.id} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
            <div
              className={`max-w-[85%] whitespace-pre-wrap rounded-sm border px-4 py-3 text-sm leading-relaxed ${
                m.role === "user"
                  ? "border-[--color-line] bg-[--color-bg-2] text-[--color-ink]"
                  : "border-[--color-ember]/40 bg-[--color-ember]/5 text-[--color-ink]"
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

      <form
        onSubmit={(e) => { e.preventDefault(); submit(input); }}
        className="sticky bottom-4 mt-6 flex gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="ask about the work, the crew, the fire…"
          aria-label="Ask a question"
          className="flex-1 rounded-sm border border-[--color-line] bg-[--color-bg-2] px-4 py-3 text-sm outline-none placeholder:text-[--color-steel] focus:border-[--color-ember]"
        />
        <button
          type="submit"
          disabled={busy}
          className="rounded-sm bg-[--color-ember] px-5 font-mono text-xs uppercase tracking-wider text-[--color-bg] transition hover:bg-[--color-ember-bright] disabled:opacity-50"
        >
          send
        </button>
      </form>
      <p className="mt-2 font-mono text-[10px] text-[--color-steel]">
        Grounded in the <Link href="/works" className="text-[--color-ember-bright]">works archive</Link>.
        Answers can still be wrong — verify load-bearing facts.
      </p>
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
