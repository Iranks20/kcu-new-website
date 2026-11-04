import { Suspense } from "react";
import { CtaBand, PageHero, Section } from "@/components/ui";
import { ProgrammeCompare } from "@/components/programme-compare";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Compare Programmes",
  description: "Compare KCU programmes side by side: duration, fees, entry requirements, study modes and careers.",
  path: "/programmes/compare",
});

export default function ComparePage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Programmes", href: "/programmes" }, { label: "Compare" }]}
        eyebrow="Study at KCU"
        title="Compare programmes"
        intro="Put up to three programmes side by side to compare fees, duration, entry requirements and where they can take you."
      />
      <Section className="!pt-10">
        <Suspense>
          <ProgrammeCompare />
        </Suspense>
      </Section>
      <CtaBand title="Still deciding?" text="Ask the KCU Assistant, chat with admissions on WhatsApp, or book a campus visit." />
    </>
  );
}
