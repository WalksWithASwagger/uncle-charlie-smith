"use client";
/* eslint-disable react-hooks/purity -- intentional: Math.random drives per-mount spark-poof jitter in motion props (presentational, not logic). */

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

// The whole practice in one toy: you DO the participation. Rock the teeter-totter,
// it howls fire, the crowd counts. Pass a high-res Red Hot Cock frame as `src`.
export function RockTheCock({ src }: { src: string }) {
  const [tilt, setTilt] = useState(0); // -1 | 0 | 1
  const [count, setCount] = useState(0);
  const [poof, setPoof] = useState(0);
  const reduce = useReducedMotion();

  const rock = useCallback(() => {
    setTilt((t) => (t === 1 ? -1 : 1));
    setCount((c) => c + 1);
    setPoof((p) => p + 1);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" && (e.target as HTMLElement)?.tagName !== "INPUT") {
        e.preventDefault();
        rock();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [rock]);

  const milestone = count > 0 && count % 10 === 0;

  return (
    <section className="border-y-2 border-[--color-ember] bg-[--color-bg-2] py-12">
      <div className="mx-auto max-w-4xl px-5 text-center">
        <h2 className="font-display text-3xl uppercase sm:text-5xl">
          Rock the <span className="ember-text">Cock</span>
        </h2>
        <p className="mt-2 font-mono text-xs uppercase tracking-wider text-[--color-steel]">
          Tap the bird — or hit space. Two groups of thirty did this at sunrise.
        </p>

        {/* the contraption */}
        <motion.button
          onClick={rock}
          aria-label="Rock the Cock"
          className="relative mx-auto mt-8 block h-64 w-64 cursor-pointer select-none sm:h-80 sm:w-80"
          animate={reduce ? {} : { x: milestone ? [0, -6, 6, -4, 0] : 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* poof at the beak */}
          <Poof key={poof} on={!reduce} />
          {/* the rocking bird */}
          <motion.div
            className="absolute inset-x-0 bottom-6 top-0 origin-bottom"
            animate={reduce ? {} : { rotate: tilt * 11 }}
            transition={{ type: "spring", stiffness: 120, damping: 8 }}
          >
            <div className="relative h-full w-full overflow-hidden rounded-sm border-2 border-[--color-line]">
              <Image src={src} alt="Uncle Charlie's Red Hot Cock" fill sizes="320px" className="object-cover" />
            </div>
          </motion.div>
          {/* pivot / base */}
          <div className="absolute inset-x-8 bottom-4 h-3 rounded-full bg-[--color-ember]" />
          <div className="absolute bottom-0 left-1/2 h-6 w-6 -translate-x-1/2 rotate-45 bg-[--color-steel]" />
        </motion.button>

        <div className="mt-6 font-display text-2xl uppercase">
          {count === 0 ? (
            <span className="text-[--color-steel]">give it a rock →</span>
          ) : (
            <span className="ember-text">{count} {count === 1 ? "rock" : "rocks"}{milestone ? " — IT HOWLS FIRE! 🔥" : ""}</span>
          )}
        </div>
      </div>
    </section>
  );
}

function Poof({ on }: { on: boolean }) {
  if (!on) return null;
  return (
    <div className="pointer-events-none absolute left-1/2 top-2 z-10 -translate-x-1/2" aria-hidden>
      {Array.from({ length: 10 }, (_, i) => (
        <motion.span
          key={i}
          className="absolute h-2 w-2 rounded-full"
          style={{ background: i % 2 ? "var(--color-flame)" : "var(--color-ember-bright)", boxShadow: "0 0 8px 2px rgba(255,122,46,0.8)" }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{ x: (Math.random() - 0.5) * 80, y: -40 - Math.random() * 60, opacity: 0, scale: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}
