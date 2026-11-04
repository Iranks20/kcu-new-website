import { PageHero, Section } from "./ui";

/** Shared layout for policy pages: a plain hero, a "last updated" line and long-form text. */
export function LegalPage({ title, intro, updated, children }: { title: string; intro: string; updated: string; children: React.ReactNode }) {
  return (
    <>
      <PageHero eyebrow="Policies" title={title} intro={intro} />
      <Section>
        <div className="mx-auto max-w-3xl">
          <p className="text-sm text-slate-500">Last updated {updated}</p>
          <div className="prose-kcu mt-6">{children}</div>
        </div>
      </Section>
    </>
  );
}
