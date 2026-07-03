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
  name: "PA State Conference",
  date: "2026-04-15T09:00:00", // PLACEHOLDER. Set the real date/time
  location: "Seven Springs, PA (placeholder)",
};

// The conferences the homepage clock counts down to (it targets the next one
// that is still in the future). SAMPLE dates so the countdown is visible now.
// Replace `date` with the real dates, and fill in `location` when announced
// (leave it "" to show a "Location to be announced" placeholder).
export const conferences: CalendarEvent[] = [
  // Regional has no date yet, so the clock shows the "to be announced"
  // placeholders. Add a date (e.g. "2026-09-12T09:00:00") to start the countdown.
  { name: "Regional Conference", date: "", location: "" },
  { name: "State Conference", date: "2027-02-19T09:00:00", location: "Seven Springs, PA" },
  { name: "National Conference", date: "2027-06-23T09:00:00", location: "Orlando, FL" },
];
