import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  PageHeader,
  Section,
  Container,
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
