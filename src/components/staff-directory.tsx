"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { StaffProfile } from "@/content/staff";
import { asset, cn, initials } from "@/lib/utils";

export function StaffDirectory({ entries }: { entries: StaffProfile[] }) {
  const [query, setQuery] = useState("");
  const [unit, setUnit] = useState("All");
  const units = useMemo(() => ["All", ...Array.from(new Set(entries.map((e) => e.unit)))], [entries]);

  const shown = entries.filter((e) => {
    if (unit !== "All" && e.unit !== unit) return false;
    const q = query.trim().toLowerCase();
    return !q || `${e.name} ${e.role} ${e.department ?? ""} ${e.unit}`.toLowerCase().includes(q);
  });

  return (
    <div>
      <div className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-card ring-1 ring-slate-100 sm:p-5">
        <label htmlFor="staff-search" className="sr-only">Search staff</label>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" aria-hidden />
          <input
            id="staff-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, role or department"
            className="h-12 w-full rounded-xl bg-surface pl-12 pr-4 outline-none transition focus:bg-white focus:ring-4 focus:ring-primary-600/15"
          />
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by unit">
          {units.map((u) => (
            <button
              key={u}
              type="button"
              onClick={() => setUnit(u)}
              aria-pressed={unit === u}
              className={cn("rounded-full px-4 py-2 text-sm font-medium transition", unit === u ? "bg-primary-600 text-white" : "bg-surface text-slate-600 hover:bg-slate-100 hover:text-ink")}
            >
              {u}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm text-slate-500" aria-live="polite">
        Showing <strong className="text-ink">{shown.length}</strong> of {entries.length} people
      </p>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((e) => (
          <li key={e.slug} className="group relative flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-card">
            <div className="relative size-16 shrink-0 overflow-hidden rounded-full bg-primary-50">
              {e.image ? (
                <Image src={asset(e.image)} alt="" fill sizes="64px" className="object-cover object-top" />
              ) : (
                <span className="heading grid h-full place-items-center text-lg text-primary-600">{initials(e.name)}</span>
              )}
            </div>
            <div className="min-w-0">
              <p className="font-semibold leading-snug text-ink"><Link href={`/about/staff/${e.slug}`} className="after:absolute after:inset-0 group-hover:underline group-hover:underline-offset-4">{e.name}</Link></p>
              <p className="text-sm text-slate-600">{e.role}</p>
              <p className="mt-0.5 text-xs font-medium text-slate-400">{e.department ? `${e.department} · ${e.unit}` : e.unit}</p>
            </div>
          </li>
        ))}
      </ul>
      {shown.length === 0 && <p className="mt-10 text-center text-slate-500">No staff match “{query}”.</p>}
    </div>
  );
}
