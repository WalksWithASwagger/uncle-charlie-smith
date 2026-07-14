"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { imageUrl } from "@/lib/images";

type Frame = { path: string; width: number | null; height: number | null };

export function HeroReel({ frames, intervalMs = 5200 }: { frames: Frame[]; intervalMs?: number }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || frames.length < 2) return;
    const t = setInterval(() => setI((p) => (p + 1) % frames.length), intervalMs);
    return () => clearInterval(t);
  }, [frames.length, intervalMs, reduce]);

  if (!frames.length) return null;

  if (reduce) {
    return (
      <div className="absolute inset-0">
        <Image src={imageUrl(frames[0].path)} alt="" fill priority sizes="100vw" className="object-cover" />
      </div>
    );
  }

  const cur = frames[i];
  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={cur.path}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.06 }}
            animate={{ scale: 1.2 }}
            transition={{ duration: intervalMs / 1000 + 1.6, ease: "linear" }}
          >
            <Image src={imageUrl(cur.path)} alt="" fill priority={i === 0} sizes="100vw" className="object-cover" />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
