import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Flag,
  LifeBuoy,
  Tag,
  Users,
} from "lucide-react";
import {
  ButtonLink,
  PageHeader,
  Section,
  Container,
  Card,
} from "@/components/ui";
import {
  events,
  teamSizeLabel,
  type TsaEvent,
} from "@/data/events";

type Props = { params: Promise<{ id: string }> };

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

/** The official site that publishes this event's rules. */
function officialSite(event: TsaEvent): { label: string; href: string } {
  return event.scope === "pa"
    ? { label: "PA TSA site", href: "https://patsa.org" }
    : { label: "National TSA site", href: "https://tsaweb.org" };
}

export default async function EventDetailPage({ params }: Props) {
  const { id } = await params;
  const event = events.find((e) => e.id === id);
  if (!event) notFound();

  const facts = [
    { Icon: Tag, label: "Category", value: event.category },
    { Icon: Users, label: "Participation", value: teamSizeLabel(event) },
    {
      Icon: Flag,
      label: "Level",
      value: event.scope === "national" ? "National" : "Pennsylvania-only",
    },
  ];

  const rules = officialSite(event);

  // Up to 4 other events in the same category, in catalog order.
  const related = events
    .filter((e) => e.category === event.category && e.id !== event.id)
    .slice(0, 4);

  return (
    <>
      <PageHeader title={event.name} eyebrow={event.category} />
      <Section className="!pt-10 sm:!pt-12">
        <Container className="max-w-3xl">
          {/* At a glance */}
          <dl className="grid gap-4 sm:grid-cols-3">
            {facts.map(({ Icon, label, value }) => (
              <div
                key={label}
                className="rounded-[var(--radius-base)] border border-l-4 border-l-accent bg-card p-4 shadow-soft"
              >
                <dt className="flex items-center gap-2 font-display text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                  <Icon className="h-4 w-4 text-accent" aria-hidden />
                  {label}
                </dt>
                <dd className="mt-1.5 font-display text-lg font-bold text-primary">
                  {value}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-8 text-lg text-foreground">{event.blurb}</p>

          <p className="mt-4 text-sm text-muted-foreground">
            This is a short summary. Always check the official TSA rules for the
            full event requirements before you compete.
          </p>

          {/* Next steps */}
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/resources" variant="accent">
              <LifeBuoy className="h-4 w-4" aria-hidden />
              Prep Resources
            </ButtonLink>
            <a
              href={rules.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-[4px] border border-border bg-card px-6 font-display text-[15px] font-bold uppercase tracking-[0.08em] transition-colors hover:border-accent hover:text-accent"
            >
              Rules on the {rules.label}
              <ExternalLink className="h-4 w-4" aria-hidden />
            </a>
          </div>

          {related.length > 0 && (
            <div className="mt-14">
              <h2 className="text-2xl font-bold">
                More in {event.category}
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {related.map((r) => (
                  <Link key={r.id} href={`/events/${r.id}`} className="group">
                    <Card className="flex h-full flex-col p-5 transition-all duration-200 group-hover:-translate-y-1 group-hover:border-accent group-hover:shadow-soft-lg">
                      <h3 className="font-display text-xl font-bold group-hover:text-accent">
                        {r.name}
                      </h3>
                      <p className="mt-1.5 flex-1 text-sm text-muted-foreground">
                        {r.blurb}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1 font-display text-sm font-bold uppercase tracking-[0.08em] text-accent">
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
              className="inline-flex items-center gap-2 font-display text-sm font-bold uppercase tracking-[0.08em] text-primary hover:text-accent"
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
