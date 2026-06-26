"use client";

import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function diff(targetMs: number): TimeLeft | null {
  const now = Date.now();
  const delta = targetMs - now;
  if (delta <= 0) return null;
  return {
    days: Math.floor(delta / 86_400_000),
    hours: Math.floor((delta / 3_600_000) % 24),
    minutes: Math.floor((delta / 60_000) % 60),
    seconds: Math.floor((delta / 1000) % 60),
  };
}

export function CountdownTimer({
  targetIso,
  name,
}: {
  targetIso: string;
  name: string;
}) {
  const targetMs = targetIso ? new Date(targetIso).getTime() : NaN;
  const [time, setTime] = useState<TimeLeft | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!targetIso || Number.isNaN(targetMs)) return;
    setTime(diff(targetMs));
    const id = setInterval(() => setTime(diff(targetMs)), 1000);
    return () => clearInterval(id);
  }, [targetIso, targetMs]);

  if (!targetIso || Number.isNaN(targetMs)) {
    return (
      <p className="text-lg font-medium text-muted-foreground">
        No current competitions scheduled. Check back soon!
      </p>
    );
  }

  // Pre-mount / passed: avoid hydration mismatch by rendering neutral state.
  if (!mounted) {
    return <p className="text-lg text-muted-foreground">Loading countdown…</p>;
  }

  if (!time) {
    return (
      <p className="text-lg font-semibold text-accent">
        {name} is here — good luck, competitors!
      </p>
    );
  }

  const units: { label: string; value: number }[] = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Minutes", value: time.minutes },
    { label: "Seconds", value: time.seconds },
  ];

  return (
    <div>
      <div className="grid grid-cols-4 gap-3 sm:gap-4">
        {units.map((u) => (
          <div
            key={u.label}
            className="rounded-[var(--radius-base)] border bg-card px-2 py-4 text-center"
          >
            <div className="text-3xl font-bold tabular-nums sm:text-4xl">
              {String(u.value).padStart(2, "0")}
            </div>
            <div className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
              {u.label}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-center text-sm text-muted-foreground">
        until <span className="font-semibold text-foreground">{name}</span>
      </p>
    </div>
  );
}
