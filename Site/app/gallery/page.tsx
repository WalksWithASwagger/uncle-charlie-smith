import type { Metadata } from "next";
import { getImages, getTagCounts } from "@/lib/data";
import { GalleryClient } from "@/components/GalleryClient";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Every catalogued photo of Charlie “Blackcat” Smith's fire machines — filterable by work, motif, and event.",
};

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string; q?: string; hero?: string }>;
}) {
  const { tag, q, hero } = await searchParams;
  const images = getImages();
  const tags = getTagCounts();
  return (
    <div>
      <div className="mx-auto max-w-7xl px-5 pt-10">
        <h1 className="font-display text-4xl uppercase">The Gallery</h1>
        <div className="forge-rule mt-3 w-40" />
        <p className="mt-3 max-w-2xl text-sm text-[--color-ink-dim]">
          {images.length} catalogued frames across 30 years of flaming steel — builds, burns,
          crews, and camps. Every image carries its credit and source. Click any frame for detail.
        </p>
      </div>
      <GalleryClient images={images} tags={tags} initialTag={tag} initialQ={q} initialHero={hero === "1"} />
    </div>
  );
}
