import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button, Section, SectionHeading, TextLink } from "@/components/ui";
import { EventCard, NewsCard } from "@/components/cards";
import { Reveal } from "@/components/reveal";
import { HeroVideo } from "@/components/hero-video";
import { ActionBand } from "@/components/home/action-band";
import { news } from "@/content/news";
import { events } from "@/content/events";
import { schools } from "@/content/schools";
import { partners } from "@/content/partners";
import { programmes } from "@/content/programmes";
import { excellenceSlugs, researchPillars } from "@/content/proof";
import { tourStops } from "@/content/virtual-tour";
import { intakes } from "@/content/university";
import { site } from "@/content/site";
import { asset, formatDate } from "@/lib/utils";

export const metadata = { alternates: { canonical: "/" } };

/** Each school's headline, from the former homepage slides. */
const schoolHeadlines: Record<string, string> = {
  "medicine-health-life-sciences": "Train to save lives.",
  "law-management-sciences": "Lead with justice and vision.",
  "science-computing-engineering": "Build Africa's digital future.",
};

export default function HomePage() {
  const count = (...levels: string[]) => programmes.filter((p) => levels.includes(p.level)).length;
  const stages = [
    { title: "Straight from school", count: `${count("degree", "diploma")} degrees and diplomas`, text: "Full-time day study in health, law, business, computing and energy, with a one-year bridging route if you need it.", href: "/programmes?level=degree", cta: "Undergraduate study" },
    { title: "Working professional", count: "Day and weekend classes", text: "Keep working while you study. Most degrees and diplomas run weekend classes, supported by K-Class e-learning.", href: "/programmes", cta: "Study while you work" },
    { title: "Upskilling at any age", count: `${count("certificate")} short courses`, text: "Professional certificates from two weeks to three months: ECG, cyber security, digital marketing, bookkeeping and more.", href: "/programmes?level=certificate", cta: "Browse short courses" },
  ];
  // One row of the strongest stories keeps the homepage near the benchmark length; the rest are in News.
  const excellence = excellenceSlugs.map((slug) => news.find((n) => n.slug === slug)).filter((n) => n !== undefined).slice(0, 3);
  const latest = news.filter((n) => !excellenceSlugs.includes(n.slug));
  const upcoming = events.slice(0, 3);
  const openIntake = intakes[0];

  return (
    <>
      {/* 1. Hero: one message over a silent aerial loop of the campus (poster first, video after load) */}
      <section className="relative isolate overflow-hidden bg-slate-900">
        <HeroVideo
          poster="/media/video/hero/kcu-hero-v3-poster.webp"
          alt="Aerial view of the King Ceasor University campus on Bunga Hill"
          large={{ h264: "/media/video/hero/kcu-hero-v3-1920.mp4", av1: "/media/video/hero/kcu-hero-v3-1920-av1.mp4", width: 1920, height: 928 }}
          medium={{ h264: "/media/video/hero/kcu-hero-v3-1280.mp4", av1: "/media/video/hero/kcu-hero-v3-1280-av1.mp4", width: 1280, height: 620 }}
          portrait={{ h264: "/media/video/hero/kcu-hero-v3-portrait.mp4", av1: "/media/video/hero/kcu-hero-v3-portrait-av1.mp4", width: 696, height: 928 }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />
        <div className="absolute inset-0 -z-10 bg-black/25 lg:hidden" />
        <div className="container-x flex min-h-[30rem] items-center py-14 sm:min-h-[34rem] lg:min-h-[37rem]">
          <div className="max-w-2xl animate-fade-up">
            <p className="eyebrow text-gold-300">Admissions open · {openIntake.name}</p>
            <h1 className="mt-5 text-[2.75rem] leading-[1.02] text-white sm:text-6xl lg:text-7xl">
              Ignite your <mark className="mark-kcu">future.</mark>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/90 sm:text-xl">
              A chartered university in Kampala, offering internationally recognised medicine and career-focused degrees in health, law, business, computing and energy.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href={site.applyUrl} variant="gold" size="lg">Apply now</Button>
              <Button href="/intake" variant="ghost-light" size="lg">January 2027 intake</Button>
            </div>
            <p className="mt-6 text-sm text-white/85">Applications close on {openIntake.closes}.</p>
          </div>
        </div>
      </section>

      {/* 2. Action band: find a programme · proof · I am a… (benchmark: ASU) */}
      <ActionBand />

      {/* 3. Schools */}
      <Section>
        <SectionHeading
          eyebrow="Our schools"
          title="Three schools, one ambition"
          highlight="one ambition"
          intro="Each school combines strong academic foundations with hands-on practice, industry partners and community engagement."
          action={<TextLink href="/schools">About our schools</TextLink>}
        />
        <div className="grid gap-8 lg:grid-cols-3">
          {schools.map((school, i) => (
            <Reveal key={school.slug} delay={i * 100}>
              <Link href={`/schools/${school.slug}`} className="group flex h-full flex-col">
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-slate-100">
                  <Image src={school.image} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="relative -mt-12 mr-6 flex-1 bg-white p-6 shadow-card sm:p-7">
                  <p className="text-sm font-semibold text-primary-700">
                    {school.shortName} · {programmes.filter((p) => p.school === school.slug).length} programmes
                  </p>
                  <h3 className="mt-2 text-xl underline-offset-4 group-hover:underline sm:text-2xl">{schoolHeadlines[school.slug] ?? school.shortName}</h3>
                  <p className="mt-2 text-slate-600">{school.tagline}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 4. Stories of excellence (benchmark: ASU) */}
      <Section tone="surface">
        <SectionHeading
          eyebrow="Proud moments"
          title="Stories of excellence"
          highlight="excellence"
          intro="Competition wins, innovations and milestones from our students and staff."
          action={<TextLink href="/news">All news</TextLink>}
        />
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {excellence.map((a) => (
            <NewsCard key={a.slug} article={a} />
          ))}
        </div>
      </Section>

      {/* 5. The KCU difference: mission statement + research pillars (benchmark: ASU charter line, SMU research themes) */}
      <Section>
        <p className="eyebrow mb-4">The KCU difference</p>
        <blockquote className="heading max-w-5xl text-3xl leading-[1.15] text-ink sm:text-5xl">
          A holistic education through inventive teaching, learning and research, for <mark className="mark-kcu">socio-economic transformation</mark>.
        </blockquote>
        <p className="mt-5 font-semibold text-slate-600">KCU mission statement</p>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {researchPillars.map((p) => (
            <Link key={p.title} href={p.href} className="group relative flex min-h-[22rem] flex-col justify-end overflow-hidden rounded-sm bg-slate-900 p-7 text-white">
              <Image src={asset(p.image)} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
              <span className="relative">
                <span className="text-sm font-semibold text-gold-300">Research pillar</span>
                <span className="heading mt-2 block text-3xl leading-tight text-white">{p.title}</span>
                <span className="mt-3 block text-white/85">{p.text}</span>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-white underline-offset-4 group-hover:underline">
                  Explore our research <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* 6. Learn at every stage (benchmark: ASU "Reimagining education for everyone") */}
      <Section tone="surface">
        <SectionHeading eyebrow="Study your way" title="Learn at every stage of life" highlight="every stage" intro="Whether you have just finished school or have years of work behind you, there is a way to study at KCU that fits around your life." />
        <div className="grid gap-6 md:grid-cols-3">
          {stages.map((st) => (
            <Link key={st.title} href={st.href} className="group flex flex-col border-t-4 border-primary-600 bg-white p-7 transition hover:shadow-lift">
              <span className="text-sm font-semibold text-primary-700">{st.count}</span>
              <span className="heading mt-2 text-2xl text-ink underline-offset-4 group-hover:underline">{st.title}</span>
              <span className="mt-3 flex-1 text-slate-600">{st.text}</span>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-ink">
                {st.cta} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* 7. Explore Bunga Hill: one card per place, each opening that stop of the virtual tour (benchmark: ASU "One university, many places") */}
      <Section>
        <SectionHeading eyebrow="Life at KCU" title="Explore Bunga Hill" highlight="Bunga Hill" intro="Labs, courtrooms, the library and the sports ground. Step inside each one in the virtual tour." action={<TextLink href="/visit/campus-map">Campus map</TextLink>} />
        <ul className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 sm:mx-0 sm:px-0" aria-label="Places on campus">
          {tourStops.slice(1).map((stop) => (
            <li key={stop.slug} className="w-64 shrink-0 snap-start sm:w-72">
              <Link href={`/visit/virtual-tour#${stop.slug}`} className="group relative block aspect-[4/5] overflow-hidden rounded-sm bg-slate-900">
                <Image src={asset(stop.image)} alt={stop.alt} fill sizes="288px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 p-5">
                  <span className="heading block text-xl leading-tight text-white">{stop.title}</span>
                  <span className="mt-3 inline-flex h-9 items-center rounded-full bg-gold-400 px-4 text-sm font-bold text-ink">Virtual tour</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* 8. News and events together */}
      <Section tone="surface">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading eyebrow="News" title="Latest from KCU" action={<TextLink href="/news">All news</TextLink>} />
            <ul className="divide-y divide-slate-200 border-y border-slate-200">
              {latest.slice(0, 5).map((a) => (
                <li key={a.slug}>
                  <Link href={`/news/${a.slug}`} className="group block py-4">
                    <span className="text-sm text-slate-500">
                      <span className="font-semibold text-primary-700">{a.category}</span> · {formatDate(a.date)}
                    </span>
                    <span className="mt-1 block font-semibold leading-snug text-ink group-hover:underline group-hover:underline-offset-4 sm:text-lg">{a.title}</span>
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

      {/* 9. Start your KCU story: full-width photo with an overlapping panel (benchmark: ASU "Carve your path") */}
      <section className="relative isolate overflow-hidden">
        <Image src="/images/kcu-2026/graduates-celebrating.webp" alt="KCU graduates celebrating at graduation" fill sizes="100vw" className="-z-10 object-cover" />
        <div className="container-x py-16 sm:py-24">
          <div className="max-w-xl bg-white p-8 shadow-lift sm:p-10">
            <h2 className="text-3xl sm:text-4xl">
              Start your <mark className="mark-kcu">KCU story</mark>
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Join a chartered university where practical training, caring lecturers and a green campus on Bunga Hill help you graduate ready for work, anywhere in the world.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/visit" icon={false}>Visit KCU</Button>
              <Button href="/request-information" icon={false}>Request information</Button>
              <Button href={site.applyUrl} variant="gold">Apply now</Button>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Partner with KCU (benchmark: SMU "Bridging Asia and the World") */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-3">Global & industry partnerships</p>
            <h2 className="text-3xl sm:text-4xl">
              Partner with <mark className="mark-kcu">KCU</mark>
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              We work with universities, referral hospitals, companies and government on teaching, placements and research. Tell us what you have in mind and we will find the right people.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/employers">Work with our graduates</Button>
              <Button href="/research#collaborate" variant="outline" icon={false}>Research collaboration</Button>
            </div>
          </div>
          <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-slate-200 bg-slate-200 sm:grid-cols-3 lg:col-span-7">
            {partners.slice(0, 6).map((p) => (
              <li key={p.name} className="flex h-28 items-center justify-center bg-white p-6" title={`${p.name}, ${p.country}`}>
                <div className="relative h-full w-full">
                  <Image src={p.logo} alt={p.name} fill sizes="200px" className={`object-contain ${p.dark ? "invert" : ""}`} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
