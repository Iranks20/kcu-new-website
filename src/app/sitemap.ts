import type { MetadataRoute } from "next";
import { programmes } from "@/content/programmes";
import { schools } from "@/content/schools";
import { news } from "@/content/news";
import { events } from "@/content/events";
import { stories } from "@/content/stories";
import { site } from "@/content/site";
import { allStaff } from "@/content/staff";

const pages = [
  "",
  "/programmes",
  "/programmes/compare",
  "/admissions",
  "/academic-calendar",
  "/admissions/track",
  "/intake",
  "/request-information",
  "/employers",
  "/about/kcu-2030",
  "/suppliers",
  "/students",
  "/parents",
  "/library",
  "/about/facts",
  "/visit/campus-map",
  "/international",
  "/visit",
  "/visit/virtual-tour",
  "/scholarships",
  "/postgraduate",
  "/stories",
  "/alumni",
  "/about/staff",
  "/schools",
  "/research",
  "/campus-life",
  "/news",
  "/events",
  "/gallery",
  "/about",
  "/about/leadership",
  "/careers",
  "/press",
  "/contact",
  "/privacy",
  "/terms",
  "/accessibility",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${site.url}${path}`;
  return [
    ...pages.map((p) => ({ url: url(p), changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7 })),
    ...programmes.map((p) => ({ url: url(`/programmes/${p.slug}`), changeFrequency: "monthly" as const, priority: 0.8 })),
    ...schools.map((s) => ({ url: url(`/schools/${s.slug}`), changeFrequency: "monthly" as const, priority: 0.7 })),
    ...stories.map((s) => ({ url: url(`/stories/${s.slug}`), changeFrequency: "monthly" as const, priority: 0.6 })),
    ...allStaff().map((s) => ({ url: url(`/about/staff/${s.slug}`), changeFrequency: "monthly" as const, priority: 0.4 })),
    ...events.map((e) => ({ url: url(`/events/${e.slug}`), lastModified: e.date, priority: 0.5 })),
    ...news.map((n) => ({ url: url(`/news/${n.slug}`), lastModified: n.date, priority: 0.5 })),
  ];
}
