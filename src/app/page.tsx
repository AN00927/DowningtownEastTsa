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
import { CategoryGrid } from "@/components/category-grid";
import { SeasonRoadmap } from "@/components/season-roadmap";
import { FaqAccordion } from "@/components/faq";
import { faq } from "@/data/faq";
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
      {/* 1. Hero: varsity headline left + photo carousel block right */}
      <section className="relative isolate overflow-hidden bg-deep-navy text-white">
        <DotGrid className="pointer-events-none absolute inset-0 -z-10 h-full w-full" />
        <Container className="pb-20 pt-16 sm:pb-24 sm:pt-20">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-14">
            {/* Left: welcome copy */}
            <div className="text-center lg:text-left">
              <div className="flex justify-center lg:justify-start">
                <Eyebrow tone="light">{site.schoolName}</Eyebrow>
              </div>
              <h1 className="mt-6 text-balance text-6xl font-bold leading-[0.95] text-white sm:text-7xl xl:text-8xl">
                <StaggerText text="Design. Build. Compete." />
              </h1>
              <span
                className="mx-auto mt-6 block h-1.5 w-24 -skew-x-[20deg] bg-accent lg:mx-0"
                aria-hidden
              />
              <p className="mx-auto mt-6 max-w-xl text-base text-white/75 sm:text-lg lg:mx-0">
                Welcome to {site.chapterName}. {site.tagline}
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
                  className="inline-flex h-13 cursor-pointer items-center justify-center gap-2 rounded-[4px] border border-white/25 bg-white/10 px-8 font-display text-base font-bold uppercase tracking-[0.08em] text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/20"
                >
                  Take the Quiz <ExternalLink className="h-4 w-4" aria-hidden />
                </a>
              </div>
            </div>

            {/* Right: carousel in an offset scarlet frame (block accent) */}
            <div className="relative">
              <div
                className="absolute -bottom-3 -right-3 h-full w-full rounded-[6px] border-2 border-accent"
                aria-hidden
              />
              <div className="relative overflow-hidden rounded-[6px] border border-white/15 shadow-soft-lg">
                <Carousel
                  slides={slides}
                  heightClass="h-[300px] sm:h-[380px] lg:h-[460px]"
                />
              </div>
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

      {/* 2. Keyword marquee: scarlet varsity band */}
      <div className="bg-accent py-4 text-white">
        <Marquee items={marqueeItems} />
      </div>

      {/* 3. About + animated stat blocks */}
      <Section id="about">
        <Container>
          <Reveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <Eyebrow>About</Eyebrow>
            <h2 className="mt-3 text-4xl font-bold sm:whitespace-nowrap sm:text-5xl">
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
                <div className="border-l-4 border-accent bg-card p-6 shadow-soft transition-transform duration-200 hover:-translate-y-1">
                  <dt className="font-display text-5xl font-bold tabular-nums text-primary sm:text-6xl">
                    <CountUp end={s.end} suffix={s.suffix} />
                  </dt>
                  <dd className="mt-2 font-display text-sm font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                    {s.label}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </Container>
      </Section>

      {/* 4. Find your lane: bento grid of event categories */}
      <Section className="border-t bg-muted/40 !pt-16">
        <Container>
          <Reveal className="mb-12 flex flex-col items-center text-center">
            <Eyebrow>Event Categories</Eyebrow>
            <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
              Find your lane
            </h2>
            <p className="mt-4 max-w-xl text-muted-foreground">
              Five categories, one for every kind of builder. Pick a lane and
              jump straight to its events.
            </p>
          </Reveal>
          <Reveal>
            <CategoryGrid />
          </Reveal>
        </Container>
      </Section>

      {/* 5. Next competition digital clock (auto-advances Regional -> State -> National) */}
      <section className="relative isolate overflow-hidden bg-deep-navy text-white">
        <div className="stripes-accent absolute inset-x-0 top-0 h-2" aria-hidden />
        <DotGrid className="pointer-events-none absolute inset-0 -z-10 h-full w-full" />
        <Container className="py-16 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <Eyebrow tone="light">Next Competition</Eyebrow>
              <div className="mt-6">
                <NextCompetitionClock conferences={conferences} />
              </div>
            </div>
            <div
              role="img"
              aria-label="Conference photo placeholder"
              className="flex aspect-[4/3] w-full items-center justify-center rounded-[6px] border border-dashed border-white/25 bg-white/5"
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

      {/* 6. Season roadmap: Regionals -> States -> Nationals */}
      <Section>
        <Container>
          <Reveal className="mb-12 flex flex-col items-center text-center">
            <Eyebrow>The Season</Eyebrow>
            <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
              Road to Nationals
            </h2>
            <p className="mt-4 max-w-xl text-muted-foreground">
              Three levels of competition. Every event you prep this year is a
              step on this road.
            </p>
          </Reveal>
          <Reveal>
            <SeasonRoadmap conferences={conferences} />
          </Reveal>
        </Container>
      </Section>

      {/* 7. Explore the club */}
      <Section className="border-t bg-muted/40">
        <Container>
          <Reveal className="mb-12 flex flex-col items-center text-center">
            <Eyebrow>Quick Links</Eyebrow>
            <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
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
                  <Card className="flex h-full flex-col p-7 transition-all duration-200 hover:-translate-y-1 hover:border-accent hover:shadow-soft-lg">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-[4px] bg-accent text-white">
                      <Icon className="h-6 w-6" aria-hidden />
                    </span>
                    <h3 className="mt-5 font-display text-2xl font-bold uppercase tracking-[0.02em]">
                      {title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">
                      {description}
                    </p>
                    <Link
                      href={href}
                      className="mt-6 inline-flex items-center gap-1 font-display text-sm font-bold uppercase tracking-[0.08em] text-accent hover:underline"
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

      {/* 8. FAQ */}
      <Section>
        <Container className="max-w-3xl">
          <Reveal className="mb-12 flex flex-col items-center text-center">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
              Common questions
            </h2>
            <p className="mt-4 max-w-xl text-muted-foreground">
              New to TSA? Start here, then come find us at a meeting.
            </p>
          </Reveal>
          <Reveal>
            <FaqAccordion items={faq} />
          </Reveal>
        </Container>
      </Section>

      {/* 9. Closing CTA */}
      <section className="relative isolate overflow-hidden bg-deep-navy text-white">
        <div className="stripes-accent absolute inset-x-0 top-0 h-2" aria-hidden />
        <Container className="py-16 text-center sm:py-20">
          <Reveal className="flex flex-col items-center">
            <h2 className="max-w-3xl text-balance text-4xl font-bold text-white sm:text-6xl">
              Ready to design, build, and compete?
            </h2>
            <span className="mt-5 block h-1.5 w-24 -skew-x-[20deg] bg-accent" aria-hidden />
            <p className="mx-auto mt-5 max-w-xl text-white/75">
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
