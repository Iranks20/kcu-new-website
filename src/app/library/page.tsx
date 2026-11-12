import Image from "next/image";
import { BookOpen, Clock } from "lucide-react";
import { Button, CtaBand, PageHero, Section, SectionHeading } from "@/components/ui";
import { library } from "@/content/audiences";
import { portals } from "@/content/site";
import { pageMeta } from "@/lib/seo";
import { asset } from "@/lib/utils";

export const metadata = pageMeta({
  title: "University Library",
  description: "KCU Library: opening hours, borrowing, e-resources, study spaces and research support.",
  path: "/library",
  image: "/images/kcu-2026/library-shelves-student.webp",
});

export default function LibraryPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Campus life", href: "/campus-life" }, { label: "Library" }]}
        eyebrow="University Library"
        title="Read, research, discover"
        intro="Print collections, e-resources, study spaces and expert help with your research, for students, staff and visiting researchers."
        image="/images/kcu-2026/library-shelves-student.webp"
      >
        <Button href={portals[2].href} size="lg">Search the catalogue</Button>
      </PageHero>

      <Section>
        <SectionHeading eyebrow="Services" title="What the Library offers" />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {library.services.map((s) => (
            <li key={s.title} className="rounded-2xl border border-slate-200 p-6">
              <BookOpen className="size-6 text-primary-600" aria-hidden />
              <h3 className="mt-4 text-lg">{s.title}</h3>
              <p className="mt-2 text-[0.9375rem] text-slate-600">{s.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="surface">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="inline-flex shrink-0 text-primary-600"><Clock className="size-5" aria-hidden /></span>
              <h2 className="text-2xl">Opening hours</h2>
            </div>
            <dl className="mt-6 divide-y divide-slate-100">
              {library.hours.map((h) => (
                <div key={h.days} className="flex justify-between gap-6 py-3.5">
                  <dt className="text-slate-600">{h.days}</dt>
                  <dd className="text-right font-semibold text-ink">{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="flex items-center gap-6 rounded-2xl bg-white p-6 ring-1 ring-slate-200 sm:p-8">
            <div className="relative size-24 shrink-0 overflow-hidden rounded-full bg-slate-100">
              <Image src={asset(library.librarian.image)} alt="" fill sizes="96px" className="object-cover object-top" />
            </div>
            <div>
              <p className="eyebrow">Ask a librarian</p>
              <p className="heading mt-2 text-xl text-ink">{library.librarian.name}</p>
              <p className="text-slate-600">{library.librarian.role}</p>
              <p className="mt-3 text-sm text-slate-500">Ask at the Library help desk for help with searches, referencing or e-resources.</p>
            </div>
          </div>
        </div>
      </Section>
      <CtaBand tone="quiet" title="Study with access to a modern library" text="Explore programmes across health, law, business and computing." />
    </>
  );
}
