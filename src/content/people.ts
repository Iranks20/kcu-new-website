export type Person = { name: string; role: string; image?: string };

export const viceChancellor = {
  name: "Dr. Charity Basaza Mulenga",
  role: "Vice Chancellor",
  image: "/University Management/Dr. Charity Basaza Mulenga.jpg",
  message: [
    "Welcome to King Ceasor University, a chartered institution committed to excellence in education, research, innovation and service to society.",
    "At KCU, we believe education is transformative, empowering learners with the knowledge, skills, values and leadership qualities needed to thrive in a rapidly changing world. We provide a supportive and intellectually stimulating environment that encourages critical thinking, ethical conduct, innovation and academic excellence.",
    "The award of our University Charter reflects our commitment to quality higher education and continuous institutional growth. We are also proud that our Bachelor of Medicine and Bachelor of Surgery (MBChB) programme has achieved recognition through ECFMG pathways, expanding international opportunities for our graduates.",
    "As we look ahead, we are embracing Competency-Based Education and Training (CBET), advancing research and innovation, strengthening global partnerships, and leveraging technology to enhance learning.",
    "I invite you to join KCU as we transform lives, advance knowledge, and prepare globally competitive professionals and leaders for the future.",
  ],
};

export const management: Person[] = [
  { name: viceChancellor.name, role: "Vice Chancellor", image: viceChancellor.image },
  { name: "Prof. Charles Kiiza Mondo", role: "Deputy Vice Chancellor", image: "/University Management/Charles-Mondo.jpeg" },
  { name: "Mrs. Pape Matama Bagonza", role: "University Secretary", image: "/media/university-management-mrs-pape-matama-bagonza.webp" },
  { name: "Mr. Alfred Namoah Masikye", role: "Academic Registrar", image: "/media/university-management-alfred-namoah-masikye.webp" },
  { name: "Assoc. Prof. Annabella Habinka Ejiri", role: "Director, Quality Assurance", image: "/qa.jpeg" },
  { name: "Mrs. Sylvia Okwi Christine", role: "Director of Finance", image: "/media/university-management-mrs-sylivia-okwi-christine.webp" },
  { name: "Ms. Ariye Eunice Owiny", role: "Acting Dean of Students", image: "/media/counsellor-dsc09882.webp" },
  { name: "Mr. Mwima Abdallah", role: "ICT Manager", image: "/University Management/Mwima-Abdallah.jpg" },
  { name: "Mr. Eric Keziron Oloo", role: "University Librarian", image: "/media/university-management-mr-eric-keziron-oloo.webp" },
  { name: "Mr. Wilberforce Mfitundinda", role: "Registrar of Academics", image: "/media/university-management-mr-wilberforce-mfitundinda.webp" },
  { name: "Mr. John Acire (CHRP, HRMAU)", role: "Human Resource Manager", image: "/media/university-management-mr-john-acire.webp" },
  { name: "Ms. Betty Uwiringiyimana", role: "Public Relations Manager", image: "/media/university-management-betty-uwiringiyimana-pro.webp" },
  { name: "Ms. Rosette Gaali", role: "Marketing Manager", image: "/media/university-management-ms-rosset-gaali-marketing-manager.webp" },
];

export const trustees: Person[] = [
  { name: "Rt. Hon. Thomas Tayebwa", role: "Chairperson, Board of Trustees", image: "/images/trustees/hon-thomas-tayebwa.jpeg" },
  { name: "Mrs. Agnes Mfite", role: "Trustee", image: "/images/trustees/mrs-agnes-selina-mfite.jpg" },
  { name: "Hon. Okello Oryem", role: "Founder Envoy Extraordinary", image: "/images/trustees/hon-okello-oryem.jpg" },
  { name: "Mr. Donald Nyakairu", role: "Trustee", image: "/images/trustees/mr-donald-nyakairu.jpg" },
  { name: "Lord Ceasor", role: "Trustee", image: "/University Council/Lord Ceasor.jpeg" },
];

export const council: Person[] = [
  { name: "Hon. Dr. Chris Baryomunsi", role: "Chairperson, University Council", image: "/media/university-council-dr-chris-baryomunsi.webp" },
  { name: "Assoc. Prof. Mary Basaasa Muhenda", role: "Vice Chairperson, University Council", image: "/University Council/Assoc-Prof-Mary-Basaasa-Muhenda.jpeg" },
  { name: "Mrs. Grace N. Gwaku", role: "Chair, Finance, Planning & Development Committee", image: "/images/council/mrs-grace-n-gwaku.webp" },
  { name: "Prof. Josephat Byamugisha", role: "Chair, Quality Assurance, ICT & Gender", image: "/images/council/prof-josephat-byamugisha.webp" },
  { name: "Mr. Donald Nyakairu", role: "BOT Representative & Chair, Audit and Risk Management", image: "/images/trustees/mr-donald-nyakairu.jpg" },
  { name: "Mr. Cyriaco Kabagambe", role: "Chair, Student Welfare & Disciplinary Committee", image: "/images/council/mr-cyriaco-kabagambe.webp" },
  { name: "Dr. Kamba F. Pakoyo", role: "Chair, Appointments Board", image: "/images/council/dr-kamba-f-pakoyo.webp" },
  { name: "Mr. Muhoozi Daniel Noah", role: "Guild President & Student Representative", image: "/images/council/mr-muhoozi-daniel-noah.webp" },
  { name: "Dr. Sabiti Mulema", role: "Staff Representative", image: "/images/council/dr-sabiti-mulema.webp" },
  { name: "Mrs. Rukundo Anita", role: "Member", image: "/images/council/mrs-rukundo-anita.webp" },
  { name: "Mrs. Joyce Okello", role: "Member", image: "/images/council/mrs-joyce-okello.webp" },
  { name: "Prof. Winston Ireeta Tumps", role: "Member", image: "/images/council/prof-winston-ireeta-tumps.webp" },
  { name: "Mr. Timothy Musoke Ssejjoba", role: "Member", image: "/images/council/mr-timothy-musoke-ssejjoba.webp" },
];

export const guildLeaders: Person[] = [
  { name: "HE. Muhoozi Daniel Noah", role: "Guild President", image: "/Guild/Guild President.jpeg" },
  { name: "Hon. Nagirinya Amina", role: "Vice President", image: "/Guild/Vice President.jpeg" },
  { name: "Hon. Uzamukunda Prossy", role: "Prime Minister", image: "/Guild/Prime Minister.jpeg" },
  { name: "Hon. Nkurunziza Moses", role: "Deputy Prime Minister & Minister of Social Affairs", image: "/Guild/Deputy Prime Minister.jpeg" },
];

export const guildCabinet: Person[] = [
  { name: "Hon. Tuyumvire Racheal", role: "Guild Secretary" },
  { name: "Hon. Mwongyera Gilbert", role: "Academic Affairs" },
  { name: "Hon. Mfitumukiza Ivan", role: "Culture & Mobilization" },
  { name: "Hon. Gumisiriza Brian", role: "Estates & Environment" },
  { name: "Hon. Muhammed Jibril Amir", role: "External Affairs" },
  { name: "Hon. Agaba Rinah", role: "Finance" },
  { name: "Hon. Akatwijuka Tracy", role: "Gender, Ethics & Integrity" },
  { name: "Hon. Nkurunziza Derrick", role: "Health" },
  { name: "Hon. Umutoni Denize", role: "Research & ICT" },
  { name: "Hon. Kemigisha Daisy", role: "Justice & Constitutional Affairs" },
  { name: "Hon. Kemigisha Racheal", role: "Off-Campus Affairs" },
  { name: "Hon. Ingabire Agnes", role: "Students' Affairs" },
  { name: "Hon. Ampurire Darlious", role: "Security" },
  { name: "Hon. Muhoozi Nassem", role: "Sports & Games" },
  { name: "Hon. Kirabo Miriam", role: "Students with Disabilities" },
];

export const qaTeam: Person[] = [
  { name: "Assoc. Prof. Annabella Habinka Ejiri", role: "Director, Quality Assurance", image: "/qa.jpeg" },
  { name: "Ms. Atuhwera Joanita", role: "Quality Assurance Monitoring Officer", image: "/Joanita.jpeg" },
  { name: "Mr. Ayebale John Justice", role: "Clinical Monitoring Officer" },
  { name: "Ms. Grace Asingwire", role: "Quality Assurance Officer", image: "/Grace.jpg" },
  { name: "Ms. Sayuuni Mercy", role: "Quality Assurance Monitoring Assistant", image: "/Mercy.jpeg" },
  { name: "Ms. Viola Kintu", role: "Quality Assurance Officer", image: "/Viola.jpg" },
];

export type DirectoryEntry = Person & { unit: string; department?: string };

/** Strips titles so "Mr. X" and "Dr. X" are recognised as the same person. */
export const bareName = (name: string) => name.replace(/^((Rt\.|Hon\.|HE\.|Dr\.|Prof\.|Assoc\.|Mr\.|Mrs\.|Ms\.|Eng\.)\s*)+/g, "").replace(/\s*\(.*\)$/, "").trim().toLowerCase();

/** Everyone with a confirmed name, grouped by unit, for the staff directory. */
export function staffDirectory(academic: { unit: string; people: { name?: string; role: string; department?: string; image?: string }[] }[]): DirectoryEntry[] {
  const seen = new Set<string>();
  const entries: DirectoryEntry[] = [];
  const add = (e: DirectoryEntry) => {
    const key = bareName(e.name);
    if (seen.has(key)) return;
    seen.add(key);
    entries.push(e);
  };
  management.forEach((p) => add({ ...p, unit: "University Management" }));
  qaTeam.forEach((p) => add({ ...p, unit: "Quality Assurance" }));
  academic.forEach(({ unit, people }) => people.forEach((p) => p.name && add({ name: p.name, role: p.role, image: p.image, department: p.department, unit })));
  return entries;
}
