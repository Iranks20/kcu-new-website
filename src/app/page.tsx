import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Briefcase, GraduationCap, Globe2, Handshake, School, Users } from "lucide-react";
import { Button, CtaBand, Section, SectionHeading, TextLink } from "@/components/ui";
import { Avatar, EventCard, SampleLabel } from "@/components/cards";
import { Reveal } from "@/components/reveal";
import { CourseSearch } from "@/components/course-search";
import { Credentials } from "@/components/credentials";
import { CampusTour } from "@/components/campus-tour";
import { stories } from "@/content/stories";
import { news } from "@/content/news";
import { events } from "@/content/events";
import { schools } from "@/content/schools";
import { partners } from "@/content/partners";
import { programmes } from "@/content/programmes";
import { outcomeStats, outcomesNote } from "@/content/outcomes";
import { intakes, latestGraduation, whyKcu } from "@/content/university";
import { site } from "@/content/site";
import { asset, formatDate } from "@/lib/utils";

export const metadata = { alternates: { canonical: "/" } };

/** "I am a…" routes, so each audience reaches its own information in one click. */
const audiences = [
  { icon: GraduationCap, title: "Prospective students", text: "Programmes, fees and how to apply", href: "/admissions" },
  { icon: Globe2, title: "International students", text: "USD fees, student pass and arrival", href: "/international" },
  { icon: Users, title: "Parents & sponsors", text: "Paying fees, safety and support", href: "/parents" },
  { icon: School, title: "Current students", text: "Portals, timetables and services", href: "/students" },
  { icon: Briefcase, title: "Alumni", text: "Stay connected with KCU", href: "/alumni" },
  { icon: Handshake, title: "Partners & employers", text: "Research, placements and hiring", href: "/research#collaborate" },
];

const levels = [
  { title: "Undergraduate degrees", text: "Medicine, nursing, law, business, forensics and more.", href: "/programmes?level=degree", levels: ["degree"] },
  { title: "Diplomas & bridging", text: "Practical diplomas and one-year Higher Education Certificates.", href: "/programmes?level=diploma", levels: ["diploma", "hec"] },
  { title: "Short courses", text: "Professional certificates from two weeks to three months.", href: "/programmes?level=certificate", levels: ["certificate"] },
];

/** Each school's headline, from the former homepage slides. */
const schoolHeadlines: Record<string, string> = {
  "medicine-health-life-sciences": "Train to save lives.",
  "law-management-sciences": "Lead with justice and vision.",
  "science-computing-engineering": "Build Africa's digital future.",
};

export default function HomePage() {
  const [lead, ...rest] = news;
  const upcoming = events.slice(0, 3);
  const openIntake = intakes[0];
  const featuredStory = stories[0];
  const proof = [
    { value: latestGraduation.graduates, label: "Graduates in 2026" },
    { value: latestGraduation.doctors, label: "New medical doctors" },
    ...outcomeStats.slice(0, 1),
    outcomeStats[2],
  ];

  return (
    <>
      {/* One clear message instead of a rotating slideshow */}
      <section className="relative isolate overflow-hidden bg-slate-900">
        <Image
          src="/images/kcu-2026/graduates-best-of-best.webp"
          alt="KCU graduates celebrating outside the main campus"
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
          style={{ objectPosition: "center 70%" }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />
        <div className="absolute inset-0 -z-10 bg-black/25 lg:hidden" />
        <div className="container-x flex min-h-[34rem] items-center py-16 sm:min-h-[38rem] lg:min-h-[42rem]">
          <div className="max-w-2xl animate-fade-up">
            <p className="eyebrow text-gold-300">Admissions open · {openIntake.name}</p>
            <h1 className="mt-5 text-[2.5rem] leading-[1.05] text-white sm:text-6xl lg:text-7xl">Ignite your future.</h1>
            <p className="mt-6 max-w-xl text-lg text-white/90 sm:text-xl">
              A chartered university in Kampala, offering internationally recognised medicine and career-focused degrees in health, law, business, computing and energy.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/programmes" variant="white" size="lg">Find your programme</Button>
              <Button href={site.applyUrl} variant="ghost-light" size="lg">Apply online</Button>
            </div>
            <p className="mt-6 text-sm text-white/85">
              Applications close on {openIntake.closes}.{" "}
              <Link href="/intake" className="font-semibold text-white underline underline-offset-4 hover:text-gold-300">See featured programmes</Link>
            </p>
          </div>
        </div>
      </section>

      <Credentials />

      {/* Audience pathways */}
      <section aria-labelledby="audiences" className="border-b border-slate-100 bg-white">
        <div className="container-x py-10 sm:py-12">
          <h2 id="audiences" className="text-xl sm:text-2xl">I am…</h2>
          <ul className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {audiences.map((a) => (
              <li key={a.title}>
                <Link href={a.href} className="group flex h-full flex-col rounded-2xl border border-slate-200 p-4 transition hover:border-primary-600 hover:bg-brand-50 sm:p-5">
                  <a.icon className="size-6 text-primary-600" aria-hidden />
                  <span className="mt-3 font-semibold leading-snug text-ink">{a.title}</span>
                  <span className="mt-1 text-sm text-slate-500">{a.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Find a programme */}
      <Section tone="surface">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow mb-3">Study at KCU</p>
          <h2 className="text-3xl sm:text-4xl">Find the right programme for you</h2>
          <p className="mt-4 text-lg text-slate-600">
            {programmes.length} degrees, diplomas and short courses, with day and weekend classes for school leavers and working professionals.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-3xl">
          <CourseSearch />
        </div>
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {levels.map((p) => {
            const count = programmes.filter((x) => p.levels.includes(x.level)).length;
            return (
              <li key={p.title}>
                <Link href={p.href} className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-slate-300 hover:shadow-lift">
                  <span className="text-sm font-medium text-slate-500">{count} programmes</span>
                  <span className="heading mt-2 text-xl text-ink">{p.title}</span>
                  <span className="mt-2 flex-1 text-slate-600">{p.text}</span>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
                    View programmes <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>

      {/* Schools */}
      <Section>
        <SectionHeading
          eyebrow="Our schools"
          title="Three schools, one ambition"
          intro="Each school combines strong academic foundations with hands-on practice, industry partners and community engagement."
          action={<TextLink href="/schools">About our schools</TextLink>}
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {schools.map((school, i) => (
            <Reveal key={school.slug} delay={i * 100}>
              <Link href={`/schools/${school.slug}`} className="group block h-full overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200 transition hover:shadow-lift hover:ring-slate-300">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={school.image} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-6 sm:p-7">
                  <p className="text-sm font-medium text-slate-500">
                    {school.shortName} · {programmes.filter((p) => p.school === school.slug).length} programmes
                  </p>
                  <h3 className="mt-2 text-xl sm:text-2xl">{schoolHeadlines[school.slug] ?? school.shortName}</h3>
                  <p className="mt-2 text-slate-600">{school.tagline}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Why KCU, with the proof that backs it */}
      <Section tone="surface">
        <SectionHeading
          eyebrow="Why KCU"
          title="An education built around your future"
          intro="Practical training and flexible study options, backed by a full University Charter, international recognition and graduates in demand."
          action={<TextLink href="/admissions#outcomes">Graduate outcomes</TextLink>}
        />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {whyKcu.map((w) => (
            <li key={w.title} className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
              <h3 className="text-lg">{w.title}</h3>
              <p className="mt-2 text-[0.9375rem] text-slate-600">{w.text}</p>
            </li>
          ))}
        </ul>
        <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-slate-200 ring-1 ring-slate-200 lg:grid-cols-4">
          {proof.map((s) => (
            <div key={s.label} className="flex flex-col-reverse bg-white p-6 sm:p-8">
              <dt className="mt-2 text-sm text-slate-600 sm:text-base">{s.label}</dt>
              <dd className="heading text-4xl tabular-nums text-primary-600 sm:text-5xl">{s.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-sm text-slate-500">
          From the {latestGraduation.name}, {latestGraduation.date}. {outcomesNote}
        </p>
      </Section>

      {/* Campus film and a student's story */}
      <Section>
        <SectionHeading eyebrow="Life at KCU" title="See Bunga Hill, hear from our students" action={<TextLink href="/visit">Visit campus</TextLink>} />
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <CampusTour className="h-full min-h-[18rem]" />
          </div>
          <div className="lg:col-span-5">
            <div className="group relative flex h-full min-h-[24rem] flex-col justify-end overflow-hidden rounded-2xl">
              <Image src={asset(featuredStory.image)} alt={featuredStory.imageAlt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
              <div className="relative p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="eyebrow text-gold-300">Student stories</p>
                  {featuredStory.sample && <SampleLabel />}
                </div>
                <blockquote className="heading mt-3 text-2xl leading-snug text-white">“{featuredStory.quote}”</blockquote>
                <div className="mt-5 flex items-center gap-3">
                  <Avatar name={featuredStory.name} tone="gold" />
                  <div>
                    <p className="font-semibold text-white">
                      <Link href={`/stories/${featuredStory.slug}`} className="after:absolute after:inset-0">{featuredStory.name}</Link>
                    </p>
                    <p className="text-sm text-white/75">{featuredStory.stage}</p>
                  </div>
                </div>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                  Read the story <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* News and events together */}
      <Section tone="surface">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading eyebrow="News" title="Latest from KCU" action={<TextLink href="/news">All news</TextLink>} />
            <Link href={`/news/${lead.slug}`} className="group block">
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-white">
                {lead.image && <Image src={asset(lead.image)} alt={lead.imageAlt} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />}
              </div>
              <p className="mt-5 text-sm text-slate-500">
                <span className="font-semibold text-ink">{lead.category}</span> · {formatDate(lead.date)}
              </p>
              <h3 className="mt-2 text-2xl group-hover:underline group-hover:underline-offset-4">{lead.title}</h3>
            </Link>
            <ul className="mt-6 divide-y divide-slate-200 border-t border-slate-200">
              {rest.slice(0, 3).map((a) => (
                <li key={a.slug}>
                  <Link href={`/news/${a.slug}`} className="group flex items-baseline justify-between gap-6 py-4">
                    <span className="font-semibold leading-snug text-ink group-hover:underline group-hover:underline-offset-4">{a.title}</span>
                    <span className="shrink-0 text-sm text-slate-500">{formatDate(a.date, "short")}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Events" title="Coming up" action={<TextLink href="/events">All events</TextLink>} />
            <div className="space-y-4">
              {upcoming.map((e) => (
                <EventCard key={e.slug} event={e} />
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Partners */}
      <section className="py-14 sm:py-16">
        <div className="container-x">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl">Our partners</h2>
              <p className="mt-1 text-slate-600">Universities, referral hospitals and programmes we work with across four continents.</p>
            </div>
            <TextLink href="/research#partners">All partnerships</TextLink>
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-3 lg:grid-cols-6">
            {partners.slice(0, 6).map((p) => (
              <li key={p.name} className="flex h-28 items-center justify-center bg-white p-6" title={`${p.name}, ${p.country}`}>
                <div className="relative h-full w-full">
                  <Image src={p.logo} alt={p.name} fill sizes="200px" className={`object-contain ${p.dark ? "invert" : ""}`} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
