# Portfolio Site — Spec & Task List

**Javier Gonzalez | Senior Software Engineer**

---

## Overview

Single-page portfolio optimized for recruiter scanability, ATS-adjacent crawlability, and developer credibility. Built with **SvelteKit (static adapter)** + **SQLite via sql.js** (client-side, no server). No backend required — SQLite loads in-browser via WASM for a novel, on-brand technical flex.

---

## Tech Stack

| Layer     | Choice                            | Reason                                |
| --------- | --------------------------------- | ------------------------------------- |
| Framework | SvelteKit (static adapter)        | Requested; fast, minimal JS           |
| Styling   | Tailwind CSS v4                   | Already in Javier's skillset          |
| Database  | sql.js (SQLite WASM)              | Client-side SQLite — unique, on-brand |
| Fonts     | Google Fonts (self-hosted)        | Performance + no external requests    |
| Hosting   | Vercel / Netlify / GitHub Pages   | Static output, zero cost              |
| SEO       | Static HTML + meta tags + JSON-LD | Fully crawlable                       |

---

## Architecture Decision: Why SQLite?

- All resume data seeded into an in-browser SQLite DB at runtime
- Svelte components query it via sql.js for experience, skills, education
- Makes the SQLite skill visible in the actual portfolio tech stack
- Falls back gracefully if WASM fails (data hardcoded as fallback)

---

## Pages / Sections (Single Page)

All sections live on `/` with smooth scroll anchors.

| #   | Section    | Anchor        | Purpose                                                |
| --- | ---------- | ------------- | ------------------------------------------------------ |
| 1   | Hero       | `#hero`       | Name, title, CTA buttons (email, LinkedIn, resume PDF) |
| 2   | Summary    | `#about`      | Professional summary paragraph                         |
| 3   | Skills     | `#skills`     | Tag cloud grouped by category                          |
| 4   | Experience | `#experience` | Timeline cards, reverse-chronological                  |
| 5   | Education  | `#education`  | Degree cards                                           |
| 6   | Contact    | `#contact`    | Email link + LinkedIn                                  |

---

## Data Model (SQLite Schema)

```sql
CREATE TABLE profile (
  id INTEGER PRIMARY KEY,
  name TEXT,
  title TEXT,
  summary TEXT,
  email TEXT,
  linkedin TEXT
);

CREATE TABLE experience (
  id INTEGER PRIMARY KEY,
  company TEXT,
  title TEXT,
  location TEXT,
  start_date TEXT,
  end_date TEXT,
  description TEXT  -- pipe-delimited bullet points
);

CREATE TABLE education (
  id INTEGER PRIMARY KEY,
  degree TEXT,
  institution TEXT,
  year INTEGER
);

CREATE TABLE skill (
  id INTEGER PRIMARY KEY,
  name TEXT,
  category TEXT  -- 'backend' | 'frontend' | 'devops' | 'tools' | 'other'
);
```

---

## Skill Categories (Pre-mapped)

| Category       | Skills                                                                            |
| -------------- | --------------------------------------------------------------------------------- |
| Backend        | PHP / Laravel, .NET / C#, Golang, Node.js, Spring Boot, MySQL, PostgreSQL, SQLite |
| Frontend       | React / TypeScript, Svelte, Angular, Tailwind CSS, WordPress                      |
| DevOps / Infra | Docker, Kubernetes, REST API Design                                               |
| Tools & AI     | Claude Code / OpenCode, Datastar, Figma, Unreal Engine 5                          |

---

## SEO & Crawlability Requirements

- Semantic HTML: `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`
- `<h1>` = full name, `<h2>` = section titles, `<h3>` = job titles
- All content rendered in static HTML (not JS-only) for crawler access
- JSON-LD structured data (`Person` schema) in `<head>`
- Meta: title, description, og:title, og:description, og:image
- `robots.txt` and `sitemap.xml` included
- `rel="noopener"` on all external links
- Alt text on any images

---

## Layout Design

### Viewport Behavior

- Fixed top nav, 56px tall, blurs content behind it (`backdrop-filter: blur`)
- All sections full-width, max content width `1100px`, centered
- Section padding: `96px 0` desktop, `64px 0` mobile

---

### Section-by-Section Layout

#### Nav

```
[ Javier Gonzalez ]          [ About  Skills  Experience  Education  Contact ]
```

- Logo/name left-aligned, anchor links right-aligned
- Active link underlined with accent color as user scrolls
- Collapses to hamburger on mobile (`< 768px`)

---

#### Hero

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│   JAVIER GONZALEZ                                       │
│   Senior Software Engineer                              │
│                                                         │
│   Full-stack engineer with 6+ years building and        │
│   scaling enterprise web applications...                │
│                                                         │
│   [ ✉ ]   [ in ]   [ ⌥ ]   [ ↓ PDF ]                  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

- Single-column, left-aligned text
- Name in large display font (~72px desktop, ~44px mobile)
- Title in monospace, muted color, smaller size
- 4 icon-only anchor buttons: Email (`ti-mail`), LinkedIn (`ti-brand-linkedin`), GitHub (`ti-brand-github`), Resume PDF (`ti-file-cv`)
- Each is a 32×32px bordered square icon; Resume PDF uses accent border + color; rest are muted with accent hover state
- No text labels on the buttons — tooltips on hover via `title` attribute
- No background image; subtle grain or noise texture overlay optional

---

#### About / Summary

```
┌──────────────────────────────────────┬──────────┐
│                                      │          │
│   Professional Summary               │ [photo]  │
│   ─────────────────────              │          │
│   Full-stack engineer with 6+        │          │
│   years building and scaling...      │          │
│   [3-4 sentences]                    │          │
│                                      │          │
└──────────────────────────────────────┴──────────┘
```

- 2-column grid (`1fr auto`) on desktop, stacks on mobile
- Left: summary paragraph
- Right: headshot image, 72×72px, `border-radius: 8px`, subtle blue-tinted border
- Placeholder shown until real headshot is supplied (`/static/headshot.png`)

---

#### Skills

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  Backend                                                │
│  [ PHP / Laravel ] [ .NET / C# ] [ Golang ] [ Node.js ] │
│  [ Spring Boot ] [ MySQL ] [ PostgreSQL ] [ SQLite ]    │
│                                                         │
│  Frontend                                               │
│  [ React / TypeScript ] [ Svelte ] [ Angular ]          │
│  [ Tailwind CSS ] [ WordPress ]                         │
│                                                         │
│  DevOps / Infra                          Tools & AI     │
│  [ Docker ] [ Kubernetes ]               [ Claude Code ]│
│  [ REST API Design ]                     [ Figma ]      │
│                                          [ Unreal 5 ]   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

- Category label above each group (small caps or muted uppercase)
- Tags as pill components: border + transparent bg, monospace font
- Hover: fill accent color, invert text
- Bottom two categories sit side-by-side on desktop, stack on mobile

---

#### Experience

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  ●── Paycom                            Mar 2022–May 2026│
│  │   Senior Software Engineer · Grapevine, TX          │
│  │   · Delivered full-stack features across internal   │
│  │     tools and customer-facing applications...       │
│  │   · Drove ground-up rewrites of 3-5 major...        │
│  │                                                     │
│  ●── Word on Fire Catholic Ministries  Oct 2021–Jul 2024│
│  │   Contract Software Engineer · Irving, TX           │
│  │   · Built and shipped new feature pages...          │
│  │                                                     │
│  ●── Revature                          Nov 2020–Feb 2022│
│      Full-Stack Software Engineer · Remote             │
│      ...                                               │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

- Vertical timeline: left-side line with dot marker per role
- Company name bold, role title + location muted below it
- Date range right-aligned on the same row as company name
- Bullet points indented under each role
- Line connecting all dots (stops at last entry, no dangling line)
- Dot accent color matches site accent

---

#### Education

```
┌────────────────────────────┬────────────────────────────┐
│                            │                            │
│  B.S. Computer Science     │  B.S. Game Art & Design    │
│  Florida Intl University   │  JP the Great Catholic     │
│  2015                      │  2018                      │
│                            │                            │
└────────────────────────────┴────────────────────────────┘
```

- 2-column card grid on desktop, stacks on mobile
- Minimal card: degree name prominent, institution + year muted below
- No icons needed; clean typography-first treatment

---

#### Contact / Footer

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│              Let's work together.                       │
│                                                         │
│         ┌───────────────────────────────┐               │
│  NAME   │                               │               │
│         └───────────────────────────────┘               │
│         ┌───────────────────────────────┐               │
│  EMAIL  │                               │               │
│         └───────────────────────────────┘               │
│         ┌───────────────────────────────┐               │
│  MSG    │                               │               │
│         │                               │               │
│         └───────────────────────────────┘               │
│                 [ Send Message → ]                      │
│                                                         │
│   ─────────────────────────────────────────────────    │
│   Built with SvelteKit + SQLite · © 2026 Javier G.     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

- Form centered, max-width `320px`, `margin: 0 auto`
- Fields: Name (text), Email (email), Message (textarea, ~4 rows)
- Field labels in monospace uppercase above each input
- Inputs: dark fill (`#111`), muted border, accent border on focus
- Submit button: full-width, accent border + color, monospace uppercase
- Note: form is UI-only in static build — wire to Formspree or Resend for actual delivery

---

### Responsive Breakpoints

| Breakpoint | Width          | Changes                                                     |
| ---------- | -------------- | ----------------------------------------------------------- |
| Mobile     | `< 640px`      | Single column everywhere, hamburger nav, reduced font sizes |
| Tablet     | `640px–1024px` | 2-col grids collapse to 1, timeline stays                   |
| Desktop    | `> 1024px`     | Full layout as designed above                               |

---

### Spacing Scale (Tailwind)

| Token    | Value | Used For                           |
| -------- | ----- | ---------------------------------- |
| `gap-3`  | 12px  | Skill pill gaps                    |
| `gap-6`  | 24px  | Card internal gaps                 |
| `gap-12` | 48px  | Between timeline entries           |
| `py-24`  | 96px  | Section vertical padding (desktop) |
| `py-16`  | 64px  | Section vertical padding (mobile)  |

---

## Visual Design Direction

**Aesthetic:** Editorial / refined dark — confident, senior, no fluff. Think dev blog meets design portfolio.

- Dark background (`#0d0d0d`), off-white text (`#f0ede8`)
- Accent: `#5a84e7` (blue)
- **Starfield**: `<canvas>` absolutely positioned behind all content, full site height; 120 stars, randomized size (0.2–1px), opacity, and twinkle phase; animated via `requestAnimationFrame`; color `rgba(180, 200, 255, α)` — cool blue-white tint
- **Headshot**: 72×72px in About section, `border-radius: 8px`, blue-tinted dark border; source `/static/headshot.png`
- Typography: Serif display (e.g. Playfair Display or DM Serif) for name/headings; monospace (e.g. JetBrains Mono) for skill tags and dates; clean sans (e.g. DM Sans) for body
- Timeline: vertical line with dot markers for experience
- Skills: pill/tag components grouped with subtle category labels
- Minimal animation: fade-in on scroll (IntersectionObserver), no flashy effects

---

## File Structure

```
portfolio/
├── src/
│   ├── routes/
│   │   └── +page.svelte          # Main single page
│   ├── lib/
│   │   ├── db.ts                 # sql.js init + seed logic
│   │   ├── data/
│   │   │   └── seed.ts           # All resume data as JS constants
│   │   └── components/
│   │       ├── Hero.svelte
│   │       ├── About.svelte
│   │       ├── Skills.svelte
│   │       ├── Experience.svelte
│   │       ├── Education.svelte
│   │       └── Contact.svelte
├── static/
│   ├── resume-javier-gonzalez.pdf
│   ├── robots.txt
│   └── sitemap.xml
├── svelte.config.js              # static adapter
├── tailwind.config.js
└── package.json
```

---

## Task List

### Phase 1 — Project Setup

- [ ] `npm create svelte@latest portfolio` — skeleton, TypeScript, no SSR
- [ ] Install deps: `@sveltejs/adapter-static`, `tailwindcss`, `sql.js`
- [ ] Configure `svelte.config.js` with static adapter
- [ ] Configure `tailwind.config.js` with custom fonts, colors, spacing scale
- [ ] Add Google Fonts (self-hosted via `fontsource` or manual `@font-face`)
- [ ] Set up base CSS variables (colors, font stacks) in `app.css`

### Phase 2 — Data Layer

- [ ] Write `seed.ts` with all resume data as typed constants (profile, experience[], education[], skills[])
- [ ] Write `db.ts`: initialize sql.js WASM, create tables, seed data on app load
- [ ] Export typed query helpers: `getProfile()`, `getExperience()`, `getSkills()`, `getEducation()`
- [ ] Add hardcoded fallback if WASM init fails

### Phase 3 — Component Build

- [ ] `Hero.svelte` — name, title, tagline, email + LinkedIn buttons, resume PDF link
- [ ] `About.svelte` — summary paragraph, strengths tags
- [ ] `Skills.svelte` — query skills from DB, render grouped pills by category
- [ ] `Experience.svelte` — query experience from DB, vertical timeline, bullet rendering
- [ ] `Education.svelte` — query education from DB, degree cards
- [ ] `Contact.svelte` — email mailto link, LinkedIn URL, phone (optional)
- [ ] `+page.svelte` — compose all components, initialize DB in `onMount`

### Phase 4 — Navigation & UX

- [ ] Sticky top nav with smooth-scroll anchor links to each section
- [ ] Active section highlight in nav (IntersectionObserver)
- [ ] Mobile hamburger menu (Tailwind + Svelte toggle)
- [ ] Scroll-to-top button (appears after scrolling past hero)
- [ ] Fade-in animation on section enter (IntersectionObserver + CSS transition)

### Phase 5 — SEO & Meta

- [ ] Add JSON-LD `Person` schema in `<svelte:head>`
- [ ] Open Graph meta tags (title, description, image)
- [ ] Semantic HTML audit — verify heading hierarchy and landmark regions
- [ ] Write `static/robots.txt`
- [ ] Write `static/sitemap.xml`
- [ ] Add `lang="en"` to `<html>`

### Phase 6 — Assets & Polish

- [ ] Export/save resume as `resume-javier-gonzalez.pdf` → `static/resume-javier-gonzalez.pdf`
- [ ] Generate `og-image.png` (1200×630) for social sharing preview
- [ ] Favicon (`.ico` + `.svg`)
- [ ] Lighthouse audit — target 95+ Performance, 100 Accessibility, 100 SEO
- [ ] Test on mobile (375px), tablet (768px), desktop (1280px+)
- [ ] Cross-browser check (Chrome, Firefox, Safari)

### Phase 7 — Deploy

- [ ] Push to GitHub repo
- [ ] Connect to Vercel or Netlify (auto-deploys on push)
- [ ] Set custom domain (optional)
- [ ] Verify crawlability via Google Search Console (optional)

---

## Notes

- **SQLite is a display choice, not a necessity.** If WASM adds complexity without payoff during the build, swap `db.ts` for plain TypeScript data imports. The schema and seed file remain valid either way.
- Keep the resume PDF up to date in `/static` — recruiters will download it.
- The LinkedIn URL `linkedin.com/in/javiergonzalezdev` should be confirmed active.
- Paycom end date listed as May 2026 — update if needed before deploy.
