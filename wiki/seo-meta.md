# SEO & Meta

[← Wiki Home](./README.md)

## Overview

Site is fully prerendered — all meta tags and schema are in the static HTML. No client-side meta injection issues.

## JSON-LD Schema

`+page.svelte` injects a `Person` schema via `<svelte:head>`:

```json
{
	"@context": "https://schema.org",
	"@type": "Person",
	"name": "Javier Gonzalez",
	"jobTitle": "Senior Software Engineer",
	"email": "javier@javiergonzalez.dev",
	"url": "https://javiergonzalez.dev",
	"sameAs": ["https://linkedin.com/in/...", "https://github.com/sycoticgames"]
}
```

Enables rich results in Google Search for name queries.

## Open Graph Tags

```html
<meta
	property="og:title"
	content="Javier Gonzalez — Senior Software Engineer"
/>
<meta property="og:description" content="..." />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://javiergonzalez.dev" />
```

Used by social platforms (LinkedIn, Twitter/X, Slack) for link previews.

## Semantic HTML

Proper element hierarchy:

| Element     | Usage                                   |
| ----------- | --------------------------------------- |
| `<header>`  | Nav                                     |
| `<main>`    | Page content wrapper                    |
| `<section>` | Each named section (hero, about, etc.)  |
| `<article>` | Individual experience/education entries |
| `<footer>`  | Footer inside Contact                   |

Screen readers and crawlers parse this without JS execution.

## Static Files

| File                 | Purpose                                           |
| -------------------- | ------------------------------------------------- |
| `static/robots.txt`  | Crawl directives — allows all bots                |
| `static/sitemap.xml` | Single URL entry for `https://javiergonzalez.dev` |
| `static/favicon.ico` | SVG favicon (scales to any size)                  |

## No External Dependencies

Fonts self-hosted (Fontsource). No Google Fonts, no external CDN calls. Pages load fully offline (except `/api/contact` endpoint). Improves privacy and Lighthouse scores.

## Related

- [Routing & Pages](./routing.md) — `<svelte:head>` location
- [Build & Deploy](./build-deploy.md) — Static output
