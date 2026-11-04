// schema.org JSON-LD so search engines and AI assistants understand the University, its courses, events and stories.

import type { Programme } from "@/content/programmes";
import type { UniEvent } from "@/content/events";
import type { NewsArticle } from "@/content/news";
import { site } from "@/content/site";
import { asset } from "./utils";

const abs = (path: string) => new URL(asset(path), site.url).toString();

export const universityRef = { "@type": "CollegeOrUniversity", name: site.name, url: site.url };

export function universityJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "CollegeOrUniversity",
    name: site.name,
    alternateName: site.shortName,
    slogan: site.motto,
    url: site.url,
    logo: abs("/brand/kcu-logo.png"),
    description: site.description,
    email: site.contact.email,
    telephone: site.contact.phone.replace(/\s/g, ""),
    address: {
      "@type": "PostalAddress",
      streetAddress: "Plot 32 Ggaba Road, Bunga Hill",
      addressLocality: "Kampala",
      addressCountry: "UG",
    },
    sameAs: Object.values(site.social),
  };
}

export function courseJsonLd(p: Programme) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: p.title,
    description: p.overview,
    courseCode: p.code,
    url: `${site.url}/programmes/${p.slug}`,
    provider: universityRef,
    timeRequired: p.duration,
  };
}

export function eventJsonLd(e: UniEvent) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: e.title,
    description: e.summary,
    startDate: e.date,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    image: abs(e.image),
    location: { "@type": "Place", name: e.location, address: site.contact.address },
    organizer: universityRef,
  };
}

export function articleJsonLd(a: NewsArticle) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: a.title.replace(/⁠/g, ""),
    description: a.excerpt,
    datePublished: a.date,
    image: a.image ? [abs(a.image)] : undefined,
    publisher: { ...universityRef, logo: { "@type": "ImageObject", url: abs("/brand/kcu-logo.png") } },
    mainEntityOfPage: `${site.url}/news/${a.slug}`,
  };
}
