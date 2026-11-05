import { Clock, Mail, MapPin, Phone, Sparkles } from "lucide-react";
import { PageHero, Section } from "@/components/ui";
import { ContactForm } from "@/components/contact-form";
import { site, whatsappLink } from "@/content/site";
import { BrandIcon } from "@/components/social-icons";
import { AskAssistantButton } from "@/components/assistant/ask-button";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Contact Us",
  description: "Contact King Ceasor University on Bunga Hill, Kampala: phone, WhatsApp, email, directions and enquiry form.",
  path: "/contact",
});

function WhatsAppIcon({ className }: { className?: string }) {
  return <BrandIcon name="whatsapp" className={className} />;
}

export default function ContactPage() {
  const channels = [
    { icon: Phone, title: "Call us", value: site.contact.phone, href: site.contact.phoneHref },
    { icon: Phone, title: "Call us (second line)", value: site.contact.phone2, href: site.contact.phone2Href },
    { icon: WhatsAppIcon, title: "WhatsApp", value: site.whatsapp.display, href: whatsappLink() },
    { icon: Mail, title: "General enquiries", value: site.contact.email, href: `mailto:${site.contact.email}` },
    { icon: Mail, title: "Information", value: site.contact.email2, href: `mailto:${site.contact.email2}` },
    { icon: Mail, title: "Admissions", value: site.contact.admissionsEmail, href: `mailto:${site.contact.admissionsEmail}` },
  ];

  return (
    <>
      <PageHero crumbs={[{ label: "Contact" }]} eyebrow="Contact" title="We'd love to hear from you" intro="Questions about programmes, fees or visiting campus? Our team is happy to help." image="/images/home/campus-welcome.webp" />
      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {channels.map((c) => (
            <a
              key={c.title}
              href={c.href}
              {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group rounded-2xl border border-slate-200 p-6 transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-lift"
            >
              <span className="grid size-12 place-items-center rounded-xl bg-slate-50 text-slate-600 transition group-hover:bg-primary-600 group-hover:text-white">
                <c.icon className="size-5" aria-hidden />
              </span>
              <p className="mt-5 text-sm text-slate-500">{c.title}</p>
              <p className="mt-0.5 break-words font-semibold text-ink">{c.value}</p>
            </a>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-4 rounded-2xl bg-brand-50 ring-1 ring-brand-100 p-6 text-ink sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-gold-400 text-ink"><Sparkles className="size-6" aria-hidden /></span>
            <div>
              <p className="text-lg font-semibold">Get an answer right now</p>
              <p className="mt-1 text-slate-600">The KCU Assistant answers questions about programmes, fees, requirements and intakes, day or night.</p>
            </div>
          </div>
          <AskAssistantButton variant="outline" className="shrink-0">Ask the KCU Assistant</AskAssistantButton>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="text-2xl sm:text-3xl">Send us a message</h2>
            <p className="mt-2 mb-8 text-slate-600">We reply within one working day.</p>
            <ContactForm />
          </div>
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-2xl bg-surface">
              <iframe
                title="Map showing King Ceasor University on Bunga Hill, Kampala"
                src="https://www.google.com/maps?q=King+Ceasor+University+Bunga+Kampala&output=embed"
                className="h-72 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="space-y-4 p-6 sm:p-8">
                <p className="flex gap-3"><MapPin className="mt-1 size-5 shrink-0 text-slate-500" aria-hidden /><span><strong className="block text-ink">Main campus</strong>{site.contact.address}</span></p>
                <p className="flex gap-3"><Clock className="mt-1 size-5 shrink-0 text-slate-500" aria-hidden /><span><strong className="block text-ink">Office hours</strong>{site.contact.hours}</span></p>
                <a href={site.contact.mapUrl} target="_blank" rel="noopener noreferrer" className="inline-flex font-semibold text-ink underline-offset-4 hover:underline">
                  Get directions ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
