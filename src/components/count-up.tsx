"use client";

import { useEffect, useRef, useState } from "react";

const DURATION = 1600;

/**
 * Counts a figure such as "2,000+" up from zero the first time it scrolls into view.
 * The final value is what renders on the server, so the number is right without JavaScript.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const match = value.match(/^(\D*)([\d,]+)(.*)$/);
  const target = match ? Number(match[2].replace(/,/g, "")) : NaN;
  const [shown, setShown] = useState<number | null>(null);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !Number.isFinite(target) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Only animate figures the visitor has not seen yet.
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    setShown(0);
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / DURATION, 1);
        setShown(Math.round(target * (1 - Math.pow(1 - t, 3))));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target]);

  if (!match || shown === null) return <span ref={ref} className={className}>{value}</span>;
  return (
    <span ref={ref} className={className}>
      {match[1]}
      {shown.toLocaleString("en-US")}
      {match[3]}
    </span>
  );
}
