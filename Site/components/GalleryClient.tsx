"use client";

import { useEffect, useMemo, useState } from "react";
import { PhotoWall } from "@/components/PhotoWall";
import type { ImageRecord } from "@/lib/types";

type Props = {
  images: ImageRecord[];
  tags: { tag: string; count: number }[];
  initialTag?: string;
  initialQ?: string;
  initialHero?: boolean;
};

export function GalleryClient({ images, tags, initialTag, initialQ, initialHero }: Props) {
  const [active, setActive] = useState<string | null>(initialTag ?? null);
  const [q, setQ] = useState(initialQ ?? "");
  const [heroOnly, setHeroOnly] = useState(initialHero ?? false);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return images.filter((img) => {
      if (heroOnly && !img.hero) return false;
      if (active && !img.tags.includes(active)) return false;
      if (needle) {
        const hay = `${img.subject} ${img.credit ?? ""} ${img.tags.join(" ")} ${img.event ?? ""}`.toLowerCase();
        if (!hay.includes(needle)) return false;
      }
      return true;
    });
  }, [images, active, q, heroOnly]);

  useEffect(() => {
    const p = new URLSearchParams();
    if (active) p.set("tag", active);
    if (heroOnly) p.set("hero", "1");
    if (q.trim()) p.set("q", q.trim());
    const qs = p.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }, [active, q, heroOnly]);

  return (
    <div>
      <div className="sticky top-[53px] z-30 border-y-2 border-[--color-line] bg-[--color-bg]/92 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="search the fire…"
            aria-label="Search images"
            className="w-full max-w-xs rounded-sm border-2 border-[--color-line] bg-[--color-bg-2] px-3 py-1.5 font-mono text-xs outline-none placeholder:text-[--color-steel] focus:border-[--color-ember]"
          />
          <button
            onClick={() => setHeroOnly((v) => !v)}
            className={`sticker rounded-sm border-2 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider transition ${
              heroOnly ? "border-[--color-ember] bg-[--color-ember] text-[--color-bg]" : "border-[--color-line] text-[--color-ink-dim] hover:border-[--color-ember]"
            }`}
          >
            ★ Heroes
          </button>
          {active && (
            <button onClick={() => setActive(null)} className="rounded-sm border-2 border-[--color-ember] px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-[--color-ember-bright]">
              ✕ {active}
            </button>
          )}
          <span className="ml-auto font-mono text-[11px] text-[--color-steel]">{filtered.length} / {images.length}</span>
        </div>
        <div className="mx-auto mt-2 flex max-w-[1600px] flex-wrap gap-1.5">
          {tags.slice(0, 30).map(({ tag, count }) => (
            <button
              key={tag}
              onClick={() => setActive(active === tag ? null : tag)}
              className={`rounded-full border px-2 py-0.5 font-mono text-[10px] transition ${
                active === tag ? "border-[--color-ember] bg-[--color-ember]/25 text-[--color-ember-bright]" : "border-[--color-line] text-[--color-ink-dim] hover:border-[--color-flame]"
              }`}
            >
              {tag} <span className="text-[--color-steel]">{count}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="px-2 py-4">
        <PhotoWall images={filtered} />
      </div>
    </div>
  );
}
