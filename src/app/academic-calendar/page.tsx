import { CalendarDays } from "lucide-react";
import { CtaBand, PageHero, Section } from "@/components/ui";
import { AddToCalendar, DownloadCalendar } from "@/components/add-to-calendar";
import { academicYear, calendarTerms, type CalendarItem, type CalendarKind } from "@/content/calendar";
import { intakes } from "@/content/university";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";
import { cn, formatDate } from "@/lib/utils";

export const metadata = pageMeta({
  title: "Academic Calendar",
  description: `KCU academic calendar ${academicYear}: semester dates, registration deadlines, examinations, public holidays and graduation.`,
  path: "/academic-calendar",
});

const kindStyles: Record<CalendarKind, string> = {
  Semester: "bg-primary-50 text-primary-700 ring-primary-100",
  Registration: "bg-sky-50 text-sky-700 ring-sky-100",
  Exams: "bg-rose-50 text-rose-700 ring-rose-100",
  Holiday: "bg-slate-100 text-slate-600 ring-slate-200",
  Ceremony: "bg-gold-50 text-gold-700 ring-gold-200",
  Admissions: "bg-violet-50 text-violet-700 ring-violet-100",
};

function when(item: CalendarItem) {
  if (!item.end) return formatDate(item.start, "short");
  const [s, e] = [new Date(item.start), new Date(item.end)];
  const sameMonth = s.getUTCMonth() === e.getUTCMonth() && s.getUTCFullYear() === e.getUTCFullYear();
  return sameMonth ? `${s.getUTCDate()} – ${formatDate(item.end, "short")}` : `${formatDate(item.start, "short")} – ${formatDate(item.end, "short")}`;
}

const toEntry = (i: CalendarItem) => ({ title: `KCU: ${i.title}`, date: i.start, endDate: i.end, location: site.contact.address });

export default function AcademicCalendarPage() {
  const all = calendarTerms.flatMap((t) => t.items);
  return (
    <>
      <PageHero
        crumbs={[{ label: "Admissions", href: "/admissions" }, { label: "Academic calendar" }]}
        eyebrow={`Academic year ${academicYear}`}
        title="Academic calendar"
        intro="Semester dates, registration deadlines, examinations, public holidays and graduation, all in one place. Add any date to your phone's calendar."
      >
        <DownloadCalendar entries={all.map(toEntry)} filename={`kcu-academic-calendar-${academicYear.replace("/", "-")}.ics`} label="Add the whole year to my calendar" />
      </PageHero>

      <Section className="!pt-12">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="space-y-12 lg:col-span-8">
            {calendarTerms.map((term) => (
              <section key={term.name} aria-labelledby={`term-${term.name}`}>
                <div className="mb-5 flex items-baseline justify-between gap-4 border-b border-slate-200 pb-3">
                  <h2 id={`term-${term.name}`} className="text-2xl sm:text-3xl">{term.name}</h2>
                  <p className="text-sm font-medium text-slate-500">{term.summary}</p>
                </div>
                <ol className="divide-y divide-slate-100">
                  {[...term.items].sort((a, b) => a.start.localeCompare(b.start)).map((item) => (
                    <li key={item.title + item.start} className="flex items-center gap-4 py-4">
                      <time dateTime={item.start} className="w-32 shrink-0 text-sm font-semibold tabular-nums text-ink sm:w-40 sm:text-base">{when(item)}</time>
                      <div className="min-w-0 flex-1">
                        <p className="text-slate-800">{item.title}</p>
                        <span className={cn("mt-1.5 inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ring-1", kindStyles[item.kind])}>{item.kind}</span>
                      </div>
                      <AddToCalendar entry={toEntry(item)} compact />
                    </li>
                  ))}
                </ol>
              </section>
            ))}
            <p className="text-sm text-slate-500">Dates are confirmed by the Office of the Academic Registrar and may change. Eid public holidays are announced by the Government closer to the date.</p>
          </div>

          <aside className="lg:col-span-4">
            <div className="space-y-4 lg:sticky lg:top-28">
              <div className="rounded-2xl bg-brand-50 ring-1 ring-brand-100 p-6 text-ink sm:p-7">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-xl bg-white text-primary-600"><CalendarDays className="size-5" aria-hidden /></span>
                  <h2 className="text-xl text-ink">Intakes</h2>
                </div>
                <ul className="mt-5 space-y-4">
                  {intakes.map((i) => (
                    <li key={i.name} className="border-b border-brand-100 pb-4 last:border-0 last:pb-0">
                      <p className="font-semibold">{i.name}</p>
                      <p className="mt-1 text-sm text-slate-600">Applications close {i.closes} · Starts {i.starts}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-200 p-6">
                <p className="font-semibold text-ink">Key to the calendar</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {(Object.keys(kindStyles) as CalendarKind[]).map((k) => (
                    <li key={k} className={cn("rounded-full px-2.5 py-1 text-xs font-semibold ring-1", kindStyles[k])}>{k}</li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
