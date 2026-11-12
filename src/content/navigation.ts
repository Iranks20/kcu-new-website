export type NavLink = { label: string; href: string };
export type NavItem = {
  label: string;
  href: string;
  intro: string;
  columns: { title: string; links: NavLink[] }[];
  feature?: { title: string; text: string; href: string; image: string };
};

/** Audience shortcuts in the top bar and mobile menu. Each link lives in one place in the main menus below. */
export const audienceLinks: NavLink[] = [
  { label: "Current students", href: "/students" },
  { label: "Parents & sponsors", href: "/parents" },
  { label: "Alumni", href: "/alumni" },
  { label: "Employers", href: "/employers" },
  { label: "Staff", href: "/about/staff" },
];

export const mainNav: NavItem[] = [
  {
    label: "Study",
    href: "/programmes",
    intro: "Degrees, diplomas and professional courses across three schools, with day and weekend study.",
    columns: [
      {
        title: "Programmes",
        links: [
          { label: "Find a programme", href: "/programmes" },
          { label: "Undergraduate degrees", href: "/programmes?level=degree" },
          { label: "Diplomas", href: "/programmes?level=diploma" },
          { label: "Bridging certificates", href: "/programmes?level=hec" },
          { label: "Short courses", href: "/programmes?level=certificate" },
          { label: "Compare programmes", href: "/programmes/compare" },
        ],
      },
      {
        title: "Schools",
        links: [
          { label: "Medicine, Health & Life Sciences", href: "/schools/medicine-health-life-sciences" },
          { label: "Law & Management Sciences", href: "/schools/law-management-sciences" },
          { label: "Science, Computing & Engineering", href: "/schools/science-computing-engineering" },
          { label: "All schools", href: "/schools" },
        ],
      },
    ],
    feature: {
      title: "Bachelor of Medicine & Surgery",
      text: "Recognised through ECFMG pathways.",
      href: "/programmes/bachelor-of-medicine-and-bachelor-of-surgery",
      image: "/images/community-outreach/clinical-training-theatre.jpeg",
    },
  },
  {
    label: "Admissions",
    href: "/admissions",
    intro: "Everything you need to apply, from entry requirements to fees, funding and key dates.",
    columns: [
      {
        title: "Apply",
        links: [
          { label: "January 2027 intake", href: "/intake" },
          { label: "How to apply", href: "/admissions#apply" },
          { label: "Entry requirements", href: "/admissions#requirements" },
          { label: "Intakes & key dates", href: "/admissions#intakes" },
          { label: "Request information", href: "/request-information" },
          { label: "Track my application", href: "/admissions/track" },
          { label: "Apply online", href: "https://apply.kcu.ac.ug/" },
        ],
      },
      {
        title: "Fees & support",
        links: [
          { label: "Tuition fees", href: "/admissions#fees" },
          { label: "Fees calculator", href: "/admissions#calculator" },
          { label: "Scholarships & funding", href: "/scholarships" },
          { label: "International students", href: "/international" },
          { label: "Parents & sponsors", href: "/parents" },
        ],
      },
      {
        title: "Visit",
        links: [
          { label: "Visit campus", href: "/visit" },
          { label: "Virtual tour", href: "/visit/virtual-tour" },
          { label: "Campus map", href: "/visit/campus-map" },
        ],
      },
    ],
    feature: {
      title: "January 2027 intake",
      text: "Applications close 18 December 2026.",
      href: "/intake",
      image: "/images/kcu-2026/graduates-best-of-best.webp",
    },
  },
  {
    label: "Research",
    href: "/research",
    intro: "Research that responds to Uganda's priorities in health, justice, technology, energy and agriculture.",
    columns: [
      {
        title: "Research & innovation",
        links: [
          { label: "Research at KCU", href: "/research" },
          { label: "Research groups & projects", href: "/research#centres" },
          { label: "Publications", href: "/research#publications" },
          { label: "Partner with us", href: "/research#collaborate" },
        ],
      },
    ],
    feature: {
      title: "AI, data science & cyber security",
      text: "Inside the School of Science, Computing & Engineering.",
      href: "/schools/science-computing-engineering",
      image: "/images/kcu-2026/student-laptop-collaboration.webp",
    },
  },
  {
    label: "Campus Life",
    href: "/campus-life",
    intro: "Lead, compete, serve and belong on Bunga Hill.",
    columns: [
      {
        title: "Student life",
        links: [
          { label: "Life at KCU", href: "/campus-life" },
          { label: "Student stories", href: "/stories" },
          { label: "Student Guild", href: "/campus-life#guild" },
          { label: "Clubs & sports", href: "/campus-life#clubs" },
        ],
      },
      {
        title: "Support",
        links: [
          { label: "Current students", href: "/students" },
          { label: "Student support", href: "/campus-life#support" },
          { label: "Accommodation", href: "/campus-life#accommodation" },
          { label: "Library", href: "/library" },
        ],
      },
    ],
  },
  {
    label: "News & Events",
    href: "/news",
    intro: "Stories, announcements and what's coming up across the University.",
    columns: [
      {
        title: "Stay informed",
        links: [
          { label: "Latest news", href: "/news" },
          { label: "Upcoming events", href: "/events" },
          { label: "Academic calendar", href: "/academic-calendar" },
          { label: "Press & media", href: "/press" },
        ],
      },
    ],
  },
  {
    label: "About",
    href: "/about",
    intro: "A chartered university founded on integrity, progression and service.",
    columns: [
      {
        title: "The University",
        links: [
          { label: "About KCU", href: "/about" },
          { label: "Vice Chancellor's message", href: "/about#vice-chancellor" },
          { label: "Facts & figures", href: "/about/facts" },
          { label: "KCU 2030", href: "/about/kcu-2030" },
          { label: "Leadership & governance", href: "/about/leadership" },
          { label: "Policies & strategic plan", href: "/about/facts#policies" },
        ],
      },
      {
        title: "Information for",
        links: [
          { label: "Employers & partners", href: "/employers" },
          { label: "Media", href: "/press" },
          { label: "Suppliers & tenders", href: "/suppliers" },
          { label: "Job applicants", href: "/careers" },
          { label: "Alumni", href: "/alumni" },
          { label: "Staff directory", href: "/about/staff" },
          { label: "Contact us", href: "/contact" },
        ],
      },
    ],
  },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Study",
    links: [
      { label: "Find a programme", href: "/programmes" },
      { label: "Compare programmes", href: "/programmes/compare" },
      { label: "Postgraduate study", href: "/postgraduate" },
      { label: "How to apply", href: "/admissions#apply" },
      { label: "Fees & funding", href: "/admissions#fees" },
      { label: "Scholarships", href: "/scholarships" },
      { label: "International students", href: "/international" },
      { label: "Parents & sponsors", href: "/parents" },
      { label: "Request information", href: "/request-information" },
    ],
  },
  {
    title: "University",
    links: [
      { label: "About KCU", href: "/about" },
      { label: "Facts & figures", href: "/about/facts" },
      { label: "KCU 2030", href: "/about/kcu-2030" },
      { label: "Our schools", href: "/schools" },
      { label: "Research", href: "/research" },
      { label: "Leadership", href: "/about/leadership" },
      { label: "Staff directory", href: "/about/staff" },
      { label: "Employers & partners", href: "/employers" },
      { label: "Careers", href: "/careers" },
      { label: "Press & media", href: "/press" },
      { label: "Suppliers & tenders", href: "/suppliers" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Current students", href: "/students" },
      { label: "Academic calendar", href: "/academic-calendar" },
      { label: "Library", href: "/library" },
      { label: "Campus life", href: "/campus-life" },
      { label: "Visit & campus map", href: "/visit" },
      { label: "Alumni", href: "/alumni" },
      { label: "News & events", href: "/news" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
];
