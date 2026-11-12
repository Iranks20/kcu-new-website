// Proof points for the homepage (benchmark: ASU's rankings panel and "Stories of excellence").
// Every claim here comes from KCU's charter announcement or a published KCU news story; add rankings once KCU has them.

import { latestGraduation } from "./university";

export type ProofPoint = { big: string; line: string; source: string; href?: string };

export const proofPoints: ProofPoint[] = [
  { big: "Chartered", line: "A fully chartered university, granted its University Charter by the Government of Uganda", source: "July 2025", href: "/about#accreditation" },
  { big: "ECFMG", line: "Our MBChB is recognised through ECFMG pathways, opening international routes for doctors", source: "School of Medicine, Health & Life Sciences", href: "/programmes/bachelor-of-medicine-and-bachelor-of-surgery" },
  { big: "3rd", line: "place at the NFSU Capture the Flag finals, competing against universities across the region", source: "Cyber security team, 2026", href: "/news/kcu-secures-third-place-at-nfsu-capture-the-flag-finals" },
  { big: "Best", line: "presenting university at the first inter-university anatomy workshop", source: "Anatomy students, 2026", href: "/news/kcu-emerges-best-presenting-university-at-first-interuniversity-anatomy-workshop" },
  { big: latestGraduation.graduates, line: `graduates at the ${latestGraduation.name}, including ${latestGraduation.doctors} new medical doctors`, source: latestGraduation.date, href: `/news/${latestGraduation.slug}` },
  { big: "4,000+", line: "graduates now working across Uganda, East Africa and beyond", source: "Since the University opened", href: "/alumni" },
];

/** News stories shown under "Stories of excellence", in order. */
export const excellenceSlugs = [
  "kcu-secures-third-place-at-nfsu-capture-the-flag-finals",
  "kcu-emerges-best-presenting-university-at-first-interuniversity-anatomy-workshop",
  "king-ceasor-university-proudly-hosts-the-uganda-national-code-fest-2026",
  "kcu-anatomy-surgery-society-excels-at-inaugural-inter-university-surgical-skills",
  "king-ceasor-university-celebrates-6th-graduation-ceremony",
  "kcu-law-students-shine-at-inaugural-digital-health-inter-university-moot-court",
];

/** The three research pillars on the homepage (benchmark: SMU's research themes). */
export const researchPillars = [
  { title: "Health for Communities", text: "Community screening, clinical education and access to care in peri-urban Kampala.", image: "/images/kcu-2026/clinical-skills-patient.webp", href: "/research#centres" },
  { title: "Justice & Governance", text: "Access to justice, dispute resolution and public participation in law-making.", image: "/media/news-images-moot-court.webp", href: "/research#centres" },
  { title: "Digital & Energy Futures", text: "Cyber security, digital forensics, AI, and Uganda's oil and gas sector.", image: "/images/kcu-2026/student-laptop-collaboration.webp", href: "/research#centres" },
];
