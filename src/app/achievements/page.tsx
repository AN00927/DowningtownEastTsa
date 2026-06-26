import type { Metadata } from "next";
import { Badge, Card, Container, PageHeader, Section } from "@/components/ui";
import { achievements, type Achievement } from "@/data/achievements";

export const metadata: Metadata = {
  title: "Achievements",
  description: "Competition results and achievements from Downingtown East TSA.",
};

export default function AchievementsPage() {
  const groups = new Map<string, Achievement[]>();
  for (const a of achievements) {
    const list = groups.get(a.year) ?? [];
    list.push(a);
    groups.set(a.year, list);
  }
  const years = Array.from(groups.keys()).sort((x, y) => Number(y) - Number(x));

  return (
    <>
      <PageHeader
        title="Achievements"
        subtitle="Celebrating our members' competition results."
      />
      <Section>
        <Container>
          <p className="mb-10 text-sm text-muted-foreground">
            Note: entries below are placeholders &mdash; replace with real
            competition results.
          </p>
          <div className="flex flex-col gap-12">
            {years.map((year) => (
              <div key={year}>
                <h2 className="mb-6 text-2xl font-bold tracking-tight">
                  {year}
                </h2>
                <ul className="grid gap-4 sm:grid-cols-2">
                  {groups.get(year)!.map((a, i) => (
                    <li key={`${a.event}-${i}`}>
                      <Card className="flex h-full flex-col p-6">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-lg font-semibold tracking-tight">
                            {a.event}
                          </h3>
                          <Badge>{a.level}</Badge>
                        </div>
                        <p className="mt-2 text-lg font-bold text-accent">
                          {a.placement}
                        </p>
                        <p className="mt-3 text-sm text-muted-foreground">
                          {a.members}
                        </p>
                      </Card>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
