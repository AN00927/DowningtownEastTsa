import type { Metadata } from "next";
import { ExternalLink, Sparkles } from "lucide-react";
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
            <Eyebrow>Competitive Events</Eyebrow>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Find your event
            </h1>
            <p className="mt-4 text-lg text-white/75">
              Browse the chapter&apos;s {events.length} competitive events, from
              design and engineering to media and academics, and find the one
              that fits you.
            </p>
          </div>

          {/* Quiz callout */}
          <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-xl border border-white/15 bg-white/10 p-5 backdrop-blur sm:flex-row sm:items-center">
            <div className="flex items-start gap-3">
              <span
                className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white"
                aria-hidden
              >
                <Sparkles className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-semibold text-white">
                  Not sure where to start?
                </h2>
                <p className="text-sm text-white/70">
                  Take the quiz to see which events match your interests.
                </p>
              </div>
            </div>
            <a
              href={site.quizUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-md bg-accent px-6 text-sm font-semibold text-accent-foreground shadow-soft transition-colors hover:bg-accent-hover"
            >
              Take the Quiz <ExternalLink className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </Container>
      </section>

      {/* Browser: search, filters, and both event grids */}
      <Section className="!pt-10 sm:!pt-12">
        <Container>
          <EventBrowser events={events} />
        </Container>
      </Section>
    </>
  );
}
