import { CheckCircle2, ShieldCheck } from "lucide-react";
import { Button, CtaBand, PageHero, Section, SectionHeading } from "@/components/ui";
import { feeSteps, parentFaqs, parentReasons } from "@/content/audiences";
import { accommodation } from "@/content/campus";
import { site, whatsappLink } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Parents & Sponsors",
  description: "For parents, guardians and sponsors: fees and how to pay, safety and welfare, accommodation and how to reach King Ceasor University.",
  path: "/parents",
});

export default function ParentsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Admissions", href: "/admissions" }, { label: "Parents & sponsors" }]}
        eyebrow="Parents, guardians & sponsors"
        title="Supporting a student at KCU"
        intro="What you need to know about fees, safety, accommodation and staying in touch, whether you are a parent, guardian or employer sponsor."
        image="/images/kcu-2026/graduates-welcome-group.webp"
      >
        <Button href="/admissions#fees" size="lg">See tuition fees</Button>
        <Button href={whatsappLink("Hello KCU, I am a parent and I have a question.")} variant="outline" size="lg">Ask on WhatsApp</Button>
      </PageHero>

      <Section>
        <SectionHeading eyebrow="Peace of mind" title="Why families choose KCU" />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {parentReasons.map((r) => (
            <li key={r.title} className="rounded-2xl border border-slate-200 p-6">
              <ShieldCheck className="size-6 text-primary-600" aria-hidden />
              <h3 className="mt-4 text-lg">{r.title}</h3>
              <p className="mt-2 text-[0.9375rem] text-slate-600">{r.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="surface" id="fees">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-3">Fees</p>
            <h2 className="text-3xl sm:text-4xl">How to pay fees</h2>
            <p className="mt-4 text-lg text-slate-600">Every programme&apos;s tuition is published. Instalment plans and HESFB student loans are available for eligible students.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/admissions#calculator">Estimate the total cost</Button>
              <Button href="/scholarships" variant="outline" icon={false}>Scholarships & loans</Button>
            </div>
          </div>
          <ol className="grid gap-4 lg:col-span-7">
            {feeSteps.map((s, i) => (
              <li key={s.title} className="flex gap-5 rounded-2xl bg-white p-6 ring-1 ring-slate-200">
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

      <Section id="accommodation">
        <SectionHeading eyebrow="Accommodation" title="Where students live" intro="Vetted partner hostels within walking distance of campus. Indicative prices per semester." />
        <ul className="grid gap-5 md:grid-cols-3">
          {accommodation.map((a) => (
            <li key={a.name} className="rounded-2xl border border-slate-200 p-6">
              <h3 className="text-lg">{a.name}</h3>
              <p className="heading mt-2 text-xl text-primary-600">{a.price}</p>
              <p className="mt-2 text-[0.9375rem] text-slate-600">{a.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="surface" id="faqs">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-3">Questions</p>
            <h2 className="text-3xl sm:text-4xl">Common questions from families</h2>
            <ul className="mt-6 space-y-2 text-slate-700">
              <li className="flex gap-2"><CheckCircle2 className="mt-1 size-4 shrink-0 text-primary-600" aria-hidden />Phone: <a href={site.contact.phoneHref} className="font-semibold text-ink">{site.contact.phone}</a></li>
              <li className="flex gap-2"><CheckCircle2 className="mt-1 size-4 shrink-0 text-primary-600" aria-hidden />Email: <a href={`mailto:${site.contact.email}`} className="font-semibold text-ink">{site.contact.email}</a></li>
            </ul>
          </div>
          <div className="space-y-3 lg:col-span-8">
            {parentFaqs.map((f) => (
              <details key={f.q} className="group rounded-2xl bg-white ring-1 ring-slate-200">
                <summary className="p-5 font-semibold text-ink sm:p-6">{f.q}</summary>
                <p className="px-5 pb-5 text-slate-600 sm:px-6 sm:pb-6">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
