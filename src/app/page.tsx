import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  Compass,
  LifeBuoy,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import {
  Badge,
  ButtonLink,
  Card,
  Container,
  Section,
  SectionHeading,
} from "@/components/ui";
import { ImagePlaceholder } from "@/components/placeholder";
import { CountdownTimer } from "@/components/countdown-timer";
import { site } from "@/data/site";
import { events } from "@/data/events";
import { news } from "@/data/news";
import { sponsors } from "@/data/sponsors";
import { nextCompetition } from "@/data/calendar";
import { formatDate } from "@/lib/utils";

const quickLinks = [
  {
    title: "Competitive Events",
    description: "Browse 45+ national and PA-only events and find the right fit.",
    href: "/events",
    Icon: Compass,
  },
  {
    title: "Find My Event",
    description: "Not sure where to start? Take the quiz for a recommendation.",
    href: "/quiz",
    Icon: Sparkles,
  },
  {
    title: "Event Support",
    description: "Rules, prep guide, templates, and Lunch n' Learn help.",
    href: "/support",
    Icon: LifeBuoy,
  },
  {
    title: "Officer Team",
    description: "Meet the students leading the chapter this year.",
    href: "/officers",
    Icon: Users,
  },
];

export default function HomePage() {
  const latestNews = news.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b bg-primary text-primary-foreground">
        <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] [background-size:24px_24px]" />
        <Container className="relative py-20 sm:py-28">
          <div className="max-w-3xl">
            <Badge className="border-white/30 bg-white/10 text-primary-foreground">
              {site.schoolName}
            </Badge>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-6xl">
              Downingtown East{" "}
              <span className="whitespace-nowrap">Technology Student Association</span>
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/80 sm:text-xl">
              {site.tagline}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/events" variant="accent" size="lg">
                Explore Events <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink
                href="/quiz"
                size="lg"
                className="border border-white/40 bg-white/10 text-primary-foreground hover:bg-white/20"
              >
                Find My Event
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      {/* About */}
      <Section>
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <SectionHeading
                align="left"
                eyebrow="About Us"
                title="What is TSA?"
              />
              <div className="space-y-4 text-muted-foreground">
                <p>
                  The Technology Student Association (TSA) is a national
                  organization that develops skills in science, technology,
                  engineering, and mathematics (STEM) through hands-on
                  competitive events.
                </p>
                <p>
                  At Downingtown East, students interested in engineering,
                  design, coding, communication, and research come together to
                  build projects, compete at the regional, state, and national
                  levels, and grow as leaders.
                </p>
              </div>
              <div className="mt-6">
                <ButtonLink href="/faq" variant="outline">
                  Read the FAQ <ArrowRight className="h-4 w-4" />
                </ButtonLink>
              </div>
            </div>
            <ImagePlaceholder
              label="Add a club photo here (e.g. team at competition)"
              aspect="aspect-[4/3]"
            />
          </div>
        </Container>
      </Section>

      {/* Countdown */}
      <Section className="bg-muted/50">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 text-accent">
              <CalendarClock className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                Next Up
              </span>
            </div>
            <h2 className="mb-8 text-3xl font-bold tracking-tight sm:text-4xl">
              Countdown to the next competition
            </h2>
            <CountdownTimer
              targetIso={nextCompetition.date}
              name={nextCompetition.name}
            />
          </div>
        </Container>
      </Section>

      {/* Quick links */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Get Started"
            title="Helpful resources"
            subtitle="Everything you need to prepare and succeed this year."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {quickLinks.map(({ title, description, href, Icon }) => (
              <Link key={href} href={href} className="group">
                <Card className="h-full p-6 transition-shadow hover:shadow-md">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-base)] bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                    Learn more
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Card>
              </Link>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            {events.length} competitive events to explore.
          </p>
        </Container>
      </Section>

      {/* News preview */}
      {latestNews.length > 0 && (
        <Section className="bg-muted/50">
          <Container>
            <div className="flex items-end justify-between gap-4">
              <SectionHeading
                align="left"
                eyebrow="News"
                title="Latest announcements"
              />
              <Link
                href="/news"
                className="mb-10 hidden shrink-0 items-center gap-1 text-sm font-medium text-accent hover:underline sm:inline-flex"
              >
                All news <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {latestNews.map((post) => (
                <Link key={post.slug} href={`/news/${post.slug}`} className="group">
                  <Card className="h-full p-6 transition-shadow hover:shadow-md">
                    <time className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {formatDate(post.date)}
                    </time>
                    <h3 className="mt-2 text-lg font-semibold group-hover:text-accent">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {post.excerpt}
                    </p>
                  </Card>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Gallery */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Gallery"
            title="Downingtown East TSA in images"
            subtitle="Add your favorite competition and club photos here."
          />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <ImagePlaceholder
                key={i}
                label={`Photo ${i + 1}`}
                aspect="aspect-square"
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* Get involved CTA */}
      <Section className="bg-primary text-primary-foreground">
        <Container>
          <div className="flex flex-col items-center gap-6 text-center">
            <Trophy className="h-10 w-10" />
            <h2 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to get involved?
            </h2>
            <p className="max-w-xl text-primary-foreground/80">
              Join Downingtown East TSA, pick an event, and start building. Reach
              out with any questions — we&apos;d love to have you.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <ButtonLink href="/contact" variant="accent" size="lg">
                Contact Us
              </ButtonLink>
              <a
                href={site.socials.schoology}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-[var(--radius-base)] border border-white/40 bg-white/10 px-7 font-semibold hover:bg-white/20"
              >
                Join us on Schoology
              </a>
            </div>
          </div>
        </Container>
      </Section>

      {/* Sponsors */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Thank You"
            title="Our sponsors & partners"
            subtitle="Support from our community makes competition possible."
          />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {sponsors.map((s, i) => (
              <Card
                key={i}
                className="flex aspect-[3/2] items-center justify-center p-4 text-center text-sm text-muted-foreground"
              >
                {s.name}
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
