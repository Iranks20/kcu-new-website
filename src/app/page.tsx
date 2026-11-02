import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, MessageCircle, Phone } from "lucide-react";
import { Button, CtaBand, Section, SectionHeading, TextLink } from "@/components/ui";
import { EventCard } from "@/components/cards";
import { Reveal } from "@/components/reveal";
import { HeroCarousel } from "@/components/hero-carousel";
import { CourseSearch } from "@/components/course-search";
import { Credentials } from "@/components/credentials";
import { news } from "@/content/news";
import { events } from "@/content/events";
import { schools } from "@/content/schools";
import { partners } from "@/content/partners";
import { programmes } from "@/content/programmes";
import { council, trustees, viceChancellor } from "@/content/people";
import { achievementSlugs, intakes, joinSteps, latestGraduation, stats, whyKcu } from "@/content/university";
import { site } from "@/content/site";
import { asset, formatDate } from "@/lib/utils";

const pathways = [
  { title: "Undergraduate degrees", text: "Medicine, nursing, law, business, forensics and more.", href: "/programmes?level=degree", levels: ["degree"] },
  { title: "Diplomas & bridging", text: "Practical diplomas and one-year Higher Education Certificates.", href: "/programmes?level=diploma", levels: ["diploma", "hec"] },
  { title: "Short courses", text: "Professional certificates from two weeks to three months.", href: "/programmes?level=certificate", levels: ["certificate"] },
];

export default function HomePage() {
  const achievements = achievementSlugs.map((slug) => news.find((n) => n.slug === slug)).filter((n) => n !== undefined);
  const [lead, ...rest] = news.filter((n) => !achievementSlugs.includes(n.slug));
  const upcoming = events.slice(0, 3);
  const openIntake = intakes[0];
  const leaders = [
    // Office confirmed by the 6th Graduation news story.
    { person: council[0], note: "Minister of Health" },
    { person: trustees[0], note: "" },
  ];

  return (
    <>
      <h1 className="sr-only">King Ceasor University, Kampala: {site.motto}</h1>
      <HeroCarousel
        slides={[
          {
            id: "intake",
            label: "Admissions open",
            eyebrow: `Admissions open · ${openIntake.name}`,
            note: `Applications close on ${openIntake.closes}.`,
            title: "Ignite your future.",
            text: "A chartered university in Kampala, offering internationally recognised medicine and career-focused degrees in health, law, business, computing and energy.",
            image: "/images/kcu-2026/graduates-best-of-best.webp",
            imageAlt: "KCU graduates celebrating outside the main campus",
            imagePosition: "center 70%",
            primary: { label: "Find your programme", href: "/programmes" },
            secondary: { label: "Apply online", href: site.applyUrl },
          },
          {
            id: "medicine",
            label: "Medicine & Surgery",
            eyebrow: "School of Medicine, Health & Life Sciences",
            title: "Train to save lives.",
            text: "Our MBChB is recognised through ECFMG pathways. Learn in clinical skills labs and operating theatres, with rotations at Mulago and Kiruddu National Referral Hospitals.",
            image: "/images/community-outreach/clinical-training-theatre.jpeg",
            imageAlt: "Surgeons operating during clinical training in a theatre",
            imagePosition: "70% center",
            primary: { label: "Explore Medicine & Surgery", href: "/programmes/bachelor-of-medicine-and-bachelor-of-surgery" },
            secondary: { label: "Health programmes", href: "/schools/medicine-health-life-sciences" },
          },
          {
            id: "ai-quantum",
            label: "AI & Quantum",
            eyebrow: "School of Science, Computing & Engineering",
            title: "Building Africa's AI & quantum future.",
            text: "From artificial intelligence, data science and IoT to cyber security and digital forensics, we prepare innovators for a world shaped by AI and quantum technologies.",
            image: "ai-quantum",
            imageAlt: "",
            primary: { label: "Explore computing & AI", href: "/schools/science-computing-engineering" },
            secondary: { label: "Research at KCU", href: "/research" },
          },
          {
            id: "law",
            label: "Law & Leadership",
            eyebrow: "School of Law & Management Sciences",
            title: "Lead with justice and vision.",
            text: "Sharpen your advocacy in our Moot Court Room, or build business and leadership skills with weekend classes designed for working professionals.",
            image: "/media/news-images-moot-court.webp",
            imageAlt: "Law students during a moot court session at KCU",
            imagePosition: "center 40%",
            primary: { label: "Explore law & business", href: "/schools/law-management-sciences" },
            secondary: { label: "Campus life", href: "/campus-life" },
          },
        ]}
      />

      <Credentials />

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
          {pathways.map((p) => {
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

      {/* Proof: graduates and scale */}
      <section className="bg-slate-950 text-white">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[18rem] lg:min-h-full">
            <Image src="/images/kcu-2026/graduates-celebrating.webp" alt="KCU graduates celebrating at the 6th Graduation Ceremony" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <div className="px-4 py-14 sm:px-12 lg:px-16 lg:py-20">
            <p className="eyebrow text-gold-400">
              {latestGraduation.name} · {latestGraduation.date}
            </p>
            <h2 className="mt-3 text-3xl text-white sm:text-4xl">Graduates ready for the world</h2>
            <p className="mt-4 text-lg text-white/75">
              This year we awarded {latestGraduation.graduates} degrees, including {latestGraduation.doctors} new medical doctors, to graduates from{" "}
              {latestGraduation.countries.slice(0, -1).join(", ")} and {latestGraduation.countries.at(-1)}.
            </p>
            <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-white/15 pt-8">
              {[{ value: latestGraduation.graduates, label: "Graduates in 2026" }, { value: latestGraduation.doctors, label: "New medical doctors" }, ...stats.slice(1, 3)].map(
                (s) => (
                  <div key={s.label}>
                    <dd className="heading text-4xl text-gold-400 sm:text-5xl">{s.value}</dd>
                    <dt className="mt-1 text-white/65">{s.label}</dt>
                  </div>
                ),
              )}
            </dl>
            <div className="mt-10">
              <Button href={`/news/${latestGraduation.slug}`} variant="ghost-light">
                Read about graduation
              </Button>
            </div>
          </div>
        </div>
      </section>

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
                  <p className="text-sm font-medium text-slate-500">{programmes.filter((p) => p.school === school.slug).length} programmes</p>
                  <h3 className="mt-2 text-xl sm:text-2xl">{school.shortName}</h3>
                  <p className="mt-2 text-slate-600">{school.tagline}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* How to join */}
      <Section tone="surface" id="join">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-3">Join KCU</p>
            <h2 className="text-3xl sm:text-4xl">Apply in three simple steps</h2>
            <p className="mt-4 text-lg text-slate-600">
              Applications for the {openIntake.name} are open until <strong className="font-semibold text-ink">{openIntake.closes}</strong>. Classes begin on{" "}
              {openIntake.starts}.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={site.applyUrl} size="lg">
                Start your application
              </Button>
              <Button href="/admissions#fees" variant="outline" size="lg" icon={false}>
                See fees
              </Button>
            </div>
          </div>
          <div className="lg:col-span-7">
            <ol className="grid gap-4 sm:grid-cols-3">
              {joinSteps.map((step, i) => (
                <li key={step.title} className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
                  <span className="heading grid size-10 place-items-center rounded-full bg-ink text-white">{i + 1}</span>
                  <h3 className="mt-5 text-lg">{step.title}</h3>
                  <p className="mt-2 text-[0.9375rem] text-slate-600">{step.text}</p>
                </li>
              ))}
            </ol>
            <div className="mt-4 rounded-2xl bg-white p-6 ring-1 ring-slate-200">
              <p className="font-semibold text-ink">Questions? Our admissions team will help you.</p>
              <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-[0.9375rem]">
                <li>
                  <a href={site.contact.phoneHref} className="inline-flex items-center gap-2 font-medium text-ink underline-offset-4 hover:underline">
                    <Phone className="size-4 text-slate-500" aria-hidden /> {site.contact.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${site.contact.admissionsEmail}`} className="inline-flex items-center gap-2 font-medium text-ink underline-offset-4 hover:underline">
                    <Mail className="size-4 text-slate-500" aria-hidden /> {site.contact.admissionsEmail}
                  </a>
                </li>
                <li>
                  <a href={site.chatUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-medium text-ink underline-offset-4 hover:underline">
                    <MessageCircle className="size-4 text-slate-500" aria-hidden /> Live chat
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* Why KCU */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl sm:aspect-[5/4] lg:aspect-[4/5]">
              <Image src="/images/kcu-2026/clinical-skills-practice.webp" alt="Students practising clinical skills in the KCU laboratory" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
          </Reveal>
          <div>
            <p className="eyebrow mb-3">Why KCU</p>
            <h2 className="text-3xl sm:text-4xl">An education built around your future</h2>
            <p className="mt-4 text-lg text-slate-600">Practical training and flexible study options, backed by a full University Charter and international recognition.</p>
            <ol className="mt-10 space-y-7">
              {whyKcu.map((w, i) => (
                <li key={w.title} className="flex gap-5">
                  <span className="heading w-8 shrink-0 pt-0.5 text-lg text-slate-400">{String(i + 1).padStart(2, "0")}</span>
                  <div className="border-l border-slate-200 pl-5">
                    <h3 className="text-lg">{w.title}</h3>
                    <p className="mt-1 text-slate-600">{w.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {/* Achievements */}
      <Section tone="surface">
        <SectionHeading eyebrow="Student achievements" title="Our students compete and win" intro="Recent results from national and inter-university competitions." />
        <div className="grid gap-6 md:grid-cols-3">
          {achievements.map((a) => (
            <Link key={a.slug} href={`/news/${a.slug}`} className="group overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200 transition hover:shadow-lift">
              <div className="relative aspect-[16/10] overflow-hidden">
                {a.image && <Image src={asset(a.image)} alt={a.imageAlt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />}
              </div>
              <div className="p-6">
                <p className="text-sm text-slate-500">{formatDate(a.date)}</p>
                <h3 className="mt-2 text-lg leading-snug">{a.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Leadership */}
      <Section tone="surface">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl lg:col-span-4">
            <Image src={asset(viceChancellor.image)} alt={`Portrait of ${viceChancellor.name}`} fill sizes="(min-width: 1024px) 30vw, 80vw" className="object-cover object-top" />
          </div>
          <div className="lg:col-span-8">
            <p className="eyebrow mb-3">From the Vice Chancellor</p>
            <blockquote className="heading text-2xl font-semibold leading-snug text-ink sm:text-3xl lg:text-[2.125rem]">
              “Education is transformative. I invite you to join KCU as we transform lives, advance knowledge, and prepare globally competitive
              professionals and leaders for the future.”
            </blockquote>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-6 border-t border-slate-200 pt-6">
              <div>
                <p className="text-lg font-semibold text-ink">{viceChancellor.name}</p>
                <p className="text-slate-500">{viceChancellor.role}</p>
              </div>
              <Button href="/about#vice-chancellor" variant="outline">
                Read the full message
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-14 grid gap-8 border-t border-slate-200 pt-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-slate-600">KCU is governed by a Board of Trustees and a University Council of leaders in health, law, education and public service.</p>
            <Link href="/about/leadership" className="group mt-3 inline-flex items-center gap-1.5 font-semibold text-ink">
              Meet our leadership <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </div>
          {leaders.map(({ person, note }) => (
            <div key={person.name} className="flex items-center gap-4">
              <div className="relative size-16 shrink-0 overflow-hidden rounded-full bg-slate-100">
                {person.image && <Image src={asset(person.image)} alt="" fill sizes="64px" className="object-cover object-top" />}
              </div>
              <div>
                <p className="font-semibold text-ink">{person.name}</p>
                <p className="text-sm text-slate-500">{person.role}</p>
                {note && <p className="text-sm text-slate-400">{note}</p>}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* News */}
      <Section>
        <SectionHeading eyebrow="News" title="Latest from KCU" action={<TextLink href="/news">All news</TextLink>} />
        <div className="grid gap-10 lg:grid-cols-12">
          <Link href={`/news/${lead.slug}`} className="group lg:col-span-7">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-surface">
              {lead.image && <Image src={asset(lead.image)} alt={lead.imageAlt} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />}
            </div>
            <p className="mt-5 text-sm text-slate-500">
              <span className="font-semibold text-ink">{lead.category}</span> · {formatDate(lead.date)}
            </p>
            <h3 className="mt-2 text-2xl sm:text-3xl">{lead.title}</h3>
            <p className="mt-3 line-clamp-2 text-slate-600">{lead.excerpt}</p>
          </Link>
          <ul className="divide-y divide-slate-200 lg:col-span-5">
            {rest.slice(0, 4).map((a) => (
              <li key={a.slug}>
                <Link href={`/news/${a.slug}`} className="group flex gap-5 py-5">
                  <div className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-xl bg-surface sm:w-28">
                    {a.image && <Image src={asset(a.image)} alt="" fill sizes="112px" className="object-cover" />}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-slate-500">
                      <span className="font-semibold text-ink">{a.category}</span> · {formatDate(a.date, "short")}
                    </p>
                    <h3 className="mt-1.5 line-clamp-3 text-base leading-snug sm:text-lg">{a.title}</h3>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Events + campus life */}
      <Section tone="surface">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading eyebrow="Events" title="Visit us on campus" action={<TextLink href="/events">All events</TextLink>} />
            <div className="space-y-4">
              {upcoming.map((e) => (
                <EventCard key={e.slug} event={e} />
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            <Link href="/campus-life" className="group relative block h-full min-h-[24rem] overflow-hidden rounded-2xl">
              <Image src="/images/campus-life/student-activities.jpg" alt="KCU students performing a cultural dance at a campus gala" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <h3 className="text-2xl text-white sm:text-3xl">More than a degree</h3>
                <p className="mt-2 text-white/85">Football, moot court, Rotaract, culture and a Guild that gives every student a voice.</p>
                <span className="mt-5 inline-flex items-center gap-2 font-semibold text-white">
                  Explore campus life <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </div>
            </Link>
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
