"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import type { ProofPoint } from "@/content/proof";

const INTERVAL = 7000;

/** The gold proof panel in the homepage action band (benchmark: ASU's rankings panel). */
export function ProofRotator({ points }: { points: ProofPoint[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hover, setHover] = useState(false);
  const p = points[index];

  useEffect(() => {
    if (paused || hover || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => setIndex((i) => (i + 1) % points.length), INTERVAL);
    return () => window.clearTimeout(t);
  }, [index, paused, hover, points.length]);

  const go = (step: number) => setIndex((i) => (i + step + points.length) % points.length);

  return (
    <div
      className="flex h-full min-h-[22rem] flex-col justify-between bg-gold-400 p-7 text-ink sm:p-9"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-roledescription="carousel"
      aria-label="Why KCU, in numbers"
    >
      <div key={index} className="animate-fade-up" aria-live={paused ? "polite" : "off"}>
        <p className="heading text-6xl leading-none tracking-tight sm:text-7xl">{p.big}</p>
        <p className="heading mt-4 max-w-sm text-xl leading-snug sm:text-2xl">{p.line}</p>
        <p className="mt-4 inline-block bg-ink px-2 py-1 text-xs font-semibold text-white">{p.source}</p>
      </div>
      <div className="mt-8 flex items-center gap-2">
        <button type="button" onClick={() => go(-1)} className="grid size-10 place-items-center rounded-full bg-white/70 transition hover:bg-white" aria-label="Previous">
          <ChevronLeft className="size-5" aria-hidden />
        </button>
        <button type="button" onClick={() => setPaused((v) => !v)} className="grid size-10 place-items-center rounded-full bg-white/70 transition hover:bg-white" aria-label={paused ? "Play" : "Pause"} aria-pressed={paused}>
          {paused ? <Play className="ml-0.5 size-4 fill-current" aria-hidden /> : <Pause className="size-4 fill-current" aria-hidden />}
        </button>
        <button type="button" onClick={() => go(1)} className="grid size-10 place-items-center rounded-full bg-white/70 transition hover:bg-white" aria-label="Next">
          <ChevronRight className="size-5" aria-hidden />
        </button>
        <span className="ml-2 text-sm font-semibold tabular-nums">
          {index + 1} / {points.length}
        </span>
        {p.href && (
          <Link href={p.href} className="ml-auto inline-flex items-center gap-1 whitespace-nowrap text-sm font-bold underline underline-offset-4">
            Learn more <ArrowRight className="size-4" aria-hidden />
          </Link>
        )}
      </div>
    </div>
  );
}
