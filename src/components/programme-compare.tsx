"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Plus, X } from "lucide-react";
import { entryRequirements, levelLabels, programmes, type Programme } from "@/content/programmes";
import { schools } from "@/content/schools";
import { site } from "@/content/site";
import { FeeAmount, CurrencyToggle } from "./fee-amount";
import { cn } from "@/lib/utils";

const MAX = 3;

const rows: { label: string; render: (p: Programme) => React.ReactNode }[] = [
  { label: "Level", render: (p) => levelLabels[p.level] },
  { label: "School", render: (p) => schools.find((s) => s.slug === p.school)?.name },
  { label: "Duration", render: (p) => p.duration },
  { label: "Fees, East Africa", render: (p) => <span className="font-semibold text-ink"><FeeAmount fee={p.fees.local} /> <span className="font-normal text-slate-500">/ {p.fees.per}</span></span> },
  { label: "Fees, international", render: (p) => <>{p.fees.international} <span className="text-slate-500">/ {p.fees.per}</span></> },
  { label: "Study modes", render: (p) => p.modes.join(", ") },
  { label: "Intakes", render: (p) => p.intakes.join(", ") },
  {
    label: "Entry requirements",
    render: (p) => (
      <ul className="list-disc space-y-1.5 pl-4 marker:text-slate-300">
        {(p.subjects ?? entryRequirements[p.level].slice(0, 2)).map((r) => <li key={r}>{r}</li>)}
      </ul>
    ),
  },
  {
    label: "Careers",
    render: (p) => (
      <ul className="list-disc space-y-1 pl-4 marker:text-slate-300">
        {p.careers.map((c) => <li key={c}>{c}</li>)}
      </ul>
    ),
  },
  { label: "Professional registration", render: (p) => p.registration ?? <span className="text-slate-400">Not applicable</span> },
];

const suggestions = [
  { label: "Medicine · Nursing · Clinical Medicine", slugs: ["bachelor-of-medicine-and-bachelor-of-surgery", "bachelor-of-nursing-science-direct", "diploma-in-clinical-medicine-and-community-health"] },
  { label: "Law · Business · Economics", slugs: ["bachelor-of-laws", "bachelor-of-business-administration", "bachelor-of-applied-economics"] },
  { label: "Forensics · Petroleum Geoscience · Oil & Gas", slugs: ["bachelor-of-computer-forensics-and-criminal-investigations", "bachelor-of-science-in-petroleum-geoscience", "bachelor-of-oil-and-gas-management"] },
];

/** Side-by-side comparison of up to three programmes. The selection lives in the URL so it can be shared. */
export function ProgrammeCompare() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const selected = (params.get("p") ?? "")
    .split(",")
    .map((slug) => programmes.find((p) => p.slug === slug))
    .filter((p): p is Programme => Boolean(p))
    .slice(0, MAX);

  const update = (slugs: string[]) => {
    const q = slugs.filter(Boolean).join(",");
    router.replace(q ? `${pathname}?p=${q}` : pathname, { scroll: false });
  };

  const slots = [...selected, ...(selected.length < MAX ? [null] : [])];

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <p className="text-slate-600">Choose up to three programmes. Share the link to compare with family or friends.</p>
        <CurrencyToggle />
      </div>
      {selected.length === 0 && (
        <div className="mb-8 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-sm font-semibold text-slate-600">Popular comparisons:</span>
          {suggestions.map((s) => (
            <button key={s.label} type="button" onClick={() => update(s.slugs)} className="rounded-full bg-surface px-4 py-2 text-sm font-medium text-ink ring-1 ring-slate-200 transition hover:bg-primary-600 hover:text-white hover:ring-primary-600">
              {s.label}
            </button>
          ))}
        </div>
      )}
      <div className="-mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
        <table className="w-full min-w-[720px] table-fixed border-separate border-spacing-0 text-left text-[0.9375rem]">
          <colgroup>
            <col className="w-44" />
            {slots.map((_, i) => <col key={i} />)}
          </colgroup>
          <thead>
            <tr>
              <th className="sticky left-0 z-10 bg-white" aria-label="Detail" />
              {slots.map((p, i) => (
                <th key={p?.slug ?? `empty-${i}`} scope="col" className="h-px px-2 pb-4 align-top font-normal">
                  {p ? (
                    <div className="relative flex h-full flex-col rounded-2xl border border-slate-200 border-t-4 border-t-primary-600 bg-white p-5 shadow-card">
                      <button
                        type="button"
                        onClick={() => update(selected.filter((s) => s.slug !== p.slug).map((s) => s.slug))}
                        className="absolute right-3 top-3 grid size-7 place-items-center rounded-full text-slate-600 hover:bg-brand-100 hover:text-ink"
                        aria-label={`Remove ${p.title}`}
                      >
                        <X className="size-4" aria-hidden />
                      </button>
                      <p className="eyebrow">{levelLabels[p.level]}</p>
                      <p className="heading mt-2 pr-6 text-lg leading-snug text-ink">{p.title}</p>
                      <div className="mt-auto flex flex-wrap gap-2 pt-4">
                        <Link href={`/programmes/${p.slug}`} className="inline-flex h-9 items-center rounded-full bg-primary-600 px-4 text-sm font-semibold text-ink hover:bg-primary-700">Details</Link>
                        <a href={site.applyUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-9 items-center rounded-full border border-slate-300 px-4 text-sm font-semibold text-ink hover:bg-brand-100">Apply</a>
                      </div>
                    </div>
                  ) : (
                    <label className="flex h-full min-h-40 flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-slate-200 p-5 text-center">
                      <span className="grid size-10 place-items-center rounded-full bg-surface text-slate-500"><Plus className="size-5" aria-hidden /></span>
                      <span className="text-sm font-semibold text-ink">Add a programme</span>
                      <select
                        value=""
                        onChange={(e) => update([...selected.map((s) => s.slug), e.target.value])}
                        className="h-10 w-full rounded-full border border-slate-200 bg-white px-3 text-sm outline-none focus:border-primary-600 focus:ring-4 focus:ring-primary-600/15"
                      >
                        <option value="" disabled>Choose…</option>
                        {schools.map((s) => (
                          <optgroup key={s.slug} label={s.shortName}>
                            {programmes
                              .filter((p) => p.school === s.slug && !selected.some((x) => x.slug === p.slug))
                              .map((p) => <option key={p.slug} value={p.slug}>{p.title}</option>)}
                          </optgroup>
                        ))}
                      </select>
                    </label>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={row.label}>
                <th scope="row" className={cn("sticky left-0 z-10 px-4 py-4 align-top text-sm font-semibold text-slate-500", ri % 2 ? "bg-white" : "bg-surface", "rounded-l-xl")}>{row.label}</th>
                {slots.map((p, i) => (
                  <td key={p?.slug ?? `e-${i}`} className={cn("px-4 py-4 align-top text-slate-700", ri % 2 ? "bg-white" : "bg-surface", i === slots.length - 1 && "rounded-r-xl")}>
                    {p ? row.render(p) : <span className="text-slate-300">—</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
