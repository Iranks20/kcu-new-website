import type { Metadata } from "next";
import { PageHero, Section } from "@/components/ui";
import { EventsBrowser } from "@/components/events-browser";
import { events } from "@/content/events";

export const metadata: Metadata = {
  alternates: { canonical: "/events" },
  title: "Events",
  description: "Open days, public lectures, competitions and ceremonies at King Ceasor University.",
};

export default function EventsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Events" }]}
        eyebrow="What's on"
        title="Events at KCU"
        intro="Open days, public lectures, competitions and ceremonies. Everyone is welcome on Bunga Hill."
        image="/images/kcu-2026/library-collaboration.webp"
      />
      <Section className="!pt-10">
        <EventsBrowser events={events} />
      </Section>
    </>
  );
}
