"use client";

import { useEffect, useState } from "react";

/**
 * Thin scarlet bar pinned to the very top of the viewport that fills as the
 * page scrolls — lightweight scroll-position feedback. Uses a scaleX transform
 * (compositor-only) so it stays cheap, and carries no transition so it tracks
 * the scroll exactly rather than animating (also fine under reduced-motion).
 */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const root = document.documentElement;
    const update = () => {
      const max = root.scrollHeight - root.clientHeight;
      setProgress(max > 0 ? root.scrollTop / max : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-1.5"
      aria-hidden
    >
      <div
        className="h-full origin-left bg-accent shadow-[0_0_10px_2px_var(--scarlet)]"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
