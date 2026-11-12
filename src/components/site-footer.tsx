import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Clock, Mail, MapPin, Phone } from "lucide-react";
import { footerNav } from "@/content/navigation";
import { site } from "@/content/site";
import { SocialLinks } from "./social-icons";
import { NewsletterForm } from "./newsletter-form";

// Portals live in the top bar and the Students page, and "Report an accessibility problem" is on the Accessibility page,
// so the footer keeps only the copyright and the legal links.
const legalLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Accessibility", href: "/accessibility" },
];

export function SiteFooter() {
  return (
    <footer className="bg-primary-950 text-primary-100 print:hidden">
      <div className="container-x grid grid-cols-1 gap-12 py-16 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4">
          <Image src="/brand/kcu-logo-light.png" alt="King Ceasor University" width={560} height={210} className="h-14 w-auto" />
          <p className="mt-6 max-w-sm">
            A chartered university on Bunga Hill, Kampala, preparing globally competitive professionals in health, law, business,
            computing and energy.
          </p>
          <SocialLinks className="mt-6" />
          <div className="mt-10 max-w-sm border-t border-white/10 pt-8">
            <NewsletterForm />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
          {footerNav.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">{group.title}</h3>
              <ul className="mt-4 space-y-2.5 text-[0.9375rem]">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="lg:col-span-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Get in touch</h3>
          <ul className="mt-4 space-y-3.5 text-[0.9375rem]">
            <li className="flex gap-3">
              <MapPin className="mt-1 size-4 shrink-0 text-gold-400" aria-hidden />
              <a href={site.contact.mapUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                {site.contact.address}
              </a>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-1 size-4 shrink-0 text-gold-400" aria-hidden />
              <span>
                <a href={site.contact.phoneHref} className="hover:text-white">{site.contact.phone}</a>,{" "}
                <a href={site.contact.phone2Href} className="hover:text-white">{site.contact.phone2}</a>
              </span>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-1 size-4 shrink-0 text-gold-400" aria-hidden />
              <span>
                <a href={`mailto:${site.contact.email}`} className="hover:text-white">{site.contact.email}</a>,{" "}
                <a href={`mailto:${site.contact.email2}`} className="hover:text-white">{site.contact.email2}</a>
              </span>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-1 size-4 shrink-0 text-gold-400" aria-hidden />
              <span>{site.contact.hours}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Gold strip, the footer's last layer: copyright, legal links and the charter badge (benchmark: ASU footer bar) */}
      <div className="bg-gold-400 text-ink">
        <div className="container-x flex flex-col gap-5 pb-24 pt-6 lg:flex-row lg:items-center lg:justify-between lg:pb-6">
          <div className="flex flex-col gap-2 text-sm sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
            <p className="font-semibold">© {new Date().getFullYear()} King Ceasor University</p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 font-bold">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="underline-offset-4 hover:underline">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <Link href="/about#accreditation" className="flex items-center gap-3">
            <span className="heading text-xl leading-tight sm:text-2xl">
              We are a <span className="block sm:inline">Chartered University</span>
            </span>
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white">
              <BadgeCheck className="size-7 text-primary-600" aria-hidden />
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
