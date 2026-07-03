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
  { role: "President", name: "Ahaan Nigam", photo: "" },
  { role: "Vice President", name: "Rishabh Patel", photo: "" },
  { role: "Treasurer", name: "Purvi Sumanth", photo: "" },
  { role: "Secretary", name: "Neel Vangala", photo: "" },
  { role: "Reporter", name: "Advik Kashyap", photo: "" },
  { role: "Student Advisor", name: "Olivia Smith", photo: "" },
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
