// Three-step competition roadmap (Regionals -> States -> Nationals) driven by
// the conference data. Server component.
import { CalendarDays, MapPin } from "lucide-react";
import type { CalendarEvent } from "@/data/calendar";
import { cn } from "@/lib/utils";

const LEVEL_BLURBS = [
  "Compete close to home and qualify for the state conference.",
  "Pennsylvania's best chapters go head to head over three days.",
  "Top state finishers advance to the national stage.",
];

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function SeasonRoadmap({ conferences }: { conferences: CalendarEvent[] }) {
  return (
    <ol className="grid gap-6 lg:grid-cols-3">
      {conferences.map((conf, i) => (
        <li key={conf.name} className="relative flex">
          {/* Connector to the next step (desktop only). */}
          {i < conferences.length - 1 && (
            <span
              className="absolute -right-6 top-10 hidden h-[3px] w-6 -skew-x-[20deg] bg-accent/40 lg:block"
              aria-hidden
            />
          )}
          <div
            className={cn(
              "flex w-full flex-col rounded-[var(--radius-base)] border bg-card p-6 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:border-accent hover:shadow-soft-lg",
            )}
          >
            <span className="font-display text-5xl font-bold leading-none text-accent/25">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 font-display text-2xl font-bold uppercase tracking-[0.02em]">
              {conf.name}
            </h3>
            <p className="mt-2 flex-1 text-sm text-muted-foreground">
              {LEVEL_BLURBS[i] ?? ""}
            </p>
            <dl className="mt-5 space-y-1.5 border-t pt-4 text-sm">
              <div className="flex items-center gap-2 text-foreground">
                <CalendarDays className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                <dt className="sr-only">Date</dt>
                <dd className="font-medium">
                  {conf.date ? formatDate(conf.date) : "Date to be announced"}
                </dd>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                <dt className="sr-only">Location</dt>
                <dd>{conf.location || "Location to be announced"}</dd>
              </div>
            </dl>
          </div>
        </li>
      ))}
    </ol>
  );
}
