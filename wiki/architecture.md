# Architecture

[← Wiki Home](./README.md)

## Overview

Fully static, prerendered single-page portfolio. No runtime server. All content rendered at build time. Edge function handles email only.

```
Browser
  └── SvelteKit static build (HTML + JS + CSS)
        └── sql.js WASM → in-browser SQLite (optional, graceful fallback)
              └── Components query DB for display data

POST /api/contact
  └── Cloudflare Pages Function (edge)
        └── Resend API → email
```

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | SvelteKit + Svelte | ^2.0 / ^5.0 |
| Build | Vite | ^6.0 |
| Styling | Tailwind CSS | ^4.0 |
| Data | sql.js (SQLite WASM) | ^1.12 |
| Icons | Simple Icons | ^16.19 |
| Fonts | Fontsource (self-hosted) | — |
| Adapter | @sveltejs/adapter-cloudflare | ^7.2 |
| Hosting | Cloudflare Workers | — |
| Email | Resend API | resend ^6.12 |

## Key Design Decisions

**Cloudflare adapter** — `adapter-cloudflare` outputs a Worker bundle (`_worker.js`) plus static assets. Deployed via Wrangler to Cloudflare Workers.

**Client-side SQLite** — [sql.js](./data-layer.md) compiles SQLite to WebAssembly. App seeds an in-browser DB on load. This is a technical showcase; if WASM fails, hardcoded seed data is used as fallback.

**Single route** — All content lives at `/`. Sections (`#hero`, `#about`, etc.) are anchor-scrolled, not separate routes.

**API route** — `/api/contact` is a SvelteKit server route (`src/routes/api/contact/+server.ts`) bundled into the Worker. Keeps `RESEND_API_KEY` server-side only. Accessed via `platform.env` (Cloudflare Workers binding).

## Data Flow

```
1. User requests javiergonzalez.dev
2. Cloudflare serves prebuilt HTML
3. Browser mounts +page.svelte
4. onMount() → initDB()
     a. Fetches /sql-wasm.wasm
     b. Creates tables
     c. Seeds from seed.ts data
5. Components call getProfile(), getExperience(), etc.
6. Nav IntersectionObserver tracks scroll position
7. Contact form POST → /api/contact → Resend → email
```

## Related

- [Data Layer](./data-layer.md) — DB internals
- [Build & Deploy](./build-deploy.md) — Build pipeline
- [API & Email](./api-email.md) — Edge function
