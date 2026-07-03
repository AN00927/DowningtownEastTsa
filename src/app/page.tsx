import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Compass,
  ExternalLink,
  ImageIcon,
  LifeBuoy,
  Users,
} from "lucide-react";
import { ButtonLink, Card, Container, Eyebrow, Section } from "@/components/ui";
import { Carousel, type Slide } from "@/components/carousel";
import { NextCompetitionClock } from "@/components/next-competition-clock";
import { Reveal } from "@/components/reveal";
import { StaggerText } from "@/components/stagger-text";
import { Magnetic } from "@/components/magnetic";
import { TiltCard } from "@/components/tilt-card";
import { DotGrid } from "@/components/dot-grid";
import { Marquee } from "@/components/marquee";
import { CountUp } from "@/components/count-up";
import { conferences } from "@/data/calendar";
import { events, EVENT_CATEGORIES } from "@/data/events";
import { officers } from "@/data/officers";
import { site } from "@/data/site";

// Placeholder slides. Swap `src` with real photo paths under /public later.
const slides: Slide[] = [
  { src: "", alt: "Chapter photo 1 (add your photo)" },
  { src: "", alt: "Chapter photo 2 (add your photo)" },
  { src: "", alt: "Chapter photo 3 (add your photo)" },
  { src: "", alt: "Chapter photo 4 (add your photo)" },
];

const marqueeItems = [
  "Engineering",
  "Coding",
  "Robotics",
  "Video Production",
  "Architecture",
  "Data Science",
  "Public Speaking",
  "Game Design",
  "Manufacturing",
  "Biotechnology",
];

const stats = [
  { end: events.length, suffix: "", label: "Competitive events" },
  { end: EVENT_CATEGORIES.length, suffix: "", label: "Event categories" },
  { end: 3, suffix: "", label: "Competition levels" },
  { end: officers.length, suffix: "", label: "Student officers" },
];

const explore = [
  {
    title: "Events",
    description:
      "Browse every competitive event and find the right one for you.",
    href: "/events",
    cta: "View Events",
    Icon: Compass,
  },
  {
    title: "Resources",
    description: "Rules, forms, templates, and prep support all in one place.",
    href: "/resources",
    cta: "Get Prepared",
    Icon: LifeBuoy,
  },
  {
    title: "Team",
    description: "Meet the officers and committees running the club this year.",
    href: "/team",
    cta: "Meet the Team",
    Icon: Users,
  },
];

export default function HomePage() {
  return (
    <>
      {/* 1. Hero: two columns, welcome text left + photo carousel right */}
      <section className="relative isolate overflow-hidden bg-deep-navy text-white">
        <DotGrid className="pointer-events-none absolute inset-0 -z-10 h-full w-full" />
        <Container className="pb-20 pt-16 sm:pb-24 sm:pt-20">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            {/* Left: welcome copy */}
            <div className="text-center lg:text-left">
              <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/75">
                {site.schoolName}
              </span>
              <h1 className="mt-6 text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl xl:text-6xl">
                <StaggerText text="Welcome to Downingtown East TSA!" />
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-base text-white/75 sm:text-lg lg:mx-0">
                {site.tagline}
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-3 lg:justify-start">
                <Magnetic>
                  <ButtonLink href="/events" variant="accent" size="lg">
                    Browse Events <ArrowRight className="h-4 w-4" aria-hidden />
                  </ButtonLink>
                </Magnetic>
                <a
                  href={site.quizUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-13 items-center justify-center gap-2 rounded-md border border-white/25 bg-white/10 px-8 font-semibold text-white transition-colors hover:bg-white/20"
                >
                  Take the Quiz <ExternalLink className="h-4 w-4" aria-hidden />
                </a>
              </div>
            </div>

            {/* Right: auto-rotating photo carousel */}
            <div className="overflow-hidden rounded-2xl border border-white/15 shadow-soft-lg">
              <Carousel
                slides={slides}
                heightClass="h-[300px] sm:h-[380px] lg:h-[460px]"
              />
            </div>
          </div>
          <a
            href="#about"
            aria-label="Scroll to the About section"
            className="animate-scroll-cue absolute bottom-5 left-1/2 hidden -translate-x-1/2 text-white/70 hover:text-white lg:block"
          >
            <ArrowDown className="h-6 w-6" aria-hidden />
          </a>
        </Container>
      </section>

      {/* 2. Keyword marquee */}
      <div className="border-b bg-muted/40 py-5">
        <Marquee items={marqueeItems} />
      </div>

      {/* 3. About + animated stats */}
      <Section id="about">
        <Container>
          <Reveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <Eyebrow>About</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              About Downingtown East TSA
            </h2>
            <p className="mt-6 text-base text-muted-foreground sm:text-lg">
              Downingtown East TSA is a club for students interested in
              engineering and other STEM and business fields. We compete in
              events that range from software to mechanical, building real
              projects along the way. TSA is a national organization that
              develops skills in science, technology, engineering, mathematics,
              and business education.
            </p>
          </Reveal>

          <dl className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 80}>
                <div className="rounded-[var(--radius-base)] border bg-card p-6 text-center shadow-soft">
                  <dt className="font-mono text-4xl font-bold tabular-nums text-primary sm:text-5xl">
                    <CountUp end={s.end} suffix={s.suffix} />
                  </dt>
                  <dd className="mt-2 text-sm text-muted-foreground">
                    {s.label}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </Container>
      </Section>

      {/* 4. Next competition digital clock (auto-advances Regional -> State -> National) */}
      <section className="relative isolate overflow-hidden bg-deep-navy text-white">
        <DotGrid className="pointer-events-none absolute inset-0 -z-10 h-full w-full" />
        <Container className="py-16 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <Eyebrow>Next Competition</Eyebrow>
              <div className="mt-6">
                <NextCompetitionClock conferences={conferences} />
              </div>
            </div>
            <div
              role="img"
              aria-label="Conference photo placeholder"
              className="flex aspect-[4/3] w-full items-center justify-center rounded-2xl border border-dashed border-white/25 bg-white/5"
            >
              <div className="flex flex-col items-center gap-2 text-white/55">
                <ImageIcon className="h-9 w-9" aria-hidden />
                <span className="text-sm font-medium">
                  Conference photo placeholder
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. Explore the club */}
      <Section>
        <Container>
          <Reveal className="mb-12 flex flex-col items-center text-center">
            <Eyebrow>Quick Links</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need
            </h2>
            <p className="mt-4 max-w-xl text-muted-foreground">
              Three quick links to prepare and succeed this year.
            </p>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {explore.map(({ title, description, href, cta, Icon }, i) => (
              <Reveal key={href} delay={i * 90}>
                <TiltCard>
                  <Card className="flex h-full flex-col p-7 transition-shadow duration-200 hover:shadow-soft-lg">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" aria-hidden />
                    </span>
                    <h3 className="mt-5 text-xl font-semibold">{title}</h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">
                      {description}
                    </p>
                    <Link
                      href={href}
                      className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline"
                    >
                      {cta} <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </Card>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* 6. Closing CTA */}
      <section className="bg-deep-navy text-white">
        <Container className="py-16 text-center sm:py-20">
          <Reveal className="flex flex-col items-center">
            <h2 className="max-w-2xl text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to design, build, and compete?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/75">
              Pick an event, grab the prep guide, and join us this season. We
              would love to have you.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/events" variant="accent" size="lg">
                Find Your Event <ArrowRight className="h-4 w-4" aria-hidden />
              </ButtonLink>
              <ButtonLink
                href="/resources"
                size="lg"
                className="border border-white/25 bg-white/10 text-white hover:bg-white/20"
              >
                Get Prepared
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
