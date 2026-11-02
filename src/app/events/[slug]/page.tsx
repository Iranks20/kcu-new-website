import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { Button, PageHero, Section } from "@/components/ui";
import { EventCard } from "@/components/cards";
import { events, getEvent } from "@/content/events";
import { site } from "@/content/site";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps<"/events/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const e = getEvent(slug);
  return e ? { title: e.title, description: e.summary } : {};
}

export default async function EventPage({ params }: PageProps<"/events/[slug]">) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) notFound();
  const others = events.filter((e) => e.slug !== event.slug).slice(0, 3);

  return (
    <>
      <PageHero eyebrow={event.category} title={event.title} intro={event.summary} image={event.image} />
      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="prose-kcu">
              {event.description.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
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
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white text-slate-600 shadow-card"><f.icon className="size-5" aria-hidden /></span>
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

