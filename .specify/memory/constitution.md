<!--
SYNC IMPACT REPORT
==================
Version change: [unversioned template] → 1.0.0
Type of bump: MAJOR (initial ratification — all placeholders replaced, full constitution authored)

Modified principles:
  - [PRINCIPLE_1_NAME] → I. Conversion-First Design (new)
  - [PRINCIPLE_2_NAME] → II. Trust & Social Proof (new)
  - [PRINCIPLE_3_NAME] → III. Performance & SEO (new)
  - [PRINCIPLE_4_NAME] → IV. Mobile-First Responsiveness (new)
  - [PRINCIPLE_5_NAME] → V. Content Clarity & Transparency (new)
  - [PRINCIPLE_6_NAME] → VI. Accessibility (new)
  - [PRINCIPLE_7_NAME] → VII. Brand Consistency (new)

Added sections:
  - Technology & Deployment Standards
  - Content & Design Standards
  - Governance

Removed sections: none (N/A — first ratification)

Templates requiring updates:
  ✅ .specify/memory/constitution.md — this file
  ✅ .specify/templates/plan-template.md — Constitution Check section references these principles; no structural change needed, content-compatible
  ✅ .specify/templates/spec-template.md — user stories and acceptance criteria align with conversion, trust, and performance principles
  ✅ .specify/templates/tasks-template.md — task phases align with static-site delivery model (Setup → Foundation → US phases)
  ⚠  .specify/templates/commands/*.md — generic agent references remain; no KechBnb-specific command files needed at this stage

Deferred items: none
-->

# KechBnb Constitution

## Core Principles

### I. Conversion-First Design

Every page element MUST serve the primary goal: converting landlord visitors into qualified leads.
Call-to-action (CTA) buttons or contact anchors MUST appear above the fold on every page.
Lead capture forms MUST be present on the homepage and at least one dedicated landing page.
No page may be added to the site without a defined conversion goal and at least one measurable CTA.
Navigation MUST guide visitors toward inquiry or contact without dead ends.

**Rationale**: KechBnb's business model depends on acquiring landlord clients. A static website with
no lead-generation mechanism delivers zero ROI. Every design and content decision must be evaluated
against whether it moves a landlord closer to contacting KechBnb.

### II. Trust & Social Proof

The site MUST include verifiable social proof: client testimonials, managed property counts, or
named case studies. Unverified superlative claims ("best in class", "industry-leading") are
PROHIBITED unless backed by a cited third-party source.
Portfolio or results sections MUST display real or representative data (e.g., occupancy rates,
average revenue uplift) with appropriate disclaimers where figures are estimates.
Company identity signals MUST be present: business name, location, contact details, and any
relevant licensing or association memberships.

**Rationale**: Landlords are entrusting their property and income to KechBnb. Trust is the primary
barrier to conversion. Social proof and transparent identity signals reduce perceived risk and
accelerate the decision to contact.

### III. Performance & SEO

All pages MUST achieve a Lighthouse Performance score ≥ 90 on mobile and ≥ 95 on desktop.
Every page MUST include a unique `<title>`, `<meta description>`, and Open Graph tags.
Images MUST be served in a modern format (WebP or AVIF) with explicit `width` and `height`
attributes and descriptive `alt` text.
The site MUST be deployable as a fully static bundle (HTML/CSS/JS only) — no server-side
rendering runtime is permitted in production.
Core Web Vitals targets: LCP ≤ 2.5s, CLS ≤ 0.1, INP ≤ 200ms.

**Rationale**: Landlords searching for property management services use search engines. Poor SEO
means invisibility. Poor performance means abandonment before the value proposition is read.
Static deployment reduces hosting cost and eliminates server-side attack surface.

### IV. Mobile-First Responsiveness

All layouts MUST be designed and tested mobile-first (320px baseline) before scaling up.
No horizontal scrolling is permitted at any viewport width ≥ 320px.
Touch targets (buttons, links, form fields) MUST be ≥ 44×44px.
Forms MUST be fully usable on a mobile device without zooming or lateral scrolling.

**Rationale**: A significant share of landlord visits will originate from mobile devices via social
media or search. A broken mobile experience directly suppresses conversion and signals
unprofessionalism to a trust-sensitive audience.

### V. Content Clarity & Transparency

The homepage MUST communicate KechBnb's value proposition to a landlord within 5 seconds of
page load (headline + subheading above the fold).
Service scope and pricing model MUST be described in plain language. If exact pricing is not
listed, the fee structure type (percentage of revenue, flat fee, etc.) MUST be stated.
No dark patterns are permitted: no hidden fees in copy, no misleading CTAs, no fake urgency
indicators (e.g., "Only 2 spots left!" without factual basis).
All content MUST be in the primary audience language (default: English; add French/Arabic if
targeting Moroccan landlords — decision MUST be documented in plan.md).

**Rationale**: Landlords evaluating property management companies compare multiple providers.
Clarity and honesty differentiate KechBnb and reduce friction in the sales funnel. Dark patterns
erode the trust established by Principle II.

### VI. Accessibility

The site MUST conform to WCAG 2.1 Level AA.
Color contrast ratios MUST meet WCAG AA minimums: 4.5:1 for body text, 3:1 for large text and
UI components.
All interactive elements MUST be keyboard-navigable and announce their purpose via ARIA labels
where the visual context alone is insufficient.
Forms MUST include associated `<label>` elements for every input field.

**Rationale**: Accessibility is a legal requirement in many jurisdictions and a quality signal.
Accessible markup also improves SEO crawlability, reinforcing Principle III.

### VII. Brand Consistency

KechBnb's color palette, typography, and logo MUST be applied uniformly across all pages and
reusable components.
A single design token file (CSS custom properties or equivalent) MUST be the single source of
truth for brand colors, font stacks, spacing scale, and border radii.
No page or component may introduce ad hoc colors, fonts, or spacing values outside the token
system without a documented amendment to the design tokens file.

**Rationale**: Inconsistent branding undermines professionalism and trust. A token-driven system
makes brand updates atomic and prevents visual drift as the site grows.

## Technology & Deployment Standards

**Permitted technology stack**:
- HTML5, CSS3 (with or without a preprocessor), vanilla JavaScript or a lightweight framework
  (e.g., Alpine.js, Astro, Eleventy). Full SPA frameworks (Next.js, Nuxt, SvelteKit) are
  permitted ONLY in static-export mode with zero runtime server dependency.
- No backend or database in production. Contact form submissions MUST use a third-party
  service (e.g., Formspree, Netlify Forms, EmailJS).
- Hosting MUST be a static CDN platform (Netlify, Vercel static, GitHub Pages, Cloudflare Pages).

**Dependency governance**:
- Every third-party script or library MUST be justified in plan.md before inclusion.
- Analytics scripts (e.g., Google Analytics, Plausible) MUST load asynchronously and respect
  user consent where legally required (GDPR, CNIL).
- Total third-party JavaScript payload MUST NOT exceed 150 KB (compressed) without a documented
  performance exception in plan.md.

**Deployment**:
- The `main` branch MUST always represent a deployable state.
- CI MUST run a Lighthouse audit on every pull request; a score drop of ≥ 5 points on any
  Core Web Vital metric MUST block merge.

## Content & Design Standards

**Page inventory** — the following pages are REQUIRED at launch:
1. **Homepage** — hero with value proposition, services overview, social proof, CTA
2. **Services** — detailed description of the property management offering
3. **How It Works** — step-by-step process for onboarding a landlord
4. **Testimonials / Results** — social proof page (may be merged into Homepage at MVP)
5. **Contact / Get a Free Estimate** — lead capture form, map or address, phone/email

**Optional at launch** (must be flagged in spec.md if included):
- Blog / Resources (SEO content marketing)
- FAQ
- About / Team

**Visual design requirements**:
- Hero section MUST include a background image or illustration relevant to short-term rental
  properties. Stock images MUST NOT show recognizable faces without model releases.
- The site MUST NOT use generic "coming soon" placeholder content in any deployed page.
- All icons MUST be from a single icon library (e.g., Heroicons, Phosphor) to maintain visual
  consistency per Principle VII.

## Governance

This constitution supersedes all other design, content, and technology decisions for the KechBnb
static website project. Where a conflict exists between a feature request and a constitutional
principle, the principle takes precedence unless a formal amendment is approved.

**Amendment procedure**:
1. Propose the amendment in writing, identifying which principle or section is affected and why.
2. Increment the version number according to semantic versioning (MAJOR/MINOR/PATCH rules above).
3. Update `LAST_AMENDED_DATE` to the amendment date.
4. Propagate changes to dependent templates per the Consistency Propagation Checklist.
5. Document the change in the Sync Impact Report at the top of this file.

**Versioning policy**:
- MAJOR: Removal or incompatible redefinition of an existing principle.
- MINOR: Addition of a new principle or materially expanded guidance to an existing one.
- PATCH: Wording clarifications, typo corrections, non-semantic refinements.

**Compliance review**:
- Every feature spec (spec.md) MUST include a "Constitution Check" section confirming
  compliance with all seven principles before implementation begins.
- Any violation MUST be recorded in the Complexity Tracking table of plan.md with justification.
- A final compliance review MUST be performed before any production deployment.

**Guidance file**: `.specify/memory/constitution.md` (this file) is the authoritative runtime
reference for all development decisions on this project.

---

**Version**: 1.0.0 | **Ratified**: 2026-03-24 | **Last Amended**: 2026-03-24
