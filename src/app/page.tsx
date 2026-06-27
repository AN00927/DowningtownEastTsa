import Link from "next/link";
import { ArrowRight, Compass, ImageIcon, LifeBuoy, Users } from "lucide-react";
import { ButtonLink, Card, Container, Eyebrow, Section } from "@/components/ui";
import { Carousel, type Slide } from "@/components/carousel";
import { NextCompetitionClock } from "@/components/next-competition-clock";
import { Reveal } from "@/components/reveal";
import { StaggerText } from "@/components/stagger-text";
import { Magnetic } from "@/components/magnetic";
import { TiltCard } from "@/components/tilt-card";
import { DotGrid } from "@/components/dot-grid";
import { conferences } from "@/data/calendar";
import { site } from "@/data/site";

// Placeholder slides. Swap `src` with real photo paths under /public later.
const slides: Slide[] = [
  { src: "", alt: "Chapter photo 1 (add your photo)" },
  { src: "", alt: "Chapter photo 2 (add your photo)" },
  { src: "", alt: "Chapter photo 3 (add your photo)" },
  { src: "", alt: "Chapter photo 4 (add your photo)" },
];

const quickLinks = [
  {
    title: "Events",
    description: "Browse every competitive event and find the right one for you.",
    href: "/events",
    Icon: Compass,
  },
  {
    title: "Resources",
    description: "Rules, forms, templates, and prep support all in one place.",
    href: "/resources",
    Icon: LifeBuoy,
  },
  {
    title: "Team",
    description: "Meet the officers and committees running the club this year.",
    href: "/team",
    Icon: Users,
  },
];

export default function HomePage() {
  return (
    <>
      {/* 1. Photo carousel with floating welcome banner over it */}
      <Carousel
        slides={slides}
        overlay={
          <div className="pointer-events-auto mx-auto max-w-sm rounded-2xl border border-white/15 bg-deep-navy/70 px-5 py-5 text-center shadow-soft-lg sm:max-w-md sm:px-7 sm:py-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/65">
              {site.schoolName}
            </p>
            <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              <StaggerText text="Welcome to Downingtown East TSA!" />
            </h1>
            <p className="mx-auto mt-2.5 max-w-xs text-sm text-white/80">
              {site.tagline}
            </p>
            <div className="mt-4">
              <Magnetic>
                <ButtonLink href="#about" variant="accent" size="md">
                  Learn More <ArrowRight className="h-4 w-4" aria-hidden />
                </ButtonLink>
              </Magnetic>
            </div>
          </div>
        }
      />

      {/* 2. About */}
      <Section id="about">
        <Container className="max-w-3xl text-center">
          <Reveal className="flex flex-col items-center">
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
        </Container>
      </Section>

      {/* 3. Next competition digital clock (auto-advances Regional -> State -> National) */}
      <section className="relative isolate overflow-hidden bg-deep-navy text-white">
        <DotGrid className="pointer-events-none absolute inset-0 -z-10 h-full w-full" />
        <Container className="py-16 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            {/* Left: clock + details */}
            <div>
              <Eyebrow>Next Competition</Eyebrow>
              <div className="mt-4">
                <NextCompetitionClock conferences={conferences} />
              </div>
            </div>

            {/* Right: conference image placeholder */}
            <div
              role="img"
              aria-label="Conference photo placeholder"
              className="flex aspect-[4/3] w-full items-center justify-center rounded-2xl border border-dashed border-white/25 bg-white/5"
            >
              <div className="flex flex-col items-center gap-2 text-white/55">
                <ImageIcon className="h-9 w-9" aria-hidden />
                <span className="text-sm font-medium">Conference photo placeholder</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. Quick links */}
      <Section className="border-y bg-muted/50">
        <Container>
          <Reveal className="mb-12 flex flex-col items-center text-center">
            <Eyebrow>Quick Links</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need
            </h2>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {quickLinks.map(({ title, description, href, Icon }, i) => (
              <Reveal key={href} delay={i * 80}>
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
                      Explore <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </Card>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
