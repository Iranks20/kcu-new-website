"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { BrandIcon, type BrandIconName } from "./social-icons";

/** Share links for WhatsApp (how most of our audience shares), Facebook, X and LinkedIn, plus copy link. */
export function ShareButtons({ path, title, className, dark = false }: { path: string; title: string; className?: string; dark?: boolean }) {
  const [copied, setCopied] = useState(false);
  const url = `${site.url}${path}`;
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title.replace(/⁠/g, ""));
  const targets: { name: BrandIconName; label: string; href: string }[] = [
    { name: "whatsapp", label: "WhatsApp", href: `https://wa.me/?text=${t}%20${u}` },
    { name: "facebook", label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    { name: "x", label: "X", href: `https://x.com/intent/post?url=${u}&text=${t}` },
    { name: "linkedin", label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
  ];
  const button = cn(
    "grid size-10 place-items-center rounded-full transition",
    dark ? "bg-white/10 text-white hover:bg-white hover:text-ink" : "bg-surface text-slate-600 ring-1 ring-slate-200 hover:bg-primary-600 hover:text-white hover:ring-primary-600",
  );

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <span className={cn("mr-1 text-sm font-semibold", dark ? "text-white/80" : "text-slate-600")}>Share</span>
      {targets.map((s) => (
        <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`Share on ${s.label}`} className={button}>
          <BrandIcon name={s.name} className="size-4" />
        </a>
      ))}
      <button
        type="button"
        className={button}
        aria-label={copied ? "Link copied" : "Copy link"}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          } catch {}
        }}
      >
        {copied ? <Check className="size-4" aria-hidden /> : <Link2 className="size-4" aria-hidden />}
      </button>
      <span className="sr-only" aria-live="polite">{copied ? "Link copied" : ""}</span>
    </div>
  );
}
