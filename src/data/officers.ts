// ---------------------------------------------------------------------------
// Team data: officers + committees. Names/roles are real (provided by the
// chapter). Photos and bios are optional placeholders for now (add later).
// ---------------------------------------------------------------------------

export interface Officer {
  role: string;
  name: string;
  /** Path under /public, or "" to show the avatar placeholder. */
  photo: string;
  /** Optional short bio (placeholder until provided). */
  bio?: string;
}

export const officers: Officer[] = [
  { role: "President", name: "Ahaan Nigam", photo: "/photos/officers/ahaan-nigam.jpg" },
  { role: "Vice President", name: "Rishabh Patel", photo: "/photos/officers/rishabh-patel.jpg" },
  { role: "Treasurer", name: "Purvi Sumanth", photo: "/photos/officers/purvi-sumanth.jpg" },
  { role: "Secretary", name: "Neel Vangala", photo: "/photos/officers/neel-vangala.jpg" },
  { role: "Reporter", name: "Advik Kashyap", photo: "/photos/officers/advik-kashyap.jpg" },
  { role: "Student Advisor", name: "Olivia Smith", photo: "/photos/officers/olivia-smith.jpg" },
];

export interface Committee {
  name: string;
  members: string[];
}

export const committees: Committee[] = [
  {
    name: "Fundraising Team",
    members: ["Sampada Pakkerakari", "Vaishnavi Saripalli"],
  },
  {
    name: "Mentorship Team",
    members: ["Aditi Bhat", "Akshara Patil", "Rohit Bhattiprolu"],
  },
];
