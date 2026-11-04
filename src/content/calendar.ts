// PLACEHOLDER: academic calendar for 2026/2027, drafted for the presentation from KCU's usual semester pattern.
// The Academic Registrar must confirm every date before launch. Public holidays are Uganda's statutory holidays;
// Eid dates depend on the moon sighting and are announced by the Government nearer the time.

export type CalendarKind = "Semester" | "Registration" | "Exams" | "Holiday" | "Ceremony" | "Admissions";

export type CalendarItem = {
  title: string;
  /** ISO date, YYYY-MM-DD */
  start: string;
  /** Last day, ISO date, for ranges. */
  end?: string;
  kind: CalendarKind;
};

export type CalendarTerm = { name: string; summary: string; items: CalendarItem[] };

export const academicYear = "2026/2027";

export const calendarTerms: CalendarTerm[] = [
  {
    name: "Semester I",
    summary: "August – December 2026",
    items: [
      { title: "Semester I begins; continuing students report", start: "2026-08-10", kind: "Semester" },
      { title: "Orientation week for the August intake", start: "2026-08-10", end: "2026-08-14", kind: "Admissions" },
      { title: "Deadline for course registration", start: "2026-08-28", kind: "Registration" },
      { title: "Mid-semester assessments", start: "2026-10-05", end: "2026-10-09", kind: "Exams" },
      { title: "Independence Day (public holiday)", start: "2026-10-09", kind: "Holiday" },
      { title: "Open Day for prospective students", start: "2026-11-14", kind: "Admissions" },
      { title: "End of semester examinations", start: "2026-11-23", end: "2026-12-11", kind: "Exams" },
      { title: "Applications close for the January 2027 intake", start: "2026-12-18", kind: "Admissions" },
      { title: "Christmas break", start: "2026-12-14", end: "2027-01-08", kind: "Holiday" },
    ],
  },
  {
    name: "Semester II",
    summary: "January – May 2027",
    items: [
      { title: "Semester II begins; January intake reports", start: "2027-01-11", kind: "Semester" },
      { title: "Orientation week for the January intake", start: "2027-01-11", end: "2027-01-15", kind: "Admissions" },
      { title: "NRM Liberation Day (public holiday)", start: "2027-01-26", kind: "Holiday" },
      { title: "Deadline for course registration", start: "2027-01-29", kind: "Registration" },
      { title: "Archbishop Janani Luwum Day (public holiday)", start: "2027-02-16", kind: "Holiday" },
      { title: "Mid-semester assessments", start: "2027-03-08", end: "2027-03-12", kind: "Exams" },
      { title: "International Women's Day (public holiday)", start: "2027-03-08", kind: "Holiday" },
      { title: "Good Friday and Easter Monday (public holidays)", start: "2027-03-26", end: "2027-03-29", kind: "Holiday" },
      { title: "End of semester examinations", start: "2027-04-26", end: "2027-05-14", kind: "Exams" },
      { title: "Labour Day (public holiday)", start: "2027-05-01", kind: "Holiday" },
    ],
  },
  {
    name: "Recess term",
    summary: "May – August 2027",
    items: [
      { title: "Recess term, industrial training and clinical placements", start: "2027-05-17", end: "2027-08-06", kind: "Semester" },
      { title: "Uganda Martyrs' Day (public holiday)", start: "2027-06-03", kind: "Holiday" },
      { title: "Heroes' Day (public holiday)", start: "2027-06-09", kind: "Holiday" },
      { title: "7th Graduation Ceremony", start: "2027-07-02", kind: "Ceremony" },
      { title: "Applications close for the August 2027 intake", start: "2027-07-16", kind: "Admissions" },
      { title: "Semester I 2027/2028 begins", start: "2027-08-09", kind: "Semester" },
    ],
  },
];
