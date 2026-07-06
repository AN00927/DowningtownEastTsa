import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container, Eyebrow, Section } from "@/components/ui";
import { EventBrowser } from "@/components/event-browser";
import { DotGrid } from "@/components/dot-grid";
import { events } from "@/data/events";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Browse Downingtown East TSA's 40+ national and Pennsylvania-only competitive events. Search and filter by category and participation type.",
};

export default function EventsPage() {
  return (
    <>
      {/* Header band with integrated quiz callout */}
      <section className="relative isolate overflow-hidden bg-deep-navy text-white">
        <DotGrid className="pointer-events-none absolute inset-0 -z-10 h-full w-full" />
        <Container className="py-16 sm:py-20">
          <div className="max-w-2xl">
            <Eyebrow tone="light">Competitive Events</Eyebrow>
            <h1 className="mt-3 text-5xl font-bold text-white sm:text-6xl">
              Find your event
            </h1>
            <p className="mt-4 text-lg text-white/75">
              Browse the chapter&apos;s {events.length} competitive events, from
              design and engineering to media and academics, and find the one
              that fits you.
            </p>
          </div>

          {/* Quiz callout */}
          <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-[6px] border border-white/15 border-l-4 border-l-accent bg-white/10 p-5 backdrop-blur sm:flex-row sm:items-center">
            <div className="flex items-start gap-3">
              <span
                className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[4px] bg-accent text-white"
                aria-hidden
              >
                <Sparkles className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-display text-xl font-bold text-white">
                  Not sure where to start?
                </h2>
                <p className="text-sm text-white/70">
                  Take the quiz to see which events match your interests.
                </p>
              </div>
            </div>
            <Link
              href={site.quizUrl}
              className="inline-flex h-11 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-[4px] bg-accent px-6 font-display text-[15px] font-bold uppercase tracking-[0.08em] text-accent-foreground shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-hover"
            >
              Take the Quiz <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </Container>
      </section>

      {/* Browser: search, filters, and both event grids. Wider container so
          the cards get room to breathe. */}
      <Section className="!pt-10 sm:!pt-12">
        <Container className="!max-w-7xl">
          <EventBrowser events={events} />
        </Container>
      </Section>
    </>
  );
}
