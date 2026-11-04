"use client";

import { useMemo, useState } from "react";
import { Calculator } from "lucide-react";
import type { Programme } from "@/content/programmes";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

type Option = Pick<Programme, "slug" | "title" | "school" | "duration" | "fees" | "level">;

/** Reads "UGX 2,425,000" or "$3,000" into a currency and an amount. */
function parseFee(fee: string) {
  const amount = Number(fee.replace(/[^0-9.]/g, ""));
  return { currency: fee.includes("UGX") ? "UGX" : "USD", amount };
}

function money(currency: string, amount: number) {
  return currency === "UGX" ? `UGX ${amount.toLocaleString("en-US")}` : `$${amount.toLocaleString("en-US")}`;
}

/** Number of semesters in a duration such as "5 Years" or "1 Year". */
function semesters(duration: string) {
  const years = Number(duration.match(/(\d+(?:\.\d+)?)\s*Year/i)?.[1]);
  return Number.isFinite(years) && years > 0 ? years * 2 : null;
}

export function FeesCalculator({ programmes, schools }: { programmes: Option[]; schools: { slug: string; name: string }[] }) {
  const [slug, setSlug] = useState(programmes[0]?.slug ?? "");
  const [origin, setOrigin] = useState<"local" | "international">("local");
  const programme = programmes.find((p) => p.slug === slug) ?? programmes[0];

  const result = useMemo(() => {
    const { currency, amount } = parseFee(programme.fees[origin]);
    const count = programme.fees.per === "semester" ? semesters(programme.duration) : null;
    return {
      currency,
      perPeriod: amount,
      perYear: count ? amount * 2 : null,
      total: count ? amount * count : null,
      count,
    };
  }, [programme, origin]);

  return (
    <div className="grid overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-slate-200 lg:grid-cols-12">
      <div className="p-6 sm:p-8 lg:col-span-7">
        <div className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-xl bg-primary-50 text-primary-600">
            <Calculator className="size-5" aria-hidden />
          </span>
          <h3 className="text-xl sm:text-2xl">Estimate your tuition</h3>
        </div>

        <label htmlFor="calc-programme" className="mt-6 block text-sm font-medium text-ink">
          Programme
        </label>
        <select
          id="calc-programme"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="mt-1.5 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 outline-none transition focus:border-primary-600 focus:ring-4 focus:ring-primary-600/15"
        >
          {schools.map((s) => (
            <optgroup key={s.slug} label={s.name}>
              {programmes
                .filter((p) => p.school === s.slug)
                .map((p) => (
                  <option key={p.slug} value={p.slug}>
                    {p.title}
                  </option>
                ))}
            </optgroup>
          ))}
        </select>

        <fieldset className="mt-5">
          <legend className="text-sm font-medium text-ink">I am</legend>
          <div className="mt-1.5 grid grid-cols-2 gap-2 rounded-xl bg-surface p-1">
            {(
              [
                ["local", "East African"],
                ["international", "International"],
              ] as const
            ).map(([value, label]) => (
              <label
                key={value}
                className={cn(
                  "cursor-pointer rounded-lg px-4 py-2.5 text-center text-sm font-semibold transition has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-primary-600",
                  origin === value ? "bg-white text-ink shadow-card" : "text-slate-600 hover:text-ink",
                )}
              >
                <input type="radio" name="origin" value={value} checked={origin === value} onChange={() => setOrigin(value)} className="sr-only" />
                {label}
              </label>
            ))}
          </div>
        </fieldset>
        <p className="mt-5 text-sm text-slate-500">
          Tuition only. Functional fees, accommodation and living costs are extra. HESFB loans and instalment plans can spread the cost.
        </p>
      </div>

      <div className="bg-primary-900 p-6 text-white sm:p-8 lg:col-span-5" aria-live="polite">
        <p className="text-sm text-white/70">{programme.title}</p>
        <dl className="mt-6 space-y-5">
          <div>
            <dt className="text-sm text-white/70">Per {programme.fees.per}</dt>
            <dd className="heading mt-1 text-3xl tabular-nums text-white sm:text-4xl">{money(result.currency, result.perPeriod)}</dd>
          </div>
          {result.perYear !== null && (
            <div className="border-t border-white/10 pt-5">
              <dt className="text-sm text-white/70">Per year (2 semesters)</dt>
              <dd className="heading mt-1 text-2xl tabular-nums text-white">{money(result.currency, result.perYear)}</dd>
            </div>
          )}
          {result.total !== null && (
            <div className="border-t border-white/10 pt-5">
              <dt className="text-sm text-white/70">
                Whole programme ({programme.duration.toLowerCase()}, {result.count} semesters)
              </dt>
              <dd className="heading mt-1 text-2xl tabular-nums text-gold-400">{money(result.currency, result.total)}</dd>
            </div>
          )}
        </dl>
        <a
          href={site.applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex h-11 items-center rounded-full bg-white px-5 text-sm font-semibold text-ink transition hover:bg-slate-50"
        >
          Apply for this programme ↗
        </a>
      </div>
    </div>
  );
}
