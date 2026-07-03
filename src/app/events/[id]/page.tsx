import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  PageHeader,
  Section,
  Container,
  Card,
  Badge,
} from "@/components/ui";
import { events, participationOf, type TsaEvent } from "@/data/events";

type Props = { params: Promise<{ id: string }> };

/** Tag label for an event, e.g. "Individual", "Team (2-6)", "Team (6)". */
function participationTag(e: TsaEvent): string {
  if (participationOf(e) === "individual") return "Individual";
  if (e.teamMin === e.teamMax) return `Team (${e.teamMax})`;
  return `Team (${e.teamMin}-${e.teamMax})`;
}

export function generateStaticParams() {
  return events.map((e) => ({ id: e.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const event = events.find((e) => e.id === id);
  if (!event) {
    return {
      title: "Event",
      description: "A Downingtown East TSA competitive event.",
    };
  }
  return {
    title: event.name,
    description: event.blurb,
  };
}

export default async function EventDetailPage({ params }: Props) {
  const { id } = await params;
  const event = events.find((e) => e.id === id);
  if (!event) notFound();

  // Up to 4 other events in the same category, in catalog order.
  const related = events
    .filter((e) => e.category === event.category && e.id !== event.id)
    .slice(0, 4);

  return (
    <>
      <PageHeader title={event.name} eyebrow={event.category} />
      <Section>
        <Container className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="border-border text-muted-foreground">
              {participationTag(event)}
            </Badge>
            <Badge className="border-border text-muted-foreground">
              {event.scope === "national" ? "National" : "Pennsylvania-only"}
            </Badge>
          </div>

          <p className="mt-6 text-lg text-foreground">{event.blurb}</p>

          <p className="mt-4 text-sm text-muted-foreground">
            This is a short summary. Always check the official TSA rules for the
            full event requirements before you compete.
          </p>

          {related.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-bold tracking-tight">
                More in {event.category}
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {related.map((r) => (
                  <Link key={r.id} href={`/events/${r.id}`} className="group">
                    <Card className="flex h-full flex-col p-5 transition-shadow duration-200 hover:shadow-soft-lg">
                      <h3 className="font-semibold group-hover:text-accent">
                        {r.name}
                      </h3>
                      <p className="mt-1.5 flex-1 text-sm text-muted-foreground">
                        {r.blurb}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                        View event
                        <ArrowRight
                          className="h-4 w-4 transition-transform group-hover:translate-x-1"
                          aria-hidden
                        />
                      </span>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-10 border-t pt-6">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent hover:underline"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Back to all events
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
