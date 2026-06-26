"use client";

import { useMemo, useState } from "react";
import { Search, Users, User, X } from "lucide-react";
import {
  type TsaEvent,
  EVENT_CATEGORIES,
  participationOf,
  teamSizeLabel,
} from "@/data/events";
import { Badge, Card } from "@/components/ui";
import { cn } from "@/lib/utils";

type ScopeFilter = "all" | "national" | "pa";
type PartFilter = "all" | "individual" | "team";

const categoryColors: Record<string, string> = {
  "Creative & Design": "border-pink-500/40 text-pink-600 dark:text-pink-400",
  "Engineering & Technology": "border-blue-500/40 text-blue-600 dark:text-blue-400",
  "Science & Research": "border-emerald-500/40 text-emerald-600 dark:text-emerald-400",
  "Media & Communication": "border-amber-500/40 text-amber-600 dark:text-amber-400",
  "Academic & Competition": "border-violet-500/40 text-violet-600 dark:text-violet-400",
};

export function EventFilters({ events }: { events: TsaEvent[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [scope, setScope] = useState<ScopeFilter>("all");
  const [part, setPart] = useState<PartFilter>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return events.filter((e) => {
      if (category !== "all" && e.category !== category) return false;
      if (scope !== "all" && e.scope !== scope) return false;
      if (part !== "all" && participationOf(e) !== part) return false;
      if (q && !(`${e.name} ${e.blurb}`.toLowerCase().includes(q))) return false;
      return true;
    });
  }, [events, query, category, scope, part]);

  const hasFilters =
    query !== "" || category !== "all" || scope !== "all" || part !== "all";

  const reset = () => {
    setQuery("");
    setCategory("all");
    setScope("all");
    setPart("all");
  };

  return (
    <div>
      {/* Search */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search events…"
          aria-label="Search events"
          className="h-12 w-full rounded-[var(--radius-base)] border border-input bg-background pl-11 pr-4 text-base outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      {/* Category chips */}
      <div className="mt-4 flex flex-wrap gap-2">
        <FilterChip active={category === "all"} onClick={() => setCategory("all")}>
          All categories
        </FilterChip>
        {EVENT_CATEGORIES.map((c) => (
          <FilterChip
            key={c}
            active={category === c}
            onClick={() => setCategory(c)}
          >
            {c}
          </FilterChip>
        ))}
      </div>

      {/* Scope + participation */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-sm text-muted-foreground">Level:</span>
        <SegToggle
          options={[
            { value: "all", label: "All" },
            { value: "national", label: "National" },
            { value: "pa", label: "PA-only" },
          ]}
          value={scope}
          onChange={(v) => setScope(v as ScopeFilter)}
        />
        <span className="ml-2 text-sm text-muted-foreground">Type:</span>
        <SegToggle
          options={[
            { value: "all", label: "All" },
            { value: "individual", label: "Individual" },
            { value: "team", label: "Team" },
          ]}
          value={part}
          onChange={(v) => setPart(v as PartFilter)}
        />
        {hasFilters && (
          <button
            type="button"
            onClick={reset}
            className="ml-auto inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
          >
            <X className="h-4 w-4" /> Clear
          </button>
        )}
      </div>

      {/* Count */}
      <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">
        Showing {filtered.length} of {events.length} events
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <Card className="mt-4 p-10 text-center text-muted-foreground">
          No events match your filters.{" "}
          <button onClick={reset} className="font-medium text-accent hover:underline">
            Clear filters
          </button>
        </Card>
      ) : (
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((e) => (
            <Card key={e.id} id={e.id} className="flex h-full flex-col p-5">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <Badge className={cn("bg-background", categoryColors[e.category])}>
                  {e.category}
                </Badge>
                {e.scope === "pa" && (
                  <Badge className="border-accent/40 bg-accent/10 text-accent">
                    PA-only
                  </Badge>
                )}
              </div>
              <h3 className="text-lg font-semibold">{e.name}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{e.blurb}</p>
              <div className="mt-4 flex items-center gap-1.5 text-sm text-muted-foreground">
                {participationOf(e) === "individual" ? (
                  <User className="h-4 w-4" />
                ) : (
                  <Users className="h-4 w-4" />
                )}
                {teamSizeLabel(e)}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterChip({
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
        "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border hover:bg-muted",
      )}
    >
      {children}
    </button>
  );
}

function SegToggle({
  options,
  value,
  onChange,
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="inline-flex rounded-[var(--radius-base)] border border-border p-0.5">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          aria-pressed={value === o.value}
          className={cn(
            "rounded-[calc(var(--radius-base)-2px)] px-3 py-1 text-sm font-medium transition-colors",
            value === o.value
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
