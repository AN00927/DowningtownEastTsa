// ---------------------------------------------------------------------------
// Event Support resources. Set `comingSoon: true` to badge a link as not ready
// (it renders disabled). Replace placeholder URLs (#) before launch.
// ---------------------------------------------------------------------------

export interface ResourceLink {
  title: string;
  description: string;
  href: string;
  comingSoon?: boolean;
}

export const quickLinks: ResourceLink[] = [
  { title: "Event Matrix Sheet", description: "Read, read, read! See every event in one place.", href: "#", comingSoon: true },
  { title: "Current Competition Rules", description: "The rules and regulations for this year's events.", href: "#", comingSoon: true },
  { title: "Event Change Form", description: "Need to switch events? Fill this out.", href: "#", comingSoon: true },
  { title: "Individual and Team IDs", description: "Important for early submission.", href: "#", comingSoon: true },
  { title: "Pennsylvania TSA Website", description: "Our state TSA website.", href: "https://patsa.org" },
  { title: "National TSA Website", description: "The national TSA website.", href: "https://tsaweb.org" },
];

// The all-in-one prep guide is a PLACEHOLDER PDF. Replace the file at
// /public/docs/tsa-prep-guide-placeholder.pdf with the real guide. It should
// cover how to read the national rules, how to plan for an event, and timelines
// broken down by category. (Do not invent this content. Link the real doc.)
export const prepGuide: ResourceLink = {
  title: "TSA Prep Guide",
  description:
    "One document that walks you through how to read the national rules, how to plan for your event, and the timelines for each category.",
  href: "/docs/tsa-prep-guide-placeholder.pdf",
  comingSoon: true,
};

export const portfolioExamples: ResourceLink[] = [
  { title: "Template (Canva)", description: "A starter template for your documentation portfolio.", href: "#", comingSoon: true },
  { title: "Example #1: Audio Podcasting", description: "The chapter's Audio Podcasting portfolio that placed 2nd at nationals.", href: "https://drive.google.com/file/d/14clsrY9nLzwVVO4UouAl11SfWYfGI2vw/view?usp=sharing" },
  { title: "Example #2: Geospatial Technology", description: "The chapter's Geospatial Technology portfolio that placed 4th at nationals.", href: "https://drive.google.com/file/d/1VsIJYlGNc-gkdHmGt6YmODOt2RXulHk2/view?usp=sharing" },
  { title: "Example #3: Virtual Reality Simulation", description: "The chapter's Virtual Reality Simulation portfolio from the TSA National Conference.", href: "https://drive.google.com/file/d/1BqLBv4M1tvDE5V18W4elMR2PygyBlTWM/view" },
  { title: "Example #4: Manufacturing Prototype", description: "The chapter's Manufacturing Prototype portfolio from the TSA National Conference.", href: "https://drive.google.com/file/d/1sZTuo_LTf5PRzFtmRRDawXwFm53ZDABK/view?usp=sharing" },
  { title: "Example #5: Architectural Design", description: "The chapter's Architectural Design portfolio from the TSA National Conference.", href: "https://drive.google.com/file/d/1zl4JahyeexeeAEf4wZ9NwwAyRoTukaQ0/view?usp=sharing" },
];
