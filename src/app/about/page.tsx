import type { Metadata } from "next";
import Image from "next/image";
import { Compass, Eye } from "lucide-react";
import { Button, CtaBand, PageHero, Section, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { coreValues, history, mission, stats, vision } from "@/content/university";
import { viceChancellor } from "@/content/people";
import { partners } from "@/content/partners";
import { asset } from "@/lib/utils";
import { RecognitionStrip } from "@/components/outcomes";
import { PhotoBand } from "@/components/photo-band";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "About KCU",
  description: "The story, mission, values and leadership of King Ceasor University, a chartered university in Kampala, Uganda.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero crumbs={[{ label: "About" }]}
        eyebrow="About KCU"
        title="An innovation-driven university"
        intro="From an idea in 2009 to a fully chartered university in 2025, King Ceasor University has grown into a home for more than 2,000 students from across Africa."
        image="/images/kcu-2026/graduates-campus-trio.webp"
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-brand-50 ring-1 ring-brand-100 p-8 text-ink sm:p-10">
            <Compass className="size-9 text-primary-600" aria-hidden />
            <h2 className="mt-6 text-2xl text-ink">Our mission</h2>
            <p className="mt-3 text-lg text-slate-600">{mission}</p>
          </div>
          <div className="rounded-2xl bg-gold-50 p-8 ring-1 ring-gold-100 sm:p-10">
            <Eye className="size-9 text-gold-600" aria-hidden />
            <h2 className="mt-6 text-2xl">Our vision</h2>
            <p className="mt-3 text-lg text-slate-700">{vision}</p>
          </div>
        </div>

        <dl className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="border-l-2 border-slate-300 pl-5">
              <dt className="text-sm text-slate-500">{s.label}</dt>
              <dd className="heading mt-1 text-3xl tabular-nums text-ink sm:text-4xl">{s.value}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section tone="surface">
        <SectionHeading eyebrow="Core values" title="What we stand for" align="center" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {coreValues.map((v, i) => (
            <Reveal key={v.title} delay={i * 70}>
              <div className="h-full rounded-2xl bg-white p-6 shadow-card">
                <span className="heading grid size-12 place-items-center rounded-xl bg-slate-100 text-xl text-ink">{v.title[0]}</span>
                <h3 className="mt-5 text-lg">{v.title}</h3>
                <p className="mt-2 text-[0.9375rem] text-slate-600">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Our story" title="Milestones on the journey" />
        <ol className="relative grid gap-8 md:grid-cols-5 md:gap-6">
          <div className="absolute left-[1.375rem] top-0 h-full w-px bg-slate-200 md:left-0 md:top-[1.375rem] md:h-px md:w-full" aria-hidden />
          {history.map((h) => (
            <li key={h.year} className="relative flex gap-5 md:block">
              <span className="relative z-10 grid size-11 shrink-0 place-items-center rounded-full border-4 border-white bg-primary-600 shadow-card ring-1 ring-slate-200">
                <span className="size-2 rounded-full bg-white" />
              </span>
              <div className="md:mt-6">
                <p className="heading text-2xl text-ink">{h.year}</p>
                <h3 className="mt-1 text-lg">{h.title}</h3>
                <p className="mt-2 text-[0.9375rem] text-slate-600">{h.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="vice-chancellor" tone="surface">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <div className="relative mx-auto aspect-[4/5] max-w-sm overflow-hidden rounded-2xl">
                <Image src={asset(viceChancellor.image)} alt={`Portrait of ${viceChancellor.name}`} fill sizes="(min-width: 1024px) 30vw, 80vw" className="object-cover object-top" />
              </div>
            </div>
          </div>
          <div className="lg:col-span-8">
            <p className="eyebrow mb-3">Message from the Vice Chancellor</p>
            <h2 className="text-3xl sm:text-4xl">Welcome to King Ceasor University</h2>
            <div className="mt-8 space-y-5 text-lg leading-8 text-slate-600">
              {viceChancellor.message.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <p className="mt-8 text-xl font-semibold text-ink">{viceChancellor.name}</p>
            <p className="text-slate-500">{viceChancellor.role}</p>
          </div>
        </div>
      </Section>

      <Section id="accreditation">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-3">Charter & accreditation</p>
            <h2 className="text-3xl sm:text-4xl">Fully chartered and nationally regulated</h2>
            <p className="mt-4 text-lg text-slate-600">
              On 3 July 2025, King Ceasor University was granted a full University Charter by the Government of Uganda. All programmes are
              accredited by the National Council for Higher Education (NCHE), and our MBChB is recognised through ECFMG pathways.
            </p>
            <div className="mt-8">
              <Button href="/about/leadership">Meet our leadership</Button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {partners.slice(0, 9).map((p) => (
              <div key={p.name} className="relative grid aspect-[3/2] place-items-center rounded-xl border border-slate-200 bg-white p-4" title={`${p.name}, ${p.country}`}>
                <div className="relative h-full w-full">
                  <Image src={p.logo} alt={p.name} fill sizes="160px" className={`object-contain ${p.dark ? "invert" : ""}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <RecognitionStrip />

      <PhotoBand image="/images/kcu-2026/graduates-library-celebration.webp" alt="KCU graduates celebrating outside the library" eyebrow="Join us" title="Start your KCU story" highlight="KCU story" text="Join a chartered university where practical training and caring lecturers help you graduate ready for work, anywhere in the world." align="right">
        <Button href="/visit" icon={false}>Visit KCU</Button>
        <Button href="/request-information" variant="outline" icon={false}>Request information</Button>
      </PhotoBand>

      <CtaBand tone="quiet" />
    </>
  );
}
