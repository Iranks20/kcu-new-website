import { notFound } from "next/navigation";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { Button, PageHero, Section } from "@/components/ui";
import { EventCard } from "@/components/cards";
import { events, getEvent } from "@/content/events";
import { site } from "@/content/site";
import { formatDate } from "@/lib/utils";
import { JsonLd } from "@/components/json-ld";
import { AddToCalendar } from "@/components/add-to-calendar";
import { ShareButtons } from "@/components/share-buttons";
import { pageMeta } from "@/lib/seo";
import { eventJsonLd } from "@/lib/structured-data";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps<"/events/[slug]">) {
  const { slug } = await params;
  const e = getEvent(slug);
  return e ? pageMeta({ title: e.title, description: e.summary, path: `/events/${e.slug}`, image: e.image }) : {};
}

export default async function EventPage({ params }: PageProps<"/events/[slug]">) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) notFound();
  const others = events.filter((e) => e.slug !== event.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={eventJsonLd(event)} />
      <PageHero crumbs={[{ label: "Events", href: "/events" }, { label: event.title }]} eyebrow={event.category} title={event.title} intro={event.summary} image={event.image} />
      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="prose-kcu">
              {event.description.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <ShareButtons path={`/events/${event.slug}`} title={event.title} className="mt-10 border-t border-slate-100 pt-6" />
          </div>
          <aside className="lg:col-span-4">
            <div className="rounded-2xl bg-surface p-6 sm:p-8 lg:sticky lg:top-28">
              <dl className="space-y-5">
                {[
                  { icon: CalendarDays, label: "Date", value: formatDate(event.date) },
                  { icon: Clock, label: "Time", value: event.time },
                  { icon: MapPin, label: "Location", value: event.location },
                ].map((f) => (
                  <div key={f.label} className="flex gap-4">
                    <span className="inline-flex shrink-0 text-primary-600"><f.icon className="size-5" aria-hidden /></span>
                    <div>
                      <dt className="text-sm text-slate-500">{f.label}</dt>
                      <dd className="font-semibold text-ink">{f.value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
              <Button href={`mailto:${site.contact.email}?subject=${encodeURIComponent(`Registration: ${event.title}`)}`} className="mt-8 w-full">
                Register interest
              </Button>
              <AddToCalendar className="mt-3" entry={{ title: event.title, date: event.date, time: event.time, location: `${event.location}, King Ceasor University`, description: event.summary }} />
            </div>
          </aside>
        </div>
      </Section>
      <Section tone="surface">
        <h2 className="mb-8 text-2xl sm:text-3xl">More upcoming events</h2>
        <div className="grid gap-4 lg:grid-cols-3">
          {others.map((e) => (
            <EventCard key={e.slug} event={e} />
          ))}
        </div>
      </Section>
    </>
  );
}

