"use client";
/* eslint-disable react-hooks/set-state-in-effect -- intentional: the count-up tween drives state from a requestAnimationFrame loop inside the effect. */

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

export function CountUp({ to, label }: { to: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) { setN(to); return; }
    let raf = 0;
    const start = performance.now();
    const dur = 1100;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, reduce]);

  return (
    <div ref={ref}>
      <div className="font-display text-5xl font-700 ember-text">{n}</div>
      <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[--color-steel]">{label}</div>
    </div>
  );
}
