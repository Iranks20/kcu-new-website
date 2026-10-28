import type { Metadata } from "next";
import { PageHero, Section } from "@/components/ui";
import { GalleryGrid } from "@/components/gallery-grid";
import { gallery } from "@/content/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos from graduation, outreach, sport and student life at King Ceasor University.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Campus life"
        title="Gallery"
        intro="Graduations, outreach, sport and everyday life on Bunga Hill."
        image="/images/kcu-2026/graduates-celebrating.webp"
      />
      <Section>
        <GalleryGrid images={gallery} />
      </Section>
    </>
  );
}
