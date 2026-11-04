"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import type { SearchItem } from "@/content/search";

const ignore = new Set(["the", "and", "kcu", "king", "ceasor", "university", "with", "for", "of", "in", "at"]);

/** On the 404 page, suggests the pages whose titles best match the words in the broken address. */
export function PageSuggestions() {
  const pathname = usePathname();
  const [hits, setHits] = useState<SearchItem[]>([]);

  useEffect(() => {
    const words = decodeURIComponent(pathname).toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length > 2 && !ignore.has(w));
    if (!words.length) return;
    let cancelled = false;
    fetch("/search-index.json")
      .then((r) => r.json())
      .then((index: SearchItem[]) => {
        if (cancelled) return;
        const scored = index
          .map((item) => {
            const hay = `${item.title} ${item.href}`.toLowerCase();
            return { item, score: words.filter((w) => hay.includes(w)).length };
          })
          .filter((r) => r.score >= Math.min(2, words.length))
          .sort((a, b) => b.score - a.score)
          .slice(0, 4)
          .map((r) => r.item);
        setHits(scored);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  if (!hits.length) return null;
  return (
    <div className="mt-10 w-full max-w-xl text-left">
      <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">Were you looking for</p>
      <ul className="mt-3 divide-y divide-slate-100 rounded-2xl bg-white shadow-card ring-1 ring-slate-100">
        {hits.map((h) => (
          <li key={h.href}>
            <Link href={h.href} className="group flex items-center justify-between gap-4 px-5 py-4 hover:bg-surface">
              <span>
                <span className="block font-semibold text-ink">{h.title.replace(/⁠/g, "")}</span>
                <span className="block text-sm text-slate-500">{h.kind} · {h.meta}</span>
              </span>
              <ArrowRight className="size-4 shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-ink" aria-hidden />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
