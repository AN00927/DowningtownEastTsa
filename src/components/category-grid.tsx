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

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
      {EVENT_CATEGORIES.map((category, i) => {
        const { Icon, blurb } = CATEGORY_META[category];
        const count = counts.get(category) ?? 0;
        return (
          <Link
            key={category}
            href={`/events?category=${encodeURIComponent(category)}`}
            className={cn(
              "group relative flex flex-col overflow-hidden rounded-[var(--radius-base)] border bg-card p-6 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:border-accent hover:shadow-soft-lg",
              // Bento rhythm: 2 wide blocks on top, 3 below (6-col grid).
              i < 2 ? "lg:col-span-3" : "lg:col-span-2",
            )}
          >
            <span className="font-display text-6xl font-bold leading-none text-muted transition-colors group-hover:text-accent/15">
              {String(count).padStart(2, "0")}
            </span>
            <span className="absolute right-6 top-6 inline-flex h-11 w-11 items-center justify-center rounded-[4px] bg-primary/5 text-primary transition-colors group-hover:bg-accent group-hover:text-white">
              <Icon className="h-5 w-5" aria-hidden />
            </span>
            <h3 className="mt-4 font-display text-2xl font-bold uppercase tracking-[0.02em] text-primary transition-colors group-hover:text-accent">
              {category.replace(" & ", " + ")}
            </h3>
            <p className="mt-2 flex-1 text-sm text-muted-foreground">{blurb}</p>
            <span className="mt-5 inline-flex items-center gap-1 font-display text-sm font-bold uppercase tracking-[0.08em] text-accent">
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
