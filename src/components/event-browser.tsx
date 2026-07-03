"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  EVENT_CATEGORIES,
  participationOf,
  type EventCategory,
  type TsaEvent,
} from "@/data/events";
import { Badge, Card, buttonClass } from "@/components/ui";
import { cn } from "@/lib/utils";

type CategoryFilter = "all" | EventCategory;
type ParticipationFilter = "all" | "individual" | "team";

/** Tag label for an event, e.g. "Individual", "Team (2-6)", "Team (6)". */
function participationTag(e: TsaEvent): string {
  if (participationOf(e) === "individual") return "Individual";
  if (e.teamMin === e.teamMax) return `Team (${e.teamMax})`;
  return `Team (${e.teamMin}-${e.teamMax})`;
}

/** Pill-style filter button with an active state. */
function FilterButton({
  active,
  activeClass = "bg-primary text-primary-foreground",
  onClick,
  children,
}: {
  active: boolean;
  activeClass?: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
        active
          ? activeClass
          : "border-border bg-card text-foreground hover:bg-muted",
      )}
    >
      {children}
    </button>
  );
}

function EventCard({ event }: { event: TsaEvent }) {
  return (
    <Card className="flex h-full flex-col gap-3 p-5 transition-shadow hover:shadow-soft-lg">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold leading-snug">
          <Link
            href={`/events/${event.id}`}
            className="text-primary hover:text-accent hover:underline"
          >
            {event.name}
          </Link>
        </h3>
        <Badge className="shrink-0 border-border text-muted-foreground">
          {participationTag(event)}
        </Badge>
      </div>
      <p className="text-sm text-muted-foreground">{event.blurb}</p>
    </Card>
  );
}

function EventGrid({
  heading,
  events,
}: {
  heading: string;
  events: TsaEvent[];
}) {
  return (
    <section aria-label={heading}>
      <h2 className="mb-5 text-xl font-bold tracking-tight">{heading}</h2>
      {events.length === 0 ? (
        <p className="rounded-[var(--radius-base)] border border-dashed bg-muted/40 px-4 py-6 text-sm text-muted-foreground">
          No matching events in this section. Try adjusting your search or filters.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
    <div className="flex flex-col gap-8">
      {/* Controls */}
      <div className="flex flex-col gap-5 rounded-[var(--radius-base)] border bg-card p-5 shadow-soft">
        <div>
          <label
            htmlFor="event-search"
            className="mb-1.5 block text-sm font-medium"
          >
            Search events
          </label>
          <input
            id="event-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or description"
            className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-2"
          />
        </div>

        <fieldset className="flex flex-col gap-2">
          <legend className="mb-1 text-sm font-medium">Category</legend>
          <div className="flex flex-wrap gap-2">
            <FilterButton
              active={category === "all"}
              onClick={() => setCategory("all")}
            >
              All
            </FilterButton>
            {EVENT_CATEGORIES.map((c) => (
              <FilterButton
                key={c}
                active={category === c}
                onClick={() => setCategory(c)}
              >
                {c}
              </FilterButton>
            ))}
          </div>
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <legend className="mb-1 text-sm font-medium">Participation</legend>
          <div className="flex flex-wrap gap-2">
            <FilterButton
              active={participation === "all"}
              onClick={() => setParticipation("all")}
            >
              All
            </FilterButton>
            <FilterButton
              active={participation === "individual"}
              activeClass="bg-accent text-accent-foreground"
              onClick={() => setParticipation("individual")}
            >
              Individual
            </FilterButton>
            <FilterButton
              active={participation === "team"}
              activeClass="bg-accent text-accent-foreground"
              onClick={() => setParticipation("team")}
            >
              Team
            </FilterButton>
          </div>
        </fieldset>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground" aria-live="polite">
            Showing {filtered.length}{" "}
            {filtered.length === 1 ? "event" : "events"}
          </p>
          {filtersActive && (
            <button
              type="button"
              onClick={clear}
              className={buttonClass("outline", "sm")}
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      <EventGrid heading="National Events" events={national} />
      <EventGrid heading="Pennsylvania-only Events" events={pa} />
    </div>
  );
}
