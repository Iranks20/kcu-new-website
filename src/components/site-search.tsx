"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, BookOpen, Building2, CalendarDays, FileText, Newspaper, Search, User, X } from "lucide-react";
import type { SearchItem, SearchKind } from "@/content/search";
import { cn } from "@/lib/utils";

const kindIcon: Record<SearchKind, typeof Search> = {
  Programme: BookOpen,
  School: Building2,
  Page: FileText,
  News: Newspaper,
  Event: CalendarDays,
  Person: User,
};

// Shown before the visitor types anything.
const suggestions = [
  { title: "Bachelor of Medicine and Bachelor of Surgery", href: "/programmes/bachelor-of-medicine-and-bachelor-of-surgery" },
  { title: "Tuition fees", href: "/admissions#fees" },
  { title: "How to apply", href: "/admissions#apply" },
  { title: "Visit campus", href: "/visit" },
  { title: "International students", href: "/international" },
];

const normalise = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ⁠]/g, "");

function rank(items: SearchItem[], query: string) {
  const terms = normalise(query).split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  const scored: { item: SearchItem; score: number }[] = [];
  for (const item of items) {
    const title = normalise(item.title);
    const haystack = `${title} ${normalise(item.meta)} ${normalise(item.keywords ?? "")}`;
    if (!terms.every((t) => haystack.includes(t))) continue;
    let score = 0;
    for (const t of terms) {
      if (title.startsWith(t)) score += 6;
      else if (new RegExp(`\\b${t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`).test(title)) score += 4;
      else if (title.includes(t)) score += 2;
    }
    // Programmes and pages answer most questions; news is the long tail.
    if (item.kind === "Programme" || item.kind === "Page" || item.kind === "School") score += 2;
    scored.push({ item, score });
  }
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 12)
    .map((s) => s.item);
}

/** Site-wide search: a header button and a ⌘K / Ctrl+K / "/" dialog. The index loads on first open. */
export function SiteSearch({ className }: { className?: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState<SearchItem[] | null>(null);
  const [cursor, setCursor] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  const results = useMemo(() => (index ? rank(index, query) : []), [index, query]);
  const list = query.trim() ? results : suggestions.map((s) => ({ kind: "Page" as const, meta: "", ...s }));

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    trigger.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = e.target instanceof HTMLElement && (e.target.isContentEditable || /INPUT|TEXTAREA|SELECT/.test(e.target.tagName));
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    input.current?.focus();
    if (!index) {
      fetch("/search-index.json")
        .then((r) => r.json())
        .then(setIndex)
        .catch(() => setIndex([]));
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, index]);

  const go = (href: string) => {
    close();
    router.push(href);
  };

  return (
    <>
      <button
        ref={trigger}
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "grid size-11 place-items-center rounded-full border border-slate-200 text-slate-600 transition hover:border-slate-300 hover:text-ink",
          className,
        )}
        aria-label="Search the site (Ctrl K)"
        title="Search (Ctrl K)"
        aria-keyshortcuts="Control+K Meta+K /"
      >
        <Search className="size-[1.125rem]" aria-hidden />
      </button>

      {open && (
        <div className="fixed inset-0 z-[90] flex items-start justify-center bg-ink/50 p-4 pt-[10vh] backdrop-blur-sm" onMouseDown={(e) => e.target === e.currentTarget && close()}>
          <div role="dialog" aria-modal="true" aria-label="Search King Ceasor University" className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-lift animate-fade-up">
            <div className="flex items-center gap-3 border-b border-slate-200 px-5">
              <Search className="size-5 shrink-0 text-slate-400" aria-hidden />
              <input
                ref={input}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setCursor(0);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") close();
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setCursor((c) => Math.min(c + 1, list.length - 1));
                  }
                  if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setCursor((c) => Math.max(c - 1, 0));
                  }
                  if (e.key === "Enter" && list[cursor]) go(list[cursor].href);
                }}
                placeholder="Search programmes, fees, news, people…"
                className="h-16 w-full bg-transparent text-lg text-ink outline-none placeholder:text-slate-400"
                role="combobox"
                aria-expanded="true"
                aria-controls="search-results"
                aria-activedescendant={list[cursor] ? `search-${cursor}` : undefined}
              />
              <button type="button" onClick={close} className="grid size-9 shrink-0 place-items-center rounded-full text-slate-500 hover:bg-slate-100" aria-label="Close search">
                <X className="size-5" aria-hidden />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2">
              {!query.trim() && <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Popular</p>}
              {query.trim() && index && results.length === 0 && (
                <div className="px-4 py-10 text-center">
                  <p className="font-semibold text-ink">No results for “{query}”</p>
                  <p className="mt-1 text-sm text-slate-500">
                    Try a programme name such as “nursing”, or <Link href="/contact" onClick={close} className="font-semibold text-ink underline">ask our team</Link>.
                  </p>
                </div>
              )}
              {query.trim() && !index && <p className="px-4 py-10 text-center text-sm text-slate-500">Loading…</p>}
              <ul id="search-results" role="listbox" aria-label="Results">
                {list.map((item, i) => {
                  const Icon = query.trim() ? kindIcon[item.kind] : ArrowRight;
                  return (
                    <li key={`${item.kind}-${item.href}-${item.title}`} id={`search-${i}`} role="option" aria-selected={i === cursor}>
                      <Link
                        href={item.href}
                        onClick={close}
                        onMouseMove={() => setCursor(i)}
                        className={cn("flex items-center gap-4 rounded-xl px-3 py-3", i === cursor ? "bg-primary-50" : "hover:bg-slate-50")}
                      >
                        <span className={cn("grid size-10 shrink-0 place-items-center rounded-lg", i === cursor ? "bg-primary-600 text-white" : "bg-slate-100 text-slate-500")}>
                          <Icon className="size-4.5" aria-hidden />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-medium text-ink">{item.title}</span>
                          {item.meta && <span className="block truncate text-sm text-slate-500">{item.meta}</span>}
                        </span>
                        {query.trim() && <span className="hidden shrink-0 text-xs font-medium text-slate-400 sm:block">{item.kind}</span>}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <p className="hidden border-t border-slate-100 px-5 py-3 text-xs text-slate-400 sm:block">
              <kbd className="font-sans font-semibold">↑</kbd> <kbd className="font-sans font-semibold">↓</kbd> to move · <kbd className="font-sans font-semibold">Enter</kbd> to open · <kbd className="font-sans font-semibold">Esc</kbd> to close
            </p>
          </div>
        </div>
      )}
    </>
  );
}
