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
  { title: "Canva Template", description: "A starter template for your documentation portfolio.", href: "#", comingSoon: true },
  { title: "Example: 4th Place Nationals", description: "A sample portfolio that placed at nationals.", href: "#", comingSoon: true },
  { title: "Example: 2nd Place Nationals", description: "A sample portfolio that placed at nationals.", href: "#", comingSoon: true },
];
