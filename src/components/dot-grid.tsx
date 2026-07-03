"use client";

import { useEffect, useRef } from "react";

/**
 * Interactive dot grid (ReactBits-style) rendered on a canvas. Dots near the
 * pointer grow and brighten. White, low-opacity dots so it stays matte on the
 * deep-navy band. Static (no pointer reaction, no rAF) under reduced-motion.
 * Place inside a `position: relative` parent; it listens on that parent.
 */
export function DotGrid({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = canvas.parentElement ?? canvas;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const gap = 26;
    const baseR = 1.3;
    const influence = 120;
    const mouse = { x: -9999, y: -9999 };
    let dots: { x: number; y: number }[] = [];
    let raf = 0;

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      for (let y = gap; y < rect.height; y += gap) {
        for (let x = gap; x < rect.width; x += gap) {
          dots.push({ x, y });
        }
      }
    };

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      for (const d of dots) {
        let r = baseR;
        let a = 0.16;
        if (!reduce) {
          const dist = Math.hypot(d.x - mouse.x, d.y - mouse.y);
          const t = Math.max(0, 1 - dist / influence);
          r = baseR + t * 2;
          a = 0.16 + t * 0.5;
        }
        ctx.beginPath();
        ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.fill();
      }
      if (!reduce) raf = requestAnimationFrame(render);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    build();
    render();

    const ro = new ResizeObserver(() => {
      build();
      if (reduce) render();
    });
    ro.observe(canvas);
    target.addEventListener("pointermove", onMove);
    target.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      target.removeEventListener("pointermove", onMove);
      target.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
