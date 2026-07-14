import type { Metadata } from "next";
import { getManifest } from "@/lib/data";

export const metadata: Metadata = { title: "Credits & Rights" };

const RIGHTS_LABELS: Record<string, string> = {
  "kk-owned": "Kris Krüg — his own camera/phone (the bulk of the archive)",
  "charlie-site": "Charlie Smith / Sparseland Studios (from sparceland.com & howhowhow.com)",
  "charlie-archive": "Charlie's personal archive",
  "third-party": "Third-party — press outlets & the Burning Man photo gallery (credited per image)",
  "video-still": "Reference stills / thumbnails from video",
};

export default function CreditsPage() {
  const { stats } = getManifest();
  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <h1 className="font-display text-4xl uppercase">Credits & Rights</h1>
      <div className="forge-rule mt-3 w-40" />
      <p className="mt-5 leading-relaxed text-[--color-ink-dim]">
        This is an archival, documentary collection of the work of Charlie “Blackcat” Smith. Every
        image carries a <span className="ember-text">credit</span> and a{" "}
        <span className="ember-text">source</span> link, shown on each frame. Copyright remains with
        the credited photographers. Nothing here is offered for commercial reuse.
      </p>

      <h2 className="mt-10 font-display text-xl uppercase">Rights breakdown</h2>
      <dl className="mt-4 space-y-3">
        {Object.entries(stats.rights_breakdown).map(([k, n]) => (
          <div key={k} className="border-l-2 border-[--color-ember] pl-3">
            <dt className="font-mono text-xs uppercase tracking-wider text-[--color-flame]">
              {k} · {n} images
            </dt>
            <dd className="text-sm text-[--color-ink-dim]">{RIGHTS_LABELS[k] ?? k}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-10 font-mono text-xs leading-relaxed text-[--color-steel]">
        Source data + originals:{" "}
        <a href="https://github.com/WalksWithASwagger/uncle-charlie-smith" className="text-[--color-ember-bright]">
          github.com/WalksWithASwagger/uncle-charlie-smith
        </a>
        . If you are a rights-holder and want a frame removed or re-credited, open an issue there.
      </p>
    </div>
  );
}
