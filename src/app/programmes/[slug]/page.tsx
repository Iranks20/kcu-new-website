import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BadgeCheck, Briefcase, CalendarDays, CheckCircle2, Clock, GraduationCap, MapPin, Wallet } from "lucide-react";
import { Button, CtaBand, PageHero, Section, SectionHeading } from "@/components/ui";
import { Avatar, ProgrammeCard, SampleLabel } from "@/components/cards";
import { stories } from "@/content/stories";
import { entryRequirements, getProgramme, levelLabels, programmes } from "@/content/programmes";
import { getSchool } from "@/content/schools";
import { site, whatsappLink } from "@/content/site";
import { CurrencyToggle, FeeAmount } from "@/components/fee-amount";
import { ShareButtons } from "@/components/share-buttons";
import { AskAssistantButton } from "@/components/assistant/ask-button";
import { BrandIcon } from "@/components/social-icons";
import { pageMeta } from "@/lib/seo";
import { SimpleForm } from "@/components/simple-form";
import { intakes } from "@/content/university";
import { JsonLd } from "@/components/json-ld";
import { courseJsonLd } from "@/lib/structured-data";

export function generateStaticParams() {
  return programmes.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/programmes/[slug]">) {
  const { slug } = await params;
  const programme = getProgramme(slug);
  if (!programme) return {};
  return pageMeta({ title: programme.title, description: programme.overview, path: `/programmes/${programme.slug}`, image: getSchool(programme.school)?.image });
}

export default async function ProgrammePage({ params }: PageProps<"/programmes/[slug]">) {
  const { slug } = await params;
  const programme = getProgramme(slug);
  if (!programme) notFound();
  const school = getSchool(programme.school)!;
  const story = stories.find((st) => st.programme === programme.slug);
  const related = programmes.filter((p) => p.school === programme.school && p.slug !== programme.slug && p.level === programme.level).slice(0, 3);

  const facts = [
    { icon: Clock, label: "Duration", value: programme.duration },
    { icon: GraduationCap, label: "Award", value: levelLabels[programme.level] },
    { icon: CalendarDays, label: "Intakes", value: programme.intakes.join(", ") },
    { icon: MapPin, label: "Study mode", value: programme.modes.join(", ") },
  ];

  return (
    <>
      <JsonLd data={courseJsonLd(programme)} />
      <PageHero
        crumbs={[{ label: "Programmes", href: "/programmes" }, { label: school.shortName, href: `/schools/${school.slug}` }, { label: programme.title }]}
        eyebrow={levelLabels[programme.level]}
        title={programme.title}
        intro={school.name}
        image={school.image}
      >
        <Button href={site.applyUrl} variant="gold" size="lg">Apply now</Button>
        <Button href={`/programmes/compare?p=${programme.slug}`} variant="outline" size="lg" icon={false}>Compare</Button>
        <Button href={`/programmes/${programme.slug}/brochure`} variant="outline" size="lg" icon={false}>Brochure (PDF)</Button>
      </PageHero>

      <div className="border-b border-slate-100 bg-white">
        <dl className="container-x grid grid-cols-2 gap-px lg:grid-cols-4">
          {facts.map((f) => (
            <div key={f.label} className="flex items-start gap-3 py-6 pr-4">
              <f.icon className="mt-0.5 size-5 shrink-0 text-slate-500" aria-hidden />
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
              {programme.subjects && (
                <div className="mt-5 rounded-2xl bg-primary-50 p-5 ring-1 ring-primary-100 sm:p-6">
                  <h3 className="text-base">Subject requirements for this programme</h3>
                  <ul className="mt-3 space-y-2.5">
                    {programme.subjects.map((r) => (
                      <li key={r} className="flex gap-3">
                        <BadgeCheck className="mt-1 size-5 shrink-0 text-primary-600" aria-hidden />
                        <span className="text-ink">{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {programme.subjects && <p className="mt-6 font-semibold text-ink">And the general requirements for this level:</p>}
              <ul className={programme.subjects ? "mt-3 space-y-3" : "mt-5 space-y-3"}>
                {entryRequirements[programme.level].map((r) => (
                  <li key={r} className="flex gap-3">
                    <CheckCircle2 className="mt-1 size-5 shrink-0 text-slate-400" aria-hidden />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
            {programme.structure && (
              <div>
                <h2 className="text-2xl sm:text-3xl">What you will study</h2>
                <ol className="mt-6 space-y-0">
                  {programme.structure.map((step, i) => (
                    <li key={step.stage} className="relative flex gap-5 pb-8 last:pb-0">
                      {i < programme.structure!.length - 1 && <span className="absolute left-[1.0625rem] top-10 bottom-0 w-px bg-slate-200" aria-hidden />}
                      <span className="heading grid size-9 shrink-0 place-items-center rounded-full bg-primary-600 text-sm text-white">{i + 1}</span>
                      <div className="pt-1">
                        <h3 className="text-lg">{step.stage}</h3>
                        <p className="mt-1 text-slate-600">{step.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            )}
            {programme.registration && (
              <p className="flex gap-3 rounded-2xl border border-gold-200 bg-gold-50 p-5 text-ink">
                <GraduationCap className="mt-0.5 size-5 shrink-0 text-gold-700" aria-hidden />
                <span><strong className="font-semibold">After you graduate:</strong> {programme.registration}</span>
              </p>
            )}
            <div>
              <h2 className="text-2xl sm:text-3xl">Career opportunities</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {programme.careers.map((c) => (
                  <li key={c} className="flex items-center gap-3 rounded-xl bg-surface px-4 py-3.5">
                    <Briefcase className="size-5 shrink-0 text-slate-500" aria-hidden />
                    <span className="font-medium text-ink">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
            <ShareButtons path={`/programmes/${programme.slug}`} title={`${programme.title} at King Ceasor University`} className="border-t border-slate-100 pt-6" />
          </div>

          {story && (
            <Link href={`/stories/${story.slug}`} className="group flex flex-col gap-5 rounded-2xl bg-brand-50 ring-1 ring-brand-100 p-6 text-ink transition hover:bg-brand-100 sm:flex-row sm:items-center sm:p-8 lg:order-last lg:col-span-8">
              <Avatar name={story.name} tone="gold" className="size-16 text-xl" />
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="eyebrow">Hear from a student</p>
                  {story.sample && <SampleLabel />}
                </div>
                <blockquote className="heading mt-2 text-xl leading-snug text-ink sm:text-2xl">“{story.quote}”</blockquote>
                <p className="mt-3 text-slate-600">
                  {story.name} · {story.stage}
                </p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-ink">
                Read {story.name.split(" ")[0]}&apos;s story <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </span>
            </Link>
          )}

          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
            <div className="rounded-2xl border border-slate-200 border-t-4 border-t-primary-600 bg-white p-6 shadow-card sm:p-8">
              <div className="flex items-center gap-3">
                <span className="inline-flex shrink-0 text-primary-600"><Wallet className="size-5" aria-hidden /></span>
                <h2 className="text-xl text-ink">Tuition fees</h2>
              </div>
              <CurrencyToggle className="mt-5" />
              <dl className="mt-6 space-y-4">
                <div className="flex items-baseline justify-between gap-4 border-b border-brand-100 pb-4">
                  <dt className="text-slate-600">East African students</dt>
                  <dd className="heading whitespace-nowrap text-xl text-ink"><FeeAmount fee={programme.fees.local} /></dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-b border-brand-100 pb-4">
                  <dt className="text-slate-600">International students</dt>
                  <dd className="heading whitespace-nowrap text-xl text-ink">{programme.fees.international}</dd>
                </div>
              </dl>
              <p className="mt-4 text-sm text-slate-600">Per {programme.fees.per}. Instalment plans and HESFB student loans available.</p>
              <div className="mt-6 grid gap-3">
                <Button href={site.applyUrl} variant="gold" className="w-full">Start your application</Button>
                <Link href="/admissions#fees" className="text-center text-sm font-semibold text-slate-600 hover:text-ink">See full fees & funding</Link>
              </div>
            </div>
            <div className="mt-4 rounded-2xl border border-slate-200 p-6">
              <p className="font-semibold text-ink">Talk to admissions</p>
              <p className="mt-1 text-sm text-slate-600">Get help choosing, applying or paying fees. {site.contact.hours}.</p>
              <ul className="mt-4 space-y-2 text-[0.9375rem]">
                <li><a href={site.contact.phoneHref} className="font-medium text-ink underline-offset-4 hover:underline">{site.contact.phone}</a></li>
                <li><a href={site.contact.phone2Href} className="font-medium text-ink underline-offset-4 hover:underline">{site.contact.phone2}</a></li>
                <li><a href={`mailto:${site.contact.admissionsEmail}`} className="font-medium text-ink underline-offset-4 hover:underline">{site.contact.admissionsEmail}</a></li>
              </ul>
              <div className="mt-5 grid gap-2">
                <a href={whatsappLink(`Hello KCU, I have a question about the ${programme.title}.`)} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#25d366] px-5 text-sm font-semibold text-white transition hover:bg-[#1ebe5b]">
                  <BrandIcon name="whatsapp" className="size-4" /> Ask on WhatsApp
                </a>
                <AskAssistantButton question={`Entry requirements for ${programme.title}`}>Ask the KCU Assistant</AskAssistantButton>
              </div>
              <p className="mt-4 flex items-start gap-2 border-t border-slate-100 pt-4 text-sm text-slate-600">
                <BadgeCheck className="mt-0.5 size-4 shrink-0 text-slate-500" aria-hidden />
                Accredited by the National Council for Higher Education (NCHE).
              </p>
            </div>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="surface" id="request-info">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-3">Request information</p>
            <h2 className="text-3xl sm:text-4xl">Get the details by email</h2>
            <p className="mt-4 text-lg text-slate-600">
              Leave your details and an admissions adviser will send you the full programme information, fees and next intake dates for the {programme.title}.
            </p>
            <p className="mt-4 text-slate-600">Prefer a printed copy? <Link href={`/programmes/${programme.slug}/brochure`} className="font-semibold text-ink underline underline-offset-4">Download the brochure</Link>.</p>
          </div>
          <div className="lg:col-span-7">
            <SimpleForm
              submitLabel="Send me information"
              successTitle="Thank you"
              successText={`An admissions adviser will email you about the ${programme.title} within one working day.`}
              fields={[
                { name: "name", label: "Full name", required: true, autoComplete: "name" },
                { name: "email", label: "Email address", type: "email", required: true, autoComplete: "email" },
                { name: "phone", label: "Phone or WhatsApp", type: "tel", autoComplete: "tel" },
                { name: "country", label: "Country", autoComplete: "country-name" },
                { name: "intake", label: "Preferred intake", type: "select", options: intakes.map((i) => i.name), required: true, full: true },
                { name: "message", label: "Questions (optional)", type: "textarea" },
              ]}
            />
          </div>
        </div>
      </Section>

      {related.length > 0 && (
        <Section>
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
