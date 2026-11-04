"use client";

import Link from "next/link";
import { useEffect } from "react";
import { RotateCcw } from "lucide-react";
import { site } from "@/content/site";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // PLACEHOLDER: report to the monitoring service once the backend is in place.
    console.error(error);
  }, [error]);

  return (
    <section className="container-x flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="eyebrow">Something went wrong</p>
      <h1 className="mt-4 text-3xl sm:text-4xl">This page didn&apos;t load properly</h1>
      <p className="mt-3 max-w-md text-lg text-slate-600">
        Please try again. If it keeps happening, call us on {site.contact.phone} and we&apos;ll help you directly.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button type="button" onClick={reset} className="inline-flex h-11 items-center gap-2 rounded-full bg-primary-600 px-5 text-sm font-semibold text-white hover:bg-primary-700">
          <RotateCcw className="size-4" aria-hidden /> Try again
        </button>
        <Link href="/" className="inline-flex h-11 items-center rounded-full border border-slate-300 px-5 text-sm font-semibold text-ink hover:border-ink">Go home</Link>
      </div>
    </section>
  );
}
