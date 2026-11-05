import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CtaBand, PageHero, Section } from "@/components/ui";
import { ProgrammeFinder } from "@/components/programme-finder";
import { programmes } from "@/content/programmes";

export const metadata: Metadata = {
  alternates: { canonical: "/programmes" },
  title: "Find a Programme",
  description: "Search and compare degrees, diplomas and short courses at King Ceasor University.",
};

export default function ProgrammesPage() {
  return (
    <>
      <PageHero crumbs={[{ label: "Programmes" }]}
        eyebrow="Study at KCU"
        title="Find your programme"
        intro={`Explore ${programmes.length} degrees, diplomas and professional courses across our three schools. Compare duration, fees and entry requirements in one place.`}
        image="/images/kcu-2026/library-group-study.webp"
      />
      <Section className="!pt-10">
        <Suspense>
          <ProgrammeFinder />
        </Suspense>
        <Link href="/postgraduate" className="group mt-12 flex flex-col gap-2 rounded-2xl bg-brand-50 p-6 ring-1 ring-brand-100 transition hover:ring-primary-600 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <span>
            <span className="heading block text-xl text-ink">Looking for postgraduate study?</span>
            <span className="mt-1 block text-slate-600">Master&apos;s programmes are being developed, subject to NCHE accreditation. Register your interest to hear first.</span>
          </span>
          <span className="inline-flex shrink-0 items-center gap-1.5 font-semibold text-primary-700">Register interest <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden /></span>
        </Link>
      </Section>
      <CtaBand title="Not sure which programme fits?" text="Our admissions team can help you choose based on your grades, interests and career goals." />
    </>
  );
}
