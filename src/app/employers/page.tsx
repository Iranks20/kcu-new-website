// PLACEHOLDER: verification turnaround, fee and the careers office contact must be confirmed by the
// Academic Registrar and Career Guidance office before launch.

import { BadgeCheck, Briefcase, GraduationCap, Handshake } from "lucide-react";
import { CtaBand, PageHero, Section, SectionHeading } from "@/components/ui";
import { SimpleForm } from "@/components/simple-form";
import { destinations } from "@/content/outcomes";
import { programmes } from "@/content/programmes";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Employers & Partners",
  description: "Hire King Ceasor University graduates, offer internships and placements, or verify a KCU certificate or transcript.",
  path: "/employers",
  image: "/images/kcu-2026/graduates-campus-trio.webp",
});

const offers = [
  { icon: GraduationCap, title: "Hire our graduates", text: "Graduates in medicine, nursing, law, business, computing, forensics and energy, ready for work across East Africa." },
  { icon: Briefcase, title: "Offer internships & placements", text: "Every degree includes practical training. Host students for internships, clinical rotations or industrial training." },
  { icon: Handshake, title: "Partner with us", text: "Co-design short courses, sponsor research, or join our career fairs and guest lectures." },
];

export default function EmployersPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Employers & partners" }]}
        eyebrow="Employers & partners"
        title="Work with KCU talent"
        intro="Recruit our graduates, host interns, or verify a KCU qualification. The Career Guidance office and the Academic Registrar are here to help."
        image="/images/kcu-2026/graduates-campus-trio.webp"
      />

      <Section>
        <SectionHeading eyebrow="How we work with employers" title="Three ways to work with KCU" highlight="work with KCU" />
        <ul className="grid gap-6 md:grid-cols-3">
          {offers.map((o) => (
            <li key={o.title} className="border-t-4 border-primary-600 bg-white pt-6">
              <o.icon className="size-6 text-primary-600" aria-hidden />
              <h3 className="mt-4 text-xl">{o.title}</h3>
              <p className="mt-2 text-slate-600">{o.text}</p>
            </li>
          ))}
        </ul>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {destinations.map((d) => (
            <div key={d.school} className="rounded-2xl bg-surface p-6">
              <p className="font-semibold text-ink">{d.school}</p>
              <p className="mt-1 text-sm text-slate-500">Typical first roles</p>
              <ul className="mt-3 space-y-1.5 text-[0.9375rem] text-slate-700">
                {d.roles.map((r) => <li key={r}>{r}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="surface" id="verify">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="inline-flex shrink-0 text-primary-600"><BadgeCheck className="size-6" aria-hidden /></span>
            <h2 className="mt-5 text-3xl sm:text-4xl">Verify a KCU certificate or transcript</h2>
            <p className="mt-4 text-lg text-slate-600">
              Employers, embassies and other universities can ask the Office of the Academic Registrar to confirm that a KCU qualification is genuine.
            </p>
            <ul className="mt-6 space-y-2 text-slate-700">
              <li>• Have the graduate&apos;s written consent ready.</li>
              <li>• Include their full name, registration number, programme and year of graduation.</li>
              <li>• Most requests are answered within five working days.</li>
            </ul>
          </div>
          <div className="lg:col-span-7">
            <SimpleForm
              submitLabel="Submit verification request"
              successTitle="Request received"
              successText="The Office of the Academic Registrar will email you the verification result."
              fields={[
                { name: "organisation", label: "Your organisation", required: true, autoComplete: "organization" },
                { name: "contact", label: "Your name", required: true, autoComplete: "name" },
                { name: "email", label: "Work email", type: "email", required: true, autoComplete: "email" },
                { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
                { name: "graduate", label: "Graduate's full name", required: true },
                { name: "regno", label: "Registration number", required: true },
                { name: "programme", label: "Programme", type: "select", options: programmes.map((p) => p.title), required: true },
                { name: "year", label: "Year of graduation", type: "number", required: true },
                { name: "notes", label: "Anything else we should know", type: "textarea" },
              ]}
            />
          </div>
        </div>
      </Section>

      <Section id="hire">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-3">Recruit</p>
            <h2 className="text-3xl sm:text-4xl">Post a job or internship</h2>
            <p className="mt-4 text-lg text-slate-600">
              Share an opening and the Career Guidance office will circulate it to students and recent graduates. Questions? Call {site.contact.phone}.
            </p>
          </div>
          <div className="lg:col-span-7">
            <SimpleForm
              submitLabel="Send opportunity"
              successTitle="Thank you"
              successText="The Career Guidance office will be in touch to confirm the details."
              fields={[
                { name: "organisation", label: "Organisation", required: true, autoComplete: "organization" },
                { name: "email", label: "Contact email", type: "email", required: true, autoComplete: "email" },
                { name: "type", label: "Opportunity", type: "select", options: ["Graduate job", "Internship", "Clinical placement", "Industrial training", "Part-time role"], required: true },
                { name: "field", label: "Field", type: "select", options: ["Health & medicine", "Law & governance", "Business & economics", "Computing & cyber security", "Oil, gas & energy", "Other"], required: true },
                { name: "details", label: "Role details and how to apply", type: "textarea", required: true },
              ]}
            />
          </div>
        </div>
      </Section>
      <CtaBand tone="quiet" title="Looking for a research or training partner?" text="Our Directorate of Postgraduate Studies & Research works with industry, hospitals and government." />
    </>
  );
}
