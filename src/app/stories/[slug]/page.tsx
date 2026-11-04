import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import { Button, CtaBand, Section, SectionHeading } from "@/components/ui";
import { Avatar, SampleLabel, StoryCard } from "@/components/cards";
import { getStory, stories } from "@/content/stories";
import { getProgramme } from "@/content/programmes";
import { asset } from "@/lib/utils";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ShareButtons } from "@/components/share-buttons";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/stories/[slug]">) {
  const { slug } = await params;
  const story = getStory(slug);
  return story ? pageMeta({ title: `${story.name}: ${story.stage}`, description: story.summary, path: `/stories/${story.slug}`, image: story.image }) : {};
}

export default async function StoryPage({ params }: PageProps<"/stories/[slug]">) {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) notFound();
  const programme = getProgramme(story.programme);
  const more = stories.filter((s) => s.slug !== story.slug).slice(0, 3);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-primary-950 text-white">
        <Image src={asset(story.image)} alt={story.imageAlt} fill priority sizes="100vw" className="-z-10 object-cover opacity-35" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary-950 via-primary-950/80 to-primary-950/30" />
        <div className="container-x py-12 sm:py-16 lg:py-24">
          <Breadcrumbs dark items={[{ label: "Student stories", href: "/stories" }, { label: story.name }]} className="mb-8" />
          <div className="max-w-3xl animate-fade-up">
            <div className="flex flex-wrap items-center gap-3">
              <p className="eyebrow text-gold-300">Student stories</p>
              {story.sample && <SampleLabel />}
            </div>
            <blockquote className="heading mt-6 text-3xl leading-tight text-white sm:text-5xl">“{story.quote}”</blockquote>
            <div className="mt-8 flex items-center gap-4">
              <Avatar name={story.name} tone="gold" className="size-14 text-lg" />
              <div>
                <h1 className="text-xl text-white">{story.name}</h1>
                <p className="flex flex-wrap items-center gap-x-3 text-white/75">
                  {story.stage}
                  <span className="inline-flex items-center gap-1"><MapPin className="size-3.5" aria-hidden />{story.from}</span>
                </p>
              </div>
            </div>
            <ShareButtons dark path={`/stories/${story.slug}`} title={`${story.name}: ${story.stage} at King Ceasor University`} className="mt-8" />
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="text-2xl sm:text-3xl">A day in the life</h2>
            <ol className="mt-8">
              {story.day.map((d, i) => (
                <li key={d.time} className="relative flex gap-5 pb-7 last:pb-0">
                  {i < story.day.length - 1 && <span className="absolute bottom-0 left-[2.375rem] top-8 w-px bg-slate-200" aria-hidden />}
                  <span className="w-[4.75rem] shrink-0 pt-0.5 text-right text-sm font-semibold tabular-nums text-primary-600">{d.time}</span>
                  <p className="text-slate-700">{d.text}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="space-y-10 lg:col-span-7">
            <p className="text-xl leading-relaxed text-ink">{story.summary}</p>
            {story.body.map((b) => (
              <div key={b.heading}>
                <h2 className="text-2xl">{b.heading}</h2>
                <p className="mt-3 text-lg leading-8 text-slate-700">{b.text}</p>
              </div>
            ))}
            {programme && (
              <div className="rounded-2xl bg-surface p-6 sm:p-8">
                <p className="text-sm font-medium text-slate-500">{story.name.split(" ")[0]} studies</p>
                <p className="heading mt-1 text-xl text-ink">{programme.title}</p>
                <p className="mt-1 text-slate-600">{programme.duration} · {programme.modes.join(", ")}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Button href={`/programmes/${programme.slug}`}>Explore the programme</Button>
                  <Link href="/stories" className="inline-flex h-11 items-center px-2 text-sm font-semibold text-ink underline-offset-4 hover:underline">More stories</Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading title="More student stories" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {more.map((s) => (
            <StoryCard key={s.slug} story={s} />
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
