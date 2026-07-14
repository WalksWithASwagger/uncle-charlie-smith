"use client";
/* eslint-disable react-hooks/purity -- intentional: Math.random varies each chicken's crossing duration in a motion prop (presentational, not logic). */

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useKonami } from "@/lib/useKonami";
import isms from "@/data/charlie-isms.json";

// His poems are full of chickens. One occasionally struts across the bottom of the
// screen; the Konami code unleashes a whole flock + a Charlie-ism. Pure delight, dismissible.
export function Critters() {
  const reduce = useReducedMotion();
  const [chickens, setChickens] = useState<number[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  // an occasional lone chicken
  useEffect(() => {
    if (reduce) return;
    let id = 0;
    const tick = () => {
      setChickens((c) => [...c, id++]);
      schedule();
    };
    let t: ReturnType<typeof setTimeout>;
    const schedule = () => { t = setTimeout(tick, 25000 + Math.random() * 35000); };
    schedule();
    return () => clearTimeout(t);
  }, [reduce]);

  useKonami(() => {
    let id = 1000;
    setChickens((c) => [...c, ...Array.from({ length: 8 }, () => id++)]);
    const pick = (isms as { q: string }[])[Math.floor(Math.random() * isms.length)];
    setToast(pick.q);
    setTimeout(() => setToast(null), 4000);
  });

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden" aria-hidden>
      <AnimatePresence>
        {chickens.map((id) => (
          <motion.div
            key={id}
            className="absolute text-3xl"
            style={{ bottom: `${6 + (id % 5) * 7}%` }}
            initial={{ left: "-8%" }}
            animate={{ left: "108%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 7 + Math.random() * 4, ease: "linear" }}
            onAnimationComplete={() => setChickens((c) => c.filter((x) => x !== id))}
          >
            <span className="inline-block [animation:flicker_0.4s_steps(2)_infinite]">🐔</span>
          </motion.div>
        ))}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-sm border-2 border-[--color-ember] bg-[--color-bg] px-5 py-3 text-center font-display text-xl uppercase text-[--color-ember-bright] shadow-[4px_4px_0_rgba(0,0,0,0.6)]"
          >
            🔥 {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
