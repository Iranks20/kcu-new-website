import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock, MapPin } from "lucide-react";
import type { NewsArticle } from "@/content/news";
import type { UniEvent } from "@/content/events";
import type { Person } from "@/content/people";
import { levelLabels, type Programme } from "@/content/programmes";
import { schools } from "@/content/schools";
import { asset, dateParts, formatDate, initials } from "@/lib/utils";
import { Badge } from "./ui";

export function NewsCard({ article, featured = false }: { article: NewsArticle; featured?: boolean }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-slate-100 transition duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className={featured ? "relative aspect-[16/10]" : "relative aspect-[16/10]"}>
        {article.image ? (
          <Image
            src={asset(article.image)}
            alt={article.imageAlt}
            fill
            sizes={featured ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="h-full bg-slate-100" />
        )}
        <Badge tone="white" className="absolute left-4 top-4">{article.category}</Badge>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <time dateTime={article.date} className="text-sm text-slate-500">{formatDate(article.date)}</time>
        <h3 className={featured ? "mt-2 text-xl sm:text-2xl" : "mt-2 line-clamp-3 text-lg"}>
          <Link href={`/news/${article.slug}`} className="after:absolute after:inset-0 group-hover:text-primary-700">
            {article.title}
          </Link>
        </h3>
        {featured && <p className="mt-3 line-clamp-3 text-slate-600">{article.excerpt}</p>}
        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-primary-700">
          Read story <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
        </span>
      </div>
    </article>
  );
}

export function EventCard({ event }: { event: UniEvent }) {
  const d = dateParts(event.date);
  return (
    <article className="group relative flex gap-5 rounded-2xl bg-white p-5 shadow-card ring-1 ring-slate-100 transition duration-300 hover:-translate-y-0.5 hover:shadow-lift">
      <div className="flex size-18 shrink-0 flex-col items-center justify-center rounded-xl bg-slate-50 text-primary-700">
        <span className="heading text-2xl">{d.day}</span>
        <span className="text-xs font-semibold uppercase tracking-wider">{d.month}</span>
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-primary-600">{event.category}</p>
        <h3 className="mt-1 text-lg">
          <Link href={`/events/${event.slug}`} className="after:absolute after:inset-0 group-hover:text-primary-700">
            {event.title}
          </Link>
        </h3>
        <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
          <span className="flex items-center gap-1.5"><Clock className="size-3.5" aria-hidden />{event.time}</span>
          <span className="flex items-center gap-1.5"><MapPin className="size-3.5" aria-hidden />{event.location}</span>
        </p>
      </div>
    </article>
  );
}

export function ProgrammeCard({ programme }: { programme: Programme }) {
  const school = schools.find((s) => s.slug === programme.school);
  return (
    <article className="group relative flex h-full flex-col rounded-2xl bg-white p-6 shadow-card ring-1 ring-slate-100 transition duration-300 hover:-translate-y-1 hover:shadow-lift hover:ring-slate-300">
      <div className="flex items-center justify-between gap-3">
        <Badge tone={programme.level === "certificate" ? "slate" : "green"}>{levelLabels[programme.level]}</Badge>
        <span className="flex items-center gap-1 text-sm text-slate-500"><CalendarDays className="size-3.5" aria-hidden />{programme.duration}</span>
      </div>
      <h3 className="mt-4 text-lg leading-snug">
        <Link href={`/programmes/${programme.slug}`} className="after:absolute after:inset-0 group-hover:text-primary-700">
          {programme.title}
        </Link>
      </h3>
      <p className="mt-2 text-sm text-slate-500">{school?.shortName}</p>
      <div className="min-h-6 flex-1" />
      <div className="flex items-end justify-between gap-4 border-t border-slate-100 pt-4">
        <div>
          <p className="text-xs text-slate-500">Tuition per {programme.fees.per}</p>
          <p className="font-semibold text-ink">{programme.fees.local}</p>
        </div>
        <span className="grid size-9 place-items-center rounded-full bg-slate-50 text-primary-700 transition group-hover:bg-primary-600 group-hover:text-white">
          <ArrowRight className="size-4" aria-hidden />
        </span>
      </div>
    </article>
  );
}

export function PersonCard({ person }: { person: Person }) {
  return (
    <figure className="group">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50">
        {person.image ? (
          <Image
            src={asset(person.image)}
            alt={`Portrait of ${person.name}`}
            fill
            sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full place-items-center">
            <span className="heading text-4xl text-primary-300">{initials(person.name)}</span>
          </div>
        )}
      </div>
      <figcaption className="mt-4">
        <p className="font-semibold leading-snug text-ink">{person.name}</p>
        <p className="mt-1 text-sm text-slate-500">{person.role}</p>
      </figcaption>
    </figure>
  );
}
