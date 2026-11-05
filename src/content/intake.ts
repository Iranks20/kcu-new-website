// The current admissions campaign: dates, featured programmes and the official flyers.
// Taglines come from KCU's January 2027 campaign flyers. Update this file for each new intake.

import { getProgramme } from "./programmes";
import { intakes } from "./university";

export const campaign = {
  name: "January 2027 Intake",
  /** ISO dates, used for the countdown and the announcement bar. */
  closes: "2026-12-18",
  starts: "2027-01-11",
  intake: intakes[0],
};

const featured = [
  { slug: "diploma-in-medical-laboratory-technology", tagline: "Be at the heart of accurate diagnosis and quality healthcare.", image: "/images/intake-2027/photo-medical-laboratory.webp", imageAlt: "A medical laboratory student working at a lab bench" },
  { slug: "bachelor-of-laws", tagline: "Build a future in justice, leadership and governance.", image: "/images/intake-2027/photo-law-student.webp", imageAlt: "A KCU law student in an advocate's gown holding law books" },
  { slug: "bachelor-of-business-administration", tagline: "Develop leadership and management skills for a dynamic, global world.", image: "/images/intake-2027/photo-business-students.webp", imageAlt: "Business students studying together" },
  { slug: "bachelor-of-oil-and-gas-management", tagline: "Prepare for a career in the global energy industry.", image: "/news-images/kcu-cosl.jpeg", imageAlt: "KCU students on an educational visit to an oil and gas company" },
];

export const featuredProgrammes = featured.flatMap((f) => {
  const programme = getProgramme(f.slug);
  return programme ? [{ ...f, programme }] : [];
});

/** The campaign flyers, for staff, students and partners to share on social media and WhatsApp. */
export const flyers = [
  { title: "Diploma in Medical Laboratory Technology", file: "/images/intake-2027/flyer-medical-laboratory-technology.jpg" },
  { title: "Bachelor of Laws", file: "/images/intake-2027/flyer-bachelor-of-laws.jpg" },
  { title: "Bachelor of Business Administration", file: "/images/intake-2027/flyer-business-administration.jpg" },
  { title: "Bachelor of Oil and Gas Management", file: "/images/intake-2027/flyer-oil-and-gas-management.jpg" },
];
