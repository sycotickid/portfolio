# Styling

[← Wiki Home](./README.md)

## Stack

- **Tailwind CSS v4** via `@tailwindcss/vite` plugin
- **Custom design tokens** in `src/app.css` (`@theme` block)
- **Runtime constants** in `src/lib/constants.ts` (used in inline styles + JS)

## Design Tokens (`constants.ts`)

```typescript
// Layout
MAX_WIDTH = '1100px'
NAV_HEIGHT = 56               // px, number

// Spacing
SECTION_PAD_DESKTOP = '96px 0'
SECTION_PAD_MOBILE  = '64px 0'

// Colors
COLOR_BG      = '#0d0d0d'     // page background
COLOR_FG      = '#f0ede8'     // primary text
COLOR_ACCENT  = '#5a84e7'     // blue accent
COLOR_MUTED   = '#888580'     // muted/secondary text
COLOR_BORDER  = '#2a2a2a'     // borders
COLOR_SURFACE = '#111111'     // card backgrounds
```

Constants are used both in `app.css` (CSS variables) and in Svelte components (inline `style` attributes where Tailwind classes aren't sufficient).

## Global CSS (`app.css`)

```css
@import "tailwindcss";

@theme {
  /* fonts */
  --font-serif: 'Playfair Display Variable', serif;
  --font-sans:  'Noto Sans Variable', sans-serif;
  --font-mono:  'JetBrains Mono', monospace;
  /* colors mapped from constants */
}
```

## Fonts

All self-hosted via Fontsource (no external requests):

| Font | Usage | Package |
|------|-------|---------|
| Playfair Display | Headings (`.section-heading`, hero name) | `@fontsource-variable/playfair-display` |
| Noto Sans | Body text | `@fontsource-variable/noto-sans` |
| JetBrains Mono | Labels, metadata, code-style text | `@fontsource/jetbrains-mono` |

## Utility Classes

Defined in `app.css`:

| Class | Purpose |
|-------|---------|
| `.section-pad` | Vertical section padding (96px desktop, 64px mobile) |
| `.section-inner` | Max-width container with horizontal padding |
| `.section-heading` | Large serif heading (Playfair Display) |
| `.mono-label` | Small caps monospace label |
| `.mono-meta` | Muted monospace metadata (dates, locations) |
| `.fade-section` | Scroll fade-in base state (opacity 0, translateY 20px) |
| `.fade-section.visible` | Fade-in triggered state (opacity 1, translateY 0) |
| `.skill-pill` | Skill tag — rounded, border, hover accent fill |
| `.form-input` | Contact form input fields |
| `.submit-btn` | Contact form submit button |

## Responsive Breakpoints

| Breakpoint | Width | Layout changes |
|-----------|-------|---------------|
| Mobile | < 640px | Single column, hamburger nav |
| Tablet | 640–1024px | 2-col grids collapse |
| Desktop | > 1024px | Full layout, inline nav links |

## Dark Theme

Site is dark-only. No light mode. Background `#0d0d0d`, text `#f0ede8`. Accent `#5a84e7` (blue) used for links, active states, borders, hover fills.

## Related

- [Components](./components.md) — Classes applied per component
- [Project Structure](./project-structure.md) — File locations
