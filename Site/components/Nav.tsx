"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  ["/about", "Charlie"],
  ["/gallery", "Gallery"],
  ["/works", "Works"],
  ["/timeline", "Timeline"],
  ["/people", "People"],
  ["/motifs", "Motifs"],
  ["/ask", "Ask Uncle Charlie"],
  ["/press", "Press Kit"],
  ["/burning-book", "Burning Book"],
];

export function Nav() {
  const path = usePathname();
  return (
    <header className="sticky top-0 z-40 border-b-2 border-[--color-ember] bg-[--color-bg]/85 backdrop-blur">
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-5 py-3">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-display text-xl font-700 tracking-wide uppercase">
            Contraption<span className="ember-text">ism</span>
          </span>
          <span className="hidden font-mono text-[10px] text-[--color-ink-dim] sm:inline">Charlie “Blackcat” Smith</span>
        </Link>
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs uppercase tracking-wider">
          {LINKS.map(([href, label]) => {
            const active = path === href || (href !== "/" && path.startsWith(href));
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`transition-colors ${active ? "text-[--color-ember-bright]" : "text-[--color-ink-dim] hover:text-[--color-ember-bright]"}`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
