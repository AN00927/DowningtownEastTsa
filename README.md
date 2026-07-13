# Downingtown East TSA

The official website for the **Downingtown East High School** chapter of the
Technology Student Association (TSA). It helps members explore competitive
events, find the event that fits them via a built-in quiz, and get prep support.

## Tech stack

- **Next.js 15** (App Router) with **React 19**
- **TypeScript** (strict mode)
- **Tailwind CSS v4** — design tokens defined in `src/app/globals.css`
- **lucide-react** for icons
- **Barlow / Barlow Condensed** self-hosted via `next/font/local` (no runtime
  dependency on Google Fonts)
- Single light theme by design ("Competition Bold": navy + scarlet)
- Path alias `@/*` → `src/*`

## Running locally

```bash
npm install      # install dependencies
npm run dev      # start the dev server at http://localhost:3000
npm run build    # production build (must pass cleanly: TS strict + ESLint)
npm run start    # serve the production build
```

> Do not run `npm run build` while `npm run dev` is running — they share the
> `.next/` directory and will corrupt each other's cache. Stop the dev server
> first.

## Project structure

```
src/
  app/            # App Router routes, layout, global CSS, fonts
  components/     # Reusable UI + interactive client components
  data/           # All site content (edit here, never hardcode in pages)
  lib/            # Small helpers (e.g. cn)
public/           # Static assets (photos, logo, docs)
```

### Routes

| Route | Page |
| --- | --- |
| `/` | Home — hero, about, event categories, season roadmap, Wall of Fame, FAQ |
| `/events` | Event browser with search and category/participation filters |
| `/events/[id]` | Individual event detail pages (generated from the events data) |
| `/quiz` | Native "Find My Event" quiz |
| `/resources` | Event Support — rules, prep guides, and portfolio examples |
| `/team` | Officers and committees |

`robots.ts` and `sitemap.ts` generate `robots.txt` / `sitemap.xml`;
`not-found.tsx` is the custom 404.

## Editing content

All site content lives in `src/data/*`. Edit these files rather than hardcoding
content in pages.

| File | Controls |
| --- | --- |
| `src/data/site.ts` | Chapter name, tagline, description, canonical `url`, social links, and primary navigation. |
| `src/data/events.ts` | Competitive events catalog and categories; powers `/events` and the quiz. `id` must stay unique and kebab-case. |
| `src/data/quiz.ts` | "Find My Event" quiz — questions, per-event trait vectors, and matching logic. |
| `src/data/officers.ts` | Officer roster and committees shown on the Team page. |
| `src/data/resources.ts` | Event Support links, the prep-guide reference, and portfolio examples. Set `comingSoon: true` to render a link as not-ready. |
| `src/data/faq.ts` | Homepage FAQ entries. |
| `src/data/calendar.ts` | Upcoming dates; the homepage countdown targets the next competition (set `date: ""` for none). |

## Assets and remaining placeholders

Static assets live under `public/`:

- `public/events/` — per-event photos (see `CREDITS.md` for attribution)
- `public/photos/` — hero carousel and Wall of Fame photos
- `public/docs/` — the prep-guide PDF
- `public/tsa-logo.png` — chapter logo

Before launch, replace these placeholders:

- **Site URL** — set the real domain in `src/data/site.ts` (`url`) so canonical
  URLs, the sitemap, and robots.txt are correct (currently `deasttsa.example.com`).
- **Officer photos and bios** — `src/data/officers.ts`. Names and roles are real;
  photos and bios are optional placeholders (empty `photo` renders an avatar
  placeholder).
- **Hero carousel** — slides 3–4 in `src/app/page.tsx` are empty and render a
  "coming soon" panel until real photos are added.
- **Prep guide** — replace `public/docs/tsa-prep-guide-placeholder.pdf` (keep the
  path, or update the link in `src/data/resources.ts`).
- **Resource links** — any entry marked `comingSoon` or pointing at `#` in
  `src/data/resources.ts`.

## Privacy

**No student personal emails anywhere on the site.** Visitors reach the chapter
through its social media channels (Facebook, Instagram, YouTube), configured in
`site.socials`. There is no contact form.

## Deploying to Vercel

1. Push this repository to GitHub.
2. In [Vercel](https://vercel.com), click **New Project** and import the repo.
3. Vercel auto-detects Next.js — no extra config is needed. Keep the default
   build command (`next build`) and output settings.
4. Set the production domain, then update `url` in `src/data/site.ts` to match.
5. Deploy. Pushes to `main` trigger production deploys; other branches get
   preview deployments.
