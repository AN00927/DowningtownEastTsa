import type { Metadata } from "next";
import { PageHeader, Section, Container } from "@/components/ui";
import { QuizFlow } from "@/components/quiz-flow";

export const metadata: Metadata = {
  title: "Find My Event",
  description:
    "Take the Find My Event quiz to discover which Downingtown East TSA competitive events match your interests.",
};

export default function QuizPage() {
  return (
    <>
      <PageHeader
        title="Find My Event"
        subtitle="Answer a few quick questions and we'll recommend TSA events for you."
      />
      <Section>
        <Container className="max-w-2xl">
          <QuizFlow />
        </Container>
      </Section>
    </>
  );
}
