import Image from "next/image";
import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { footerNav } from "@/content/navigation";
import { portals, site } from "@/content/site";
import { SocialLinks } from "./social-icons";
import { NewsletterForm } from "./newsletter-form";

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
          <p className="mt-4 text-sm text-primary-300">Chartered by the Government of Uganda · Accredited by the National Council for Higher Education</p>
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

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-4 pb-24 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between lg:pb-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-5">
            <p>© {new Date().getFullYear()} King Ceasor University. All rights reserved.</p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {portals.map((p) => (
              <li key={p.href}>
                <a href={p.href} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  {p.label.replace(" (Student Portal)", "").replace(" (E-learning)", "")}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
