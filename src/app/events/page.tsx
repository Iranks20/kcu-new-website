import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import { Badge, PageHero, Section } from "@/components/ui";
import { events } from "@/content/events";
import { dateParts } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Events",
  description: "Open days, public lectures, competitions and ceremonies at King Ceasor University.",
};

export default function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="What's on"
        title="Events at KCU"
        intro="Open days, public lectures, competitions and ceremonies. Everyone is welcome on Bunga Hill."
        image="/images/kcu-2026/library-collaboration.webp"
      />
      <Section>
        <div className="space-y-6">
          {events.map((e) => {
            const d = dateParts(e.date);
            return (
              <article key={e.slug} className="group relative grid overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-slate-100 transition hover:shadow-lift md:grid-cols-12">
                <div className="relative aspect-[16/9] md:col-span-4 md:aspect-auto md:min-h-[15rem]">
                  <Image src={e.image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute left-4 top-4 rounded-xl bg-white px-3 py-2 text-center shadow-card">
                    <p className="heading text-2xl leading-none text-primary-700">{d.day}</p>
                    <p className="mt-1 text-xs font-semibold uppercase text-slate-500">{d.month} {d.year}</p>
                  </div>
                </div>
                <div className="flex flex-col justify-center p-6 sm:p-8 md:col-span-8">
                  <Badge className="self-start">{e.category}</Badge>
                  <h2 className="mt-3 text-2xl">
                    <Link href={`/events/${e.slug}`} className="after:absolute after:inset-0 group-hover:text-primary-700">{e.title}</Link>
                  </h2>
                  <p className="mt-3 text-slate-600">{e.summary}</p>
                  <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-slate-500">
                    <span className="flex items-center gap-1.5"><Clock className="size-4" aria-hidden />{e.time}</span>
                    <span className="flex items-center gap-1.5"><MapPin className="size-4" aria-hidden />{e.location}</span>
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700">
                    Event details <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </Section>
    </>
  );
}
