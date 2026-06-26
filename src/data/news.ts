// ---------------------------------------------------------------------------
// Announcements / News. Add newest items at the TOP of the array.
// `date` is ISO (YYYY-MM-DD). `body` supports plain paragraphs (split on \n\n).
// These are PLACEHOLDER entries — replace with real announcements.
// ---------------------------------------------------------------------------

export interface NewsPost {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  excerpt: string;
  body: string;
}

export const news: NewsPost[] = [
  {
    slug: "welcome-to-the-new-season",
    title: "Welcome to the new TSA season!",
    date: "2025-09-02",
    excerpt:
      "Kick off the year with us — meetings, event sign-ups, and everything you need to get started.",
    body:
      "Welcome back, members! This is a placeholder announcement.\n\nReplace this with your real kickoff details: when and where meetings are held, how to sign up for events, and key dates for the season.",
  },
  {
    slug: "event-signups-open",
    title: "Event sign-ups are now open",
    date: "2025-09-16",
    excerpt:
      "Browse the competitive events and pick yours before the deadline. Not sure? Take the Find My Event quiz.",
    body:
      "Placeholder: describe how members choose and register for events here.\n\nLink members to the Events page and the Find My Event quiz to help them decide.",
  },
  {
    slug: "lunch-n-learn-schedule",
    title: "Lunch n' Learn schedule posted",
    date: "2025-10-01",
    excerpt:
      "Drop in during Lunch n' Learn for help with documentation, rules, and event prep.",
    body:
      "Placeholder: add the Lunch n' Learn dates, room, and topics here.",
  },
];
