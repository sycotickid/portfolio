# API & Email

[← Wiki Home](./README.md)

## Contact Endpoint

**File:** `functions/api/contact.ts`  
**URL:** `POST /api/contact`  
**Runtime:** Cloudflare Pages Function (edge compute)

This file is **not** part of the SvelteKit static build. Cloudflare auto-detects the `functions/` directory and deploys it as an edge function alongside the static assets.

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
{ "ok": false, "error": "Missing required fields" }
```

**Send failure (500):**
```json
{ "ok": false, "error": "Failed to send email" }
```

## Email Flow

```
Contact.svelte
  → fetch POST /api/contact
      → Cloudflare Edge Function
          → POST https://api.resend.com/emails
              → Email delivered to javier@javiergonzalez.dev
                  reply_to: sender's email from form
```

## Environment Variables

| Variable | Where set | Used by |
|----------|-----------|---------|
| `RESEND_API_KEY` | Cloudflare Pages dashboard → Settings → Environment Variables | `functions/api/contact.ts` |

Never set in `.env` for production. The `RESEND_API_KEY` in `.env` is for local Wrangler dev only.

**Access in function:**
```typescript
const apiKey = context.env.RESEND_API_KEY;
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

Form has three states: default, submitting, success, error.

## Security Notes

- `RESEND_API_KEY` never exposed to browser — only runs in edge function
- Input validated server-side before Resend call
- No rate limiting currently implemented (Cloudflare WAF handles basic abuse)

## Related

- [Build & Deploy](./build-deploy.md) — How functions deploy
- [Components](./components.md) — Contact.svelte details
