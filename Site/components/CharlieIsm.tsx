"use client";
/* eslint-disable react-hooks/purity -- intentional: Math.random drives per-mount spark jitter in motion props (presentational, not logic). */

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import isms from "@/data/charlie-isms.json";

type Ism = { q: string; g: string };
const POOL = isms as Ism[];

export function CharlieIsm() {
  const [ism, setIsm] = useState<Ism>(POOL[0]);
  const [spin, setSpin] = useState(false);
  const [burst, setBurst] = useState(0);
  const reduce = useReducedMotion();
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  function yank() {
    if (spin) return;
    setBurst((b) => b + 1);
    const pick = () => POOL[Math.floor(Math.random() * POOL.length)];
    if (reduce) { setIsm(pick()); return; }
    setSpin(true);
    let n = 0;
    timer.current = setInterval(() => {
      setIsm(pick());
      if (++n > 11) {
        clearInterval(timer.current!);
        setIsm(pick());
        setSpin(false);
      }
    }, 70);
  }

  return (
    <div className="sticker relative mx-auto max-w-2xl overflow-hidden rounded-sm border-2 border-[--color-ember] bg-[--color-bg-2]">
      <div className="flex items-center justify-between border-b-2 border-[--color-line] bg-[--color-ember] px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-[--color-bg]">
        <span>Pull a Charlie-ism</span>
        <span>✦ ✦ ✦</span>
      </div>

      {/* display window */}
      <div className="relative flex min-h-[180px] items-center justify-center px-6 py-8 text-center">
        <Sparks key={burst} />
        <AnimatePresence mode="popLayout">
          <motion.div
            key={ism.q + spin}
            initial={reduce ? false : { y: spin ? -14 : 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduce ? undefined : { y: 14, opacity: 0 }}
            transition={{ duration: spin ? 0.07 : 0.35, ease: "easeOut" }}
            className="relative"
          >
            <p className="font-display text-2xl uppercase leading-tight text-[--color-ink] sm:text-4xl">
              {ism.q}
            </p>
            {ism.g && !spin && (
              <p className="mt-3 font-mono text-xs text-[--color-flame]">— {ism.g}</p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* lever */}
      <div className="border-t-2 border-[--color-line] p-3">
        <button
          onClick={yank}
          disabled={spin}
          className="group w-full rounded-sm border-2 border-[--color-ember] bg-[--color-bg] py-3 font-display text-xl uppercase tracking-wide text-[--color-ember-bright] transition active:translate-y-0.5 disabled:opacity-60 hover:bg-[--color-ember] hover:text-[--color-bg]"
        >
          {spin ? "…ka-chunk…" : "↓ Yank the lever ↓"}
        </button>
      </div>
    </div>
  );
}

function Sparks() {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {Array.from({ length: 14 }, (_, i) => (
        <motion.span
          key={i}
          className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full"
          style={{ background: i % 2 ? "var(--color-flame)" : "var(--color-ember-bright)", boxShadow: "0 0 6px 1px rgba(255,122,46,0.7)" }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: Math.cos((i / 14) * Math.PI * 2) * (60 + Math.random() * 60),
            y: Math.sin((i / 14) * Math.PI * 2) * (40 + Math.random() * 50),
            opacity: 0,
            scale: 0.3,
          }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}
