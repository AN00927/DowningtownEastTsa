// ---------------------------------------------------------------------------
// The season, month by month: what happens when, and what a student has to do
// about it.
//
// Source: the PA-TSA advisor timeline at
// <https://www.patsa.org/membership/advisor_timeline/>, which publishes the
// rhythm of the season but not exact dates.
//
// PA-TSA posts exact regional dates and deadlines once the season is set. When
// they do, fill in `date` on the relevant steps. A step with an empty `date`
// renders an "announced soon" note instead of a date, so nothing here ever
// shows a deadline the chapter has not confirmed.
// ---------------------------------------------------------------------------

export interface SeasonStep {
  /** Month or span the step falls in, e.g. "October" or "January - February". */
  window: string;
  title: string;
  /** What the student actually needs to do. Keep it to one sentence. */
  detail: string;
  /**
   * Exact date once announced, as a display string (e.g. "December 19").
   * Leave "" until PA-TSA or the chapter confirms it.
   */
  date: string;
  /** True for the steps a student can miss and be shut out of competing. */
  critical?: boolean;
}

export const seasonSteps: SeasonStep[] = [
  {
    window: "September",
    title: "Join the chapter",
    detail:
      "Come to a meeting, get on the roster, and start looking at events. You do not need to know your event yet.",
    date: "",
  },
  {
    window: "September",
    title: "Register and pick your events",
    detail:
      "Chapter registration goes in through iServices. Choose your events and find your team.",
    date: "",
    critical: true,
  },
  {
    window: "October - November",
    title: "Build and prepare",
    detail:
      "Event lists are final by now. Read your rules, start your portfolio, and get build work underway.",
    date: "",
  },
  {
    window: "December",
    title: "Regional registration closes",
    detail:
      "The last point at which you can be entered for Regionals. It usually closes about two weeks before the conference.",
    date: "",
    critical: true,
  },
  {
    window: "January",
    title: "Early submissions open and close",
    detail:
      "Events with work submitted ahead of the conference open a portal for about a week. Miss it and the entry does not score.",
    date: "",
    critical: true,
  },
  {
    window: "January - February",
    title: "Regional Conference",
    detail:
      "Every qualifying event runs here. Place well enough and you advance to States.",
    date: "",
  },
  {
    window: "February - March",
    title: "State registration and rooming",
    detail:
      "If you advanced, registration, hotel rooming lists, medical forms, and fees are all due in this window.",
    date: "",
    critical: true,
  },
  {
    window: "April",
    title: "State Conference",
    detail:
      "Four days at Seven Springs. Top finishers here qualify for the National Conference.",
    date: "",
  },
  {
    window: "June",
    title: "National Conference",
    detail:
      "The end of the road for the season, and the reason for all of the above.",
    date: "",
  },
];
