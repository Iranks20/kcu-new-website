import { site } from "@/content/site";

const icons = {
  facebook: "M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z",
  x: "M17.751 3h3.067l-6.7 7.625L22 21h-6.172l-4.833-6.293L5.464 21H2.395l7.167-8.155L2 3h6.328l4.37 5.752L17.75 3zm-1.076 16.172h1.7L7.404 4.732H5.58l11.094 14.44z",
  linkedin:
    "M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z",
  youtube:
    "M21.58 7.19c-.23-.86-.91-1.54-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42c-.86.23-1.54.91-1.77 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81c.23.86.91 1.54 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42c.86-.23 1.54-.91 1.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81zM10 15V9l5.2 3-5.2 3z",
};

const labels: Record<keyof typeof icons, string> = { facebook: "Facebook", x: "X (Twitter)", linkedin: "LinkedIn", youtube: "YouTube" };

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      {(Object.keys(icons) as (keyof typeof icons)[]).map((key) => (
        <li key={key}>
          <a
            href={site.social[key]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`KCU on ${labels[key]}`}
            className="grid size-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white hover:text-ink"
          >
            <svg viewBox="0 0 24 24" className="size-[18px]" fill="currentColor" aria-hidden>
              <path d={icons[key]} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
