"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

// Motion contract: open 300ms, close 255ms (0.85x open), both on the same
// easing curve. Under prefers-reduced-motion both drop to 0 and the panel
// simply appears.
const OPEN_MS = 300;
const CLOSE_MS = 255;
const EASE = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Phone navigation drawer. Below `md` the header shows a menu button instead
 * of the full link row, which used to wrap onto two lines. Slides in from the
 * right as a modal dialog: focus is trapped inside, background scroll is
 * locked, Escape and the backdrop both close it, and focus returns to the
 * button afterwards.
 *
 * Hidden entirely from `md` up, where the normal link row takes over.
 */
export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

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
  // header, so without this the drawer would stay open over the new page.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close if the viewport grows past the breakpoint while open. The drawer is
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
      const items =
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE);
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

  return (
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

      {/* Backdrop. Kept mounted so it can fade both ways. */}
      <div
        onClick={close}
        aria-hidden
        className={cn(
          "fixed inset-0 z-[60] bg-deep-navy/60",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        style={{ transition: reducedMotion ? "none" : `opacity ${duration}ms ease-out` }}
      />

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
        className="fixed inset-y-0 right-0 z-[70] flex w-[min(320px,85vw)] flex-col overflow-y-auto bg-deep-navy text-white shadow-soft-lg"
        style={{
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: reducedMotion ? "none" : `transform ${transition}`,
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
          <span className="font-display text-sm font-bold uppercase tracking-[0.12em] text-white/60">
            Menu
          </span>
          <button
            type="button"
            onClick={close}
            aria-label="Close menu"
            className="inline-flex size-11 cursor-pointer items-center justify-center rounded-[4px] text-white transition-colors hover:bg-white/10 active:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <X className="size-6" aria-hidden />
          </button>
        </div>

        <ul className="flex flex-col px-3 py-4">
          {site.nav.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex min-h-12 items-center gap-3 rounded-[4px] px-3 font-display text-lg font-bold uppercase tracking-[0.08em] transition-colors",
                    active
                      ? "text-accent"
                      : "text-white/85 hover:bg-white/10 hover:text-white active:bg-white/15",
                  )}
                >
                  {/* Skewed scarlet marker, same motif as the desktop underline. */}
                  <span
                    className={cn(
                      "h-5 w-1 -skew-x-[20deg] bg-accent transition-opacity",
                      active ? "opacity-100" : "opacity-0",
                    )}
                    aria-hidden
                  />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-auto border-t border-white/10 p-5">
          <Link
            href={site.quizUrl}
            className="inline-flex h-12 w-full cursor-pointer items-center justify-center rounded-[4px] bg-accent font-display text-sm font-bold uppercase tracking-[0.08em] text-accent-foreground transition-colors hover:bg-accent-hover active:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Take the Quiz
          </Link>
        </div>
      </div>
    </div>
  );
}
