// ---------------------------------------------------------------------------
// Competitive events catalog. Powers /events (search + filters) and /quiz.
// To add/edit an event, edit an entry below. `id` must stay unique + kebab-case.
// Descriptions are short summaries — link members to the official TSA rules
// for the authoritative requirements (see src/data/resources.ts).
// ---------------------------------------------------------------------------

export const EVENT_CATEGORIES = [
  "Creative & Design",
  "Engineering & Technology",
  "Science & Research",
  "Media & Communication",
  "Academic & Competition",
] as const;

export type EventCategory = (typeof EVENT_CATEGORIES)[number];
export type EventScope = "national" | "pa";
export type Participation = "individual" | "team";

export interface TsaEvent {
  id: string;
  name: string;
  category: EventCategory;
  scope: EventScope;
  /** Smallest allowed number of participants. */
  teamMin: number;
  /** Largest allowed number of participants. */
  teamMax: number;
  blurb: string;
}

/** Convenience: an event counts as "individual" only when it is strictly solo. */
export function participationOf(e: TsaEvent): Participation {
  return e.teamMax === 1 ? "individual" : "team";
}

export function teamSizeLabel(e: TsaEvent): string {
  if (e.teamMax === 1) return "Individual";
  if (e.teamMin === e.teamMax) return `Team of ${e.teamMax}`;
  return `Team of ${e.teamMin}–${e.teamMax}`;
}

export const events: TsaEvent[] = [
  // --- Creative & Design ---------------------------------------------------
  { id: "animatronics", name: "Animatronics", category: "Creative & Design", scope: "national", teamMin: 2, teamMax: 6, blurb: "Design and build a mechanical device that uses sound, lights, and movement to tell a story." },
  { id: "architectural-design", name: "Architectural Design", category: "Creative & Design", scope: "national", teamMin: 1, teamMax: 6, blurb: "Develop architectural plans and a physical model, then present your design solution." },
  { id: "audio-podcasting", name: "Audio Podcasting", category: "Creative & Design", scope: "national", teamMin: 1, teamMax: 6, blurb: "Produce an original podcast episode with scripting, recording, and sound design." },
  { id: "board-game-design", name: "Board Game Design", category: "Creative & Design", scope: "national", teamMin: 2, teamMax: 6, blurb: "Design, build, and package an original, fully playable board game." },
  { id: "childrens-stories", name: "Children's Stories", category: "Creative & Design", scope: "national", teamMin: 1, teamMax: 6, blurb: "Write and illustrate an original children's storybook with supporting documentation." },
  { id: "fashion-design-technology", name: "Fashion Design and Technology", category: "Creative & Design", scope: "national", teamMin: 2, teamMax: 4, blurb: "Design and create a wearable garment that incorporates technology." },
  { id: "music-production", name: "Music Production", category: "Creative & Design", scope: "national", teamMin: 1, teamMax: 6, blurb: "Compose and produce an original musical piece to a given theme." },
  { id: "photographic-technology", name: "Photographic Technology", category: "Creative & Design", scope: "national", teamMin: 1, teamMax: 1, blurb: "Build a portfolio that demonstrates technical and creative imaging expertise." },
  { id: "promotional-design", name: "Promotional Design", category: "Creative & Design", scope: "national", teamMin: 1, teamMax: 1, blurb: "Create a graphic design resource packet that promotes a product or idea." },
  { id: "video-game-design", name: "Video Game Design", category: "Creative & Design", scope: "national", teamMin: 2, teamMax: 6, blurb: "Build an E-rated online game that addresses the annual theme." },
  { id: "vr-visualization", name: "Virtual Reality Visualization", category: "Creative & Design", scope: "national", teamMin: 1, teamMax: 6, blurb: "Create a 2–3 minute virtual reality experience." },
  { id: "webmaster", name: "Webmaster", category: "Creative & Design", scope: "national", teamMin: 2, teamMax: 6, blurb: "Design, build, and launch a website on an assigned topic." },

  // --- Engineering & Technology -------------------------------------------
  { id: "cad-architecture", name: "CAD Architecture", category: "Engineering & Technology", scope: "national", teamMin: 1, teamMax: 1, blurb: "Produce architectural technical drawings using computer-aided design tools." },
  { id: "cad-engineering", name: "CAD Engineering", category: "Engineering & Technology", scope: "national", teamMin: 1, teamMax: 1, blurb: "Create 3D engineering representations using computer-aided design tools." },
  { id: "dragster-design", name: "Dragster Design", category: "Engineering & Technology", scope: "national", teamMin: 1, teamMax: 1, blurb: "Design and build a CO2-powered dragster optimized for speed." },
  { id: "drone-challenge", name: "Drone Challenge (UAV)", category: "Engineering & Technology", scope: "national", teamMin: 2, teamMax: 6, blurb: "Design, build, and fly an unmanned aerial vehicle through a series of tasks." },
  { id: "engineering-design", name: "Engineering Design", category: "Engineering & Technology", scope: "national", teamMin: 3, teamMax: 6, blurb: "Engineer a solution to one of the NAE Grand Challenges and document the process." },
  { id: "flight-endurance", name: "Flight Endurance", category: "Engineering & Technology", scope: "national", teamMin: 1, teamMax: 1, blurb: "Construct a rubber-band-powered model aircraft for maximum flight time." },
  { id: "manufacturing-prototype", name: "Manufacturing Prototype", category: "Engineering & Technology", scope: "national", teamMin: 2, teamMax: 6, blurb: "Fabricate a product using computer-integrated manufacturing processes." },
  { id: "senior-solar-sprint", name: "Senior Solar Sprint", category: "Engineering & Technology", scope: "national", teamMin: 2, teamMax: 4, blurb: "Build and race a model solar-powered vehicle (requires AEOP registration)." },
  { id: "structural-design", name: "Structural Design and Engineering", category: "Engineering & Technology", scope: "national", teamMin: 2, teamMax: 2, blurb: "Design and construct a load-bearing structure that maximizes efficiency." },
  { id: "system-control-technology", name: "System Control Technology", category: "Engineering & Technology", scope: "national", teamMin: 3, teamMax: 3, blurb: "Build and program a computer-controlled mechanical model to solve a problem." },
  { id: "technology-problem-solving", name: "Technology Problem Solving", category: "Engineering & Technology", scope: "national", teamMin: 2, teamMax: 2, blurb: "Solve a timed (90-minute) on-site design-and-build challenge." },
  { id: "transportation-modeling", name: "Transportation Modeling", category: "Engineering & Technology", scope: "national", teamMin: 1, teamMax: 1, blurb: "Produce a precise scale model of a transportation vehicle." },
  { id: "vex-robotics", name: "VEX Robotics Competition", category: "Engineering & Technology", scope: "national", teamMin: 2, teamMax: 15, blurb: "Design, build, and drive a robot in the head-to-head VEX game." },

  // --- Science & Research --------------------------------------------------
  { id: "biotechnology-design", name: "Biotechnology Design", category: "Science & Research", scope: "national", teamMin: 2, teamMax: 6, blurb: "Research and propose a contemporary biotechnology solution." },
  { id: "data-science-analytics", name: "Data Science and Analytics", category: "Science & Research", scope: "national", teamMin: 1, teamMax: 2, blurb: "Analyze a dataset to address a societal issue and present findings." },
  { id: "forensic-science", name: "Forensic Science", category: "Science & Research", scope: "national", teamMin: 2, teamMax: 2, blurb: "Analyze and test crime-scene evidence to draw supported conclusions." },
  { id: "geospatial-technology", name: "Geospatial Technology", category: "Science & Research", scope: "national", teamMin: 2, teamMax: 3, blurb: "Interpret maps and geospatial data to solve a real-world problem." },

  // --- Media & Communication ----------------------------------------------
  { id: "digital-video-production", name: "Digital Video Production", category: "Media & Communication", scope: "national", teamMin: 1, teamMax: 6, blurb: "Produce a short video with a supporting documentation portfolio." },
  { id: "essays-on-technology", name: "Essays on Technology", category: "Media & Communication", scope: "national", teamMin: 1, teamMax: 1, blurb: "Write a research-based essay on a technology topic within a 2-hour window." },
  { id: "extemporaneous-speech", name: "Extemporaneous Speech", category: "Media & Communication", scope: "national", teamMin: 1, teamMax: 1, blurb: "Deliver a 3–5 minute impromptu speech on a drawn topic." },
  { id: "on-demand-video", name: "On Demand Video", category: "Media & Communication", scope: "national", teamMin: 2, teamMax: 6, blurb: "Create a 60-second film on a surprise theme within 36 hours." },
  { id: "prepared-presentation", name: "Prepared Presentation", category: "Media & Communication", scope: "national", teamMin: 1, teamMax: 1, blurb: "Give a 3–5 minute prepared speech on the annual conference theme." },

  // --- Academic & Competition ---------------------------------------------
  { id: "chapter-team", name: "Chapter Team", category: "Academic & Competition", scope: "national", teamMin: 6, teamMax: 6, blurb: "Demonstrate parliamentary procedure knowledge through a test and ceremony." },
  { id: "coding", name: "Coding", category: "Academic & Competition", scope: "national", teamMin: 2, teamMax: 2, blurb: "Develop software solutions under timed constraints." },
  { id: "debating-technological-issues", name: "Debating Technological Issues", category: "Academic & Competition", scope: "national", teamMin: 2, teamMax: 2, blurb: "Research and debate both sides of a current technological issue." },
  { id: "future-technology-teacher", name: "Future Technology Teacher", category: "Academic & Competition", scope: "national", teamMin: 1, teamMax: 1, blurb: "Plan and present a technology lesson as a prospective educator." },
  { id: "software-development", name: "Software Development", category: "Academic & Competition", scope: "national", teamMin: 2, teamMax: 6, blurb: "Build educational or social-impact software and document the process." },
  { id: "technology-bowl", name: "Technology Bowl", category: "Academic & Competition", scope: "national", teamMin: 3, teamMax: 3, blurb: "Compete in an objective test plus a head-to-head quiz on TSA content standards." },

  // --- Pennsylvania-only events -------------------------------------------
  { id: "cybersecurity", name: "Cybersecurity", category: "Engineering & Technology", scope: "pa", teamMin: 2, teamMax: 6, blurb: "Solve Capture-the-Flag style security challenges. (PA-only event.)" },
  { id: "logo-design", name: "Logo Design", category: "Creative & Design", scope: "pa", teamMin: 1, teamMax: 1, blurb: "Design a screen-printable logo for PA-TSA merchandise. (PA-only event.)" },
  { id: "materials-process", name: "Materials Process", category: "Engineering & Technology", scope: "pa", teamMin: 1, teamMax: 1, blurb: "Fabricate a project and document the materials processes used. (PA-only event.)" },
  { id: "pin-design", name: "Pin Design", category: "Creative & Design", scope: "pa", teamMin: 1, teamMax: 1, blurb: "Design a fundraising pin benefiting the American Cancer Society. (PA-only event.)" },
  { id: "rc-off-road-racing", name: "R/C Off-Road Racing", category: "Engineering & Technology", scope: "pa", teamMin: 3, teamMax: 3, blurb: "Build and drive a radio-controlled vehicle through racing and task challenges. (PA-only event.)" },
  { id: "pa-robotics", name: "PA Robotics", category: "Engineering & Technology", scope: "pa", teamMin: 2, teamMax: 4, blurb: "Build a remote-controlled robot for the annual PA-TSA challenge. (PA-only event.)" },
  { id: "safety-illustration", name: "Safety Illustration", category: "Creative & Design", scope: "pa", teamMin: 1, teamMax: 1, blurb: "Create an illustration that promotes safety in technology. (PA-only event.)" },
];
