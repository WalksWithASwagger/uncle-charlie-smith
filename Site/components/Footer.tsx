import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[--color-line] bg-[--color-bg-2]">
      <div className="mx-auto max-w-7xl px-5 py-10 font-mono text-xs text-[--color-ink-dim]">
        <div className="grid gap-6 sm:grid-cols-3">
          <div>
            <p className="font-display text-base uppercase text-[--color-ink]">
              Contraption<span className="ember-text">ism</span>
            </p>
            <p className="mt-2 max-w-xs leading-relaxed">
              The fire-ritual machines of Charlie “Blackcat” Smith / Sparseland Studios, Atlanta.
              Community-built metal mythologies. 2000–present.
            </p>
          </div>
          <div className="space-y-1">
            <p className="uppercase text-[--color-steel]">Find Charlie</p>
            <p><a href="https://www.sparceland.com" className="hover:text-[--color-ember-bright]">sparceland.com</a></p>
            <p><a href="https://www.instagram.com/artofsuchnsuch/" className="hover:text-[--color-ember-bright]">@artofsuchnsuch</a></p>
            <p><a href="https://www.facebook.com/charlieblackcatsmith" className="hover:text-[--color-ember-bright]">facebook</a></p>
            <p><a href="https://PayPal.Me/thewakingbird" className="hover:text-[--color-ember-bright]">support the work →</a></p>
          </div>
          <div className="space-y-1">
            <p className="uppercase text-[--color-steel]">Archive</p>
            <p><Link href="/credits" className="hover:text-[--color-ember-bright]">Credits & rights</Link></p>
            <p>
              <a
                href="https://github.com/WalksWithASwagger/uncle-charlie-smith"
                className="hover:text-[--color-ember-bright]"
              >
                Source archive (GitHub)
              </a>
            </p>
            <p className="pt-2 text-[10px] leading-relaxed text-[--color-steel]">
              Images © their credited photographers (Kris Krüg, Charlie Smith, Burning Man
              Project, et al.). Shown for archival/documentary purposes with attribution.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
