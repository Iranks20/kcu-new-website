import { programmes, levelLabels } from "./programmes";
import { schools } from "./schools";
import { news } from "./news";
import { events } from "./events";
import { council, management, trustees, viceChancellor } from "./people";
import { allStaff } from "./staff";
import { formatDate } from "@/lib/utils";

export type SearchKind = "Programme" | "School" | "Page" | "News" | "Event" | "Person";

export type SearchItem = {
  kind: SearchKind;
  title: string;
  /** One short line shown under the title. */
  meta: string;
  href: string;
  /** Extra words that should match but are not displayed. */
  keywords?: string;
};

const pages: SearchItem[] = [
  { kind: "Page", title: "Admissions", meta: "How to apply, requirements and key dates", href: "/admissions", keywords: "apply application intake deadline" },
  { kind: "Page", title: "Tuition fees", meta: "Fees for every programme", href: "/admissions#fees", keywords: "cost price tuition ugx usd" },
  { kind: "Page", title: "KCU 2030", meta: "Strategic priorities to 2030", href: "/about/kcu-2030", keywords: "strategy strategic plan vision 2030 priorities" },
  { kind: "Page", title: "Suppliers & tenders", meta: "Procurement notices and supplier registration", href: "/suppliers", keywords: "tender procurement supplier bid notice" },
  { kind: "Page", title: "Request information", meta: "Ask admissions for programme details and fees", href: "/request-information", keywords: "enquiry brochure contact admissions info" },
  { kind: "Page", title: "Employers & partners", meta: "Hire graduates, host interns, verify certificates", href: "/employers", keywords: "employer hire recruit internship placement verify certificate transcript verification" },
  { kind: "Page", title: "January 2027 intake", meta: "Applications open: featured programmes and key dates", href: "/intake", keywords: "intake january 2027 admissions open apply deadline flyer" },
  { kind: "Page", title: "Current students", meta: "Portals, key dates, fee payment and support", href: "/students", keywords: "academia portal timetable results registration exams pay fees student number" },
  { kind: "Page", title: "Parents & sponsors", meta: "Fees, safety, accommodation and contacts", href: "/parents", keywords: "parent guardian sponsor employer pay fees" },
  { kind: "Page", title: "Library", meta: "Opening hours, e-resources and research help", href: "/library", keywords: "books journals catalogue study space" },
  { kind: "Page", title: "Facts & figures", meta: "KCU at a glance, strategy and policies", href: "/about/facts", keywords: "statistics numbers strategic plan policies regulations" },
  { kind: "Page", title: "Campus map", meta: "Find buildings, labs and parking", href: "/visit/campus-map", keywords: "map directions building block parking" },
  { kind: "Page", title: "Track my application", meta: "Check your application status", href: "/admissions/track", keywords: "status admission letter offer" },
  { kind: "Page", title: "Compare programmes", meta: "Fees, duration and requirements side by side", href: "/programmes/compare", keywords: "compare versus vs difference" },
  { kind: "Page", title: "Academic calendar", meta: "Semester dates, exams, holidays and graduation", href: "/academic-calendar", keywords: "calendar semester exams holiday term dates recess orientation graduation" },
  { kind: "Page", title: "Virtual campus tour", meta: "Walk through ten campus stops online", href: "/visit/virtual-tour", keywords: "virtual tour 360 campus photos facilities" },
  { kind: "Page", title: "Press & media", meta: "Media contacts, fact sheet and logos", href: "/press", keywords: "press media journalist logo brand newsletter" },
  { kind: "Page", title: "Fees calculator", meta: "Estimate the total cost of your programme", href: "/admissions#calculator", keywords: "cost estimate budget" },
  { kind: "Page", title: "Scholarships & funding", meta: "Merit awards, HESFB loans and instalments", href: "/scholarships", keywords: "scholarship bursary hesfb loan sponsor award discount" },
  { kind: "Page", title: "Postgraduate study", meta: "Master's programmes in development", href: "/postgraduate", keywords: "masters mba msc llm mph postgraduate diploma" },
  { kind: "Page", title: "Student stories", meta: "Life at KCU in students' words", href: "/stories", keywords: "testimonial experience day in the life" },
  { kind: "Page", title: "Alumni", meta: "Join the KCU alumni network", href: "/alumni", keywords: "graduates network reunion" },
  { kind: "Page", title: "Staff directory", meta: "Find KCU staff", href: "/about/staff", keywords: "lecturer staff people directory" },
  { kind: "Page", title: "International students", meta: "Fees in US dollars, student pass and arrival", href: "/international", keywords: "visa foreign abroad" },
  { kind: "Page", title: "Visit campus", meta: "Campus film, tours and open days", href: "/visit", keywords: "tour open day directions map video" },
  { kind: "Page", title: "Campus life", meta: "Guild, clubs, support and accommodation", href: "/campus-life", keywords: "hostel accommodation clubs sports guild" },
  { kind: "Page", title: "Research", meta: "Research groups, projects, publications and partnerships", href: "/research", keywords: "publications centres projects innovation collaborate" },
  { kind: "Page", title: "About KCU", meta: "Mission, history and charter", href: "/about", keywords: "charter accreditation history mission" },
  { kind: "Page", title: "Leadership & governance", meta: "Management, Council and Trustees", href: "/about/leadership" },
  { kind: "Page", title: "Careers at KCU", meta: "Job vacancies", href: "/careers", keywords: "jobs vacancy employment" },
  { kind: "Page", title: "Gallery", meta: "Photos from campus", href: "/gallery" },
  { kind: "Page", title: "Contact us", meta: "Phone, email and enquiry form", href: "/contact", keywords: "phone email address" },
];

/** Everything the header search can find, built once at build time. */
export function buildSearchIndex(): SearchItem[] {
  const people = [viceChancellor, ...management, ...council, ...trustees];
  const staff = allStaff();
  return [
    ...programmes.map((p) => ({
      kind: "Programme" as const,
      title: p.title,
      meta: `${levelLabels[p.level]} · ${p.duration}`,
      href: `/programmes/${p.slug}`,
      keywords: `${p.code} ${p.careers.join(" ")}`,
    })),
    ...schools.map((s) => ({ kind: "School" as const, title: s.name, meta: s.tagline, href: `/schools/${s.slug}`, keywords: s.departments.map((d) => d.name).join(" ") })),
    ...pages,
    ...events.map((e) => ({ kind: "Event" as const, title: e.title, meta: `${formatDate(e.date)} · ${e.location}`, href: `/events/${e.slug}` })),
    ...news.map((n) => ({ kind: "News" as const, title: n.title, meta: `${n.category} · ${formatDate(n.date)}`, href: `/news/${n.slug}` })),
    ...people.map((p) => ({ kind: "Person" as const, title: p.name, meta: p.role, href: "/about/leadership" })),
    ...staff.filter((p) => !people.some((l) => l.name === p.name)).map((p) => ({ kind: "Person" as const, title: p.name, meta: p.role, href: `/about/staff/${p.slug}` })),
  ];
}
