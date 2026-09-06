# Implementation Code Reference
## React / Next.js / Tailwind versions of every pattern

---

## Floating Island Navbar (React)

```jsx
'use client';
import { useEffect, useState } from 'react';

export function FloatingNav({ links }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav className={`
      fixed top-5 left-1/2 -translate-x-1/2 z-50
      flex items-center gap-8 px-6 py-3
      rounded-full border transition-all duration-500
      ${scrolled 
        ? 'bg-white/90 backdrop-blur-xl border-black/10 shadow-lg' 
        : 'bg-white/10 backdrop-blur-md border-white/15'
      }
    `}>
      <Logo />
      <div className="flex items-center gap-6">
        {links.map(link => <NavLink key={link.href} {...link} />)}
      </div>
      <Button>Get Started</Button>
    </nav>
  );
}
```

---

## Marquee (React)

```jsx
export function Marquee({ items, speed = 25, reverse = false }) {
  return (
    <div className="overflow-hidden flex">
      {[0, 1].map(i => (
        <div
          key={i}
          aria-hidden={i === 1}
          className="flex items-center gap-12 flex-shrink-0 whitespace-nowrap"
          style={{
            animation: `marquee ${speed}s linear infinite ${reverse ? 'reverse' : ''}`,
          }}
        >
          {items.map((item, j) => (
            <span key={j} className="text-sm font-medium tracking-widest uppercase text-neutral-400">
              {item}
            </span>
          ))}
        </div>
      ))}
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
}
```

---

## Intersection Observer Fade-Up (React Hook)

```jsx
import { useEffect, useRef, useState } from 'react';

export function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(el); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

// Usage:
export function RevealSection({ children, delay = 0 }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      {children}
    </div>
  );
}
```

---

## Tilt Card (React)

```jsx
import { useRef } from 'react';

export function TiltCard({ children }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale(1.02)`;
    card.style.transition = 'none';
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    card.style.transform = 'perspective(800px) rotateY(0) rotateX(0) scale(1)';
    card.style.transition = 'transform 0.5s ease';
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="rounded-2xl overflow-hidden cursor-pointer"
    >
      {children}
    </div>
  );
}
```

---

## Full-Screen Menu (React)

```jsx
import { useState } from 'react';

const menuLinks = ['Work', 'About', 'Services', 'Contact'];

export function FullScreenMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(!open)} className="relative z-[10000] w-8 h-6 flex flex-col justify-between">
        <span className={`block h-0.5 bg-current transition-all duration-500 ${open ? 'rotate-45 translate-y-3' : ''}`} />
        <span className={`block h-0.5 bg-current transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
        <span className={`block h-0.5 bg-current transition-all duration-500 ${open ? '-rotate-45 -translate-y-3' : ''}`} />
      </button>

      <div
        className="fixed inset-0 bg-zinc-950 z-[9999] flex flex-col justify-center p-16 transition-all duration-700"
        style={{
          clipPath: open ? 'circle(150% at calc(100% - 3rem) 3rem)' : 'circle(0% at calc(100% - 3rem) 3rem)',
        }}
      >
        <nav className="flex flex-col gap-2">
          {menuLinks.map((link, i) => (
            <a
              key={link}
              href="#"
              className="block overflow-hidden"
              style={{ transitionDelay: open ? `${i * 80}ms` : '0ms' }}
            >
              <span
                className={`block text-white font-bold tracking-tight transition-transform duration-500
                  ${open ? 'translate-y-0' : 'translate-y-full'}
                `}
                style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
              >
                {link}
              </span>
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
```

---

## Bento Grid (React + Tailwind)

```jsx
const features = [
  { title: 'AI Insights', desc: 'Real-time analysis', size: 'large', icon: '🤖' },
  { title: 'Security', desc: 'SOC2 ready', size: 'normal', icon: '🔒' },
  { title: 'Integrations', desc: '200+ apps', size: 'normal', icon: '🔌' },
  { title: 'Analytics', desc: 'Deep data', size: 'tall', icon: '📊' },
  { title: 'API', desc: 'Full access', size: 'normal', icon: '⚡' },
];

export function BentoGrid() {
  return (
    <div className="grid grid-cols-3 auto-rows-[200px] gap-3">
      {features.map((f) => (
        <div
          key={f.title}
          className={`
            rounded-2xl p-6 border border-black/5 bg-neutral-50
            flex flex-col justify-between overflow-hidden group
            hover:border-black/10 transition-colors
            ${f.size === 'large' ? 'col-span-2' : ''}
            ${f.size === 'tall' ? 'row-span-2' : ''}
          `}
        >
          <span className="text-3xl">{f.icon}</span>
          <div>
            <h3 className="font-semibold text-lg">{f.title}</h3>
            <p className="text-sm text-neutral-500">{f.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
```

---

## Glassmorphism Card (Tailwind)

```jsx
// Dark bg required behind this
<div className="
  bg-white/5 backdrop-blur-2xl saturate-150
  border border-white/10
  rounded-2xl
  shadow-[0_8px_32px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.1)]
  p-6
">
  {/* content */}
</div>
```

---

## Stat Counter (React Hook)

```jsx
import { useEffect, useRef, useState } from 'react';

function useCounter(target, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const step = target / (duration / 16);
        const tick = () => {
          start = Math.min(start + step, target);
          setCount(Math.floor(start));
          if (start < target) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        observer.unobserve(el);
      }
    }, { threshold: 0.5 });
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { ref, count };
}

export function StatBlock({ number, suffix = '', label }) {
  const { ref, count } = useCounter(number);
  return (
    <div ref={ref} className="text-center">
      <div className="text-6xl font-black tracking-tight">{count.toLocaleString()}{suffix}</div>
      <div className="text-sm text-neutral-500 mt-1 uppercase tracking-wider">{label}</div>
    </div>
  );
}
```

---

## Custom Cursor (React)

```jsx
'use client';
import { useEffect, useRef } from 'react';

export function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0;

  useEffect(() => {
    const move = (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = mouseX + 'px';
        dotRef.current.style.top = mouseY + 'px';
      }
    };

    const lerp = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = ringX + 'px';
        ringRef.current.style.top = ringY + 'px';
      }
      requestAnimationFrame(lerp);
    };

    window.addEventListener('mousemove', move);
    const raf = requestAnimationFrame(lerp);

    const grow = () => { if (ringRef.current) { ringRef.current.style.width = '64px'; ringRef.current.style.height = '64px'; } };
    const shrink = () => { if (ringRef.current) { ringRef.current.style.width = '40px'; ringRef.current.style.height = '40px'; } };
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', grow);
      el.addEventListener('mouseleave', shrink);
    });

    return () => {
      window.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="fixed w-2 h-2 bg-black rounded-full pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2" />
      <div ref={ringRef} className="fixed w-10 h-10 border border-black/40 rounded-full pointer-events-none z-[99998] -translate-x-1/2 -translate-y-1/2 transition-[width,height] duration-300" />
    </>
  );
}
```

---

## Scroll Progress Bar (React)

```jsx
'use client';
import { useEffect, useState } from 'react';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      setProgress(scrollTop / (scrollHeight - clientHeight));
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-violet-500 to-fuchsia-500 z-[9999] origin-left"
      style={{ transform: `scaleX(${progress})` }}
    />
  );
}
```

---

## Noise Texture Overlay

Add to any section for that subtle depth:
```jsx
// Add this as a pseudo-element OR as an absolute-positioned div
<div
  className="absolute inset-0 pointer-events-none z-10 opacity-30 mix-blend-overlay"
  style={{
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'repeat',
    backgroundSize: '200px',
  }}
/>
```

---

## Gradient Border Card

```jsx
<div className="relative p-px rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500">
  <div className="bg-zinc-950 rounded-[calc(1rem-1px)] p-6 h-full">
    {/* content */}
  </div>
</div>
```

---

## Typography Scale (globals.css)

```css
/* Add to globals.css */
:root {
  --font-display: 'Plus Jakarta Sans', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
}

h1 { font-size: clamp(2.5rem, 6vw, 6rem); font-weight: 800; letter-spacing: -0.04em; line-height: 0.95; }
h2 { font-size: clamp(1.75rem, 3.5vw, 3.5rem); font-weight: 700; letter-spacing: -0.03em; line-height: 1.1; }
h3 { font-size: clamp(1.25rem, 2vw, 1.75rem); font-weight: 600; letter-spacing: -0.02em; }
p  { font-size: clamp(1rem, 1.15vw, 1.125rem); line-height: 1.7; }
.eyebrow { font-size: 0.75rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; }
```
