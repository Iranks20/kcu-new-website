import type { Metadata } from "next";
import { Briefcase, CalendarClock, Download, MapPin } from "lucide-react";
import { Badge, PageHero, Section } from "@/components/ui";
import { vacancies } from "@/content/careers";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Careers at KCU",
  description: "Academic and administrative vacancies at King Ceasor University.",
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Work with us"
        title="Careers at KCU"
        intro="Join a growing, chartered university and help shape the next generation of professionals and leaders."
        image="/images/kcu-2026/library-collaboration-portrait.webp"
      />
      <Section>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl">Open positions</h2>
            <p className="mt-2 text-slate-600">{vacancies.length} vacancies · Send applications to <a href={`mailto:${site.contact.careersEmail}`} className="font-semibold text-primary-700">{site.contact.careersEmail}</a></p>
          </div>
        </div>
        <ul className="space-y-4">
          {vacancies.map((v) => (
            <li key={v.slug}>
              <details className="group rounded-2xl border border-slate-200 bg-white transition open:shadow-card hover:border-primary-200">
                <summary className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                  <div>
                    <h3 className="text-lg group-open:text-primary-700">{v.title}</h3>
                    <p className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
                      <span className="flex items-center gap-1.5"><Briefcase className="size-4" aria-hidden />{v.department}</span>
                      <span className="flex items-center gap-1.5"><MapPin className="size-4" aria-hidden />{v.location}</span>
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <Badge>{v.type}</Badge>
                    <span className="flex items-center gap-1.5 text-sm text-slate-500"><CalendarClock className="size-4" aria-hidden />Closes {v.deadline}</span>
                  </div>
                </summary>
                <div className="border-t border-slate-100 px-5 pb-6 pt-5 sm:px-6">
                  <p className="text-slate-700">{v.summary}</p>
                  <h4 className="mt-5 text-base">Key requirements</h4>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600 marker:text-primary-500">
                    {v.requirements.map((r) => <li key={r}>{r}</li>)}
                  </ul>
                  {v.pdf && (
                    <a href={v.pdf} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex h-10 items-center gap-2 rounded-full bg-primary-600 px-5 text-sm font-semibold text-white hover:bg-primary-700">
                      <Download className="size-4" aria-hidden /> Full job advert (PDF)
                    </a>
                  )}
                </div>
              </details>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
