import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PrintButton } from "@/components/print-button";
import { entryRequirements, getProgramme, levelLabels, programmes } from "@/content/programmes";
import { getSchool } from "@/content/schools";
import { site } from "@/content/site";
import { accreditations, intakes } from "@/content/university";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return programmes.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/programmes/[slug]/brochure">) {
  const { slug } = await params;
  const p = getProgramme(slug);
  return p ? { ...pageMeta({ title: `${p.title} brochure`, description: p.overview, path: `/programmes/${p.slug}/brochure` }), robots: { index: false } } : {};
}

/** A one-page programme brochure laid out for A4, saved as a PDF from the print dialog. */
export default async function BrochurePage({ params }: PageProps<"/programmes/[slug]/brochure">) {
  const { slug } = await params;
  const p = getProgramme(slug);
  if (!p) notFound();
  const school = getSchool(p.school)!;

  return (
    <div className="bg-surface py-8 print:bg-white print:py-0">
      <div className="container-x mb-6 flex flex-wrap items-center justify-between gap-4 print:hidden">
        <Link href={`/programmes/${p.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-ink underline-offset-4 hover:underline">
          <ArrowLeft className="size-4" aria-hidden /> Back to the programme
        </Link>
        <div className="flex items-center gap-3">
          <p className="hidden text-sm text-slate-500 sm:block">Choose &ldquo;Save as PDF&rdquo; in the print dialog.</p>
          <PrintButton label="Download brochure (PDF)" />
        </div>
      </div>

      <article className="mx-auto max-w-[210mm] bg-white p-8 shadow-card sm:p-12 print:max-w-none print:p-0 print:shadow-none">
        <header className="flex items-center justify-between gap-6 border-b-4 border-primary-600 pb-6">
          <Image src="/brand/kcu-logo.png" alt="King Ceasor University" width={560} height={211} className="h-14 w-auto" />
          <p className="text-right text-sm text-slate-500">{school.name}</p>
        </header>

        <p className="eyebrow mt-8">{levelLabels[p.level]}</p>
        <h1 className="mt-2 text-3xl sm:text-4xl">{p.title}</h1>

        <dl className="mt-6 grid grid-cols-2 gap-4 rounded-xl bg-brand-50 p-5 sm:grid-cols-4">
          {[
            ["Duration", p.duration],
            ["Study modes", p.modes.join(", ")],
            ["Intakes", p.intakes.join(", ")],
            ["Fees (East Africa)", `${p.fees.local} / ${p.fees.per}`],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">{k}</dt>
              <dd className="mt-1 font-semibold text-ink">{v}</dd>
            </div>
          ))}
        </dl>

        <section className="mt-8">
          <h2 className="text-xl">About the programme</h2>
          <p className="mt-2 leading-relaxed text-slate-700">{p.overview}</p>
        </section>

        <div className="mt-8 grid gap-8 sm:grid-cols-2 print:grid-cols-2">
          <section>
            <h2 className="text-xl">Entry requirements</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[0.9375rem] text-slate-700 marker:text-primary-600">
              {(p.subjects ?? []).concat(entryRequirements[p.level]).map((r) => <li key={r}>{r}</li>)}
            </ul>
          </section>
          <section>
            <h2 className="text-xl">Careers</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[0.9375rem] text-slate-700 marker:text-primary-600">
              {p.careers.map((c) => <li key={c}>{c}</li>)}
            </ul>
            {p.registration && <p className="mt-4 text-[0.9375rem] text-slate-700"><strong className="text-ink">After you graduate:</strong> {p.registration}</p>}
          </section>
        </div>

        {p.structure && (
          <section className="mt-8">
            <h2 className="text-xl">What you will study</h2>
            <ol className="mt-3 space-y-2">
              {p.structure.map((s) => (
                <li key={s.stage} className="text-[0.9375rem] text-slate-700"><strong className="text-ink">{s.stage}:</strong> {s.text}</li>
              ))}
            </ol>
          </section>
        )}

        <section className="mt-8 grid gap-6 rounded-xl border border-slate-200 p-5 sm:grid-cols-2 print:grid-cols-2">
          <div>
            <h2 className="text-lg">Fees</h2>
            <p className="mt-1 text-[0.9375rem] text-slate-700">East Africa: <strong>{p.fees.local}</strong> per {p.fees.per}</p>
            <p className="text-[0.9375rem] text-slate-700">International: <strong>{p.fees.international}</strong> per {p.fees.per}</p>
            <p className="mt-1 text-sm text-slate-500">Instalments and HESFB loans available.</p>
          </div>
          <div>
            <h2 className="text-lg">Next intake</h2>
            <p className="mt-1 text-[0.9375rem] text-slate-700">{intakes[0].name}: apply by <strong>{intakes[0].closes}</strong></p>
            <p className="text-[0.9375rem] text-slate-700">Apply online: <strong>{site.applyUrl.replace("https://", "").replace(/\/$/, "")}</strong></p>
          </div>
        </section>

        <footer className="mt-8 border-t border-slate-200 pt-5 text-sm text-slate-600">
          <p className="font-semibold text-ink">{site.name}</p>
          <p>{site.contact.address} · {site.contact.phone}, {site.contact.phone2} · {site.contact.email}, {site.contact.email2} · kcu.ac.ug</p>
          <p className="mt-2 text-xs text-slate-400">{accreditations.map((a) => a.title).join(" · ")}. Fees and details are indicative and confirmed on your admission letter.</p>
        </footer>
      </article>
    </div>
  );
}
