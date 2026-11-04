// PLACEHOLDER: travel time, tour hours and parking should be confirmed with the admissions office.

import Image from "next/image";
import { BookOpen, Bus, CalendarDays, FlaskConical, Gavel, MapPin, Microscope, PlayCircle, Stethoscope } from "lucide-react";
import { Button, CtaBand, Section, SectionHeading, TextLink } from "@/components/ui";
import { CampusTour } from "@/components/campus-tour";
import { EventCard } from "@/components/cards";
import { VisitForm } from "@/components/visit-form";
import { events } from "@/content/events";
import { site } from "@/content/site";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { tourStops } from "@/content/virtual-tour";
import { pageMeta } from "@/lib/seo";
import { asset } from "@/lib/utils";

export const metadata = pageMeta({
  title: "Visit Campus",
  description: "Tour King Ceasor University on Bunga Hill, Kampala: take the virtual tour, watch the aerial film, book a guided tour or come to an open day.",
  path: "/visit",
});

const ways = [
  { icon: CalendarDays, title: "Open days", text: "Meet lecturers and students from all three schools, tour the labs and get help with your application on the spot." },
  { icon: MapPin, title: "Guided campus tours", text: "A one-hour tour with a student ambassador, on weekdays and Saturday mornings. Families and school groups welcome." },
  { icon: PlayCircle, title: "Virtual tour", text: "Can't travel to Kampala yet? Walk through ten campus stops online, watch the aerial film, then book a video call with admissions." },
];

// PLACEHOLDER: confirm the facilities shown on tours with the Dean of Students.
const stops = [
  { icon: Stethoscope, title: "Clinical skills laboratory", text: "Simulation manikins and ward set-ups where health students practise before placements." },
  { icon: Microscope, title: "Anatomy & science labs", text: "Teaching laboratories for anatomy, chemistry and medical laboratory technology." },
  { icon: Gavel, title: "Moot Court Room", text: "A working courtroom where law students argue cases and host inter-university competitions." },
  { icon: BookOpen, title: "University library", text: "Print and digital collections, quiet study spaces and group rooms." },
  { icon: FlaskConical, title: "Computing labs", text: "Labs for programming, networking, cyber security and digital forensics." },
];

export default function VisitPage() {
  const openDays = events.filter((e) => e.category === "Admissions").slice(0, 2);

  return (
    <>
      <section className="bg-primary-950 text-white">
        <div className="container-x grid items-center gap-10 py-14 sm:py-16 lg:grid-cols-12 lg:gap-14 lg:py-20">
          <div className="animate-fade-up lg:col-span-5">
            <Breadcrumbs dark items={[{ label: "Visit" }]} />
            <p className="eyebrow text-gold-300">Visit KCU</p>
            <h1 className="mt-4 text-4xl text-white sm:text-5xl">See Bunga Hill for yourself</h1>
            <p className="mt-5 text-lg text-white/75">
              Our green campus sits on Bunga Hill overlooking Lake Victoria, about 20 minutes from Kampala city centre along Ggaba Road. Watch the film, then come and walk it.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#book" className="inline-flex h-13 items-center rounded-full bg-gold-400 px-7 font-semibold text-ink transition hover:bg-gold-300">
                Book a campus tour
              </a>
              <a href={site.contact.mapUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-13 items-center rounded-full border border-white/40 px-7 font-semibold text-white transition hover:bg-white/10">
                Get directions ↗
              </a>
            </div>
          </div>
          <div className="lg:col-span-7">
            <CampusTour />
          </div>
        </div>
      </section>

      <Section>
        <SectionHeading eyebrow="Ways to visit" title="Choose how you'd like to see KCU" />
        <ul className="grid gap-5 md:grid-cols-3">
          {ways.map((w) => (
            <li key={w.title} className="rounded-2xl border border-slate-200 p-6 sm:p-7">
              <span className="grid size-12 place-items-center rounded-xl bg-primary-50 text-primary-600">
                <w.icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-5 text-xl">{w.title}</h3>
              <p className="mt-2 text-slate-600">{w.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      {openDays.length > 0 && (
        <Section tone="surface">
          <SectionHeading eyebrow="Coming up" title="Open days and admissions events" action={<TextLink href="/events">All events</TextLink>} />
          <div className="grid gap-4 lg:grid-cols-2">
            {openDays.map((e) => (
              <EventCard key={e.slug} event={e} />
            ))}
          </div>
        </Section>
      )}

      <Section>
        <SectionHeading eyebrow="On your tour" title="What you'll see" intro="Every tour is led by a current student, so you can ask what life here is really like." />
        <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {stops.map((s) => (
            <li key={s.title} className="flex gap-4">
              <s.icon className="mt-1 size-6 shrink-0 text-gold-600" aria-hidden />
              <div>
                <h3 className="text-lg">{s.title}</h3>
                <p className="mt-1 text-slate-600">{s.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <section className="bg-primary-950 text-white">
        <div className="container-x grid items-center gap-10 py-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow text-gold-300">Virtual tour</p>
            <h2 className="mt-3 text-3xl text-white sm:text-4xl">Take a walk around campus, online</h2>
            <p className="mt-4 text-lg text-white/75">Ten stops from the clinical skills lab to the moot court. Works on any phone.</p>
            <Button href="/visit/virtual-tour" variant="gold" size="lg" className="mt-8">Start the virtual tour</Button>
          </div>
          <ul className="grid grid-cols-3 gap-3 lg:col-span-7">
            {tourStops.slice(2, 8).map((s) => (
              <li key={s.slug} className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <Image src={asset(s.image)} alt={s.alt} fill sizes="(min-width: 1024px) 20vw, 33vw" className="object-cover" />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-2 text-xs font-semibold text-white">{s.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Section tone="surface" id="book">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-3">Book a tour</p>
            <h2 className="text-3xl sm:text-4xl">Request a campus tour</h2>
            <p className="mt-4 text-lg text-slate-600">Tell us when you&apos;d like to come and we&apos;ll confirm a time. Tours are free.</p>
            <div className="mt-8 space-y-5">
              <p className="flex gap-3">
                <MapPin className="mt-1 size-5 shrink-0 text-slate-500" aria-hidden />
                <span><strong className="block text-ink">Main campus</strong>{site.contact.address}</span>
              </p>
              <p className="flex gap-3">
                <Bus className="mt-1 size-5 shrink-0 text-slate-500" aria-hidden />
                <span>
                  <strong className="block text-ink">Getting here</strong>
                  Take a taxi or boda boda from the city centre towards Ggaba and get off at Bunga. There is free visitor parking on campus.
                </span>
              </p>
            </div>
            <div className="mt-8 overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200">
              <iframe
                title="Map showing King Ceasor University on Bunga Hill, Kampala"
                src="https://www.google.com/maps?q=King+Ceasor+University+Bunga+Kampala&output=embed"
                className="h-64 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
          <div className="lg:col-span-7">
            <VisitForm />
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
