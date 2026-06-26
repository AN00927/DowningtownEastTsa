// ---------------------------------------------------------------------------
// "Find My Event" quiz. Each option awards points to one or more event
// categories and/or specific event ids. The quiz tallies points and shows the
// top-matching events from events.ts. Edit questions/weights freely.
// ---------------------------------------------------------------------------

import type { EventCategory } from "./events";

export interface QuizOption {
  label: string;
  /** Points added per category when this option is chosen. */
  categories?: Partial<Record<EventCategory, number>>;
  /** Extra points for specific event ids (must match events.ts ids). */
  events?: Record<string, number>;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: QuizOption[];
}

export const quiz: QuizQuestion[] = [
  {
    id: "vibe",
    prompt: "Which sounds most like you?",
    options: [
      { label: "I love designing and making things look great", categories: { "Creative & Design": 3 } },
      { label: "I like building, engineering, and solving hands-on problems", categories: { "Engineering & Technology": 3 } },
      { label: "I'm into science, data, and research", categories: { "Science & Research": 3 } },
      { label: "I enjoy writing, speaking, and storytelling", categories: { "Media & Communication": 3 } },
    ],
  },
  {
    id: "work-style",
    prompt: "How do you prefer to work?",
    options: [
      { label: "Solo — I do my best work on my own", events: {} },
      { label: "Small team of 2–3", categories: { "Science & Research": 1 } },
      { label: "Big team where everyone has a role", categories: { "Engineering & Technology": 1, "Creative & Design": 1 } },
    ],
  },
  {
    id: "tools",
    prompt: "Pick the tools you'd most want to use:",
    options: [
      { label: "CAD, 3D modeling, fabrication", categories: { "Engineering & Technology": 2 }, events: { "cad-engineering": 2, "manufacturing-prototype": 1 } },
      { label: "Cameras, editing software, audio", categories: { "Creative & Design": 1, "Media & Communication": 2 }, events: { "digital-video-production": 2, "audio-podcasting": 1 } },
      { label: "Code editors and dev tools", categories: { "Academic & Competition": 2 }, events: { "coding": 2, "software-development": 2, "video-game-design": 1 } },
      { label: "Lab equipment and datasets", categories: { "Science & Research": 2 }, events: { "forensic-science": 1, "data-science-analytics": 2 } },
    ],
  },
  {
    id: "challenge",
    prompt: "Your ideal challenge is...",
    options: [
      { label: "Make something beautiful or fun", categories: { "Creative & Design": 2 }, events: { "board-game-design": 1, "fashion-design-technology": 1 } },
      { label: "Make something that works under pressure", categories: { "Engineering & Technology": 2 }, events: { "vex-robotics": 2, "drone-challenge": 1 } },
      { label: "Win an argument or a quiz with facts", categories: { "Academic & Competition": 2 }, events: { "debating-technological-issues": 2, "technology-bowl": 1 } },
      { label: "Tell a story that moves people", categories: { "Media & Communication": 2 }, events: { "prepared-presentation": 1, "childrens-stories": 1 } },
    ],
  },
  {
    id: "spotlight",
    prompt: "How do you feel about presenting to judges?",
    options: [
      { label: "Love the spotlight — give me a mic", categories: { "Media & Communication": 2 }, events: { "extemporaneous-speech": 2 } },
      { label: "Fine presenting a project I built", categories: { "Engineering & Technology": 1, "Creative & Design": 1 } },
      { label: "I'd rather let the work speak for itself", categories: { "Science & Research": 1, "Academic & Competition": 1 } },
    ],
  },
];
