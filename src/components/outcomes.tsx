import { BadgeCheck, Briefcase } from "lucide-react";
import { destinations, outcomesNote, outcomeStats, recognition } from "@/content/outcomes";
import { CountUp } from "./count-up";
import { Section, SectionHeading } from "./ui";

/** "Where do KCU graduates go?" — headline outcomes and typical first roles by school. */
export function GraduateOutcomes({ tone = "white", className }: { tone?: "white" | "surface"; className?: string }) {
  return (
    <Section tone={tone} id="outcomes" className={className}>
      <SectionHeading eyebrow="Graduate outcomes" title="Where a KCU degree takes you" intro="Our graduates work in hospitals, courts, banks, energy companies and tech teams across East Africa, or go on to further study." />
      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-slate-200 ring-1 ring-slate-200 lg:grid-cols-4">
        {outcomeStats.map((s) => (
          <div key={s.label} className="flex flex-col-reverse bg-white p-6 sm:p-8">
            <dt className="mt-2 text-sm text-slate-600 sm:text-base">{s.label}</dt>
            <dd className="heading text-4xl text-primary-600 sm:text-5xl">
              <CountUp value={s.value} />
            </dd>
          </div>
        ))}
      </dl>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {destinations.map((d) => (
          <div key={d.school} className="rounded-2xl border border-slate-200 bg-white p-6">
            <p className="font-semibold text-ink">{d.school}</p>
            <ul className="mt-4 space-y-2.5">
              {d.roles.map((r) => (
                <li key={r} className="flex items-start gap-2.5 text-[0.9375rem] text-slate-700">
                  <Briefcase className="mt-0.5 size-4 shrink-0 text-slate-400" aria-hidden />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm text-slate-500">{outcomesNote}</p>
    </Section>
  );
}

/** A strip of the bodies that charter, accredit and recognise KCU. */
export function RecognitionStrip() {
  return (
    <section aria-label="Recognised by" className="border-y border-slate-200 bg-white">
      <div className="container-x py-10">
        <p className="text-center text-sm font-semibold uppercase tracking-wider text-slate-500">Chartered, accredited &amp; recognised</p>
        <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
          {recognition.map((r) => (
            <li key={r.name} className="flex items-center gap-3" title={`${r.name}: ${r.text}`}>
              <span className="heading grid h-10 min-w-10 shrink-0 place-items-center rounded-lg bg-primary-600 px-2 text-[0.6875rem] tracking-wide text-white">{r.short === "Chartered" ? <BadgeCheck className="size-5" aria-hidden /> : r.short}</span>
              <span className="min-w-0 text-sm leading-snug text-slate-600">
                <span className="block font-semibold text-ink">{r.name}</span>
                {r.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
