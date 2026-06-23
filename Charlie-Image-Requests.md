# Images we need from Charlie

A running list of the source photos that would most improve the archive/site. The 2026 album you sent was mostly sticker/brand art (now filed under `Brand/assets/`) plus 3 good photos — it didn't have crisp frames for the works below, so these are still open. Keep the canonical gaps in `Catalog/image-wanted-list.md`; the paste-ready ask is below.

Last updated: 2026-06-23.

---

## Paste-ready note for Charlie

> Charlie — the site's looking good and a bunch of your pieces now have big beautiful hero shots. But **ten works are still running on a text-only placeholder** because I either have no photo or only a tiny thumbnail. If you can dig up better frames for any of these, they'll instantly get the full cinematic treatment. No rush, no particular order — whatever you've got.
>
> **Need a SHARP frame (I only have a tiny/blurry one):**
> 1. **Contraptions** — Burning Man 2007
> 2. **Triple Bypass** — Cape Town / AfrikaBurn 2006–07
> 3. **Tunnel of Transformation** — ~2003–04 (TOAST/FLIPSIDE/Fire Arts Fest era)
> 4. **Hot Mama** — 2006–07 (Art Outside / Eyedrum)
> 5. **Big Bully** — Burning Man 2013
>
> **Have NOTHING yet (any photo at all helps):**
> 6. **Mr. Nice Guy** — Burning Man 2007 / Love Burn 2015
> 7. **Bone Head** — Dubai Desert Rock Festival 2008
> 8. **Teetering Cusps** — Starlight Drive-In 2003 / End of the World 2008
> 9. **The Discombobulator** — Austin Halloween fire show 2003
> 10. **The Solar Scope** — Knoxville TN, 2023 (even build/progress shots)
>
> Two more things:
> - **The album folder was named "video clips images" but had no video in it** — were there clips that didn't make it across? I'd love them if so.
> - If any of these (or the pieces already on the site) exist as **full-size camera originals / RAWs**, send the biggest version you have — the site/print stuff loves the extra resolution.
>
> Whatever you send, drop me the **photographer's name** if you remember it so I can credit them right.

---

## For the archive (internal)

When images land: dedup against the 356-image catalog, EXIF → route into an event folder, caption, add `Catalog/images.csv` rows (accurate `credit`), then `python3 Catalog/build-manifest.py` → `npm run sync && npm run derivatives && npm run work-heroes` in the site repo. A crisp frame (≥1000px long edge) automatically restores a work's photo hero (see `lib/workHero.ts`, `MIN_HERO_EDGE`).
