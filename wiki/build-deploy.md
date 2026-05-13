# Build & Deploy

[← Wiki Home](./README.md)

## Local Development

```bash
npm install       # installs deps + runs postinstall
npm run dev       # Vite dev server → http://localhost:5173
npm run build     # wrangler types + vite build → .svelte-kit/cloudflare/
npm run preview   # npm run build + wrangler dev (local Cloudflare Worker)
npm run deploy    # npm run build + wrangler deploy → production
npm run gen       # wrangler types (regenerate worker-configuration.d.ts)
```

## postinstall Script

Runs automatically after `npm install`. Copies `node_modules/sql.js/dist/sql-wasm.wasm` → `static/sql-wasm.wasm`. Required because the Cloudflare adapter only serves files from `static/` at build time.

## Build Output

**Adapter:** `@sveltejs/adapter-cloudflare`
**Output dir:** `.svelte-kit/cloudflare/`

```
.svelte-kit/cloudflare/
├── _worker.js          # Cloudflare Worker entry (SvelteKit SSR + API routes)
├── _app/               # JS/CSS chunks
│   ├── immutable/      # Hashed, long-cached assets
│   └── ...
├── sql-wasm.wasm
├── resume-javier-gonzalez.pdf
├── headshot.png
├── footer.png
├── moon.png
├── iss.png
├── favicon.ico
├── robots.txt
└── sitemap.xml
```

The contact API route (`src/routes/api/contact/+server.ts`) is bundled into `_worker.js` — not a separate `functions/` directory.

## Cloudflare Workers (via Wrangler)

**Config file:** `wrangler.jsonc`

| Setting             | Value                                          |
| ------------------- | ---------------------------------------------- |
| Worker name         | `portfolio`                                    |
| Compatibility date  | `2026-05-12`                                   |
| Compatibility flags | `nodejs_compat`                                |
| Main entry          | `.svelte-kit/cloudflare/_worker.js`            |
| Assets directory    | `.svelte-kit/cloudflare`                       |
| Custom domains      | `javiergonzalez.dev`, `www.javiergonzalez.dev` |

Observability is enabled (`wrangler.jsonc → observability.enabled: true`).

## Environment Variables

| Variable         | Environment          | Purpose                  |
| ---------------- | -------------------- | ------------------------ |
| `RESEND_API_KEY` | Production + Preview | Email sending via Resend |

Set via Wrangler dashboard or `wrangler secret put RESEND_API_KEY`.
For local dev, use a `.dev.vars` file (not committed):

```
RESEND_API_KEY=re_...
```

## SvelteKit Config (`svelte.config.js`)

```javascript
import adapter from "@sveltejs/adapter-cloudflare";

export default {
	kit: {
		adapter: adapter(),
		prerender: {
			handleHttpError({ path, message }) {
				if (path === "/headshot.png") return;
				throw new Error(message);
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
- [API & Email](./api-email.md) — Contact API route
