// ---------------------------------------------------------------------------
// Site-wide configuration. Edit values here to update the whole site.
// PLACEHOLDER values are marked with TODO — replace before launch.
// ---------------------------------------------------------------------------

export const site = {
  schoolName: "Downingtown East High School",
  chapterName: "Downingtown East TSA",
  shortName: "DE TSA",
  tagline:
    "Use this website as a resource to prepare and be successful in your event this year!",
  description:
    "The Technology Student Association (TSA) chapter at Downingtown East High School — a national organization that develops skills in science, technology, engineering, and mathematics (STEM) through competitive events.",
  // Used for canonical URLs / Open Graph. TODO: set to your real domain.
  url: "https://deasttsa.example.com",

  socials: {
    facebook: "https://www.facebook.com/profile.php?id=61562208695319",
    instagram: "https://www.instagram.com/deast_tsa",
    youtube: "https://www.youtube.com/@DowningtownEastTSA",
    // TODO: replace with the real Schoology group/course join link.
    schoology: "https://app.schoology.com/",
  },

  // Primary navigation. Order = display order.
  nav: [
    { label: "Home", href: "/" },
    { label: "Events", href: "/events" },
    { label: "Find My Event", href: "/quiz" },
    { label: "Event Support", href: "/support" },
    { label: "Officers", href: "/officers" },
    { label: "News", href: "/news" },
    { label: "Achievements", href: "/achievements" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type Site = typeof site;
