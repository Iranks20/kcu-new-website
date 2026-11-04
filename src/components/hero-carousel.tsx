"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { Button } from "./ui";
import { AiQuantumArt } from "./ai-quantum-art";
import { cn } from "@/lib/utils";

export type HeroSlide = {
  id: string;
  label: string;
  eyebrow: string;
  title: React.ReactNode;
  text: string;
  /** Photo path, or "ai-quantum" for the generated artwork. */
  image: string;
  imageAlt: string;
  imagePosition?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  /** A short supporting line under the buttons, e.g. an application deadline. */
  note?: string;
};

const INTERVAL = 7000;

export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  // An explicit pause the visitor controls (WCAG 2.2.2), on top of the automatic pause on hover and focus.
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);

  const go = useCallback((i: number) => setIndex((i + slides.length) % slides.length), [slides.length]);
  const running = !hovering && !reducedMotion && !paused;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => go(index + 1), INTERVAL);
    return () => window.clearTimeout(t);
  }, [index, running, go]);

  return (
    <section
      className="relative isolate overflow-hidden bg-primary-950"
      aria-roledescription="carousel"
      aria-label="Highlights"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={() => setHovering(true)}
      onBlur={() => setHovering(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(index + 1);
        if (e.key === "ArrowLeft") go(index - 1);
      }}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
    >
      <div aria-live={running ? "off" : "polite"} className="relative min-h-[40rem] sm:min-h-[42rem] lg:min-h-[min(calc(100svh-7.5rem),52rem)]">
        {slides.map((slide, i) => {
          const active = i === index;
          return (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}: ${slide.label}`}
              aria-hidden={!active}
              inert={!active}
              className={cn("absolute inset-0 transition-opacity duration-1000 ease-out", active ? "z-10 opacity-100" : "z-0 opacity-0")}
            >
              {/* Background */}
              <div className={cn("absolute inset-0 -z-10 transition-transform duration-[8000ms] ease-out", active ? "scale-105" : "scale-100")}>
                {slide.image === "ai-quantum" ? (
                  <AiQuantumArt className="h-full w-full" />
                ) : (
                  <Image
                    src={slide.image}
                    alt={slide.imageAlt}
                    fill
                    priority={i === 0}
                    sizes="100vw"
                    quality={85}
                    className="object-cover"
                    style={{ objectPosition: slide.imagePosition ?? "center" }}
                  />
                )}
              </div>
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/90 via-black/55 to-black/10" />
              <div className="absolute inset-0 -z-10 bg-black/35 lg:hidden" />
              <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-black/75 to-transparent" />

              {/* Content */}
              <div className="container-x flex h-full flex-col justify-center pb-24 pt-16 sm:pb-28">
                {active && (
                  <div className="max-w-2xl animate-fade-up">
                    <p className="eyebrow text-gold-300">{slide.eyebrow}</p>
                    <h2 className="mt-5 text-[2.5rem] leading-[1.05] text-white sm:text-6xl lg:text-7xl">{slide.title}</h2>
                    <p className="mt-6 max-w-xl text-lg text-white/85 sm:text-xl">{slide.text}</p>
                    <div className="mt-9 flex flex-wrap gap-3">
                      <Button href={slide.primary.href} variant="white" size="lg">{slide.primary.label}</Button>
                      {slide.secondary && <Button href={slide.secondary.href} variant="ghost-light" size="lg">{slide.secondary.label}</Button>}
                    </div>
                    {slide.note && <p className="mt-6 text-sm text-white/70">{slide.note}</p>}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Slide indicators */}
      <div className="absolute inset-x-0 bottom-0 z-20">
        <div className="container-x pb-6 sm:pb-8">
          <div className="-ml-1.5 flex items-center">
            {!reducedMotion && (
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? "Play slideshow" : "Pause slideshow"}
                className="mr-2 grid size-8 place-items-center rounded-full border border-white/30 text-white transition hover:bg-white/10"
              >
                {paused ? <Play className="size-3.5 fill-current" aria-hidden /> : <Pause className="size-3.5 fill-current" aria-hidden />}
              </button>
            )}
            <div className="flex items-center" role="tablist" aria-label="Choose a slide">
              {slides.map((slide, i) => (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Slide ${i + 1} of ${slides.length}: ${slide.label}`}
                  onClick={() => go(i)}
                  className="group grid h-8 place-items-center px-1.5"
                >
                  <span
                    className={cn(
                      "block h-1.5 overflow-hidden rounded-full transition-all duration-500",
                      i === index ? "w-8 bg-white/35" : "w-1.5 bg-white/45 group-hover:bg-white/80",
                    )}
                  >
                    {i === index && (
                      <span
                        key={`${index}-${running}`}
                        className="block h-full rounded-full bg-gold-400"
                        style={running ? { animation: `carousel-progress ${INTERVAL}ms linear forwards` } : { width: "100%" }}
                      />
                    )}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
