export type NavLink = { label: string; href: string };
export type NavItem = {
  label: string;
  href: string;
  intro: string;
  columns: { title: string; links: NavLink[] }[];
  feature?: { title: string; text: string; href: string; image: string };
};

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
          { label: "Postgraduate (coming soon)", href: "/postgraduate" },
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
          { label: "How to apply", href: "/admissions#apply" },
          { label: "Entry requirements", href: "/admissions#requirements" },
          { label: "Intakes & key dates", href: "/admissions#intakes" },
          { label: "Academic calendar", href: "/academic-calendar" },
          { label: "Visit campus", href: "/visit" },
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
          { label: "Admissions FAQs", href: "/admissions#faqs" },
        ],
      },
    ],
    feature: {
      title: "January 2027 intake",
      text: "Applications close 18 December 2026.",
      href: "/admissions#intakes",
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
          { label: "Focus areas", href: "/research#areas" },
          { label: "Research groups", href: "/research#centres" },
          { label: "Projects & awards", href: "/research#projects" },
          { label: "Publications", href: "/research#publications" },
          { label: "Partnerships", href: "/research#partners" },
          { label: "Collaborate with us", href: "/research#collaborate" },
          { label: "Library", href: "https://library.kcu.ac.ug/" },
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
          { label: "Visit & campus tour", href: "/visit" },
          { label: "Virtual tour", href: "/visit/virtual-tour" },
          { label: "Student stories", href: "/stories" },
          { label: "Student Guild", href: "/campus-life#guild" },
          { label: "Clubs & sports", href: "/campus-life#clubs" },
          { label: "Gallery", href: "/gallery" },
        ],
      },
      {
        title: "Support",
        links: [
          { label: "Student support", href: "/campus-life#support" },
          { label: "Accommodation", href: "/campus-life#accommodation" },
          { label: "K-Class e-learning", href: "https://vclass.kcu.ac.ug/" },
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
          { label: "Gallery", href: "/gallery" },
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
          { label: "Charter & accreditation", href: "/about#accreditation" },
          { label: "Leadership & governance", href: "/about/leadership" },
          { label: "Staff directory", href: "/about/staff" },
        ],
      },
      {
        title: "Connect",
        links: [
          { label: "Alumni", href: "/alumni" },
          { label: "Careers at KCU", href: "/careers" },
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
      { label: "How to apply", href: "/admissions#apply" },
      { label: "Entry requirements", href: "/admissions#requirements" },
      { label: "Fees & funding", href: "/admissions#fees" },
      { label: "Scholarships", href: "/scholarships" },
      { label: "Academic calendar", href: "/academic-calendar" },
      { label: "International students", href: "/international" },
    ],
  },
  {
    title: "University",
    links: [
      { label: "About KCU", href: "/about" },
      { label: "Our schools", href: "/schools" },
      { label: "Research", href: "/research" },
      { label: "Leadership", href: "/about/leadership" },
      { label: "Staff directory", href: "/about/staff" },
      { label: "Alumni", href: "/alumni" },
      { label: "Careers", href: "/careers" },
      { label: "Press & media", href: "/press" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Campus life", href: "/campus-life" },
      { label: "Visit campus", href: "/visit" },
      { label: "Virtual tour", href: "/visit/virtual-tour" },
      { label: "Student stories", href: "/stories" },
      { label: "News", href: "/news" },
      { label: "Events", href: "/events" },
      { label: "Gallery", href: "/gallery" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
