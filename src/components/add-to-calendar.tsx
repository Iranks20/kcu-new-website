"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarPlus, ChevronDown, Download } from "lucide-react";
import { downloadIcs, googleCalendarUrl, type CalendarEntry } from "@/lib/calendar";
import { cn } from "@/lib/utils";

const fileName = (title: string) => `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 60)}.ics`;

/** "Add to calendar" menu: Google Calendar, or an .ics file for Apple, Outlook and phone calendars. */
export function AddToCalendar({ entry, className, variant = "outline", compact = false }: { entry: CalendarEntry; className?: string; variant?: "outline" | "light"; compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const item = "flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-ink hover:bg-surface";

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={compact ? `Add ${entry.title} to calendar` : undefined}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition",
          compact ? "size-9" : "h-11 w-full px-5",
          variant === "outline" ? "border border-slate-300 bg-white text-ink hover:border-ink" : "border border-white/40 text-white hover:bg-white/10",
        )}
      >
        <CalendarPlus className="size-4" aria-hidden />
        {!compact && (
          <>
            Add to calendar
            <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} aria-hidden />
          </>
        )}
      </button>
      {open && (
        <div className={cn("absolute top-full z-20 mt-2 w-64 rounded-xl bg-white p-1.5 shadow-lift ring-1 ring-slate-200", compact ? "right-0" : "inset-x-0 w-auto")}>
          <a href={googleCalendarUrl(entry)} target="_blank" rel="noopener noreferrer" className={item} onClick={() => setOpen(false)}>
            <CalendarPlus className="size-4 text-slate-500" aria-hidden /> Google Calendar
          </a>
          <button
            type="button"
            className={item}
            onClick={() => {
              downloadIcs(fileName(entry.title), [entry]);
              setOpen(false);
            }}
          >
            <Download className="size-4 text-slate-500" aria-hidden /> Apple, Outlook or phone (.ics)
          </button>
        </div>
      )}
    </div>
  );
}

/** One-click download of many dates, e.g. the whole academic calendar. */
export function DownloadCalendar({ entries, filename, label = "Download calendar (.ics)" }: { entries: CalendarEntry[]; filename: string; label?: string }) {
  return (
    <button
      type="button"
      onClick={() => downloadIcs(filename, entries)}
      className="inline-flex h-11 items-center gap-2 rounded-full bg-primary-600 px-5 text-sm font-semibold text-white transition hover:bg-primary-700"
    >
      <Download className="size-4" aria-hidden /> {label}
    </button>
  );
}
