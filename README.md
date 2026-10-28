# King Ceasor University — New Website

A modern, fast and fully responsive website for King Ceasor University (KCU), rebuilt from scratch.
This version is **presentation-ready with hard-coded content**; every piece of content lives in typed data files so it can
later be swapped for a CMS or the backend API without touching page layouts.

## Stack

| Choice | Why |
| --- | --- |
| **Next.js 16 (App Router) + React 19** | Static generation for every page: instant loads, excellent SEO, easy hosting on Netlify |
| **TypeScript** | Content and components are type-checked, so mistakes are caught before they reach the site |
| **Tailwind CSS 4** | One consistent design system (colours, spacing, type) with tiny CSS output |
| **next/image** | Photos are automatically resized and served as AVIF/WebP for phones and slow connections |
| **lucide-react** | Clean, consistent icon set |

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (all pages pre-rendered)
npm start
npm run typecheck && npm run lint
```

## Site map

| Page | Route | What it does |
| --- | --- | --- |
| Home | `/` | Hero with intake call-to-action, stats, study pathways, schools, why KCU, VC message, news, events, partners |
| Programme finder | `/programmes` | Live search + filter by level and school across all 37 programmes |
| Programme detail | `/programmes/[slug]` | Overview, entry requirements, careers, fees card, related programmes |
| Admissions | `/admissions` | Steps to apply, requirements, documents, intakes, full fees tables, funding, international, FAQs |
| Schools | `/schools`, `/schools/[slug]` | The three schools, departments, programmes by level, school news |
| Research | `/research` | Focus areas, partner institutions, research news |
| Campus life | `/campus-life` | Guild leaders and cabinet, clubs, support services, accommodation |
| Gallery | `/gallery` | Album filter and full-screen lightbox (keyboard friendly) |
| News | `/news`, `/news/[slug]` | Featured story, category filter, load more, article pages with highlights |
| Events | `/events`, `/events/[slug]` | Upcoming events with details and register-interest |
| About | `/about`, `/about/leadership` | Mission, values, timeline, VC message, charter; Management, Council and Trustees |
| Careers | `/careers` | Expandable vacancies with PDF adverts |
| Contact | `/contact` | Channels, enquiry form (front-end only for now), map |

## Design system

- **Colour (60 / 30 / 10):** white and warm ivory (`surface`) carry most of the page; official KCU green `#0b6232`
  (`primary-600`) is the brand and action colour (buttons, links, navigation); a muted crest gold (`gold-*`) is a
  sparing accent for credentials, highlights on dark green and the closing "Apply now". Photos use neutral dark
  overlays. Gold is never used for body text on white.
- **Navigation:** Study · Admissions · Research · Campus Life · News & Events · About, each with a mega menu panel
  (overview, grouped links, featured item) on desktop and an accordion on mobile.
- **Type:** Plus Jakarta Sans for headings, Inter for body text.
- **Shape:** rounded cards (`rounded-2xl`/`3xl`), soft shadows (`shadow-card`, `shadow-lift`), pill buttons.
- **Motion:** subtle fade-up on scroll and hover lifts; all disabled for users who prefer reduced motion.
- **Accessibility:** skip link, visible focus rings, semantic headings, labelled controls, keyboard-friendly menus and lightbox.

## Structure

```
src/
  app/            one folder per URL (see site map)
  components/     site-header, site-footer, ui (buttons, sections, hero, CTA), cards, programme-finder,
                  news-list, gallery-grid, contact-form, reveal
  content/        ALL site content as typed data — edit here, not in pages
    site.ts           contacts, socials, portals, current intake
    navigation.ts     header and footer menus
    programmes.ts     the 37 programmes (fees, durations, entry requirements)
    schools.ts people.ts news.ts events.ts careers.ts gallery.ts partners.ts university.ts campus.ts
  lib/utils.ts    helpers (dates, asset paths)
public/           only the images the new site actually uses, copied from the old site
```

## Content still to confirm

Anything marked `PLACEHOLDER` in `src/content` is sample content for the presentation: events, intake dates and the
academic calendar, some clubs, accommodation prices, merit awards and programme overviews for short courses.

## Deploy on Netlify

This repo includes `netlify.toml` with the official Next.js runtime (`@netlify/plugin-nextjs`).

1. In Netlify: **Add new site → Import an existing project** and select this GitHub repo.
2. Build settings are already in `netlify.toml` (`npm run build`, publish `.next`, Node 22).
3. Deploy. No extra plugins need to be added in the UI.

### School pages (`src/content/school-details.ts`)

Each school page has six sections: Dean's welcome, Staff, Programmes, Departments, Publications, Contact.
Real staff names come from KCU news stories. To confirm before launch:

- Dean welcome messages are drafts (`draftMessage`) and must be approved by each dean. Deans of Medicine and Law
  are not yet named, so their pages show "Office of the Dean".
- Staff listed as "Name to be confirmed" are real roles without a confirmed name.
- Publications tagged **Sample** are illustrative; replace them with each school's real publication list.
- School emails currently use info@kcu.ac.ug.

## Next steps after approval

1. Connect `src/content/*` to the backend API (each file maps to a model).
2. Wire the contact form to an email/CRM endpoint.
3. Add analytics and a sitemap, then deploy.
