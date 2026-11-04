import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Building2, FlaskConical, Mail, Phone } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Avatar } from "@/components/cards";
import { JsonLd } from "@/components/json-ld";
import { ShareButtons } from "@/components/share-buttons";
import { Section, SectionHeading } from "@/components/ui";
import { researchCentres } from "@/content/research";
import { schoolDetails } from "@/content/school-details";
import { getSchool } from "@/content/schools";
import { site } from "@/content/site";
import { allStaff, getStaff } from "@/content/staff";
import { universityRef } from "@/lib/structured-data";
import { pageMeta } from "@/lib/seo";
import { asset } from "@/lib/utils";

export function generateStaticParams() {
  return allStaff().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/about/staff/[slug]">) {
  const { slug } = await params;
  const p = getStaff(slug);
  return p ? pageMeta({ title: p.name, description: `${p.name}, ${p.role} at King Ceasor University.`, path: `/about/staff/${p.slug}`, image: p.image }) : {};
}

export default async function StaffProfilePage({ params }: PageProps<"/about/staff/[slug]">) {
  const { slug } = await params;
  const person = getStaff(slug);
  if (!person) notFound();
  const school = person.school ? getSchool(person.school) : undefined;
  const details = person.school ? schoolDetails[person.school] : undefined;
  const centres = researchCentres.filter((c) => c.school === person.school);
  const colleagues = allStaff().filter((s) => s.unit === person.unit && s.slug !== person.slug).slice(0, 6);
  const path = `/about/staff/${person.slug}`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: person.name,
          jobTitle: person.role,
          worksFor: universityRef,
          image: person.image ? new URL(asset(person.image), site.url).toString() : undefined,
          url: `${site.url}${path}`,
        }}
      />
      <section className="border-b border-slate-100 bg-surface">
        <div className="container-x py-10 sm:py-14">
          <Breadcrumbs items={[{ label: "About", href: "/about" }, { label: "Staff directory", href: "/about/staff" }, { label: person.name }]} />
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center">
            <div className="relative size-36 shrink-0 overflow-hidden rounded-3xl bg-primary-50 shadow-card sm:size-44">
              {person.image ? (
                <Image src={asset(person.image)} alt={person.name} fill priority sizes="176px" className="object-cover object-top" />
              ) : (
                <Avatar name={person.name} className="size-full rounded-none text-4xl ring-0" />
              )}
            </div>
            <div className="animate-fade-up">
              <p className="eyebrow mb-3">{person.unit}</p>
              <h1 className="text-4xl sm:text-5xl">{person.name}</h1>
              <p className="mt-3 text-xl text-slate-600">{person.role}</p>
              {person.department && <p className="mt-1 text-slate-500">{person.department}</p>}
              <ShareButtons path={path} title={`${person.name}, ${person.role}, King Ceasor University`} className="mt-6" />
            </div>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="space-y-10 lg:col-span-8">
            <div>
              <h2 className="text-2xl sm:text-3xl">About</h2>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                {person.name} serves as {person.role}
                {person.department ? ` in the ${person.department}` : ""} at King Ceasor University
                {school ? `, within the ${school.name}` : ""}. {school ? `The school ${school.tagline.charAt(0).toLowerCase()}${school.tagline.slice(1).replace(/\.?$/, ".")}` : "The role supports the University's teaching, research and service to students."}
              </p>
            </div>

            {centres.length > 0 && (
              <div>
                <h2 className="text-2xl sm:text-3xl">Research in this school</h2>
                <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                  {centres.map((c) => (
                    <li key={c.name} className="rounded-2xl border border-slate-200 p-5">
                      <FlaskConical className="size-5 text-primary-600" aria-hidden />
                      <p className="mt-3 font-semibold text-ink">{c.name}</p>
                      <p className="mt-1 text-sm text-slate-600">{c.focus}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {details && details.publications.length > 0 && (
              <div>
                <h2 className="text-2xl sm:text-3xl">Recent outputs from the school</h2>
                <ul className="mt-5 divide-y divide-slate-100">
                  {details.publications.slice(0, 4).map((p) => (
                    <li key={p.title} className="py-4">
                      <p className="font-medium text-ink">{p.title}</p>
                      <p className="mt-1 text-sm text-slate-500">{p.type} · {p.venue} · {p.year}{p.sample ? " · Illustrative entry" : ""}</p>
                    </li>
                  ))}
                </ul>
                {school && (
                  <Link href={`/schools/${school.slug}#publications`} className="mt-4 inline-flex items-center gap-1.5 font-semibold text-ink underline-offset-4 hover:underline">
                    All publications from the school <ArrowRight className="size-4" aria-hidden />
                  </Link>
                )}
              </div>
            )}
          </div>

          <aside className="lg:col-span-4">
            <div className="rounded-2xl bg-primary-900 p-6 text-white sm:p-7 lg:sticky lg:top-28">
              <h2 className="text-xl text-white">Contact</h2>
              <ul className="mt-5 space-y-4 text-[0.9375rem]">
                <li className="flex gap-3">
                  <Building2 className="mt-0.5 size-5 shrink-0 text-gold-400" aria-hidden />
                  <span className="text-white/85">{details?.contact.office ?? `${person.unit}, Main Campus, Bunga Hill`}</span>
                </li>
                <li className="flex gap-3">
                  <Mail className="mt-0.5 size-5 shrink-0 text-gold-400" aria-hidden />
                  <a href={`mailto:${details?.contact.email ?? site.contact.email}?subject=${encodeURIComponent(`For the attention of ${person.name}`)}`} className="font-semibold underline-offset-4 hover:underline">
                    {details?.contact.email ?? site.contact.email}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Phone className="mt-0.5 size-5 shrink-0 text-gold-400" aria-hidden />
                  <a href={site.contact.phoneHref} className="font-semibold underline-offset-4 hover:underline">{site.contact.phone}</a>
                </li>
              </ul>
              <p className="mt-5 border-t border-white/10 pt-4 text-sm text-white/60">Write &ldquo;For the attention of {person.name}&rdquo; and the office will forward your message.</p>
            </div>
          </aside>
        </div>
      </Section>

      {colleagues.length > 0 && (
        <Section tone="surface">
          <SectionHeading title={`More from ${person.unit}`} action={<Link href="/about/staff" className="font-semibold text-ink underline-offset-4 hover:underline">Full directory →</Link>} />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {colleagues.map((c) => (
              <li key={c.slug}>
                <Link href={`/about/staff/${c.slug}`} className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-card ring-1 ring-slate-100 transition hover:-translate-y-0.5 hover:shadow-lift">
                  <div className="relative size-14 shrink-0 overflow-hidden rounded-full bg-primary-50">
                    {c.image ? <Image src={asset(c.image)} alt="" fill sizes="56px" className="object-cover object-top" /> : <Avatar name={c.name} className="size-full text-base ring-0" />}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-ink">{c.name}</p>
                    <p className="text-sm text-slate-600">{c.role}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
}
