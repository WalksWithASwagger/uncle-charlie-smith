"use client";
/* eslint-disable react-hooks/set-state-in-effect -- intentional: reset pagination when the filtered image set changes. */

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { displayUrl, BLUR } from "@/lib/images";
import { Lightbox } from "@/components/Lightbox";
import type { ImageRecord } from "@/lib/types";

// The varied-tile "wall of fire" collage, shared by the gallery and work pages.
function span(img: ImageRecord): string {
  const r = (img.width ?? 1) / (img.height ?? 1);
  if (img.hero && r > 1.25) return "col-span-2 row-span-2";
  if (r > 1.4) return "col-span-2";
  if (r < 0.72) return "row-span-2";
  return "";
}

export function PhotoWall({
  images,
  pageSize = 60,
}: {
  images: ImageRecord[];
  pageSize?: number;
}) {
  const [shown, setShown] = useState(pageSize);
  const [idx, setIdx] = useState<number | null>(null);
  const sentinel = useRef<HTMLDivElement>(null);

  useEffect(() => setShown(pageSize), [images, pageSize]);

  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (e) => e[0].isIntersecting && setShown((s) => Math.min(s + pageSize, images.length)),
      { rootMargin: "1000px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [images.length, pageSize]);

  const visible = images.slice(0, shown);

  return (
    <>
      <div className="grid auto-rows-[44vw] grid-cols-2 gap-2 sm:auto-rows-[22vw] sm:grid-cols-4 lg:auto-rows-[12vw] lg:grid-cols-6 2xl:auto-rows-[10vw] 2xl:grid-cols-8">
        {visible.map((img, i) => (
          <button
            key={img.path + i}
            onClick={() => setIdx(i)}
            className={`group relative block overflow-hidden rounded-sm border-2 border-[--color-line] bg-[--color-bg-2] transition hover:z-10 hover:border-[--color-ember] ${span(img)}`}
          >
            <Image
              src={displayUrl(img.path)}
              alt={img.subject}
              fill
              sizes="(max-width:640px) 50vw, (max-width:1024px) 25vw, 17vw"
              className="object-cover transition duration-500 group-hover:scale-110"
              loading="lazy"
              placeholder="blur"
              blurDataURL={BLUR}
            />
            {img.hero && <span className="absolute left-1.5 top-1.5 rounded-sm bg-[--color-ember] px-1 font-mono text-[9px] text-[--color-bg]">★</span>}
            <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 to-transparent p-2 font-mono text-[10px] leading-tight text-[--color-ink] opacity-0 transition group-hover:opacity-100">
              {img.subject}
            </span>
          </button>
        ))}
      </div>
      {shown < images.length && <div ref={sentinel} className="h-10" />}
      <Lightbox images={images} index={idx} onClose={() => setIdx(null)} onIndex={setIdx} />
    </>
  );
}
