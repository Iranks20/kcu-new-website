// PLACEHOLDER: sample events for the presentation. Replace with real dates from the events office.

export type UniEvent = {
  slug: string;
  title: string;
  /** ISO date, YYYY-MM-DD */
  date: string;
  time: string;
  location: string;
  category: "Admissions" | "Academic" | "Public Lecture" | "Student Life" | "Ceremony";
  summary: string;
  description: string[];
  image: string;
};

export const events: UniEvent[] = [
  {
    slug: "open-day-november-2026",
    title: "KCU Open Day for Prospective Students",
    date: "2026-11-14",
    time: "9:00 AM – 3:00 PM",
    location: "Main Campus, Bunga Hill",
    category: "Admissions",
    summary: "Tour the campus, meet lecturers and current students, and get help with your January 2027 application.",
    description: [
      "Discover what it is like to study at King Ceasor University. Join guided campus tours, visit our laboratories and library, and talk to academic staff from all three schools.",
      "The admissions team will be on hand to answer questions about entry requirements, fees, HESFB student loans and accommodation, and to help you complete your online application on the day.",
      "Parents, guardians and school career teachers are welcome.",
    ],
    image: "/media/images-kcu-2026-graduates-welcome-group.webp",
  },
  {
    slug: "public-lecture-ai-and-the-law",
    title: "Public Lecture: Artificial Intelligence and the Law in East Africa",
    date: "2026-11-20",
    time: "2:00 PM – 4:30 PM",
    location: "Moot Court Room, Main Campus",
    category: "Public Lecture",
    summary: "The School of Law & Management Sciences and the Department of AI & Data Science host a joint public lecture.",
    description: [
      "Legal scholars and technologists discuss how artificial intelligence is changing evidence, privacy, intellectual property and access to justice in East Africa.",
      "The lecture is free and open to students, practitioners and members of the public. Registration is recommended as seating is limited.",
    ],
    image: "/images/kcu-2026/library-collaboration.webp",
  },
  {
    slug: "inter-university-moot-court-2026",
    title: "KCU Inter-University Moot Court Competition",
    date: "2026-12-05",
    time: "8:30 AM – 5:00 PM",
    location: "Moot Court Room, Main Campus",
    category: "Student Life",
    summary: "Law students from universities across Uganda compete before a panel of practising advocates and judges.",
    description: [
      "Teams argue a problem on constitutional and human rights law before a bench of experienced practitioners.",
      "Spectators are welcome to attend the semi-final and final rounds in the afternoon.",
    ],
    image: "/images/kcu-2026/library-group-study.webp",
  },
  {
    slug: "january-2027-orientation",
    title: "January 2027 Intake Orientation Week",
    date: "2027-01-11",
    time: "8:00 AM daily, 11–15 January",
    location: "Main Campus, Bunga Hill",
    category: "Academic",
    summary: "A week of welcome sessions, registration support and campus tours for all new students.",
    description: [
      "Orientation introduces new students to university life: registration, the Academia portal, K-Class e-learning, the library, student support services and the Student Guild.",
      "Attendance is compulsory for all new students. Bring your admission letter and academic documents for verification.",
    ],
    image: "/images/kcu-2026/student-laptop-collaboration.webp",
  },
  {
    slug: "career-fair-2027",
    title: "KCU Career & Internship Fair 2027",
    date: "2027-02-18",
    time: "10:00 AM – 4:00 PM",
    location: "University Rooftop, Main Campus",
    category: "Student Life",
    summary: "Meet employers in health, law, finance, energy and technology, and find internship and graduate opportunities.",
    description: [
      "Employers and partner organisations showcase internships, attachments and graduate roles. Bring copies of your CV.",
      "CV clinics and mock interviews run throughout the day.",
    ],
    image: "/images/kcu-2026/graduates-campus-trio.webp",
  },
  {
    slug: "health-sciences-research-symposium-2027",
    title: "Health Sciences Research Symposium",
    date: "2027-03-10",
    time: "9:00 AM – 4:00 PM",
    location: "Main Campus, Bunga Hill",
    category: "Academic",
    summary: "Students and faculty present research on community health, clinical practice and health systems.",
    description: [
      "The School of Medicine, Health & Life Sciences presents oral and poster research from students and faculty.",
      "External researchers and partner hospitals are invited to attend and collaborate.",
    ],
    image: "/images/kcu-2026/anatomy-learning-group.webp",
  },
];

export function getEvent(slug: string) {
  return events.find((e) => e.slug === slug);
}
