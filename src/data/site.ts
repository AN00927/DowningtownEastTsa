// ---------------------------------------------------------------------------
// Site-wide configuration. Edit values here to update the whole site.
// PLACEHOLDER values are marked with TODO. Replace them before launch.
// ---------------------------------------------------------------------------

export const site = {
  schoolName: "Downingtown East High School",
  chapterName: "Downingtown East TSA",
  shortName: "DE TSA",
  tagline:
    "Use this website as a resource to prepare and be successful in your event this year!",
  description:
    "Downingtown East TSA is a club at East where students interested in engineering and related fields can compete in a variety of STEM events. TSA is a national organization created to develop skills in science, technology, engineering, and mathematics (STEM) and business education.",
  // Used for canonical URLs / Open Graph. TODO: set to your real domain.
  url: "https://deasttsa.example.com",

  socials: {
    facebook: "https://www.facebook.com/profile.php?id=61562208695319",
    instagram: "https://www.instagram.com/deast_tsa/",
    youtube: "https://www.youtube.com/@DowningtownEastTSA",
  },

  // External tools / embeds. TODO: replace the calendar embed with the real one.
  quizUrl: "https://deast-tsa-personality-quiz.netlify.app/",
  calendarEmbedUrl:
    "https://calendar.google.com/calendar/embed?src=en.usa%23holiday%40group.v.calendar.google.com&ctz=America%2FNew_York",

  // Primary navigation. Order = display order. Always-visible top bar.
  nav: [
    { label: "Home", href: "/" },
    { label: "Events", href: "/events" },
    { label: "Resources", href: "/resources" },
    { label: "Team", href: "/team" },
  ],
} as const;

export type Site = typeof site;
