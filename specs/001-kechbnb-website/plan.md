# Implementation Plan: KechBnb Promotional Website

**Branch**: `001-kechbnb-website` | **Date**: 2026-03-24 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-kechbnb-website/spec.md`

## Summary

Build a fully static, bilingual (French primary / English toggle) promotional website for
KechBnb, a full-service Airbnb property management company in Marrakech. The site targets
landlords and converts them via a lead capture form. Built with Astro (static output) +
Tailwind CSS, deployed to Netlify. Implements 7 pages: homepage, services, how it works,
interior design portfolio, contact, FAQ, and full blog with categories.

---

## Technical Context

**Language/Version**: HTML5, CSS3, TypeScript 5 (via Astro), JavaScript ES2022
**Primary Dependencies**: Astro 4.x (static output), Tailwind CSS 3.x, Heroicons (SVG)
**Storage**: Static JSON/Markdown files in `src/content/`; form submissions via Formspree
**Testing**: Lighthouse CLI (performance), axe-core (accessibility), manual cross-browser
**Target Platform**: Static CDN — Netlify (recommended) or Cloudflare Pages
**Project Type**: Static marketing website
**Performance Goals**: Lighthouse Performance ≥ 90 mobile / ≥ 95 desktop; CLS ≤ 0.1; LCP ≤ 2.5s
**Constraints**: Zero server runtime in production; WCAG 2.1 AA; 150 KB max third-party JS
**Scale/Scope**: 7 pages + 3 starter blog articles (FR + EN); expandable blog; no database

---

## Constitution Check

*GATE: Must pass before implementation begins. Re-check after each major phase.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Conversion-First Design | ✅ PASS | CTA on every page; contact form is primary goal |
| II. Trust & Social Proof | ✅ PASS | Testimonials + stats with mock disclaimers; portfolio page |
| III. Performance & SEO | ✅ PASS | Astro static output; Lighthouse CI gate; image optimization built-in |
| IV. Mobile-First Responsiveness | ✅ PASS | Tailwind mobile-first breakpoints; 44px touch targets enforced in design |
| V. Content Clarity & Transparency | ✅ PASS | 20% commission disclosed; value prop in hero; no dark patterns |
| VI. Accessibility | ✅ PASS | Heroicons inline SVG (ARIA-labelled); form labels; axe-core in validation |
| VII. Brand Consistency | ✅ PASS | Single `tokens.css` file; Tailwind config consumes tokens |

No violations. Complexity Tracking table not required.

---

## Project Structure

### Documentation (this feature)

```text
specs/001-kechbnb-website/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/
│   ├── form-submission.md
│   ├── i18n-keys.md
│   └── content-schemas.md
└── tasks.md             # Phase 2 output (/speckit.tasks — NOT created here)
```

### Source Code (repository root)

```text
kechbnb/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   ├── logo.png                     # Client-provided logo
│   │   └── images/
│   │       ├── hero/
│   │       │   └── hero-bg.jpg          # Homepage hero background (client-provided)
│   │       ├── portfolio/               # Curated "our work" gallery (15 photos, client-provided)
│   │       └── team/                    # Operational team photos (3 photos, client-provided)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   └── LanguageToggle.astro
│   │   ├── sections/
│   │   │   ├── Hero.astro
│   │   │   ├── ServicesGrid.astro
│   │   │   ├── HowItWorksSteps.astro
│   │   │   ├── TestimonialsSection.astro
│   │   │   ├── StatsSection.astro
│   │   │   ├── PortfolioGallery.astro
│   │   │   ├── FaqAccordion.astro
│   │   │   └── BlogIndexGrid.astro
│   │   ├── ui/
│   │   │   ├── Button.astro
│   │   │   ├── Card.astro
│   │   │   ├── CtaBanner.astro
│   │   │   └── Icon.astro
│   │   └── forms/
│   │       └── ContactForm.astro
│   ├── content/
│   │   ├── blog/
│   │   │   ├── fr/                      # French blog articles (.md)
│   │   │   └── en/                      # English blog articles (.md)
│   │   ├── faq/
│   │   │   ├── fr.json
│   │   │   └── en.json
│   │   ├── testimonials.json
│   │   ├── stats.json
│   │   ├── portfolio.json
│   │   ├── services.json
│   │   └── config.ts                    # Astro content collection schemas (Zod)
│   ├── i18n/
│   │   ├── fr.json                      # French translation strings
│   │   ├── en.json                      # English translation strings
│   │   └── utils.ts                     # getTranslation() typed helper
│   ├── layouts/
│   │   ├── BaseLayout.astro             # Head, meta, tokens, fonts
│   │   ├── PageLayout.astro             # BaseLayout + Header + Footer
│   │   └── BlogLayout.astro             # PageLayout + article wrapper
│   ├── pages/
│   │   ├── fr/
│   │   │   ├── index.astro              # Homepage
│   │   │   ├── services.astro
│   │   │   ├── comment-ca-marche.astro
│   │   │   ├── decoration-interieure.astro
│   │   │   ├── contact.astro
│   │   │   ├── faq.astro
│   │   │   └── blog/
│   │   │       ├── index.astro          # Blog index
│   │   │       └── [slug].astro         # Article page
│   │   └── en/
│   │       ├── index.astro
│   │       ├── services.astro
│   │       ├── how-it-works.astro
│   │       ├── interior-design.astro
│   │       ├── contact.astro
│   │       ├── faq.astro
│   │       └── blog/
│   │           ├── index.astro
│   │           └── [slug].astro
│   └── index.astro                      # Redirect → /fr/
├── styles/
│   └── tokens.css                       # CSS custom properties (brand tokens)
├── .env.example
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

**Structure Decision**: Web application (frontend only). Single Astro project with
language-specific page directories under `src/pages/fr/` and `src/pages/en/`.
Root `index.astro` redirects to `/fr/` by default.

---

## Implementation Notes

### /frontend-design Skill Usage

The `/frontend-design` skill will be used to generate each section component
(Hero, ServicesGrid, TestimonialsSection, etc.) individually. Outputs are dropped
directly into the corresponding `.astro` component files under `src/components/sections/`.
Each component call should include the brand tokens (terracotta, gold, off-white) and
target a specific section to keep outputs focused.

### Mock Content

All mock testimonials, statistics, and blog articles are marked with an HTML comment
`<!-- MOCK DATA — replace with real content -->` in their source files. The client
replaces these without touching any code.

### Blog Article Word Count

A custom remark plugin (`remark-min-wordcount`) is added to `astro.config.mjs` to
throw a build-time warning when an article body is below 400 words (SC-008).

### Language Toggle Persistence

`LanguageToggle.astro` writes the selected language to `localStorage` under the key
`kechbnb_lang`. On initial visit, a small inline script in `BaseLayout.astro` reads
this value and redirects if the stored preference differs from the current URL prefix.
This script is ≤ 200 bytes and is inlined to avoid a render-blocking request.
