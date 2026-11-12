// PLACEHOLDER: procurement process, categories and contact to be confirmed by the University Secretary's office
// before launch. Add live tender notices to `notices` below (title, reference, closing date, document link).

import { FileText } from "lucide-react";
import { CtaBand, PageHero, Section, SectionHeading } from "@/components/ui";
import { SimpleForm } from "@/components/simple-form";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Suppliers & Tenders",
  description: "Procurement notices, tenders and supplier registration at King Ceasor University.",
  path: "/suppliers",
});

type Notice = { title: string; reference: string; closes: string; href?: string };
const notices: Notice[] = [];

const principles = [
  { title: "Open competition", text: "Goods, works and services are bought through fair, documented competition." },
  { title: "Value for money", text: "Bids are evaluated on quality, price and the supplier's ability to deliver." },
  { title: "Integrity", text: "Staff declare conflicts of interest, and gifts or inducements are not accepted." },
];

const categories = ["Laboratory & medical supplies", "ICT equipment & software", "Books & library resources", "Construction & maintenance", "Furniture & office supplies", "Catering & cleaning", "Security services", "Transport", "Consultancy & training", "Other"];

export default function SuppliersPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "About", href: "/about" }, { label: "Suppliers & tenders" }]}
        eyebrow="Procurement"
        title="Suppliers & tenders"
        intro="Current tender notices, how King Ceasor University buys goods and services, and how to register as a supplier."
      />

      <Section id="notices">
        <SectionHeading eyebrow="Notices" title="Current tenders" />
        {notices.length > 0 ? (
          <ul className="divide-y divide-slate-200 border-y border-slate-200">
            {notices.map((n) => (
              <li key={n.reference} className="flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:justify-between">
                <span>
                  <span className="block font-semibold text-ink">{n.title}</span>
                  <span className="text-sm text-slate-500">Ref. {n.reference} · Closes {n.closes}</span>
                </span>
                {n.href && (
                  <a href={n.href} className="inline-flex items-center gap-2 font-semibold text-primary-700 underline underline-offset-4">
                    <FileText className="size-4" aria-hidden /> Bid document
                  </a>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-2xl bg-surface px-6 py-10 text-center text-slate-600">
            There are no open tenders at the moment. Notices are published here and in the national press. Register below to hear about new opportunities.
          </p>
        )}
      </Section>

      <Section tone="surface">
        <SectionHeading eyebrow="How we buy" title="Our procurement principles" />
        <ul className="grid gap-6 md:grid-cols-3">
          {principles.map((p) => (
            <li key={p.title} className="border-t-4 border-primary-600 bg-white p-6">
              <h3 className="text-lg">{p.title}</h3>
              <p className="mt-2 text-slate-600">{p.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="register">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-3">Register</p>
            <h2 className="text-3xl sm:text-4xl">Join our supplier list</h2>
            <p className="mt-4 text-lg text-slate-600">
              Registered suppliers are told about relevant opportunities. Have your certificate of incorporation, TIN and trading licence ready if we ask for them.
            </p>
            <p className="mt-4 text-slate-600">Questions about a tender? Call {site.contact.phone} or email {site.contact.email}.</p>
          </div>
          <div className="lg:col-span-7">
            <SimpleForm
              submitLabel="Register as a supplier"
              successTitle="Registration received"
              successText="The procurement office will review your details and contact you about relevant opportunities."
              fields={[
                { name: "company", label: "Company name", required: true, autoComplete: "organization" },
                { name: "tin", label: "TIN", required: true },
                { name: "contact", label: "Contact person", required: true, autoComplete: "name" },
                { name: "email", label: "Email address", type: "email", required: true, autoComplete: "email" },
                { name: "phone", label: "Phone", type: "tel", required: true, autoComplete: "tel" },
                { name: "category", label: "Main category", type: "select", options: categories, required: true },
                { name: "about", label: "What you supply", type: "textarea", required: true },
              ]}
            />
          </div>
        </div>
      </Section>
      <CtaBand tone="quiet" title="Partner with KCU" text="For research, training or academic partnerships, contact the Directorate of Postgraduate Studies & Research." />
    </>
  );
}
