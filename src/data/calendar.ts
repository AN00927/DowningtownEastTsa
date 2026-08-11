// ---------------------------------------------------------------------------
// Upcoming dates. The homepage countdown targets the next dated conference.
// Set `date` to "" (empty) to show a "date to be announced" message.
//
// 2026-2027 season, from the official schedules:
//   Regional (Region 5): patsa.org/conferences_and_events/regional_conferences/
//   State / National:    patsa.org/conferences_and_events/
// Downingtown East competes in PA-TSA Region 5.
// ---------------------------------------------------------------------------

export interface CalendarEvent {
  name: string;
  date: string; // ISO datetime, e.g. "2027-04-14T09:00:00", or "" for none
  /** Last day of a multi-day conference (ISO date). Omit for single-day events. */
  endDate?: string;
  location?: string;
}

/** Parse as local time so a date-only string is not shifted a day by UTC. */
function toLocalDate(iso: string): Date {
  return new Date(iso.includes("T") ? iso : `${iso}T00:00:00`);
}

/**
 * "January 16, 2027" for a single day, "April 14-17, 2027" for a multi-day
 * conference (spelling out both months when the range crosses one).
 */
export function formatConferenceDate(date: string, endDate?: string): string {
  const start = toLocalDate(date);
  const year = start.getFullYear();
  const startLabel = start.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
  if (!endDate) return `${startLabel}, ${year}`;

  const end = toLocalDate(endDate);
  const sameMonth =
    end.getFullYear() === year && end.getMonth() === start.getMonth();
  const endLabel = end.toLocaleDateString("en-US", {
    day: "numeric",
    ...(sameMonth ? {} : { month: "long" }),
    ...(end.getFullYear() === year ? {} : { year: "numeric" }),
  });
  return end.getFullYear() === year
    ? `${startLabel}–${endLabel}, ${year}`
    : `${startLabel}, ${year}–${endLabel}`;
}

export const nextCompetition: CalendarEvent = {
  name: "Regional Conference",
  date: "2027-01-16T08:00:00",
  location: "Downingtown STEM Academy, Downingtown, PA",
};

// The conferences the homepage clock counts down to (it targets the next one
// that is still in the future). Leave `date` empty to show a "date to be
// announced" note instead of a countdown, and `location` empty for the
// matching location placeholder.
export const conferences: CalendarEvent[] = [
  {
    name: "Regional Conference",
    date: "2027-01-16T08:00:00",
    location: "Downingtown STEM Academy, Downingtown, PA",
  },
  {
    name: "State Conference",
    date: "2027-04-14T09:00:00",
    endDate: "2027-04-17",
    location: "Seven Springs Resort, Seven Springs, PA",
  },
  {
    name: "National Conference",
    date: "2027-06-23T09:00:00",
    endDate: "2027-06-27",
    location: "Rosen Shingle Creek, Orlando, FL",
  },
];
