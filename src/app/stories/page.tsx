import type { Metadata } from "next";
import { CtaBand, PageHero, Section } from "@/components/ui";
import { StoryCard } from "@/components/cards";
import { stories } from "@/content/stories";

export const metadata: Metadata = {
  alternates: { canonical: "/stories" },
  title: "Student Stories",
  description: "What it is really like to study at King Ceasor University, from the people living it: medicine, law, nursing, computing and more.",
};

export default function StoriesPage() {
  return (
    <>
      <PageHero crumbs={[{ label: "Campus life", href: "/campus-life" }, { label: "Student stories" }]}
        eyebrow="Student stories"
        title="Life at KCU, in our students' words"
        intro="A day on the wards, a night before a moot, a first semester far from home. Here is what studying at KCU is really like."
        image="/images/kcu-2026/library-collaboration.webp"
      />
      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stories.map((s) => (
            <StoryCard key={s.slug} story={s} />
          ))}
        </div>
      </Section>
      <CtaBand title="Write your own KCU story" />
    </>
  );
}
