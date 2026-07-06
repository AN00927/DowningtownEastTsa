// ---------------------------------------------------------------------------
// Shared UI primitives. Reuse these everywhere for a consistent look.
// All are server-safe (no "use client") unless noted.
// ---------------------------------------------------------------------------
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Centered max-width wrapper with responsive horizontal padding. */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}

/** Vertical section spacing wrapper. */
export function Section({
  className,
  children,
  id,
}: {
  className?: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-16 sm:py-20 lg:py-24", className)}>
      {children}
    </section>
  );
}

/**
 * Condensed uppercase eyebrow with a skewed scarlet bar — the design system's
 * signature label. Use tone="light" on dark navy bands.
 */
export function Eyebrow({
  children,
  tone = "accent",
}: {
  children: ReactNode;
  tone?: "accent" | "light";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 font-display text-sm font-bold uppercase tracking-[0.22em]",
        tone === "accent" ? "text-accent" : "text-white/90",
      )}
    >
      <span className="h-[3px] w-8 -skew-x-[20deg] bg-accent" aria-hidden />
      {children}
    </span>
  );
}

/** Section heading with optional eyebrow + subtitle, centered or left. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
  titleClassName,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
  titleClassName?: string;
}) {
  return (
    <div
      className={cn(
        "mb-12 max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <div className={cn("mb-3", align === "center" && "flex justify-center")}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
      )}
      <h2 className={cn("text-4xl font-bold sm:text-5xl", titleClassName)}>
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base text-muted-foreground sm:text-lg">{subtitle}</p>
      )}
    </div>
  );
}

/** Top-of-page header band used by interior pages: dark navy, angled cut. */
export function PageHeader({
  title,
  subtitle,
  eyebrow,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
}) {
  return (
    <div className="band-angle-b relative isolate overflow-hidden bg-deep-navy text-white">
      <Container className="pb-24 pt-16 sm:pb-28 sm:pt-20">
        {eyebrow && (
          <div className="mb-4">
            <Eyebrow tone="light">{eyebrow}</Eyebrow>
          </div>
        )}
        <h1 className="text-5xl font-bold text-white sm:text-6xl">{title}</h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-lg text-white/75">{subtitle}</p>
        )}
      </Container>
    </div>
  );
}

/** Card container: white block, sharp corners, hairline border. */
export function Card({
  className,
  children,
  id,
}: {
  className?: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <div
      id={id}
      className={cn(
        "rounded-[var(--radius-base)] border bg-card text-card-foreground shadow-soft scroll-mt-24",
        className,
      )}
    >
      {children}
    </div>
  );
}

type ButtonVariant = "primary" | "accent" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const buttonBase =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-[4px] font-display font-bold uppercase tracking-[0.08em] transition-all duration-200 focus-visible:outline-2 disabled:pointer-events-none disabled:opacity-50";

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground shadow-soft hover:-translate-y-0.5 hover:bg-navy-800 hover:shadow-soft-lg",
  accent:
    "bg-accent text-accent-foreground shadow-soft hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-soft-lg",
  outline: "border border-border bg-card hover:border-accent hover:text-accent",
  ghost: "bg-transparent hover:bg-muted",
};

const buttonSizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-[15px]",
  lg: "h-13 px-8 text-base",
};

export function buttonClass(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string,
) {
  return cn(buttonBase, buttonVariants[variant], buttonSizes[size], className);
}

/** Anchor styled as a button. */
export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ComponentProps<typeof Link> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  return <Link className={buttonClass(variant, size, className)} {...props} />;
}

/** Small block tag/label. */
export function Badge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[3px] border px-2.5 py-0.5 font-display text-xs font-bold uppercase tracking-[0.06em]",
        className,
      )}
    >
      {children}
    </span>
  );
}
