import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { levelLabels, type Level } from "@/content/programmes";
import { schools } from "@/content/schools";
import { proofPoints } from "@/content/proof";
import { ProofRotator } from "./proof-rotator";

const audiences = [
  { label: "Prospective student", href: "/admissions" },
  { label: "International student", href: "/international" },
  { label: "Parent or sponsor", href: "/parents" },
  { label: "Current student", href: "/students" },
  { label: "Working professional", href: "/programmes?level=certificate" },
  { label: "Alumni", href: "/alumni" },
  { label: "Employer or partner", href: "/employers" },
];

const field = "mt-1.5 h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-[0.9375rem] outline-none transition focus:border-primary-600 focus:ring-4 focus:ring-primary-600/15";

/**
 * The band directly under the hero (benchmark: ASU's "Find my degree · rankings · I am a future").
 * Three things to do within one scroll: search programmes, see why KCU, or jump to your audience page.
 * The search is a plain GET form, so it works before JavaScript loads.
 */
export function ActionBand() {
  return (
    <section aria-label="Get started" className="bg-surface bg-contours py-10 sm:py-14">
      <div className="container-x">
        <div className="grid overflow-hidden rounded-2xl bg-white shadow-card lg:grid-cols-12">
          <form action="/programmes" method="get" className="flex flex-col gap-4 p-7 sm:p-9 lg:col-span-4">
            <h2 className="text-2xl sm:text-3xl">Find my programme</h2>
            <label className="block text-sm font-semibold text-ink">
              Search by keyword
              <span className="relative block">
                <Search className="pointer-events-none absolute left-3 top-1/2 mt-[3px] size-4 -translate-y-1/2 text-slate-400" aria-hidden />
                <input name="q" type="search" placeholder="e.g. nursing, law, cyber" className={`${field} pl-9`} />
              </span>
            </label>
            <label className="block text-sm font-semibold text-ink">
              Area of interest
              <select name="school" defaultValue="" className={field}>
                <option value="">All areas</option>
                {schools.map((s) => (
                  <option key={s.slug} value={s.slug}>{s.shortName}</option>
                ))}
              </select>
            </label>
            <label className="block text-sm font-semibold text-ink">
              Level
              <select name="level" defaultValue="" className={field}>
                <option value="">All levels</option>
                {(Object.keys(levelLabels) as Level[]).map((l) => (
                  <option key={l} value={l}>{levelLabels[l]}</option>
                ))}
              </select>
            </label>
            <div className="mt-1 flex flex-wrap items-center gap-x-5 gap-y-3">
              <button type="submit" className="inline-flex h-11 items-center rounded-full bg-primary-600 px-6 text-sm font-bold text-white transition hover:bg-primary-700">
                Search programmes
              </button>
              <Link href="/programmes/compare" className="text-sm font-semibold text-ink underline underline-offset-4">Compare programmes</Link>
            </div>
          </form>

          <div className="lg:col-span-5">
            <ProofRotator points={proofPoints} />
          </div>

          <nav aria-labelledby="iam" className="border-t border-slate-100 p-7 sm:p-9 lg:col-span-3 lg:border-l lg:border-t-0">
            <h2 id="iam" className="text-2xl sm:text-3xl">I am a…</h2>
            <ul className="mt-5 divide-y divide-slate-100">
              {audiences.map((a) => (
                <li key={a.href}>
                  <Link href={a.href} className="group flex items-center justify-between gap-3 py-3 font-semibold text-primary-700 underline-offset-4 hover:underline">
                    {a.label}
                    <ArrowRight className="size-4 shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-primary-600" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}
