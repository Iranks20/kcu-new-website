import type { Metadata } from "next";
import { Suspense } from "react";
import { CtaBand, PageHero, Section } from "@/components/ui";
import { ProgrammeFinder } from "@/components/programme-finder";
import { programmes } from "@/content/programmes";

export const metadata: Metadata = {
  alternates: { canonical: "/programmes" },
  title: "Find a Programme",
  description: "Search and compare degrees, diplomas and short courses at King Ceasor University.",
};

export default function ProgrammesPage() {
  return (
    <>
      <PageHero crumbs={[{ label: "Programmes" }]}
        eyebrow="Study at KCU"
        title="Find your programme"
        intro={`Explore ${programmes.length} degrees, diplomas and professional courses across our three schools. Compare duration, fees and entry requirements in one place.`}
        image="/images/kcu-2026/library-group-study.webp"
      />
      <Section className="!pt-10">
        <Suspense>
          <ProgrammeFinder />
        </Suspense>
      </Section>
      <CtaBand title="Not sure which programme fits?" text="Our admissions team can help you choose based on your grades, interests and career goals." />
    </>
  );
}
