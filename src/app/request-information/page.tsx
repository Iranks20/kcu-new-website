import { CalendarDays, Mail, MessageCircle } from "lucide-react";
import { CtaBand, PageHero, Section } from "@/components/ui";
import { SimpleForm } from "@/components/simple-form";
import { programmes } from "@/content/programmes";
import { schools } from "@/content/schools";
import { site, whatsappLink } from "@/content/site";
import { intakes } from "@/content/university";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Request Information",
  description: "Ask King Ceasor University for programme details, fees, entry requirements and intake dates. An admissions adviser will reply within one working day.",
  path: "/request-information",
});

const promises = [
  { icon: Mail, title: "A personal reply", text: "An admissions adviser replies within one working day, by email or WhatsApp." },
  { icon: CalendarDays, title: "Dates and fees", text: "Programme details, fees, entry requirements and the next intake dates." },
  { icon: MessageCircle, title: "No obligation", text: "Ask anything. We'll never share your details with third parties." },
];

export default function RequestInformationPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Admissions", href: "/admissions" }, { label: "Request information" }]}
        eyebrow="Admissions"
        title="Request information"
        intro="Tell us what you'd like to study and an admissions adviser will send you the details you need."
      />
      <Section className="!pt-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <ul className="space-y-6">
              {promises.map((p) => (
                <li key={p.title} className="flex gap-4">
                  <p.icon className="mt-1 size-5 shrink-0 text-primary-600" aria-hidden />
                  <span>
                    <span className="block font-semibold text-ink">{p.title}</span>
                    <span className="mt-1 block text-slate-600">{p.text}</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-8 border-t border-slate-200 pt-6 text-slate-600">
              In a hurry? Call {site.contact.phone} or{" "}
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="font-semibold text-ink underline underline-offset-4">chat on WhatsApp</a>.
            </p>
          </div>
          <div className="lg:col-span-8">
            <SimpleForm
              submitLabel="Send my request"
              successTitle="Thank you, we've got your request"
              successText="An admissions adviser will contact you within one working day."
              fields={[
                { name: "name", label: "Full name", required: true, autoComplete: "name" },
                { name: "email", label: "Email address", type: "email", required: true, autoComplete: "email" },
                { name: "phone", label: "Phone or WhatsApp", type: "tel", autoComplete: "tel" },
                { name: "country", label: "Country", autoComplete: "country-name" },
                { name: "iam", label: "I am a", type: "select", options: ["School leaver", "Working professional", "Parent or sponsor", "International applicant", "Transfer student", "Other"], required: true },
                { name: "area", label: "Area of interest", type: "select", options: schools.map((s) => s.name), required: true },
                { name: "programme", label: "Programme (if you know it)", type: "select", options: ["Not sure yet", ...programmes.map((p) => p.title)], full: true },
                { name: "intake", label: "Preferred intake", type: "select", options: intakes.map((i) => i.name), full: true },
                { name: "message", label: "Your questions (optional)", type: "textarea" },
              ]}
            />
          </div>
        </div>
      </Section>
      <CtaBand tone="quiet" />
    </>
  );
}
