"use client";

import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";

interface Conf {
  name: string;
  date: string;
  location?: string;
}

interface Parts {
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Calendar-accurate breakdown (months vary in length, so step month by month).
function breakdown(targetMs: number, nowMs: number): Parts {
  let months = 0;
  const cursor = new Date(nowMs);
  for (;;) {
    const next = new Date(cursor);
    next.setMonth(next.getMonth() + 1);
    if (next.getTime() <= targetMs) {
      cursor.setTime(next.getTime());
      months++;
    } else {
      break;
    }
  }
  let delta = targetMs - cursor.getTime();
  const days = Math.floor(delta / 86_400_000);
  delta -= days * 86_400_000;
  const hours = Math.floor(delta / 3_600_000);
  delta -= hours * 3_600_000;
  const minutes = Math.floor(delta / 60_000);
  delta -= minutes * 60_000;
  const seconds = Math.floor(delta / 1000);
  return { months, days, hours, minutes, seconds };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function NextCompetitionClock({ conferences }: { conferences: Conf[] }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  // Render a stable placeholder until mounted (avoids hydration mismatch).
  if (now === null) {
    return <p className="text-lg text-white/70">Loading countdown...</p>;
  }

  // Walk the conferences in schedule order (Regional, State, National) and show
  // the first one that is still upcoming: either it has no date yet (shows a
  // "to be announced" placeholder) or its date is still in the future. Once a
  // dated conference passes, it is skipped and the next one shows.
  const next = conferences.find(
    (c) => !c.date || new Date(c.date).getTime() > now,
  );

  if (!next) {
    return (
      <p className="text-lg font-medium text-white/70">
        No upcoming competition. Stay tuned!
      </p>
    );
  }

  const hasDate = Boolean(next.date) && new Date(next.date).getTime() > now;
  const parts = hasDate ? breakdown(new Date(next.date).getTime(), now) : null;
  const units = parts
    ? [
        { label: "Months", value: parts.months },
        { label: "Days", value: parts.days },
        { label: "Hours", value: parts.hours },
        { label: "Minutes", value: parts.minutes },
        { label: "Seconds", value: parts.seconds },
      ]
    : [];

  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {next.name}
      </h2>
      <p className="mt-2 text-white/70">
        {hasDate ? formatDate(next.date) : "Date to be announced"}
      </p>
      <p className="mt-1 flex items-center gap-1.5 text-sm text-white/60">
        <MapPin className="h-4 w-4" aria-hidden />
        {next.location ? next.location : "Location to be announced"}
      </p>

      {units.length > 0 ? (
        <div className="mt-8 grid max-w-xl grid-cols-5 gap-2 sm:gap-3">
          {units.map((u) => (
            <div
              key={u.label}
              className="rounded-[var(--radius-base)] border border-white/15 bg-white/10 px-1 py-4 text-center backdrop-blur"
            >
              <div className="overflow-hidden">
                {/* key by value so it remounts and rolls when the number changes */}
                <span
                  key={u.value}
                  className="digit-roll block font-mono text-2xl font-bold tabular-nums text-white sm:text-5xl"
                >
                  {String(u.value).padStart(2, "0")}
                </span>
              </div>
              <div className="mt-1.5 text-[10px] uppercase tracking-wide text-white/60 sm:text-xs">
                {u.label}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-6 text-sm text-white/60">
          The countdown will appear once the date is announced.
        </p>
      )}
    </div>
  );
}
