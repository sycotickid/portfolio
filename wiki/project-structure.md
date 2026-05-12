# Project Structure

[← Wiki Home](./README.md)

## Directory Tree

```
portfolio/
├── src/
│   ├── app.css                  # Global styles — Tailwind import + custom theme
│   ├── app.html                 # HTML shell template
│   ├── lib/
│   │   ├── actions/
│   │   │   └── fadeIn.ts        # IntersectionObserver scroll fade-in action
│   │   ├── components/
│   │   │   ├── Nav.svelte       # Fixed nav + active section tracking
│   │   │   ├── Hero.svelte      # Landing section
│   │   │   ├── About.svelte     # Bio + headshot
│   │   │   ├── Skills.svelte    # Skill pills by category
│   │   │   ├── Experience.svelte# Work history timeline
│   │   │   ├── Education.svelte # Education cards
│   │   │   ├── Contact.svelte   # Contact form + footer
│   │   │   └── Starfield.svelte # Canvas animated starfield background
│   │   ├── constants.ts         # Design tokens (colors, spacing)
│   │   ├── data/
│   │   │   └── seed.ts          # Resume data + TypeScript interfaces
│   │   ├── db.ts                # sql.js init + query functions
│   │   └── icons.ts             # Simple Icons SVG path exports
│   └── routes/
│       ├── +layout.svelte       # Root layout (imports app.css)
│       ├── +layout.ts           # prerender = true
│       └── +page.svelte         # Single page — composes all sections
├── functions/
│   └── api/
│       └── contact.ts           # Cloudflare Pages Function (POST /api/contact)
├── static/
│   ├── resume.pdf               # Downloadable resume
│   ├── headshot.jpg             # Profile photo (256×256)
│   ├── footer.png               # Mountain silhouette (parallax footer)
│   ├── moon.png                 # Starfield asset
│   ├── iss.png                  # Starfield asset
│   ├── sql-wasm.wasm            # SQLite WASM binary (copied by postinstall)
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
├── wiki/                        # This documentation
├── svelte.config.js             # SvelteKit config (static adapter)
├── vite.config.ts               # Vite config (Tailwind plugin)
├── tsconfig.json                # TypeScript config (strict)
├── package.json                 # Scripts + dependencies
├── .env                         # RESEND_API_KEY (not committed)
└── portfolio-spec.md            # Original project specification
```

## Key File Notes

**`src/lib/data/seed.ts`** — Single source of truth for all resume content. Edit here to update displayed data. See [Data Layer](./data-layer.md).

**`src/lib/db.ts`** — Initializes sql.js and exposes query functions. The WASM binary is fetched from `/sql-wasm.wasm` at runtime.

**`src/lib/constants.ts`** — Design token constants used in both Svelte components (inline styles) and `app.css`. Change colors/spacing here.

**`functions/api/contact.ts`** — Runs at the edge on Cloudflare. Not bundled into the static build. See [API & Email](./api-email.md).

**`static/sql-wasm.wasm`** — Copied from `node_modules/sql.js/dist/` by the `postinstall` npm script. Must be present for DB to initialize.

## Related

- [Components](./components.md)
- [Routing & Pages](./routing.md)
- [Data Layer](./data-layer.md)
