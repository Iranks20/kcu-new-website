import type { Metadata } from "next";
import { PageHero, Section, SectionHeading } from "@/components/ui";
import { PersonCard } from "@/components/cards";
import { council, management, trustees } from "@/content/people";

export const metadata: Metadata = {
  alternates: { canonical: "/about/leadership" },
  title: "Leadership & Governance",
  description: "The Board of Trustees, University Council and management team of King Ceasor University.",
};

const groups = [
  { id: "management", eyebrow: "Management", title: "University management", intro: "The team responsible for the day-to-day leadership of academic and administrative life.", people: management },
  { id: "council", eyebrow: "Governance", title: "University Council", intro: "The supreme governing body, overseeing policy, finance, quality and student welfare.", people: council },
  { id: "trustees", eyebrow: "Governance", title: "Board of Trustees", intro: "Custodians of the University's mission, vision and long-term direction.", people: trustees },
];

export default function LeadershipPage() {
  return (
    <>
      <PageHero crumbs={[{ label: "About", href: "/about" }, { label: "Leadership & governance" }]}
        eyebrow="About KCU"
        title="Leadership & governance"
        intro="Experienced leaders in education, health, law and public service, guiding KCU's growth as a chartered university."
        image="/images/kcu-2026/library-books-consultation.webp"
      />
      <nav aria-label="On this page" className="border-b border-slate-200">
        <ul className="container-x flex gap-1 overflow-x-auto py-3">
          {groups.map((g) => (
            <li key={g.id}>
              <a href={`#${g.id}`} className="block whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-ink">
                {g.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {groups.map((g, i) => (
        <Section key={g.id} id={g.id} tone={i % 2 ? "surface" : "white"}>
          <SectionHeading eyebrow={g.eyebrow} title={g.title} intro={g.intro} />
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            {g.people.map((p) => (
              <PersonCard key={`${g.id}-${p.name}`} person={p} />
            ))}
          </div>
        </Section>
      ))}
    </>
  );
}
