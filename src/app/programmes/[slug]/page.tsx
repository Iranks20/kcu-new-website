import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BadgeCheck, Briefcase, CalendarDays, CheckCircle2, Clock, GraduationCap, MapPin, Wallet } from "lucide-react";
import { Button, CtaBand, PageHero, Section, SectionHeading } from "@/components/ui";
import { ProgrammeCard } from "@/components/cards";
import { entryRequirements, getProgramme, levelLabels, programmes } from "@/content/programmes";
import { getSchool } from "@/content/schools";
import { site } from "@/content/site";

export function generateStaticParams() {
  return programmes.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/programmes/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const programme = getProgramme(slug);
  return programme ? { title: programme.title, description: programme.overview } : {};
}

export default async function ProgrammePage({ params }: PageProps<"/programmes/[slug]">) {
  const { slug } = await params;
  const programme = getProgramme(slug);
  if (!programme) notFound();
  const school = getSchool(programme.school)!;
  const related = programmes.filter((p) => p.school === programme.school && p.slug !== programme.slug && p.level === programme.level).slice(0, 3);

  const facts = [
    { icon: Clock, label: "Duration", value: programme.duration },
    { icon: GraduationCap, label: "Award", value: levelLabels[programme.level] },
    { icon: CalendarDays, label: "Intakes", value: programme.intakes.join(", ") },
    { icon: MapPin, label: "Study mode", value: programme.modes.join(", ") },
  ];

  return (
    <>
      <PageHero
        eyebrow={levelLabels[programme.level]}
        title={programme.title}
        intro={school.name}
        image={school.image}
      >
        <Button href={site.applyUrl} size="lg">Apply now</Button>
        <Button href="/contact" variant="outline" size="lg" icon={false}>Ask a question</Button>
      </PageHero>

      <div className="border-b border-slate-100 bg-white">
        <dl className="container-x grid grid-cols-2 gap-px lg:grid-cols-4">
          {facts.map((f) => (
            <div key={f.label} className="flex items-start gap-3 py-6 pr-4">
              <f.icon className="mt-0.5 size-5 shrink-0 text-primary-600" aria-hidden />
              <div>
                <dt className="text-sm text-slate-500">{f.label}</dt>
                <dd className="font-semibold text-ink">{f.value}</dd>
              </div>
            </div>
          ))}
        </dl>
      </div>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="space-y-12 lg:col-span-8">
            <div>
              <h2 className="text-2xl sm:text-3xl">Programme overview</h2>
              <p className="mt-4 text-lg leading-8 text-slate-700">{programme.overview}</p>
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl">Entry requirements</h2>
              <ul className="mt-5 space-y-3">
                {entryRequirements[programme.level].map((r) => (
                  <li key={r} className="flex gap-3">
                    <CheckCircle2 className="mt-1 size-5 shrink-0 text-primary-500" aria-hidden />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl">Career opportunities</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {programme.careers.map((c) => (
                  <li key={c} className="flex items-center gap-3 rounded-xl bg-surface px-4 py-3.5">
                    <Briefcase className="size-5 shrink-0 text-primary-500" aria-hidden />
                    <span className="font-medium text-ink">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
            <div className="rounded-2xl bg-primary-900 p-6 text-white sm:p-8">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-xl bg-white/10 text-gold-300"><Wallet className="size-5" aria-hidden /></span>
                <h2 className="text-xl text-white">Tuition fees</h2>
              </div>
              <dl className="mt-6 space-y-4">
                <div className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-4">
                  <dt className="text-white/70">East African students</dt>
                  <dd className="heading text-xl text-white">{programme.fees.local}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-4">
                  <dt className="text-white/70">International students</dt>
                  <dd className="heading text-xl text-white">{programme.fees.international}</dd>
                </div>
              </dl>
              <p className="mt-4 text-sm text-white/60">Per {programme.fees.per}. Instalment plans and HESFB student loans available.</p>
              <div className="mt-6 grid gap-3">
                <Button href={site.applyUrl} variant="white" className="w-full">Start your application</Button>
                <Link href="/admissions#fees" className="text-center text-sm font-semibold text-white/80 hover:text-white">See full fees & funding</Link>
              </div>
            </div>
            <div className="mt-4 rounded-2xl border border-slate-200 p-6">
              <p className="font-semibold text-ink">Talk to admissions</p>
              <p className="mt-1 text-sm text-slate-600">Get help choosing, applying or paying fees. {site.contact.hours}.</p>
              <ul className="mt-4 space-y-2 text-[0.9375rem]">
                <li><a href={site.contact.phoneHref} className="font-medium text-primary-600 hover:text-primary-700">{site.contact.phone}</a></li>
                <li><a href={`mailto:${site.contact.admissionsEmail}`} className="font-medium text-primary-600 hover:text-primary-700">{site.contact.admissionsEmail}</a></li>
              </ul>
              <p className="mt-4 flex items-start gap-2 border-t border-slate-100 pt-4 text-sm text-slate-600">
                <BadgeCheck className="mt-0.5 size-4 shrink-0 text-primary-600" aria-hidden />
                Accredited by the National Council for Higher Education (NCHE).
              </p>
            </div>
            </div>
          </aside>
        </div>
      </Section>

      {related.length > 0 && (
        <Section tone="surface">
          <SectionHeading title="Related programmes" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProgrammeCard key={p.slug} programme={p} />
            ))}
          </div>
        </Section>
      )}
      <CtaBand />
    </>
  );
}
