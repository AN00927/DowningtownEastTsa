import type { Metadata } from "next";
import {
  Badge,
  ButtonLink,
  Card,
  Container,
  PageHeader,
  Section,
} from "@/components/ui";
import { AvatarPlaceholder } from "@/components/placeholder";
import { advisor, officers } from "@/data/officers";

export const metadata: Metadata = {
  title: "Officer Team",
  description:
    "Meet the student officers and faculty advisor leading Downingtown East TSA.",
};

export default function OfficersPage() {
  return (
    <>
      <PageHeader
        title="Officer Team"
        subtitle="Meet the students leading Downingtown East TSA."
      />

      <Section>
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {officers.map((officer) => (
              <Card
                key={officer.role}
                className="flex flex-col items-center gap-4 p-6 text-center"
              >
                <div className="w-24">
                  {officer.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={officer.photo}
                      alt={`${officer.name}, ${officer.role}`}
                      className="aspect-square w-full rounded-full object-cover"
                    />
                  ) : (
                    <AvatarPlaceholder label={officer.role} />
                  )}
                </div>

                <Badge className="border-accent text-accent">
                  {officer.role}
                </Badge>

                <div>
                  <p className="font-bold">{officer.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {officer.grade}
                  </p>
                </div>

                {officer.interests.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-2">
                    {officer.interests.map((interest) => (
                      <Badge key={interest} className="text-muted-foreground">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Faculty advisor */}
      <Section className="pt-0">
        <Container>
          <Card className="flex flex-col items-center gap-5 p-6 sm:flex-row sm:items-center sm:text-left">
            <div className="w-24 shrink-0">
              {advisor.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={advisor.photo}
                  alt={`${advisor.name}, ${advisor.role}`}
                  className="aspect-square w-full rounded-full object-cover"
                />
              ) : (
                <AvatarPlaceholder label={advisor.role} />
              )}
            </div>
            <div className="space-y-2 text-center sm:text-left">
              <Badge className="border-primary text-primary">
                {advisor.role}
              </Badge>
              <p className="font-bold">{advisor.name}</p>
            </div>
          </Card>
        </Container>
      </Section>

      {/* Contact note */}
      <Section className="pt-0">
        <Container>
          <Card className="flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold">Want to get in touch?</h2>
              <p className="text-sm text-muted-foreground">
                To protect our students&apos; privacy, we don&apos;t publish
                personal emails. Reach the officer team through our Contact page.
              </p>
            </div>
            <ButtonLink href="/contact" variant="primary" size="md">
              Go to Contact
            </ButtonLink>
          </Card>
        </Container>
      </Section>
    </>
  );
}
