# Vercel cutover — Site/ monorepo

The Next.js app now lives in `Site/` inside `uncle-charlie-smith`. Complete these steps so production stops depending on the old `contraptionism-site` repo.

## 1. Connect Vercel to the archive repo

1. Open the existing Vercel project `contraptionism-site` (or create a new one).
2. **Settings → Git** — connect / switch repository to `WalksWithASwagger/uncle-charlie-smith`.
3. **Settings → General → Root Directory** — set to `Site` (required for clean Next.js builds; without it git deploys look for `app/` at repo root and fail).
4. Confirm build command / install run from `Site` once Root Directory is set (or rely on root `vercel.json` / `package.json` fallback shim).
5. Keep env vars (`ANTHROPIC_API_KEY`, etc.).
6. Redeploy from `main` and smoke-check https://contraptionism-site.vercel.app.

**Status 2026-07-14:**
- Git connected to `uncle-charlie-smith`; old `contraptionism-site` GitHub repo archived.
- Production live at https://contraptionism-site.vercel.app (git deploys green via root `vercel.json` shim that builds `Site/` and copies `.next` to repo root).
- **Still recommended:** set Root Directory to `Site` in Vercel → Settings → General, then simplify/remove the root shim (`package.json` + `vercel.json` build copy). API token lacked permission to set this from CLI.

## 2. Retire the old site repo

After the new deploy looks good:

```bash
gh repo archive WalksWithASwagger/contraptionism-site --yes
```

Local sibling (if still present) can move to `_archive`:

```bash
mv /Users/kk/Code/contraptionism-site /Users/kk/Code/_archive/contraptionism-site
```

## 3. Day-to-day

```bash
cd /Users/kk/Code/UncleCharlie/Site
npm run sync && npm run dev   # or push to main for Vercel
```
