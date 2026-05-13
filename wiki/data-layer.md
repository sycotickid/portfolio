# Data Layer

[← Wiki Home](./README.md)

## Overview

All resume data is stored in an in-browser SQLite database powered by **sql.js** (SQLite compiled to WebAssembly). No backend database exists. On first load the app seeds the DB from hardcoded TypeScript data in `seed.ts`.

If WASM fails to load, components fall back to `seed.ts` data directly — no visible difference to the user.

## Files

| File                   | Role                                         |
| ---------------------- | -------------------------------------------- |
| `src/lib/data/seed.ts` | TypeScript interfaces + all resume data      |
| `src/lib/db.ts`        | sql.js init, table creation, query functions |
| `static/sql-wasm.wasm` | SQLite WASM binary (served as static asset)  |

## Initialization (`db.ts`)

```
onMount() in +page.svelte
  → initDB()
      1. SQL.default({ locateFile: () => '/sql-wasm.wasm' })
      2. new SQL.Database()
      3. CREATE TABLE IF NOT EXISTS (profile, experience, education, skill)
      4. INSERT seed data
      5. Resolve — components can now query
```

## Schema

```sql
CREATE TABLE profile (
  id         INTEGER PRIMARY KEY,
  name       TEXT,
  title      TEXT,
  summary    TEXT,
  email      TEXT,
  linkedin   TEXT
);

CREATE TABLE experience (
  id          INTEGER PRIMARY KEY,
  company     TEXT,
  title       TEXT,
  location    TEXT,
  start_date  TEXT,
  end_date    TEXT,
  description TEXT   -- pipe-delimited bullet points
);

CREATE TABLE education (
  id          INTEGER PRIMARY KEY,
  degree      TEXT,
  institution TEXT,
  year        INTEGER
);

CREATE TABLE skill (
  id       INTEGER PRIMARY KEY,
  name     TEXT,
  category TEXT,
  icon     TEXT   -- Simple Icons slug
);
```

## Query Functions

All exported from `src/lib/db.ts`:

| Function          | Returns                                          |
| ----------------- | ------------------------------------------------ |
| `getProfile()`    | Single profile row                               |
| `getExperience()` | Array of experience rows (reverse chronological) |
| `getEducation()`  | Array of education rows                          |
| `getSkills()`     | Array of skill rows                              |

## TypeScript Interfaces (`seed.ts`)

```typescript
interface Profile {
	name: string;
	title: string;
	summary: string;
	email: string;
	linkedin: string;
}

interface Experience {
	company: string;
	title: string;
	location: string;
	start_date: string;
	end_date: string;
	description: string; // pipe-delimited
}

interface Education {
	degree: string;
	institution: string;
	year: number;
}

interface Skill {
	name: string;
	category: "Backend" | "Frontend" | "DevOps" | "Tools & AI";
	icon: string;
}
```

## Seed Data Summary

**Profile** — 1 record: Javier Gonzalez, Senior Software Engineer

**Experience** — 6 roles (newest first):

| Company                          | Role                     | Dates               |
| -------------------------------- | ------------------------ | ------------------- |
| Paycom                           | Senior Software Engineer | Mar 2022 – May 2026 |
| Word on Fire Catholic Ministries | Contract SE              | Oct 2021 – Jul 2024 |
| Revature                         | Full-Stack SE            | Nov 2020 – Feb 2022 |
| Drive Studio                     | Unreal Developer         | Apr 2019 – Oct 2020 |
| Code Ninjas / iD Tech            | Programming Instructor   | Jan 2018 – Apr 2019 |
| Florida International University | Front-End Developer      | Oct 2014 – Sep 2015 |

**Education** — 2 degrees:

| Degree                 | Institution                             | Year |
| ---------------------- | --------------------------------------- | ---- |
| B.S. Computer Science  | Florida International University        | 2015 |
| B.S. Game Art & Design | John Paul the Great Catholic University | 2018 |

**Skills** — 20 total across 4 categories:

| Category   | Skills                                                                        |
| ---------- | ----------------------------------------------------------------------------- |
| Backend    | PHP/Laravel, .NET/C#, Golang, Node.js, Spring Boot, MySQL, PostgreSQL, SQLite |
| Frontend   | React/TypeScript, Svelte, Angular, Tailwind CSS, WordPress                    |
| DevOps     | Docker, Kubernetes, REST API Design                                           |
| Tools & AI | Claude Code/OpenCode, Datastar, Figma, Unreal Engine 5                        |

## Updating Resume Data

Edit `src/lib/data/seed.ts`. The DB is re-seeded on every page load. No migration needed — tables use `CREATE TABLE IF NOT EXISTS` and re-seed clears rows before inserting.

## Related

- [Architecture](./architecture.md) — How DB fits in overall flow
- [Components](./components.md) — Components that consume query functions
