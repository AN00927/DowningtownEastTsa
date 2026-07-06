// ---------------------------------------------------------------------------
// Homepage FAQ. Edit freely; keep answers short (2-3 sentences).
// ---------------------------------------------------------------------------

export interface FaqItem {
  question: string;
  answer: string;
}

export const faq: FaqItem[] = [
  {
    question: "What is TSA?",
    answer:
      "The Technology Student Association is a national organization of over 300,000 middle and high school students focused on STEM and business education. Our chapter represents Downingtown East at the regional, state, and national levels.",
  },
  {
    question: "Do I need experience to join?",
    answer:
      "No. Events range from beginner-friendly to advanced, and older members and officers help newcomers get started. If you are curious about engineering, coding, design, science, or public speaking, there is an event for you.",
  },
  {
    question: "How do competitions work?",
    answer:
      "You pick your events in the fall and prepare during the year. You first compete at the Regional Conference in December; if you earn enough points (see our point system document), you advance to the Pennsylvania State Conference in the spring. Top state finishers qualify for the National Conference in the summer.",
  },
  {
    question: "Can I compete in more than one event?",
    answer:
      "Yes. Most members compete in several events each season, mixing team projects with individual ones. Check the event rules for any limits on entries.",
  },
  {
    question: "How do I pick my events?",
    answer:
      "Browse the Events page to see every option, or take our personality quiz to get matched with events that fit your interests. Officers can also help you choose at meetings.",
  },
];
