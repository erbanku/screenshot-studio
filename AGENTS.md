# Screenshot Studio — agent notes

## Theming

- CSS tokens live in `app/globals.css` (`:root` light, `.dark` overrides).
- App theme: `components/theme-provider.tsx` (`defaultTheme="light"`, `storageKey=screenshot-studio-theme`).
- Toggle: `components/theme-toggle.tsx` in `EditorHeader` and landing `Navigation`.
- Do not set `className="dark"` on `<html>` in `app/layout.tsx`.

## Deploy targets

- Production (upstream): Vercel — `screenshot-studio.com`.
- Cloudflare Workers (erbanku): OpenNext adapter, `wrangler.jsonc`, scripts `cf:build` / `cf:preview` / `cf:deploy`. Custom domain `screenshotstudio.erbanku.com`. Account id `36cc5642d2d603e7486c6345407d2550`. Details: `docs/CLOUDFLARE_DEPLOY.md`.
- OpenNext detects `bun.lock` and would invoke `bun run build`; `open-next.config.ts` sets `buildCommand` to `npm run build`. Deploy still runs `bun x wrangler` unless `bun.lock` is removed — keep Bun installed for `cf:deploy`.

## Verify

```bash
npm test
DATABASE_URL="file:./prisma/dev.db" npm run build
```

Last updated: 2025-09-22
