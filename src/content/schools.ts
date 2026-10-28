export type School = {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string[];
  image: string;
  founded?: string;
  departments: { name: string; text: string }[];
  highlights: string[];
};

export const schools: School[] = [
  {
    slug: "medicine-health-life-sciences",
    name: "School of Medicine, Health & Life Sciences",
    shortName: "Medicine, Health & Life Sciences",
    tagline: "Training the next generation of doctors, nurses and health professionals.",
    description: [
      "Founded in 2011, the School of Medicine, Health & Life Sciences provides medical and healthcare education designed to prepare future professionals for an evolving health landscape.",
      "Students learn through anatomy and clinical skills laboratories, supervised placements with partner hospitals including Mulago and Kiruddu National Referral Hospitals, and community health outreach across Uganda.",
    ],
    image: "/images/kcu-2026/clinical-skills-patient.webp",
    founded: "2011",
    departments: [
      { name: "Medicine & Surgery", text: "The MBChB programme, recognised through ECFMG pathways." },
      { name: "Nursing Sciences", text: "Direct-entry and completion pathways for registered nurses." },
      { name: "Clinical Medicine & Community Health", text: "Diploma-level clinical training with a community focus." },
      { name: "Medical Laboratory Technology", text: "Diagnostic laboratory skills for modern health systems." },
      { name: "Professional Health Certificates", text: "Short courses in ECG interpretation, cardiac life support and more." },
    ],
    highlights: [
      "MBChB recognised through ECFMG pathways",
      "Clinical placements at national referral hospitals",
      "Anatomy, chemistry and clinical skills laboratories",
    ],
  },
  {
    slug: "law-management-sciences",
    name: "School of Law & Management Sciences",
    shortName: "Law & Management Sciences",
    tagline: "Preparing ethical lawyers, business leaders and economists.",
    description: [
      "The School trains students for legal, business, leadership and management careers, combining professional knowledge with practical, enterprise-oriented skills.",
      "Law students sharpen their advocacy in the Moot Court Room and regional moot competitions, while business students learn through case studies, industry partnerships and internships.",
    ],
    image: "/images/kcu-2026/library-student-reading.webp",
    departments: [
      { name: "Law", text: "The Bachelor of Laws with moot court and legal clinic experience." },
      { name: "Business & Management", text: "Business administration with specialisations in accounting, finance and marketing." },
      { name: "Economics & Energy Management", text: "Applied economics and oil, gas and energy management." },
      { name: "Professional Certificates", text: "Short courses in management, tax, SACCOs and digital marketing." },
    ],
    highlights: [
      "Moot Court Room for practical advocacy",
      "MoU with Praxis Conflict Centre",
      "Weekend classes for working professionals",
    ],
  },
  {
    slug: "science-computing-engineering",
    name: "School of Science, Computing & Engineering",
    shortName: "Science, Computing & Engineering",
    tagline: "Technology, investigation and energy skills for a changing economy.",
    description: [
      "The School brings together Computing, Artificial Intelligence & Data Science, Agriculture and Petroleum Geoscience, with training linked to Uganda's technology, investigation and energy needs.",
      "Students learn in computer laboratories, on field visits to the Albertine Graben and partner companies such as COSL Uganda, and through national competitions like the Cyber Stars challenge.",
    ],
    image: "/images/kcu-2026/student-laptop-collaboration.webp",
    departments: [
      { name: "Computing & Forensics", text: "Computer forensics, cyber security and criminal investigation." },
      { name: "Artificial Intelligence & Data Science", text: "AI, data science and Internet of Things." },
      { name: "Petroleum Geoscience", text: "Geoscience for Uganda's oil and gas sector." },
      { name: "Agriculture", text: "Sustainable and organic agriculture." },
    ],
    highlights: [
      "Field visits to the Albertine Graben oil projects",
      "Cyber security and digital forensics labs",
      "Industry partners in energy and technology",
    ],
  },
];

export function getSchool(slug: string) {
  return schools.find((s) => s.slug === slug);
}
