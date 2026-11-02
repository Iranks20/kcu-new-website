"use client";

import { useState } from "react";
import type { NewsArticle } from "@/content/news";
import { NewsCard } from "./cards";
import { cn } from "@/lib/utils";

const PAGE = 12;

export function NewsList({ articles }: { articles: NewsArticle[] }) {
  const categories = ["All", ...Array.from(new Set(articles.map((a) => a.category))).sort()];
  const [category, setCategory] = useState("All");
  const [shown, setShown] = useState(PAGE);
  const filtered = category === "All" ? articles : articles.filter((a) => a.category === category);

  return (
    <div>
      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1" role="group" aria-label="Filter by category">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={category === c}
            onClick={() => {
              setCategory(c);
              setShown(PAGE);
            }}
            className={cn(
              "h-10 shrink-0 rounded-full px-5 text-sm font-medium transition",
              category === c ? "bg-primary-600 text-white" : "bg-surface text-slate-600 hover:bg-slate-100 hover:text-primary-700",
            )}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.slice(0, shown).map((a) => (
          <NewsCard key={a.slug} article={a} />
        ))}
      </div>
      {shown < filtered.length && (
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => setShown((n) => n + PAGE)}
            className="h-12 rounded-full border border-slate-300 px-8 font-semibold text-ink transition hover:border-primary-600 hover:text-primary-700"
          >
            Load more stories ({filtered.length - shown} more)
          </button>
        </div>
      )}
    </div>
  );
}
