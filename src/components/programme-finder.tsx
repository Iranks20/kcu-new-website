"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { levelLabels, programmes, type Level } from "@/content/programmes";
import { schools } from "@/content/schools";
import { ProgrammeCard } from "./cards";
import { cn } from "@/lib/utils";

const levels: { value: Level | "all"; label: string }[] = [
  { value: "all", label: "All levels" },
  { value: "degree", label: "Degrees" },
  { value: "diploma", label: "Diplomas" },
  { value: "hec", label: "Bridging" },
  { value: "certificate", label: "Short courses" },
];

export function ProgrammeFinder() {
  // Remount when the URL changes (e.g. picking "Diplomas" from the menu while already on this page).
  const params = useSearchParams();
  const initialLevel = params.get("level") ?? "all";
  return (
    <Finder
      key={params.toString()}
      initialLevel={levels.some((l) => l.value === initialLevel) ? (initialLevel as Level | "all") : "all"}
      initialSchool={params.get("school") ?? "all"}
      initialQuery={params.get("q") ?? ""}
    />
  );
}

function Finder({ initialLevel, initialSchool, initialQuery }: { initialLevel: Level | "all"; initialSchool: string; initialQuery: string }) {
  const [level, setLevel] = useState(initialLevel);
  const [school, setSchool] = useState(initialSchool);
  const [query, setQuery] = useState(initialQuery);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return programmes.filter(
      (p) =>
        (level === "all" || p.level === level) &&
        (school === "all" || p.school === school) &&
        (!q || p.title.toLowerCase().includes(q) || p.overview.toLowerCase().includes(q)),
    );
  }, [level, school, query]);

  const filtered = level !== "all" || school !== "all" || query !== "";

  return (
    <div>
      <div className="sticky top-[4.5rem] z-30 -mx-4 border-b border-slate-200 bg-white/95 px-4 py-4 backdrop-blur sm:mx-0 sm:rounded-2xl sm:border sm:p-5 sm:shadow-card xl:top-24">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <label className="relative flex-1">
            <span className="sr-only">Search programmes</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search e.g. nursing, law, cyber security…"
              className="h-12 w-full rounded-full border border-slate-200 bg-surface pl-12 pr-4 text-base outline-none transition placeholder:text-slate-400 focus:border-primary-600 focus:bg-white focus:ring-4 focus:ring-primary-600/15"
            />
          </label>
          <label className="relative lg:w-72">
            <span className="sr-only">Filter by school</span>
            <SlidersHorizontal className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" aria-hidden />
            <select
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              className="h-12 w-full appearance-none rounded-full border border-slate-200 bg-surface pl-11 pr-4 text-[0.9375rem] outline-none focus:border-primary-600 focus:ring-4 focus:ring-primary-600/15"
            >
              <option value="all">All schools</option>
              {schools.map((s) => (
                <option key={s.slug} value={s.slug}>{s.shortName}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="-mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-1" role="group" aria-label="Filter by level">
          {levels.map((l) => (
            <button
              key={l.value}
              type="button"
              onClick={() => setLevel(l.value)}
              aria-pressed={level === l.value}
              className={cn(
                "h-9 shrink-0 rounded-full px-4 text-sm font-medium transition",
                level === l.value ? "bg-primary-600 text-white" : "bg-surface text-slate-600 hover:bg-slate-100 hover:text-ink",
              )}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <p className="text-slate-600" aria-live="polite">
          Showing <strong className="text-ink">{results.length}</strong> of {programmes.length} programmes
          {level !== "all" && <> · {levelLabels[level]}</>}
        </p>
        {filtered && (
          <button
            type="button"
            onClick={() => {
              setLevel("all");
              setSchool("all");
              setQuery("");
            }}
            className="flex items-center gap-1 text-sm font-semibold text-ink hover:text-slate-700"
          >
            <X className="size-4" aria-hidden /> Clear filters
          </button>
        )}
      </div>

      {results.length > 0 ? (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((p) => (
            <ProgrammeCard key={p.slug} programme={p} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl bg-surface px-6 py-16 text-center">
          <p className="heading text-xl text-ink">No programmes match your search</p>
          <p className="mt-2 text-slate-600">Try a different keyword or clear the filters.</p>
        </div>
      )}
    </div>
  );
}
