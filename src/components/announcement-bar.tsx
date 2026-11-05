"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { ArrowRight, X } from "lucide-react";
import { campaign } from "@/content/intake";
import { formatDate } from "@/lib/utils";

const KEY = `kcu-announcement-${campaign.closes}`;
const listeners = new Set<() => void>();
const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};
const isDismissed = () => {
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
};

// BUILD_TIME is inlined by next.config.ts, so the server HTML and first client render agree.
const buildTime = Number(process.env.BUILD_TIME) || 0;
let clientNow: number | undefined;
const getNow = () => (clientNow ??= Date.now());
const noop = () => () => {};

/** A slim, dismissible campaign bar above the header, shown until applications close. */
export function AnnouncementBar() {
  const dismissed = useSyncExternalStore(subscribe, isDismissed, () => false);
  const now = useSyncExternalStore(noop, getNow, () => buildTime);
  if (dismissed || now > Date.parse(`${campaign.closes}T23:59:59+03:00`)) return null;

  const dismiss = () => {
    try {
      localStorage.setItem(KEY, "1");
    } catch {}
    listeners.forEach((l) => l());
  };

  return (
    <div className="relative bg-primary-600 text-white print:hidden">
      <div className="container-x flex min-h-10 items-center justify-center py-2 pr-10 text-center text-sm">
        <Link href="/intake" className="group inline-flex flex-wrap items-center justify-center gap-x-2">
          <span className="font-semibold">{campaign.name}: applications open</span>
          <span className="text-white/85">until {formatDate(campaign.closes)}</span>
          <span className="inline-flex items-center gap-1 font-semibold text-gold-300 underline-offset-4 group-hover:underline">
            See programmes <ArrowRight className="size-3.5" aria-hidden />
          </span>
        </Link>
      </div>
      <button type="button" onClick={dismiss} className="absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-white/75 hover:bg-white/10 hover:text-white" aria-label="Dismiss announcement">
        <X className="size-4" aria-hidden />
      </button>
    </div>
  );
}
