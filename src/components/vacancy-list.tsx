"use client";

import { useSyncExternalStore } from "react";
import { BellRing, Briefcase, CalendarClock, Download, MapPin } from "lucide-react";
import type { Vacancy } from "@/content/careers";
import { site } from "@/content/site";
import { Badge } from "./ui";

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

/** "31-Jul-2026 5:00pm" -> timestamp (EAT), or NaN when it can't be read. */
function deadlineTime(deadline: string) {
  const m = deadline.match(/(\d{1,2})-([A-Za-z]{3})-(\d{4})(?:\s+(\d{1,2}):(\d{2})\s*(am|pm))?/i);
  if (!m) return NaN;
  let h = m[4] ? Number(m[4]) % 12 : 23;
  if (m[6]?.toLowerCase() === "pm") h += 12;
  return Date.UTC(Number(m[3]), MONTHS.indexOf(m[2].toLowerCase()), Number(m[1]), h - 3, m[5] ? Number(m[5]) : 59);
}

// The page is built ahead of time, so "now" is read in the browser to close adverts that expired after the build.
// BUILD_TIME is inlined by next.config.ts, so the server HTML and the first client render agree.
const buildTime = Number(process.env.BUILD_TIME) || 0;
let clientNow: number | undefined;
const subscribe = () => () => {};
const getNow = () => (clientNow ??= Date.now());

/** Vacancies split into open and recently closed, so expired adverts never look open. */
export function VacancyList({ vacancies }: { vacancies: Vacancy[] }) {
  const now = useSyncExternalStore(subscribe, getNow, () => buildTime);
  const isOpen = (v: Vacancy) => !(deadlineTime(v.deadline) < now);
  const open = vacancies.filter(isOpen);
  const closed = vacancies.filter((v) => !isOpen(v));

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl">Open positions</h2>
        <p className="mt-2 text-slate-600">
          {open.length > 0 ? `${open.length} open ${open.length === 1 ? "vacancy" : "vacancies"}` : "No open vacancies right now"} · Send applications to{" "}
          <a href={`mailto:${site.contact.careersEmail}`} className="font-semibold text-ink underline-offset-4 hover:underline">{site.contact.careersEmail}</a>
        </p>
      </div>

      {open.length > 0 ? (
        <ul className="space-y-4">{open.map((v) => <VacancyItem key={v.slug} v={v} />)}</ul>
      ) : (
        <div className="flex flex-col gap-5 rounded-2xl bg-primary-900 p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-white/10 text-gold-400"><BellRing className="size-6" aria-hidden /></span>
            <div>
              <p className="text-lg font-semibold">All recent positions have closed</p>
              <p className="mt-1 text-white/75">New academic and administrative vacancies are advertised here and in the national press. Send your CV for future openings.</p>
            </div>
          </div>
          <a href={`mailto:${site.contact.careersEmail}?subject=${encodeURIComponent("Expression of interest: future vacancies")}`} className="inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-gold-400 px-5 text-sm font-semibold text-ink hover:bg-gold-300">
            Send your CV
          </a>
        </div>
      )}

      {closed.length > 0 && (
        <div className="mt-14">
          <h2 className="text-xl text-slate-500">Recently closed</h2>
          <ul className="mt-4 space-y-3">{closed.map((v) => <VacancyItem key={v.slug} v={v} closed />)}</ul>
        </div>
      )}
    </div>
  );
}

function VacancyItem({ v, closed = false }: { v: Vacancy; closed?: boolean }) {
  return (
    <li>
      <details className={closed ? "group rounded-2xl border border-slate-200 bg-slate-50" : "group rounded-2xl border border-slate-200 bg-white transition open:shadow-card hover:border-slate-300"}>
        <summary className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <h3 className={closed ? "text-lg text-slate-600" : "text-lg"}>{v.title}</h3>
            <p className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
              <span className="flex items-center gap-1.5"><Briefcase className="size-4" aria-hidden />{v.department}</span>
              <span className="flex items-center gap-1.5"><MapPin className="size-4" aria-hidden />{v.location}</span>
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            {closed ? <Badge tone="slate">Closed</Badge> : <Badge>{v.type}</Badge>}
            <span className="flex items-center gap-1.5 text-sm text-slate-500"><CalendarClock className="size-4" aria-hidden />{closed ? "Closed" : "Closes"} {v.deadline}</span>
          </div>
        </summary>
        <div className="border-t border-slate-100 px-5 pb-6 pt-5 sm:px-6">
          <p className="text-slate-700">{v.summary}</p>
          <h4 className="mt-5 text-base">Key requirements</h4>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600 marker:text-slate-400">
            {v.requirements.map((r) => <li key={r}>{r}</li>)}
          </ul>
          {v.pdf && (
            <a href={v.pdf} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex h-10 items-center gap-2 rounded-full bg-primary-600 px-5 text-sm font-semibold text-white hover:bg-primary-700">
              <Download className="size-4" aria-hidden /> Full job advert (PDF)
            </a>
          )}
        </div>
      </details>
    </li>
  );
}
