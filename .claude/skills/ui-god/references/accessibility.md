# Accessibility Hooks & Utilities
## Production-ready React hooks for every nav accessibility requirement

---

## useFocusTrap — Required for Sidebar & Fullscreen menus

```tsx
// hooks/useFocusTrap.ts
import { useEffect, useRef } from 'react';

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'textarea:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

export function useFocusTrap(isActive: boolean) {
  const containerRef = useRef<HTMLElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive) return;

    // Save the element that had focus before opening
    previouslyFocused.current = document.activeElement as HTMLElement;

    const container = containerRef.current;
    if (!container) return;

    // Focus first focusable element
    const focusableElements = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE));
    if (focusableElements.length) focusableElements[0].focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const elements = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE));
      const first = elements[0];
      const last = elements[elements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // Restore focus to trigger on close
      previouslyFocused.current?.focus();
    };
  }, [isActive]);

  return containerRef;
}

// Usage in Sidebar:
// const ref = useFocusTrap(isOpen);
// <nav ref={ref} role="dialog" aria-modal="true">...</nav>
```

---

## useReducedMotion — Hook for respecting prefers-reduced-motion

```tsx
// hooks/useReducedMotion.ts
import { useEffect, useState } from 'react';

export function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return reducedMotion;
}

// Usage:
// const reducedMotion = useReducedMotion();
// const duration = reducedMotion ? 0 : 300;
// <div style={{ transition: reducedMotion ? 'none' : `transform ${duration}ms cubic-bezier(0.22,1,0.36,1)` }}>
```

---

## useScrollState — Nav scroll behavior hook

```tsx
// hooks/useScrollState.ts
import { useEffect, useState } from 'react';

export function useScrollState(threshold = 80) {
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > threshold);
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [threshold]);

  return { scrolled, scrollY };
}
```

---

## useBodyScrollLock — For modals and drawers

```tsx
// hooks/useBodyScrollLock.ts
import { useEffect } from 'react';

export function useBodyScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (!isLocked) return;
    const scrollY = window.scrollY;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollY);
    };
  }, [isLocked]);
}
```

---

## SkipLink — First element on every page

```tsx
// components/SkipLink.tsx
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="skip-link"
      style={{
        position: 'absolute',
        top: '-100%',
        left: '1rem',
        zIndex: 99999,
        background: '#000',
        color: '#fff',
        padding: '0.5rem 1rem',
        borderRadius: '4px',
        textDecoration: 'none',
        fontWeight: 600,
        transition: 'top 0.2s',
      }}
      onFocus={(e) => { (e.target as HTMLElement).style.top = '1rem'; }}
      onBlur={(e) => { (e.target as HTMLElement).style.top = '-100%'; }}
    >
      Skip to main content
    </a>
  );
}
// Usage: <SkipLink /> as FIRST child of <body>
// Target: <main id="main-content" tabIndex={-1}>
```

---

## NavController — Full keyboard + hover intent nav state machine (React)

```tsx
// components/NavDropdown.tsx
'use client';
import { useRef, useState, useEffect, useCallback } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

export function NavDropdown({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const intentTimer = useRef<ReturnType<typeof setTimeout>>();
  const reducedMotion = useReducedMotion();
  const INTENT_DELAY = 120;

  const openMenu = useCallback(() => setOpen(true), []);
  const closeMenu = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  // Click outside
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!triggerRef.current?.contains(e.target as Node) &&
          !panelRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [open]);

  return (
    <div className="nav-item" style={{ position: 'relative' }}>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="dropdown-panel"
        onPointerOver={() => { intentTimer.current = setTimeout(openMenu, INTENT_DELAY); }}
        onPointerOut={() => clearTimeout(intentTimer.current)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(!open); }
          if (e.key === 'ArrowDown') { e.preventDefault(); openMenu(); }
          if (e.key === 'Escape') closeMenu();
        }}
      >
        {label}
      </button>

      <div
        ref={panelRef}
        id="dropdown-panel"
        role="menu"
        aria-label={label}
        style={{
          position: 'absolute', top: 'calc(100% + 8px)', left: 0,
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'all' : 'none',
          transform: open ? 'translateY(0)' : 'translateY(-8px)',
          transition: reducedMotion ? 'none' : 'opacity 220ms cubic-bezier(0.22,1,0.36,1), transform 220ms cubic-bezier(0.22,1,0.36,1)',
        }}
        onKeyDown={(e) => {
          if (e.key === 'Escape') closeMenu();
          // Arrow key navigation between menu items
          const items = Array.from(panelRef.current?.querySelectorAll('[role="menuitem"]') ?? []) as HTMLElement[];
          const idx = items.indexOf(document.activeElement as HTMLElement);
          if (e.key === 'ArrowDown') { e.preventDefault(); items[(idx + 1) % items.length]?.focus(); }
          if (e.key === 'ArrowUp') { e.preventDefault(); items[(idx - 1 + items.length) % items.length]?.focus(); }
        }}
      >
        {children}
      </div>
    </div>
  );
}
```

---

## Full Sidebar Component (with all accessibility contracts)

```tsx
// components/Sidebar.tsx
'use client';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import { useReducedMotion } from '../hooks/useReducedMotion';

export function Sidebar({ isOpen, onClose, links }: {
  isOpen: boolean;
  onClose: () => void;
  links: { label: string; href: string; children?: { label: string; href: string }[] }[];
}) {
  const containerRef = useFocusTrap(isOpen);
  useBodyScrollLock(isOpen);
  const reducedMotion = useReducedMotion();

  const duration = reducedMotion ? 0 : 300;
  const transition = `transform ${duration}ms cubic-bezier(0.25,0.46,0.45,0.94)`;

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
          opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? 'all' : 'none',
          transition: reducedMotion ? 'none' : 'opacity 240ms ease-out',
          zIndex: 9998,
        }}
      />

      {/* Panel */}
      <nav
        ref={containerRef as React.RefObject<HTMLElement>}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        style={{
          position: 'fixed', top: 0, right: 0,
          width: 'min(380px, 90vw)', height: '100vh',
          background: '#111', color: 'white',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: reducedMotion ? 'none' : transition,
          zIndex: 9999, overflowY: 'auto', padding: '2rem',
        }}
        onKeyDown={(e) => { if (e.key === 'Escape') onClose(); }}
      >
        <button
          onClick={onClose}
          aria-label="Close navigation"
          style={{ marginBottom: '2rem', cursor: 'pointer', background: 'none', border: 'none', color: 'white', fontSize: '1.5rem' }}
        >
          ×
        </button>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {links.map(link => (
            <li key={link.href} style={{ marginBottom: '1rem' }}>
              <a
                href={link.href}
                style={{ color: 'white', textDecoration: 'none', fontSize: '1.25rem', fontWeight: 600, display: 'block', padding: '0.5rem 0', minHeight: '44px' }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
```

---

## Motion Tokens File

```ts
// tokens/motion.ts
// All motion values — import these, never hardcode

export const DURATION = {
  micro:      150,   // hover, focus, icon nudge
  ui:         260,   // dropdown, modal, drawer
  reveal:     700,   // hero, section entrance
  ambient:    3000,  // background loops, shimmer
} as const;

export const EASING = {
  premium:    'cubic-bezier(0.22, 1, 0.36, 1)',    // use for almost everything
  dramatic:   'cubic-bezier(0.77, 0, 0.175, 1)',   // full-screen overlays
  smooth:     'cubic-bezier(0.25, 0.46, 0.45, 0.94)', // subtle UI
  hero:       'cubic-bezier(0.16, 1, 0.3, 1)',     // hero word reveal
} as const;

export const STAGGER = {
  ui:     60,   // ms between list items
  hero:   100,  // ms between hero words
  cards:  80,   // ms between card reveals
} as const;

export const OFFSET = {
  content: 40,   // px translateY for section reveals
  hero:    60,   // px for hero elements
  dropdown: 8,   // px for dropdown panels
} as const;

// Close is always ~85% of open duration
export const closeOf = (openDuration: number) => Math.round(openDuration * 0.85);
```
