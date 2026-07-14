"use client";
/* eslint-disable react-hooks/set-state-in-effect -- intentional: random sparks are generated post-mount so server/client render identically; lazy init would reintroduce a hydration mismatch. */

import { useEffect, useState } from "react";

// Drifting ember particles. Generated on the client (after mount) to avoid
// hydration mismatch, and skipped entirely under reduced-motion.
export function Sparks({ count = 18 }: { count?: number }) {
  const [sparks, setSparks] = useState<{ left: number; delay: number; dur: number; size: number }[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setSparks(
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        delay: Math.random() * 6,
        dur: 4 + Math.random() * 5,
        size: 1.5 + Math.random() * 2.5,
      })),
    );
  }, [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {sparks.map((s, i) => (
        <span
          key={i}
          className="absolute bottom-0 rounded-full"
          style={{
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            background: i % 3 === 0 ? "var(--color-flame)" : "var(--color-ember-bright)",
            boxShadow: "0 0 6px 1px rgba(255,122,46,0.7)",
            animation: `ember-rise ${s.dur}s linear ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
