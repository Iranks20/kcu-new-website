import Link from "next/link";
import { ArrowRight, ArrowUpRight, CalendarDays, CreditCard, LifeBuoy } from "lucide-react";
import { CtaBand, PageHero, Section, SectionHeading, TextLink } from "@/components/ui";
import { AskAssistantButton } from "@/components/assistant/ask-button";
import { calendarTerms } from "@/content/calendar";
import { feeSteps, studentPortals, studentSupport, studentTasks } from "@/content/audiences";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";
import { formatDate, isExternal } from "@/lib/utils";

export const metadata = pageMeta({
  title: "Current Students",
  description: "Portals, timetables, results, fee payment, key dates and support for current King Ceasor University students.",
  path: "/students",
});

export default function StudentsPage() {
  // The page is rebuilt with each deploy, so "upcoming" is worked out at build time.
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = calendarTerms
    .flatMap((t) => t.items)
    .filter((i) => (i.end ?? i.start) >= today)
    .sort((a, b) => a.start.localeCompare(b.start))
    .slice(0, 5);

  return (
    <>
      <PageHero
        crumbs={[{ label: "Current students" }]}
        eyebrow="Current students"
        title="Everything you need this semester"
        intro="Your portals, key dates, fee payment and support in one place. Bookmark this page."
      />

      <Section className="!pt-10">
        <h2 className="sr-only">Portals</h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {studentPortals.map((p) => (
            <li key={p.label}>
              <a href={p.href} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-primary-600 hover:shadow-card">
                <span className="flex items-start justify-between gap-3">
                  <span className="heading text-lg text-ink">{p.label}</span>
                  <ArrowUpRight className="size-5 shrink-0 text-slate-400 transition group-hover:text-primary-600" aria-hidden />
                </span>
                <span className="mt-2 text-[0.9375rem] text-slate-600">{p.text}</span>
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="surface">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading eyebrow="Your studies" title="Common tasks" />
            <ul className="space-y-4">
              {studentTasks.map((t) => (
                <li key={t.title}>
                  <Link
                    href={t.href}
                    {...(isExternal(t.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-start justify-between gap-6 rounded-2xl bg-white p-6 ring-1 ring-slate-200 transition hover:ring-primary-600"
                  >
                    <span>
                      <span className="heading block text-lg text-ink">{t.title}</span>
                      <span className="mt-1 block text-slate-600">{t.text}</span>
                    </span>
                    <ArrowRight className="mt-1 size-5 shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-primary-600" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <aside className="lg:col-span-5">
            <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="inline-flex shrink-0 text-primary-600"><CalendarDays className="size-5" aria-hidden /></span>
                <h2 className="text-xl">Coming up</h2>
              </div>
              <ol className="mt-5 divide-y divide-slate-100">
                {upcoming.map((i) => (
                  <li key={i.title + i.start} className="flex gap-4 py-3.5">
                    <time dateTime={i.start} className="w-24 shrink-0 text-sm font-semibold tabular-nums text-ink">{formatDate(i.start, "short")}</time>
                    <span className="text-[0.9375rem] text-slate-700">{i.title}</span>
                  </li>
                ))}
              </ol>
              <TextLink href="/academic-calendar" className="mt-4">Full academic calendar</TextLink>
            </div>
          </aside>
        </div>
      </Section>

      <Section id="fees">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="inline-flex shrink-0 text-primary-600"><CreditCard className="size-6" aria-hidden /></span>
            <h2 className="mt-5 text-3xl sm:text-4xl">Paying your fees</h2>
            <p className="mt-4 text-lg text-slate-600">Pay at least the minimum required before registration. Instalment plans can be agreed with the Finance Office.</p>
            <p className="mt-4 text-slate-600">
              Questions about your statement? Call {site.contact.phone} and ask for Finance, {site.contact.hours}.
            </p>
          </div>
          <ol className="grid gap-4 lg:col-span-7">
            {feeSteps.map((s, i) => (
              <li key={s.title} className="flex gap-5 rounded-2xl border border-slate-200 p-6">
                <span className="heading grid size-10 shrink-0 place-items-center rounded-full bg-primary-600 text-white">{i + 1}</span>
                <span>
                  <span className="heading block text-lg text-ink">{s.title}</span>
                  <span className="mt-1 block text-slate-600">{s.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section tone="surface" id="support">
        <SectionHeading eyebrow="Support" title="Help when you need it" action={<TextLink href="/campus-life#support">Student support</TextLink>} />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {studentSupport.map((s) => (
            <li key={s.title} className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
              <LifeBuoy className="size-6 text-primary-600" aria-hidden />
              <h3 className="mt-4 text-lg">{s.title}</h3>
              <p className="mt-2 text-[0.9375rem] text-slate-600">{s.text}</p>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-col gap-4 rounded-2xl bg-brand-50 p-6 ring-1 ring-brand-100 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="text-lg font-semibold text-ink">Can&apos;t find what you need?</p>
            <p className="mt-1 text-slate-600">Ask the KCU Assistant, or visit the Library and Dean of Students on the main campus.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <AskAssistantButton className="shrink-0" />
            <Link href="/library" className="inline-flex h-11 items-center rounded-full border border-slate-300 bg-white px-5 text-sm font-semibold text-ink hover:border-ink">Library</Link>
          </div>
        </div>
      </Section>
      <CtaBand tone="quiet" title="Know someone who should study at KCU?" text="Share the January 2027 intake with friends and family." />
    </>
  );
}
