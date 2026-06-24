# Video masters — local / off-site, not in git

Video files (`*.mp4`, `*.mov`, etc.) are **intentionally gitignored** — they're large
binaries the website doesn't serve (the site uses the thumbnails in `Video-stills/`,
not these masters). Keeping them out of git stops the repo from bloating.

Masters live locally in this folder and off-site as noted below. Catalogued stills
for each clip are in `Video-stills/` and `Catalog/images.csv`.

| File (local) | Size | Off-site home | Re-pull |
|---|---|---|---|
| `afrikaburn-2007-part-ii__d5flXmOp0-M.mp4` | ~52 MB | **YouTube** (AfrikaBurn channel) | `yt-dlp https://www.youtube.com/watch?v=d5flXmOp0-M` |
| `VID_20200407_095337.mp4` | ~77 MB | **none yet** — Kris's 2018 phone original; needs an unlisted-YouTube / Drive backup | local only |
| `4DsfraTKumB.mp4` | 108 KB | — | small; n/a |

When adding a new video master: drop it here, capture a still into `Video-stills/`,
catalogue the still in `Catalog/images.csv`, and (if it has a public source) record the
URL in `/Media-Index.md`.
