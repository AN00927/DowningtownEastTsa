"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  // Subtle scroll-aware elevation. Links stay visible at all sizes.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-background/95 backdrop-blur transition-shadow",
        scrolled ? "border-border shadow-soft" : "border-border/60",
      )}
    >
      {/* Scarlet racing stripe — bookends with the footer. */}
      <div className="h-[3px] bg-accent" aria-hidden />
      <nav
        aria-label="Primary"
        className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3 sm:px-6 lg:px-8"
      >
        {/* Logo. Save the official TSA logo as /public/tsa-logo.png. */}
        <Link
          href="/"
          className="group flex items-center gap-3 font-bold text-primary"
        >
          <Image
            src="/tsa-logo.png"
            alt="Technology Student Association logo"
            width={120}
            height={77}
            className="h-11 w-auto"
            priority
          />
          <span className="hidden font-display text-base font-bold uppercase leading-tight tracking-[0.08em] text-primary sm:block">
            Downingtown East
          </span>
        </Link>

        {/* Links: always visible, wrap on small screens (no hamburger) */}
        <ul className="flex flex-wrap items-center gap-1 sm:gap-2">
            <li className="order-last ml-1 hidden md:block">
              <a
                href={site.quizUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 cursor-pointer items-center justify-center rounded-[4px] bg-accent px-5 font-display text-sm font-bold uppercase tracking-[0.08em] text-accent-foreground shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-hover"
              >
                Take the Quiz
              </a>
            </li>
            {site.nav.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative rounded-[4px] px-3 py-2 font-display text-[15px] font-bold uppercase tracking-[0.08em] transition-colors",
                      "after:absolute after:bottom-1 after:left-3 after:right-3 after:h-[3px] after:origin-left after:-skew-x-[20deg] after:bg-accent after:transition-transform after:duration-300",
                      active
                        ? "text-accent after:scale-x-100"
                        : "text-primary/80 after:scale-x-0 hover:text-primary hover:after:scale-x-100",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
        </ul>
      </nav>
    </header>
  );
}
