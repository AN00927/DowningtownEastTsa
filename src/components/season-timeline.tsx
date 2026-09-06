import { AlertTriangle } from "lucide-react";

import { seasonSteps } from "@/data/season";
import { cn } from "@/lib/utils";

/**
 * The season as a vertical list of dated steps, so a student can see what is
 * coming and what they can miss. Complements the Road to Nationals roadmap:
 * that one shows the three conferences, this one shows the deadlines between
 * them.
 *
 * Steps without a confirmed date say so rather than showing a guess, since a
 * wrong deadline here is worse than no deadline.
 */
export function SeasonTimeline() {
  return (
    <ol className="relative border-l border-border pl-6 sm:pl-8">
      {seasonSteps.map((step) => (
        <li key={step.title} className="relative pb-8 last:pb-0">
          {/* Node on the rail. Scarlet for the steps you can miss. */}
          <span
            className={cn(
              "absolute -left-[calc(1.5rem+5px)] top-1.5 size-2.5 rounded-full ring-4 ring-background sm:-left-[calc(2rem+5px)]",
              step.critical ? "bg-accent" : "bg-border",
            )}
            aria-hidden
          />
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="font-display text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground">
              {step.window}
            </span>
            {step.critical && (
              <span className="inline-flex items-center gap-1 rounded-[3px] bg-accent/10 px-1.5 py-0.5 font-display text-[11px] font-bold uppercase tracking-[0.06em] text-accent">
                <AlertTriangle className="size-3" aria-hidden />
                Do not miss
              </span>
            )}
          </div>
          <h3 className="mt-1 font-display text-lg font-bold uppercase tracking-[0.06em] text-primary sm:text-xl">
            {step.title}
          </h3>
          <p className="mt-1.5 max-w-prose text-sm leading-relaxed text-muted-foreground">
            {step.detail}
          </p>
          <p className="mt-2 text-sm font-medium text-foreground">
            {step.date !== "" ? (
              step.date
            ) : (
              <span className="text-muted-foreground">
                Exact dates announced soon
              </span>
            )}
          </p>
        </li>
      ))}
    </ol>
  );
}
