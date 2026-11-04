import type { Metadata } from "next";
import { asset } from "./utils";

const SUFFIX = " | King Ceasor University";
const MAX = 62;
/** Page-level openGraph replaces the layout's, so every page needs its own share image. */
const DEFAULT_IMAGE = "/images/kcu-2026/graduates-best-of-best.webp";

/** Keeps titles short enough for search results: long ones drop the full name and end with "| KCU". */
export function seoTitle(title: string): Metadata["title"] {
  const plain = title.replace(/\u2060/g, "");
  if (plain.length + SUFFIX.length <= MAX) return plain;
  const room = MAX - " | KCU".length;
  if (plain.length <= room) return { absolute: `${plain} | KCU` };
  const cut = plain.slice(0, room - 1);
  return { absolute: `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,:;–-]$/, "")}… | KCU` };
}

/** Metadata for a page: short title, description, canonical URL and share image. */
export function pageMeta({ title, description, path, image }: { title: string; description?: string; path: string; image?: string }): Metadata {
  return {
    title: seoTitle(title),
    description,
    alternates: { canonical: path },
    openGraph: { title: title.replace(/\u2060/g, ""), description, url: path, images: [asset(image ?? DEFAULT_IMAGE)] },
  };
}
