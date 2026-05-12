# Components

[← Wiki Home](./README.md)

All components live in `src/lib/components/`. All are consumed by `src/routes/+page.svelte`.

## Nav.svelte

Fixed top navigation bar (height: 56px).

**Features:**

- Blur backdrop (`backdrop-filter: blur`)
- Active section highlight via `IntersectionObserver` — tracks which `<section>` is most visible
- Hamburger menu on mobile (< 768px)
- Smooth scroll to anchor on link click

**Active section logic:** Each `<section>` has an `id` matching nav links. IntersectionObserver fires when section crosses threshold; active state stored in local reactive variable.

---

## Hero.svelte

Landing section (`#hero`). Full-viewport height.

**Contents:**

- Name (Playfair Display, 72px)
- Title (JetBrains Mono)
- 4 icon-only action buttons:
  - Email (mailto link)
  - LinkedIn (external link)
  - GitHub (external link)
  - Resume PDF (download link → `/resume.pdf`)

Icons sourced from `src/lib/icons.ts` (Simple Icons SVG paths).

---

## Starfield.svelte

Canvas-based animated background. Renders behind all content via `position: fixed`.

**2048 stars** with:

- Mouse parallax (4% X, 2% Y offset)
- Scroll parallax (25% offset)
- Flickering stars (12.5% of total randomly flicker)
- Shooting stars (spawn every 5–14 seconds)
- Mouse position lerped at 6% per frame for smooth tracking

**Assets used:** `moon.png`, `iss.png` (rendered on canvas at fixed positions)

**Performance:** Uses `requestAnimationFrame`. Canvas sized to `window.innerWidth × window.innerHeight`, redraws each frame.

---

## About.svelte

Bio section (`#about`).

**Layout:**

- Desktop: 2-column grid (text left, photo right)
- Mobile: single column

**Contents:**

- Summary paragraph (from `getProfile()`)
- `headshot.png` (256×256px, rounded, blue border)
- Error fallback if image missing (handled in `svelte.config.js`)

---

## Skills.svelte

Skill pills section (`#skills`).

**Data source:** `getSkills()` → grouped by `category`.

**4 categories:** Backend, Frontend, DevOps, Tools & AI

Each skill renders as a pill (`<span class="skill-pill">`) with:

- Simple Icons SVG icon (matched by `icon` field slug)
- Skill name
- Hover: accent color fill

---

## Experience.svelte

Work history section (`#experience`).

**Layout:** Vertical timeline — centered line with dot markers.

**6 entries** rendered from `getExperience()`:

- Company name
- Job title
- Location + date range (`.mono-meta`)
- Bullet points (split from pipe-delimited `description` string)

---

## Education.svelte

Education section (`#education`).

**Layout:** 2-column card grid (collapses to 1 on mobile).

**2 cards** from `getEducation()`:

- Degree name
- Institution
- Year
- Backdrop blur on cards

---

## Contact.svelte

Contact form + page footer (`#contact`).

**Form fields:** name, email, message (all required)

**Submission:** `fetch('POST /api/contact', { body: JSON.stringify({name, email, message}) })`

**States:**

- Default: form visible
- Submitting: loading indicator
- Success: confirmation message
- Error: error message

**Footer contents:**

- Social links repeated
- Build metadata (SvelteKit, Tailwind, sql.js)
- `footer.png` mountain silhouette (parallax driven from `+page.svelte`)

---

## fadeIn Action (`src/lib/actions/fadeIn.ts`)

Svelte action (not a component). Applied to section wrappers.

```svelte
<section use:fadeIn>...</section>
```

Uses `IntersectionObserver`. When element enters viewport, adds `.visible` class which triggers CSS transition:

```css
.fade-section {
	opacity: 0;
	transform: translateY(20px);
}
.fade-section.visible {
	opacity: 1;
	transform: translateY(0);
}
```

## Related

- [Routing & Pages](./routing.md) — How components compose
- [Styling](./styling.md) — Utility classes used by components
- [Data Layer](./data-layer.md) — Data source for each component
