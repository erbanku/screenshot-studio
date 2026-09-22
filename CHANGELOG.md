# Changelogs for screenshot-studio
> Created and Maintained by @erbanku and fellow AI agents

## 09/22/2025

- Default UI theme is light; dark mode stays available via sun/moon toggle in the editor header and marketing nav, with preference stored in `localStorage` (`screenshot-studio-theme`).
- Removed hard-coded `dark` class from the root layout; wired `next-themes` `ThemeProvider`.
- Added OpenNext Cloudflare Workers deploy config (`wrangler.jsonc`, `open-next.config.ts`, `npm run cf:*`) targeting `screenshotstudio.erbanku.com` on account `36cc5642d2d603e7486c6345407d2550`; see `docs/CLOUDFLARE_DEPLOY.md`. Deploy blocked without `CLOUDFLARE_API_TOKEN` in agent/CI environments.
