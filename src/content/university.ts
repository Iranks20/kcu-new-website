import { programmes } from "./programmes";
import { partners } from "./partners";

export const stats = [
  { value: `${programmes.length}`, label: "Programmes across three schools" },
  { value: "2,000+", label: "Students from across Africa" },
  { value: "210+", label: "Teaching staff" },
  { value: `${partners.length}+`, label: "International & clinical partners" },
];

export const mission =
  "To provide a holistic education through inventive teaching, learning, and research aimed at fostering socio-economic transformation.";
export const vision = "An innovation-driven university.";

export const coreValues = [
  { title: "Integrity", text: "We uphold honesty, ethics and professionalism, fostering transparency, trust and responsibility." },
  { title: "Progression", text: "We embrace innovation, continuous improvement and lifelong learning in an ever-changing world." },
  { title: "Accountability", text: "We take responsibility for our actions and outcomes while promoting good governance and public confidence." },
  { title: "Respect", text: "We value the dignity, worth and uniqueness of every individual in an inclusive community." },
  { title: "Synergy", text: "We work together, drawing on diverse talents, experiences and perspectives to achieve greater impact." },
];

export const history = [
  { year: "2009", title: "The idea is born", text: "King Ceasor Augustus Mulenga conceives the university and obtains an interim letter of authority." },
  { year: "2011", title: "Provisional licence", text: "On 26 September 2011 the University obtains a Provisional Licence from the National Council for Higher Education (NCHE)." },
  { year: "2010s", title: "St. Augustine International University", text: "The institution grows its academic programmes and student community." },
  { year: "2020", title: "King Ceasor University", text: "The University is renamed King Ceasor University, reflecting its evolving identity." },
  { year: "2025", title: "University Charter", text: "On 3 July 2025 KCU is granted a full University Charter by the Government of Uganda." },
];

export const whyKcu = [
  { title: "A chartered university", text: "Fully chartered since July 2025 and regulated by Uganda's National Council for Higher Education." },
  { title: "Internationally recognised medicine", text: "Our MBChB programme is recognised through ECFMG pathways, opening doors for graduates worldwide." },
  { title: "Study around your life", text: "Day and weekend classes, plus K-Class e-learning, for school leavers and working professionals." },
  { title: "Affordable, with loan support", text: "Transparent fees and access to government-backed HESFB student loans for eligible students." },
];

// PLACEHOLDER: confirm dates with the Academic Registrar.
export const intakes = [
  { name: "January 2027 Intake", status: "Open", opens: "1 September 2026", closes: "18 December 2026", starts: "11 January 2027" },
  { name: "May 2027 Intake (selected programmes)", status: "Opening soon", opens: "1 February 2027", closes: "17 April 2027", starts: "10 May 2027" },
  { name: "August 2027 Intake", status: "Opening soon", opens: "1 March 2027", closes: "16 July 2027", starts: "9 August 2027" },
];

export const applicationSteps = [
  { title: "Choose your programme", text: "Use the programme finder to compare courses, entry requirements and fees." },
  { title: "Prepare your documents", text: "Scan your academic certificates and transcripts, national ID or passport, and a passport photo." },
  { title: "Apply online", text: "Create an account at apply.kcu.ac.ug, complete the form and upload your documents." },
  { title: "Pay the application fee", text: "Pay the non-refundable application fee using the payment options shown on the portal." },
  { title: "Receive your offer", text: "Successful applicants receive an admission letter by email, usually within two weeks." },
  { title: "Register and join us", text: "Pay your fees, register on the Academia portal and attend orientation week." },
];

export const requiredDocuments = [
  "Photocopies of academic documents (UCE, UACE, diploma or degree transcripts)",
  "Photocopy of National ID or passport",
  "Two recent passport-size photographs",
  "Equated results from UNEB / NCHE for foreign qualifications",
  "Evidence of English proficiency (where English was not the medium of instruction)",
];

export const admissionFaqs = [
  { q: "When can I apply?", a: "KCU admits students in January and August, with selected programmes in May. Applications for the January 2027 intake are open now." },
  { q: "How much is the application fee?", a: "The application fee is shown on the online application portal and can be paid by mobile money or bank. It is non-refundable." },
  { q: "Can I study while working?", a: "Yes. Many degree and diploma programmes offer weekend classes, and professional certificates run in flexible formats." },
  { q: "Do you accept international students?", a: "Yes. KCU welcomes students from across Africa and beyond. See the International Students page for requirements, fees in USD and visa guidance." },
  { q: "Can I get a student loan?", a: "KCU has an MoU with the Higher Education Students' Financing Board (HESFB). Eligible Ugandan students can apply for government-backed loans." },
  { q: "I don't meet the entry requirements. What can I do?", a: "Consider a one-year Higher Education Certificate, which bridges you into degree programmes, or apply under mature-age entry if you are 25 or older." },
];

export const funding = [
  { title: "HESFB Student Loans", text: "Government-backed loans for eligible Ugandan students through KCU's MoU with the Higher Education Students' Financing Board.", href: "https://www.hesfb.go.ug/" },
  { title: "Instalment payments", text: "Pay tuition in agreed instalments each semester. Speak to the Finance Office for a payment plan." },
  { title: "Merit awards" /* PLACEHOLDER */, text: "Partial tuition awards for top-performing applicants and continuing students, reviewed each academic year." },
  { title: "Sponsorship & employer support", text: "Many students are sponsored by employers, families or organisations. We provide sponsor letters on request." },
];

export const newsletters = [
  { title: "September 2026 Journal · Issue 08", file: "/newsletter/SEPTEMBER Journal Issue 08.pdf", size: "26 MB", date: "September 2026" },
  { title: "Weekly Newsletter · Issue 7", file: "/newsletter/WEEKLY NEWSLETTER 7 ISSUE.pdf", size: "2 MB", date: "August 2026" },
  { title: "July 2026 Journal", file: "/newsletter/JULY Journal 4 v-2.pdf", size: "25 MB", date: "July 2026" },
  { title: "June 2026 Journal", file: "/newsletter/JUNE Journal 4 v-6.pdf", size: "10 MB", date: "June 2026" },
];

/** Credentials shown wherever applicants decide whether to trust us. */
export const accreditations = [
  { title: "Chartered university", text: "Full University Charter granted by the Government of Uganda in July 2025." },
  { title: "NCHE accredited", text: "Programmes accredited by Uganda's National Council for Higher Education." },
  { title: "ECFMG-recognised MBChB", text: "Our medical degree opens international pathways for graduates." },
  { title: "HESFB loan partner", text: "Eligible students can study with government-backed student loans." },
];

/** From the 6th Graduation Ceremony news story (3 July 2026). */
export const latestGraduation = {
  name: "6th Graduation Ceremony",
  date: "3 July 2026",
  graduates: "396",
  doctors: "175",
  countries: ["Uganda", "Cameroon", "Nigeria", "Pakistan", "Somalia", "India", "Sudan"],
  slug: "king-ceasor-university-celebrates-6th-graduation-ceremony",
};

/** Recent student achievements, each backed by a news story. */
export const achievementSlugs = [
  "kcu-emerges-best-presenting-university-at-first-interuniversity-anatomy-workshop",
  "kcu-anatomy-surgery-society-excels-at-inaugural-inter-university-surgical-skills",
  "kcu-secures-third-place-at-nfsu-capture-the-flag-finals",
];

export const joinSteps = [
  { title: "Choose a programme", text: "Compare courses, entry requirements and fees in minutes." },
  { title: "Apply online", text: "Fill in one short form at apply.kcu.ac.ug and upload your documents." },
  { title: "Get your offer", text: "Most applicants receive an admission letter by email within two weeks." },
];
