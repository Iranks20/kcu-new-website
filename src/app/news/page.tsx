import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge, Section } from "@/components/ui";
import { NewsList } from "@/components/news-list";
import { news } from "@/content/news";
import { asset, formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "News",
  description: "The latest stories from King Ceasor University: students, research, partnerships and community.",
};

export default function NewsPage() {
  const [lead, ...rest] = news;
  return (
    <>
      <section className="bg-surface pb-16 pt-12 sm:pt-16">
        <div className="container-x">
          <p className="eyebrow">Newsroom</p>
          <h1 className="mt-3 text-4xl sm:text-5xl">News from KCU</h1>
          <Link href={`/news/${lead.slug}`} className="group mt-10 grid overflow-hidden rounded-2xl bg-white shadow-card lg:grid-cols-2">
            <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[26rem]">
              {lead.image && <Image src={asset(lead.image)} alt={lead.imageAlt} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />}
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-10">
              <div className="flex items-center gap-3">
                <Badge>{lead.category}</Badge>
                <time dateTime={lead.date} className="text-sm text-slate-500">{formatDate(lead.date)}</time>
              </div>
              <h2 className="mt-4 text-2xl sm:text-3xl">{lead.title}</h2>
              <p className="mt-4 line-clamp-4 text-slate-600">{lead.excerpt}</p>
              <span className="mt-6 inline-flex items-center gap-2 font-semibold text-ink">
                Read the full story <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </span>
            </div>
          </Link>
        </div>
      </section>
      <Section>
        <NewsList articles={rest} />
      </Section>
    </>
  );
}
