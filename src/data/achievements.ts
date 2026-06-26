// ---------------------------------------------------------------------------
// Achievements / results wall. Newest year first. PLACEHOLDER entries —
// replace with real competition results.
// ---------------------------------------------------------------------------

export interface Achievement {
  year: string;
  event: string;
  placement: string; // e.g. "1st Place – States", "6th Place – Nationals"
  level: "Regional" | "State" | "National";
  members: string; // PLACEHOLDER names or "DE TSA Team"
}

export const achievements: Achievement[] = [
  { year: "2025", event: "Example Event", placement: "1st Place", level: "State", members: "DE TSA Team (placeholder)" },
  { year: "2025", event: "Example Event", placement: "Top 10", level: "National", members: "DE TSA Team (placeholder)" },
  { year: "2024", event: "Example Event", placement: "2nd Place", level: "State", members: "DE TSA Team (placeholder)" },
];
