"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, Facebook, Instagram, Menu, X, Youtube } from "lucide-react";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

// Motion contract: open 300ms, close 255ms (0.85x open), both on the same
// easing curve. Under prefers-reduced-motion both drop to 0 and the panel
// simply appears.
const OPEN_MS = 300;
const CLOSE_MS = 255;
const EASE = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";

const SOCIALS = [
  { href: site.socials.facebook, label: "Facebook", Icon: Facebook },
  { href: site.socials.instagram, label: "Instagram", Icon: Instagram },
  { href: site.socials.youtube, label: "YouTube", Icon: Youtube },
];

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Phone navigation. Below `md` the header shows a menu button instead of the
 * full link row, which used to wrap onto two lines. Opens as a full-screen
 * modal dialog: focus is trapped inside, background scroll is locked, Escape
 * and the close button both dismiss it, and focus returns to the menu button
 * afterwards.
 *
 * Full-bleed rather than a side panel, so it reads as a screen of its own
 * instead of a box floating over the page.
 *
 * The panel is portaled to document.body on purpose. The header it lives in
 * carries `backdrop-blur`, and any element with a backdrop-filter becomes the
 * containing block for its position:fixed descendants. Rendered in place, the
 * panel sized itself to the header instead of the viewport, which read as a
 * small scrollable box hanging off the menu button.
 */
export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  // The portal target only exists in the browser.
  useEffect(() => setMounted(true), []);

  // Read once on mount rather than during render: matchMedia does not exist
  // while prerendering, and reading it in useState would break hydration.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Close on route change. Clicking a link navigates without unmounting the
  // header, so without this the menu would stay open over the new page.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close if the viewport grows past the breakpoint while open. The menu is
  // display:none from md up, so rotating a phone to landscape would otherwise
  // hide it with the page still scroll-locked.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Lock background scroll. Position-fixed rather than overflow-hidden because
  // iOS Safari scrolls the body behind an overflow-hidden overlay anyway.
  useEffect(() => {
    if (!open) return;
    const y = window.scrollY;
    const { body } = document;
    body.style.position = "fixed";
    body.style.top = `-${y}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";
    return () => {
      body.style.position = "";
      body.style.top = "";
      body.style.width = "";
      body.style.overflow = "";
      window.scrollTo(0, y);
    };
  }, [open]);

  // Escape to close, and keep Tab inside the panel while it is open.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const items = panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  // Move focus into the panel on open, and back to the button on close.
  useEffect(() => {
    if (open) {
      panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    } else {
      // Only steal focus back if it is still sitting inside the closed panel,
      // so a click elsewhere on the page is not yanked to the menu button.
      if (panelRef.current?.contains(document.activeElement)) {
        triggerRef.current?.focus();
      }
    }
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const duration = reducedMotion ? 0 : open ? OPEN_MS : CLOSE_MS;
  const transition = reducedMotion ? "none" : `${duration}ms ${EASE}`;

  // Portaled to body so the panel is not trapped by the header's
  // backdrop-filter containing block. It covers the viewport, so there is no
  // separate backdrop to dim.
  const drawer = (
    <div className="md:hidden">
      <div
        id="mobile-nav"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        // Off-screen but still displayed while closed, so its links would stay
        // tabbable. inert takes them out of the tab order and the a11y tree
        // without unmounting, which would kill the slide-out animation.
        inert={!open}
        className="fixed inset-0 z-[70] flex h-dvh w-screen flex-col overflow-hidden bg-deep-navy text-white"
        style={{
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: reducedMotion ? "none" : `transform ${transition}`,
        }}
      >
        {/* Same textures as the hero and closing bands, so the menu reads as
            part of the site rather than a generic system sheet.

            All of it lives in its own clipping layer. The bloom is deliberately
            positioned past the panel edge, and left loose it would extend the
            panel's scroll height, letting a touch drag pull the whole menu up
            to reveal dead space below it. */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden
        >
          <div className="stripes-accent absolute inset-x-0 top-0 h-2" />
          <div className="dots-pattern absolute inset-0 opacity-40" />
          <div className="grain" />
          {/* Scarlet bloom so the field does not read as flat navy. */}
          <div className="absolute -bottom-24 -left-24 size-72 rounded-full bg-accent opacity-20 blur-[90px]" />
        </div>

        <div
          className="relative flex items-center justify-between px-6 pb-4"
          style={{ paddingTop: "max(1.75rem, env(safe-area-inset-top))" }}
        >
          <span className="font-display text-sm font-bold uppercase tracking-[0.14em] text-white/55">
            Downingtown East TSA
          </span>
          <button
            type="button"
            onClick={close}
            aria-label="Close menu"
            className="-mr-2 inline-flex size-11 cursor-pointer items-center justify-center rounded-[4px] text-white transition-colors hover:bg-white/10 active:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <X className="size-7" aria-hidden />
          </button>
        </div>

        <nav aria-label="Menu" className="relative flex flex-1 items-center">
          <ul className="flex w-full flex-col gap-1 px-6">
            {site.nav.map((item, index) => {
              const active = isActive(item.href);
              return (
                <li
                  key={item.href}
                  // Staggered entrance, settling just after the panel lands.
                  // This is what makes it feel considered rather than abrupt.
                  style={{
                    opacity: open || reducedMotion ? 1 : 0,
                    transform:
                      open || reducedMotion
                        ? "translateX(0)"
                        : "translateX(28px)",
                    transition: reducedMotion
                      ? "none"
                      : `opacity 260ms ease-out ${140 + index * 60}ms, transform 360ms ${EASE} ${140 + index * 60}ms`,
                  }}
                >
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-baseline gap-4 rounded-[4px] py-3 transition-colors",
                      active ? "text-accent" : "text-white hover:text-accent",
                    )}
                  >
                    <span
                      className={cn(
                        "font-display text-xs font-bold tabular-nums tracking-[0.2em] transition-colors",
                        active ? "text-accent" : "text-white/35",
                      )}
                      aria-hidden
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-[2.25rem] font-bold uppercase leading-[1.05] tracking-[0.04em]">
                      {item.label}
                    </span>
                    {active && (
                      <span
                        className="ml-1 h-2.5 w-2.5 -skew-x-[20deg] self-center bg-accent"
                        aria-hidden
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div
          className="relative border-t border-white/10 px-6 pt-5"
          style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
        >
          <Link
            href={site.quizUrl}
            className="inline-flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-[4px] bg-accent font-display text-base font-bold uppercase tracking-[0.1em] text-accent-foreground shadow-soft transition-colors hover:bg-accent-hover active:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Take the Quiz
            <ArrowRight className="size-5" aria-hidden />
          </Link>

          <ul className="mt-4 flex items-center justify-center gap-2">
            {SOCIALS.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex size-11 items-center justify-center rounded-[4px] text-white/55 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <Icon className="size-5" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="md:hidden">
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-controls="mobile-nav"
          aria-expanded={open}
          className="inline-flex size-11 cursor-pointer items-center justify-center rounded-[4px] text-primary transition-colors hover:bg-muted active:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <Menu className="size-6" aria-hidden />
        </button>
      </div>
      {mounted && createPortal(drawer, document.body)}
    </>
  );
}
