import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero, Section } from "@/components/ui";
import { ContactForm } from "@/components/contact-form";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact King Ceasor University on Bunga Hill, Kampala: phone, email, directions and enquiry form.",
};

export default function ContactPage() {
  const channels = [
    { icon: Phone, title: "Call us", value: site.contact.phone, href: site.contact.phoneHref },
    { icon: Mail, title: "General enquiries", value: site.contact.email, href: `mailto:${site.contact.email}` },
    { icon: Mail, title: "Admissions", value: site.contact.admissionsEmail, href: `mailto:${site.contact.admissionsEmail}` },
    { icon: MessageCircle, title: "Live chat", value: "Chat with an advisor", href: site.chatUrl },
  ];

  return (
    <>
      <PageHero eyebrow="Contact" title="We'd love to hear from you" intro="Questions about programmes, fees or visiting campus? Our team is happy to help." image="/images/home/whatsapp-campus-welcome-hero.jpeg" />
      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((c) => (
            <a
              key={c.title}
              href={c.href}
              {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group rounded-2xl border border-slate-200 p-6 transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-lift"
            >
              <span className="grid size-12 place-items-center rounded-xl bg-slate-50 text-slate-600 transition group-hover:bg-ink group-hover:text-white">
                <c.icon className="size-5" aria-hidden />
              </span>
              <p className="mt-5 text-sm text-slate-500">{c.title}</p>
              <p className="mt-0.5 break-words font-semibold text-ink">{c.value}</p>
            </a>
          ))}
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
