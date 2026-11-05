// Per-school content for the school pages: dean's welcome, staff, publications and contacts.
//
// Real names and roles come from KCU news stories (cited per entry). Everything marked `sample: true`, and every
// `draftMessage`, is PLACEHOLDER content written for the presentation and must be confirmed or replaced by the school.
// Staff without a confirmed name are listed by role only; we never invent names for real positions.

export type StaffMember = { name?: string; role: string; department?: string; image?: string };

export type Publication = {
  title: string;
  /** Journal, conference or event. */
  venue: string;
  year: string;
  type: "Journal article" | "Conference paper" | "Conference presentation" | "Innovation" | "Report" | "Book chapter";
  /** Internal news story or external link backing the entry. */
  href?: string;
  /** Illustrative entry for the presentation, not a real publication. */
  sample?: boolean;
};

export type SchoolDetails = {
  dean: {
    name?: string;
    title: string;
    image?: string;
    /** PLACEHOLDER: drafted for the presentation; to be approved or rewritten by the dean. */
    draftMessage: string[];
  };
  staff: StaffMember[];
  departmentHeads: Record<string, string | undefined>;
  publications: Publication[];
  contact: { office: string; email: string; phone: string; phoneHref: string; hours: string };
};

const contactBase = {
  phone: "+256 200 911 450 · +256 394 716 326",
  phoneHref: "tel:+256200911450",
  hours: "Monday – Friday, 8:00 AM – 5:00 PM",
};

export const schoolDetails: Record<string, SchoolDetails> = {
  "medicine-health-life-sciences": {
    dean: {
      title: "Dean, School of Medicine, Health & Life Sciences",
      draftMessage: [
        "Welcome to the School of Medicine, Health & Life Sciences. Since 2011 we have trained doctors, nurses, clinical officers and laboratory scientists who serve communities across Uganda and beyond.",
        "Our students learn by doing: in anatomy and clinical skills laboratories, on supervised rotations at Mulago and Kiruddu National Referral Hospitals, and through community health outreach. Our MBChB is recognised through ECFMG pathways, opening international routes for our graduates.",
        "Whether you are joining us straight from school or upgrading your qualification, you will find dedicated teachers, a supportive community and a clear path into a career that matters.",
      ],
    },
    staff: [
      { name: "Dr. Alphonsina Mujawimana", role: "Lecturer", department: "Paediatrics & Child Health", image: "/alumni/Dr. Mujawimana Alphonsina.jpeg" },
      { name: "Dr. Wilberforce Mfitundinda", role: "Lecturer", department: "Pharmacology & Therapeutics", image: "/media/university-management-mr-wilberforce-mfitundinda.webp" },
      { role: "Head of Department", department: "Medicine & Surgery" },
      { role: "Head of Department", department: "Nursing Sciences" },
      { role: "Head of Department", department: "Clinical Medicine & Community Health" },
      { role: "Head of Department", department: "Medical Laboratory Technology" },
    ],
    departmentHeads: {},
    publications: [
      {
        title: "KCU research presented at the 4th Busitema University Annual Science, Technology and Innovation Symposium",
        venue: "Busitema University",
        year: "2026",
        type: "Conference presentation",
        href: "/news/kcu-participates-in-4th-busitema-university-annual-science-technology-and",
      },
      {
        title: "Best presenting university: student anatomy presentations",
        venue: "First Inter-University Anatomy Workshop",
        year: "2026",
        type: "Conference presentation",
        href: "/news/kcu-emerges-best-presenting-university-at-first-interuniversity-anatomy-workshop",
      },
      { title: "Uptake of community blood pressure screening among adults in peri-urban Kampala", venue: "East African Medical Journal", year: "2026", type: "Journal article", sample: true },
      { title: "Clinical skills laboratory training and confidence among pre-clinical medical students", venue: "BMC Medical Education", year: "2025", type: "Journal article", sample: true },
      { title: "Antibiotic prescribing patterns in paediatric outpatient care in central Uganda", venue: "African Health Sciences", year: "2025", type: "Journal article", sample: true },
    ],
    contact: { office: "Office of the Dean, School of Medicine, Health & Life Sciences, Main Campus, Bunga Hill", email: "info@kcu.ac.ug", ...contactBase },
  },

  "law-management-sciences": {
    dean: {
      title: "Dean, School of Law & Management Sciences",
      draftMessage: [
        "Welcome to the School of Law & Management Sciences. We prepare ethical lawyers, business leaders and economists who can think clearly, argue persuasively and lead with integrity.",
        "Law students sharpen their advocacy in our Moot Court Room, in regional moot competitions and through our partnership with the Praxis Conflict Centre. Business and economics students learn through case studies, industry links and internships.",
        "With day and weekend classes, our programmes fit around your life. I look forward to welcoming you to a school where justice, enterprise and leadership meet.",
      ],
    },
    staff: [
      { name: "Prof. Peter Turyakira", role: "Professor; Acting Director, Postgraduate Studies & Research", department: "Management Sciences" },
      { name: "Ms. Zoe Richard Mauki", role: "Lecturer", department: "Law & Management Sciences" },
      { role: "Head of Department", department: "Law" },
      { role: "Head of Department", department: "Business & Management" },
      { role: "Head of Department", department: "Economics & Energy Management" },
    ],
    departmentHeads: {},
    publications: [
      {
        title: "Public lecture on law-making and academic collaboration",
        venue: "King Ceasor University",
        year: "2026",
        type: "Conference presentation",
        href: "/news/king-ceasor-university-hosts-public-lecture-on-law-making-and-academic",
      },
      {
        title: "Alternative dispute resolution in legal education: MoU with Praxis Conflict Centre",
        venue: "Department of Law",
        year: "2026",
        type: "Report",
        href: "/news/department-of-law-signs-memorandum-of-understanding-with-praxis-conflict-centre",
      },
      { title: "Access to justice and alternative dispute resolution in Uganda's commercial courts", venue: "Uganda Law Review", year: "2026", type: "Journal article", sample: true },
      { title: "Savings and credit cooperatives as a pathway to household financial resilience", venue: "African Journal of Business Management", year: "2025", type: "Journal article", sample: true },
      { title: "Local content policy and SME participation in Uganda's oil and gas sector", venue: "Energy Policy in East Africa", year: "2025", type: "Book chapter", sample: true },
    ],
    contact: { office: "Office of the Dean, School of Law & Management Sciences, Main Campus, Bunga Hill", email: "info@kcu.ac.ug", ...contactBase },
  },

  "science-computing-engineering": {
    dean: {
      // Named as Dean in "KCU Explores Partnership with Uganda Petroleum Institute Kigumba" (September 2026).
      name: "Prof. John Vianny Tiberindwa",
      title: "Dean, School of Science, Computing & Engineering",
      draftMessage: [
        "Welcome to the School of Science, Computing & Engineering, where we prepare graduates for the technologies shaping Africa's future: artificial intelligence, data science, cyber security, energy and sustainable agriculture.",
        "Our students learn in computer laboratories, compete in national challenges such as Cyber Stars and NFSU Capture the Flag, and gain field experience in the Albertine Graben and with partners such as COSL Uganda.",
        "We combine strong scientific foundations with hands-on problem solving. Join us and help build the innovations Uganda and the region need.",
      ],
    },
    staff: [
      { name: "Prof. John Vianny Tiberindwa", role: "Dean of School" },
      { name: "Dr. Habiba Njeri Ngugi", role: "Head of Department", department: "Computing, AI & Data Science" },
      { name: "Eng. James Harera", role: "Head of Department", department: "Petroleum Geoscience" },
      { role: "Head of Department", department: "Agriculture" },
    ],
    departmentHeads: {
      "Computing & Forensics": "Dr. Habiba Njeri Ngugi",
      "Artificial Intelligence & Data Science": "Dr. Habiba Njeri Ngugi",
      "Petroleum Geoscience": "Eng. James Harera",
    },
    publications: [
      {
        title: "Aqua Clean: a water treatment innovation for oil and gas communities",
        venue: "3rd Oil & Gas Skills Expo, Makerere University",
        year: "2026",
        type: "Innovation",
        href: "/news/kcu-showcases-aqua-clean-innovation-at-the-3rd-oil-and-gas-skills-expo-2026",
      },
      {
        title: "KCU at Uganda's inaugural National Cybersecurity Conference",
        venue: "National Cybersecurity Conference, Kampala",
        year: "2026",
        type: "Conference presentation",
        href: "/news/king-ceasor-university-participates-in-uganda-s-inaugural-national-cybersecurity",
      },
      { title: "Machine learning approaches to mobile money fraud detection in East Africa", venue: "African Journal of Information Systems", year: "2026", type: "Journal article", sample: true },
      { title: "Digital forensic readiness among small and medium enterprises in Kampala", venue: "International Conference on Cyber Security in Africa", year: "2025", type: "Conference paper", sample: true },
      { title: "Reservoir characterisation of the Albertine Graben using integrated seismic data", venue: "Journal of African Earth Sciences", year: "2025", type: "Journal article", sample: true },
    ],
    contact: { office: "Office of the Dean, School of Science, Computing & Engineering, Main Campus, Bunga Hill", email: "info@kcu.ac.ug", ...contactBase },
  },
};
