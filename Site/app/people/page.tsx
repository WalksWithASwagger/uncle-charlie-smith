import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { readEntity } from "@/lib/data";
import { imageForName } from "@/lib/people";
import { displayUrl } from "@/lib/images";

export const metadata: Metadata = {
  title: "People & Crew",
  description: "Charlie's collaborators and the ASS Camp crew behind the fire machines.",
};

function keywordsFor(name: string): string[] {
  const tokens = name.replace(/[“"().,]/g, " ").split(/\s+/).filter((t) => /^[A-Za-zÀ-ÿ]{3,}$/.test(t));
  const kw = tokens.filter((t) => !["Camp", "Red", "Hot", "Cock", "The", "and"].includes(t));
  if (/crew/i.test(name)) kw.push("crew");
  return kw;
}

export default function PeoplePage() {
  const md = readEntity("people.md") ?? "";
  const sections = md
    .split(/\n## /)
    .slice(1)
    .map((block) => {
      const [name, ...rest] = block.split("\n");
      return { name: name.trim(), body: rest.join("\n").trim() };
    });

  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <h1 className="font-display text-6xl font-700 uppercase sm:text-8xl">People & <span className="ember-text">Crew</span></h1>
      <div className="forge-rule mt-3 w-40" />
      <p className="mt-4 max-w-2xl text-lg text-[--color-ink-dim]">
        The collaborators and the ragtag ASS Camp crew — the people who make the machines go.
      </p>

      <div className="mt-10 space-y-12">
        {sections.map((s) => {
          const img = imageForName(keywordsFor(s.name));
          return (
            <section key={s.name} className="grid gap-6 sm:grid-cols-[200px_1fr]">
              <div>
                {img ? (
                  <div className="relative aspect-[4/5] overflow-hidden rounded-sm border-2 border-[--color-line]">
                    <Image src={displayUrl(img.path)} alt={s.name} fill sizes="200px" className="object-cover" />
                  </div>
                ) : (
                  <div className="flex aspect-[4/5] items-center justify-center rounded-sm border-2 border-[--color-line] bg-[--color-bg-2] p-3 text-center font-display text-2xl uppercase leading-none text-[--color-steel]">
                    {s.name.split(/[\s(]/)[0]}
                  </div>
                )}
              </div>
              <div className="border-l-2 border-[--color-ember] pl-5">
                <h2 className="font-display text-2xl uppercase text-[--color-ink]">{s.name}</h2>
                <div className="mt-2 space-y-1.5 text-sm leading-relaxed text-[--color-ink]">
                  {s.body.split("\n").filter(Boolean).map((line, i) => (
                    <Line key={i} text={line.replace(/^- /, "")} bullet={line.startsWith("- ")} />
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

function Line({ text, bullet }: { text: string; bullet: boolean }) {
  const tokens = text.split(/(\[\[[^\]]+\]\]|\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean);
  return (
    <p className={bullet ? "pl-3 -indent-3 text-[--color-ink-dim] before:text-[--color-ember] before:content-['▸_']" : ""}>
      {tokens.map((t, i) => {
        const work = t.match(/^\[\[works\/([a-z0-9-]+)\]\]$/);
        if (work) return <Link key={i} href={`/works/${work[1]}`} className="text-[--color-ember-bright] hover:underline">{work[1]}</Link>;
        const wiki = t.match(/^\[\[(?:[^#\]]*#)?([^\]]+)\]\]$/);
        if (wiki) return <span key={i} className="text-[--color-ink]">{wiki[1]}</span>;
        const bold = t.match(/^\*\*([^*]+)\*\*$/);
        if (bold) return <strong key={i} className="text-[--color-ink]">{bold[1]}</strong>;
        const code = t.match(/^`([^`]+)`$/);
        if (code) return <code key={i} className="font-mono text-xs text-[--color-flame]">{code[1]}</code>;
        return <span key={i}>{t}</span>;
      })}
    </p>
  );
}
