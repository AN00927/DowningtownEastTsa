// ---------------------------------------------------------------------------
// Upcoming dates. The homepage countdown targets `nextCompetition`.
// Set `date` to "" (empty) to show a "no current competitions" message.
// PLACEHOLDER dates — replace with your real schedule.
// ---------------------------------------------------------------------------

export interface CalendarEvent {
  name: string;
  date: string; // ISO datetime, e.g. "2026-04-15T09:00:00" — or "" for none
  location?: string;
}

export const nextCompetition: CalendarEvent = {
  name: "PA-TSA State Conference",
  date: "2026-04-15T09:00:00", // PLACEHOLDER — set the real date/time
  location: "Seven Springs, PA (placeholder)",
};

// Optional list shown as a simple schedule on the homepage. PLACEHOLDER.
export const upcoming: CalendarEvent[] = [
  { name: "Chapter Meeting", date: "2025-09-10T15:00:00", location: "Room TBD" },
  { name: "Event Sign-up Deadline", date: "2025-10-01T23:59:00" },
  { name: "Regional Competition", date: "2026-02-20T09:00:00", location: "TBD" },
];
