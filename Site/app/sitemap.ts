import type { MetadataRoute } from "next";
import { getWorks } from "@/lib/data";

const BASE = "https://contraptionism.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const fixed = ["", "/gallery", "/works", "/ask", "/press", "/burning-book", "/credits"].map(
    (p) => ({ url: `${BASE}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.7 }),
  );
  const works = getWorks().map((w) => ({
    url: `${BASE}/works/${w.work_id}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  return [...fixed, ...works];
}
