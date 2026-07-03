"use client";

import { type ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";

export interface Slide {
  /** Path under /public, or "" to render a labeled placeholder. */
  src: string;
  /** Alt text (required for accessibility) / placeholder caption. */
  alt: string;
}

/**
 * Full-width auto-advancing slideshow with prev/next controls and dot
 * indicators. Pauses on hover/focus, is keyboard navigable (arrow keys), and
 * respects prefers-reduced-motion (no auto-advance).
 */
export function Carousel({
  slides,
  interval = 5000,
  overlay,
  heightClass = "h-[58vh] min-h-[360px] sm:h-[64vh]",
}: {
  slides: Slide[];
  interval?: number;
  /** Optional content floated and centered over the slides (e.g. a banner). */
  overlay?: ReactNode;
  /** Tailwind height classes for the slide area. */
  heightClass?: string;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;

  const go = useCallback(
    (next: number) => setIndex((next + count) % count),
    [count],
  );

  // Auto-advance, paused on hover/focus or reduced-motion.
  const reduceRef = useRef(false);
  useEffect(() => {
    reduceRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  useEffect(() => {
    if (paused || reduceRef.current || count <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), interval);
    return () => clearInterval(id);
  }, [paused, count, interval]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(index - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      go(index + 1);
    }
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Chapter photo slideshow"
      className="relative w-full overflow-hidden bg-deep-navy"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={onKeyDown}
    >
      {/* Slides */}
      <div className={`relative w-full ${heightClass}`}>
        {slides.map((slide, i) => {
          const active = i === index;
          return (
            <div
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={!active}
              className={[
                "absolute inset-0 flex items-center justify-center transition-opacity duration-700",
                active ? "opacity-100" : "pointer-events-none opacity-0",
                i % 2 === 0 ? "bg-[#1b2c47]" : "bg-[#16243c]",
              ].join(" ")}
            >
              {slide.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center gap-3 text-white/55">
                  <ImageIcon className="h-10 w-10" aria-hidden />
                  <span className="text-sm font-medium">{slide.alt}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Floating overlay (e.g. welcome banner) */}
      {overlay ? (
        <>
          <div
            className="pointer-events-none absolute inset-0 bg-deep-navy/25"
            aria-hidden
          />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-4">
            {overlay}
          </div>
        </>
      ) : null}

      {/* Prev / Next */}
      <button
        type="button"
        onClick={() => go(index - 1)}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-deep-navy/60 text-white backdrop-blur transition-colors hover:bg-deep-navy/80 sm:left-5"
      >
        <ChevronLeft className="h-5 w-5" aria-hidden />
      </button>
      <button
        type="button"
        onClick={() => go(index + 1)}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-deep-navy/60 text-white backdrop-blur transition-colors hover:bg-deep-navy/80 sm:right-5"
      >
        <ChevronRight className="h-5 w-5" aria-hidden />
      </button>

      {/* Dots */}
      <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2.5">
        {slides.map((_, i) => {
          const active = i === index;
          return (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={active ? "true" : undefined}
              className={[
                "h-2.5 rounded-full transition-all",
                active ? "w-7 bg-white" : "w-2.5 bg-white/45 hover:bg-white/70",
              ].join(" ")}
            />
          );
        })}
      </div>
    </section>
  );
}
