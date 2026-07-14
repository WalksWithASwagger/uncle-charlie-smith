"use client";

import { useState } from "react";

type WorkOpt = { id: string; title: string; year: string | null };
const AUDIENCES = ["press", "grant", "sponsor"] as const;

// minimal, dependency-free markdown → HTML (headings, bold, lists, paragraphs)
function md(src: string): string {
  const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const inline = (s: string) => esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  const out: string[] = [];
  let list = false;
  for (const raw of src.split("\n")) {
    const line = raw.trimEnd();
    const h = line.match(/^(#{1,4})\s+(.*)/);
    const li = line.match(/^[-*]\s+(.*)/);
    if (li) {
      if (!list) { out.push("<ul>"); list = true; }
      out.push(`<li>${inline(li[1])}</li>`);
      continue;
    }
    if (list) { out.push("</ul>"); list = false; }
    if (h) out.push(`<h${h[1].length}>${inline(h[2])}</h${h[1].length}>`);
    else if (line) out.push(`<p>${inline(line)}</p>`);
  }
  if (list) out.push("</ul>");
  return out.join("\n");
}

export function PressClient({ works }: { works: WorkOpt[] }) {
  const [workId, setWorkId] = useState("red-hot-cock");
  const [audience, setAudience] = useState<(typeof AUDIENCES)[number]>("press");
  const [text, setText] = useState("");
  const [hero, setHero] = useState<string | null>(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true); setErr(""); setText("");
    try {
      const res = await fetch("/api/press", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ workId, audience }),
      });
      const data = await res.json();
      if (!res.ok) setErr(data.error ?? "generation failed");
      else { setText(data.text); setHero(data.hero ?? null); }
    } catch {
      setErr("network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-6">
      <div className="flex flex-wrap items-end gap-3 print:hidden">
        <label className="flex flex-col gap-1 font-mono text-[10px] uppercase tracking-wider text-[--color-steel]">
          Work
          <select
            value={workId}
            onChange={(e) => setWorkId(e.target.value)}
            className="rounded-sm border border-[--color-line] bg-[--color-bg-2] px-3 py-2 font-sans text-sm text-[--color-ink]"
          >
            <option value="_practice">★ Whole practice (Contraptionism)</option>
            {works.map((w) => (
              <option key={w.id} value={w.id}>{w.title} {w.year ? `(${w.year})` : ""}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 font-mono text-[10px] uppercase tracking-wider text-[--color-steel]">
          Audience
          <select
            value={audience}
            onChange={(e) => setAudience(e.target.value as (typeof AUDIENCES)[number])}
            className="rounded-sm border border-[--color-line] bg-[--color-bg-2] px-3 py-2 font-sans text-sm text-[--color-ink]"
          >
            {AUDIENCES.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
        </label>
        <button
          onClick={generate}
          disabled={loading}
          className="rounded-sm bg-[--color-ember] px-5 py-2 font-mono text-xs uppercase tracking-wider text-[--color-bg] transition hover:bg-[--color-ember-bright] disabled:opacity-50"
        >
          {loading ? "drafting…" : "generate"}
        </button>
        {text && (
          <button
            onClick={() => window.print()}
            className="rounded-sm border border-[--color-line] px-4 py-2 font-mono text-xs uppercase tracking-wider text-[--color-ink-dim] hover:border-[--color-ember]"
          >
            print / PDF
          </button>
        )}
      </div>

      {err && <p className="mt-4 font-mono text-xs text-[--color-ember-bright]">⚠ {err}</p>}

      {text && (
        <div className="press-sheet mt-8 overflow-hidden rounded-sm border border-[--color-line] bg-[--color-bg-2] print:border-0 print:bg-white print:text-black">
          {hero && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={hero} alt="" className="max-h-72 w-full object-cover" />
          )}
          <div className="p-8 print:p-0" dangerouslySetInnerHTML={{ __html: md(text) }} />
        </div>
      )}
    </div>
  );
}
