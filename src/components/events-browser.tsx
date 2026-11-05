"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, CalendarDays, ChevronLeft, ChevronRight, Clock, LayoutList, MapPin } from "lucide-react";
import type { UniEvent } from "@/content/events";
import { cn, dateParts } from "@/lib/utils";
import { Badge } from "./ui";

const monthKey = (iso: string) => iso.slice(0, 7);
const monthName = (key: string) => new Date(`${key}-01T00:00:00Z`).toLocaleString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });
const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/** Events with category and month filters, shown as a list or a month calendar. */
export function EventsBrowser({ events }: { events: UniEvent[] }) {
  const categories = useMemo(() => ["All", ...Array.from(new Set(events.map((e) => e.category)))], [events]);
  const months = useMemo(() => Array.from(new Set(events.map((e) => monthKey(e.date)))).sort(), [events]);
  const [category, setCategory] = useState("All");
  const [month, setMonth] = useState("all");
  const [view, setView] = useState<"list" | "calendar">("list");
  const [calMonth, setCalMonth] = useState(months[0]);

  const shown = events.filter((e) => (category === "All" || e.category === category) && (month === "all" || monthKey(e.date) === month));

  return (
    <div>
      <div className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-card ring-1 ring-slate-100 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
              className={cn("h-9 rounded-full px-4 text-sm font-medium transition", category === c ? "bg-primary-600 text-white" : "bg-surface text-slate-600 hover:bg-slate-100 hover:text-ink")}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {view === "list" && (
            <label>
              <span className="sr-only">Filter by month</span>
              <select value={month} onChange={(e) => setMonth(e.target.value)} className="h-10 rounded-full border border-slate-200 bg-white px-4 text-sm outline-none focus:border-primary-600 focus:ring-4 focus:ring-primary-600/15">
                <option value="all">All months</option>
                {months.map((m) => <option key={m} value={m}>{monthName(m)}</option>)}
              </select>
            </label>
          )}
          <div role="group" aria-label="View" className="inline-flex rounded-full bg-slate-100 p-1">
            {([["list", LayoutList, "List"], ["calendar", CalendarDays, "Calendar"]] as const).map(([v, Icon, label]) => (
              <button key={v} type="button" aria-pressed={view === v} onClick={() => setView(v)} className={cn("inline-flex h-8 items-center gap-1.5 rounded-full px-3.5 text-xs font-semibold transition", view === v ? "bg-primary-600 text-white" : "text-slate-600 hover:text-ink")}>
                <Icon className="size-3.5" aria-hidden /> {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {view === "list" ? (
        <>
          <p className="mt-6 text-sm text-slate-500" aria-live="polite">{shown.length} {shown.length === 1 ? "event" : "events"}</p>
          <div className="mt-4 space-y-6">
            {shown.map((e) => (
              <EventRow key={e.slug} e={e} />
            ))}
            {shown.length === 0 && <p className="rounded-2xl bg-surface px-6 py-14 text-center text-slate-600">No events match these filters.</p>}
          </div>
        </>
      ) : (
        <MonthCalendar month={calMonth} months={months} onMonth={setCalMonth} events={events.filter((e) => category === "All" || e.category === category)} />
      )}
    </div>
  );
}

function EventRow({ e }: { e: UniEvent }) {
  const d = dateParts(e.date);
  return (
    <article className="group relative grid overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-slate-100 transition hover:shadow-lift md:grid-cols-12">
      <div className="relative aspect-[16/9] md:col-span-4 md:aspect-auto md:min-h-[15rem]">
        <Image src={e.image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute left-4 top-4 rounded-xl bg-white px-3 py-2 text-center shadow-card">
          <p className="heading text-2xl leading-none text-ink">{d.day}</p>
          <p className="mt-1 text-xs font-semibold uppercase text-slate-500">{d.month} {d.year}</p>
        </div>
      </div>
      <div className="flex flex-col justify-center p-6 sm:p-8 md:col-span-8">
        <Badge className="self-start">{e.category}</Badge>
        <h2 className="mt-3 text-2xl">
          <Link href={`/events/${e.slug}`} className="after:absolute after:inset-0">{e.title}</Link>
        </h2>
        <p className="mt-3 text-slate-600">{e.summary}</p>
        <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-slate-500">
          <span className="flex items-center gap-1.5"><Clock className="size-4" aria-hidden />{e.time}</span>
          <span className="flex items-center gap-1.5"><MapPin className="size-4" aria-hidden />{e.location}</span>
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
          Event details <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
        </span>
      </div>
    </article>
  );
}

function MonthCalendar({ month, months, onMonth, events }: { month: string; months: string[]; onMonth: (m: string) => void; events: UniEvent[] }) {
  const [y, m] = month.split("-").map(Number);
  const first = new Date(Date.UTC(y, m - 1, 1));
  const days = new Date(Date.UTC(y, m, 0)).getUTCDate();
  const offset = (first.getUTCDay() + 6) % 7;
  const cells = [...Array(offset).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
  const byDay = (day: number) => events.filter((e) => e.date === `${month}-${String(day).padStart(2, "0")}`);
  const i = months.indexOf(month);

  return (
    <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-slate-100">
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 sm:px-6">
        <button type="button" disabled={i <= 0} onClick={() => onMonth(months[i - 1])} className="grid size-9 place-items-center rounded-full hover:bg-surface disabled:opacity-30" aria-label="Previous month">
          <ChevronLeft className="size-5" aria-hidden />
        </button>
        <h2 className="text-lg" aria-live="polite">{monthName(month)}</h2>
        <button type="button" disabled={i >= months.length - 1} onClick={() => onMonth(months[i + 1])} className="grid size-9 place-items-center rounded-full hover:bg-surface disabled:opacity-30" aria-label="Next month">
          <ChevronRight className="size-5" aria-hidden />
        </button>
      </div>
      <div className="grid grid-cols-7 border-b border-slate-100 bg-surface text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
        {WEEKDAYS.map((d) => <div key={d} className="py-2">{d}</div>)}
      </div>
      <div className="grid grid-cols-7">
        {cells.map((day, idx) => {
          const list = day ? byDay(day) : [];
          return (
            <div key={idx} className={cn("min-h-20 border-b border-r border-slate-100 p-1.5 sm:min-h-28 sm:p-2", !day && "bg-slate-50/60")}>
              {day && <p className={cn("text-sm", list.length ? "font-bold text-primary-700" : "text-slate-400")}>{day}</p>}
              <ul className="mt-1 space-y-1">
                {list.map((e) => (
                  <li key={e.slug}>
                    <Link href={`/events/${e.slug}`} className="block truncate rounded-md bg-brand-50 px-1.5 py-1 text-[0.6875rem] font-semibold text-primary-700 ring-1 ring-brand-100 hover:bg-brand-100 sm:text-xs" title={e.title}>
                      {e.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
