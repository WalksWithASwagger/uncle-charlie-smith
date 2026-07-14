"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export function TiltCard({
  children,
  className,
  rotate = 0,
}: {
  children: ReactNode;
  className?: string;
  rotate?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ rotate }}
      whileHover={{ rotate: 0, scale: 1.04, zIndex: 20 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
    >
      {children}
    </motion.div>
  );
}
