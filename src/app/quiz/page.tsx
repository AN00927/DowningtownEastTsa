import type { Metadata } from "next";
import { Container, Eyebrow, Section } from "@/components/ui";
import { DotGrid } from "@/components/dot-grid";
import { QuizExperience } from "@/components/quiz-experience";
import { quizQuestions } from "@/data/quiz";

export const metadata: Metadata = {
  title: "Event Quiz",
  description:
    "Take the Downingtown East TSA personality quiz: answer 11 quick questions and get matched with the competitive events that fit you best.",
};

export default function QuizPage() {
  return (
    <>
      {/* Header band, matching the events page */}
      <section className="relative isolate overflow-hidden bg-deep-navy text-white">
        <DotGrid className="pointer-events-none absolute inset-0 -z-10 h-full w-full" />
        <Container className="py-16 sm:py-20">
          <div className="max-w-2xl">
            <Eyebrow tone="light">Personality Quiz</Eyebrow>
            <h1 className="mt-3 text-5xl font-bold text-white sm:text-6xl">
              Find the event that fits you
            </h1>
            <p className="mt-4 text-lg text-white/75">
              Answer {quizQuestions.length} quick questions and get matched
              with the competitive events that suit your interests, skills,
              and style.
            </p>
          </div>
        </Container>
      </section>

      <Section className="!pt-10 sm:!pt-12">
        <Container className="!max-w-3xl">
          <QuizExperience />
        </Container>
      </Section>
    </>
  );
}
