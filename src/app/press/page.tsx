import Image from "next/image";
import { Download, Mail, Phone } from "lucide-react";
import { CtaBand, PageHero, Section, SectionHeading, TextLink } from "@/components/ui";
import { NewsCard } from "@/components/cards";
import { brandAssets, brandColours, factSheet, pressContact } from "@/content/outcomes";
import { news } from "@/content/news";
import { newsletters } from "@/content/university";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";
import { asset } from "@/lib/utils";

export const metadata = pageMeta({
  title: "Press & Media",
  description: "Media contacts, fact sheet, logos and the latest news from King Ceasor University.",
  path: "/press",
});

export default function PressPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "News", href: "/news" }, { label: "Press & media" }]}
        eyebrow="Press & media"
        title="For journalists and partners"
        intro="Media enquiries, interview requests, facts about the University and approved logos, all in one place."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="text-2xl sm:text-3xl">KCU at a glance</h2>
            <dl className="mt-6 divide-y divide-slate-200 rounded-2xl border border-slate-200">
              {factSheet.map((f) => (
                <div key={f.label} className="grid gap-1 px-5 py-4 sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-semibold text-slate-500">{f.label}</dt>
                  <dd className="text-ink sm:col-span-2">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <aside className="lg:col-span-5">
            <div className="rounded-2xl bg-brand-50 ring-1 ring-brand-100 p-6 text-ink sm:p-8">
              <p className="eyebrow">Media contact</p>
              <div className="mt-5 flex items-center gap-4">
                <div className="relative size-16 shrink-0 overflow-hidden rounded-full bg-white">
                  <Image src={asset(pressContact.image)} alt="" fill sizes="64px" className="object-cover object-top" />
                </div>
                <div>
                  <p className="text-lg font-semibold">{pressContact.name}</p>
                  <p className="text-slate-600">{pressContact.role}</p>
                </div>
              </div>
              <ul className="mt-6 space-y-3">
                <li>
                  <a href={`mailto:${pressContact.email}`} className="flex items-center gap-3 font-semibold underline-offset-4 hover:underline">
                    <Mail className="size-5 text-primary-600" aria-hidden /> {pressContact.email}
                  </a>
                </li>
                <li>
                  <a href={site.contact.phoneHref} className="flex items-center gap-3 font-semibold underline-offset-4 hover:underline">
                    <Phone className="size-5 text-primary-600" aria-hidden /> {site.contact.phone}
                  </a>
                </li>
                <li>
                  <a href={site.contact.phone2Href} className="flex items-center gap-3 font-semibold underline-offset-4 hover:underline">
                    <Phone className="size-5 text-primary-600" aria-hidden /> {site.contact.phone2}
                  </a>
                </li>
              </ul>
              <p className="mt-6 border-t border-brand-100 pt-4 text-sm text-slate-600">We aim to respond to media enquiries within one working day. For urgent deadlines, call and ask for the Public Relations office.</p>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="surface" id="brand">
        <SectionHeading eyebrow="Brand assets" title="Logos and colours" intro="Please use the logos as supplied, without stretching or recolouring, with clear space around them." />
        <div className="grid gap-5 md:grid-cols-2">
          {brandAssets.map((b, i) => (
            <a key={b.href} href={b.href} download className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-lift">
              <div className={i === 1 ? "relative h-40 bg-primary-900" : "relative h-40 bg-white"}>
                <Image src={b.href} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-contain p-8" />
              </div>
              <span className="flex items-center justify-between gap-3 border-t border-slate-100 px-5 py-4 font-semibold text-ink">
                {b.label} <Download className="size-4 text-slate-500 transition group-hover:text-primary-600" aria-hidden />
              </span>
            </a>
          ))}
        </div>
        <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {brandColours.map((c) => (
            <li key={c.hex} className="overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-slate-100">
              <span className="block h-20" style={{ background: c.hex }} />
              <span className="block px-4 py-3">
                <span className="block font-semibold text-ink">{c.name}</span>
                <span className="block font-mono text-sm text-slate-500">{c.hex}</span>
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionHeading eyebrow="Latest" title="Recent news" action={<TextLink href="/news">All news</TextLink>} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {news.slice(0, 3).map((a) => (
            <NewsCard key={a.slug} article={a} />
          ))}
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading eyebrow="Publications" title="KCU journals and newsletters" intro="Every story in our journals is also published online as a news article, which is quicker to read on a phone. The full issues are large PDF downloads." action={<TextLink href="/news">Read the stories online</TextLink>} />
        <ul className="grid gap-4 sm:grid-cols-2">
          {newsletters.map((n) => (
            <li key={n.file}>
              <a href={asset(n.file)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-4 rounded-2xl bg-white p-5 shadow-card ring-1 ring-slate-100 transition hover:shadow-lift">
                <span>
                  <span className="block font-semibold text-ink">{n.title}</span>
                  <span className="block text-sm text-slate-500">{n.date} · PDF, {n.size}</span>
                </span>
                <Download className="size-5 shrink-0 text-slate-500" aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </Section>
      <CtaBand tone="quiet" title="Planning a story about KCU?" text="We can arrange interviews with academics, students and University leadership." />
    </>
  );
}
