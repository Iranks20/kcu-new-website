import { PageHero, Section } from "@/components/ui";
import { VacancyList } from "@/components/vacancy-list";
import { vacancies } from "@/content/careers";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Careers at KCU",
  description: "Academic and administrative vacancies at King Ceasor University.",
  path: "/careers",
});

export default function CareersPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "About", href: "/about" }, { label: "Careers" }]}
        eyebrow="Work with us"
        title="Careers at KCU"
        intro="Join a growing, chartered university and help shape the next generation of professionals and leaders."
        image="/images/kcu-2026/library-collaboration-portrait.webp"
      />
      <Section>
        <VacancyList vacancies={vacancies} />
      </Section>
    </>
  );
}
