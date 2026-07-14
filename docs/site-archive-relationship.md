# Archive + site relationship

One GitHub repo: **`WalksWithASwagger/uncle-charlie-smith`** (local: `/Users/kk/Code/UncleCharlie`).

```mermaid
flowchart LR
  Root["uncle-charlie-smith<br/>Catalog entities Brand media"]
  Sync["Site: npm run sync"]
  Site["Site/ Next.js"]
  GHRaw["GitHub raw images<br/>same repo"]
  Vercel["Vercel root=Site"]
  Domain["contraptionism.com<br/>planned"]
  Root --> Sync --> Site
  Site --> Vercel
  Vercel -.-> Domain
  Site -->|"image URLs"| GHRaw
```

| Path | What | Touch for… |
|------|------|------------|
| Repo root | Canonical archive | Works, entities, brand, catalog, media |
| `Site/` | Public Next.js site | UI, routes, agent, deploy |

**Former sibling** `contraptionism-site` was merged into `Site/` (2026-07). Do not maintain a separate site repo.
