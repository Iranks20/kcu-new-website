// PLACEHOLDER: illustrative student profiles written for the presentation. The names are fictional and every entry
// is marked `sample: true`, which shows an "Illustrative profile" label on the site. Replace each one with a real,
// consented student story before launch. Photos show the setting (lab, library, campus), not the person named.

export type StudentStory = {
  slug: string;
  name: string;
  /** Programme slug, from programmes.ts */
  programme: string;
  stage: string;
  from: string;
  quote: string;
  summary: string;
  image: string;
  imageAlt: string;
  /** "A day in the life" timeline. */
  day: { time: string; text: string }[];
  body: { heading: string; text: string }[];
  sample: true;
};

export const stories: StudentStory[] = [
  {
    slug: "a-day-as-a-kcu-medical-student",
    name: "Aisha Nakato",
    programme: "bachelor-of-medicine-and-bachelor-of-surgery",
    stage: "Year 4, MBChB",
    from: "Masaka, Uganda",
    quote: "The first time I clerked a patient on my own, everything from the anatomy lab suddenly made sense.",
    summary: "From early ward rounds to evening revision in the library: what a clinical-year day really looks like.",
    image: "/images/kcu-2026/clinical-skills-patient.webp",
    imageAlt: "Medical students practising patient care in the KCU clinical skills laboratory",
    day: [
      { time: "6:45 AM", text: "Boda to the teaching hospital for the morning handover." },
      { time: "8:00 AM", text: "Ward round with the consultant. I present two of the patients I admitted yesterday." },
      { time: "11:30 AM", text: "Bedside teaching on examining the abdomen, then I write up my case notes." },
      { time: "2:00 PM", text: "Back on campus for a pharmacology tutorial in small groups." },
      { time: "4:30 PM", text: "Practise suturing and cannulation in the clinical skills lab before the end-of-rotation exam." },
      { time: "7:00 PM", text: "Revision with my study group in the library, then home." },
    ],
    body: [
      { heading: "Why I chose KCU", text: "I wanted a medical school where I would touch patients early. In first year we were already in the skills lab, and by third year I was on the wards. Small tutorial groups mean lecturers know your name." },
      { heading: "The hardest part", text: "Balancing long ward days with exam revision. The anatomy and surgery society runs peer revision sessions, and second-year students mentor first-years, which helped me a lot." },
      { heading: "What's next", text: "I want to specialise in paediatrics and work in a regional referral hospital, closer to home." },
    ],
    sample: true,
  },
  {
    slug: "learning-law-in-the-moot-court",
    name: "Brian Tumusiime",
    programme: "bachelor-of-laws",
    stage: "Year 3, Bachelor of Laws",
    from: "Mbarara, Uganda",
    quote: "Standing up in the Moot Court Room taught me more about advocacy than any textbook.",
    summary: "How weekly moots and inter-university competitions are turning a shy first-year into a confident advocate.",
    image: "/media/news-images-moot-court.webp",
    imageAlt: "Law students arguing a case in the KCU Moot Court Room",
    day: [
      { time: "8:00 AM", text: "Constitutional law lecture, with a debate on a recent Supreme Court ruling." },
      { time: "10:30 AM", text: "Research session in the library's law collection for my moot memorial." },
      { time: "1:00 PM", text: "Lunch with the Law Society committee to plan our legal aid clinic." },
      { time: "3:00 PM", text: "Moot rehearsal: our coach plays the judge and grills us on every authority." },
      { time: "6:00 PM", text: "Reading cases for tomorrow's land law tutorial." },
    ],
    body: [
      { heading: "Why I chose KCU", text: "A friend told me KCU law students moot from first year. I was terrified of public speaking, which is exactly why I came." },
      { heading: "Proudest moment", text: "Reaching the semi-finals of the inter-university moot court competition with my team." },
      { heading: "What's next", text: "I plan to go to the Law Development Centre and then work in human rights litigation." },
    ],
    sample: true,
  },
  {
    slug: "nursing-with-heart",
    name: "Grace Atim",
    programme: "bachelor-of-nursing-science-direct",
    stage: "Year 2, Bachelor of Nursing Science",
    from: "Gulu, Uganda",
    quote: "Nursing is science and kindness at the same time. KCU teaches you both.",
    summary: "Ward placements, simulation labs and the night shift that confirmed she had chosen the right career.",
    image: "/images/kcu-2026/clinical-skills-practice.webp",
    imageAlt: "Nursing students practising newborn care on a manikin",
    day: [
      { time: "7:00 AM", text: "Placement on the maternity ward: vital signs and medication rounds with my mentor." },
      { time: "12:00 PM", text: "Reflective practice session with my clinical instructor." },
      { time: "2:00 PM", text: "Lecture on medical and surgical nursing." },
      { time: "4:00 PM", text: "Simulation lab: managing a deteriorating patient scenario." },
      { time: "6:30 PM", text: "Christian Medical Fellowship meeting with friends." },
    ],
    body: [
      { heading: "Why I chose KCU", text: "My aunt is a midwife. She told me to choose a school with real placements from early on, and KCU had them." },
      { heading: "The best part", text: "The simulation lab. You can make mistakes there and learn from them before you are with a real patient." },
      { heading: "What's next", text: "I want to become a nurse educator and train the next generation of nurses in northern Uganda." },
    ],
    sample: true,
  },
  {
    slug: "catching-cyber-criminals",
    name: "Daniel Mugabe",
    programme: "bachelor-of-computer-forensics-and-criminal-investigations",
    stage: "Year 3, Computer Forensics & Criminal Investigations",
    from: "Kabale, Uganda",
    quote: "We spend our days learning how attackers think, so we can stop them.",
    summary: "Capture-the-flag challenges, forensics labs and a national cyber competition podium.",
    image: "/images/kcu-2026/student-laptop-collaboration.webp",
    imageAlt: "Students working together on laptops in a KCU computing lab",
    day: [
      { time: "8:30 AM", text: "Digital forensics practical: recovering deleted evidence from a seized phone image." },
      { time: "11:00 AM", text: "Criminal law and procedure lecture with the law school." },
      { time: "2:00 PM", text: "Cyber Security Club training for the next capture-the-flag competition." },
      { time: "5:00 PM", text: "Group project on investigating mobile money fraud." },
    ],
    body: [
      { heading: "Why I chose KCU", text: "Few universities combine computing with criminal investigation. I wanted both the technical skills and an understanding of the law." },
      { heading: "Proudest moment", text: "Our team placed third in a national capture-the-flag final. The whole department came to celebrate." },
      { heading: "What's next", text: "I am applying for an internship with a bank's security team, and later I would like to work in law enforcement." },
    ],
    sample: true,
  },
  {
    slug: "from-mogadishu-to-bunga-hill",
    name: "Fatuma Abdi Hassan",
    programme: "diploma-in-clinical-medicine-and-community-health",
    stage: "Year 2, Diploma in Clinical Medicine",
    from: "Mogadishu, Somalia",
    quote: "I came for the training, but I stayed for the community. KCU feels like a second home.",
    summary: "An international student on adjusting to Kampala, finding friends and training to serve her community.",
    image: "/images/kcu-2026/library-group-study.webp",
    imageAlt: "Students studying together in the KCU library",
    day: [
      { time: "8:00 AM", text: "Lecture on diagnosing and managing common tropical diseases." },
      { time: "10:30 AM", text: "Community health outreach planning with my class." },
      { time: "1:30 PM", text: "Prayer, then lunch with friends from Somalia, Sudan and Uganda." },
      { time: "3:00 PM", text: "Clinical skills session on history taking." },
      { time: "5:30 PM", text: "Library study group before heading back to the hostel." },
    ],
    body: [
      { heading: "Settling in", text: "The Dean of Students office met me when I arrived and helped with my student pass and accommodation. Within weeks I had friends from five countries." },
      { heading: "Why clinical medicine", text: "In many places in Somalia, a clinical officer is the only health worker for miles. I want to be that person for my community." },
      { heading: "Advice for international students", text: "Get your results equated early and talk to admissions before you travel. They answer every question." },
    ],
    sample: true,
  },
  {
    slug: "fuelling-ugandas-oil-future",
    name: "Joseph Mwesigwa",
    programme: "bachelor-of-science-in-petroleum-geoscience",
    stage: "Year 4, BSc Petroleum Geoscience",
    from: "Hoima, Uganda",
    quote: "I grew up near the Albertine oil fields. Now I'm learning the science behind them.",
    summary: "Field trips, industry visits and a final-year project on Uganda's oil and gas reserves.",
    image: "/news-images/kcu-cosl.jpeg",
    imageAlt: "KCU petroleum geoscience students on an educational visit to an oil and gas company",
    day: [
      { time: "8:00 AM", text: "Sedimentology lecture, then rock sample analysis in the lab." },
      { time: "11:00 AM", text: "Seismic interpretation practical using industry software." },
      { time: "2:00 PM", text: "Meeting with my supervisor about my final-year research project." },
      { time: "4:00 PM", text: "Guest talk from an energy company engineer." },
    ],
    body: [
      { heading: "Why I chose KCU", text: "The programme is built around Uganda's own oil and gas sector, with industry visits and lecturers who have worked in the field." },
      { heading: "Best experience", text: "Our educational tour to an oil and gas company, where we saw how the theory is applied on real projects." },
      { heading: "What's next", text: "I hope to join the national oil company's graduate programme and help Uganda get the most from its resources." },
    ],
    sample: true,
  },
];

export function getStory(slug: string) {
  return stories.find((s) => s.slug === slug);
}
