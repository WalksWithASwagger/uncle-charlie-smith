import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-5 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-[--color-flame]">404 · burned down</p>
      <h1 className="mt-4 font-display text-5xl uppercase sm:text-7xl">
        Nothing<span className="ember-text"> here</span>
      </h1>
      <p className="mt-4 text-[--color-ink-dim]">
        This page went up in smoke — or never existed. The fire’s still going elsewhere.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3 font-mono text-xs uppercase tracking-wider">
        <Link href="/" className="rounded-sm bg-[--color-ember] px-4 py-2 text-[--color-bg] transition hover:bg-[--color-ember-bright]">
          Home →
        </Link>
        <Link href="/gallery" className="rounded-sm border border-[--color-line] px-4 py-2 text-[--color-ink-dim] transition hover:border-[--color-ember] hover:text-[--color-ember-bright]">
          The gallery
        </Link>
      </div>
    </div>
  );
}
