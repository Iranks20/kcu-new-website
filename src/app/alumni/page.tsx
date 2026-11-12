import type { Metadata } from "next";
import { BookOpen, Briefcase, CalendarHeart, HandHeart, Network, Users } from "lucide-react";
import { PageHero, Section, SectionHeading } from "@/components/ui";
import { Avatar, SampleLabel } from "@/components/cards";
import { SimpleForm } from "@/components/simple-form";
import { alumni } from "@/content/opportunities";
import { schools } from "@/content/schools";
import { site } from "@/content/site";

export const metadata: Metadata = {
  alternates: { canonical: "/alumni" },
  title: "Alumni",
  description: "Stay connected with King Ceasor University: join the alumni network, mentor students, attend events and give back.",
};

const icons = [Network, Briefcase, Users, CalendarHeart, BookOpen, HandHeart];

export default function AlumniPage() {
  return (
    <>
      <PageHero crumbs={[{ label: "About", href: "/about" }, { label: "Alumni" }]}
        eyebrow="Alumni"
        title="Once KCU, always KCU"
        intro={`More than ${alumni.graduates.replace("+", "")} graduates from ${alumni.ceremonies} graduation ceremonies, connected to each other and to the University.`}
        image="/images/kcu-2026/graduates-library-celebration.webp"
      />

      <Section>
        <SectionHeading eyebrow="Stay connected" title="What the alumni network offers" />
        <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {alumni.benefits.map((b, i) => {
            const Icon = icons[i % icons.length];
            return (
              <li key={b.title} className="flex gap-4">
                <span className="inline-flex shrink-0 text-primary-600">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div>
                  <h3 className="text-lg">{b.title}</h3>
                  <p className="mt-1 text-slate-600">{b.text}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section tone="surface">
        <SectionHeading eyebrow="Alumni spotlight" title="Where KCU graduates are now" />
        <div className="grid gap-6 md:grid-cols-3">
          {alumni.spotlight.map((a) => (
            <figure key={a.name} className="flex flex-col rounded-2xl bg-white p-6 ring-1 ring-slate-200 sm:p-7">
              {a.sample && <SampleLabel className="w-fit" />}
              <blockquote className="heading mt-4 flex-1 text-lg leading-snug text-ink">“{a.quote}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-4 border-t border-slate-100 pt-5">
                <Avatar name={a.name} />
                <div>
                  <p className="font-semibold text-ink">{a.name}</p>
                  <p className="text-sm text-slate-500">{a.programme}</p>
                  <p className="text-sm text-slate-500">{a.now}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <Section id="register">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-3">Join the network</p>
            <h2 className="text-3xl sm:text-4xl">Update your details</h2>
            <p className="mt-4 text-lg text-slate-600">
              Tell us where you are now so we can keep you informed about reunions, jobs and ways to give back. Questions? Email{" "}
              <a href={`mailto:${site.contact.alumniEmail}`} className="font-semibold text-ink underline underline-offset-4">{site.contact.alumniEmail}</a>.
            </p>
          </div>
          <div className="lg:col-span-7">
            <SimpleForm
              submitLabel="Join the alumni network"
              successTitle="Welcome back"
              successText="The Alumni Office will be in touch with news and opportunities."
              fields={[
                { name: "name", label: "Full name", required: true, autoComplete: "name" },
                { name: "email", label: "Email address", type: "email", required: true, autoComplete: "email" },
                { name: "year", label: "Year of graduation", type: "number", required: true },
                { name: "school", label: "School", type: "select", options: schools.map((s) => s.name), required: true },
                { name: "programme", label: "Programme", required: true },
                { name: "employer", label: "Current employer or organisation" },
                { name: "involvement", label: "How would you like to be involved?", type: "textarea" },
              ]}
            />
          </div>
        </div>
      </Section>
    </>
  );
}
