"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

// The black dot = "the period" (Charlie's flag: the end of a sentence). Doubles as back-to-top.
export function PeriodToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 800);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.15, rotate: 8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top — the period at the end of the sentence"
          title="the period · back to top"
          className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border-2 border-[--color-ink] bg-[--color-ink]"
        >
          <span className="h-4 w-4 rounded-full bg-[--color-bg]" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
