// Bento-style block grid of event categories with live counts. Links carry a
// ?category= param the event browser reads to pre-filter. Server component.
import Link from "next/link";
import {
  ArrowRight,
  Clapperboard,
  Cog,
  FlaskConical,
  Palette,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { EVENT_CATEGORIES, events, type EventCategory } from "@/data/events";
import { cn } from "@/lib/utils";

const CATEGORY_META: Record<
  EventCategory,
  { Icon: LucideIcon; blurb: string }
> = {
  "Creative & Design": {
    Icon: Palette,
    blurb: "Architecture, game design, fashion, music, photography, and more.",
  },
  "Engineering & Technology": {
    Icon: Cog,
    blurb: "CAD, coding, robotics, drones, dragsters, and structural builds.",
  },
  "Science & Research": {
    Icon: FlaskConical,
    blurb: "Biotech, data science, and forensic problem solving.",
  },
  "Media & Communication": {
    Icon: Clapperboard,
    blurb: "Film, podcasts, debate, journalism, and on-camera storytelling.",
  },
  "Academic & Competition": {
    Icon: Trophy,
    blurb: "Tests of technology knowledge, leadership, and quick thinking.",
  },
};

export function CategoryGrid() {
  const counts = new Map<EventCategory, number>();
  for (const e of events) {
    counts.set(e.category, (counts.get(e.category) ?? 0) + 1);
  }

  // Most events first, left to right, on both rows.
  const ordered = [...EVENT_CATEGORIES].sort(
    (a, b) => (counts.get(b) ?? 0) - (counts.get(a) ?? 0),
  );

  return (
    // 2-up compact blocks on phones (blurbs hidden) to keep scrolling short;
    // the full bento with blurbs from sm up.
    <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-6">
      {ordered.map((category, i) => {
        const { Icon, blurb } = CATEGORY_META[category];
        const count = counts.get(category) ?? 0;
        return (
          <Link
            key={category}
            href={`/events?category=${encodeURIComponent(category)}`}
            className={cn(
              "group relative flex flex-col overflow-hidden rounded-[var(--radius-base)] border bg-card p-4 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:border-accent hover:shadow-soft-lg sm:p-6",
              // Bento rhythm: 2 wide blocks on top, 3 below (6-col grid).
              i < 2 ? "lg:col-span-3" : "lg:col-span-2",
            )}
          >
            <span className="font-display text-4xl font-bold leading-none text-muted transition-colors group-hover:text-accent/15 sm:text-6xl">
              {String(count).padStart(2, "0")}
            </span>
            <span className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-[4px] bg-primary/5 text-primary transition-colors group-hover:bg-accent group-hover:text-white sm:right-6 sm:top-6 sm:h-11 sm:w-11">
              <Icon className="h-5 w-5" aria-hidden />
            </span>
            <h3 className="mt-3 font-display text-lg font-bold uppercase tracking-[0.02em] text-primary transition-colors group-hover:text-accent sm:mt-4 sm:text-2xl">
              {category.replace(" & ", " + ")}
            </h3>
            <p className="mt-2 hidden flex-1 text-sm text-muted-foreground sm:block">
              {blurb}
            </p>
            <span className="mt-auto inline-flex items-center gap-1 pt-3 font-display text-xs font-bold uppercase tracking-[0.08em] text-accent sm:pt-5 sm:text-sm">
              {count} events
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </span>
          </Link>
        );
      })}
    </div>
  );
}
