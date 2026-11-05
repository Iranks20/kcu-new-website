"use client";

import { useSyncExternalStore } from "react";

const buildTime = Number(process.env.BUILD_TIME) || 0;
let now = 0;
const read = () => now || (now = Date.now());
const subscribe = (notify: () => void) => {
  const t = window.setInterval(() => {
    now = Date.now();
    notify();
  }, 60_000);
  return () => window.clearInterval(t);
};

/** Days, hours and minutes left until a deadline (end of that day, Kampala time). */
export function Countdown({ deadline, className }: { deadline: string; className?: string }) {
  const current = useSyncExternalStore(subscribe, read, () => buildTime);
  const left = Math.max(0, Date.parse(`${deadline}T23:59:59+03:00`) - current);
  const parts = [
    { value: Math.floor(left / 86_400_000), label: "days" },
    { value: Math.floor((left / 3_600_000) % 24), label: "hours" },
    { value: Math.floor((left / 60_000) % 60), label: "minutes" },
  ];

  if (left === 0) return <p className={className}>Applications for this intake have closed.</p>;
  return (
    <dl className={className} aria-label="Time left to apply">
      <div className="flex gap-3">
        {parts.map((p) => (
          <div key={p.label} className="flex min-w-20 flex-col-reverse rounded-xl bg-white px-4 py-3 text-center shadow-card ring-1 ring-slate-100">
            <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">{p.label}</dt>
            <dd className="heading text-3xl tabular-nums text-primary-600 sm:text-4xl">{p.value}</dd>
          </div>
        ))}
      </div>
    </dl>
  );
}
