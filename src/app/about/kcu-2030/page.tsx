// PLACEHOLDER: draft summary built from the Vice Chancellor's stated priorities (benchmark: SMU2030).
// Replace the "By 2030" statements with the approved strategic plan's goals once the University Council publishes it.

import Image from "next/image";
import { Button, CtaBand, PageHero, Section, SectionHeading } from "@/components/ui";
import { strategicPriorities } from "@/content/audiences";
import { coreValues, mission, vision } from "@/content/university";
import { viceChancellor } from "@/content/people";
import { pageMeta } from "@/lib/seo";
import { asset } from "@/lib/utils";

export const metadata = pageMeta({
  title: "KCU 2030",
  description: "King Ceasor University's direction to 2030: competency-based education, research and innovation, global partnerships and technology in learning.",
  path: "/about/kcu-2030",
  image: "/images/kcu-2026/graduates-library-awards.webp",
});

const ambitions: Record<string, string> = {
  "Competency-based education": "Every programme taught through practical, assessed competencies, so graduates are ready for work on day one.",
  "Research & innovation": "Recognised research groups in health, justice, and digital and energy futures, with students in research from their first year.",
  "Global partnerships": "Exchange, clinical and research partners on every continent, and more international students on Bunga Hill.",
  "Technology in learning": "Blended learning across all schools, with digital services for every student and member of staff.",
};

export default function Kcu2030Page() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "About", href: "/about" }, { label: "KCU 2030" }]}
        eyebrow="Strategy"
        title="KCU 2030"
        intro="Where King Ceasor University is heading in the years after its University Charter, and how we will get there."
        image="/images/kcu-2026/graduates-library-awards.webp"
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-4">Our purpose</p>
            <p className="heading text-3xl leading-tight text-ink sm:text-4xl">{mission}</p>
            <p className="mt-6 text-lg text-slate-600">
              Our vision: <strong className="text-ink">{vision}</strong>
            </p>
          </div>
          <figure className="flex items-center gap-5 self-start bg-surface p-6 lg:col-span-5">
            <div className="relative size-20 shrink-0 overflow-hidden rounded-full bg-slate-100">
              <Image src={asset(viceChancellor.image)} alt="" fill sizes="80px" className="object-cover object-top" />
            </div>
            <figcaption>
              <blockquote className="text-slate-700">&ldquo;{viceChancellor.message.find((m) => m.includes("Competency-Based"))}&rdquo;</blockquote>
              <p className="mt-2 text-sm font-semibold text-ink">{viceChancellor.name}, Vice Chancellor</p>
            </figcaption>
          </figure>
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading eyebrow="Four priorities" title="What we're working towards" highlight="working towards" intro="Each priority comes from the Vice Chancellor's message to the University community." />
        <ol className="grid gap-6 md:grid-cols-2">
          {strategicPriorities.map((p, i) => (
            <li key={p.title} className="border-t-4 border-primary-600 bg-white p-6 sm:p-8">
              <p className="heading text-5xl text-gold-500">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-3 text-2xl">{p.title}</h3>
              <p className="mt-2 text-slate-600">{p.text}</p>
              {ambitions[p.title] && (
                <p className="mt-4 border-t border-slate-100 pt-4 text-[0.9375rem] text-slate-700">
                  <strong className="text-ink">By 2030:</strong> {ambitions[p.title]}
                </p>
              )}
            </li>
          ))}
        </ol>
        <p className="mt-6 text-sm text-slate-500">This is a summary for the website. The full strategic plan will be published here once it is approved by the University Council.</p>
      </Section>

      <Section>
        <SectionHeading eyebrow="Our values" title="How we work" />
        <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-5">
          {coreValues.map((v) => (
            <li key={v.title}>
              <h3 className="text-lg">{v.title}</h3>
              <p className="mt-1 text-[0.9375rem] text-slate-600">{v.text}</p>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/about/facts">Facts & figures</Button>
          <Button href="/about/leadership" variant="outline" icon={false}>Leadership & governance</Button>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
