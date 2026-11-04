import { PageHero, Section } from "@/components/ui";
import { StaffDirectory } from "@/components/staff-directory";
import { allStaff } from "@/content/staff";
import { pageMeta } from "@/lib/seo";
import { site } from "@/content/site";

export const metadata = pageMeta({
  title: "Staff Directory",
  description: "Find King Ceasor University's management, academic and quality assurance staff.",
  path: "/about/staff",
});

export default function StaffPage() {
  const entries = allStaff();

  return (
    <>
      <PageHero
        crumbs={[{ label: "About", href: "/about" }, { label: "Staff directory" }]}
        eyebrow="About KCU"
        title="Staff directory"
        intro={`Find the people who lead and teach at KCU. To reach anyone listed, call ${site.contact.phone} or email ${site.contact.email}.`}
      />
      <Section tone="surface">
        <StaffDirectory entries={entries} />
      </Section>
    </>
  );
}
