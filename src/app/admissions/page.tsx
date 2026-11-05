import Image from "next/image";
import Link from "next/link";
import { CalendarDays, CheckCircle2, FileText, Globe2, Plus } from "lucide-react";
import { Badge, Button, CtaBand, PageHero, Section, SectionHeading } from "@/components/ui";
import { Credentials } from "@/components/credentials";
import { FeesCalculator } from "@/components/fees-calculator";
import { entryRequirements, levelLabels, programmes, type Level } from "@/content/programmes";
import { schools } from "@/content/schools";
import { admissionFaqs, applicationSteps, funding, intakes, requiredDocuments } from "@/content/university";
import { site } from "@/content/site";
import { CurrencyToggle, FeeAmount } from "@/components/fee-amount";
import { GraduateOutcomes } from "@/components/outcomes";
import { AskAssistantButton } from "@/components/assistant/ask-button";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Admissions",
  description: "How to apply to King Ceasor University: entry requirements, fees, funding, intakes and answers to common questions.",
  path: "/admissions",
});

const quickLinks = [
  { label: "How to apply", href: "#apply" },
  { label: "Requirements", href: "#requirements" },
  { label: "Key dates", href: "#intakes" },
  { label: "Fees", href: "#fees" },
  { label: "Funding", href: "#funding" },
  { label: "International", href: "#international" },
  { label: "FAQs", href: "#faqs" },
];

export default function AdmissionsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Admissions" }]}
        eyebrow={`${site.currentIntake.name} · ${site.currentIntake.status}`}
        title="Your journey to KCU starts here"
        intro="Everything you need to apply: requirements, fees, funding and key dates. Most applicants hear back within two weeks."
        image="/images/home/campus-welcome.webp"
      >
        <Button href={site.applyUrl} size="lg">Apply online</Button>
        <Button href="/programmes" variant="outline" size="lg" icon={false}>Find a programme</Button>
        <AskAssistantButton question="Help me apply" size="lg">Help me apply</AskAssistantButton>
      </PageHero>
      <Credentials />

      <nav aria-label="On this page" className="sticky top-[4.5rem] z-30 border-b border-slate-200 bg-white/95 backdrop-blur xl:top-20">
        <ul className="container-x flex gap-1 overflow-x-auto py-3">
          {quickLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="block whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-ink">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Steps */}
      <Section id="apply">
        <SectionHeading eyebrow="How to apply" title="Six simple steps" intro="Apply online from anywhere. If you get stuck, our admissions team is one call away." />
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {applicationSteps.map((s, i) => (
            <li key={s.title} className="relative rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-slate-300 hover:shadow-card">
              <span className="heading grid size-11 place-items-center rounded-full bg-primary-600 text-lg text-white">{i + 1}</span>
              <h3 className="mt-5 text-lg">{s.title}</h3>
              <p className="mt-2 text-slate-600">{s.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Requirements */}
      <Section id="requirements" tone="surface">
        <SectionHeading eyebrow="Entry requirements" title="What you need to join" />
        <div className="grid gap-5 md:grid-cols-2">
          {(Object.keys(entryRequirements) as Level[]).map((level) => (
            <div key={level} className="rounded-2xl bg-white p-6 shadow-card sm:p-8">
              <h3 className="text-xl">{levelLabels[level]}</h3>
              <ul className="mt-5 space-y-3">
                {entryRequirements[level].map((r) => (
                  <li key={r} className="flex gap-3 text-slate-700">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-slate-400" aria-hidden />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <FileText className="size-6 text-slate-500" aria-hidden />
            <h3 className="text-lg">Documents to prepare</h3>
          </div>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {requiredDocuments.map((d) => (
              <li key={d} className="flex gap-2.5 text-slate-700">
                <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-slate-400" aria-hidden />
                {d}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Intakes */}
      <Section id="intakes">
        <SectionHeading eyebrow="Intakes & key dates" title="When you can start" intro="We admit students three times a year. Dates are indicative and confirmed by the Academic Registrar." action={<Link href="/academic-calendar" className="font-semibold text-ink underline-offset-4 hover:underline">Full academic calendar →</Link>} />
        <div className="grid gap-5 lg:grid-cols-3">
          {intakes.map((intake, i) => (
            <div key={intake.name} className={i === 0 ? "rounded-2xl bg-brand-50 ring-1 ring-brand-100 p-6 text-ink shadow-lift sm:p-8" : "rounded-2xl border border-slate-200 p-6 sm:p-8"}>
              <div className="flex items-center justify-between gap-3">
                <CalendarDays className={i === 0 ? "size-6 text-primary-600" : "size-6 text-slate-500"} aria-hidden />
                <Badge tone={i === 0 ? "gold" : "slate"}>{intake.status}</Badge>
              </div>
              <h3 className={i === 0 ? "mt-5 text-xl text-ink" : "mt-5 text-xl"}>{intake.name}</h3>
              <dl className="mt-5 space-y-2.5 text-[0.9375rem]">
                {[
                  ["Applications open", intake.opens],
                  ["Applications close", intake.closes],
                  ["Classes begin", intake.starts],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4">
                    <dt className={i === 0 ? "text-slate-600" : "text-slate-500"}>{k}</dt>
                    <dd className="font-semibold">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </Section>

      {/* Fees */}
      <Section id="fees" tone="surface">
        <SectionHeading
          eyebrow="Fees"
          title="Clear, affordable tuition"
          intro="Tuition per semester for degrees, diplomas and bridging courses, and per course for short courses. Functional fees may apply."
        />
        <div id="calculator" className="mb-12 scroll-mt-40">
          <FeesCalculator
            programmes={programmes.map(({ slug, title, school, duration, fees, level }) => ({ slug, title, school, duration, fees, level }))}
            schools={schools.map(({ slug, name }) => ({ slug, name }))}
          />
        </div>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <h3 className="text-xl">Full fees by school</h3>
          <CurrencyToggle />
        </div>
        <div className="space-y-6">
          {schools.map((school) => (
            <details key={school.slug} className="group overflow-hidden rounded-2xl bg-white shadow-card" open={school.slug === schools[0].slug}>
              <summary className="flex items-center justify-between gap-4 p-5 sm:p-6">
                <span className="heading text-lg text-ink sm:text-xl">{school.name}</span>
                <Plus className="size-5 shrink-0 text-slate-400 transition-transform group-open:rotate-45" aria-hidden />
              </summary>
              <div className="overflow-x-auto border-t border-slate-100">
                <table className="w-full min-w-[640px] text-left text-[0.9375rem]">
                  <thead className="bg-surface text-sm text-slate-500">
                    <tr>
                      <th scope="col" className="px-5 py-3 font-medium sm:px-6">Programme</th>
                      <th scope="col" className="px-4 py-3 font-medium">Duration</th>
                      <th scope="col" className="px-4 py-3 font-medium">East Africa</th>
                      <th scope="col" className="px-5 py-3 font-medium sm:px-6">International</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {programmes
                      .filter((p) => p.school === school.slug)
                      .map((p) => (
                        <tr key={p.slug} className="hover:bg-slate-50">
                          <td className="px-5 py-3.5 sm:px-6">
                            <Link href={`/programmes/${p.slug}`} className="font-medium text-ink underline-offset-4 hover:underline">{p.title}</Link>
                          </td>
                          <td className="whitespace-nowrap px-4 py-3.5 text-slate-600">{p.duration}</td>
                          <td className="whitespace-nowrap px-4 py-3.5 font-semibold text-ink"><FeeAmount fee={p.fees.local} /></td>
                          <td className="whitespace-nowrap px-5 py-3.5 text-slate-600 sm:px-6">{p.fees.international}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </details>
          ))}
        </div>
      </Section>

      <GraduateOutcomes className="border-b border-slate-100" />

      {/* Funding */}
      <Section id="funding">
        <SectionHeading eyebrow="Funding" title="Ways to fund your studies" action={<Link href="/scholarships" className="font-semibold text-ink underline-offset-4 hover:underline">All scholarships →</Link>} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {funding.map((f) => (
            <div key={f.title} className="flex flex-col rounded-2xl border border-slate-200 p-6">
              <h3 className="text-lg">{f.title}</h3>
              <p className="mt-2 flex-1 text-slate-600">{f.text}</p>
              {f.href && (
                <a href={f.href} target="_blank" rel="noopener noreferrer" className="mt-4 text-sm font-semibold text-ink underline-offset-4 hover:underline">
                  Visit HESFB ↗
                </a>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* International */}
      <section id="international" className="bg-brand-50">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[20rem]">
            <Image src="/images/kcu-2026/graduates-welcome-group.webp" alt="KCU students from across Africa" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <div className="px-4 py-16 sm:px-12 lg:px-16 lg:py-24">
            <Globe2 className="size-10 text-primary-600" aria-hidden />
            <h2 className="mt-5 text-3xl text-ink sm:text-4xl">International students</h2>
            <p className="mt-4 text-lg text-slate-600">
              KCU welcomes students from across Africa and beyond. International fees are charged in US dollars, foreign qualifications are
              equated through UNEB and NCHE, and the Office of the Dean of Students supports you with immigration, accommodation and settling in.
            </p>
            <ul className="mt-6 space-y-2.5 text-slate-600">
              {["Equated results from UNEB / NCHE", "Valid passport and student pass guidance", "Evidence of English proficiency where needed"].map((t) => (
                <li key={t} className="flex gap-3"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary-600" aria-hidden />{t}</li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href="/international" variant="white">International student guide</Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <Section id="faqs">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-3">FAQs</p>
            <h2 className="text-3xl sm:text-4xl">Questions, answered</h2>
            <p className="mt-4 text-lg text-slate-600">
              Can&apos;t find what you need? Call <a href={site.contact.phoneHref} className="font-semibold text-ink underline-offset-4 hover:underline">{site.contact.phone}</a> or email{" "}
              <a href={`mailto:${site.contact.admissionsEmail}`} className="font-semibold text-ink underline-offset-4 hover:underline">{site.contact.admissionsEmail}</a>.
            </p>
          </div>
          <div className="divide-y divide-slate-200 border-y border-slate-200 lg:col-span-8">
            {admissionFaqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex items-center justify-between gap-4">
                  <span className="text-lg font-semibold text-ink">{f.q}</span>
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-500 transition group-open:rotate-45 group-open:bg-primary-600 group-open:text-white">
                    <Plus className="size-4" aria-hidden />
                  </span>
                </summary>
                <p className="mt-3 pr-12 text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
