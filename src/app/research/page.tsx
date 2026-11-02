import type { Metadata } from "next";
import Image from "next/image";
import { FlaskConical } from "lucide-react";
import { CtaBand, PageHero, Section, SectionHeading, TextLink } from "@/components/ui";
import { NewsCard } from "@/components/cards";
import { researchAreas } from "@/content/campus";
import { partners } from "@/content/partners";
import { news } from "@/content/news";

export const metadata: Metadata = {
  title: "Research",
  description: "Research areas, partnerships and news from King Ceasor University.",
};

export default function ResearchPage() {
  const stories = news.filter((n) => n.category === "Research" || n.category === "Partnerships").slice(0, 3);
  return (
    <>
      <PageHero
        eyebrow="Research & innovation"
        title="Research that serves society"
        intro="Our research responds to Uganda's priorities in health, justice, technology, energy and agriculture, with students involved from their first year."
        image="/images/kcu-2026/lab-chemistry-students.webp"
      />
      <Section id="areas">
        <SectionHeading eyebrow="Focus areas" title="Where we focus" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {researchAreas.map((r) => (
            <div key={r.title} className="group rounded-2xl border border-slate-200 p-6 transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-lift sm:p-8">
              <span className="grid size-12 place-items-center rounded-xl bg-slate-50 text-primary-600 transition group-hover:bg-primary-600 group-hover:text-white">
                <FlaskConical className="size-6" aria-hidden />
              </span>
              <h3 className="mt-5 text-xl">{r.title}</h3>
              <p className="mt-2 text-slate-600">{r.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="surface" id="partners">
        <SectionHeading eyebrow="Partnerships" title="Collaborating across borders" intro="Academic, clinical and research partners on four continents." />
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {partners.map((p) => (
            <li key={p.name} className="flex flex-col items-center rounded-2xl bg-white p-6 text-center shadow-card">
              <div className="relative h-16 w-full">
                <Image src={p.logo} alt="" fill sizes="200px" className={`object-contain ${p.dark ? "invert" : ""}`} />
              </div>
              <p className="mt-4 text-sm font-semibold text-ink">{p.name}</p>
              <p className="text-xs text-slate-500">{p.country}</p>
            </li>
          ))}
        </ul>
      </Section>

      {stories.length > 0 && (
        <Section>
          <SectionHeading eyebrow="News" title="Research & partnership news" action={<TextLink href="/news">All news</TextLink>} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stories.map((a) => (
              <NewsCard key={a.slug} article={a} />
            ))}
          </div>
        </Section>
      )}
      <CtaBand title="Partner with KCU" text="We welcome research, clinical and academic partnerships. Get in touch with the Office of the Vice Chancellor." />
    </>
  );
}
