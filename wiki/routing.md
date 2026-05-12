# Routing & Pages

[← Wiki Home](./README.md)

## Route Structure

Single route. No nested routes.

```
src/routes/
├── +layout.svelte   # Root layout
├── +layout.ts       # Prerender config
└── +page.svelte     # Only page — /
```

## Prerendering

`src/routes/+layout.ts`:

```typescript
export const prerender = true;
```

Applies to all routes. SvelteKit crawls and renders every page to static HTML at build time. Output: `build/index.html`.

## Root Layout (`+layout.svelte`)

Minimal — imports global CSS only:

```svelte
<script>
  import '../app.css';
</script>
<slot />
```

No shared UI in layout. Nav is part of `+page.svelte`.

## Main Page (`+page.svelte`)

Composes all sections in order:

```svelte
<Starfield />
<Nav />
<main>
  <Hero />      <!-- #hero -->
  <About />     <!-- #about -->
  <Skills />    <!-- #skills -->
  <Experience /><!-- #experience -->
  <Education /> <!-- #education -->
  <Contact />   <!-- #contact -->
</main>
```

**Also handles:**

- `onMount()` → `initDB()` (see [Data Layer](./data-layer.md))
- Mouse move listener → footer parallax (lerp of `footer.png` X position)
- JSON-LD `Person` schema injection via `<svelte:head>`
- Open Graph meta tags

## Page Sections

All sections use anchor IDs for smooth-scroll navigation:

| Section    | ID            | Component           |
| ---------- | ------------- | ------------------- |
| Hero       | `#hero`       | `Hero.svelte`       |
| About      | `#about`      | `About.svelte`      |
| Skills     | `#skills`     | `Skills.svelte`     |
| Experience | `#experience` | `Experience.svelte` |
| Education  | `#education`  | `Education.svelte`  |
| Contact    | `#contact`    | `Contact.svelte`    |

Nav links use `href="#section-id"`. Browser handles scroll. No JS router needed.

## Error Handling

`svelte.config.js` configures:

```javascript
handleHttpError({ path }) {
  if (path === '/headshot.png') return; // silent — fallback in component
  throw error;
}
```

Prevents build failure if `headshot.png` is missing from `static/`.

## Related

- [Components](./components.md)
- [Build & Deploy](./build-deploy.md)
