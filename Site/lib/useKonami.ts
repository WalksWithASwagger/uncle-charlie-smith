"use client";

import { useEffect, useRef } from "react";

const SEQ = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

export function useKonami(onUnlock: () => void) {
  const pos = useRef(0);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const want = SEQ[pos.current];
      if (e.key.toLowerCase() === want.toLowerCase()) {
        pos.current++;
        if (pos.current === SEQ.length) {
          pos.current = 0;
          onUnlock();
        }
      } else {
        pos.current = e.key === SEQ[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onUnlock]);
}
