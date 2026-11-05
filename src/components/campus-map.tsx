"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

// PLACEHOLDER: schematic layout drawn for the presentation, not a survey. Replace positions and names with the
// Estates office's campus plan. Building labels "Block A" and "Block B" are taken from the aerial campus film.
type Place = { id: string; short: string; name: string; kind: "Teaching" | "Services" | "Facilities" | "Arrival"; text: string; x: number; y: number; w: number; h: number; tour?: string };

const places: Place[] = [
  { id: "gate", short: "Main gate", name: "Main gate & security", kind: "Arrival", text: "Visitor entrance from Ggaba Road. Security will sign you in and direct you.", x: 30, y: 290, w: 105, h: 70, tour: "arrival" },
  { id: "parking", short: "Parking", name: "Visitor parking", kind: "Arrival", text: "Free parking for visitors and open-day guests.", x: 150, y: 290, w: 120, h: 70 },
  { id: "admin", short: "Administration", name: "Administration & admissions", kind: "Services", text: "Admissions office, Academic Registrar, Finance and the Dean of Students.", x: 300, y: 260, w: 150, h: 90, tour: "main-campus" },
  { id: "block-a", short: "Block A", name: "Block A", kind: "Teaching", text: "Lecture rooms and school offices.", x: 300, y: 80, w: 170, h: 140 },
  { id: "block-b", short: "Block B · Labs", name: "Block B: laboratories", kind: "Teaching", text: "Clinical skills, anatomy and science laboratories.", x: 500, y: 80, w: 170, h: 140, tour: "clinical-skills" },
  { id: "library", short: "Library", name: "University Library", kind: "Facilities", text: "Collections, study spaces and computers with internet access.", x: 500, y: 260, w: 150, h: 90, tour: "library" },
  { id: "moot", short: "Moot court", name: "Moot Court Room", kind: "Teaching", text: "Courtroom for law students' moots and competitions.", x: 690, y: 260, w: 110, h: 90, tour: "moot-court" },
  { id: "computing", short: "Computing", name: "Computing & cyber labs", kind: "Teaching", text: "Programming, networking, cyber security and digital forensics labs.", x: 700, y: 80, w: 100, h: 140, tour: "computing" },
  { id: "sports", short: "Sports ground", name: "Sports ground", kind: "Facilities", text: "Football and outdoor sports for students and staff.", x: 150, y: 60, w: 130, h: 170, tour: "sports" },
];

const kindColour: Record<Place["kind"], string> = {
  Teaching: "#0b6232",
  Services: "#b07520",
  Facilities: "#1d6fa5",
  Arrival: "#64748b",
};

/** A schematic campus map: tap a building on the map or in the list to see what's inside. */
export function CampusMap() {
  const [active, setActive] = useState(places[0].id);
  const current = places.find((p) => p.id === active)!;

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-8">
        <div className="overflow-hidden rounded-2xl bg-[#eef3ef] ring-1 ring-slate-200">
          <svg viewBox="0 0 840 400" role="img" aria-label="Schematic map of the KCU campus" className="block h-auto w-full">
            <rect x="0" y="370" width="840" height="30" fill="#d4d9d6" />
            <text x="20" y="390" fontSize="13" fill="#475569" fontWeight="600">Ggaba Road</text>
            <path d="M85 350 V 245 H 820" stroke="#ffffff" strokeWidth="18" fill="none" strokeLinecap="round" />
            {places.map((p, i) => {
              const on = p.id === active;
              return (
                <g key={p.id} onClick={() => setActive(p.id)} className="cursor-pointer" role="button" tabIndex={0} aria-label={p.name} aria-pressed={on} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setActive(p.id)}>
                  <rect x={p.x} y={p.y} width={p.w} height={p.h} rx="10" fill={on ? kindColour[p.kind] : "#ffffff"} stroke={kindColour[p.kind]} strokeWidth={on ? 0 : 2} className="transition-all" />
                  <circle cx={p.x + 18} cy={p.y + 18} r="11" fill={on ? "#ffffff" : kindColour[p.kind]} />
                  <text x={p.x + 18} y={p.y + 22.5} textAnchor="middle" fontSize="12" fontWeight="700" fill={on ? kindColour[p.kind] : "#ffffff"}>{i + 1}</text>
                  <text x={p.x + 10} y={p.y + p.h - 12} fontSize="13" fontWeight="600" fill={on ? "#ffffff" : "#0f1a15"}>
                    {p.short}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600">
          {(Object.keys(kindColour) as Place["kind"][]).map((k) => (
            <li key={k} className="flex items-center gap-2">
              <span className="size-3 rounded-sm" style={{ background: kindColour[k] }} /> {k}
            </li>
          ))}
          <li className="text-slate-400">Schematic, not to scale</li>
        </ul>
      </div>

      <div className="lg:col-span-4">
        <div className="rounded-2xl border border-slate-200 border-t-4 p-6 shadow-card" style={{ borderTopColor: kindColour[current.kind] }} aria-live="polite">
          <p className="text-sm font-semibold" style={{ color: kindColour[current.kind] }}>{current.kind}</p>
          <h2 className="mt-1 text-2xl">{current.name}</h2>
          <p className="mt-3 text-slate-600">{current.text}</p>
          {current.tour && (
            <Link href={`/visit/virtual-tour#${current.tour}`} className="mt-5 inline-flex items-center gap-1.5 font-semibold text-ink underline-offset-4 hover:underline">
              See it in the virtual tour <ArrowRight className="size-4" aria-hidden />
            </Link>
          )}
        </div>
        <ol className="mt-4 divide-y divide-slate-100 rounded-2xl border border-slate-200">
          {places.map((p, i) => (
            <li key={p.id}>
              <button type="button" onClick={() => setActive(p.id)} aria-pressed={p.id === active} className={cn("flex w-full items-center gap-3 px-4 py-3 text-left text-[0.9375rem] transition", p.id === active ? "bg-brand-50 font-semibold text-ink" : "text-slate-700 hover:bg-surface")}>
                <span className="grid size-6 shrink-0 place-items-center rounded-full text-xs font-bold text-white" style={{ background: kindColour[p.kind] }}>{i + 1}</span>
                {p.name}
                {p.id === active && <MapPin className="ml-auto size-4 text-primary-600" aria-hidden />}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
