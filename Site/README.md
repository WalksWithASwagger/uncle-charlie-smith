# contraptionism.com (site)

Public Next.js front for the Charlie "Blackcat" Smith archive. Lives in **`Site/`** inside the archive repo (`uncle-charlie-smith`).

**Live:** https://contraptionism-site.vercel.app (Vercel project root directory must be `Site`)

## Monorepo layout

| Path | Role |
|------|------|
| Repo root (`UncleCharlie` / `uncle-charlie-smith`) | Canonical archive — Catalog, entities, Brand, media |
| `Site/` | This Next.js app — gallery, Ask Uncle Charlie, press, Burning Book |

Data: `npm run sync` copies from the parent archive into `Site/data/`. Images still load from GitHub raw on this same repo (`lib/images.ts`).

## Local dev

```bash
cd Site
npm install
npm run sync      # refresh data/ from parent archive
npm run dev       # http://localhost:3000
npm run build
```

For local agent/press, put `ANTHROPIC_API_KEY=...` in `Site/.env.local`.

## Launch checklist

1. Vercel → Deployment Protection off (public gallery)
2. Vercel env: `ANTHROPIC_API_KEY`
3. Point `contraptionism.com` DNS when ready
4. Vercel project **Root Directory** = `Site` (connected to `uncle-charlie-smith`)

Full cutover steps (Git switch + retire old repo): [`../docs/vercel-site-cutover.md`](../docs/vercel-site-cutover.md)
