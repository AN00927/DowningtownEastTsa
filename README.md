# Downingtown East TSA

Live at **<https://deasttsa.org>**.

The website for the Downingtown East High School chapter of the Technology
Student Association. Members use it to browse competitive events, find an event
that fits them with the built-in quiz, and get prep resources.

## Tech stack

- Next.js 15 (App Router) with React 19
- TypeScript in strict mode
- Tailwind CSS v4, with design tokens defined in `src/app/globals.css`
- lucide-react for icons
- Barlow and Barlow Condensed, self-hosted through `next/font/local` so builds
  never depend on Google Fonts being reachable
- One light theme (navy and scarlet), no dark mode
- Path alias `@/*` points at `src/*`

## Running locally

```bash
npm install      # install dependencies
npm run dev      # dev server at http://localhost:3000
npm run build    # production build (TS strict + ESLint must pass)
npm run start    # serve the production build
```

Two things that will waste your afternoon if you hit them:

1. Don't run `npm run build` while `npm run dev` is running. They share the
   `.next/` folder, and the build wipes the chunks the dev server is serving.
   The page then loads with no CSS, or throws `ChunkLoadError`. Stop the dev
   server first.
2. Don't leave two dev servers running. The second one silently starts on port
   3001 while your browser sits on the stale 3000. If the site suddenly renders
   unstyled, kill everything on those ports, delete `.next/`, and start one
   server.

## Project structure

```
src/
  app/            # routes, layout, global CSS, fonts
  components/     # reusable UI and interactive client components
  data/           # all site content (edit here, don't hardcode in pages)
  lib/            # small helpers such as cn
public/           # static assets (photos, logo, docs)
```

### Routes

| Route | Page |
| --- | --- |
| `/` | Home: hero, about, event categories, season roadmap, Wall of Fame, FAQ |
| `/events` | Event browser with search and category/participation filters |
| `/events/[id]` | One page per event, generated from the events data |
| `/quiz` | The "Find My Event" quiz |
| `/resources` | Event support: rules, the master document, portfolio examples |
| `/team` | Officers and committees |

`robots.ts` and `sitemap.ts` generate `robots.txt` and `sitemap.xml`.
`not-found.tsx` is the custom 404.

## Editing content

Site content lives in `src/data/`. Edit those files instead of putting content
directly in pages.

| File | Controls |
| --- | --- |
| `src/data/site.ts` | Chapter name, tagline, description, canonical `url`, social links, primary nav |
| `src/data/events.ts` | Event catalog and categories. Powers `/events` and the quiz. Each `id` must be unique and kebab-case |
| `src/data/themes.ts` | Annual event themes and design problems, keyed by event id |
| `src/data/quiz.ts` | Quiz questions, per-event trait vectors, and the matching logic |
| `src/data/officers.ts` | Officer roster and committees on the Team page |
| `src/data/resources.ts` | Event support links, the master document, portfolio examples. Set `comingSoon: true` to render a link as not ready |
| `src/data/faq.ts` | Homepage FAQ entries |
| `src/data/calendar.ts` | Conference dates. The homepage countdown targets the next one (use `date: ""` for none) |

If you add or remove an event, update `events.ts`, `quiz.ts`, and `themes.ts`
together, and add a matching photo in `public/events/`. The event id ties all
four together.

### Updating for a new season

TSA posts new event lists and themes in the fall. When they do:

1. Check the national list at <https://tsaweb.org/competitions/high-school> and
   the PA list at <https://patsa.org/competitions/highschool/>. Add new events,
   drop retired ones.
2. Copy the new themes from <https://tsaweb.org/competitions/themes-and-problems>
   into `themes.ts` and bump `THEME_SEASON`. That page paginates, so walk all of
   `?hspage=1` through `?hspage=4`. An event with an empty string shows a "not
   announced yet" note instead of a theme.
3. PA-only events come from the rulebook linked at
   <https://www.patsa.org/competitions/paonly/>.
4. Update conference dates in `calendar.ts`.

## Assets

Static files live under `public/`:

- `public/events/` has one photo per event. `CREDITS.md` there records the
  Creative Commons attribution for each one
- `public/photos/` has the hero carousel and Wall of Fame photos
- `public/photos/officers/` has the officer headshots, cropped square
- `public/tsa-logo.png` is the chapter logo
- `public/og-image.jpg` is the link preview card, 1200x628

## Still to do before launch

- Fill in the resource links still marked `comingSoon` in `resources.ts`: the
  event matrix sheet, the event change form, and the individual and team IDs.
- `public/docs/tsa-prep-guide-placeholder.pdf` is left over from before the
  master document was linked, and nothing references it. Delete it or replace
  it with something real.

## Privacy

No student personal emails anywhere on the site. Visitors reach the chapter
through its social accounts (Facebook, Instagram, YouTube), which are set in
`site.socials`. There is no contact form.

## Deploying to Vercel

1. Push the repo to GitHub.
2. In [Vercel](https://vercel.com), pick New Project and import it.
3. Vercel detects Next.js on its own. Keep the default build command
   (`next build`) and output settings.
4. The production domain is `deasttsa.org`, and `url` in `src/data/site.ts`
   already matches it. If the domain ever changes, change both, or the sitemap,
   robots.txt, and link previews will point at the old one.
5. Deploy. Pushes to `main` go to production, other branches get preview builds.

### Link previews

`public/og-image.jpg` is what Facebook, iMessage, and Discord show when someone
shares a link. It is declared in `src/app/layout.tsx`. Without it, scrapers grab
whatever image happens to be first on the page, which used to mean the STEM
Academy venue photo showed up as the site's main image.

Previews are cached, so replacing the file is not enough on its own. Run the URL
through the Facebook Sharing Debugger and press Scrape Again. Other apps expire
their cache on their own after a day or so.
