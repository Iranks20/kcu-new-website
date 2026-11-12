import { ArrowUpRight, FileText, Target } from "lucide-react";
import { CtaBand, PageHero, Section, SectionHeading } from "@/components/ui";
import { strategicPriorities } from "@/content/audiences";
import { partners } from "@/content/partners";
import { programmes } from "@/content/programmes";
import { schools } from "@/content/schools";
import { site } from "@/content/site";
import { factSheet } from "@/content/outcomes";
import { latestGraduation, stats } from "@/content/university";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Facts & Figures",
  description: "King Ceasor University at a glance: students, programmes, graduates and partners, plus strategic priorities and University policies.",
  path: "/about/facts",
});

export default function FactsPage() {
  const figures = [
    { value: `${schools.length}`, label: "Schools" },
    { value: `${programmes.length}`, label: "Programmes" },
    stats[1],
    stats[2],
    { value: "4,000+", label: "Graduates" },
    { value: latestGraduation.graduates, label: "Graduates in 2026" },
    { value: `${partners.length}`, label: "International & clinical partners" },
    { value: "2025", label: "Year the University Charter was granted" },
  ];

  return (
    <>
      <PageHero
        crumbs={[{ label: "About", href: "/about" }, { label: "Facts & figures" }]}
        eyebrow="About KCU"
        title="Facts & figures"
        intro="King Ceasor University at a glance: who we are, how we are growing, and the plans and policies that guide us."
      />

      <Section>
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-slate-200 ring-1 ring-slate-200 lg:grid-cols-4">
          {figures.map((f) => (
            <div key={f.label} className="flex flex-col-reverse bg-white p-6 sm:p-8">
              <dt className="mt-2 text-sm text-slate-600 sm:text-base">{f.label}</dt>
              <dd className="heading text-4xl tabular-nums text-primary-600 sm:text-5xl">{f.value}</dd>
            </div>
          ))}
        </dl>
        <dl className="mt-10 divide-y divide-slate-200 rounded-2xl border border-slate-200">
          {factSheet.map((f) => (
            <div key={f.label} className="grid gap-1 px-5 py-4 sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-semibold text-slate-500">{f.label}</dt>
              <dd className="text-ink sm:col-span-2">{f.value}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section tone="surface" id="strategy">
        <SectionHeading eyebrow="Strategy" title="Our strategic priorities" intro="The direction set out by the Vice Chancellor for the University's next stage of growth." />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {strategicPriorities.map((p) => (
            <li key={p.title} className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
              <Target className="size-6 text-primary-600" aria-hidden />
              <h3 className="mt-4 text-lg">{p.title}</h3>
              <p className="mt-2 text-[0.9375rem] text-slate-600">{p.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="policies">
        <div className="flex flex-col gap-6 rounded-2xl bg-brand-50 p-6 ring-1 ring-brand-100 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div className="flex gap-4">
            <span className="inline-flex shrink-0 text-primary-600"><FileText className="size-6" aria-hidden /></span>
            <div>
              <h2 className="text-2xl sm:text-3xl">University policies</h2>
              <p className="mt-2 max-w-2xl text-slate-600">Academic regulations, student and staff policies, and governance documents approved by the University Council.</p>
            </div>
          </div>
          <a href={site.policiesUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-primary-600 px-6 font-semibold text-white hover:bg-primary-700">
            View all policies <ArrowUpRight className="size-4" aria-hidden />
          </a>
        </div>
      </Section>
      <CtaBand tone="quiet" />
    </>
  );
}
