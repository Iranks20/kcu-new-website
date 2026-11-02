import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Badge, Section, SectionHeading } from "@/components/ui";
import { NewsCard } from "@/components/cards";
import { getArticle, news } from "@/content/news";
import { asset, formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: PageProps<"/news/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  return a ? { title: a.title, description: a.excerpt, openGraph: a.image ? { images: [asset(a.image)] } : undefined } : {};
}

export default async function ArticlePage({ params }: PageProps<"/news/[slug]">) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const related = news.filter((n) => n.category === article.category && n.slug !== article.slug).slice(0, 3);

  return (
    <>
      <article>
        <header className="container-x max-w-4xl pt-10 sm:pt-14">
          <Link href="/news" className="inline-flex items-center gap-2 text-sm font-semibold text-ink underline-offset-4 hover:underline">
            <ArrowLeft className="size-4" aria-hidden /> All news
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Badge>{article.category}</Badge>
            <time dateTime={article.date} className="text-sm text-slate-500">{formatDate(article.date)}</time>
          </div>
          <h1 className="mt-4 text-3xl leading-tight sm:text-4xl lg:text-5xl">{article.title}</h1>
          <p className="mt-5 text-xl text-slate-600">{article.excerpt}</p>
        </header>

        {article.image && (
          <div className="container-x mt-10 max-w-6xl">
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-surface">
              <Image src={asset(article.image)} alt={article.imageAlt} fill priority sizes="(min-width: 1152px) 1152px, 100vw" className="object-cover" />
            </div>
          </div>
        )}

        <div className="container-x mt-12 grid max-w-6xl gap-12 lg:grid-cols-12">
          <div className="prose-kcu lg:col-span-8">
            {article.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
            {article.externalUrl && (
              <p>
                <a href={article.externalUrl} target="_blank" rel="noopener noreferrer">Read more ↗</a>
              </p>
            )}
          </div>
          {article.highlights && article.highlights.length > 0 && (
            <aside className="lg:col-span-4">
              <div className="rounded-2xl bg-surface p-6 lg:sticky lg:top-28">
                <h2 className="text-lg">At a glance</h2>
                <dl className="mt-4 divide-y divide-slate-200">
                  {article.highlights.map((h) => (
                    <div key={h.label} className="py-3">
                      <dt className="text-sm text-slate-500">{h.label}</dt>
                      <dd className="mt-0.5 font-medium text-ink">{h.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </aside>
          )}
        </div>

        {article.gallery && article.gallery.length > 0 && (
          <div className="container-x mt-12 max-w-6xl">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {article.gallery.map((g) => (
                <div key={g.src} className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface">
                  <Image src={asset(g.src)} alt={g.alt} fill sizes="(min-width: 640px) 33vw, 50vw" className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}
      </article>

      {related.length > 0 && (
        <Section tone="surface" className="mt-16">
          <SectionHeading title="More stories" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => (
              <NewsCard key={a.slug} article={a} />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
