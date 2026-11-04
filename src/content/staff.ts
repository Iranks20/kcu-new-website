// One list of staff for the directory, profile pages and search, built from people.ts and school-details.ts.

import { bareName, staffDirectory, type DirectoryEntry } from "./people";
import { schoolDetails } from "./school-details";
import { schools } from "./schools";

export type StaffProfile = DirectoryEntry & { slug: string; school?: string };

const slugify = (name: string) => bareName(name).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export function allStaff(): StaffProfile[] {
  const unitToSchool = new Map(schools.map((s) => [`School of ${s.shortName}`, s.slug]));
  return staffDirectory(schools.map((s) => ({ unit: `School of ${s.shortName}`, people: schoolDetails[s.slug]?.staff ?? [] }))).map((e) => ({
    ...e,
    slug: slugify(e.name),
    school: unitToSchool.get(e.unit),
  }));
}

export function getStaff(slug: string) {
  return allStaff().find((s) => s.slug === slug);
}

/** Profile URL slug for a staff name, e.g. "Dr. Jane Doe" -> "jane-doe". */
export const staffSlug = slugify;
