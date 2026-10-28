// Programme titles, durations and fees come from the official KCU fees structure.
// Overviews, careers and study modes marked PLACEHOLDER should be confirmed by each school.

export type Level = "degree" | "diploma" | "hec" | "certificate";

export const levelLabels: Record<Level, string> = {
  degree: "Undergraduate Degree",
  diploma: "Diploma",
  hec: "Higher Education Certificate",
  certificate: "Professional Certificate",
};

export type Programme = {
  slug: string;
  code: string;
  title: string;
  level: Level;
  school: string; // school slug
  duration: string;
  fees: { local: string; international: string; per: "semester" | "course" };
  modes: string[];
  intakes: string[];
  overview: string;
  careers: string[];
};

type Seed = [code: string, title: string, duration: string, local: string, international: string];

const MED = "medicine-health-life-sciences";
const LAW = "law-management-sciences";
const SCI = "science-computing-engineering";

const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// PLACEHOLDER overviews and careers, written from public programme descriptions.
const details: Record<string, { overview: string; careers: string[] }> = {
  "Bachelor of Medicine and Bachelor of Surgery": {
    overview:
      "A five-year professional medical degree combining biomedical sciences, clinical rotations and community health. Students train in KCU's anatomy and clinical skills laboratories and complete supervised rotations at partner referral hospitals. The programme is recognised through ECFMG pathways, opening international routes for graduates.",
    careers: ["Medical officer", "Surgeon (after specialisation)", "Public health practitioner", "Clinical researcher", "Health policy advisor"],
  },
  "Bachelor of Nursing Science - Direct": {
    overview:
      "A four-year degree for school leavers that builds strong foundations in nursing science, patient care, community health and leadership, with extensive clinical placements.",
    careers: ["Registered nurse", "Nurse educator", "Community health nurse", "Nursing manager"],
  },
  "Bachelor of Nursing Science - Completion": {
    overview:
      "A three-year completion pathway for diploma-holding nurses who want to upgrade to a degree, deepening clinical expertise, research skills and health-service leadership.",
    careers: ["Senior nursing officer", "Nurse educator", "Clinical nurse specialist", "Health services manager"],
  },
  "Diploma in Clinical Medicine and Community Health": {
    overview:
      "A practical three-year diploma preparing clinical officers to diagnose and manage common conditions and to lead community health programmes, especially in underserved areas.",
    careers: ["Clinical officer", "Community health officer", "Health centre in-charge", "NGO health programme officer"],
  },
  "Diploma in Medical Laboratory Technology": {
    overview:
      "Students learn to collect, process and analyse medical specimens, supporting accurate diagnosis and disease surveillance in hospitals, laboratories and research centres.",
    careers: ["Medical laboratory technologist", "Research laboratory assistant", "Blood transfusion technician", "Quality control officer"],
  },
  "Bachelor of Laws": {
    overview:
      "A four-year LLB that develops sound legal knowledge, research and advocacy skills. Students practise in the Moot Court Room, compete in regional moot and debate competitions, and engage with partners such as the Praxis Conflict Centre.",
    careers: ["Advocate (after Law Development Centre)", "Legal officer", "Corporate counsel", "Human rights officer", "Policy analyst"],
  },
  "Bachelor of Business Administration": {
    overview:
      "A three-year degree covering management, accounting and finance, marketing, and banking and insurance, with practical case studies and an internship that connects students to industry.",
    careers: ["Business manager", "Accountant", "Marketing officer", "Bank officer", "Entrepreneur"],
  },
  "Bachelor of Oil, Gas, and Energy Management": {
    overview:
      "Prepares managers for Uganda's growing energy sector, covering petroleum economics, project management, regulation, local content and sustainability.",
    careers: ["Energy project manager", "Local content officer", "Petroleum economist", "Regulatory analyst"],
  },
  "Bachelor of Applied Economics": {
    overview:
      "Builds analytical and quantitative skills to understand markets, public policy and development, with emphasis on data analysis and real-world economic problems.",
    careers: ["Economist", "Policy analyst", "Research officer", "Financial analyst"],
  },
  "Diploma in Global Business": {
    overview:
      "A two-year diploma introducing international trade, business communication, entrepreneurship and management, with a pathway into degree study.",
    careers: ["Business assistant", "Sales and trade officer", "Small business owner"],
  },
  "Bachelor of Science in Petroleum Geoscience": {
    overview:
      "A four-year science degree in geology, geophysics and petroleum systems, with field visits to the Albertine Graben and industry partners such as COSL Uganda.",
    careers: ["Petroleum geoscientist", "Exploration geologist", "Environmental geoscientist", "Mining and energy analyst"],
  },
  "Bachelor of Agriculture": {
    overview:
      "Covers crop and animal production, soil science, agribusiness and sustainable farming, with practical field work that prepares graduates to improve food security and rural livelihoods.",
    careers: ["Agricultural officer", "Agribusiness manager", "Extension worker", "Farm manager"],
  },
  "Bachelor of Computer Forensics and Criminal Investigations": {
    overview:
      "Combines computing, cyber security and investigative practice to prepare graduates to detect, investigate and prevent digital crime.",
    careers: ["Digital forensic investigator", "Cyber security analyst", "Fraud investigator", "IT auditor"],
  },
};

const hecOverview =
  "A one-year bridging programme for applicants who do not yet meet direct-entry requirements, including holders of foreign qualifications. Successful students progress into related KCU degree and diploma programmes.";

function make(level: Level, school: string, per: "semester" | "course", [code, title, duration, local, international]: Seed): Programme {
  const d = details[title];
  const isCert = level === "certificate";
  return {
    slug: slugify(title.replace(/\s*-\s*/g, " ")),
    code,
    title,
    level,
    school,
    duration,
    fees: { local, international, per },
    modes: isCert ? ["Day", "Weekend", "Blended"] : level === "degree" || level === "diploma" ? ["Day", "Weekend"] : ["Day"], // PLACEHOLDER
    intakes: isCert ? ["Rolling monthly intakes"] : ["January", "August"], // PLACEHOLDER
    overview:
      d?.overview ??
      (level === "hec"
        ? hecOverview
        : `A focused, practical ${duration.toLowerCase()} course that builds job-ready skills in ${title.replace(/^Certificate in /, "").toLowerCase()}. Taught by KCU faculty and industry practitioners, it suits school leavers, graduates and working professionals.`),
    careers: d?.careers ?? (level === "hec" ? ["Progression to a KCU degree or diploma"] : ["Upskilling in your current role", "Entry-level roles in the field", "Self-employment"]),
  };
}

export const programmes: Programme[] = [
  ...(
    [
      ["01", "Bachelor of Medicine and Bachelor of Surgery", "5 Years", "$3,000", "$3,000"],
      ["02", "Bachelor of Nursing Science - Direct", "4 Years", "UGX 2,425,000", "$800"],
      ["03", "Bachelor of Nursing Science - Completion", "3 Years", "UGX 2,425,000", "$800"],
    ] as Seed[]
  ).map((s) => make("degree", MED, "semester", s)),
  ...(
    [
      ["04", "Diploma in Clinical Medicine and Community Health", "3 Years", "UGX 1,870,000", "$515"],
      ["05", "Diploma in Medical Laboratory Technology", "3 Years", "UGX 1,300,000", "$370"],
    ] as Seed[]
  ).map((s) => make("diploma", MED, "semester", s)),
  ...(
    [
      ["06", "Higher Education Certificate - Biological Sciences", "1 Year", "UGX 782,595", "$250"],
      ["07", "Higher Education Certificate - Physical Sciences", "1 Year", "UGX 782,595", "$250"],
    ] as Seed[]
  ).map((s) => make("hec", MED, "semester", s)),
  ...(
    [
      ["08", "Bachelor of Laws", "4 Years", "UGX 2,025,000", "$650"],
      ["09", "Bachelor of Business Administration", "3 Years", "UGX 1,468,000", "$500"],
      ["10", "Bachelor of Oil, Gas, and Energy Management", "3 Years", "UGX 1,127,500", "$400"],
      ["11", "Bachelor of Applied Economics", "3 Years", "UGX 1,468,000", "$500"],
    ] as Seed[]
  ).map((s) => make("degree", LAW, "semester", s)),
  make("diploma", LAW, "semester", ["12", "Diploma in Global Business", "2 Years", "UGX 700,000", "$200"]),
  make("hec", LAW, "semester", ["13", "Higher Education Certificate - Humanities", "1 Year", "UGX 782,595", "$250"]),
  ...(
    [
      ["14", "Bachelor of Science in Petroleum Geoscience", "4 Years", "UGX 2,352,300", "$785"],
      ["15", "Bachelor of Computer Forensics and Criminal Investigations", "3 Years", "UGX 2,075,000", "$680"],
      // PLACEHOLDER: listed on the previous site but missing from the fees table; confirm duration and fees.
      ["37", "Bachelor of Agriculture", "4 Years", "Fees on request", "Fees on request"],
    ] as Seed[]
  ).map((s) => make("degree", SCI, "semester", s)),
  ...(
    [
      ["16", "Certificate in Rest ECG Reading", "4 Weeks", "$500", "$670"],
      ["17", "Certificate in Holter ECG Reading and Interpretation", "2 Weeks", "$250", "$400"],
      ["18", "Certificate in Stress ECG Reading and Interpretation", "2 Weeks", "$250", "$400"],
      ["19", "Certificate in Production of Herbal-Based Creams, Gels and Lotions", "4 Weeks", "$115", "$195"],
      ["20", "Certificate in Production of Herbal-Based Medicated Soap and Shampoo", "4 Weeks", "$115", "$195"],
      ["21", "Certificate in 24-Hour BP Monitoring and Reporting", "2 Weeks", "$250", "$390"],
      ["22", "Certificate in Advanced Cardiac Life Support", "2 Weeks", "$300", "$450"],
    ] as Seed[]
  ).map((s) => make("certificate", MED, "course", s)),
  ...(
    [
      ["23", "Certificate in English Proficiency", "3 Months", "$160", "$300"],
      ["24", "Certificate in Occupational Health and Safety", "1 Month", "$125", "$240"],
      ["25", "Certificate in Bookkeeping for Small and Medium Enterprises", "1 Month", "$100", "$165"],
      ["26", "Certificate in Strategic Management", "1 Month", "$100", "$165"],
      ["27", "Certificate in SACCO Management", "1 Month", "$100", "$165"],
      ["28", "Certificate in Digital Marketing", "2 Months", "$120", "$230"],
      ["29", "Certificate in Tax and Credit Management", "1 Month", "$115", "$225"],
    ] as Seed[]
  ).map((s) => make("certificate", LAW, "course", s)),
  ...(
    [
      ["30", "Certificate in Computer Applications", "2 Months", "$120", "$250"],
      ["31", "Certificate in Web Design, Development and Administration", "2 Months", "$160", "$265"],
      ["32", "Certificate in Computer Graphics", "2 Months", "$120", "$180"],
      ["33", "Certificate in AI with Internet of Things using Arduino", "2 Months", "$200", "$315"],
      ["34", "Certificate in Cyber Security for Beginners", "2 Months", "$120", "$200"],
      ["35", "Certificate in Digital Forensic Investigations for Beginners", "2 Months", "$120", "$200"],
      ["36", "Certificate in Organic Farming", "2 Months", "$115", "$175"],
    ] as Seed[]
  ).map((s) => make("certificate", SCI, "course", s)),
];

export function getProgramme(slug: string) {
  return programmes.find((p) => p.slug === slug);
}

export function programmesBySchool(school: string) {
  return programmes.filter((p) => p.school === school);
}

export function programmesByLevel(...levels: Level[]) {
  return programmes.filter((p) => levels.includes(p.level));
}

/** Entry requirements by level, from KCU's published admission requirements. */
export const entryRequirements: Record<Level, string[]> = {
  degree: [
    "Uganda Certificate of Education (UCE) or equivalent with at least five passes.",
    "Uganda Advanced Certificate of Education (UACE) or equivalent with at least two principal passes.",
    "Diploma holders should normally have passed with at least a credit.",
    "Mature-age entry is available for applicants aged 25 and above who pass the mature-age examination or interview.",
  ],
  diploma: [
    "UCE or equivalent with at least five passes.",
    "UACE or equivalent with at least one principal pass and two subsidiary passes.",
    "Programme-specific requirements may apply depending on the school and course.",
  ],
  hec: [
    "UCE or equivalent with at least five passes.",
    "Suitable for applicants who do not meet direct entry requirements for degree programmes.",
    "Applicants with foreign qualifications that require academic bridging or equivalence are welcome.",
  ],
  certificate: [
    "Open to school leavers, graduates and working professionals.",
    "Basic proficiency in English.",
    "Some advanced clinical certificates require a relevant health qualification.",
  ],
};
