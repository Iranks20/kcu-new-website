import { Button, CtaBand, PageHero, Section } from "@/components/ui";
import { CampusMap } from "@/components/campus-map";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Campus Map",
  description: "Find your way around the King Ceasor University campus on Bunga Hill: teaching blocks, labs, library, moot court and visitor parking.",
  path: "/visit/campus-map",
});

export default function CampusMapPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Visit", href: "/visit" }, { label: "Campus map" }]}
        eyebrow="Visit KCU"
        title="Campus map"
        intro="Find your way around Bunga Hill. Select a building to see what's inside, then jump to it in the virtual tour."
      >
        <Button href={site.contact.mapUrl} size="lg">Directions in Google Maps</Button>
        <Button href="/visit/virtual-tour" variant="outline" size="lg" icon={false}>Virtual tour</Button>
      </PageHero>
      <Section className="!pt-10">
        <CampusMap />
      </Section>
      <CtaBand tone="quiet" title="Coming to campus?" text="Book a guided tour or join an open day, and our student ambassadors will show you around." />
    </>
  );
}
