export const site = {
  name: "King Ceasor University",
  shortName: "KCU",
  motto: "Ignite the Future",
  url: "https://kcu.ac.ug",
  description:
    "King Ceasor University is a chartered university in Kampala, Uganda, offering degree, diploma and professional programmes in health sciences, law, business, computing and engineering.",
  applyUrl: "https://apply.kcu.ac.ug/",
  chatUrl: "https://tawk.to/chat/6374a39bb0d6371309cf4a30/1ghvpu6kh",
  contact: {
    phone: "+256 200 911 450",
    phoneHref: "tel:+256200911450",
    email: "info@kcu.ac.ug",
    admissionsEmail: "admissions@kcu.ac.ug",
    careersEmail: "careers@kcu.ac.ug",
    alumniEmail: "alumni@kcu.ac.ug",
    address: "Plot 32 Ggaba Road, Bunga Hill, Kampala, Uganda",
    mapUrl: "https://maps.google.com/?q=King+Ceasor+University+Bunga+Kampala",
    hours: "Monday – Friday, 8:00 AM – 5:00 PM (EAT)",
  },
  // PLACEHOLDER: confirm WhatsApp Business is active on the main line, or swap in the admissions WhatsApp number.
  whatsapp: {
    number: "256200911450",
    display: "+256 200 911 450",
    message: "Hello KCU, I would like to ask about admissions.",
  },
  social: {
    x: "https://x.com/KingCeasorUni",
    facebook: "https://www.facebook.com/kcu.ac.ug",
    linkedin: "https://ug.linkedin.com/company/king-ceasor-university",
    youtube: "https://www.youtube.com/@kingceasoruniversitytv",
  },
  policiesUrl: "https://drive.google.com/drive/folders/1ZlSTGxG5BQLeVhSYX8oEuB00jzWirs0o?usp=drive_link",
  /** The intake currently being marketed on the homepage and in the header. */
  currentIntake: { name: "January 2027 Intake", status: "Applications open" },
};

export const portals = [
  { label: "Academia (Student Portal)", href: "https://academia.kcu.ac.ug/" },
  { label: "K-Class (E-learning)", href: "https://vclass.kcu.ac.ug/" },
  { label: "Library Catalogue", href: "https://library.kcu.ac.ug/" },
  { label: "Online Application", href: "https://apply.kcu.ac.ug/" },
];


/** A wa.me link that opens a WhatsApp chat with the University, optionally with a pre-filled message. */
export function whatsappLink(message: string = site.whatsapp.message) {
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;
}
