import Link from "next/link";
import { Compass, LifeBuoy, Users } from "lucide-react";
import {
  ButtonLink,
  Card,
  Container,
  Section,
} from "@/components/ui";
import { ImagePlaceholder } from "@/components/placeholder";
import { CountdownTimer } from "@/components/countdown-timer";
import { nextCompetition } from "@/data/calendar";

const helpfulResources = [
  {
    title: "Competitive Events",
    description:
      "Look through all of the events you can compete in and find the right one for you.",
    href: "/events",
    Icon: Compass,
  },
  {
    title: "Competition Support",
    description:
      "Find rules, forms, templates, and other resources to help you get ready.",
    href: "/support",
    Icon: LifeBuoy,
  },
  {
    title: "Officer Team",
    description: "Meet the officers running the club this year.",
    href: "/officers",
    Icon: Users,
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero / Welcome banner. Add a banner photo behind the text later. */}
      <section className="relative isolate flex min-h-[60vh] items-center justify-center overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 -z-10 opacity-20 [background-image:radial-gradient(circle_at_30%_30%,white_1px,transparent_1px)] [background-size:26px_26px]" />
        <Container className="py-24 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
            Welcome to Downingtown East TSA!
          </h1>
          <div className="mt-8">
            <ButtonLink href="#about" variant="accent" size="lg">
              Learn More
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* About */}
      <Section id="about">
        <Container className="max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            About Downingtown East TSA
          </h2>
          <div className="mt-6 space-y-4 text-base text-muted-foreground sm:text-lg">
            <p>
              Downingtown East TSA is a club at East where students interested in
              pursuing careers in Engineering and other related fields can
              participate in a variety of events ranging from software to
              mechanical events. TSA is a national organization created to
              develop skills in science, technology, engineering, and
              mathematics (STEM) and business education.
            </p>
            <p>
              Use the resources on this website to find rules and regulations for
              events, study for an onsite test, or look for other materials that
              will aid you in your event this year!
            </p>
          </div>
        </Container>
      </Section>

      {/* TSA Calendar / countdown */}
      <Section className="bg-muted/50">
        <Container className="max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            TSA Calendar
          </h2>
          <p className="mt-3 text-lg font-semibold">
            It&apos;s competition season!
          </p>
          <p className="mt-2 text-muted-foreground">
            Your next competition is approaching quickly. Make sure to work on
            your projects and reach out if you need help!
          </p>
          <div className="mt-8">
            <CountdownTimer
              targetIso={nextCompetition.date}
              name={nextCompetition.name}
            />
          </div>
        </Container>
      </Section>

      {/* Helpful Resources */}
      <Section>
        <Container>
          <h2 className="mb-10 text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Helpful Resources
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {helpfulResources.map(({ title, description, href, Icon }) => (
              <Link key={href} href={href} className="group">
                <Card className="h-full p-8 text-center transition-shadow hover:shadow-md">
                  <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-semibold">{title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {description}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Gallery */}
      <Section className="bg-muted/50">
        <Container>
          <h2 className="mb-10 text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Downingtown East TSA in Images
          </h2>
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
    </>
  );
}
