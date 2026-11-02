import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, CheckCircle2, Clock, Mail, MapPin, Phone, UserRound } from "lucide-react";
import { Badge, Button, CtaBand, PageHero, Section, SectionHeading } from "@/components/ui";
import { ProgrammeCard } from "@/components/cards";
import { getSchool, schools } from "@/content/schools";
import { schoolDetails, type StaffMember } from "@/content/school-details";
import { levelLabels, programmesBySchool, type Level } from "@/content/programmes";
import { site } from "@/content/site";
import { asset, initials } from "@/lib/utils";

export function generateStaticParams() {
  return schools.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/schools/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const school = getSchool(slug);
  return school ? { title: school.name, description: school.tagline } : {};
}

const sections = [
  { id: "welcome", label: "Dean's welcome" },
  { id: "staff", label: "Staff" },
  { id: "programmes", label: "Programmes" },
  { id: "departments", label: "Departments" },
  { id: "publications", label: "Publications" },
  { id: "contact", label: "Contact" },
];

function Avatar({ name, image, size = "lg" }: { name?: string; image?: string; size?: "lg" | "xl" }) {
  return (
    <div className={`relative overflow-hidden bg-slate-100 ${size === "xl" ? "aspect-[4/5] w-full rounded-2xl" : "size-20 shrink-0 rounded-full"}`}>
      {image ? (
        <Image src={asset(image)} alt={name ? `Portrait of ${name}` : ""} fill sizes={size === "xl" ? "(min-width: 1024px) 30vw, 80vw" : "80px"} className="object-cover object-top" />
      ) : (
        <div className="grid h-full place-items-center text-primary-600">
          {name ? <span className={`heading ${size === "xl" ? "text-6xl" : "text-xl"}`}>{initials(name)}</span> : <UserRound className={size === "xl" ? "size-20" : "size-8"} aria-hidden />}
        </div>
      )}
    </div>
  );
}

function StaffCard({ member }: { member: StaffMember }) {
  return (
    <li className="flex items-center gap-5 rounded-2xl border border-slate-200 bg-white p-5">
      <Avatar name={member.name} image={member.image} />
      <div className="min-w-0">
        <p className={member.name ? "font-semibold text-ink" : "font-medium text-slate-400"}>{member.name ?? "Name to be confirmed"}</p>
        <p className="mt-0.5 text-[0.9375rem] text-slate-700">{member.role}</p>
        {member.department && <p className="text-sm text-slate-500">{member.department}</p>}
      </div>
    </li>
  );
}

export default async function SchoolPage({ params }: PageProps<"/schools/[slug]">) {
  const { slug } = await params;
  const school = getSchool(slug);
  const details = schoolDetails[slug];
  if (!school || !details) notFound();

  const list = programmesBySchool(school.slug);
  const byLevel = (["degree", "diploma", "hec", "certificate"] as Level[])
    .map((level) => ({ level, items: list.filter((p) => p.level === level) }))
    .filter((g) => g.items.length > 0);
  const { dean, contact } = details;

  return (
    <>
      <PageHero
        eyebrow={school.founded ? `Founded ${school.founded}` : "School"}
        title={school.name}
        intro={school.description[0]}
        image={school.image}
      >
        <Button href="#programmes" size="lg">
          View {list.length} programmes
        </Button>
        <Button href="#contact" variant="outline" size="lg" icon={false}>
          Contact the school
        </Button>
      </PageHero>

      <nav aria-label="On this page" className="sticky top-[4.5rem] z-30 border-b border-slate-200 bg-white/95 backdrop-blur xl:top-20">
        <ul className="container-x flex gap-1 overflow-x-auto py-3">
          {sections.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="block whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-primary-700">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* 1. Welcome message by the dean */}
      <Section id="welcome">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="mx-auto max-w-xs lg:sticky lg:top-40 lg:max-w-none">
              {dean.image ? (
                <Avatar name={dean.name} image={dean.image} size="xl" />
              ) : (
                // No portrait yet: show the school itself rather than an empty silhouette.
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
                  <Image src={school.image} alt="" fill sizes="(min-width: 1024px) 30vw, 80vw" className="object-cover" />
                </div>
              )}
              <p className={`mt-5 font-semibold ${dean.name ? "text-ink" : "text-slate-500"}`}>{dean.name ?? "Office of the Dean"}</p>
              <p className="text-sm text-slate-600">{dean.title}</p>
            </div>
          </div>
          <div className="lg:col-span-8">
            <p className="eyebrow mb-3">Welcome message</p>
            <h2 className="text-3xl sm:text-4xl">A word from the Dean</h2>
            <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
              {dean.draftMessage.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <ul className="mt-10 grid gap-3 border-t border-slate-200 pt-8 sm:grid-cols-3">
              {school.highlights.map((h) => (
                <li key={h} className="flex gap-2.5 text-[0.9375rem] text-slate-700">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary-600" aria-hidden />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* 2. Staff members */}
      <Section id="staff" tone="surface">
        <SectionHeading eyebrow="Our people" title="Staff members" intro="Academic leaders and lecturers who teach, mentor and research across the school." />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {details.staff.map((m) => (
            <StaffCard key={`${m.name ?? ""}-${m.role}-${m.department ?? ""}`} member={m} />
          ))}
        </ul>
      </Section>

      {/* 3. Programmes */}
      <Section id="programmes">
        <SectionHeading
          eyebrow="Programmes"
          title={`Study at the School of ${school.shortName}`}
          intro="Compare duration, fees and entry requirements, then apply online."
          action={<Button href={site.applyUrl}>Apply now</Button>}
        />
        <div className="space-y-12">
          {byLevel.map((g) => (
            <div key={g.level}>
              <h3 className="mb-5 text-xl">{levelLabels[g.level]}s</h3>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {g.items.map((p) => (
                  <ProgrammeCard key={p.slug} programme={p} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 4. Departments */}
      <Section id="departments" tone="surface">
        <SectionHeading eyebrow="Departments" title="How the school is organised" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {school.departments.map((d, i) => {
            const head = details.departmentHeads[d.name];
            return (
              <div key={d.name} className="flex flex-col rounded-2xl bg-white p-6 ring-1 ring-slate-200">
                <span className="heading text-sm text-gold-600">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 text-lg">{d.name}</h3>
                <p className="mt-2 flex-1 text-slate-600">{d.text}</p>
                {head && (
                  <p className="mt-5 border-t border-slate-100 pt-4 text-sm text-slate-500">
                    Head of department: <span className="font-medium text-ink">{head}</span>
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </Section>

      {/* 5. Publications */}
      <Section id="publications">
        <SectionHeading eyebrow="Research" title="Publications & research outputs" intro="Selected papers, presentations and innovations from staff and students." />
        <ul className="divide-y divide-slate-200 border-y border-slate-200">
          {details.publications.map((p) => (
            <li key={p.title} className="grid gap-3 py-6 sm:grid-cols-12 sm:gap-6">
              <div className="flex flex-wrap items-start gap-2 sm:col-span-3">
                <Badge tone="slate">{p.type}</Badge>
                {p.sample && <Badge tone="gold">Sample</Badge>}
              </div>
              <div className="sm:col-span-7">
                <p className="font-semibold leading-snug text-ink">{p.title}</p>
                <p className="mt-1 text-[0.9375rem] text-slate-500">
                  {p.venue} · {p.year}
                </p>
              </div>
              <div className="sm:col-span-2 sm:text-right">
                {p.href && (
                  <Link href={p.href} className="inline-flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-700">
                    Read more <ArrowUpRight className="size-4" aria-hidden />
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* 6. Contact details */}
      <Section id="contact" tone="surface">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-3">Contact</p>
            <h2 className="text-3xl sm:text-4xl">Get in touch with the school</h2>
            <p className="mt-4 text-lg text-slate-600">Questions about programmes, admissions or partnerships? The Dean&apos;s office is happy to help.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={`mailto:${contact.email}?subject=${encodeURIComponent(`Enquiry: ${school.name}`)}`}>Email the school</Button>
              <Button href={site.contact.mapUrl} variant="outline">
                Get directions
              </Button>
            </div>
          </div>
          <dl className="grid gap-px overflow-hidden rounded-2xl bg-slate-200 ring-1 ring-slate-200 sm:grid-cols-2 lg:col-span-7">
            {[
              { icon: MapPin, label: "Office", value: contact.office },
              { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
              { icon: Phone, label: "Phone", value: contact.phone, href: contact.phoneHref },
              { icon: Clock, label: "Office hours", value: contact.hours },
            ].map((c) => (
              <div key={c.label} className="flex gap-4 bg-white p-6">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-slate-100 text-primary-600">
                  <c.icon className="size-5" aria-hidden />
                </span>
                <div>
                  <dt className="text-sm text-slate-500">{c.label}</dt>
                  <dd className="mt-0.5 font-medium text-ink">
                    {c.href ? (
                      <a href={c.href} className="hover:text-primary-600">
                        {c.value}
                      </a>
                    ) : (
                      c.value
                    )}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
