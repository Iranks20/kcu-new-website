import type { Metadata } from "next";
import { Clock, GraduationCap, MonitorSmartphone } from "lucide-react";
import { PageHero, Section, SectionHeading } from "@/components/ui";
import { SimpleForm } from "@/components/simple-form";
import { postgraduate } from "@/content/opportunities";

export const metadata: Metadata = {
  alternates: { canonical: "/postgraduate" },
  title: "Postgraduate Study",
  description: "Master's and postgraduate diploma programmes in development at King Ceasor University. Register your interest.",
};

export default function PostgraduatePage() {
  return (
    <>
      <PageHero crumbs={[{ label: "Programmes", href: "/programmes" }, { label: "Postgraduate" }]} eyebrow="Postgraduate study" title="Take your career further" intro={postgraduate.intro} image="/images/kcu-2026/library-student-reading.webp" />

      <Section>
        <SectionHeading
          eyebrow={postgraduate.status}
          title="Programmes in development"
          intro="Designed for working professionals, with evening, weekend and blended study. Register your interest to hear first when applications open."
        />
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {postgraduate.programmes.map((p) => (
            <li key={p.title} className="flex flex-col rounded-2xl border border-slate-200 p-6 sm:p-7">
              <span className="w-fit rounded-full bg-gold-100 px-2.5 py-0.5 text-xs font-semibold text-gold-700">Coming soon</span>
              <h3 className="mt-4 text-xl">{p.title}</h3>
              <p className="mt-1 text-sm text-slate-500">School of {p.school}</p>
              <p className="mt-3 flex-1 text-slate-600">{p.text}</p>
              <dl className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-slate-100 pt-4 text-sm text-slate-600">
                <div className="flex items-center gap-1.5">
                  <dt className="sr-only">Duration</dt>
                  <Clock className="size-4 text-slate-400" aria-hidden />
                  <dd>{p.duration}</dd>
                </div>
                <div className="flex items-center gap-1.5">
                  <dt className="sr-only">Study mode</dt>
                  <MonitorSmartphone className="size-4 text-slate-400" aria-hidden />
                  <dd>{p.mode}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="surface" id="interest">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-3">Register your interest</p>
            <h2 className="text-3xl sm:text-4xl">Be first to know</h2>
            <p className="mt-4 text-lg text-slate-600">Tell us what you&apos;d like to study and we&apos;ll let you know as soon as each programme is accredited and open for applications.</p>
            <div className="mt-8 flex items-center gap-4 rounded-2xl bg-white p-5 ring-1 ring-slate-200">
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-primary-600 text-white">
                <GraduationCap className="size-5" aria-hidden />
              </span>
              <div>
                <p className="font-semibold text-ink">{postgraduate.director.name}</p>
                <p className="text-sm text-slate-500">{postgraduate.director.role}</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7">
            <SimpleForm
              submitLabel="Register interest"
              successTitle="Thank you for your interest"
              successText="The Directorate of Postgraduate Studies will email you when applications open."
              fields={[
                { name: "name", label: "Full name", required: true, autoComplete: "name" },
                { name: "email", label: "Email address", type: "email", required: true, autoComplete: "email" },
                { name: "programme", label: "Programme of interest", type: "select", options: postgraduate.programmes.map((p) => p.title), required: true, full: true },
                { name: "qualification", label: "Highest qualification", required: true },
                { name: "employer", label: "Current employer" },
              ]}
            />
          </div>
        </div>
      </Section>
    </>
  );
}
