// Research centres, projects and support for the Research page.
//
// Projects link to real KCU news stories. Centres, the ethics process and the research fund are PLACEHOLDER
// content drafted for the presentation: confirm names, leads and scope with the Directorate of Postgraduate
// Studies & Research before launch.

import { schoolDetails } from "./school-details";
import { schools } from "./schools";

export const researchDirector = {
  name: "Prof. Peter Turyakira",
  role: "Acting Director, Postgraduate Studies & Research",
};

export type ResearchCentre = { name: string; school: string; focus: string; themes: string[] };

// PLACEHOLDER: proposed research groups, one per strength area.
export const researchCentres: ResearchCentre[] = [
  {
    name: "Community Health Research Group",
    school: "medicine-health-life-sciences",
    focus: "Non-communicable disease, maternal and child health and access to primary care in peri-urban Kampala.",
    themes: ["Community screening", "Health systems", "Clinical education"],
  },
  {
    name: "Centre for Law, Justice & Dispute Resolution",
    school: "law-management-sciences",
    focus: "Access to justice, alternative dispute resolution, transnational litigation and public participation in law-making.",
    themes: ["Access to justice", "ADR", "Human rights"],
  },
  {
    name: "Digital Forensics & Cyber Security Lab",
    school: "science-computing-engineering",
    focus: "Digital evidence, fraud detection, cyber security capacity and applied AI for East African institutions.",
    themes: ["Digital forensics", "AI & data", "Cyber security"],
  },
  {
    name: "Energy & Extractives Research Group",
    school: "science-computing-engineering",
    focus: "Petroleum geoscience, local content and environmental safeguards in Uganda's oil and gas sector.",
    themes: ["Albertine Graben", "Local content", "Water treatment"],
  },
];

export type ResearchProject = { title: string; text: string; school: string; status: "Ongoing" | "Recognised" | "Completed"; news: string };

/** Research, innovation and competition highlights, each backed by a KCU news story. */
export const researchProjects: ResearchProject[] = [
  {
    title: "Aqua Clean water treatment innovation",
    text: "A low-cost water treatment solution for communities around oil and gas operations, showcased at the 3rd Oil & Gas Skills Expo.",
    school: "science-computing-engineering",
    status: "Ongoing",
    news: "kcu-showcases-aqua-clean-innovation-at-the-3rd-oil-and-gas-skills-expo-2026",
  },
  {
    title: "Capture the Flag cyber security team",
    text: "KCU's cyber security students placed third at the NFSU Capture the Flag finals against regional universities.",
    school: "science-computing-engineering",
    status: "Recognised",
    news: "kcu-secures-third-place-at-nfsu-capture-the-flag-finals",
  },
  {
    title: "Inter-university anatomy research presentations",
    text: "Students' anatomy presentations earned KCU the title of best presenting university at the first inter-university anatomy workshop.",
    school: "medicine-health-life-sciences",
    status: "Recognised",
    news: "kcu-emerges-best-presenting-university-at-first-interuniversity-anatomy-workshop",
  },
  {
    title: "Community health screening",
    text: "Medical students and staff screened community members for non-communicable disease risk ahead of World Heart Day.",
    school: "medicine-health-life-sciences",
    status: "Completed",
    news: "kcu-medical-students-participate-in-community-health-screening-ahead-of-world",
  },
  {
    title: "Tilenga train-the-trainer programme",
    text: "KCU staff joined the Tilenga project's train-the-trainer programme, building skills for Uganda's oil and gas workforce.",
    school: "science-computing-engineering",
    status: "Completed",
    news: "king-ceasor-university-participates-in-tilenga-train-the-trainer-program",
  },
  {
    title: "Academic integrity through digital tools",
    text: "Library and faculty work on similarity checking and digital literacy to strengthen research integrity across the University.",
    school: "law-management-sciences",
    status: "Ongoing",
    news: "strengthening-academic-integrity-through-digital-innovation",
  },
];

/** Every school's publications and outputs, newest first, tagged with the school. */
export function allPublications() {
  return schools
    .flatMap((s) => (schoolDetails[s.slug]?.publications ?? []).map((p) => ({ ...p, school: s.shortName })))
    .sort((a, b) => b.year.localeCompare(a.year));
}

// PLACEHOLDER: research support processes to be confirmed by the Directorate.
export const researchSupport = [
  { title: "Research & Ethics Committee", text: "Reviews proposals involving people, patient data or communities before fieldwork begins, in line with UNCST guidelines." },
  { title: "Seed research fund", text: "Small competitive grants for staff and student teams, awarded each semester to early-stage projects." },
  { title: "Library & research tools", text: "Access to e-journals, reference management and similarity checking through the University Library." },
  { title: "Student research", text: "Every degree includes a supervised research project, and top projects are presented at national symposia." },
];
