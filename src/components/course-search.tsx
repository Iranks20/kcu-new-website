"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";

const popular = ["Medicine", "Nursing", "Law", "Business", "Cyber security", "Petroleum"];

/** Home page shortcut into the programme finder. */
export function CourseSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  return (
    <div>
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          router.push(query.trim() ? `/programmes?q=${encodeURIComponent(query.trim())}` : "/programmes");
        }}
        className="flex flex-col gap-3 sm:flex-row"
      >
        <label className="relative flex-1">
          <span className="sr-only">What would you like to study?</span>
          <Search className="pointer-events-none absolute left-5 top-1/2 size-5 -translate-y-1/2 text-slate-400" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What would you like to study?"
            className="h-14 w-full rounded-full border border-slate-300 bg-white pl-13 pr-5 text-base text-ink outline-none transition placeholder:text-slate-400 focus:border-primary-600 focus:ring-4 focus:ring-primary-600/15"
          />
        </label>
        <button type="submit" className="h-14 shrink-0 rounded-full bg-primary-600 px-8 font-semibold text-white transition hover:bg-primary-700">
          Search programmes
        </button>
      </form>
      <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
        <span className="mr-1 text-slate-500">Popular:</span>
        {popular.map((p) => (
          <Link
            key={p}
            href={`/programmes?q=${encodeURIComponent(p)}`}
            className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-slate-700 transition hover:border-ink hover:text-ink"
          >
            {p}
          </Link>
        ))}
      </div>
    </div>
  );
}
