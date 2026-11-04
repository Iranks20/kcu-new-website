// Scholarships, postgraduate plans and alumni content.
// HESFB, instalments and employer sponsorship come from KCU's published funding information. Everything else in
// this file is PLACEHOLDER content drafted for the presentation: award values, criteria, deadlines and proposed
// programmes must be confirmed by the Finance Office, the Directorate of Postgraduate Studies and the Alumni Office.

export type Scholarship = {
  title: string;
  value: string;
  for: string;
  criteria: string[];
  deadline: string;
  href?: string;
};

export const scholarships: Scholarship[] = [
  {
    title: "HESFB Student Loan",
    value: "Up to full tuition",
    for: "Ugandan undergraduate students",
    criteria: ["Ugandan citizen admitted to an eligible programme", "Apply through the Higher Education Students' Financing Board", "Repaid after graduation"],
    deadline: "Set by HESFB each academic year",
    href: "https://www.hesfb.go.ug/",
  },
  {
    title: "Vice Chancellor's Merit Award",
    value: "50% tuition, first year",
    for: "Top-performing new undergraduates",
    criteria: ["Outstanding UACE results (or equivalent)", "Admitted to a full-time degree programme", "Renewable each year with a CGPA of 4.0 or above"],
    deadline: "30 November 2026 for the January 2027 intake",
  },
  {
    title: "Sports Excellence Award",
    value: "25% tuition",
    for: "Students who represent KCU in sport",
    criteria: ["Proven record at school, district or national level", "Commitment to train and compete for KCU teams", "Good academic standing"],
    deadline: "Rolling, reviewed each semester",
  },
  {
    title: "Guild Leadership Award",
    value: "20% tuition",
    for: "Elected Guild leaders",
    criteria: ["Serving member of the Guild cabinet or Guild Representative Council", "Good academic and disciplinary standing"],
    deadline: "After each Guild election",
  },
  {
    title: "Family Discount",
    value: "10% tuition",
    for: "Siblings studying at KCU at the same time",
    criteria: ["Two or more siblings enrolled in the same semester", "Applies to the younger sibling's tuition"],
    deadline: "At registration",
  },
  {
    title: "Instalment plans & sponsorship",
    value: "Flexible payments",
    for: "All students",
    criteria: ["Pay tuition in agreed instalments each semester", "Sponsor letters provided for employers, families and organisations"],
    deadline: "Agree a plan with the Finance Office at registration",
  },
];

export type ProposedProgramme = { title: string; school: string; duration: string; mode: string; text: string };

export const postgraduate = {
  intro:
    "KCU's Directorate of Postgraduate Studies and Research is developing master's and postgraduate diploma programmes that build on the University's strengths in health, law, business and computing.",
  status: "Proposed, subject to NCHE accreditation",
  director: { name: "Prof. Peter Turyakira", role: "Acting Director, Postgraduate Studies & Research" },
  programmes: [
    { title: "Master of Public Health", school: "Medicine, Health & Life Sciences", duration: "2 years", mode: "Weekend & blended", text: "Epidemiology, health systems and programme management for health professionals." },
    { title: "Master of Business Administration", school: "Law & Management Sciences", duration: "2 years", mode: "Evening & weekend", text: "Strategy, finance and leadership for managers and entrepreneurs." },
    { title: "Master of Laws in Oil, Gas & Energy Law", school: "Law & Management Sciences", duration: "1–2 years", mode: "Weekend", text: "The law and governance of Uganda's extractives and energy sector." },
    { title: "MSc Cyber Security & Digital Forensics", school: "Science, Computing & Engineering", duration: "2 years", mode: "Evening & blended", text: "Advanced security engineering, incident response and digital evidence." },
    { title: "Postgraduate Diploma in Project Planning & Management", school: "Law & Management Sciences", duration: "1 year", mode: "Weekend", text: "Plan, run and evaluate projects in the public, private and NGO sectors." },
    { title: "Postgraduate Diploma in Medical Education", school: "Medicine, Health & Life Sciences", duration: "1 year", mode: "Blended", text: "Teaching, assessment and curriculum design for clinicians who teach." },
  ] satisfies ProposedProgramme[],
};

export const alumni = {
  graduates: "4,000+",
  ceremonies: "6",
  benefits: [
    { title: "Network", text: "Connect with KCU graduates working in hospitals, courts, banks and energy companies across Africa and beyond." },
    { title: "Careers", text: "Job opportunities, CV support and introductions to employers through the career office." },
    { title: "Mentoring", text: "Share your experience with current students as a mentor or guest speaker." },
    { title: "Events", text: "Reunions, networking evenings and invitations to graduation." },
    { title: "Library access", text: "Continued access to the University library and selected e-resources." },
    { title: "Give back", text: "Support scholarships and student projects through the KCU Alumni Fund." },
  ],
  // Illustrative alumni profiles: fictional names, marked sample, to be replaced with real, consented profiles.
  spotlight: [
    { name: "Dr. Samuel Kato", programme: "MBChB, 2023", now: "Medical Officer, a regional referral hospital", quote: "My clinical rotations prepared me for the pace of a busy referral hospital from my first day.", sample: true },
    { name: "Esther Nabirye", programme: "Bachelor of Laws, 2024", now: "Associate, a Kampala law firm", quote: "The moot court gave me the confidence to stand up in a real courtroom.", sample: true },
    { name: "Ali Hussein Omar", programme: "Bachelor of Business Administration, 2022", now: "Founder, a logistics start-up in Juba", quote: "KCU's weekend classes let me study while running my business.", sample: true },
  ],
};
