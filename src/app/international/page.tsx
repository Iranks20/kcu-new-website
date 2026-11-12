// PLACEHOLDER: the arrival and student pass steps should be confirmed with the Dean of Students before launch.

import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck, Globe2, Home, Plane, ShieldCheck, Stamp } from "lucide-react";
import { Button, CtaBand, PageHero, Section, SectionHeading } from "@/components/ui";
import { programmes } from "@/content/programmes";
import { accommodation } from "@/content/campus";
import { latestGraduation } from "@/content/university";
import { site } from "@/content/site";

export const metadata: Metadata = {
  alternates: { canonical: "/international" },
  title: "International Students",
  description: "Study at King Ceasor University in Kampala as an international student: fees in US dollars, entry requirements, student pass guidance and accommodation.",
};

const steps = [
  { icon: Globe2, title: "Choose and apply", text: "Pick a programme and apply online at apply.kcu.ac.ug, uploading your certificates and passport." },
  { icon: BadgeCheck, title: "Get your results equated", text: "Foreign qualifications are equated by UNEB or NCHE. Admissions will guide you through the request." },
  { icon: Stamp, title: "Receive your admission letter", text: "Your offer letter is the document you need to apply for a Ugandan student pass." },
  { icon: Plane, title: "Travel and arrive", text: "Apply for your visa and student pass, book your travel and tell us your arrival date so we can help you settle." },
  { icon: ShieldCheck, title: "Register on campus", text: "Complete registration, attend orientation week and meet the Office of the Dean of Students." },
];

export default function InternationalPage() {
  const degrees = programmes.filter((p) => p.level === "degree");
  const countries = latestGraduation.countries.filter((c) => c !== "Uganda");

  return (
    <>
      <PageHero crumbs={[{ label: "Admissions", href: "/admissions" }, { label: "International students" }]}
        eyebrow="International students"
        title="Your degree in the heart of East Africa"
        intro={`Students from ${countries.slice(0, -1).join(", ")} and ${countries.at(-1)} graduated with us this year. Fees are in US dollars, and our team supports you from application to arrival.`}
        image="/images/kcu-2026/graduates-welcome-group.webp"
      >
        <Button href={site.applyUrl} variant="gold" size="lg">Apply online</Button>
        <Button href={`mailto:${site.contact.admissionsEmail}`} variant="outline" size="lg" icon={false}>
          Email admissions
        </Button>
      </PageHero>

      <Section>
        <SectionHeading eyebrow="Step by step" title="From application to arrival" />
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s, i) => (
            <li key={s.title} className="rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center justify-between">
                <span className="inline-flex shrink-0 text-primary-600">
                  <s.icon className="size-5" aria-hidden />
                </span>
                <span className="heading text-2xl text-slate-300">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-5 text-lg">{s.title}</h3>
              <p className="mt-2 text-[0.9375rem] text-slate-600">{s.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="surface">
        <SectionHeading
          eyebrow="Fees in US dollars"
          title="Undergraduate tuition for international students"
          intro="Tuition per semester. Students from East African Community countries pay the East African rate."
          action={<Link href="/admissions#calculator" className="font-semibold text-ink underline-offset-4 hover:underline">Estimate your total cost →</Link>}
        />
        <div className="overflow-x-auto rounded-2xl bg-white ring-1 ring-slate-200">
          <table className="w-full min-w-[36rem] text-left">
            <thead className="border-b border-slate-200 text-sm text-slate-500">
              <tr>
                <th className="px-5 py-3.5 font-medium">Programme</th>
                <th className="px-5 py-3.5 font-medium">Duration</th>
                <th className="px-5 py-3.5 text-right font-medium">International, per semester</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {degrees.map((p) => (
                <tr key={p.slug}>
                  <td className="px-5 py-3.5">
                    <Link href={`/programmes/${p.slug}`} className="font-medium text-ink hover:underline">{p.title}</Link>
                  </td>
                  <td className="px-5 py-3.5 text-slate-600">{p.duration}</td>
                  <td className="px-5 py-3.5 text-right font-semibold tabular-nums text-ink">{p.fees.international}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow mb-3">Documents</p>
            <h2 className="text-3xl sm:text-4xl">What you&apos;ll need</h2>
            <ul className="mt-8 space-y-3">
              {[
                "Academic certificates and transcripts",
                "Equated results from UNEB or NCHE",
                "A passport valid for the length of your studies",
                "Two recent passport-size photographs",
                "Evidence of English proficiency, where English was not your medium of instruction",
              ].map((d) => (
                <li key={d} className="flex gap-3">
                  <BadgeCheck className="mt-1 size-5 shrink-0 text-primary-600" aria-hidden />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-3">Accommodation</p>
            <h2 className="text-3xl sm:text-4xl">A place to live</h2>
            <p className="mt-4 text-slate-600">We help you find a room in a vetted partner hostel close to campus. Indicative prices per semester:</p>
            <ul className="mt-6 divide-y divide-slate-200 rounded-2xl border border-slate-200">
              {accommodation.map((a) => (
                <li key={a.name} className="flex items-start gap-4 p-5">
                  <Home className="mt-1 size-5 shrink-0 text-slate-500" aria-hidden />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                      <p className="font-semibold text-ink">{a.name}</p>
                      <p className="text-sm font-medium tabular-nums text-slate-600">{a.price}</p>
                    </div>
                    <p className="mt-1 text-sm text-slate-600">{a.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <CtaBand title="Questions about studying in Uganda?" text={`Email ${site.contact.admissionsEmail} or call ${site.contact.phone}. We reply within one working day.`} />
    </>
  );
}
