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
          <ul className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
            {officers.map((officer, index) => (
              <li key={officer.role}>
                <Reveal delay={index * 70} className="h-full">
                  <TiltCard>
                    <Card className="flex h-full flex-col items-center border-t-4 border-t-accent p-4 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-soft-lg sm:p-6">
                      <div className="w-16 sm:w-24">
                        {officer.photo ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={officer.photo}
                            alt={officer.name}
                            className="aspect-square w-full rounded-full object-cover ring-4 ring-accent/15"
                          />
                        ) : (
                          <AvatarPlaceholder label={officer.role} />
                        )}
                      </div>
                      <p className="mt-3 font-display text-xs font-bold uppercase tracking-[0.1em] text-accent sm:mt-4 sm:text-sm sm:tracking-[0.14em]">
                        {officer.role}
                      </p>
                      <h3 className="mt-1 font-display text-base font-bold sm:text-xl">{officer.name}</h3>
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
                  <Card className="h-full border-l-4 border-l-accent p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-soft-lg sm:p-6">
                    <h3 className="font-display text-lg font-bold sm:text-2xl">{committee.name}</h3>
                    <ul className="mt-3 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2">
                      {committee.members.map((member) => (
                        <li
                          key={member}
                          className="inline-flex items-center rounded-[4px] border bg-card px-2.5 py-0.5 text-xs font-medium text-foreground sm:px-3 sm:py-1 sm:text-sm"
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
