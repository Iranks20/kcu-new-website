"use client";

import { Download } from "lucide-react";

/** Opens the browser's print dialog, where "Save as PDF" turns the page into a brochure file. */
export function PrintButton({ label = "Download PDF" }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex h-11 items-center gap-2 rounded-full bg-primary-600 px-5 text-sm font-semibold text-white transition hover:bg-primary-700 print:hidden"
    >
      <Download className="size-4" aria-hidden /> {label}
    </button>
  );
}
