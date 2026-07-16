import type { Metadata } from "next";
import { Download, ExternalLink, FileText } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { TiltCard } from "@/components/tilt-card";
import {
  Badge,
  ButtonLink,
  Card,
  Container,
  PageHeader,
  Section,
  SectionHeading,
} from "@/components/ui";
import {
  portfolioExamples,
  prepGuide,
  quickLinks,
  type ResourceLink,
} from "@/data/resources";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Resources",
};

// Clear, real labels for the six quick links (matched in data order). The old
// site just shouted "READ! READ! READ!"; these say what each link actually is.
const quickLinkLabels = [
  "Event Matrix",
  "Competition Rules",
  "Event Change Form",
  "Team IDs",
  "PA TSA site",
  "National TSA site",
];

/** Shared card for a single resource link. Handles the coming-soon state. */
function ResourceCard({
  resource,
  label,
}: {
  resource: ResourceLink;
  label?: string;
}) {
  const title = label ?? resource.title;

  if (resource.comingSoon) {
    return (
      <TiltCard>
        <Card className="flex h-full flex-col p-4 opacity-80 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-soft-lg sm:p-6">
          {/* Stacked on phones: badge + title side by side don't fit in the
              2-up grid, so the badge would bleed past the card edge. */}
          <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
            <h3 className="text-base font-semibold text-primary sm:text-lg">
              {title}
            </h3>
            <Badge className="shrink-0 border-border bg-muted text-muted-foreground">
              Coming soon
            </Badge>
          </div>
          {/* Description hidden on phones to keep the 2-up grid short. */}
          <p className="mt-2 hidden text-sm text-muted-foreground sm:block">
            {resource.description}
          </p>
        </Card>
      </TiltCard>
    );
  }

  return (
    <TiltCard>
      <Card className="group h-full p-0 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-soft-lg">
        <a
          href={resource.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-full flex-col rounded-[var(--radius-base)] p-4 sm:p-6"
        >
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-base font-semibold text-primary transition-colors group-hover:text-accent sm:text-lg">
              {title}
            </h3>
            <ExternalLink
              className="size-4 shrink-0 text-muted-foreground sm:size-5"
              aria-hidden
            />
          </div>
          {/* Description hidden on phones to keep the 2-up grid short. */}
          <p className="mt-2 hidden text-sm text-muted-foreground sm:block">
            {resource.description}
          </p>
          <span className="mt-auto pt-3 text-sm font-medium text-accent sm:pt-4">
            Open link
          </span>
        </a>
      </Card>
    </TiltCard>
  );
}

export default function ResourcesPage() {
  return (
    <>
      <PageHeader
        title="Resources"
        subtitle="Everything you need to prepare for your event."
      />

      {/* Featured: all-in-one prep guide (the "mega document") */}
      <section className="py-16 sm:py-20 lg:py-24">
        <Container>
          <Reveal>
            <Card className="flex flex-col gap-6 border-l-4 border-l-accent p-7 transition-shadow duration-200 hover:shadow-soft-lg sm:flex-row sm:items-center sm:p-8">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-[4px] bg-accent text-white">
                <FileText className="size-7" aria-hidden />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-xl font-bold text-primary">
                    {prepGuide.title}
                  </h2>
                  <Badge className="border-border bg-muted text-muted-foreground">
                    Placeholder PDF
                  </Badge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {prepGuide.description}
                </p>
              </div>
              <ButtonLink
                href={prepGuide.href}
                target="_blank"
                rel="noopener noreferrer"
                variant="accent"
                size="lg"
                className="shrink-0"
              >
                <Download className="size-4" aria-hidden />
                Open Guide
              </ButtonLink>
            </Card>
          </Reveal>
        </Container>
      </section>

      {/* Quick Links */}
      <Section className="border-t bg-muted/40">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Start here"
              title="Quick Links"
              subtitle="The forms, rules, and sites you will use most this season. Read them carefully."
              align="left"
            />
          </Reveal>
          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
            {quickLinks.map((resource, index) => (
              <Reveal key={resource.title} delay={index * 70}>
                <ResourceCard
                  resource={resource}
                  label={quickLinkLabels[index]}
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Portfolio Templates + Examples */}
      <Section className="border-t">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Documentation"
              title="Portfolio Templates + Examples"
              subtitle="A starting template plus real chapter portfolios from the TSA National Conference."
              align="left"
              className="max-w-none"
              titleClassName="lg:whitespace-nowrap"
            />
          </Reveal>
          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
            {portfolioExamples.map((resource, index) => (
              <Reveal key={resource.title} delay={index * 70}>
                <ResourceCard resource={resource} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* YouTube Support */}
      <Section className="border-t bg-muted/40">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Watch"
              title="YouTube Support"
              subtitle="Use the videos we have made to prepare for your events and interviews."
              align="left"
            />
          </Reveal>
          <Card className="overflow-hidden p-0">
            <div className="aspect-video w-full bg-deep-navy">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/zni-rHFt8No"
                title="DEAST TSA Documentation Portfolio Tutorial"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                Find the full set of prep and interview videos on our channel.
              </p>
              <ButtonLink
                href={site.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                variant="accent"
                className="shrink-0"
              >
                Watch on YouTube
                <ExternalLink className="size-4" aria-hidden />
              </ButtonLink>
            </div>
          </Card>
        </Container>
      </Section>
    </>
  );
}
