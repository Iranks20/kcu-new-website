// "Add to calendar" helpers: a Google Calendar link and a downloadable .ics file.

export type CalendarEntry = {
  title: string;
  /** ISO date, YYYY-MM-DD */
  date: string;
  /** Optional last day for multi-day entries, ISO date. */
  endDate?: string;
  /** Free text like "9:00 AM – 3:00 PM"; all-day when missing or unparseable. */
  time?: string;
  location?: string;
  description?: string;
};

const pad = (n: number) => String(n).padStart(2, "0");

function parseClock(s: string) {
  const m = s.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)?$/i);
  if (!m) return null;
  let h = Number(m[1]);
  const min = Number(m[2] ?? 0);
  const ap = m[3]?.toUpperCase();
  if (ap === "PM" && h < 12) h += 12;
  if (ap === "AM" && h === 12) h = 0;
  return `${pad(h)}${pad(min)}00`;
}

/** Start and end as local (EAT) timestamps, or all-day dates. */
function range(e: CalendarEntry) {
  const day = e.date.replace(/-/g, "");
  const [from, to] = (e.time ?? "").split(/\s*[–-]\s*/);
  const start = from ? parseClock(from) : null;
  const end = to ? parseClock(to) : null;
  if (start) return { allDay: false, start: `${day}T${start}`, end: `${day}T${end ?? start}` };
  const last = new Date(`${e.endDate ?? e.date}T00:00:00Z`);
  last.setUTCDate(last.getUTCDate() + 1);
  return { allDay: true, start: day, end: last.toISOString().slice(0, 10).replace(/-/g, "") };
}

export function googleCalendarUrl(e: CalendarEntry) {
  const r = range(e);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: e.title,
    dates: `${r.start}/${r.end}`,
    ctz: "Africa/Kampala",
    details: e.description ?? "",
    location: e.location ?? "",
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

/** Escapes text for an iCalendar property value (RFC 5545). */
const esc = (s: string) => s.replace(/[\\;,]/g, (c) => `\\${c}`).replace(/\n/g, "\\n");

export function icsFile(entries: CalendarEntry[]) {
  const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d+/, "");
  const events = entries.map((e, i) => {
    const r = range(e);
    const when = r.allDay
      ? [`DTSTART;VALUE=DATE:${r.start}`, `DTEND;VALUE=DATE:${r.end}`]
      : [`DTSTART;TZID=Africa/Kampala:${r.start}`, `DTEND;TZID=Africa/Kampala:${r.end}`];
    return [
      "BEGIN:VEVENT",
      `UID:${e.date}-${i}-${e.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}@kcu.ac.ug`,
      `DTSTAMP:${stamp}`,
      ...when,
      `SUMMARY:${esc(e.title)}`,
      e.location ? `LOCATION:${esc(e.location)}` : "",
      e.description ? `DESCRIPTION:${esc(e.description)}` : "",
      "END:VEVENT",
    ].filter(Boolean);
  });
  return ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//King Ceasor University//Website//EN", "CALSCALE:GREGORIAN", ...events.flat(), "END:VCALENDAR"].join("\r\n");
}

export function downloadIcs(filename: string, entries: CalendarEntry[]) {
  const url = URL.createObjectURL(new Blob([icsFile(entries)], { type: "text/calendar;charset=utf-8" }));
  const a = Object.assign(document.createElement("a"), { href: url, download: filename });
  a.click();
  URL.revokeObjectURL(url);
}
