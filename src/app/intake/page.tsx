import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { Button, CtaBand, Section, SectionHeading, TextLink } from "@/components/ui";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Countdown } from "@/components/countdown";
import { AskAssistantButton } from "@/components/assistant/ask-button";
import { BrandIcon } from "@/components/social-icons";
import { campaign, featuredProgrammes, flyers } from "@/content/intake";
import { levelLabels } from "@/content/programmes";
import { site } from "@/content/site";
import { applicationSteps } from "@/content/university";
import { pageMeta } from "@/lib/seo";
import { asset, formatDate } from "@/lib/utils";

export const metadata = pageMeta({
  title: `${campaign.name}: Applications Open`,
  description: `Apply to King Ceasor University for the ${campaign.name}. Applications close ${formatDate(campaign.closes)}; classes start ${formatDate(campaign.starts)}.`,
  path: "/intake",
  image: "/images/intake-2027/photo-business-students.webp",
});

export default function IntakePage() {
  return (
    <>
      <section className="border-b border-slate-100 bg-surface">
        <div className="container-x grid items-center gap-10 py-10 sm:py-14 lg:grid-cols-12 lg:gap-14">
          <div className="animate-fade-up lg:col-span-6">
            <Breadcrumbs items={[{ label: "Admissions", href: "/admissions" }, { label: campaign.name }]} />
            <p className="eyebrow">Admissions now open</p>
            <h1 className="mt-4 text-4xl sm:text-5xl">{campaign.name}</h1>
            <p className="mt-5 text-lg text-slate-600">
              Applications close on <strong className="text-ink">{formatDate(campaign.closes)}</strong> and classes begin on{" "}
              <strong className="text-ink">{formatDate(campaign.starts)}</strong>. Apply online in about 15 minutes.
            </p>
            <Countdown deadline={campaign.closes} className="mt-8" />
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={site.applyUrl} size="lg">Apply now</Button>
              <AskAssistantButton question="Help me apply" size="lg">Help me apply</AskAssistantButton>
            </div>
          </div>
          <div className="relative aspect-[2/1] overflow-hidden rounded-2xl lg:col-span-6">
            <Image src="/images/intake-2027/photo-business-students.webp" alt="KCU students studying together" fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <Section>
        <SectionHeading
          eyebrow="Featured for January"
          title="Programmes taking applications now"
          intro="Every degree, diploma and short course is open for this intake. These are some of the most popular."
          action={<TextLink href="/programmes">All programmes</TextLink>}
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProgrammes.map(({ programme: p, tagline, image, imageAlt }) => (
            <article key={p.slug} className="group relative flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200 transition hover:shadow-lift">
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <Image src={asset(image)} alt={imageAlt} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover object-top transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-sm font-medium text-slate-500">{levelLabels[p.level]} · {p.duration}</p>
                <h3 className="mt-2 text-lg leading-snug">
                  <Link href={`/programmes/${p.slug}`} className="after:absolute after:inset-0">{p.title}</Link>
                </h3>
                <p className="mt-2 flex-1 text-[0.9375rem] text-slate-600">{tagline}</p>
                <p className="mt-4 border-t border-slate-100 pt-4 text-sm text-slate-600">
                  From <strong className="text-ink">{p.fees.local}</strong> per {p.fees.per}
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
                  Programme details <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="surface">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-3">How to apply</p>
            <h2 className="text-3xl sm:text-4xl">Six steps to January</h2>
            <p className="mt-4 text-lg text-slate-600">Most applicants receive their admission letter within two weeks.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/admissions#requirements" variant="outline" icon={false}>Entry requirements</Button>
              <Button href="/admissions#fees" variant="outline" icon={false}>Fees</Button>
              <Button href="/scholarships" variant="outline" icon={false}>Scholarships</Button>
            </div>
          </div>
          <ol className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {applicationSteps.map((s, i) => (
              <li key={s.title} className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
                <span className="heading grid size-9 place-items-center rounded-full bg-primary-600 text-sm text-white">{i + 1}</span>
                <h3 className="mt-4 text-base">{s.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section id="share">
        <SectionHeading
          eyebrow="Spread the word"
          title="Share the January intake"
          intro="Know someone who should apply? Download the official flyers or send them straight to WhatsApp."
        />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {flyers.map((f) => (
            <li key={f.file} className="overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200">
              <a href={f.file} target="_blank" rel="noopener noreferrer" className="relative block aspect-[9/10] bg-surface" aria-label={`Open the ${f.title} flyer full size`}>
                <Image src={f.file} alt={`${f.title} flyer for the ${campaign.name}`} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-contain" />
              </a>
              <div className="flex items-center justify-between gap-2 border-t border-slate-100 p-3">
                <a href={f.file} download className="inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-sm font-semibold text-ink hover:bg-surface">
                  <Download className="size-4" aria-hidden /> Download
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`${f.title} at King Ceasor University. ${campaign.name} applications are open: ${site.url}/intake`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 items-center gap-1.5 rounded-full bg-[#25d366] px-3 text-sm font-semibold text-white hover:bg-[#1ebe5b]"
                >
                  <BrandIcon name="whatsapp" className="size-4" /> Share
                </a>
              </div>
            </li>
          ))}
        </ul>
      </Section>
      <CtaBand title={`Apply for the ${campaign.name}`} text={`Applications close on ${formatDate(campaign.closes)}. It takes about 15 minutes online.`} />
    </>
  );
}
