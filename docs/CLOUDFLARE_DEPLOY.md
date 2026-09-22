# Cloudflare Workers deploy (OpenNext)

Deploy Screenshot Studio to Cloudflare Workers on account **Cloudflare 1 - Main** with custom domain `screenshotstudio.erbanku.com`.

## Prerequisites

- Node.js 20+
- Domain `erbanku.com` on Cloudflare DNS (same account)
- **`CLOUDFLARE_API_TOKEN`** with **Workers Scripts Edit** and **Workers Routes Edit** (account `36cc5642d2d603e7486c6345407d2550`)
- **Bun on `PATH`** if `bun.lock` is present (OpenNext invokes `bun x wrangler` for deploy). Install: https://bun.sh — or use an environment that already has `bun`.

```bash
export CLOUDFLARE_API_TOKEN="<token>"
export CLOUDFLARE_ACCOUNT_ID="36cc5642d2d603e7486c6345407d2550"
```

Login alternative (interactive only): `npx wrangler login`

Without `CLOUDFLARE_API_TOKEN`, Wrangler fails in CI/non-interactive mode with:

`In a non-interactive environment, it's necessary to set a CLOUDFLARE_API_TOKEN environment variable for wrangler to work.`

## Build and deploy

```bash
npm ci
DATABASE_URL="file:./prisma/dev.db" npm run cf:deploy
```

Scripts:

| Script | Purpose |
| :--- | :--- |
| `npm run cf:build` | OpenNext build for Workers |
| `npm run cf:preview` | Local preview against Workers runtime |
| `npm run cf:deploy` | Populate cache (if configured) and deploy |

Custom domain is declared in `wrangler.jsonc` under `routes`. Wrangler creates the DNS record when the domain zone is on the same account.

## Environment variables

Set secrets for production (Prisma, R2, screenshot service, etc.) via Wrangler:

```bash
npx wrangler secret put DATABASE_URL
npx wrangler secret put R2_ACCOUNT_ID
# ...see .env.example
```

Non-secret vars can go in `wrangler.jsonc` `[vars]` if needed.

## Verify

```bash
curl -I https://screenshotstudio.erbanku.com
```

## Notes

- This app uses heavy Node features (Prisma, Playwright screenshot API, FFmpeg WASM). Validate API routes on Workers after deploy; some routes may need external bindings or fallbacks.
- Primary upstream remains Vercel (`screenshot-studio.com`); this target is the erbanku.com property.
