// ---------------------------------------------------------------------------
// Event personality quiz: questions, per-event trait vectors, and matching.
// Ported from the chapter's original standalone quiz (by Rishi Aitha) so the
// quiz runs natively at /quiz instead of an external site.
//
// How it works: the user starts from BASE_PROFILE and each answer adds its
// `modifiers` to the profile. Every event has a 10-number trait vector; the
// best matches are the events with the smallest Euclidean distance to the
// user's profile. Trait slots:
//   [0] commitment  [1] budget    [2] popularity  [3] coding   [4] building
//   [5] design      [6] media     [7] research    [8] racing   [9] PA-only
// PA-only events (trait[9] = 1) are excluded unless the user opts in (Q11).
// ---------------------------------------------------------------------------

import { events, type TsaEvent } from "./events";

export interface QuizOption {
  label: string;
  modifiers: number[];
}

export interface QuizQuestion {
  question: string;
  options: QuizOption[];
}

export const BASE_PROFILE = [3, 3, 3, 3, 3, 3, 3, 3, 3, 0];

export const quizQuestions: QuizQuestion[] = [
  {
    question: "How do you prefer to spend a rainy day?",
    options: [
      { label: "Sketching ideas for a new invention", modifiers: [0, 0, 0, 0, 2, 1, -1, 0, 0, 0] },
      { label: "Learning a new programming language", modifiers: [0, 0, 0, 3, 0, 0, 0, -1, 0, 0] },
      { label: "Experimenting with a science kit", modifiers: [0, 0, 0, -1, 1, 0, 0, 2, 0, 0] },
      { label: "Creating digital artwork", modifiers: [0, 0, 0, 0, 0, 3, 2, 0, 0, 0] },
      { label: "Building a model or robot", modifiers: [0, 0, 0, 0, 3, -1, 0, 0, 0, 0] },
    ],
  },
  {
    question: "How much time are you willing to spend learning new content for your event?",
    options: [
      { label: "I am committed and ready to learn whatever I need!", modifiers: [3, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
      { label: "I could see myself spending time learning new skills.", modifiers: [2, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
      { label: "I'm not too sure if I'll have time to learn something very complex.", modifiers: [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
      { label: "I'd much rather stick to ideas that are easy to learn or skills I already know.", modifiers: [-2, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    ],
  },
  {
    question: "Which career would you find most fulfilling?",
    options: [
      { label: "Software developer working on innovative technologies", modifiers: [0, 0, 0, 3, 0, 0, -1, 1, 0, 0] },
      { label: "Mechanical engineer designing new machines", modifiers: [0, 0, 0, 0, 3, 0, -1, 0, 0, 0] },
      { label: "Digital artist creating visual content", modifiers: [0, 0, 0, 0, 0, 3, 2, -1, 0, 0] },
      { label: "Environmental scientist researching climate change", modifiers: [0, 0, 0, -1, 0, 0, 0, 3, 0, 0] },
      { label: "Video game designer blending art and code", modifiers: [0, 0, 0, 2, 0, 2, 1, 0, 0, 0] },
    ],
  },
  {
    question: "Are you willing to spend money on your event?",
    options: [
      { label: "Yes, I am okay with a large budget.", modifiers: [0, 2, 0, 0, 0, 0, 0, 0, 0, 0] },
      { label: "I'm okay spending money, but I don't want anything too costly.", modifiers: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
      { label: "Spending money is something I really want to avoid.", modifiers: [0, -2, 0, 0, 0, 0, 0, 0, 0, 0] },
    ],
  },
  {
    question: "What sounds like a fun weekend activity?",
    options: [
      { label: "Coding a new app with friends", modifiers: [0, 0, 0, 3, 0, 0, 1, -1, 0, 0] },
      { label: "Tinkering with electronics and circuits", modifiers: [0, 0, 0, 1, 3, -1, 0, 0, 0, 0] },
      { label: "Creating a mural or street art", modifiers: [0, 0, 0, -2, 0, 3, 2, 0, 0, 0] },
      { label: "Analyzing data from a personal research project", modifiers: [0, 0, 0, -1, 0, 0, 0, 3, 0, 0] },
    ],
  },
  {
    question: "How comfortable are you with complex problems and solutions?",
    options: [
      { label: "I'm excited for a real challenge!", modifiers: [3, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
      { label: "I'm pretty confident that I can handle something difficult.", modifiers: [2, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
      { label: "I prefer something a little more familiar.", modifiers: [-2, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
      { label: "I definitely don't want to do anything too complicated.", modifiers: [-3, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    ],
  },
  {
    question: "What's your favorite way to approach a new idea?",
    options: [
      { label: "Writing out a detailed plan", modifiers: [0, 0, 0, -1, 1, 0, 2, 0, 0, 0] },
      { label: "Prototyping with available materials", modifiers: [0, 0, 0, 0, 3, 0, -1, 0, 0, 0] },
      { label: "Developing a code-based solution", modifiers: [0, 0, 0, 3, 0, 0, 0, -1, 0, 0] },
      { label: "Sketching concepts or wireframes", modifiers: [0, 0, 0, 0, 0, 3, 0, -1, 0, 0] },
      { label: "Conducting initial research to validate the idea", modifiers: [0, 0, 0, -1, 0, 0, 0, 3, 0, 0] },
    ],
  },
  {
    question: "How popular of an event would you prefer to participate in?",
    options: [
      { label: "I want to dive into something with lots of competition!", modifiers: [0, 0, 2, 0, 0, 0, 0, 0, 0, 0] },
      { label: "I'm okay with relatively popular events, but nothing too competitive.", modifiers: [0, 0, 1, 0, 0, 0, 0, 0, 0, 0] },
      { label: "I'd like to focus on events that less people participate in.", modifiers: [0, 0, -1, 0, 0, 0, 0, 0, 0, 0] },
      { label: "I want to attack the more niche events as much as possible.", modifiers: [0, 0, -2, 0, 0, 0, 0, 0, 0, 0] },
    ],
  },
  {
    question: "Which type of project would you enjoy the most?",
    options: [
      { label: "Developing an AI tool", modifiers: [0, 0, 0, 3, 0, 0, -1, 2, 0, 0] },
      { label: "Designing a product prototype", modifiers: [0, 0, 0, 0, 2, 1, 0, -1, 0, 0] },
      { label: "Filming and editing a documentary", modifiers: [0, 0, 0, -1, 0, 0, 3, 2, 0, 0] },
      { label: "Conducting a chemistry experiment", modifiers: [0, 0, 0, 0, 0, 0, -1, 3, 0, 0] },
    ],
  },
  {
    question: "For engineering or robotics events, how do you feel about a live race or contest?",
    options: [
      { label: "I'd love a high-stakes vehicle race or robot contest at the conference!", modifiers: [0, 0, 0, 0, 0, 0, 0, 0, 2, 0] },
      { label: "I really want to avoid any kind of live race or competition.", modifiers: [0, 0, 0, 0, 0, 0, 0, 0, -2, 0] },
      { label: "I could go either way, this doesn't matter much to me.", modifiers: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
      { label: "I don't plan on doing events where I create a vehicle or moving robot.", modifiers: [0, 0, 0, 0, 0, 0, 0, 0, -2, 0] },
    ],
  },
  {
    question: "Are you open to PA-only events, which only exist at the Pennsylvania conference?",
    options: [
      { label: "Yes, include PA-only events in my results.", modifiers: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1] },
      { label: "No, only show me national events.", modifiers: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    ],
  },
];

// Trait vectors keyed by the event ids in src/data/events.ts, so every quiz
// result can link straight to its event page.
export const EVENT_TRAITS: Record<string, number[]> = {
  "animatronics": [4, 4, 2, 3, 5, 4, 2, 2, 1, 0],
  "architectural-design": [4, 2, 4, 1, 4, 5, 2, 2, 1, 0],
  "audio-podcasting": [3, 2, 2, 1, 1, 3, 5, 1, 1, 0],
  "biotechnology-design": [3, 1, 4, 1, 2, 3, 2, 5, 1, 0],
  "board-game-design": [2, 2, 4, 1, 2, 5, 2, 1, 1, 0],
  "chapter-team": [3, 1, 4, 1, 1, 1, 1, 1, 1, 0],
  "childrens-stories": [3, 2, 4, 1, 1, 5, 2, 1, 1, 0],
  "coding": [4, 1, 5, 5, 2, 1, 1, 2, 1, 0],
  "cad-architecture": [4, 2, 3, 2, 4, 3, 3, 1, 1, 0],
  "cad-engineering": [4, 2, 4, 2, 5, 2, 2, 1, 1, 0],
  "data-science-analytics": [4, 1, 4, 3, 2, 2, 3, 5, 1, 0],
  "debating-technological-issues": [3, 1, 3, 1, 1, 1, 2, 3, 1, 0],
  "digital-video-production": [2, 3, 3, 1, 1, 4, 5, 2, 1, 0],
  "dragster-design": [4, 3, 5, 1, 5, 3, 1, 2, 5, 0],
  "drone-challenge": [4, 5, 4, 2, 5, 2, 1, 2, 5, 0],
  "engineering-design": [4, 3, 3, 3, 5, 3, 3, 4, 1, 0],
  "essays-on-technology": [2, 1, 2, 1, 1, 2, 2, 5, 1, 0],
  "extemporaneous-speech": [2, 1, 3, 1, 1, 1, 2, 3, 1, 0],
  "fashion-design-technology": [4, 3, 2, 1, 2, 5, 2, 2, 1, 0],
  "flight-endurance": [4, 2, 3, 1, 5, 2, 1, 2, 4, 0],
  "forensic-science": [2, 1, 3, 1, 2, 1, 2, 5, 1, 0],
  "future-technology-teacher": [2, 2, 2, 2, 2, 2, 3, 4, 1, 0],
  "geospatial-technology": [3, 1, 3, 1, 2, 3, 2, 5, 1, 0],
  "manufacturing-prototype": [3, 4, 3, 2, 5, 4, 2, 2, 1, 0],
  "music-production": [3, 3, 2, 1, 1, 4, 5, 2, 1, 0],
  "on-demand-video": [3, 3, 3, 1, 1, 3, 5, 1, 1, 0],
  "photographic-technology": [3, 4, 2, 1, 1, 5, 5, 2, 1, 0],
  "prepared-presentation": [3, 1, 3, 1, 1, 1, 3, 3, 1, 0],
  "promotional-design": [2, 1, 2, 1, 1, 4, 4, 1, 1, 0],
  "senior-solar-sprint": [4, 3, 4, 2, 5, 3, 1, 2, 5, 0],
  "software-development": [4, 2, 5, 5, 2, 3, 3, 2, 1, 0],
  "structural-design": [3, 3, 2, 1, 5, 3, 1, 3, 1, 0],
  "system-control-technology": [4, 3, 2, 4, 4, 2, 1, 2, 1, 0],
  "technology-bowl": [2, 1, 4, 2, 2, 2, 2, 3, 1, 0],
  "technology-problem-solving": [2, 1, 3, 2, 4, 1, 1, 2, 1, 0],
  "transportation-modeling": [3, 2, 2, 2, 4, 3, 2, 2, 1, 0],
  "vex-robotics": [4, 4, 4, 4, 5, 2, 2, 2, 3, 0],
  "video-game-design": [4, 2, 4, 5, 1, 4, 3, 3, 1, 0],
  "vr-visualization": [4, 4, 2, 5, 2, 4, 3, 2, 1, 0],
  "webmaster": [4, 1, 4, 5, 2, 3, 4, 1, 1, 0],
  "cybersecurity": [3, 1, 2, 5, 3, 1, 1, 4, 1, 1],
  "logo-design": [2, 2, 2, 1, 1, 5, 4, 1, 1, 1],
  "materials-process": [1, 3, 2, 1, 4, 3, 2, 2, 1, 1],
  "pin-design": [2, 1, 2, 1, 1, 5, 4, 1, 1, 1],
  "rc-off-road-racing": [2, 3, 2, 2, 4, 2, 1, 1, 4, 1],
  "pa-robotics": [4, 3, 3, 4, 5, 2, 1, 2, 3, 1],
  "safety-illustration": [2, 1, 2, 1, 1, 4, 3, 3, 1, 1],
};

export interface QuizMatch {
  event: TsaEvent;
  /** Euclidean distance to the user's profile — lower = better match. */
  score: number;
}

/** Sum of BASE_PROFILE plus the modifiers of every chosen option. */
export function profileFromAnswers(answers: QuizOption[]): number[] {
  return answers.reduce(
    (profile, option) => profile.map((v, i) => v + option.modifiers[i]),
    BASE_PROFILE,
  );
}

/** All matching events, best match first. */
export function rankEvents(profile: number[]): QuizMatch[] {
  return events
    .flatMap((event) => {
      const traits = EVENT_TRAITS[event.id];
      if (!traits) return [];
      // PA-only events only appear when the user opted in on the last question.
      if (profile[9] === 0 && traits[9] === 1) return [];
      let sum = 0;
      for (let i = 0; i < profile.length; i++) {
        sum += (profile[i] - traits[i]) ** 2;
      }
      return [{ event, score: Math.sqrt(sum) }];
    })
    .sort((a, b) => a.score - b.score);
}
