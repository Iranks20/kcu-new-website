// Graduate outcomes, recognition and press information.
//
// "4,000+ graduates" and the six graduation ceremonies come from KCU's published figures. The percentages and
// salary-free outcome figures are PLACEHOLDER estimates for the presentation and must be replaced with results
// from the graduate tracer study before launch; the page shows a note saying so.

export const outcomeStats = [
  { value: "4,000+", label: "Graduates since the University opened" },
  { value: "6", label: "Graduation ceremonies held" },
  { value: "87%", label: "In work or further study within a year*" }, // PLACEHOLDER
  { value: "100%", label: "Health students placed in hospitals during training*" }, // PLACEHOLDER
];

export const outcomesNote = "*Indicative figures from graduate feedback. Final results of the 2026 graduate tracer study will be published here.";

// PLACEHOLDER: typical first destinations, by school, to be confirmed with the Career Guidance office.
export const destinations = [
  { school: "Medicine, Health & Life Sciences", roles: ["Medical intern, referral hospitals", "Registered nurse", "Clinical officer, health centres", "Laboratory technologist"] },
  { school: "Law & Management Sciences", roles: ["Law Development Centre (Bar Course)", "Legal officer", "Business & finance analyst", "Entrepreneur"] },
  { school: "Science, Computing & Engineering", roles: ["Digital forensics analyst", "Cyber security officer", "Geoscience technician, oil & gas", "Software & web developer"] },
];

/** Bodies that charter, accredit or recognise KCU and its programmes. */
export const recognition = [
  { name: "Government of Uganda", text: "University Charter, July 2025", short: "Chartered" },
  { name: "National Council for Higher Education", text: "Programme accreditation", short: "NCHE" },
  { name: "ECFMG pathways", text: "Recognition of the MBChB for international routes", short: "ECFMG" },
  { name: "Uganda Medical & Dental Practitioners Council", text: "Registration route for medical graduates", short: "UMDPC" }, // PLACEHOLDER: confirm
  { name: "Uganda Nurses & Midwives Council", text: "Registration route for nursing graduates", short: "UNMC" }, // PLACEHOLDER: confirm
  { name: "Higher Education Students' Financing Board", text: "Student loan partner", short: "HESFB" },
];

export const pressContact = {
  name: "Ms. Betty Uwiringiyimana",
  role: "Public Relations Manager",
  image: "/media/university-management-betty-uwiringiyimana-pro.webp",
  email: "pr@kcu.ac.ug", // PLACEHOLDER: confirm the press email address
};

export const factSheet = [
  { label: "Founded", value: "2011 (provisional licence), chartered July 2025" },
  { label: "Location", value: "Bunga Hill, Ggaba Road, Kampala, Uganda" },
  { label: "Vice Chancellor", value: "Dr. Charity Basaza Mulenga" },
  { label: "Schools", value: "Medicine, Health & Life Sciences · Law & Management Sciences · Science, Computing & Engineering" },
  { label: "Students", value: "2,000+ from across Africa" },
  { label: "Graduates", value: "4,000+" },
  { label: "Motto", value: "Ignite the Future" },
];

export const brandAssets = [
  { label: "KCU logo, full colour (PNG)", href: "/brand/kcu-logo.png" },
  { label: "KCU logo, white (PNG)", href: "/brand/kcu-logo-light.png" },
];

export const brandColours = [
  { name: "KCU Green", hex: "#0b6232" },
  { name: "Deep Green", hex: "#06371c" },
  { name: "KCU Gold", hex: "#ffc66b" },
  { name: "Ink", hex: "#0f1a15" },
];
