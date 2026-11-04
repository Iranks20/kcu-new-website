// The KCU Assistant's answers, worked out in the browser from the website's own content.
//
// PLACEHOLDER: this is a rule-based stand-in for the presentation. The production chatbot will call an AI model
// over the same content (and the backend for application status); keep `respond`'s shape so the UI can stay.

import { entryRequirements, levelLabels, programmes, type Level, type Programme } from "@/content/programmes";
import { schools } from "@/content/schools";
import { scholarships } from "@/content/opportunities";
import { events } from "@/content/events";
import { accommodation } from "@/content/campus";
import { accreditations, applicationSteps, intakes, requiredDocuments } from "@/content/university";
import { management, viceChancellor } from "@/content/people";
import { site, whatsappLink } from "@/content/site";
import type { SearchItem } from "@/content/search";
import { formatDate } from "@/lib/utils";

export type ChatLink = { label: string; href: string };

export type Reply = {
  /** Light markup: **bold**, [label](href) and lines starting with "- " for bullets. */
  text: string;
  links?: ChatLink[];
  chips?: string[];
};

/** The guided "help me apply" conversation. */
export type Flow =
  | { step: "level" }
  | { step: "area"; level: Level }
  | { step: "programme"; level: Level; area: string }
  | { step: "requirements"; programme: string }
  | { step: "documents"; programme: string };

export type Context = { index: SearchItem[] | null };

export const welcome: Reply = {
  text: `Hi, I'm the **KCU Assistant**. I can answer questions about programmes, fees, entry requirements, intakes, scholarships and campus life, or walk you through your application step by step.`,
  chips: ["Help me apply", "What courses do you offer?", "Fees for nursing", "When is the next intake?"],
};

const START_FLOW = /\b(help me apply|start (my )?application|guide me|apply step by step|i want to apply|walk me through)\b/;

const areas = [
  { label: "Health & medicine", school: "medicine-health-life-sciences" },
  { label: "Law, business & economics", school: "law-management-sciences" },
  { label: "Computing, science & engineering", school: "science-computing-engineering" },
];

const levelChips: { label: string; level: Level }[] = [
  { label: "A degree", level: "degree" },
  { label: "A diploma", level: "diploma" },
  { label: "A bridging certificate", level: "hec" },
  { label: "A short course", level: "certificate" },
];

/** Words people use for programmes that don't appear in the official titles. */
const aliases: [RegExp, string][] = [
  [/\b(mbchb|medicine|doctor|medical school|surgery)\b/, "bachelor-of-medicine-and-bachelor-of-surgery"],
  [/\bnurs(e|ing)\b/, "bachelor-of-nursing-science-direct"],
  [/\b(clinical (medicine|officer)|community health)\b/, "diploma-in-clinical-medicine-and-community-health"],
  [/\b(lab|laboratory)\b/, "diploma-in-medical-laboratory-technology"],
  [/\b(law|llb|lawyer|advocate)\b/, "bachelor-of-laws"],
  [/\b(bba|business administration|business)\b/, "bachelor-of-business-administration"],
  [/\b(economics)\b/, "bachelor-of-applied-economics"],
  [/\b(oil|gas|energy)\b/, "bachelor-of-oil-gas-and-energy-management"],
  [/\b(petroleum|geoscience|geology)\b/, "bachelor-of-science-in-petroleum-geoscience"],
  [/\b(forensics?|criminal investigations?|cyber ?crime)\b/, "bachelor-of-computer-forensics-and-criminal-investigations"],
  [/\b(agric|agriculture|farming)\b/, "bachelor-of-agriculture"],
  [/\b(cyber ?security)\b/, "certificate-in-cyber-security-for-beginners"],
  [/\b(ecg)\b/, "certificate-in-rest-ecg-reading"],
  [/\b(web design|website)\b/, "certificate-in-web-design-development-and-administration"],
  [/\b(digital marketing|marketing)\b/, "certificate-in-digital-marketing"],
  [/\b(english)\b/, "certificate-in-english-proficiency"],
];

const stop = new Set(["the", "and", "for", "with", "how", "much", "what", "are", "fees", "fee", "cost", "of", "in", "a", "to", "is", "do", "i", "you", "bachelor", "certificate", "diploma", "science", "programme", "program", "course"]);

export function findProgramme(q: string): Programme | undefined {
  const exact = programmes.find((p) => q.includes(p.title.toLowerCase()));
  if (exact) return exact;
  const words = q.split(/[^a-z0-9]+/).filter((w) => w.length > 2 && !stop.has(w));
  let best: { p: Programme; score: number } | undefined;
  for (const p of programmes) {
    const title = p.title.toLowerCase();
    const score = words.reduce((s, w) => s + (title.includes(w) ? (w.length > 4 ? 2 : 1) : 0), 0) + (p.level === "degree" ? 0.1 : 0);
    if (score >= 2 && (!best || score > best.score)) best = { p, score };
  }
  if (best) return best.p;
  for (const [re, slug] of aliases) if (re.test(q)) return programmes.find((p) => p.slug === slug);
  return undefined;
}

const per = (p: Programme) => (p.fees.per === "semester" ? "per semester" : "for the course");
const programmeLink = (p: Programme): ChatLink => ({ label: p.title, href: `/programmes/${p.slug}` });
const has = (q: string, re: RegExp) => re.test(q);
const openIntake = intakes.find((i) => i.status === "Open") ?? intakes[0];

function feesReply(p: Programme): Reply {
  return {
    text: `**${p.title}** (${p.duration})\n- East African students: **${p.fees.local}** ${per(p)}\n- International students: **${p.fees.international}** ${per(p)}\n\nInstalment plans are available, and eligible Ugandan students can apply for an HESFB student loan.`,
    links: [programmeLink(p), { label: "Estimate your total cost", href: "/admissions#calculator" }],
    chips: [`Entry requirements for ${shortName(p)}`, "Scholarships", "Help me apply"],
  };
}

function requirementsReply(p: Programme): Reply {
  const subjects = p.subjects?.map((s) => `- ${s}`).join("\n");
  const general = entryRequirements[p.level].map((s) => `- ${s}`).join("\n");
  return {
    text: `To join the **${p.title}**:\n${subjects ? `${subjects}\n\nPlus the general ${levelLabels[p.level].toLowerCase()} requirements:\n` : ""}${general}`,
    links: [programmeLink(p), { label: "All entry requirements", href: "/admissions#requirements" }],
    chips: [`Fees for ${shortName(p)}`, "I don't meet the requirements", "Help me apply"],
  };
}

function programmeReply(p: Programme): Reply {
  return {
    text: `**${p.title}**\n${levelLabels[p.level]} · ${p.duration} · ${p.modes.join(", ")}\n\n${p.overview}\n\nFees: **${p.fees.local}** ${per(p)} (East Africa), ${p.fees.international} (international).`,
    links: [programmeLink(p), { label: "Compare with other programmes", href: `/programmes/compare?p=${p.slug}` }],
    chips: [`Entry requirements for ${shortName(p)}`, `Fees for ${shortName(p)}`, "Help me apply"],
  };
}

const shortName = (p: Programme) =>
  p.title.replace(/^Bachelor of (Science in )?/, "").replace(/^Diploma in /, "").replace(/^Higher Education Certificate - /, "HEC ").replace(/ and Bachelor of Surgery$/, "").replace(/ - Direct$/, "");

function flowReply(flow: Flow): Reply {
  switch (flow.step) {
    case "level":
      return { text: "Great, let's get your application started. It takes about 3 minutes here, then 15 minutes on the application portal.\n\n**What would you like to study?**", chips: [...levelChips.map((l) => l.label), "Not sure yet"] };
    case "area":
      return { text: `A ${levelLabels[flow.level].toLowerCase()}, good choice. **Which area interests you most?**`, chips: areas.map((a) => a.label) };
    case "programme": {
      const list = programmes.filter((p) => p.level === flow.level && p.school === flow.area);
      if (list.length === 0)
        return {
          text: `We don't currently offer a ${levelLabels[flow.level].toLowerCase()} in that area. Here are other options in the same school:`,
          chips: programmes.filter((p) => p.school === flow.area).slice(0, 5).map((p) => p.title),
        };
      return { text: "**Which programme would you like to apply for?**", chips: list.slice(0, 7).map((p) => p.title) };
    }
    case "requirements": {
      const p = programmes.find((x) => x.slug === flow.programme)!;
      const req = (p.subjects ?? entryRequirements[p.level]).map((s) => `- ${s}`).join("\n");
      return { text: `**${p.title}** needs:\n${req}\n\n**Do you meet these requirements?**`, chips: ["Yes, I do", "I'm not sure", "No, I don't"] };
    }
    case "documents": {
      const p = programmes.find((x) => x.slug === flow.programme)!;
      return {
        text: `You're ready to apply. Here's your checklist for the **${p.title}**, ${openIntake.name} (closes ${openIntake.closes}):\n${requiredDocuments.map((d) => `- ${d}`).join("\n")}\n\nTuition is **${p.fees.local}** ${per(p)}. Create an account on the portal, upload your documents and pay the application fee. Most applicants hear back within two weeks.`,
        links: [
          { label: "Open the application portal", href: site.applyUrl },
          { label: "Send my choice to admissions on WhatsApp", href: whatsappLink(`Hello KCU, I'm applying for the ${p.title} (${openIntake.name}). Could you help me with my application?`) },
        ],
        chips: ["Scholarships", "Accommodation", "Start over"],
      };
    }
  }
}

function advanceFlow(flow: Flow, q: string): { reply: Reply; flow: Flow | null } | null {
  if (/\b(start over|restart|cancel|stop)\b/.test(q)) return { reply: flowReply({ step: "level" }), flow: { step: "level" } };
  switch (flow.step) {
    case "level": {
      if (/not sure/.test(q))
        return {
          reply: {
            text: "No problem. In short:\n- **Degree**: 3–5 years, needs UACE with two principal passes\n- **Diploma**: 2–3 years, needs one principal pass\n- **Bridging certificate**: 1 year, a route into a degree if you don't meet direct entry\n- **Short course**: weeks to months, open to everyone\n\nWhich fits you?",
            chips: levelChips.map((l) => l.label),
          },
          flow,
        };
      const pick = levelChips.find((l) => q.includes(l.label.toLowerCase().replace(/^an? /, ""))) ?? levelChips.find((l) => q.includes(l.level));
      if (!pick) return null;
      const next: Flow = { step: "area", level: pick.level };
      return { reply: flowReply(next), flow: next };
    }
    case "area": {
      const pick = areas.find((a) => a.label.toLowerCase().split(/[ ,&]+/).some((w) => w.length > 3 && q.includes(w)));
      if (!pick) return null;
      const next: Flow = { step: "programme", level: flow.level, area: pick.school };
      return { reply: flowReply(next), flow: next };
    }
    case "programme": {
      const p = findProgramme(q);
      if (!p) return null;
      const next: Flow = { step: "requirements", programme: p.slug };
      return { reply: flowReply(next), flow: next };
    }
    case "requirements": {
      if (/\b(yes|i do|meet)\b/.test(q) && !/\bnot\b|don't|dont/.test(q)) {
        const next: Flow = { step: "documents", programme: flow.programme };
        return { reply: flowReply(next), flow: next };
      }
      if (/not sure/.test(q))
        return {
          reply: {
            text: `That's fine. Send your results to admissions on WhatsApp and they'll confirm whether you qualify, usually the same day. Or continue and the admissions team will check your documents.`,
            links: [{ label: "Check my results on WhatsApp", href: whatsappLink("Hello KCU, could you check whether my results qualify me for admission?") }],
            chips: ["Continue anyway", "Start over"],
          },
          flow: { step: "requirements", programme: flow.programme },
        };
      if (/continue/.test(q)) {
        const next: Flow = { step: "documents", programme: flow.programme };
        return { reply: flowReply(next), flow: next };
      }
      if (/\b(no|don't|dont)\b/.test(q))
        return {
          reply: {
            text: "You still have good options:\n- A one-year **Higher Education Certificate** bridges you into a degree\n- **Mature-age entry** if you are 25 or older\n- A **diploma** first, then a degree with credit\n\nWould you like to look at the bridging certificates?",
            links: [{ label: "Bridging certificates", href: "/programmes?level=hec" }],
            chips: ["A bridging certificate", "Start over"],
          },
          flow: { step: "level" },
        };
      return null;
    }
    case "documents":
      return null;
  }
}

/** Works out the assistant's answer to one message. */
export function respond(input: string, flow: Flow | null, ctx: Context): { reply: Reply; flow: Flow | null } {
  const q = input.toLowerCase().trim();

  if (START_FLOW.test(q)) return { reply: flowReply({ step: "level" }), flow: { step: "level" } };
  if (flow) {
    const next = advanceFlow(flow, q);
    if (next) return next;
  }

  const p = findProgramme(q);
  const reply = (r: Reply) => ({ reply: r, flow: null });

  if (has(q, /^(hi|hello|hey|good (morning|afternoon|evening)|habari|oli otya|greetings)\b/))
    return reply({ text: "Hello! How can I help you today?", chips: welcome.chips });
  if (has(q, /\b(thank|thanks|asante|webale)\b/))
    return reply({ text: "You're welcome! Anything else I can help with?", chips: ["Help me apply", "Talk to a person"] });

  if (has(q, /\b(fee|fees|cost|price|tuition|how much|pay|payment)\b/)) {
    if (p) return reply(feesReply(p));
    return reply({
      text: "Fees depend on the programme. Which one are you interested in? You can also see every programme's fees in one table, or estimate your total cost.",
      links: [{ label: "Full fees table", href: "/admissions#fees" }, { label: "Fees calculator", href: "/admissions#calculator" }],
      chips: ["Fees for medicine", "Fees for law", "Fees for nursing", "Fees for computer forensics"],
    });
  }

  if (has(q, /\b(requirement|requirements|qualify|entry|points|grades|subjects|need to join|admission criteria)\b/)) {
    if (has(q, /don'?t meet|not qualify|failed|low grades/)) return advanceFlow({ step: "requirements", programme: "" }, "no") ?? reply(welcome);
    if (p) return reply(requirementsReply(p));
    return reply({
      text: `General requirements by level:\n- **Degree**: ${entryRequirements.degree[1]}\n- **Diploma**: ${entryRequirements.diploma[1]}\n- **Bridging certificate**: ${entryRequirements.hec[0]}\n- **Short courses**: open to everyone\n\nTell me the programme for its exact subject requirements.`,
      links: [{ label: "Entry requirements", href: "/admissions#requirements" }],
      chips: ["Requirements for medicine", "Requirements for law", "Requirements for nursing"],
    });
  }

  if (has(q, /\b(intake|deadline|when|close|closing|start date|begin|next semester|open)\b/) && !has(q, /\b(open day|office hours)\b/))
    return reply({
      text: `Upcoming intakes:\n${intakes.map((i) => `- **${i.name}**: ${i.status.toLowerCase()}, applications close ${i.closes}, classes start ${i.starts}`).join("\n")}`,
      links: [{ label: "Intakes & key dates", href: "/admissions#intakes" }, { label: "Academic calendar", href: "/academic-calendar" }],
      chips: ["Help me apply", "Required documents"],
    });

  if (has(q, /\b(how (do|can) i apply|apply|application|admission|enrol|enroll|register)\b/))
    return reply({
      text: `Applying takes about 15 minutes online:\n${applicationSteps.map((s, i) => `- **${i + 1}. ${s.title}**: ${s.text}`).join("\n")}`,
      links: [{ label: "Apply online", href: site.applyUrl }, { label: "How to apply", href: "/admissions#apply" }],
      chips: ["Help me apply", "Required documents", "Fees"],
    });

  if (has(q, /\b(document|documents|papers|what do i need|checklist)\b/))
    return reply({ text: `Have these ready to upload:\n${requiredDocuments.map((d) => `- ${d}`).join("\n")}`, chips: ["Help me apply", "Fees"] });

  if (has(q, /\b(scholarship|scholarships|loan|hesfb|bursary|sponsor|sponsorship|financial aid|discount|funding)\b/))
    return reply({
      text: `Ways to fund your studies:\n${scholarships.map((s) => `- **${s.title}**: ${s.value}. ${s.for}.`).join("\n")}`,
      links: [{ label: "Scholarships & funding", href: "/scholarships" }],
      chips: ["Help me apply", "Fees"],
    });

  if (has(q, /\b(hostel|hostels|accommodation|room|rooms|stay|housing|residence)\b/))
    return reply({
      text: `KCU works with vetted partner hostels near campus (prices per semester):\n${accommodation.map((a) => `- **${a.name}**: ${a.price}`).join("\n")}\n\nThe Dean of Students' office helps new and international students find a room.`,
      links: [{ label: "Accommodation", href: "/campus-life#accommodation" }],
    });

  if (has(q, /\b(international|foreign|visa|student pass|abroad|kenya|rwanda|somalia|south sudan|congo|drc|tanzania|burundi|nigeria)\b/))
    return reply({
      text: "International students are very welcome. Fees are charged in US dollars, foreign results are equated through NCHE/UNEB, and we help you get your student pass once you accept your offer.",
      links: [{ label: "International students", href: "/international" }],
      chips: ["Fees for medicine", "Accommodation", "Help me apply"],
    });

  if (has(q, /\b(where|location|located|direction|directions|map|address|find you|get there)\b/))
    return reply({
      text: `We're at **${site.contact.address}**, on Bunga Hill overlooking Lake Victoria, about 20 minutes from Kampala city centre along Ggaba Road.`,
      links: [{ label: "Get directions", href: site.contact.mapUrl }, { label: "Visit campus", href: "/visit" }],
    });

  if (has(q, /\b(open day|visit|tour|see the campus|virtual tour)\b/)) {
    const next = events.find((e) => e.category === "Admissions");
    return reply({
      text: `${next ? `The next open day is **${next.title}** on ${formatDate(next.date)}, ${next.time}.\n\n` : ""}You can also book a guided tour any weekday, or take the virtual tour right now.`,
      links: [{ label: "Virtual tour", href: "/visit/virtual-tour" }, { label: "Book a campus tour", href: "/visit#book" }],
    });
  }

  if (has(q, /\b(calendar|semester|exam|exams|holiday|holidays|term dates|recess|orientation)\b/))
    return reply({ text: "The academic calendar lists semester dates, registration deadlines, exams, holidays and graduation.", links: [{ label: "Academic calendar", href: "/academic-calendar" }] });

  if (has(q, /\b(event|events|happening|lecture|graduation)\b/)) {
    const upcoming = events.slice(0, 3);
    return reply({ text: `Coming up:\n${upcoming.map((e) => `- **${e.title}**, ${formatDate(e.date)}`).join("\n")}`, links: [{ label: "All events", href: "/events" }] });
  }

  if (has(q, /\b(vice chancellor|vc|who leads|leadership|management|deputy vice|registrar|dean of students|chancellor)\b/)) {
    const people = [viceChancellor, ...management.slice(1, 4)];
    return reply({
      text: `KCU is led by **${viceChancellor.name}**, Vice Chancellor. The management team includes:\n${people.slice(1).map((p) => `- **${p.name}**, ${p.role}`).join("\n")}`,
      links: [{ label: "Leadership & governance", href: "/about/leadership" }, { label: "Staff directory", href: "/about/staff" }],
    });
  }

  if (has(q, /\b(accredit\w*|charter\w*|recogni[sz]\w*|registered|legit|genuine|nche|ecfmg)\b/))
    return reply({
      text: `Yes. ${accreditations.map((a) => `\n- **${a.title}**: ${a.text}`).join("")}`,
      links: [{ label: "Charter & accreditation", href: "/about#accreditation" }],
      chips: ["Help me apply", "What courses do you offer?"],
    });

  if (has(q, /\b(master|masters|postgraduate|mba|msc|llm|phd)\b/))
    return reply({ text: "Postgraduate programmes are being developed and are subject to NCHE accreditation. Register your interest and we'll tell you as soon as they open.", links: [{ label: "Postgraduate study", href: "/postgraduate" }] });

  if (has(q, /\b(weekend|evening|part[- ]time|working|online|distance|blended)\b/))
    return reply({
      text: "Yes. Most degree and diploma programmes run **day and weekend** classes, short courses are also offered blended, and the K-Class e-learning platform supports study around work.",
      links: [{ label: "Find a programme", href: "/programmes" }],
    });

  if (has(q, /\b(how long|duration|years)\b/) && p) return reply({ text: `The **${p.title}** takes **${p.duration}**.`, links: [programmeLink(p)] });

  if (has(q, /\b(courses|programmes|programs|offer|study options|what can i study)\b/))
    return reply({
      text: `We offer ${programmes.length} programmes across three schools:\n${schools.map((s) => `- **${s.name}**`).join("\n")}\n\nWhat level are you looking for?`,
      links: [{ label: "Find a programme", href: "/programmes" }, { label: "Compare programmes", href: "/programmes/compare" }],
      chips: ["Degrees", "Diplomas", "Short courses", "Help me apply"],
    });

  if (has(q, /\b(degrees|diplomas|short courses|bridging)\b/)) {
    const level: Level = q.includes("diploma") ? "diploma" : q.includes("short") ? "certificate" : q.includes("bridging") ? "hec" : "degree";
    return reply({
      text: `Our ${levelLabels[level].toLowerCase()} programmes:\n${programmes.filter((x) => x.level === level).slice(0, 10).map((x) => `- [${x.title}](/programmes/${x.slug})`).join("\n")}`,
      links: [{ label: `All ${levelLabels[level].toLowerCase()}s`, href: `/programmes?level=${level}` }],
    });
  }

  if (has(q, /\b(contact|phone|call|email|talk to (a )?(person|human|someone)|whatsapp|agent|speak)\b/))
    return reply({
      text: `Our admissions team is available ${site.contact.hours}.\n- Phone: **${site.contact.phone}**\n- Email: **${site.contact.admissionsEmail}**\n- WhatsApp: **${site.whatsapp.display}**`,
      links: [{ label: "Chat on WhatsApp", href: whatsappLink() }, { label: "Contact page", href: "/contact" }],
    });

  if (p) return reply(programmeReply(p));

  const hits = search(q, ctx.index);
  if (hits.length)
    return reply({
      text: "Here's what I found on the website:",
      links: hits.map((h) => ({ label: `${h.title} · ${h.kind}`, href: h.href })),
      chips: ["Talk to a person", "Help me apply"],
    });

  return reply({
    text: "I'm not sure about that one yet. Try asking about programmes, fees, requirements, intakes or scholarships, or chat with the admissions team on WhatsApp.",
    links: [{ label: "Chat on WhatsApp", href: whatsappLink() }],
    chips: welcome.chips,
  });
}

function search(q: string, index: SearchItem[] | null) {
  if (!index) return [];
  const words = q.split(/[^a-z0-9]+/).filter((w) => w.length > 2 && !stop.has(w));
  if (!words.length) return [];
  return index
    .map((item) => {
      const hay = `${item.title} ${item.meta} ${item.keywords ?? ""}`.toLowerCase();
      return { item, score: words.filter((w) => hay.includes(w)).length };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((r) => r.item);
}
