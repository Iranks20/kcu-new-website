import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Award, CalendarClock, CheckCircle2 } from "lucide-react";
import { CtaBand, PageHero, Section, SectionHeading } from "@/components/ui";
import { SimpleForm } from "@/components/simple-form";
import { scholarships } from "@/content/opportunities";
import { programmes } from "@/content/programmes";

export const metadata: Metadata = {
  alternates: { canonical: "/scholarships" },
  title: "Scholarships & Funding",
  description: "Scholarships, merit awards, HESFB student loans and instalment plans at King Ceasor University.",
};

export default function ScholarshipsPage() {
  return (
    <>
      <PageHero crumbs={[{ label: "Admissions", href: "/admissions" }, { label: "Scholarships & funding" }]}
        eyebrow="Scholarships & funding"
        title="Talent shouldn't depend on money"
        intro="Merit awards, sports and leadership scholarships, government-backed loans and flexible payment plans help you fund your KCU degree."
        image="/images/kcu-2026/graduates-library-awards.webp"
      />

      <Section>
        <SectionHeading eyebrow="Awards" title="Scholarships and support you can apply for" action={<Link href="/admissions#calculator" className="font-semibold text-ink underline-offset-4 hover:underline">Estimate your fees →</Link>} />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {scholarships.map((s) => (
            <article key={s.title} className="flex flex-col rounded-2xl border border-slate-200 p-6 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gold-50 text-gold-700 ring-1 ring-gold-200">
                  <Award className="size-5" aria-hidden />
                </span>
                <span className="rounded-full bg-primary-600 px-3 py-1 text-xs font-semibold text-white">{s.value}</span>
              </div>
              <h3 className="mt-5 text-xl">{s.title}</h3>
              <p className="mt-1 text-sm font-medium text-slate-500">Who it&apos;s for: {s.for}</p>
              <ul className="mt-4 flex-1 space-y-2">
                {s.criteria.map((c) => (
                  <li key={c} className="flex gap-2.5 text-[0.9375rem] text-slate-700">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary-600" aria-hidden />
                    {c}
                  </li>
                ))}
              </ul>
              <p className="mt-5 flex items-start gap-2 border-t border-slate-100 pt-4 text-sm text-slate-600">
                <CalendarClock className="mt-0.5 size-4 shrink-0 text-slate-400" aria-hidden />
                {s.deadline}
              </p>
              {s.href && (
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-ink underline-offset-4 hover:underline">
                  Apply through HESFB <ArrowUpRight className="size-3.5" aria-hidden />
                </a>
              )}
            </article>
          ))}
        </div>
      </Section>

      <Section tone="surface" id="apply">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-3">Apply</p>
            <h2 className="text-3xl sm:text-4xl">Apply for a KCU award</h2>
            <p className="mt-4 text-lg text-slate-600">
              Apply for your programme first, then tell us which award you&apos;re applying for. The scholarships committee reviews applications after each deadline.
            </p>
            <ol className="mt-8 space-y-4">
              {["Apply for admission online", "Submit this form with your results", "Attach supporting documents when asked", "Hear back within four weeks"].map((t, i) => (
                <li key={t} className="flex items-center gap-4">
                  <span className="heading grid size-9 shrink-0 place-items-center rounded-full bg-primary-600 text-sm text-white">{i + 1}</span>
                  <span className="font-medium text-ink">{t}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-7">
            <SimpleForm
              submitLabel="Submit scholarship application"
              successTitle="Application received"
              successText="The scholarships committee will review your application and contact you by email."
              fields={[
                { name: "name", label: "Full name", required: true, autoComplete: "name" },
                { name: "email", label: "Email address", type: "email", required: true, autoComplete: "email" },
                { name: "phone", label: "Phone number", type: "tel", required: true, autoComplete: "tel" },
                { name: "award", label: "Award", type: "select", options: scholarships.filter((s) => !s.href).map((s) => s.title), required: true },
                { name: "programme", label: "Programme", type: "select", options: programmes.filter((p) => p.level !== "certificate").map((p) => p.title), required: true, full: true },
                { name: "statement", label: "Why should you receive this award?", type: "textarea", required: true },
              ]}
            />
          </div>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
