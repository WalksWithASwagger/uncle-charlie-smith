"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { imageUrl } from "@/lib/images";
import type { ReactNode } from "react";

// A full-bleed image band with a slow parallax drift + overlaid content.
export function ParallaxBand({
  path,
  children,
  height = "h-[80vh]",
  dim = 0.5,
  align = "items-center",
}: {
  path: string;
  children?: ReactNode;
  height?: string;
  dim?: number;
  align?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className={`relative ${height} overflow-hidden`}>
      <motion.div className="absolute inset-0 -top-[8%] -bottom-[8%]" style={reduce ? undefined : { y }}>
        <Image src={imageUrl(path)} alt="" fill sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0" style={{ backgroundColor: `rgba(12,10,9,${dim})` }} />
      <div className={`relative mx-auto flex h-full max-w-5xl flex-col justify-center ${align} px-5 [text-shadow:0_2px_24px_rgba(0,0,0,0.9)] sm:px-10`}>
        {children}
      </div>
    </section>
  );
}
