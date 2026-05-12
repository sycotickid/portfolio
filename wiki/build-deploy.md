# Build & Deploy

[← Wiki Home](./README.md)

## Local Development

```bash
npm install       # installs deps + runs postinstall
npm run dev       # Vite dev server → http://localhost:5173
npm run build     # production build → build/
npm run preview   # serve build/ locally
```

## postinstall Script

Runs automatically after `npm install`:

```json
"postinstall": "node -e \"require('fs').copyFileSync(...)\""
```

Copies `node_modules/sql.js/dist/sql-wasm.wasm` → `static/sql-wasm.wasm`.

Required because SvelteKit static adapter only serves files from `static/`. The WASM binary must be there at build time.

## Build Output

**Adapter:** `@sveltejs/adapter-static`
**Output dir:** `build/`

```
build/
├── index.html          # Prerendered page
├── _app/               # JS/CSS chunks
│   ├── immutable/      # Hashed, long-cached assets
│   └── ...
├── sql-wasm.wasm       # Copied from static/
├── resume.pdf
├── headshot.png
├── footer.png
├── moon.png
├── iss.png
├── favicon.svg
├── robots.txt
└── sitemap.xml
```

No server files. Entirely static.

## Cloudflare Pages

**Deployment trigger:** Push to `master` branch (or manual deploy via Cloudflare dashboard).

**Build settings in Cloudflare:**

| Setting                | Value           |
| ---------------------- | --------------- |
| Build command          | `npm run build` |
| Build output directory | `build`         |
| Node.js version        | 18+             |

**Functions:** Cloudflare auto-detects `functions/` directory. `functions/api/contact.ts` deploys as a Pages Function at route `/api/contact`.

**Domain:** `javiergonzalez.dev` — DNS managed via Cloudflare, pointed to Pages project.

## Environment Variables

| Variable         | Environment          | Purpose                  |
| ---------------- | -------------------- | ------------------------ |
| `RESEND_API_KEY` | Production + Preview | Email sending via Resend |

Set in Cloudflare Pages dashboard: Settings → Environment Variables.

For local dev with Wrangler:

```
# .env (not committed)
RESEND_API_KEY=re_...
```

## SvelteKit Config (`svelte.config.js`)

```javascript
import adapter from "@sveltejs/adapter-static";

export default {
	kit: {
		adapter: adapter({ out: "build" }),
		prerender: {
			handleHttpError({ path }) {
				if (path === "/headshot.png") return;
				throw error;
			},
		},
	},
};
```

## Vite Config (`vite.config.ts`)

```typescript
import { sveltekit } from "@sveltejs/vite-plugin-svelte";
import tailwindcss from "@tailwindcss/vite";

export default {
	plugins: [tailwindcss(), sveltekit()],
};
```

## Related

- [Architecture](./architecture.md) — System overview
- [API & Email](./api-email.md) — Cloudflare Functions
