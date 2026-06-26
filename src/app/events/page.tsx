import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { PageHeader, Section, Container, Card } from "@/components/ui";
import { EventFilters } from "@/components/event-filters";
import { events } from "@/data/events";

export const metadata: Metadata = {
  title: "Competitive Events",
  description:
    "Browse Downingtown East TSA's national and Pennsylvania-only competitive events. Search and filter by category, level, and team size.",
};

export default function EventsPage() {
  return (
    <>
      <PageHeader
        title="Competitive Events"
        subtitle="Discover your future event!"
      />
      <Section>
        <Container>
          {/* Quiz nudge */}
          <Card className="mb-8 flex flex-col items-start justify-between gap-4 bg-muted/50 p-6 sm:flex-row sm:items-center">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-base)] bg-primary/10 text-primary">
                <Sparkles className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-semibold">Not sure which event to pick?</h2>
                <p className="text-sm text-muted-foreground">
                  Use our quiz to determine which event best suits your interests.
                </p>
              </div>
            </div>
            <Link
              href="/quiz"
              className="shrink-0 font-semibold text-accent hover:underline"
            >
              Take the Quiz
            </Link>
          </Card>

          <EventFilters events={events} />
        </Container>
      </Section>
    </>
  );
}
