# contraptionism.com (site)

Public Next.js front for the Charlie "Blackcat" Smith archive. Lives in **`Site/`** inside the archive repo (`uncle-charlie-smith`).

**Live:** https://contraptionism-site.vercel.app  
**Deploy:** Vercel project `contraptionism-site` → repo `uncle-charlie-smith`, Root Directory `Site`.

## Monorepo layout

| Path | Role |
|------|------|
| Repo root | Canonical archive — Catalog, entities, Brand, media |
| `Site/` (this folder) | Next.js app — gallery, Ask Uncle Charlie, press, Burning Book |

`npm run sync` copies archive data into `data/`. Images from GitHub raw on this same repo (`lib/images.ts`). Cutover record: [`../docs/vercel-site-cutover.md`](../docs/vercel-site-cutover.md).

## Local dev

```bash
cd Site
npm install
npm run sync
varlock run --inject vars -- npm run dev
```

The environment contract is in `.env.schema`. Agents may inspect that schema, but must not read local `.env*` value files. `ANTHROPIC_API_KEY` may come from the shared local Varlock values file or the repo-specific override; Vercel retains its own production copy. Domain `contraptionism.com` still pending DNS.
