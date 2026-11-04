import { site, whatsappLink } from "@/content/site";

export const brandIcons = {
  facebook: "M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z",
  x: "M17.751 3h3.067l-6.7 7.625L22 21h-6.172l-4.833-6.293L5.464 21H2.395l7.167-8.155L2 3h6.328l4.37 5.752L17.75 3zm-1.076 16.172h1.7L7.404 4.732H5.58l11.094 14.44z",
  linkedin:
    "M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z",
  youtube:
    "M21.58 7.19c-.23-.86-.91-1.54-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42c-.86.23-1.54.91-1.77 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81c.23.86.91 1.54 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42c.86-.23 1.54-.91 1.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81zM10 15V9l5.2 3-5.2 3z",
  whatsapp:
    "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z",
};

export type BrandIconName = keyof typeof brandIcons;

export function BrandIcon({ name, className = "size-[18px]" }: { name: BrandIconName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d={brandIcons[name]} />
    </svg>
  );
}

const links: { key: BrandIconName; label: string; href: string }[] = [
  { key: "facebook", label: "Facebook", href: site.social.facebook },
  { key: "x", label: "X (Twitter)", href: site.social.x },
  { key: "linkedin", label: "LinkedIn", href: site.social.linkedin },
  { key: "youtube", label: "YouTube", href: site.social.youtube },
  { key: "whatsapp", label: "WhatsApp", href: whatsappLink() },
];

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      {links.map((l) => (
        <li key={l.key}>
          <a
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`KCU on ${l.label}`}
            className="grid size-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white hover:text-ink"
          >
            <BrandIcon name={l.key} />
          </a>
        </li>
      ))}
    </ul>
  );
}
