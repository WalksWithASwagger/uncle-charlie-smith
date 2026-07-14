"use client";

import { motion, useReducedMotion } from "motion/react";

// Strung pennant bunting that gently flaps. Used for clients + festivals.
export function Bunting({ items }: { items: string[] }) {
  const reduce = useReducedMotion();
  return (
    <div className="relative flex flex-wrap items-start justify-center gap-x-1 gap-y-6 border-t border-[--color-line] px-4 py-8">
      {/* the string */}
      <div className="pointer-events-none absolute inset-x-0 top-6 h-px bg-[--color-line]" aria-hidden />
      {items.map((label, i) => (
        <motion.span
          key={label + i}
          className="relative z-10 inline-block origin-top"
          style={{ transformOrigin: "top center" }}
          animate={reduce ? undefined : { rotate: [(-2 + (i % 3)), (2 - (i % 3)), (-2 + (i % 3))] }}
          transition={reduce ? undefined : { duration: 3 + (i % 4) * 0.6, repeat: Infinity, ease: "easeInOut", delay: (i % 5) * 0.2 }}
        >
          <span
            className={`block px-3 pb-3 pt-2 text-center font-mono text-[11px] uppercase tracking-wide ${
              i % 2 ? "text-[--color-bg]" : "text-[--color-ink]"
            }`}
            style={{
              background: i % 2 ? "var(--color-ember)" : "var(--color-bg-2)",
              border: "2px solid var(--color-line)",
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              minWidth: 96,
            }}
          >
            {label}
          </span>
        </motion.span>
      ))}
    </div>
  );
}
