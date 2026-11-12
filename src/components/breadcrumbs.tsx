import { site } from "@/content/site";
import { JsonLd } from "./json-ld";

export type Crumb = { label: string; href?: string };

/**
 * Page trail for search engines only: outputs BreadcrumbList structured data, so Google shows
 * "kcu.ac.ug › Programmes › …" in results. Nothing is rendered on the page itself (the visible trail was removed
 * for a cleaner design). `dark` and `className` are kept so existing call sites need no changes.
 */
export function Breadcrumbs({ items }: { items: Crumb[]; dark?: boolean; className?: string }) {
  const trail: Crumb[] = [{ label: "Home", href: "/" }, ...items];
  return (
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
  );
}
