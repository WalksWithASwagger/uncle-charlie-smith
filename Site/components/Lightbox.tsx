"use client";
/* eslint-disable react-hooks/set-state-in-effect -- intentional: reset the "copied" flag when the viewed image changes. */

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { imageUrl, displayUrl } from "@/lib/images";
import type { ImageRecord } from "@/lib/types";

export function Lightbox({
  images,
  index,
  onClose,
  onIndex,
}: {
  images: ImageRecord[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const open = index !== null && images[index];
  const nav = useCallback(
    (d: number) => {
      if (index === null) return;
      const n = index + d;
      if (n >= 0 && n < images.length) onIndex(n);
    },
    [index, images.length, onIndex],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") nav(1);
      else if (e.key === "ArrowLeft") nav(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, nav, onClose]);

  return (
    <AnimatePresence>
      {open && index !== null && (
        <Inner img={images[index]} onClose={onClose} nav={nav} />
      )}
    </AnimatePresence>
  );
}

function Inner({ img, onClose, nav }: { img: ImageRecord; onClose: () => void; nav: (d: number) => void }) {
  const [copied, setCopied] = useState(false);
  useEffect(() => setCopied(false), [img.path]);

  function copyCredit() {
    const text = `${img.subject} — ${img.credit ?? "uncredited"}${img.source ? ` (${img.source})` : ""}`;
    navigator.clipboard?.writeText(text).then(() => setCopied(true)).catch(() => {});
  }

  return (
    <motion.div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={img.subject}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-3 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <button aria-label="Previous" onClick={(e) => { e.stopPropagation(); nav(-1); }} className="absolute left-2 top-1/2 z-10 -translate-y-1/2 px-2 font-display text-4xl text-[--color-ink-dim] hover:text-[--color-ember-bright] sm:left-5">‹</button>
      <button aria-label="Next" onClick={(e) => { e.stopPropagation(); nav(1); }} className="absolute right-2 top-1/2 z-10 -translate-y-1/2 px-2 font-display text-4xl text-[--color-ink-dim] hover:text-[--color-ember-bright] sm:right-5">›</button>

      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-sm border border-[--color-line] bg-[--color-bg-2] md:flex-row"
        initial={{ scale: 0.92, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", stiffness: 240, damping: 26 }}
      >
        <div className="relative flex flex-1 items-center justify-center bg-black">
          <AnimatePresence mode="wait">
            <motion.div
              key={img.path}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex items-center justify-center"
            >
              <Image
                src={displayUrl(img.path)}
                alt={img.subject}
                width={img.width ?? 1400}
                height={img.height ?? 1000}
                className="mx-auto max-h-[55vh] w-auto object-contain md:max-h-[92vh]"
              />
            </motion.div>
          </AnimatePresence>
        </div>
        <aside className="w-full shrink-0 space-y-3 overflow-y-auto p-5 font-mono text-xs text-[--color-ink-dim] md:w-80">
          <button onClick={onClose} aria-label="Close" className="ember-text float-right text-lg">✕</button>
          <p className="font-sans text-base leading-snug text-[--color-ink]">{img.subject}</p>
          {img.work_id && (
            <Link href={`/works/${img.work_id}`} className="inline-block rounded-sm bg-[--color-ember] px-2 py-0.5 text-[10px] uppercase text-[--color-bg]">
              {img.work_id} →
            </Link>
          )}
          <dl className="space-y-1 pt-1">
            {img.event && <Row k="Event" v={img.event} />}
            {img.capture_date && <Row k="Date" v={img.capture_date} />}
            {img.credit && <Row k="Credit" v={img.credit} />}
            {img.rights && <Row k="Rights" v={img.rights} />}
            {img.width && <Row k="Size" v={`${img.width}×${img.height}`} />}
          </dl>
          <div className="flex flex-wrap gap-1">
            {img.tags.slice(0, 12).map((t) => (
              <span key={t} className="rounded-full border border-[--color-line] px-1.5 py-0.5 text-[9px]">{t}</span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 pt-1">
            <a href={imageUrl(img.path)} target="_blank" rel="noreferrer" className="text-[--color-ember-bright]">full-res ↗</a>
            {img.source && <a href={img.source} target="_blank" rel="noreferrer" className="text-[--color-ember-bright]">source ↗</a>}
            <button onClick={copyCredit} className="text-[--color-ember-bright]">{copied ? "copied ✓" : "copy credit"}</button>
          </div>
        </aside>
      </motion.div>
    </motion.div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex gap-2">
      <dt className="w-14 shrink-0 text-[--color-steel]">{k}</dt>
      <dd className="text-[--color-ink]">{v}</dd>
    </div>
  );
}
