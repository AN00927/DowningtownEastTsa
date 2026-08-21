// ---------------------------------------------------------------------------
// Annual event themes / design problems.
//
// National TSA publishes a fresh theme for many events every season. This file
// is the one place to update when new themes drop -- the event detail pages
// read from it automatically.
//
// Source: https://tsaweb.org/competitions/themes-and-problems
//   Use the HIGH SCHOOL section (we are a high school chapter). That page
//   paginates -- it only renders 8 events at a time, so walk all four:
//   ?hspage=1, ?hspage=2, ?hspage=3, ?hspage=4
//
// Updated for 2026-27: TSA has posted this season's themes, and they are
// copied in below. A few events (Architectural Design, Drone Challenge,
// Robotics, Structural Design) publish the full problem as a PDF -- for those
// we summarize and point to the official page.
//
// When the 2027-28 themes drop: bump THEME_SEASON and replace the strings.
// Setting a value back to "" makes that event show a "not announced yet" note.
// ---------------------------------------------------------------------------

/** The season these themes belong to. Bump this when you paste in new themes. */
export const THEME_SEASON = "2026-27";

/**
 * Events that get an annual theme, keyed by the event id in `src/data/events.ts`.
 *
 * Value = the theme text, copied from TSA. Leave it "" until TSA posts it; the
 * event page then shows a "not announced yet" note instead. An event that is
 * NOT listed here shows no theme section at all -- that is correct for events
 * like CAD or Flight Endurance, which never have one.
 */
export const eventThemes: Record<string, string> = {
  // --- National events (source: tsaweb.org, HIGH SCHOOL section) -----------
  "animatronics":
    "Turning classic tales into a mechanical marvel. Bring a story to life following the Animatronics rules.",
  "architectural-design":
    "TSA publishes the full Architectural Design problem as a PDF. Open the official themes and problems page below for this season's design problem.",
  "audio-podcasting":
    "The Debate Desk. Create a podcast that presents multiple perspectives on a controversial topic in STEM, society, education, health, or the environment.",
  "biotechnology-design":
    "Biosensors for Disease Detection. Present the science behind biosensors and demonstrate one use of biosensor technology in detecting or monitoring disease.",
  "childrens-stories": "A graphic novel/comic book. Binding cannot be stapled.",
  "data-science-analytics":
    "Identify and use one AI-generated dataset related to Climate and Environmental Sustainability for analysis and research. Competitors may use an artificial intelligence tool to create the dataset, provide the resulting data file in a structured format (such as CSV, XLSX, or JSON), and cite the artificial intelligence tool, model (if available), and prompts or queries used to generate the dataset.",
  "debating-technological-issues":
    "Artificial Intelligence in Medicine. Topic 1: AI diagnostic tools should be allowed to make medical decisions without final approval from a physician. Topic 2: The use of AI in healthcare will improve access to care more than it will increase medical bias. Topic 3: Patients should have the right to know when AI is involved in their diagnosis or treatment plan.",
  "digital-video-production":
    "Create an infomercial with a product and in the style of the 1990s.",
  "dragster-design":
    "INSIDE / OUT. One axle must feature internal wheels while the opposite axle uses external wheels, with specific enclosure requirements for each configuration.",
  "drone-challenge":
    "Humanitarian Aid and Rescue. TSA publishes the full problem as a PDF -- see the official themes and problems page below.",
  "engineering-design":
    "Engineering the Future of Energy: engineering solutions that improve the generation, storage, conservation, distribution, or use of energy.",
  "fashion-design-technology":
    "Garments crafted from recycled or repurposed materials, limited to one complete outfit with a maximum of two pieces.",
  "hybrid-racer-xl":
    "Transport a 5-ounce fishing weight via a rear hitch attachment on the model solar track surface.",
  "interior-design":
    "Tiny Living, Big Impact. Design an interior for a tiny home community model serving young adults, incorporating living, kitchen, sleeping, bathroom, workspace, and storage areas with multifunctional solutions within a $28,000 budget.",
  "manufacturing-prototype":
    "Display or container for small collectible items.",
  "music-production":
    "Compose an original, dynamic soundtrack for a climactic video game boss battle in a futuristic or fantasy setting, with escalating tension and dramatic contrasts.",
  "photographic-technology": "Behind the scenes.",
  "prepared-presentation":
    "Many technologies begin as science fiction before becoming reality. Choose one technology that was once considered futuristic and is now used today. Describe its development, current applications, and how it may continue to evolve in the future.",
  "promotional-design":
    "Design branding and promotional materials for Milestone Diner, a retro 1978-inspired establishment. Required deliverables: a logo, a bifold menu, a business card, and an Instagram advertisement (4:5 vertical ratio).",
  "robotics":
    "TSA publishes the full Robotics challenge as a PDF. Open the official themes and problems page below for this season's problem.",
  "software-development":
    "Develop a software application that improves how people learn, teach, practice, or develop new skills.",
  "stem-mass-media":
    "Headline: “Scientists link human right-handedness to walking upright and brain evolution.” Develop a news broadcast covering this topic with an introduction, a summary, and future implications.",
  "structural-design":
    "TSA publishes the full Structural Design and Engineering problem statement as a PDF -- see the official themes and problems page below.",
  "transportation-modeling": "Cartoon/comic vehicles.",
  "video-game-design":
    "Create a deep space-themed RPG where the primary method of progression is puzzle-solving rather than combat.",
  "vlogging":
    "The Butterfly Effect. Small actions can create extraordinary change.",
  "vr-simulation":
    "High-speed first aid immersive simulation. Develop a VR experience that evaluates life-saving interventions under pressure.",
  "webmaster": "Artificial Intelligence (AI) learning portal.",

  // --- Pennsylvania-only events (source: patsa.org, not National TSA) ------
  // PA-TSA sets its own annual challenge for these.
  "battling-bots": "",
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
