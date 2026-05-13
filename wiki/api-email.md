# API & Email

[← Wiki Home](./README.md)

## Contact Endpoint

**File:** `src/routes/api/contact/+server.ts`  
**URL:** `POST /api/contact`  
**Runtime:** Cloudflare Worker (bundled by `adapter-cloudflare` into `_worker.js`)

This is a SvelteKit server route — not a separate `functions/` directory. It's bundled into the Worker at build time and runs at the edge.

`export const prerender = false` prevents SvelteKit from trying to statically render it.

## Request Format

```json
{
  "name": "string",
  "email": "string",
  "message": "string"
}
```

All fields required. Returns 400 if any missing.

## Response Format

**Success (200):**
```json
{ "ok": true }
```

**Validation error (400):**
```json
{ "error": "All fields are required." }
```

**Send failure (500):**
```json
{ "error": "Failed to send message.<resend error>" }
```

**Missing API key (500):**
```json
{ "error": "Mail service not configured." }
```

## Email Flow

```
Contact.svelte
  → fetch POST /api/contact
      → Cloudflare Worker (SvelteKit server route)
          → POST https://api.resend.com/emails
              → Email delivered to javier@javiergonzalez.dev
                  reply_to: sender's email from form
```

**From address:** `portfolio@contact.javiergonzalez.dev`  
**Subject:** `Portfolio message from {name}`  
**Body:** plain text — `From: {name} <{email}>\n\n{message}`

## Environment Variables

| Variable | Where set | Used by |
|----------|-----------|---------|
| `RESEND_API_KEY` | Wrangler dashboard / `wrangler secret put` | `src/routes/api/contact/+server.ts` |

**Access in route:**
```typescript
const env = platform?.env as { RESEND_API_KEY?: string } | undefined;
const apiKey = env?.RESEND_API_KEY;
```

For local dev, use `.dev.vars` (not committed):
```
RESEND_API_KEY=re_...
```

## Client-Side Form (`Contact.svelte`)

```svelte
async function submit() {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, message })
  });
  const data = await res.json();
  if (data.ok) { /* show success */ }
  else { /* show error */ }
}
```

Form has four states: default, sending, success, error.

Submit button uses `mouseGlow` action for radial highlight effect on hover.

## Security Notes

- `RESEND_API_KEY` never exposed to browser — only runs in Worker
- Input validated server-side before Resend call
- No rate limiting currently implemented (Cloudflare WAF handles basic abuse)

## Related

- [Build & Deploy](./build-deploy.md) — How the Worker deploys
- [Components](./components.md) — Contact.svelte details
