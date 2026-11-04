import { Button, CtaBand, Section } from "@/components/ui";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CampusTour } from "@/components/campus-tour";
import { VirtualTour } from "@/components/virtual-tour";
import { ShareButtons } from "@/components/share-buttons";
import { tourStops } from "@/content/virtual-tour";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Virtual Campus Tour",
  description: "Take a virtual tour of King Ceasor University: clinical skills lab, anatomy lab, library, moot court, computing labs and more.",
  path: "/visit/virtual-tour",
  image: "/media/video/kcu-campus-aerial.webp",
});

export default function VirtualTourPage() {
  return (
    <>
      <section className="bg-surface">
        <div className="container-x pb-10 pt-10 sm:pt-14">
          <Breadcrumbs items={[{ label: "Visit", href: "/visit" }, { label: "Virtual tour" }]} />
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl animate-fade-up">
              <p className="eyebrow mb-4">Virtual tour</p>
              <h1 className="text-4xl sm:text-5xl">Walk around KCU from anywhere</h1>
              <p className="mt-5 text-lg text-slate-600">
                Ten stops across Bunga Hill, from the clinical skills lab to the moot court. Use the arrows, swipe on your phone, or press ← and → on your keyboard.
              </p>
            </div>
            <ShareButtons path="/visit/virtual-tour" title="Take a virtual tour of King Ceasor University" />
          </div>
          <div className="mt-10">
            <VirtualTour stops={tourStops} />
          </div>
        </div>
      </section>
      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-3">From the air</p>
            <h2 className="text-3xl sm:text-4xl">See the whole campus in 76 seconds</h2>
            <p className="mt-4 text-lg text-slate-600">Our drone film flies over Bunga Hill and the shores of Lake Victoria. Then book a real visit and walk it yourself.</p>
            <Button href="/visit#book" size="lg" className="mt-6">Book a campus visit</Button>
          </div>
          <div className="lg:col-span-7">
            <CampusTour />
          </div>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
