"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/** Phone-only bar that keeps "Apply" and "Call" one tap away once the visitor starts scrolling. */
export function MobileApplyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 print:hidden border-t border-slate-200 bg-white/95 p-3 backdrop-blur transition-transform duration-300 lg:hidden",
        "pb-[max(0.75rem,env(safe-area-inset-bottom))]",
        visible ? "translate-y-0" : "translate-y-full",
      )}
      inert={!visible}
    >
      <div className="flex gap-2">
        <a href={site.contact.phoneHref} className="flex h-12 items-center justify-center gap-2 rounded-full border border-slate-300 px-5 font-semibold text-ink" aria-label={`Call admissions on ${site.contact.phone}`}>
          <Phone className="size-4" aria-hidden /> Call
        </a>
        <a href={site.applyUrl} target="_blank" rel="noopener noreferrer" className="flex h-12 flex-1 items-center justify-center rounded-full bg-primary-600 font-semibold text-white">
          Apply for {site.currentIntake.name.replace(" Intake", "")}
        </a>
      </div>
    </div>
  );
}
