// ---------------------------------------------------------------------------
// Officer team. ALL personal info is PLACEHOLDER per privacy decision.
// Roles are preserved from the chapter structure. Replace name/grade/photo
// privately before launch. Do NOT publish student personal emails — use the
// /contact form instead.
// ---------------------------------------------------------------------------

export interface Officer {
  role: string;
  /** PLACEHOLDER — replace with real name before launch. */
  name: string;
  /** e.g. "Senior", "Junior". PLACEHOLDER. */
  grade: string;
  /** Events this officer is interested in / competes in. PLACEHOLDER. */
  interests: string[];
  /** Path under /public, or "" to show the avatar placeholder. */
  photo: string;
}

export const officers: Officer[] = [
  { role: "President", name: "Officer Name", grade: "Grade", interests: ["Add interests"], photo: "" },
  { role: "Vice President", name: "Officer Name", grade: "Grade", interests: ["Add interests"], photo: "" },
  { role: "Treasurer", name: "Officer Name", grade: "Grade", interests: ["Add interests"], photo: "" },
  { role: "Secretary", name: "Officer Name", grade: "Grade", interests: ["Add interests"], photo: "" },
  { role: "Sergeant-at-Arms", name: "Officer Name", grade: "Grade", interests: ["Add interests"], photo: "" },
  { role: "Reporter", name: "Officer Name", grade: "Grade", interests: ["Add interests"], photo: "" },
];

// Optional faculty advisor block (placeholder).
export const advisor = {
  role: "Faculty Advisor",
  name: "Advisor Name",
  photo: "",
};
