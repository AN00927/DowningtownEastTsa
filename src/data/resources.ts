// ---------------------------------------------------------------------------
// Event Support resources. Set `comingSoon: true` to badge a link as not-ready
// (it will render disabled). Replace placeholder URLs (#) before launch.
// ---------------------------------------------------------------------------

export interface ResourceLink {
  title: string;
  description: string;
  href: string;
  comingSoon?: boolean;
}

export const quickLinks: ResourceLink[] = [
  { title: "Event Matrix Sheet", description: "Plan and track events at a glance.", href: "#", comingSoon: true },
  { title: "Competition Rules", description: "Current national competition guidelines.", href: "#", comingSoon: true },
  { title: "Event Change Form", description: "Request a change to your event.", href: "#", comingSoon: true },
  { title: "Individual & Team IDs", description: "Important early-submission identifiers.", href: "#", comingSoon: true },
  { title: "Pennsylvania TSA", description: "State chapter website.", href: "https://patsa.org" },
  { title: "National TSA", description: "National organization website.", href: "https://tsaweb.org" },
];

// The all-in-one prep guide is a PLACEHOLDER PDF. Replace the file at
// /public/docs/tsa-prep-guide-placeholder.pdf with the real guide, which should
// cover: how to read the national rules, how to plan for an event, and timelines
// broken down by category. (Do not invent this content — link the real doc.)
export const prepGuide: ResourceLink = {
  title: "TSA Prep Guide (All-in-One)",
  description:
    "How to read the national rules, plan your event, and follow category timelines — one document.",
  href: "/docs/tsa-prep-guide-placeholder.pdf",
  comingSoon: true,
};

export const portfolioExamples: ResourceLink[] = [
  { title: "Canva Documentation Template", description: "Starter template for documentation portfolios.", href: "#", comingSoon: true },
  { title: "Example: 6th Place Nationals", description: "Sample winning documentation portfolio.", href: "#", comingSoon: true },
  { title: "Example: 2nd Place States", description: "Sample winning documentation portfolio.", href: "#", comingSoon: true },
  { title: "Sample VR Visualization Portfolio (PDF)", description: "Reference documentation portfolio.", href: "#", comingSoon: true },
];
