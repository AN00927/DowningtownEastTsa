// ---------------------------------------------------------------------------
// Competitive events catalog. Powers /events (search + filters) and /quiz.
// To add/edit an event, edit an entry below. `id` must stay unique + kebab-case.
// Descriptions are short summaries. Send members to the official TSA rules
// for the full requirements (see src/data/resources.ts).
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
  /** Optional card photo under /public (e.g. "/events/coding.jpg").
      When omitted, the card shows a designed category visual. */
  image?: string;
}

/** Convenience: an event counts as "individual" only when it is strictly solo. */
export function participationOf(e: TsaEvent): Participation {
  return e.teamMax === 1 ? "individual" : "team";
}

export function teamSizeLabel(e: TsaEvent): string {
  if (e.teamMax === 1) return "Individual";
  if (e.teamMin === e.teamMax) return `Team of ${e.teamMax}`;
  return `Team of ${e.teamMin} to ${e.teamMax}`;
}

export const events: TsaEvent[] = [
  // --- Creative & Design ---------------------------------------------------
  { id: "animatronics", name: "Animatronics", category: "Creative & Design", scope: "national", teamMin: 2, teamMax: 6, blurb: "Design and build a mechanical device that uses sound, lights, and movement to tell a story.", image: "/events/animatronics.jpg" },
  { id: "architectural-design", name: "Architectural Design", category: "Creative & Design", scope: "national", teamMin: 1, teamMax: 6, blurb: "Develop architectural plans and a physical model, then present your design solution.", image: "/events/architectural-design.jpg" },
  { id: "board-game-design", name: "Board Game Design", category: "Creative & Design", scope: "national", teamMin: 2, teamMax: 6, blurb: "Design, build, and package an original, fully playable board game.", image: "/events/board-game-design.jpg" },
  { id: "childrens-stories", name: "Children's Stories", category: "Creative & Design", scope: "national", teamMin: 1, teamMax: 6, blurb: "Write and illustrate an original children's storybook with supporting documentation." },
  { id: "fashion-design-technology", name: "Fashion Design and Technology", category: "Creative & Design", scope: "national", teamMin: 2, teamMax: 4, blurb: "Design and create a wearable garment that incorporates technology.", image: "/events/fashion-design-technology.jpg" },
  { id: "music-production", name: "Music Production", category: "Creative & Design", scope: "national", teamMin: 1, teamMax: 6, blurb: "Compose and produce an original musical piece to a given theme.", image: "/events/music-production.jpg" },
  { id: "photographic-technology", name: "Photographic Technology", category: "Creative & Design", scope: "national", teamMin: 1, teamMax: 1, blurb: "Build a portfolio that demonstrates technical and creative imaging expertise.", image: "/events/photographic-technology.jpg" },
  { id: "promotional-design", name: "Promotional Design", category: "Creative & Design", scope: "national", teamMin: 1, teamMax: 1, blurb: "Create a graphic design resource packet that promotes a product or idea.", image: "/events/promotional-design.jpg" },
  { id: "video-game-design", name: "Video Game Design", category: "Creative & Design", scope: "national", teamMin: 2, teamMax: 6, blurb: "Build an E-rated online game that addresses the annual theme.", image: "/events/video-game-design.jpg" },
  { id: "vr-visualization", name: "Virtual Reality Visualization", category: "Creative & Design", scope: "national", teamMin: 1, teamMax: 6, blurb: "Create a 2 to 3 minute virtual reality experience.", image: "/events/vr-visualization.jpg" },
  { id: "webmaster", name: "Webmaster", category: "Creative & Design", scope: "national", teamMin: 2, teamMax: 6, blurb: "Design, build, and launch a website on an assigned topic.", image: "/events/webmaster.jpg" },

  // --- Engineering & Technology (incl. coding / software) -----------------
  { id: "cad-architecture", name: "CAD Architecture", category: "Engineering & Technology", scope: "national", teamMin: 1, teamMax: 1, blurb: "Produce architectural technical drawings using computer-aided design tools.", image: "/events/cad-architecture.jpg" },
  { id: "cad-engineering", name: "CAD Engineering", category: "Engineering & Technology", scope: "national", teamMin: 1, teamMax: 1, blurb: "Create 3D engineering representations using computer-aided design tools.", image: "/events/cad-engineering.jpg" },
  { id: "coding", name: "Coding", category: "Engineering & Technology", scope: "national", teamMin: 2, teamMax: 2, blurb: "Develop software solutions under timed constraints.", image: "/events/coding.jpg" },
  { id: "dragster-design", name: "Dragster Design", category: "Engineering & Technology", scope: "national", teamMin: 1, teamMax: 1, blurb: "Design and build a CO2-powered dragster optimized for speed.", image: "/events/dragster-design.jpg" },
  { id: "drone-challenge", name: "Drone Challenge (UAV)", category: "Engineering & Technology", scope: "national", teamMin: 2, teamMax: 6, blurb: "Design, build, and fly an unmanned aerial vehicle through a series of tasks.", image: "/events/drone-challenge.jpg" },
  { id: "engineering-design", name: "Engineering Design", category: "Engineering & Technology", scope: "national", teamMin: 3, teamMax: 6, blurb: "Engineer a solution to one of the NAE Grand Challenges and document the process.", image: "/events/engineering-design.jpg" },
  { id: "flight-endurance", name: "Flight Endurance", category: "Engineering & Technology", scope: "national", teamMin: 1, teamMax: 1, blurb: "Construct a rubber-band-powered model aircraft for maximum flight time.", image: "/events/flight-endurance.jpg" },
  { id: "manufacturing-prototype", name: "Manufacturing Prototype", category: "Engineering & Technology", scope: "national", teamMin: 2, teamMax: 6, blurb: "Fabricate a product using computer-integrated manufacturing processes.", image: "/events/manufacturing-prototype.jpg" },
  { id: "senior-solar-sprint", name: "Senior Solar Sprint", category: "Engineering & Technology", scope: "national", teamMin: 2, teamMax: 4, blurb: "Build and race a model solar-powered vehicle (requires AEOP registration).", image: "/events/senior-solar-sprint.jpg" },
  { id: "software-development", name: "Software Development", category: "Engineering & Technology", scope: "national", teamMin: 2, teamMax: 6, blurb: "Build educational or social-impact software and document the process.", image: "/events/software-development.jpg" },
  { id: "structural-design", name: "Structural Design and Engineering", category: "Engineering & Technology", scope: "national", teamMin: 2, teamMax: 2, blurb: "Design and construct a load-bearing structure that maximizes efficiency.", image: "/events/structural-design.jpg" },
  { id: "system-control-technology", name: "System Control Technology", category: "Engineering & Technology", scope: "national", teamMin: 3, teamMax: 3, blurb: "Build and program a computer-controlled mechanical model to solve a problem.", image: "/events/system-control-technology.jpg" },
  { id: "technology-problem-solving", name: "Technology Problem Solving", category: "Engineering & Technology", scope: "national", teamMin: 2, teamMax: 2, blurb: "Solve a timed (90-minute) on-site design-and-build challenge.", image: "/events/technology-problem-solving.jpg" },
  { id: "transportation-modeling", name: "Transportation Modeling", category: "Engineering & Technology", scope: "national", teamMin: 1, teamMax: 1, blurb: "Produce a precise scale model of a transportation vehicle.", image: "/events/transportation-modeling.jpg" },
  { id: "vex-robotics", name: "VEX Robotics Competition", category: "Engineering & Technology", scope: "national", teamMin: 2, teamMax: 15, blurb: "Design, build, and drive a robot in the head-to-head VEX game.", image: "/events/vex-robotics.jpg" },

  // --- Science & Research --------------------------------------------------
  { id: "biotechnology-design", name: "Biotechnology Design", category: "Science & Research", scope: "national", teamMin: 2, teamMax: 6, blurb: "Research and propose a contemporary biotechnology solution.", image: "/events/biotechnology-design.jpg" },
  { id: "data-science-analytics", name: "Data Science and Analytics", category: "Science & Research", scope: "national", teamMin: 1, teamMax: 2, blurb: "Analyze a dataset to address a societal issue and present findings.", image: "/events/data-science-analytics.jpg" },
  { id: "forensic-science", name: "Forensic Science", category: "Science & Research", scope: "national", teamMin: 2, teamMax: 2, blurb: "Analyze and test crime-scene evidence to draw supported conclusions.", image: "/events/forensic-science.jpg" },
  { id: "geospatial-technology", name: "Geospatial Technology", category: "Science & Research", scope: "national", teamMin: 1, teamMax: 3, blurb: "Interpret geospatial data and build a digital portfolio of maps, data, and findings." },

  // --- Media & Communication (incl. podcasting / debate) ------------------
  { id: "audio-podcasting", name: "Audio Podcasting", category: "Media & Communication", scope: "national", teamMin: 1, teamMax: 6, blurb: "Produce an original podcast episode with scripting, recording, and sound design.", image: "/events/audio-podcasting.jpg" },
  { id: "debating-technological-issues", name: "Debating Technological Issues", category: "Media & Communication", scope: "national", teamMin: 2, teamMax: 2, blurb: "Research and debate both sides of a current technological issue.", image: "/events/debating-technological-issues.jpg" },
  { id: "digital-video-production", name: "Digital Video Production", category: "Media & Communication", scope: "national", teamMin: 1, teamMax: 6, blurb: "Produce a short video with a supporting documentation portfolio.", image: "/events/digital-video-production.jpg" },
  { id: "essays-on-technology", name: "Essays on Technology", category: "Media & Communication", scope: "national", teamMin: 1, teamMax: 1, blurb: "Write a research-based essay on a technology topic within a 2-hour window.", image: "/events/essays-on-technology.jpg" },
  { id: "extemporaneous-speech", name: "Extemporaneous Speech", category: "Media & Communication", scope: "national", teamMin: 1, teamMax: 1, blurb: "Deliver a 3 to 5 minute impromptu speech on a drawn topic.", image: "/events/extemporaneous-speech.jpg" },
  { id: "on-demand-video", name: "On Demand Video", category: "Media & Communication", scope: "national", teamMin: 2, teamMax: 6, blurb: "Create a 60-second film on a surprise theme within 36 hours." },
  { id: "prepared-presentation", name: "Prepared Presentation", category: "Media & Communication", scope: "national", teamMin: 1, teamMax: 1, blurb: "Give a 3 to 5 minute prepared speech on the annual conference theme.", image: "/events/prepared-presentation.jpg" },

  // --- Academic & Leadership -----------------------------------------------
  { id: "chapter-team", name: "Chapter Team", category: "Academic & Competition", scope: "national", teamMin: 6, teamMax: 6, blurb: "Demonstrate parliamentary procedure knowledge through a test and ceremony.", image: "/events/chapter-team.jpg" },
  { id: "future-technology-teacher", name: "Future Technology Teacher", category: "Academic & Competition", scope: "national", teamMin: 1, teamMax: 1, blurb: "Plan and present a technology lesson as a prospective educator.", image: "/events/future-technology-teacher.jpg" },
  { id: "technology-bowl", name: "Technology Bowl", category: "Academic & Competition", scope: "national", teamMin: 3, teamMax: 3, blurb: "Compete in an objective test plus a head-to-head quiz on TSA content standards.", image: "/events/technology-bowl.jpg" },

  // --- Pennsylvania-only events -------------------------------------------
  { id: "cybersecurity", name: "Cybersecurity", category: "Engineering & Technology", scope: "pa", teamMin: 2, teamMax: 6, blurb: "Solve Capture-the-Flag style security challenges. (PA-only event.)", image: "/events/cybersecurity.jpg" },
  { id: "logo-design", name: "Logo Design", category: "Creative & Design", scope: "pa", teamMin: 1, teamMax: 1, blurb: "Design a screen-printable logo for PA-TSA merchandise. (PA-only event.)", image: "/events/logo-design.jpg" },
  { id: "materials-process", name: "Materials Process", category: "Engineering & Technology", scope: "pa", teamMin: 1, teamMax: 1, blurb: "Fabricate a project and document the materials processes used. (PA-only event.)", image: "/events/materials-process.jpg" },
  { id: "pin-design", name: "Pin Design", category: "Creative & Design", scope: "pa", teamMin: 1, teamMax: 1, blurb: "Design a fundraising pin benefiting the American Cancer Society. (PA-only event.)", image: "/events/pin-design.jpg" },
  { id: "rc-off-road-racing", name: "R/C Off-Road Racing", category: "Engineering & Technology", scope: "pa", teamMin: 3, teamMax: 3, blurb: "Build and drive a radio-controlled vehicle through racing and task challenges. (PA-only event.)", image: "/events/rc-off-road-racing.jpg" },
  { id: "pa-robotics", name: "PA Robotics", category: "Engineering & Technology", scope: "pa", teamMin: 2, teamMax: 4, blurb: "Build a remote-controlled robot for the annual PA-TSA challenge. (PA-only event.)", image: "/events/pa-robotics.jpg" },
  { id: "safety-illustration", name: "Safety Illustration", category: "Creative & Design", scope: "pa", teamMin: 1, teamMax: 1, blurb: "Create an illustration that promotes safety in technology. (PA-only event.)", image: "/events/safety-illustration.jpg" },
];
