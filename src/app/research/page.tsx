import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpenCheck, FlaskConical, Handshake, Lightbulb, ShieldCheck, Users } from "lucide-react";
import { Button, CtaBand, PageHero, Section, SectionHeading, TextLink } from "@/components/ui";
import { NewsCard } from "@/components/cards";
import { SimpleForm } from "@/components/simple-form";
import { researchAreas } from "@/content/campus";
import { partners } from "@/content/partners";
import { news } from "@/content/news";
import { allPublications, researchCentres, researchDirector, researchProjects, researchSupport } from "@/content/research";
import { getSchool } from "@/content/schools";
import { pageMeta } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { PhotoBand } from "@/components/photo-band";

export const metadata = pageMeta({
  title: "Research & Innovation",
  description: "Research groups, projects, publications and partnerships at King Ceasor University.",
  path: "/research",
  image: "/images/kcu-2026/lab-chemistry-students.webp",
});

const statusStyles = { Ongoing: "bg-primary-50 text-primary-700", Recognised: "bg-gold-50 text-gold-700", Completed: "bg-slate-100 text-slate-600" };
const supportIcons = [ShieldCheck, Lightbulb, BookOpenCheck, Users];

export default function ResearchPage() {
  const stories = news.filter((n) => n.category === "Research" || n.category === "Partnerships").slice(0, 3);
  const publications = allPublications();
  const stats = [
    { value: `${researchCentres.length}`, label: "Research groups" },
    { value: `${researchProjects.length}`, label: "Recent projects & awards" },
    { value: `${publications.length}+`, label: "Outputs listed by our schools" },
    { value: `${partners.length}`, label: "International partners" },
  ];

  return (
    <>
      <PageHero
        crumbs={[{ label: "Research" }]}
        eyebrow="Research & innovation"
        title="Research that serves society"
        intro="Our research responds to Uganda's priorities in health, justice, technology, energy and agriculture, with students involved from their first year."
        image="/images/kcu-2026/lab-chemistry-students.webp"
      />

      <div className="border-b border-slate-100 bg-white">
        <dl className="container-x grid grid-cols-2 gap-6 py-10 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="text-sm text-slate-500">{s.label}</dt>
              <dd className="heading mt-1 text-4xl text-primary-600">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <Section id="areas">
        <SectionHeading eyebrow="Focus areas" title="Where we focus" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {researchAreas.map((r) => (
            <div key={r.title} className="rounded-2xl border border-slate-200 p-6 sm:p-8">
              <span className="inline-flex shrink-0 text-primary-600">
                <FlaskConical className="size-6" aria-hidden />
              </span>
              <h3 className="mt-5 text-xl">{r.title}</h3>
              <p className="mt-2 text-slate-600">{r.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="centres" tone="surface">
        <SectionHeading eyebrow="Research groups" title="Centres and labs" intro="Each group brings staff and students together around a question that matters to Uganda and the region." />
        <div className="grid gap-5 md:grid-cols-2">
          {researchCentres.map((c) => {
            const school = getSchool(c.school);
            return (
              <article key={c.name} className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-slate-100 sm:p-8">
                <p className="text-sm font-medium text-primary-600">{school?.name}</p>
                <h3 className="mt-2 text-2xl text-ink">{c.name}</h3>
                <p className="mt-3 text-slate-600">{c.focus}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {c.themes.map((t) => (
                    <li key={t} className="rounded-full bg-brand-50 px-3 py-1 text-sm font-medium text-primary-700">{t}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </Section>

      <Section id="projects">
        <SectionHeading eyebrow="Projects & recognition" title="Recent work from our labs and classrooms" />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {researchProjects.map((p) => (
            <Link key={p.title} href={`/news/${p.news}`} className="group flex flex-col rounded-2xl border border-slate-200 p-6 transition hover:shadow-lift">
              <div className="flex items-center justify-between gap-3">
                <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", statusStyles[p.status])}>{p.status}</span>
                <span className="text-xs font-medium text-slate-400">{getSchool(p.school)?.shortName}</span>
              </div>
              <h3 className="mt-4 text-lg">{p.title}</h3>
              <p className="mt-2 flex-1 text-[0.9375rem] text-slate-600">{p.text}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
                Read the story <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section id="publications" tone="surface">
        <SectionHeading eyebrow="Publications" title="Papers, presentations and innovations" intro="Selected outputs listed by our schools. Entries marked “illustrative” are examples awaiting the full publications database." />
        <ul className="divide-y divide-slate-200 rounded-2xl bg-white px-6 shadow-card ring-1 ring-slate-100 sm:px-8">
          {publications.slice(0, 10).map((p) => (
            <li key={p.title} className="flex flex-col gap-2 py-5 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
              <div>
                {p.href ? (
                  <Link href={p.href} className="font-semibold text-ink underline-offset-4 hover:underline">{p.title}</Link>
                ) : (
                  <p className="font-semibold text-ink">{p.title}</p>
                )}
                <p className="mt-1 text-sm text-slate-500">{p.venue} · {p.school}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {p.sample && <span className="rounded-full bg-gold-50 px-2 py-0.5 text-xs font-semibold text-gold-700">Illustrative</span>}
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">{p.type}</span>
                <span className="text-sm font-semibold tabular-nums text-ink">{p.year}</span>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="support">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-3">Research support</p>
            <h2 className="text-3xl sm:text-4xl">How we support researchers</h2>
            <p className="mt-4 text-lg text-slate-600">
              Research is coordinated by the Directorate of Postgraduate Studies & Research, led by {researchDirector.name}, {researchDirector.role.replace("Acting Director, ", "Acting Director")}.
            </p>
          </div>
          <ul className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            {researchSupport.map((s, i) => {
              const Icon = supportIcons[i % supportIcons.length];
              return (
                <li key={s.title} className="rounded-2xl bg-surface p-6">
                  <Icon className="size-6 text-primary-600" aria-hidden />
                  <h3 className="mt-4 text-lg">{s.title}</h3>
                  <p className="mt-2 text-[0.9375rem] text-slate-600">{s.text}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </Section>

      <Section tone="surface" id="partners">
        <SectionHeading eyebrow="Partnerships" title="Collaborating across borders" intro="Academic, clinical and research partners on four continents." />
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {partners.map((p) => (
            <li key={p.name} className="flex flex-col items-center rounded-2xl bg-white p-6 text-center shadow-card">
              <div className="relative h-16 w-full">
                <Image src={p.logo} alt="" fill sizes="200px" className={`object-contain ${p.dark ? "invert" : ""}`} />
              </div>
              <p className="mt-4 text-sm font-semibold text-ink">{p.name}</p>
              <p className="text-xs text-slate-500">{p.country}</p>
            </li>
          ))}
        </ul>
      </Section>

      {stories.length > 0 && (
        <Section>
          <SectionHeading eyebrow="News" title="Research & partnership news" action={<TextLink href="/news">All news</TextLink>} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stories.map((a) => (
              <NewsCard key={a.slug} article={a} />
            ))}
          </div>
        </Section>
      )}

      <Section tone="surface" id="collaborate">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="inline-flex shrink-0 text-primary-600"><Handshake className="size-6" aria-hidden /></span>
            <h2 className="mt-5 text-3xl sm:text-4xl">Collaborate with KCU</h2>
            <p className="mt-4 text-lg text-slate-600">Universities, hospitals, government agencies and companies: tell us about your idea and the Directorate will connect you with the right researchers.</p>
          </div>
          <div className="lg:col-span-7">
            <SimpleForm
              submitLabel="Send proposal"
              successTitle="Thank you"
              successText="The Directorate of Postgraduate Studies & Research will reply within five working days."
              fields={[
                { name: "name", label: "Full name", required: true, autoComplete: "name" },
                { name: "organisation", label: "Organisation", required: true, autoComplete: "organization" },
                { name: "email", label: "Email address", type: "email", required: true, autoComplete: "email" },
                { name: "area", label: "Research area", type: "select", options: researchAreas.map((r) => r.title), required: true },
                { name: "idea", label: "Your idea or proposal", type: "textarea", required: true },
              ]}
            />
          </div>
        </div>
      </Section>
      <PhotoBand image="/images/kcu-2026/lab-chemistry-demonstration.webp" alt="A lecturer demonstrating an experiment to students" eyebrow="Students in research" title="Research starts in your first year" highlight="first year" text="Every KCU degree includes a supervised research project, and our best student work is presented at national symposia and competitions.">
        <Button href="/programmes" icon={false}>Find a programme</Button>
        <Button href="#collaborate" variant="outline" icon={false}>Partner with us</Button>
      </PhotoBand>

      <CtaBand tone="quiet" title="Study research-led programmes" text="Every KCU degree includes a supervised research project. Find the programme that fits your interests." />
    </>
  );
}
