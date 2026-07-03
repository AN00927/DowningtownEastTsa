import type { Metadata } from "next";
import { Card, Container, PageHeader, Section, SectionHeading } from "@/components/ui";
import { AvatarPlaceholder } from "@/components/placeholder";
import { Reveal } from "@/components/reveal";
import { TiltCard } from "@/components/tilt-card";
import { committees, officers } from "@/data/officers";

export const metadata: Metadata = {
  title: "Team",
};

export default function TeamPage() {
  return (
    <>
      <PageHeader
        title="Team"
        subtitle="Meet the students leading Downingtown East TSA."
      />

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Leadership"
            title="Officers"
            subtitle="The officer team that keeps our chapter running."
          />
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {officers.map((officer, index) => (
              <li key={officer.role}>
                <Reveal delay={index * 70} className="h-full">
                  <TiltCard>
                    <Card className="flex h-full flex-col items-center p-6 text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-soft-lg">
                      <div className="w-24">
                        {officer.photo ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={officer.photo}
                            alt={officer.name}
                            className="aspect-square w-full rounded-full object-cover"
                          />
                        ) : (
                          <AvatarPlaceholder label={officer.role} />
                        )}
                      </div>
                      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                        {officer.role}
                      </p>
                      <h3 className="mt-1 text-lg font-bold">{officer.name}</h3>
                      {officer.bio && (
                        <p className="mt-3 text-sm text-muted-foreground">{officer.bio}</p>
                      )}
                    </Card>
                  </TiltCard>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section className="border-t bg-muted/50">
        <Container>
          <SectionHeading
            eyebrow="Committees"
            title="Committees"
            subtitle="Teams of members driving our chapter's projects forward."
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {committees.map((committee, index) => (
              <Reveal key={committee.name} delay={index * 90} className="h-full">
                <TiltCard>
                  <Card className="h-full p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-soft-lg">
                    <h3 className="text-xl font-bold">{committee.name}</h3>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {committee.members.map((member) => (
                        <li
                          key={member}
                          className="inline-flex items-center rounded-full border bg-card px-3 py-1 text-sm font-medium text-foreground"
                        >
                          {member}
                        </li>
                      ))}
                    </ul>
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
