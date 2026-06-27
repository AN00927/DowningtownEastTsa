"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const ZERO: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

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

function secsToTime(total: number): TimeLeft {
  return {
    days: Math.floor(total / 86_400),
    hours: Math.floor((total / 3_600) % 24),
    minutes: Math.floor((total / 60) % 60),
    seconds: Math.floor(total % 60),
  };
}

export function CountdownTimer({
  targetIso,
  name,
  onDark = false,
  compact = false,
  animateIn = false,
}: {
  targetIso: string;
  name: string;
  /** Use light text + translucent tiles for placement on a dark hero. */
  onDark?: boolean;
  /** Smaller tiles, no trailing "until name" line (for multi-timer grids). */
  compact?: boolean;
  /** Count up from 0 to the value when it first scrolls into view. */
  animateIn?: boolean;
}) {
  const targetMs = targetIso ? new Date(targetIso).getTime() : NaN;
  const [time, setTime] = useState<TimeLeft | null>(null);
  const [display, setDisplay] = useState<TimeLeft | null>(null);
  const [mounted, setMounted] = useState(false);
  const [inView, setInView] = useState(false);

  const introStarted = useRef(false);
  const introDone = useRef(false);

  // Live ticking.
  useEffect(() => {
    setMounted(true);
    if (!targetIso || Number.isNaN(targetMs)) return;
    setTime(diff(targetMs));
    const id = setInterval(() => setTime(diff(targetMs)), 1000);
    return () => clearInterval(id);
  }, [targetIso, targetMs]);

  // Observe visibility so the count-up triggers when reached.
  const observe = useCallback(
    (node: HTMLDivElement | null) => {
      if (!animateIn) return;
      if (!node) return;
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        },
        { threshold: 0.35 },
      );
      io.observe(node);
    },
    [animateIn],
  );

  // Count-up intro: tween 0 -> value once, when in view.
  useEffect(() => {
    if (!animateIn || !time || !inView || introStarted.current) return;
    introStarted.current = true;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      introDone.current = true;
      setDisplay(time);
      return;
    }

    const target = time;
    const total =
      target.days * 86_400 +
      target.hours * 3_600 +
      target.minutes * 60 +
      target.seconds;
    const duration = 1300;
    let start = 0;
    const frame = (now: number) => {
      if (!start) start = now;
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(secsToTime(Math.round(eased * total)));
      if (p < 1) {
        requestAnimationFrame(frame);
      } else {
        introDone.current = true;
        setDisplay(target);
      }
    };
    requestAnimationFrame(frame);
  }, [animateIn, time, inView]);

  // Keep display synced to live time (except while the intro is running).
  useEffect(() => {
    if (!time) return;
    if (!animateIn || introDone.current) setDisplay(time);
  }, [time, animateIn]);

  const subtle = onDark ? "text-white/70" : "text-muted-foreground";

  if (!targetIso || Number.isNaN(targetMs)) {
    return (
      <p className={cn("text-lg font-medium", subtle)}>
        No upcoming competition. Stay tuned!
      </p>
    );
  }

  if (!mounted) {
    return <p className={cn("text-lg", subtle)}>Loading countdown...</p>;
  }

  if (!time) {
    return (
      <p
        className={cn(
          "text-lg font-semibold",
          onDark ? "text-white" : "text-accent",
        )}
      >
        {name} is here. Good luck, competitors!
      </p>
    );
  }

  const shown = display ?? (animateIn ? ZERO : time);
  const units: { label: string; value: number }[] = [
    { label: "Days", value: shown.days },
    { label: "Hours", value: shown.hours },
    { label: "Minutes", value: shown.minutes },
    { label: "Seconds", value: shown.seconds },
  ];

  return (
    <div ref={observe}>
      <div className={cn("grid grid-cols-4", compact ? "gap-2" : "gap-3 sm:gap-4")}>
        {units.map((u) => (
          <div
            key={u.label}
            className={cn(
              "rounded-[var(--radius-base)] border text-center",
              compact ? "px-1 py-3" : "px-2 py-5",
              onDark
                ? "border-white/15 bg-white/10 text-white backdrop-blur"
                : "bg-card text-foreground shadow-soft",
            )}
          >
            <div
              className={cn(
                "font-bold tabular-nums",
                compact ? "text-2xl sm:text-3xl" : "text-4xl sm:text-5xl",
              )}
            >
              {String(u.value).padStart(2, "0")}
            </div>
            <div
              className={cn(
                "mt-1 uppercase tracking-wide",
                compact ? "text-[10px]" : "text-xs",
                subtle,
              )}
            >
              {u.label}
            </div>
          </div>
        ))}
      </div>
      {!compact && (
        <p className={cn("mt-5 text-center text-sm", subtle)}>
          until{" "}
          <span
            className={cn("font-semibold", onDark ? "text-white" : "text-foreground")}
          >
            {name}
          </span>
        </p>
      )}
    </div>
  );
}
