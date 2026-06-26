import type { Metadata } from "next";
import { ChevronDown } from "lucide-react";
import { Card, Container, PageHeader, Section } from "@/components/ui";
import { faq } from "@/data/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Downingtown East TSA.",
};

export default function FaqPage() {
  return (
    <>
      <PageHeader title="Frequently Asked Questions" />
      <Section>
        <Container className="max-w-3xl">
          <ul className="flex flex-col gap-4">
            {faq.map((item, i) => (
              <li key={i}>
                <Card className="p-0">
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-medium">
                      <span>{item.question}</span>
                      <ChevronDown
                        className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
                        aria-hidden="true"
                      />
                    </summary>
                    <div className="px-5 pb-5 text-muted-foreground">
                      {item.answer}
                    </div>
                  </details>
                </Card>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
