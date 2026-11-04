// Student life and research content carried over from the previous site.
// Entries marked PLACEHOLDER should be confirmed with the relevant office before launch.

export const clubs = [
  { name: "KCU Football Club", type: "Sport", text: "Competes in the Pepsi University Football League." },
  { name: "Rotaract Club of KCU", type: "Service", text: "Community service, public lectures, conservation and road safety campaigns." },
  { name: "Christian Medical Fellowship", type: "Faith", text: "Fellowship and service for students in the health sciences." },
  { name: "Anatomy & Surgery Society", type: "Professional", text: "Surgical skills workshops and inter-university competitions." },
  { name: "Law Society", type: "Professional", text: "Moot court, debate and legal awareness activities." },
  { name: "Cyber Security Club", type: "Professional", text: "Cyber security challenges, including the national Cyber Stars competition." },
  { name: "Netball & Basketball", type: "Sport", text: "Recreational and competitive teams open to all students." }, // PLACEHOLDER
  { name: "Debating Society", type: "Culture", text: "Weekly debates and inter-university tournaments." }, // PLACEHOLDER
  { name: "Cultural Society", type: "Culture", text: "Music, dance and drama from the many countries represented at KCU." }, // PLACEHOLDER
];

export const researchAreas = [
  { title: "Health systems & community health", text: "Clinical practice, maternal and child health, non-communicable disease and access to care in Uganda." },
  { title: "Law, governance & human rights", text: "Access to justice, transnational litigation, conflict resolution and public participation in law-making." },
  { title: "Digital technology & cyber security", text: "Digital forensics, cyber security, artificial intelligence and data science." },
  { title: "Energy & extractives", text: "Petroleum geoscience, local content and the management of Uganda's oil and gas resources." },
  { title: "Agriculture & environment", text: "Organic farming, climate resilience and environmental conservation." },
  { title: "Education & society", text: "Competency-based education, entrepreneurship and socio-economic development." },
];

// PLACEHOLDER: indicative prices from partner hostels, per semester.
export const accommodation = [
  { name: "Shared room", price: "UGX 700,000 – 1,000,000", text: "Two students per room. The most popular option for first-year students." },
  { name: "Single room", price: "UGX 1,200,000 – 1,800,000", text: "A private room in a vetted partner hostel close to campus." },
  { name: "Self-contained studio", price: "UGX 2,000,000 – 2,800,000", text: "Own bathroom and kitchenette. Often chosen by international students." },
];

export const supportServices = [
  { title: "Counselling & wellbeing", text: "Free, confidential counselling and guidance from the Office of the Dean of Students." },
  { title: "Dean of Students", text: "Welfare, accommodation advice, international student support and student discipline." },
  { title: "Library & e-learning", text: "A modern library, online catalogue and the K-Class e-learning platform for blended study." },
  { title: "Career guidance", text: "Internship placements, CV clinics and an annual career and internship fair." },
];

export const campusTour = {
  title: "Fly over the KCU campus",
  caption: "Bunga Hill, Kampala, overlooking Lake Victoria",
  /** Compressed 720p copy first; the original MP4 is the fallback for browsers without WebM. */
  sources: [
    { src: "/media/video/kcu-campus-720.webm", type: "video/webm" },
    { src: "/media/video/kcu-360.mp4", type: "video/mp4" },
  ],
  poster: "/media/video/kcu-campus-aerial.webp",
  duration: "1:16",
};
