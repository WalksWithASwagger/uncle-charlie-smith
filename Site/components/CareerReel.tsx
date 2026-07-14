"use client";

import { useRef } from "react";
import { motion } from "motion/react";

type Stop = { years: string; title: string; note: string };

// A crank-driven filmstrip of how the machine got built. Drag pattern mirrors Timeline.tsx.
export function CareerReel({ stops }: { stops: Stop[] }) {
  const viewport = useRef<HTMLDivElement>(null);
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[--color-bg] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[--color-bg] to-transparent" />
      <div ref={viewport} className="overflow-hidden">
        <motion.ol
          drag="x"
          dragConstraints={viewport}
          dragElastic={0.08}
          className="flex cursor-grab gap-4 px-6 py-2 active:cursor-grabbing"
        >
          {stops.map((s, i) => (
            <motion.li
              key={s.title}
              className="w-64 shrink-0"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.3) }}
            >
              {/* film-frame sprocket holes */}
              <div className="flex justify-between px-1 pb-1">
                {Array.from({ length: 6 }, (_, k) => (
                  <span key={k} className="h-1.5 w-1.5 rounded-[1px] bg-[--color-line]" aria-hidden />
                ))}
              </div>
              <div className={`sticker h-full rounded-sm border-2 border-[--color-line] bg-[--color-bg-2] p-4 ${i % 2 ? "tilt-r" : "tilt-l"}`}>
                <div className="font-mono text-[11px] uppercase tracking-wider text-[--color-flame]">{s.years}</div>
                <div className="mt-2 font-display text-lg uppercase leading-tight text-[--color-ember-bright]">{s.title}</div>
                <p className="mt-2 text-sm leading-snug text-[--color-ink-dim]">{s.note}</p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </div>
  );
}
