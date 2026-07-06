// ---------------------------------------------------------------------------
// Upcoming dates. The homepage countdown targets `nextCompetition`.
// Set `date` to "" (empty) to show a "no current competitions" message.
// PLACEHOLDER dates. Replace with your real schedule.
// ---------------------------------------------------------------------------

export interface CalendarEvent {
  name: string;
  date: string; // ISO datetime, e.g. "2026-04-15T09:00:00", or "" for none
  location?: string;
}

export const nextCompetition: CalendarEvent = {
  name: "Regional Conference",
  date: "2026-12-05T08:00:00", // PLACEHOLDER. Set the real date/time
  location: "Coming soon",
};

// The conferences the homepage clock counts down to (it targets the next one
// that is still in the future). The Regional date/location are PLACEHOLDERS
// so the countdown targets Regionals first. Replace them with the real
// schedule when announced (leave location "" to show a "to be announced"
// placeholder).
export const conferences: CalendarEvent[] = [
  { name: "Regional Conference", date: "2026-12-05T08:00:00", location: "Coming soon" },
  { name: "State Conference", date: "2027-02-19T09:00:00", location: "Seven Springs, PA" },
  { name: "National Conference", date: "2027-06-23T09:00:00", location: "Orlando, FL" },
];
