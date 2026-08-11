// ---------------------------------------------------------------------------
// Annual event themes / design problems.
//
// National TSA publishes a fresh theme for many events every season. This file
// is the one place to update when the 2026-27 themes drop -- the event detail
// pages read from it automatically.
//
// Source: https://tsaweb.org/competitions/themes-and-problems
//   Use the HIGH SCHOOL section (we are a high school chapter). That page
//   paginates -- it only renders 8 events at a time, so walk all four:
//   ?hspage=1, ?hspage=2, ?hspage=3, ?hspage=4
//
// Checked August 2026: the page was still showing the 2025-26 themes (Dragster
// read "No theme for 2026", Webmaster referenced "the 2026 National TSA
// Conference"), so every theme below is intentionally still empty.
// ---------------------------------------------------------------------------

/** The season these themes belong to. Bump this when you paste in new themes. */
export const THEME_SEASON = "2026-27";

/**
 * Events that get an annual theme, keyed by the event id in `src/data/events.ts`.
 *
 * Value = the theme text, copied verbatim from TSA. Leave it "" until TSA
 * posts it; the event page then shows a "not announced yet" note instead.
 * An event that is NOT listed here shows no theme section at all -- that is
 * correct for events like CAD or Flight Endurance, which never have one.
 */
export const eventThemes: Record<string, string> = {
  // --- National events (source: tsaweb.org, HIGH SCHOOL section) -----------
  "animatronics": "",
  "architectural-design": "",
  "audio-podcasting": "",
  "biotechnology-design": "",
  "childrens-stories": "",
  "coding": "",
  "data-science-analytics": "",
  "debating-technological-issues": "",
  "digital-video-production": "",
  "drone-challenge": "",
  "engineering-design": "",
  "fashion-design-technology": "",
  "geospatial-technology": "",
  "manufacturing-prototype": "",
  "music-production": "",
  "photographic-technology": "",
  "prepared-presentation": "",
  "promotional-design": "",
  "software-development": "",
  "structural-design": "",
  "transportation-modeling": "",
  "vex-robotics": "",
  "video-game-design": "",
  "vr-visualization": "",
  "webmaster": "",

  // --- Pennsylvania-only events (source: patsa.org, not National TSA) ------
  // PA-TSA sets its own annual challenge for these.
  "pa-robotics": "",
};

export interface EventTheme {
  season: string;
  text: string;
  /** False while we are still waiting on TSA to publish it. */
  announced: boolean;
}

/** The theme for an event, or null when the event never has one. */
export function themeFor(eventId: string): EventTheme | null {
  const text = eventThemes[eventId];
  if (text === undefined) return null;
  return { season: THEME_SEASON, text, announced: text.trim().length > 0 };
}
