// Content for the Current students hub, Parents & sponsors page and the Library page.
//
// Portal links, the policies folder, the University Librarian and the ICT Manager are real. Opening hours, the fee
// payment steps, service lists and FAQs are PLACEHOLDER content for the presentation: confirm them with the
// Academic Registrar, Finance Office, Dean of Students and Library before launch. Never publish bank account
// numbers here without Finance Office sign-off.

import { portals, site } from "./site";

export const studentPortals = [
  { label: "Academia student portal", text: "Registration, results, timetables and fee statements", href: portals[0].href },
  { label: "K-Class e-learning", text: "Course materials, assignments and online classes", href: portals[1].href },
  { label: "Library catalogue", text: "Search books, journals and e-resources", href: portals[2].href },
  { label: "University policies", text: "Regulations, handbooks and guidelines", href: site.policiesUrl },
];

export const studentTasks = [
  { title: "Register for the semester", text: "Pay at least the minimum fees, then register your courses on Academia before the registration deadline.", href: "/academic-calendar" },
  { title: "Check your timetable", text: "Lecture and examination timetables are published on Academia at the start of each semester.", href: portals[0].href },
  { title: "See your results", text: "Results are released on Academia after the Senate approves them. Contact your school if a mark is missing.", href: portals[0].href },
  { title: "Apply to graduate", text: "Complete graduation clearance with Finance, Library and your school before the deadline set by the Academic Registrar.", href: "/academic-calendar" },
];

// PLACEHOLDER: confirm the accepted payment channels with the Finance Office.
export const feeSteps = [
  { title: "Get your fee statement", text: "Log in to Academia to see your fees for the semester and your student number." },
  { title: "Pay by bank or mobile money", text: "Pay through the University's bank accounts or mobile money, quoting your student number. Account details are printed on your fee statement." },
  { title: "Keep your receipt", text: "Upload or present your payment slip to the Finance Office. Payments usually reflect on Academia within two working days." },
];

export const studentSupport = [
  { title: "Dean of Students", text: "Welfare, accommodation, international students and student conduct." },
  { title: "Counselling", text: "Free and confidential counselling, in person or by phone." },
  { title: "ICT help desk", text: "Help with Academia, K-Class, Wi-Fi and University email, from the ICT office led by Mr. Mwima Abdallah." },
  { title: "Disability support", text: "Reasonable adjustments for learning and examinations, arranged through the Dean of Students." },
];

export const parentReasons = [
  { title: "A chartered university", text: "KCU holds a full University Charter (July 2025) and its programmes are accredited by the National Council for Higher Education." },
  { title: "Safe, supervised campus", text: "A gated campus with security around the clock, and a Dean of Students' office responsible for student welfare." },
  { title: "Vetted accommodation", text: "The University works with inspected partner hostels within walking distance of campus." },
  { title: "Transparent fees", text: "Published tuition for every programme, instalment plans and access to government-backed HESFB student loans." },
];

// PLACEHOLDER: confirm with the Dean of Students and Finance Office.
export const parentFaqs = [
  { q: "How do I pay my child's fees?", a: "Pay by bank or mobile money using your child's student number. The account details are on the fee statement from the Academia portal. Keep the receipt and share it with the Finance Office." },
  { q: "Can fees be paid in instalments?", a: "Yes. The Finance Office agrees instalment plans each semester. A minimum payment is needed before your child can register for courses." },
  { q: "Can I see my child's results?", a: "Results belong to the student. Ask your child to share them from the Academia portal. The University may contact sponsors about fees, but shares academic records only with the student's consent." },
  { q: "Is there accommodation on campus?", a: "KCU works with vetted private hostels close to campus. The Dean of Students' office helps new and international students find a room." },
  { q: "Can my employer or organisation sponsor a student?", a: "Yes. The Finance Office issues sponsor letters, invoices and receipts, and can invoice organisations directly." },
  { q: "Who do I call in an emergency?", a: `Call the University on ${site.contact.phone} during office hours. Out of hours, campus security can reach the Dean of Students.` },
];

export const library = {
  librarian: { name: "Mr. Eric Keziron Oloo", role: "University Librarian", image: "/media/university-management-mr-eric-keziron-oloo.webp" },
  // PLACEHOLDER: confirm opening hours with the Library.
  hours: [
    { days: "Monday – Friday", time: "8:00 AM – 9:00 PM" },
    { days: "Saturday", time: "9:00 AM – 5:00 PM" },
    { days: "Sunday & public holidays", time: "Closed (extended hours during examinations)" },
  ],
  services: [
    { title: "Borrowing", text: "Borrow print books with your student or staff ID. Renew online through the catalogue." },
    { title: "E-resources", text: "E-books and e-journal databases for health, law, business and computing, on campus and remotely." },
    { title: "Study spaces", text: "Quiet reading areas, group study rooms and computers with internet access." },
    { title: "Research support", text: "Help with literature searches, referencing and similarity checking for dissertations." },
    { title: "Information skills training", text: "Workshops each semester, including the annual Library Week." },
    { title: "Visitors", text: "Researchers from other institutions can use the Library for reference with prior arrangement." },
  ],
};

/** Strategic priorities, as set out in the Vice Chancellor's message. */
export const strategicPriorities = [
  { title: "Competency-based education", text: "Rolling out Competency-Based Education and Training (CBET) so graduates leave with practical, job-ready skills." },
  { title: "Research & innovation", text: "Growing research groups and student innovation that respond to Uganda's priorities." },
  { title: "Global partnerships", text: "Strengthening academic, clinical and exchange partnerships on four continents." },
  { title: "Technology in learning", text: "Blended learning through K-Class and digital services for students and staff." },
];
