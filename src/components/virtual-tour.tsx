"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, MapPin, Minimize2 } from "lucide-react";
import type { TourStop } from "@/content/virtual-tour";
import { asset, cn } from "@/lib/utils";

/** A guided walk through campus: one stop at a time, with arrow-key, swipe and thumbnail navigation. */
export function VirtualTour({ stops }: { stops: TourStop[] }) {
  const [index, setIndex] = useState(0);
  const [full, setFull] = useState(false);
  const frame = useRef<HTMLDivElement>(null);
  const touch = useRef<number | null>(null);
  const stop = stops[index];

  const go = useCallback((step: number) => setIndex((i) => (i + step + stops.length) % stops.length), [stops.length]);

  // Links such as /visit/virtual-tour#library (from the campus map) open at that stop.
  useEffect(() => {
    const fromHash = () => {
      const i = stops.findIndex((s) => s.slug === window.location.hash.slice(1));
      if (i >= 0) setIndex(i);
    };
    const frame = requestAnimationFrame(fromHash);
    window.addEventListener("hashchange", fromHash);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", fromHash);
    };
  }, [stops]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!frame.current?.contains(document.activeElement) && !full) return;
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    const onFull = () => setFull(document.fullscreenElement === frame.current);
    window.addEventListener("keydown", onKey);
    document.addEventListener("fullscreenchange", onFull);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("fullscreenchange", onFull);
    };
  }, [go, full]);

  const toggleFull = () => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    else frame.current?.requestFullscreen?.().catch(() => {});
  };

  return (
    <div>
      <div
        ref={frame}
        tabIndex={0}
        aria-roledescription="carousel"
        aria-label="Virtual campus tour"
        className={cn("group relative overflow-hidden rounded-2xl bg-slate-900 outline-none focus-visible:ring-4 focus-visible:ring-gold-400", full && "flex h-screen flex-col rounded-none")}
        onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touch.current === null) return;
          const dx = e.changedTouches[0].clientX - touch.current;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          touch.current = null;
        }}
      >
        {/* Photo: the caption sits below it on phones and over it on larger screens. */}
        <div className={cn("relative", full ? "flex-1" : "aspect-[4/3] sm:aspect-[16/9]")}>
          {stops.map((s, i) => (
            <div key={s.slug} className={cn("absolute inset-0 transition-opacity duration-700", i === index ? "opacity-100" : "opacity-0")} aria-hidden={i !== index}>
              <Image
                src={asset(s.image)}
                alt={s.alt}
                fill
                sizes="100vw"
                priority={i === 0}
                loading={i === 0 ? undefined : "lazy"}
                className={cn("object-cover motion-safe:transition-transform motion-safe:duration-[9000ms] motion-safe:ease-out", i === index ? "scale-110" : "scale-100")}
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-transparent sm:bg-gradient-to-t sm:from-black/80 sm:via-black/20 sm:to-transparent" />

          <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-3 p-3 sm:p-6">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1.5 text-xs font-medium text-white backdrop-blur sm:text-sm">
              <MapPin className="size-4 text-gold-300" aria-hidden /> Stop {index + 1} of {stops.length} · {stop.area}
            </span>
            <button type="button" onClick={toggleFull} className="grid size-10 place-items-center rounded-full bg-black/40 text-white backdrop-blur transition hover:bg-black/60" aria-label={full ? "Exit full screen" : "Full screen"}>
              {full ? <Minimize2 className="size-4" aria-hidden /> : <Maximize2 className="size-4" aria-hidden />}
            </button>
          </div>

          <button type="button" onClick={() => go(-1)} className="absolute left-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink shadow-lift transition hover:bg-white sm:left-5 sm:size-12" aria-label="Previous stop">
            <ChevronLeft className="size-6" aria-hidden />
          </button>
          <button type="button" onClick={() => go(1)} className="absolute right-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-gold-400 text-ink shadow-lift transition hover:bg-gold-300 sm:right-5 sm:size-12" aria-label="Next stop">
            <ChevronRight className="size-6" aria-hidden />
          </button>
        </div>

        <div className="relative p-5 sm:pointer-events-none sm:absolute sm:inset-x-0 sm:bottom-0 sm:p-8 sm:pr-24 lg:p-10" aria-live="polite">
          <div key={stop.slug} className="max-w-2xl animate-fade-up sm:pointer-events-auto">
            <h3 className="text-2xl text-white sm:text-4xl">{stop.title}</h3>
            <p className="mt-3 text-white/85 sm:text-lg">{stop.text}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {stop.facts.map((f) => (
                <li key={f} className="rounded-full bg-white/15 px-3 py-1 text-sm font-medium text-white backdrop-blur">{f}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <ol className="mt-4 flex gap-3 overflow-x-auto pb-2" aria-label="Tour stops">
        {stops.map((s, i) => (
          <li key={s.slug} className="shrink-0">
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-current={i === index ? "step" : undefined}
              className={cn("group/t relative block h-20 w-32 overflow-hidden rounded-xl ring-2 transition sm:h-24 sm:w-40", i === index ? "ring-primary-600" : "ring-transparent opacity-70 hover:opacity-100")}
            >
              <Image src={asset(s.image)} alt="" fill sizes="160px" className="object-cover" />
              <span className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
              <span className="absolute inset-x-2 bottom-1.5 text-left text-xs font-semibold leading-tight text-white">
                {i + 1}. {s.title}
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
