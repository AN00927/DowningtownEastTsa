# Downingtown East TSA Website

The official website for the **Downingtown East High School** chapter of the
Technology Student Association (TSA). It serves as a resource hub for members to
explore competitive events, find the right event for them, get prep support,
read announcements, and contact the chapter.

## Tech stack

- **Next.js 15** (App Router)
- **TypeScript** (strict mode)
- **Tailwind CSS v4** (design tokens in `src/app/globals.css`)
- **next-themes** for light/dark mode (token-based, no hardcoded colors)
- **lucide-react** for icons
- Path alias `@/*` → `src/*`

## Running locally

```bash
npm install      # install dependencies
npm run dev      # start the dev server at http://localhost:3000
npm run build    # production build (must pass cleanly — TS strict + eslint)
npm run start    # serve the production build
```

## Where to edit content

All site content lives in `src/data/*` — edit these files, never hardcode
content in pages:

| File | Controls |
| --- | --- |
| `src/data/site.ts` | School/chapter name, tagline, description, canonical `url`, social links, and the primary navigation. |
| `src/data/events.ts` | The competitive events list, event categories, and participation/team-size helpers. |
| `src/data/officers.ts` | Officer roster and advisor info (placeholders — no personal emails). |
| `src/data/news.ts` | News / announcements (newest first; `slug`, `title`, `date`, `excerpt`, `body`). |
| `src/data/achievements.ts` | Chapter achievements / awards. |
| `src/data/faq.ts` | Frequently asked questions. |
| `src/data/sponsors.ts` | Sponsor list and logos. |
| `src/data/resources.ts` | Quick links, the prep-guide reference, and portfolio examples. |
| `src/data/quiz.ts` | "Find My Event" quiz questions, options, and event/category weights. |
| `src/data/calendar.ts` | Calendar / schedule entries. |

## Replacing placeholders

Before launch, swap out the placeholder assets and info:

- **Photos:** add real images under `public/` and reference them in the relevant
  data file or page. Placeholder image/avatar slots render via
  `ImagePlaceholder` / `AvatarPlaceholder` until real images are supplied.
- **Officer info:** update `src/data/officers.ts` with real names, grades, roles,
  and photos. Do **not** add personal student emails (see Privacy below).
- **Prep guide PDF:** replace `public/docs/tsa-prep-guide-placeholder.pdf` with
  the real prep guide (keep the same path, or update the link in
  `src/data/resources.ts`).
- **Sponsor logos:** add logo images to `public/` and reference them in
  `src/data/sponsors.ts`.
- **Site URL:** set the real domain in `src/data/site.ts` (`url`) so canonical
  URLs, the sitemap, and robots.txt are correct.
- **Social links:** confirm/replace the URLs in `site.socials` (the Schoology
  link in particular is a placeholder).

## Privacy rule

**No student personal emails anywhere on the site.** Visitors contact the
chapter through the `/contact` form and the chapter's social media channels.
Officer names, photos, and grades are placeholders until cleared for publication.

## Deploying to Vercel

1. Push this repository to GitHub (or GitLab/Bitbucket).
2. In [Vercel](https://vercel.com), click **New Project** and import the repo.
3. Vercel auto-detects Next.js — no extra config is needed. Keep the default
   build command (`next build`) and output settings.
4. Set the production domain, then update `url` in `src/data/site.ts` to match.
5. Deploy. Pushes to the main branch trigger automatic production deploys;
   other branches get preview deployments.
