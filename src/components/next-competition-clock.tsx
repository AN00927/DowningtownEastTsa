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

  // Walk the conferences in schedule order (Regional, State, National). The
  // clock counts down to the FIRST upcoming conference that has a date. If an
  // earlier conference is still undated, it is shown as a small "date to be
  // announced" note above the ticking clock, so there is always a live
  // countdown when any upcoming conference has a date.
  const upcoming = conferences.filter(
    (c) => !c.date || new Date(c.date).getTime() > now,
  );
  const next = upcoming.find((c) => c.date) ?? upcoming[0];
  const undatedBefore = upcoming.filter(
    (c) => !c.date && c !== next && upcoming.indexOf(c) < upcoming.indexOf(next),
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
      {undatedBefore.length > 0 && (
        <p className="mb-5 inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-medium tracking-wide text-white/70">
          {undatedBefore.map((c) => c.name).join(", ")}: date to be announced
        </p>
      )}
      <h2 className="text-4xl font-bold text-white sm:text-5xl">
        {next.name}
      </h2>
      <div className="mt-4 space-y-2">
        <p className="text-lg font-medium text-white/85">
          {hasDate ? formatDate(next.date) : "Date to be announced"}
        </p>
        <p className="flex items-center gap-2 text-sm text-white/60">
          <MapPin className="h-4 w-4 shrink-0" aria-hidden />
          {next.location ? next.location : "Location to be announced"}
        </p>
      </div>

      {units.length > 0 ? (
        <div className="mt-10 grid max-w-xl grid-cols-5 gap-2.5 sm:gap-3.5">
          {units.map((u) => (
            <div
              key={u.label}
              className="rounded-[4px] border-t-2 border-accent bg-white/10 px-1 py-4 text-center backdrop-blur"
            >
              <div className="overflow-hidden">
                {/* key by value so it remounts and rolls when the number changes */}
                <span
                  key={u.value}
                  className="digit-roll block font-display text-3xl font-bold tabular-nums text-white sm:text-6xl"
                >
                  {String(u.value).padStart(2, "0")}
                </span>
              </div>
              <div className="mt-1.5 font-display text-[10px] font-semibold uppercase tracking-[0.14em] text-white/60 sm:text-xs">
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
