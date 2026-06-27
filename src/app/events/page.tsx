import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import { PageHeader, Section, Container, Card, ButtonLink } from "@/components/ui";
import { EventBrowser } from "@/components/event-browser";
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
      <PageHeader
        title="Events"
        subtitle="Browse the chapter's 40+ competitive events, from design and engineering to media and academics, and find the one that fits you."
      />
      <Section>
        <Container>
          {/* Find your event callout */}
          <Card className="mb-10 flex flex-col items-start justify-between gap-5 bg-muted/50 p-6 sm:flex-row sm:items-center">
            <div className="flex items-start gap-3">
              <span
                className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-base)] bg-primary/10 text-primary"
                aria-hidden
              >
                <Sparkles className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-semibold">Find your event</h2>
                <p className="text-sm text-muted-foreground">
                  Not sure where to start? Take the quiz to see which events match your interests.
                </p>
              </div>
            </div>
            <ButtonLink
              variant="accent"
              href={site.quizUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0"
            >
              Take the Quiz
            </ButtonLink>
          </Card>

          <EventBrowser events={events} />
        </Container>
      </Section>
    </>
  );
}
