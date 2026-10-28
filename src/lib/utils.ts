import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

const longDate = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
const shortDate = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

/** Formats an ISO date (YYYY-MM-DD) for display. */
export function formatDate(iso: string, style: "long" | "short" = "long") {
  const date = new Date(`${iso}T00:00:00Z`);
  return (style === "long" ? longDate : shortDate).format(date);
}

export function dateParts(iso: string) {
  const date = new Date(`${iso}T00:00:00Z`);
  return {
    day: date.getUTCDate().toString().padStart(2, "0"),
    month: date.toLocaleString("en-GB", { month: "short", timeZone: "UTC" }),
    year: date.getUTCFullYear(),
  };
}

/** Encodes spaces and other characters in public file paths so they are valid URLs. */
export function asset(path: string) {
  return isExternal(path) ? path : encodeURI(decodeURI(path));
}

export function initials(name: string) {
  return name
    .replace(/^(Rt\.|Hon\.|HE\.|Dr\.|Prof\.|Assoc\.|Mr\.|Mrs\.|Ms\.|Lord)\s*/g, "")
    .replace(/^(Hon\.|Dr\.|Prof\.)\s*/g, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}
