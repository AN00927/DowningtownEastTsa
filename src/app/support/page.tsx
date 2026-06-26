import type { Metadata } from "next";
import {
  Download,
  ExternalLink,
  FileText,
  GraduationCap,
  Utensils,
  Youtube,
} from "lucide-react";
import {
  Badge,
  Card,
  Container,
  PageHeader,
  Section,
  SectionHeading,
  buttonClass,
} from "@/components/ui";
import { site } from "@/data/site";
import {
  portfolioExamples,
  prepGuide,
  quickLinks,
  type ResourceLink,
} from "@/data/resources";

export const metadata: Metadata = {
  title: "Event Support",
  description:
    "Prep guides, quick links, documentation portfolio templates, and drop-in help to get ready for your Downingtown East TSA event.",
};

/** A single resource card that handles the comingSoon disabled state. */
function ResourceCard({ link }: { link: ResourceLink }) {
  if (link.comingSoon) {
    return (
      <Card className="flex h-full flex-col gap-3 p-5 opacity-70">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold">{link.title}</h3>
          <Badge className="shrink-0 border-accent text-accent">
            Coming soon
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{link.description}</p>
        <span
          aria-disabled
          className={buttonClass(
            "outline",
            "sm",
            "mt-auto cursor-not-allowed opacity-50",
          )}
        >
          <ExternalLink className="h-4 w-4" aria-hidden />
          Unavailable
        </span>
      </Card>
    );
  }

  return (
    <Card className="flex h-full flex-col gap-3 p-5 transition-colors hover:border-accent">
      <h3 className="font-semibold">{link.title}</h3>
      <p className="text-sm text-muted-foreground">{link.description}</p>
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass("outline", "sm", "mt-auto")}
      >
        <ExternalLink className="h-4 w-4" aria-hidden />
        Open link
      </a>
    </Card>
  );
}

export default function SupportPage() {
  return (
    <>
      <PageHeader
        title="Event Support"
        subtitle="Everything you need to prepare for your event."
      />

      {/* Featured prep guide */}
      <Section>
        <Container>
          <Card className="overflow-hidden border-accent/40 p-6 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[var(--radius-base)] bg-accent text-accent-foreground">
                <FileText className="h-7 w-7" aria-hidden />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-2xl font-bold tracking-tight">
                    {prepGuide.title}
                  </h2>
                  {prepGuide.comingSoon && (
                    <Badge className="border-accent text-accent">
                      Coming soon
                    </Badge>
                  )}
                </div>
                <p className="mt-3 max-w-2xl text-muted-foreground">
                  {prepGuide.description}
                </p>

                <div className="mt-5">
                  {prepGuide.comingSoon ? (
                    <button
                      type="button"
                      disabled
                      className={buttonClass("accent", "md")}
                    >
                      <Download className="h-4 w-4" aria-hidden />
                      Download guide
                    </button>
                  ) : (
                    <a
                      href={prepGuide.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonClass("accent", "md")}
                    >
                      <Download className="h-4 w-4" aria-hidden />
                      Download guide
                    </a>
                  )}
                </div>

                <p className="mt-3 text-xs text-muted-foreground">
                  This is a placeholder PDF. It will be replaced with the real
                  prep guide before launch.
                </p>
              </div>
            </div>
          </Card>
        </Container>
      </Section>

      {/* Quick Links */}
      <Section className="pt-0">
        <Container>
          <SectionHeading
            align="left"
            eyebrow="Resources"
            title="Helpful Quick Links"
            subtitle="Forms, rules, and the official TSA websites you'll use all year."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {quickLinks.map((link) => (
              <ResourceCard key={link.title} link={link} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Documentation Portfolio Templates & Examples */}
      <Section className="pt-0">
        <Container>
          <SectionHeading
            align="left"
            eyebrow="Templates"
            title="Documentation Portfolio Templates + Examples"
            subtitle="You can use these to give you inspiration!"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {portfolioExamples.map((link) => (
              <ResourceCard key={link.title} link={link} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Lunch n' Learn */}
      <Section className="pt-0">
        <Container>
          <SectionHeading
            align="left"
            eyebrow="In person"
            title="Lunch n' Learn Support Time"
          />
          <Card className="flex flex-col gap-4 p-6 sm:flex-row sm:items-start">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-base)] bg-primary text-primary-foreground">
              <Utensils className="h-6 w-6" aria-hidden />
            </div>
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-lg font-semibold">Drop-in help sessions</h3>
                <Badge className="border-accent text-accent">Placeholder</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Bring your lunch and your questions. Officers host drop in
                sessions to help you read the rules, plan your event, and look
                over your documentation portfolio. No appointment needed.
              </p>
              <p className="text-xs text-muted-foreground">
                Exact days, times, and room are placeholder details and will be
                confirmed on Schoology.
              </p>
            </div>
          </Card>
        </Container>
      </Section>

      {/* Schoology + YouTube callouts */}
      <Section className="pt-0">
        <Container>
          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="flex flex-col gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-base)] bg-primary text-primary-foreground">
                <GraduationCap className="h-6 w-6" aria-hidden />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">
                  Join the conversation on Schoology
                </h3>
                <p className="text-sm text-muted-foreground">
                  Announcements, deadlines, and Q&amp;A with officers and
                  advisors all happen in our Schoology group.
                </p>
              </div>
              <a
                href={site.socials.schoology}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClass("primary", "md", "mt-auto self-start")}
              >
                <GraduationCap className="h-4 w-4" aria-hidden />
                Open Schoology
              </a>
            </Card>

            <Card className="flex flex-col gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-base)] bg-accent text-accent-foreground">
                <Youtube className="h-6 w-6" aria-hidden />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Youtube Support</h3>
                <p className="text-sm text-muted-foreground">
                  Use the youtube videos we have created to prepare for your
                  events and interviews!
                </p>
              </div>
              <a
                href={site.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClass("accent", "md", "mt-auto self-start")}
              >
                <Youtube className="h-4 w-4" aria-hidden />
                Visit YouTube
              </a>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  );
}
