import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { CtaBand, PageHero, Section } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { schools } from "@/content/schools";
import { programmes } from "@/content/programmes";

export const metadata: Metadata = {
  title: "Our Schools",
  description: "King Ceasor University's three schools: Medicine, Health & Life Sciences; Law & Management Sciences; Science, Computing & Engineering.",
};

export default function SchoolsPage() {
  return (
    <>
      <PageHero
        eyebrow="Academics"
        title="Our schools"
        intro="Three schools that combine academic depth with practical training, clinical and industry partners, and a strong sense of community."
        image="/images/kcu-2026/anatomy-learning-group.webp"
      />
      <Section>
        <div className="space-y-16 lg:space-y-24">
          {schools.map((school, i) => (
            <Reveal key={school.slug}>
              <article className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
                <div className={`relative aspect-[4/3] overflow-hidden rounded-2xl ${i % 2 ? "lg:order-2" : ""}`}>
                  <Image src={school.image} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
                </div>
                <div>
                  <p className="eyebrow">{programmes.filter((p) => p.school === school.slug).length} programmes</p>
                  <h2 className="mt-3 text-3xl sm:text-4xl">{school.name}</h2>
                  <p className="mt-4 text-lg text-slate-600">{school.description[0]}</p>
                  <ul className="mt-6 space-y-2.5">
                    {school.highlights.map((h) => (
                      <li key={h} className="flex gap-3">
                        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary-500" aria-hidden />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/schools/${school.slug}`}
                    className="group mt-8 inline-flex h-11 items-center gap-2 rounded-full bg-primary-600 px-5 text-sm font-semibold text-white transition hover:bg-primary-700"
                  >
                    Explore the school <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
