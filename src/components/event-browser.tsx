"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Clapperboard,
  Cog,
  FlaskConical,
  Palette,
  Search,
  SlidersHorizontal,
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
import { Badge, Card } from "@/components/ui";
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

/** Icon shown on the designed placeholder panel when an event has no photo. */
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
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-foreground hover:border-primary/40 hover:bg-muted",
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

function EventCard({ event }: { event: TsaEvent }) {
  const Icon = CATEGORY_ICONS[event.category];
  return (
    <Link href={`/events/${event.id}`} className="group block h-full">
      <Card className="flex h-full flex-col overflow-hidden p-0 transition-all duration-200 group-hover:-translate-y-1 group-hover:border-accent group-hover:shadow-soft-lg">
        {/* Big visual header: real photo when provided, otherwise a designed
            category panel. Zooms gently on hover. */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-deep-navy">
          {event.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={event.image}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="dots-pattern flex h-full w-full items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <Icon
                className="h-14 w-14 text-white/60 transition-colors group-hover:text-white/85"
                aria-hidden
              />
            </div>
          )}
          <span className="absolute left-3 top-3 inline-flex items-center rounded-[3px] bg-accent px-2 py-0.5 font-display text-[11px] font-bold uppercase tracking-[0.08em] text-white">
            {categoryShort(event.category)}
          </span>
        </div>

        {/* Body: name + team tag, one-glance only. */}
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-xl font-bold leading-snug text-primary transition-colors group-hover:text-accent">
              {event.name}
            </h3>
            <Badge className="mt-0.5 shrink-0 border-border text-muted-foreground">
              {participationTag(event)}
            </Badge>
          </div>
          <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted-foreground">
            {event.blurb}
          </p>
          <span className="mt-4 inline-flex items-center gap-1 font-display text-sm font-bold uppercase tracking-[0.08em] text-accent">
            View details
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden
            />
          </span>
        </div>
      </Card>
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
    <section id={id} aria-label={heading} className="scroll-mt-44">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <h2 className="text-3xl font-bold">{heading}</h2>
        <Badge className="border-border bg-muted text-muted-foreground">
          {events.length} {events.length === 1 ? "event" : "events"}
        </Badge>
        {note && <span className="text-sm text-muted-foreground">{note}</span>}
      </div>
      {events.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-[var(--radius-base)] border border-dashed bg-muted/40 px-4 py-10 text-center">
          <p className="text-sm text-muted-foreground">
            No matching events in this section. Try adjusting your search or
            filters.
          </p>
          <button
            type="button"
            onClick={onClear}
            className="inline-flex h-10 cursor-pointer items-center gap-1.5 rounded-[4px] border border-border bg-card px-4 font-display text-sm font-bold uppercase tracking-[0.06em] text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            <X className="h-4 w-4" aria-hidden />
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

  const categoryCounts = useMemo(() => {
    const counts = new Map<EventCategory, number>();
    for (const e of events) {
      counts.set(e.category, (counts.get(e.category) ?? 0) + 1);
    }
    return counts;
  }, [events]);

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

  const national = filtered.filter((e) => e.scope === "national");
  const pa = filtered.filter((e) => e.scope === "pa");

  function clear() {
    setQuery("");
    setCategory("all");
    setParticipation("all");
  }

  return (
    <div className="flex flex-col gap-10">
      {/* Filter toolbar: sticky under the navbar from sm up */}
      <div className="z-30 rounded-[6px] border bg-background/95 p-4 shadow-soft backdrop-blur sm:sticky sm:top-[79px] sm:p-5">
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
              placeholder="Search events by name or description"
              aria-label="Search events"
              className="h-11 w-full rounded-[4px] border border-input bg-card pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-2"
            />
          </div>
          <Segmented value={participation} onChange={setParticipation} />
          {filtersActive && (
            <button
              type="button"
              onClick={clear}
              className="inline-flex h-11 cursor-pointer items-center gap-1.5 rounded-[4px] border border-border bg-card px-3.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
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
          className="mt-3 flex gap-2 overflow-x-auto pb-1"
        >
          <CategoryPill active={category === "all"} onClick={() => setCategory("all")}>
            All categories ({events.length})
          </CategoryPill>
          {EVENT_CATEGORIES.map((c) => (
            <CategoryPill
              key={c}
              active={category === c}
              onClick={() => setCategory(c)}
            >
              {categoryShort(c)} ({categoryCounts.get(c) ?? 0})
            </CategoryPill>
          ))}
        </div>

        {/* Count + section jump links */}
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5" aria-live="polite">
            <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden />
            Showing {filtered.length} of {events.length} events
          </span>
          <a href="#national" className="font-medium text-primary hover:text-accent hover:underline">
            National ({national.length})
          </a>
          <a href="#pa-only" className="font-medium text-primary hover:text-accent hover:underline">
            PA-only ({pa.length})
          </a>
        </div>
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
