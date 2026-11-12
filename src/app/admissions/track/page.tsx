import { ArrowUpRight, Lock } from "lucide-react";
import { CtaBand, PageHero, Section } from "@/components/ui";
import { AskAssistantButton } from "@/components/assistant/ask-button";
import { site, whatsappLink } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Track My Application",
  description: "Check the status of your King Ceasor University application and what each stage means.",
  path: "/admissions/track",
});

// PLACEHOLDER: stage names and timings to be confirmed with the Admissions Office; live status comes with the backend.
const stages = [
  { title: "Submitted", text: "Your form and documents have reached the Admissions Office. You receive a confirmation email." },
  { title: "Application fee confirmed", text: "Your payment has been matched to your application, usually within two working days." },
  { title: "Under review", text: "Your school checks your results against the entry requirements. Foreign results may need NCHE equation." },
  { title: "Decision", text: "Successful applicants receive an admission letter by email, usually within two weeks of a complete application." },
  { title: "Accept and register", text: "Pay your first instalment, then register on the Academia portal and join orientation week." },
];

export default function TrackPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Admissions", href: "/admissions" }, { label: "Track my application" }]}
        eyebrow="Admissions"
        title="Track my application"
        intro="See where your application is and what happens next."
      />
      <Section className="!pt-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-slate-200 border-t-4 border-t-primary-600 p-6 shadow-card sm:p-8">
              <span className="inline-flex shrink-0 text-primary-600"><Lock className="size-5" aria-hidden /></span>
              <h2 className="mt-5 text-2xl">Check your status</h2>
              <p className="mt-2 text-slate-600">
                To keep your details private, your live application status is shown after you sign in to the application portal with the account you applied with.
              </p>
              <a href={site.applyUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary-600 font-semibold text-white hover:bg-primary-700">
                Sign in to the application portal <ArrowUpRight className="size-4" aria-hidden />
              </a>
              <div className="mt-6 border-t border-slate-100 pt-5 text-sm text-slate-600">
                <p className="font-semibold text-ink">Haven&apos;t heard back?</p>
                <p className="mt-1">
                  If it has been more than two weeks, message admissions with your application number on{" "}
                  <a href={whatsappLink("Hello KCU, I would like an update on my application. My application number is:")} target="_blank" rel="noopener noreferrer" className="font-semibold text-ink underline underline-offset-4">WhatsApp</a>{" "}
                  or email <a href={`mailto:${site.contact.admissionsEmail}`} className="font-semibold text-ink underline underline-offset-4">{site.contact.admissionsEmail}</a>.
                </p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7">
            <h2 className="text-2xl sm:text-3xl">What each stage means</h2>
            <ol className="mt-6">
              {stages.map((s, i) => (
                <li key={s.title} className="relative flex gap-5 pb-8 last:pb-0">
                  {i < stages.length - 1 && <span className="absolute bottom-0 left-[1.0625rem] top-10 w-px bg-slate-200" aria-hidden />}
                  <span className="heading grid size-9 shrink-0 place-items-center rounded-full bg-primary-600 text-sm text-white">{i + 1}</span>
                  <div className="pt-1">
                    <h3 className="text-lg">{s.title}</h3>
                    <p className="mt-1 text-slate-600">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-8">
              <AskAssistantButton question="How do I apply?" />
            </div>
          </div>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
