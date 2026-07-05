"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Clapperboard,
  Cog,
  FlaskConical,
  Palette,
  Search,
  Trophy,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  EVENT_CATEGORIES,
  participationOf,
  type EventCategory,
  type TsaEvent,
} from "@/data/events";
import { cn } from "@/lib/utils";

type CategoryFilter = "all" | EventCategory;
type ParticipationFilter = "all" | "individual" | "team";

/** Tag label for an event, e.g. "Individual", "Team (2-6)", "Team (6)". */
function participationTag(e: TsaEvent): string {
  if (participationOf(e) === "individual") return "Individual";
  if (e.teamMin === e.teamMax) return `Team (${e.teamMax})`;
  return `Team (${e.teamMin}-${e.teamMax})`;
}

/** Short display label for a category pill. */
function categoryShort(c: EventCategory): string {
  return c.replace(" & ", " + ");
}

/** Icon shown on the image placeholder panel (photos get placed later). */
const CATEGORY_ICONS: Record<EventCategory, LucideIcon> = {
  "Creative & Design": Palette,
  "Engineering & Technology": Cog,
  "Science & Research": FlaskConical,
  "Media & Communication": Clapperboard,
  "Academic & Competition": Trophy,
};

function CategoryPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "shrink-0 cursor-pointer whitespace-nowrap rounded-[4px] border px-3.5 py-1.5 font-display text-sm font-semibold uppercase tracking-[0.04em] transition-colors",
        active
          ? "border-accent bg-accent text-accent-foreground"
          : "border-border bg-card text-muted-foreground hover:border-accent/50 hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

function Segmented({
  value,
  onChange,
}: {
  value: ParticipationFilter;
  onChange: (v: ParticipationFilter) => void;
}) {
  const options: { value: ParticipationFilter; label: string }[] = [
    { value: "all", label: "All" },
    { value: "individual", label: "Individual" },
    { value: "team", label: "Team" },
  ];
  return (
    <div
      role="group"
      aria-label="Participation type"
      className="inline-flex shrink-0 rounded-[6px] border border-border bg-card p-0.5"
    >
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          aria-pressed={value === o.value}
          className={cn(
            "cursor-pointer rounded-[4px] px-3 py-1.5 font-display text-sm font-semibold uppercase tracking-[0.04em] transition-colors",
            value === o.value
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/**
 * Airy, borderless entry in the spirit of the old chapter site: image slot on
 * top, then the event name with the team size beside it, then the full
 * description. The image is a designed placeholder — photos get placed later.
 */
function EventCard({ event }: { event: TsaEvent }) {
  const Icon = CATEGORY_ICONS[event.category];
  return (
    <Link href={`/events/${event.id}`} className="group block h-full">
      <article className="flex h-full flex-col">
        {/* PLACEHOLDER image slot — we'll pick the right photo per event later. */}
        <div
          role="img"
          aria-label={`${event.name} photo placeholder`}
          className="dots-pattern flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-2xl bg-deep-navy"
        >
          <Icon className="h-10 w-10 text-white/40" aria-hidden />
        </div>

        <div className="mt-7 flex items-baseline justify-between gap-4">
          <h3 className="font-display text-xl font-bold uppercase tracking-[0.14em] text-primary transition-colors group-hover:text-accent sm:text-2xl">
            {event.name}
          </h3>
          <span className="shrink-0 text-sm text-muted-foreground">
            {participationTag(event)}
          </span>
        </div>
        <p className="mt-3 max-w-[46ch] text-base leading-relaxed text-muted-foreground">
          {event.blurb}
        </p>
      </article>
    </Link>
  );
}

function EventGrid({
  id,
  heading,
  note,
  events,
  onClear,
}: {
  id: string;
  heading: string;
  note?: string;
  events: TsaEvent[];
  onClear: () => void;
}) {
  return (
    <section id={id} aria-label={heading} className="scroll-mt-28 border-t pt-16 sm:pt-20">
      <div className="mb-14 text-center">
        <h2 className="text-4xl font-bold tracking-[0.06em] sm:text-5xl">
          {heading}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {events.length} {events.length === 1 ? "event" : "events"}
          {note && <> &middot; {note}</>}
        </p>
      </div>
      {events.length === 0 ? (
        <div className="rounded-[6px] border border-dashed px-4 py-12 text-center">
          <p className="text-sm text-muted-foreground">
            No matching events in this section.{" "}
            <button
              type="button"
              onClick={onClear}
              className="cursor-pointer font-medium text-foreground underline underline-offset-2 hover:text-accent"
            >
              Clear all filters
            </button>
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-x-14 gap-y-20 md:grid-cols-2 xl:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </section>
  );
}

export function EventBrowser({ events }: { events: TsaEvent[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [participation, setParticipation] = useState<ParticipationFilter>("all");
  const [mounted, setMounted] = useState(false);

  // Pre-filter from ?category= (e.g. the homepage category grid links here).
  // Read post-mount rather than via useSearchParams so the full event list
  // stays in the prerendered HTML (SEO + fast first paint).
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("category");
    if (param && (EVENT_CATEGORIES as readonly string[]).includes(param)) {
      setCategory(param as EventCategory);
    }
    setMounted(true);
  }, []);

  // Keep the URL shareable as the category changes (no navigation/scroll).
  useEffect(() => {
    if (!mounted) return;
    const url = new URL(window.location.href);
    if (category === "all") url.searchParams.delete("category");
    else url.searchParams.set("category", category);
    window.history.replaceState(null, "", url);
  }, [category, mounted]);

  const filtersActive =
    query.trim() !== "" || category !== "all" || participation !== "all";

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return events.filter((e) => {
      if (category !== "all" && e.category !== category) return false;
      if (participation !== "all" && participationOf(e) !== participation) {
        return false;
      }
      if (q !== "") {
        const haystack = `${e.name} ${e.blurb}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [events, query, category, participation]);

  // Alphabetical within each section so events are easy to look up by name.
  const byName = (a: TsaEvent, b: TsaEvent) => a.name.localeCompare(b.name);
  const national = filtered.filter((e) => e.scope === "national").sort(byName);
  const pa = filtered.filter((e) => e.scope === "pa").sort(byName);

  function clear() {
    setQuery("");
    setCategory("all");
    setParticipation("all");
  }

  return (
    <div className="flex flex-col gap-16 sm:gap-20">
      {/* Filters: stay at the top of the page (not sticky). */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[220px] flex-1">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <input
              id="event-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search events"
              aria-label="Search events"
              className="h-11 w-full rounded-[4px] border border-input bg-card pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-2"
            />
          </div>
          <Segmented value={participation} onChange={setParticipation} />
          {filtersActive && (
            <button
              type="button"
              onClick={clear}
              className="inline-flex h-11 cursor-pointer items-center gap-1.5 rounded-[4px] px-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="h-4 w-4" aria-hidden />
              Clear
            </button>
          )}
        </div>

        {/* Category pills, horizontally scrollable on small screens */}
        <div
          role="group"
          aria-label="Filter by category"
          className="flex gap-2 overflow-x-auto pb-1"
        >
          <CategoryPill active={category === "all"} onClick={() => setCategory("all")}>
            All categories
          </CategoryPill>
          {EVENT_CATEGORIES.map((c) => (
            <CategoryPill
              key={c}
              active={category === c}
              onClick={() => setCategory(c)}
            >
              {categoryShort(c)}
            </CategoryPill>
          ))}
        </div>

        <p className="text-sm text-muted-foreground" aria-live="polite">
          Showing {filtered.length} of {events.length} events
        </p>
      </div>

      {/* Results */}
      <EventGrid
        id="national"
        heading="National Events"
        events={national}
        onClear={clear}
      />
      <EventGrid
        id="pa-only"
        heading="Pennsylvania-Only Events"
        note="These events run at the PA state level."
        events={pa}
        onClear={clear}
      />
    </div>
  );
}
