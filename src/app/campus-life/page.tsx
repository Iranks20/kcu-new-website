import type { Metadata } from "next";
import Image from "next/image";
import { BedDouble, HeartHandshake, Library, Users } from "lucide-react";
import { Badge, Button, CtaBand, PageHero, Section, SectionHeading, TextLink } from "@/components/ui";
import { NewsCard, PersonCard, StoryCard } from "@/components/cards";
import { accommodation, clubs, supportServices } from "@/content/campus";
import { guildCabinet, guildLeaders } from "@/content/people";
import { gallery } from "@/content/gallery";
import { news } from "@/content/news";
import { asset } from "@/lib/utils";
import { stories as studentStories } from "@/content/stories";

export const metadata: Metadata = {
  alternates: { canonical: "/campus-life" },
  title: "Campus Life",
  description: "Student leadership, clubs, sport, accommodation and support services at King Ceasor University.",
};

const supportIcons = [HeartHandshake, Users, Library, BedDouble];

export default function CampusLifePage() {
  const stories = news.filter((n) => n.category === "Student Life").slice(0, 3);
  const mosaic = gallery.slice(0, 3);

  return (
    <>
      <PageHero crumbs={[{ label: "Campus life" }]}
        eyebrow="Campus life"
        title="Life on Bunga Hill"
        intro="Lead, compete, serve and belong. Life at KCU is about much more than lectures."
        image="/images/home/campus-group.webp"
      />

      {/* Mosaic */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-3">A community from across Africa</p>
            <h2 className="text-3xl sm:text-4xl">Find your people, and your voice</h2>
            <p className="mt-4 text-lg text-slate-600">
              From Pepsi University Football League fixtures and inter-university moot courts to Rotaract outreach and fellowship, there is always
              something happening. Students from across Africa make KCU a vibrant place to learn.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/gallery">View the gallery</Button>
              <Button href="/events" variant="outline" icon={false}>Upcoming events</Button>
            </div>
          </div>
          <div className="grid h-[24rem] grid-cols-3 grid-rows-2 gap-3 sm:h-[30rem] lg:col-span-7">
            {mosaic.map((m, i) => (
              <div key={m.image} className={`relative overflow-hidden rounded-2xl ${i === 0 ? "col-span-2 row-span-2" : ""}`}>
                <Image src={asset(m.image)} alt={m.title} fill sizes="(min-width: 1024px) 40vw, 60vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Guild */}
      <Section tone="surface" id="guild">
        <SectionHeading
          eyebrow="Student Guild"
          title="Led by students, for students"
          intro="The Guild represents every student on University Council and committees, and runs welfare, academic, sports and cultural programmes."
        />
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
          {guildLeaders.map((p) => (
            <PersonCard key={p.name} person={p} />
          ))}
        </div>
        <details className="group mt-10 rounded-2xl bg-white p-6 shadow-card">
          <summary className="flex items-center justify-between font-semibold text-ink">
            Meet the full Guild cabinet ({guildCabinet.length} ministers)
            <span className="text-slate-400 transition group-open:rotate-45 text-2xl leading-none">+</span>
          </summary>
          <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {guildCabinet.map((p) => (
              <li key={p.name} className="border-b border-slate-100 pb-3">
                <p className="font-medium text-ink">{p.name}</p>
                <p className="text-sm text-slate-500">{p.role}</p>
              </li>
            ))}
          </ul>
        </details>
      </Section>

      {/* Clubs */}
      <Section id="clubs">
        <SectionHeading eyebrow="Clubs & sports" title="Get involved" intro="New clubs can register with the Student Guild at the start of each semester." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {clubs.map((c) => (
            <div key={c.name} className="rounded-2xl border border-slate-200 p-6 transition hover:border-slate-300 hover:shadow-card">
              <Badge tone={c.type === "Sport" ? "slate" : "green"}>{c.type}</Badge>
              <h3 className="mt-4 text-lg">{c.name}</h3>
              <p className="mt-2 text-slate-600">{c.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Student stories */}
      <Section tone="surface" id="stories">
        <SectionHeading eyebrow="Student stories" title="In our students' words" action={<TextLink href="/stories">All stories</TextLink>} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {studentStories.slice(0, 3).map((st) => (
            <StoryCard key={st.slug} story={st} />
          ))}
        </div>
      </Section>

      {/* Support */}
      <Section id="support">
        <SectionHeading eyebrow="Support" title="Here for you, every step" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {supportServices.map((s, i) => {
            const Icon = supportIcons[i];
            return (
              <div key={s.title} className="rounded-2xl bg-brand-50 p-6 ring-1 ring-brand-100">
                <Icon className="size-8 text-primary-600" aria-hidden />
                <h3 className="mt-5 text-lg text-ink">{s.title}</h3>
                <p className="mt-2 text-slate-600">{s.text}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Accommodation */}
      <Section tone="surface" id="accommodation">
        <SectionHeading eyebrow="Accommodation" title="A place to call home" intro="KCU works with vetted private hostels within walking distance of campus. Indicative prices per semester." />
        <div className="grid gap-5 md:grid-cols-3">
          {accommodation.map((a, i) => (
            <div key={a.name} className={i === 0 ? "rounded-2xl bg-white p-6 ring-2 ring-ink sm:p-8" : "rounded-2xl border border-slate-200 p-6 sm:p-8"}>
              {i === 0 && <Badge className="mb-4">Most popular</Badge>}
              <h3 className="text-xl">{a.name}</h3>
              <p className="heading mt-3 text-2xl text-ink">{a.price}</p>
              <p className="mt-3 text-slate-600">{a.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {stories.length > 0 && (
        <Section>
          <SectionHeading eyebrow="Student news" title="Recent highlights" action={<TextLink href="/news">All news</TextLink>} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stories.map((a) => (
              <NewsCard key={a.slug} article={a} />
            ))}
          </div>
        </Section>
      )}
      <CtaBand tone="quiet" />
    </>
  );
}
