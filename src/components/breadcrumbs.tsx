import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { JsonLd } from "./json-ld";

export type Crumb = { label: string; href?: string };

/** "Home › Section › Page" trail, plus BreadcrumbList data so search results show the same path. */
export function Breadcrumbs({ items, dark = false, className }: { items: Crumb[]; dark?: boolean; className?: string }) {
  const trail: Crumb[] = [{ label: "Home", href: "/" }, ...items];
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: trail.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.label.replace(/⁠/g, ""),
            ...(c.href ? { item: `${site.url}${c.href === "/" ? "" : c.href}` } : {}),
          })),
        }}
      />
      <nav aria-label="Breadcrumb" className={cn("mb-5 text-sm", className)}>
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
          {trail.map((c, i) => {
            const last = i === trail.length - 1;
            return (
              <li key={`${c.label}-${i}`} className="flex min-w-0 items-center gap-1.5">
                {c.href && !last ? (
                  <Link href={c.href} className={cn("font-medium underline-offset-4 hover:underline", dark ? "text-white/75 hover:text-white" : "text-slate-500 hover:text-ink")}>
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current={last ? "page" : undefined} className={cn("line-clamp-1", dark ? "text-white" : "text-ink")}>
                    {c.label}
                  </span>
                )}
                {!last && <ChevronRight className={cn("size-3.5 shrink-0", dark ? "text-white/40" : "text-slate-300")} aria-hidden />}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
