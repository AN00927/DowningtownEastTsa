// ---------------------------------------------------------------------------
// Competitive events catalog. Powers /events (search + filters) and /quiz.
// To add/edit an event, edit an entry below. `id` must stay unique + kebab-case.
// Descriptions are short summaries. Send members to the official TSA rules
// for the full requirements (see src/data/resources.ts).
//
// Updated for the 2026-27 season.
//   National list (42 events): https://tsaweb.org/competitions/high-school
//     and https://patsa.org/competitions/highschool/
//   PA-only list (7 HS events): "PA-TSA Competitive Events 2026" rulebook,
//     linked from https://www.patsa.org/competitions/paonly/
//
// New this season: Artificial Intelligence, Automated Manufacturing Systems,
//   Hybrid Racer XL, Interior Design, Robotics, STEM Mass Media, and Vlogging.
//   Cybersecurity is now a NATIONAL event (it used to be PA-only), Medical
//   Technology joins the PA-only list, and PA Robotics is now Battling Bots.
// Retired: Coding, Essays on Technology, Geospatial Technology, Senior Solar
//   Sprint (replaced by Hybrid Racer XL), System Control Technology, and VEX
//   Robotics (replaced by Robotics).
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
  { id: "childrens-stories", name: "Children's Stories", category: "Creative & Design", scope: "national", teamMin: 1, teamMax: 6, blurb: "Write and illustrate an original children's story with supporting documentation.", image: "/events/childrens-stories.jpg" },
  { id: "fashion-design-technology", name: "Fashion Design and Technology", category: "Creative & Design", scope: "national", teamMin: 2, teamMax: 4, blurb: "Design and create a wearable garment that meets the annual design challenge.", image: "/events/fashion-design-technology.jpg" },
  { id: "interior-design", name: "Interior Design", category: "Creative & Design", scope: "national", teamMin: 2, teamMax: 2, blurb: "Build color and material design boards that solve the annual interior design challenge.", image: "/events/interior-design.jpg" },
  { id: "music-production", name: "Music Production", category: "Creative & Design", scope: "national", teamMin: 1, teamMax: 6, blurb: "Compose and produce an original musical piece to a given theme.", image: "/events/music-production.jpg" },
  { id: "photographic-technology", name: "Photographic Technology", category: "Creative & Design", scope: "national", teamMin: 1, teamMax: 1, blurb: "Build a portfolio that demonstrates technical and creative imaging expertise.", image: "/events/photographic-technology.jpg" },
  { id: "promotional-design", name: "Promotional Design", category: "Creative & Design", scope: "national", teamMin: 1, teamMax: 1, blurb: "Create a graphic design resource packet that promotes a product or idea.", image: "/events/promotional-design.jpg" },
  { id: "video-game-design", name: "Video Game Design", category: "Creative & Design", scope: "national", teamMin: 2, teamMax: 6, blurb: "Build an E-rated online game that addresses the annual theme.", image: "/events/video-game-design.jpg" },
  { id: "vr-simulation", name: "Virtual Reality Simulation (VR)", category: "Creative & Design", scope: "national", teamMin: 1, teamMax: 6, blurb: "Create a 2 to 3 minute virtual reality simulation that addresses the annual theme.", image: "/events/vr-simulation.jpg" },
  { id: "webmaster", name: "Webmaster", category: "Creative & Design", scope: "national", teamMin: 2, teamMax: 6, blurb: "Design, build, and launch a website that addresses the annual challenge.", image: "/events/webmaster.jpg" },

  // --- Engineering & Technology (incl. computing / robotics) ---------------
  { id: "artificial-intelligence", name: "Artificial Intelligence", category: "Engineering & Technology", scope: "national", teamMin: 2, teamMax: 2, blurb: "Take a test on AI concepts, then solve an on-site problem using generative AI tools.", image: "/events/artificial-intelligence.jpg" },
  { id: "automated-manufacturing-systems", name: "Automated Manufacturing Systems", category: "Engineering & Technology", scope: "national", teamMin: 2, teamMax: 3, blurb: "Engineer and prototype a sensor-based automated system that solves a production problem.", image: "/events/automated-manufacturing-systems.jpg" },
  { id: "cad-architecture", name: "CAD Architecture", category: "Engineering & Technology", scope: "national", teamMin: 1, teamMax: 1, blurb: "Produce architectural technical drawings using computer-aided design tools.", image: "/events/cad-architecture.jpg" },
  { id: "cad-engineering", name: "CAD Engineering", category: "Engineering & Technology", scope: "national", teamMin: 1, teamMax: 1, blurb: "Create 3D engineering representations using computer-aided design tools.", image: "/events/cad-engineering.jpg" },
  { id: "cybersecurity", name: "Cybersecurity", category: "Engineering & Technology", scope: "national", teamMin: 2, teamMax: 4, blurb: "Identify security breaches through Capture-the-Flag style challenges.", image: "/events/cybersecurity.jpg" },
  { id: "dragster-design", name: "Dragster Design", category: "Engineering & Technology", scope: "national", teamMin: 1, teamMax: 1, blurb: "Design and build a CO2-powered dragster that meets the annual design problem.", image: "/events/dragster-design.jpg" },
  { id: "drone-challenge", name: "Drone Challenge (UAV)", category: "Engineering & Technology", scope: "national", teamMin: 2, teamMax: 6, blurb: "Design, build, and fly an unmanned aerial vehicle through a series of tasks.", image: "/events/drone-challenge.jpg" },
  { id: "engineering-design", name: "Engineering Design", category: "Engineering & Technology", scope: "national", teamMin: 3, teamMax: 6, blurb: "Engineer a solution to the annual grand-challenge theme and document the process.", image: "/events/engineering-design.jpg" },
  { id: "flight-endurance", name: "Flight Endurance", category: "Engineering & Technology", scope: "national", teamMin: 1, teamMax: 1, blurb: "Construct a rubber-band-powered model aircraft for maximum flight time.", image: "/events/flight-endurance.jpg" },
  { id: "hybrid-racer-xl", name: "Hybrid Racer XL", category: "Engineering & Technology", scope: "national", teamMin: 2, teamMax: 4, blurb: "Design, build, and race a dual-powered (solar and battery) model car.", image: "/events/hybrid-racer-xl.jpg" },
  { id: "manufacturing-prototype", name: "Manufacturing Prototype", category: "Engineering & Technology", scope: "national", teamMin: 2, teamMax: 6, blurb: "Fabricate a product using computer-integrated manufacturing processes.", image: "/events/manufacturing-prototype.jpg" },
  { id: "robotics", name: "Robotics", category: "Engineering & Technology", scope: "national", teamMin: 2, teamMax: 6, blurb: "Design, build, and drive a robot made from open-source parts for the annual challenge.", image: "/events/robotics.jpg" },
  { id: "software-development", name: "Software Development", category: "Engineering & Technology", scope: "national", teamMin: 2, teamMax: 6, blurb: "Build software around the annual theme and document your development process.", image: "/events/software-development.jpg" },
  { id: "structural-design", name: "Structural Design and Engineering", category: "Engineering & Technology", scope: "national", teamMin: 2, teamMax: 2, blurb: "Design and construct a load-bearing structure that meets the annual challenge.", image: "/events/structural-design.jpg" },
  { id: "technology-problem-solving", name: "Technology Problem Solving", category: "Engineering & Technology", scope: "national", teamMin: 2, teamMax: 2, blurb: "Solve a timed on-site design-and-build challenge.", image: "/events/technology-problem-solving.jpg" },
  { id: "transportation-modeling", name: "Transportation Modeling", category: "Engineering & Technology", scope: "national", teamMin: 1, teamMax: 1, blurb: "Produce a precise scale model of a vehicle that fits the annual design problem.", image: "/events/transportation-modeling.jpg" },

  // --- Science & Research --------------------------------------------------
  { id: "biotechnology-design", name: "Biotechnology Design", category: "Science & Research", scope: "national", teamMin: 2, teamMax: 6, blurb: "Research and propose a solution to the annual biotechnology problem.", image: "/events/biotechnology-design.jpg" },
  { id: "data-science-analytics", name: "Data Science and Analytics", category: "Science & Research", scope: "national", teamMin: 1, teamMax: 2, blurb: "Analyze a dataset on the annual topic and present your findings on a scientific poster.", image: "/events/data-science-analytics.jpg" },
  { id: "forensic-science", name: "Forensic Science", category: "Science & Research", scope: "national", teamMin: 2, teamMax: 2, blurb: "Analyze and test crime-scene evidence to draw supported conclusions.", image: "/events/forensic-science.jpg" },

  // --- Media & Communication ----------------------------------------------
  { id: "audio-podcasting", name: "Audio Podcasting", category: "Media & Communication", scope: "national", teamMin: 1, teamMax: 6, blurb: "Produce an original podcast episode with scripting, recording, and sound design.", image: "/events/audio-podcasting.jpg" },
  { id: "debating-technological-issues", name: "Debating Technological Issues", category: "Media & Communication", scope: "national", teamMin: 2, teamMax: 2, blurb: "Research and debate both sides of the annual technological topic.", image: "/events/debating-technological-issues.jpg" },
  { id: "digital-video-production", name: "Digital Video Production", category: "Media & Communication", scope: "national", teamMin: 1, teamMax: 6, blurb: "Produce a short video on the annual theme with a documentation portfolio.", image: "/events/digital-video-production.jpg" },
  { id: "extemporaneous-speech", name: "Extemporaneous Speech", category: "Media & Communication", scope: "national", teamMin: 1, teamMax: 1, blurb: "Deliver a 3 to 5 minute impromptu speech on a drawn topic.", image: "/events/extemporaneous-speech.jpg" },
  { id: "on-demand-video", name: "On Demand Video", category: "Media & Communication", scope: "national", teamMin: 2, teamMax: 6, blurb: "Create a 60-second film on a surprise theme within 36 hours.", image: "/events/on-demand-video.jpg" },
  { id: "prepared-presentation", name: "Prepared Presentation", category: "Media & Communication", scope: "national", teamMin: 1, teamMax: 1, blurb: "Give a 3 to 5 minute prepared speech on the annual conference theme.", image: "/events/prepared-presentation.jpg" },
  { id: "stem-mass-media", name: "STEM Mass Media", category: "Media & Communication", scope: "national", teamMin: 2, teamMax: 6, blurb: "Cover the annual news story as a video broadcast, then as a written digital article.", image: "/events/stem-mass-media.jpg" },
  { id: "vlogging", name: "Vlogging", category: "Media & Communication", scope: "national", teamMin: 2, teamMax: 6, blurb: "Create a vlog series that brings the annual technology theme to life.", image: "/events/vlogging.jpg" },

  // --- Academic & Leadership -----------------------------------------------
  { id: "chapter-team", name: "Chapter Team", category: "Academic & Competition", scope: "national", teamMin: 6, teamMax: 6, blurb: "Demonstrate parliamentary procedure knowledge through a test and ceremony.", image: "/events/chapter-team.jpg" },
  { id: "future-technology-teacher", name: "Future Technology Teacher", category: "Academic & Competition", scope: "national", teamMin: 1, teamMax: 1, blurb: "Plan and present a technology lesson as a prospective educator.", image: "/events/future-technology-teacher.jpg" },
  { id: "technology-bowl", name: "Technology Bowl", category: "Academic & Competition", scope: "national", teamMin: 3, teamMax: 3, blurb: "Compete in an objective test plus a head-to-head quiz on TSA content standards.", image: "/events/technology-bowl.jpg" },

  // --- Pennsylvania-only events (PA-TSA Competitive Events 2026 rulebook) ---
  { id: "battling-bots", name: "Battling Bots", category: "Engineering & Technology", scope: "pa", teamMin: 2, teamMax: 6, blurb: "Build a remote-controlled bot and face off in a gladiator-style tournament. (PA-only event.)", image: "/events/battling-bots.jpg" },
  { id: "logo-design", name: "Logo Design", category: "Creative & Design", scope: "pa", teamMin: 1, teamMax: 1, blurb: "Design a screen-printable logo for PA-TSA merchandise. (PA-only event.)", image: "/events/logo-design.jpg" },
  { id: "materials-process", name: "Materials Processes", category: "Engineering & Technology", scope: "pa", teamMin: 1, teamMax: 1, blurb: "Fabricate a project and document the materials processes used. (PA-only event.)", image: "/events/materials-process.jpg" },
  { id: "medical-technology", name: "Medical Technology", category: "Science & Research", scope: "pa", teamMin: 2, teamMax: 6, blurb: "Research a medical technology issue and present it on a digital scientific poster. (PA-only event.)", image: "/events/medical-technology.jpg" },
  { id: "pin-design", name: "Pin Design", category: "Creative & Design", scope: "pa", teamMin: 1, teamMax: 1, blurb: "Design a fundraising pin benefiting the American Cancer Society. (PA-only event.)", image: "/events/pin-design.jpg" },
  { id: "rc-off-road-racing", name: "R/C Off-Road Racing", category: "Engineering & Technology", scope: "pa", teamMin: 3, teamMax: 3, blurb: "Build and drive a radio-controlled vehicle through racing and task challenges. (PA-only event.)", image: "/events/rc-off-road-racing.jpg" },
  { id: "safety-illustration", name: "Safety Illustration", category: "Creative & Design", scope: "pa", teamMin: 1, teamMax: 1, blurb: "Create an illustration that promotes safety in technology. (PA-only event.)", image: "/events/safety-illustration.jpg" },
];
