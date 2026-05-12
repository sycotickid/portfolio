# javiergonzalez.dev

Personal portfolio site for Javier Gonzalez, Senior Software Engineer. Built as a fully static site with a client-side SQLite database — a deliberate technical flex that demonstrates the stack rather than just describing it.

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | SvelteKit 2 + Svelte 5 |
| Styling | Tailwind CSS v4 |
| Database | sql.js (SQLite WASM, runs in-browser) |
| Icons | Simple Icons v16 |
| Fonts | Playfair Display Variable, Noto Sans Variable, JetBrains Mono |
| Deployment | Cloudflare Pages (static adapter) |
| Email | Resend API via Cloudflare Pages Function |

## Architecture

The site is fully prerendered at build time using `@sveltejs/adapter-static`. Resume data (profile, experience, skills, education) is hardcoded in `src/lib/data/seed.ts` and serves as both the static fallback for prerender and the seed for the in-browser SQLite database.

On the client, `sql.js` initializes a SQLite database in a WASM runtime, seeds it from the same source data, and queries it to hydrate the page. If WASM fails to load, the seed data is used directly — no visible difference to the user.

The contact form POSTs to a Cloudflare Pages Function at `/api/contact`, which calls the Resend API server-side to send email without exposing credentials to the browser.

## Project Structure

```
src/
├── app.css                    # Global styles, Tailwind config, shared utility classes
├── lib/
│   ├── actions/
│   │   └── fadeIn.ts          # IntersectionObserver scroll fade-in action
│   ├── components/
│   │   ├── Nav.svelte         # Fixed nav with active section tracking
│   │   ├── Hero.svelte        # Landing section with social links
│   │   ├── About.svelte       # Bio + headshot
│   │   ├── Skills.svelte      # Skill pills grouped by category
│   │   ├── Experience.svelte  # Timeline of work history
│   │   ├── Education.svelte   # Education cards
│   │   ├── Contact.svelte     # Contact form (posts to /api/contact)
│   │   └── Starfield.svelte   # Canvas starfield background
│   ├── constants.ts           # Shared design tokens (colors, spacing, thresholds)
│   ├── data/
│   │   └── seed.ts            # All resume data + TypeScript interfaces
│   ├── db.ts                  # sql.js init, table creation, query functions
│   └── icons.ts               # Simple Icons exports (brand + skill icons)
├── routes/
│   └── +page.svelte           # Root page: DB init, data binding, mountain overlay
functions/
└── api/
    └── contact.ts             # Cloudflare Pages Function — email via Resend
static/
├── resume.pdf
├── headshot.jpg
├── footer.png                 # Mountain silhouette overlay
├── favicon.svg
├── robots.txt
├── sitemap.xml
└── sql-wasm.wasm              # Copied from node_modules by postinstall script
```

## Local Development

```bash
npm install      # also copies sql-wasm.wasm to static/ via postinstall
npm run dev
```

## Build

```bash
npm run build    # outputs to build/
npm run preview  # preview the static build locally
```

## Deployment

Hosted on Cloudflare Pages. Build command: `npm run build`, output directory: `build`.

The `functions/` directory is picked up automatically by Cloudflare Pages and deployed as edge functions alongside the static assets.

### Environment Variables

Set in the Cloudflare Pages dashboard under **Settings → Environment Variables**:

| Variable | Description |
|---|---|
| `RESEND_API_KEY` | Resend API key for the contact form |

### Custom Domain

`javiergonzalez.dev` is configured as a custom domain in Cloudflare Pages. DNS is managed through Cloudflare.

## Notable Details

- **Starfield**: 2048 stars rendered on a `<canvas>` with scroll parallax, mouse pan (X and Y), flickering stars, and randomized shooting stars on a 5–14s interval.
- **Mountain overlay**: `footer.png` is a 4K silhouette positioned at the bottom of the page content, wider than the viewport, with horizontal position tied to mouse movement via a lerped RAF loop.
- **Backdrop blur**: Applied to individual skill pills and education cards using `backdrop-filter: blur()` with a near-zero alpha background to frost the starfield without adding color.
- **sql.js WASM**: The `.wasm` binary is copied to `static/` via a `postinstall` npm script so it's available as a static asset at `/sql-wasm.wasm`.
