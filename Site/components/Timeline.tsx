"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { displayUrl } from "@/lib/images";

export type TLItem = { id: string; title: string; year: string; type: string; hero: string | null };

export function Timeline({ items }: { items: TLItem[] }) {
  const viewport = useRef<HTMLDivElement>(null);

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[--color-bg] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[--color-bg] to-transparent" />
      <div ref={viewport} className="overflow-hidden">
        <motion.ol
          drag="x"
          dragConstraints={viewport}
          dragElastic={0.08}
          className="flex cursor-grab gap-4 px-6 py-4 active:cursor-grabbing"
        >
          {items.map((w, i) => (
            <motion.li
              key={w.id}
              className="relative w-56 shrink-0"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.03, 0.4) }}
            >
              <Link href={`/works/${w.id}`} className="group block">
                <div className="font-display text-3xl font-700 ember-text">{w.year}</div>
                <div className="mt-1 mb-2 h-2 w-2 rounded-full bg-[--color-ember]" />
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm border-2 border-[--color-line] bg-[--color-bg-2] transition group-hover:border-[--color-ember]">
                  {w.hero ? (
                    <Image src={displayUrl(w.hero)} alt={w.title} fill sizes="224px" draggable={false} className="object-cover transition duration-500 group-hover:scale-110" />
                  ) : (
                    <div className="flex h-full items-center justify-center p-3 text-center font-display text-xl uppercase leading-none text-[--color-steel]">{w.title}</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-2">
                    <div className="font-display text-sm uppercase leading-tight text-[--color-ink] group-hover:text-[--color-ember-bright]">{w.title}</div>
                    <div className="font-mono text-[9px] text-[--color-flame]">{w.type}</div>
                  </div>
                </div>
              </Link>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </div>
  );
}
