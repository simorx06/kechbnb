# Tasks: KechBnb Promotional Website

**Input**: Design documents from `/specs/001-kechbnb-website/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅

**Tests**: Not requested — no test tasks generated.

**Organization**: Tasks grouped by user story to enable independent implementation and
testing of each story. All paths relative to `kechbnb/` (repo root).

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1–US5)

---

## Phase 1: Setup

**Purpose**: Astro project initialization, tooling, brand tokens.

- [ ] T001 Initialize Astro 4.x project with `output: "static"` in `astro.config.mjs`, create `package.json`, `tsconfig.json`
- [ ] T002 Install and configure Tailwind CSS 3.x — create `tailwind.config.mjs` wired to CSS custom properties from `styles/tokens.css`
- [ ] T003 [P] Create `styles/tokens.css` with brand tokens: terracotta `#C4714A`, gold `#B8973E`, off-white `#FAF7F2`, plus spacing scale, font stack (serif + sans), border radii
- [ ] T004 [P] Create `.env.example` with `PUBLIC_FORMSPREE_ID=` placeholder and add `.env` to `.gitignore`
- [ ] T005 [P] Add `public/favicon.svg` placeholder and `src/assets/logo.svg` placeholder (gray box, correct dimensions)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared infrastructure every user story depends on — layouts, navigation,
i18n system, content schemas, UI atoms.

⚠️ **CRITICAL**: No user story work can begin until this phase is complete.

- [ ] T006 Create `src/content/config.ts` with Zod schemas for all 6 collections: blog, faq, testimonials, stats, portfolio, services (per `contracts/content-schemas.md`)
- [ ] T007 [P] Create `src/i18n/fr.json` with all keys from `contracts/i18n-keys.md` (nav, hero, services, how-it-works, portfolio, contact, faq, blog, footer, common)
- [ ] T008 [P] Create `src/i18n/en.json` with all matching keys from `contracts/i18n-keys.md` translated to English
- [ ] T009 Create `src/i18n/utils.ts` with typed `getTranslation(lang, key)` helper; type inferred from `fr.json` so missing keys are TypeScript errors
- [ ] T010 Create `src/layouts/BaseLayout.astro` — `<head>` with charset, viewport, canonical, Open Graph tags, `tokens.css` import, Google Fonts (serif + sans pairing), ≤200-byte inline language-redirect script reading `localStorage('kechbnb_lang')`
- [ ] T011 Create `src/layouts/PageLayout.astro` — wraps `BaseLayout` with `<Header>` and `<Footer>` slots, skip-to-content link for accessibility
- [ ] T012 Create `src/layouts/BlogLayout.astro` — extends `PageLayout` with article `<header>` (title, date, category badge) and `<CtaBanner>` after article body
- [ ] T013 [P] Create `src/components/ui/Button.astro` — primary and secondary variants, min 44×44px touch target, accepts `href` (renders `<a>`) or `type="submit"` (renders `<button>`), full brand token styling
- [ ] T014 [P] Create `src/components/ui/Icon.astro` — wraps Heroicons inline SVG; accepts `name` prop; includes `aria-hidden="true"` by default, `aria-label` prop for standalone decorative icons
- [ ] T015 [P] Create `src/components/ui/Card.astro` — generic card shell (white/off-white bg, shadow, border-radius from tokens), used by services, testimonials, blog cards
- [ ] T016 [P] Create `src/components/ui/CtaBanner.astro` — full-width terracotta/gold CTA strip with headline prop and `<Button>` linking to `/[lang]/contact`; appears at bottom of every page
- [ ] T017 Create `src/components/layout/Header.astro` — logo, nav links (all 7 pages), `<LanguageToggle>`, mobile hamburger menu (CSS-only or minimal JS); sticky on scroll; WCAG AA contrast
- [ ] T018 Create `src/components/layout/Footer.astro` — three columns: nav links, contact details (phone/email/address), social media icons; copyright line; all social `href` values use `#` placeholder
- [ ] T019 Create `src/components/layout/LanguageToggle.astro` — FR/EN pill toggle; on click writes to `localStorage('kechbnb_lang')` and navigates to equivalent page in target language; degrades to `<a>` links without JS
- [ ] T020 Create `src/pages/index.astro` — instant redirect to `/fr/` via `<meta http-equiv="refresh">` + JS redirect + `<link rel="canonical">` pointing to `/fr/`

**Checkpoint**: Foundation ready — all user story phases can now begin in parallel.

---

## Phase 3: User Story 1 — Lead Submission (Priority: P1) 🎯 MVP

**Goal**: Working homepage with hero + services overview, and a functional contact form that
delivers leads to KechBnb.

**Independent Test**: Visit `/fr/`, read hero in under 5 seconds, click CTA, fill and submit
contact form, confirm success message appears and Formspree dashboard shows the lead.

### Content — User Story 1

- [ ] T021 [P] [US1] Create `src/content/services.json` with 6 service entries (listing, communication, cleaning, pricing, maintenance, design) per `data-model.md`; bilingual FR/EN; mark file with `<!-- MOCK DATA -->` comment

### Components — User Story 1

- [ ] T022 [US1] Create `src/components/sections/Hero.astro` using `/frontend-design` skill — mobile-first, terracotta/gold/off-white palette, full-viewport-height hero, `<h1>` headline + subheadline visible above fold at 320px, primary CTA `<Button>` linking to contact page, background image slot (lazy-loaded with placeholder color)
- [ ] T023 [US1] Create `src/components/sections/ServicesGrid.astro` using `/frontend-design` skill — responsive grid (1 col mobile → 2 col tablet → 3 col desktop), each service as `<Card>` with `<Icon>`, title, description; commission note at bottom
- [ ] T024 [US1] Create `src/components/forms/ContactForm.astro` — all fields per FR-007 (name, phone, email, neighborhood required; num_properties, message optional); hidden `_language` and `_gotcha` fields; AJAX POST to Formspree with success/error messages per `contracts/form-submission.md`; native HTML POST fallback; inline validation per FR-015; 44px input height; labels associated via `for`/`id`

### Pages — User Story 1

- [ ] T025 [US1] Create `src/pages/fr/index.astro` — assemble: `<PageLayout>` + `<Hero>` + `<ServicesGrid>` + `<CtaBanner>`; pass FR translations; unique `<title>` and meta description
- [ ] T026 [US1] Create `src/pages/en/index.astro` — same structure as T025, pass EN translations
- [ ] T027 [US1] Create `src/pages/fr/contact.astro` — `<PageLayout>` + intro paragraph + `<ContactForm lang="fr">`; unique title + meta description
- [ ] T028 [US1] Create `src/pages/en/contact.astro` — same as T027, EN translations

**Checkpoint**: MVP complete — homepage readable, form submits, leads arrive in Formspree. ✅

---

## Phase 4: User Story 2 — Service Evaluation (Priority: P2)

**Goal**: Services page and How It Works page giving landlords a full picture of the offering,
plus FAQ page answering common questions.

**Independent Test**: Visit `/fr/services` — all 6 services listed with descriptions and
commission note. Visit `/fr/comment-ca-marche` — numbered steps 1–6 visible. Visit `/fr/faq`
— accordion opens/closes questions. All pages end with CTA.

### Content — User Story 2

- [ ] T029 [P] [US2] Create `src/content/faq/fr.json` with 8 placeholder FAQ items (per `data-model.md` schema); realistic questions a landlord would ask (e.g., "Que se passe-t-il si un invité abîme mon bien ?")
- [ ] T030 [P] [US2] Create `src/content/faq/en.json` with matching English translations of T029 items

### Components — User Story 2

- [ ] T031 [US2] Create `src/components/sections/HowItWorksSteps.astro` using `/frontend-design` skill — numbered step list (1–6), each step has icon, title, description; alternating layout on desktop; mobile stacks vertically; ends with CTA
- [ ] T032 [US2] Create `src/components/sections/FaqAccordion.astro` using `/frontend-design` skill — CSS-driven accordion (no JS required for open/close using `<details>`/`<summary>`); each item shows question as `<summary>`, answer as body; ARIA `aria-expanded` on JS-enhanced version

### Pages — User Story 2

- [ ] T033 [US2] Create `src/pages/fr/services.astro` — `<PageLayout>` + full `<ServicesGrid>` (detailed mode) + commission explanation block + `<CtaBanner>`
- [ ] T034 [US2] Create `src/pages/en/services.astro` — EN equivalent of T033
- [ ] T035 [US2] Create `src/pages/fr/comment-ca-marche.astro` — `<PageLayout>` + `<HowItWorksSteps>` + `<CtaBanner>`
- [ ] T036 [US2] Create `src/pages/en/how-it-works.astro` — EN equivalent of T035
- [ ] T037 [US2] Create `src/pages/fr/faq.astro` — `<PageLayout>` + `<FaqAccordion>` + `<CtaBanner>`
- [ ] T038 [US2] Create `src/pages/en/faq.astro` — EN equivalent of T037

**Checkpoint**: US1 + US2 complete — landlord can discover, evaluate, and contact. ✅

---

## Phase 5: User Story 3 — Social Proof & Portfolio (Priority: P3)

**Goal**: Homepage social proof sections (stats + testimonials) and a standalone Interior
Design portfolio page with "after" photos.

**Independent Test**: Visit `/fr/` — scroll past services to see ≥3 stats and ≥3 testimonials.
Visit `/fr/decoration-interieure` — gallery renders with captions and CTA.

### Content — User Story 3

- [ ] T039 [P] [US3] Create `src/content/testimonials.json` with 3 mock testimonials per `data-model.md`; each has name, property type, FR+EN quote, quantified result; file marked `<!-- MOCK DATA — replace with real content -->`
- [ ] T040 [P] [US3] Create `src/content/stats.json` with 3 mock stats (e.g., "87% taux d'occupation moyen", "+40% de revenus vs location longue durée", "50+ propriétés gérées"); each includes illustrative footnote; marked `<!-- MOCK DATA -->`
- [ ] T041 [P] [US3] Create `src/content/portfolio.json` with 3 placeholder portfolio entries per `data-model.md`; image paths point to `src/assets/images/portfolio/placeholder-{n}.jpg`; add 3 gray placeholder JPEGs to that folder

### Components — User Story 3

- [ ] T042 [US3] Create `src/components/sections/StatsSection.astro` using `/frontend-design` skill — 3-column stat strip (1 col on mobile), large gold number, label below, footnote in small text; terracotta background variant
- [ ] T043 [US3] Create `src/components/sections/TestimonialsSection.astro` using `/frontend-design` skill — 3-card carousel (CSS scroll snap on mobile, 3-column grid on desktop); each card: quote, name, property type, result badge
- [ ] T044 [US3] Create `src/components/sections/PortfolioGallery.astro` using `/frontend-design` skill — responsive masonry-style grid; each item: `<Picture>` (WebP + JPEG fallback), caption, property type badge; lightbox optional (CSS-only)

### Pages — User Story 3

- [ ] T045 [US3] Update `src/pages/fr/index.astro` — insert `<StatsSection>` and `<TestimonialsSection>` between ServicesGrid and CtaBanner
- [ ] T046 [US3] Update `src/pages/en/index.astro` — same as T045 for EN
- [ ] T047 [US3] Create `src/pages/fr/decoration-interieure.astro` — `<PageLayout>` + intro + `<PortfolioGallery>` + `<CtaBanner>`
- [ ] T048 [US3] Create `src/pages/en/interior-design.astro` — EN equivalent of T047

**Checkpoint**: US1 + US2 + US3 complete — full conversion funnel with trust signals. ✅

---

## Phase 6: User Story 4 — Blog / SEO (Priority: P4)

**Goal**: Full blog with 3 categories and 3 starter articles (FR + EN), each driving organic
traffic back to the contact page.

**Independent Test**: Visit `/fr/blog` — see 3 articles listed by category. Open one article
— reads fully with CTA at bottom. Check page source — unique `<title>` and `<meta description>`
per article.

### Content — User Story 4

- [ ] T049 [P] [US4] Write starter article FR #1 in `src/content/blog/fr/gerer-son-bien-airbnb-marrakech.md` — category: `tips`, 400+ words, advice for first-time Airbnb landlords in Marrakech, frontmatter complete per schema
- [ ] T050 [P] [US4] Write starter article FR #2 in `src/content/blog/fr/marche-location-courte-duree-marrakech.md` — category: `market`, 400+ words, Marrakech short-term rental market overview
- [ ] T051 [P] [US4] Write starter article FR #3 in `src/content/blog/fr/comment-preparer-son-appartement-pour-les-invites.md` — category: `guest-experience`, 400+ words, how to prepare a property for guests
- [ ] T052 [P] [US4] Write EN translation of article #1 in `src/content/blog/en/gerer-son-bien-airbnb-marrakech.md` (same slug)
- [ ] T053 [P] [US4] Write EN translation of article #2 in `src/content/blog/en/marche-location-courte-duree-marrakech.md`
- [ ] T054 [P] [US4] Write EN translation of article #3 in `src/content/blog/en/comment-preparer-son-appartement-pour-les-invites.md`

### Components — User Story 4

- [ ] T055 [US4] Create `src/components/sections/BlogIndexGrid.astro` using `/frontend-design` skill — article card grid (1 col mobile → 2 col tablet → 3 col desktop); each card: title, category badge, date, excerpt, "Lire la suite" link; category filter tabs at top

### Pages — User Story 4

- [ ] T056 [US4] Create `src/pages/fr/blog/index.astro` — `<PageLayout>` + `<BlogIndexGrid>` with all FR articles passed as props; unique title + meta description; `<CtaBanner>` at bottom
- [ ] T057 [US4] Create `src/pages/en/blog/index.astro` — EN equivalent of T056
- [ ] T058 [US4] Create `src/pages/fr/blog/[slug].astro` — `<BlogLayout>` with dynamic routing; renders article body from Content Collection; `<hreflang>` alternate link to EN equivalent
- [ ] T059 [US4] Create `src/pages/en/blog/[slug].astro` — EN equivalent of T058

**Checkpoint**: All 5 user stories' core features complete. ✅

---

## Phase 7: User Story 5 — Language Toggle (Priority: P5)

**Goal**: Seamless FR↔EN switching on every page, persisted across navigation.

**Independent Test**: On any page, click language toggle — all visible text switches within
300ms, no full page reload. Navigate to another page — language preference preserved.

- [ ] T060 [US5] Verify `LanguageToggle.astro` (T019) correctly maps every FR URL to its EN equivalent and vice versa for all 14 page pairs (7 pages × 2 languages); fix any broken mappings
- [ ] T061 [US5] Add `<link rel="alternate" hreflang="fr" href="...">` and `<link rel="alternate" hreflang="en" href="...">` tags to `src/layouts/BaseLayout.astro` for all page types (static pages + blog articles)
- [ ] T062 [US5] Test language persistence: switch to EN on homepage, navigate to services, blog, contact — confirm EN is retained. Repeat in reverse. Fix any page that resets to FR.
- [ ] T063 [US5] Test no-JS language fallback: disable JS, verify `LanguageToggle` degrades to plain `<a>` links to FR/EN equivalents; verify all page content still readable

**Checkpoint**: Full bilingual site functional end-to-end. ✅

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Performance tuning, accessibility audit, deployment.

- [ ] T064 [P] Run Lighthouse CLI on all 7 FR pages at mobile viewport; fix any Core Web Vital below target (Performance ≥ 90, CLS ≤ 0.1, LCP ≤ 2.5s)
- [ ] T065 [P] Run axe-core accessibility audit on all 7 pages; fix all WCAG 2.1 AA violations (contrast, ARIA, labels, keyboard nav)
- [ ] T066 Test contact form end-to-end on real mobile device (375px): fill all fields, submit, confirm success message and Formspree delivery
- [ ] T067 [P] Test all 7 pages with JavaScript disabled: verify content readable, form falls back to HTML POST, language toggle shows `<a>` links
- [ ] T068 [P] Verify all images use `<Picture>` or `<Image>` Astro components (WebP + JPEG fallback); check no `<img>` tags lack `width`, `height`, or `alt` attributes
- [ ] T069 Replace `src/assets/logo.svg` placeholder with actual client logo once provided; verify header rendering at all breakpoints
- [ ] T070 [P] Verify mock data files (testimonials.json, stats.json, portfolio.json, blog articles) are all marked with `<!-- MOCK DATA — replace with real content -->` comments
- [ ] T071 Run `npm run build` — confirm zero errors, zero broken links, all 7 pages present in `dist/`
- [ ] T072 Deploy to Netlify: connect GitHub repo, set build command `npm run build`, publish dir `dist`, add `PUBLIC_FORMSPREE_ID` env var; verify live URL

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 — BLOCKS all user story phases
- **US1 (Phase 3)**: Depends on Phase 2 — no dependencies on US2–US5
- **US2 (Phase 4)**: Depends on Phase 2 — no dependencies on US1, US3–US5
- **US3 (Phase 5)**: Depends on Phase 2 + US1 homepage pages (T025/T026 must exist to update them in T045/T046)
- **US4 (Phase 6)**: Depends on Phase 2 only — `BlogLayout` created in Phase 2
- **US5 (Phase 7)**: Depends on ALL pages existing (Phases 3–6 complete)
- **Polish (Phase 8)**: Depends on all user stories complete

### Within Each User Story

- Content tasks → Component tasks → Page tasks
- Pages depend on their components; components depend on UI atoms (Phase 2)
- All tasks marked [P] within the same phase can run in parallel

### Parallel Opportunities

```bash
# Phase 1 parallel group:
T003 styles/tokens.css
T004 .env.example
T005 public/favicon.svg + src/assets/logo.svg

# Phase 2 parallel group (after T006 config.ts):
T007 src/i18n/fr.json
T008 src/i18n/en.json
T013 Button.astro
T014 Icon.astro
T015 Card.astro
T016 CtaBanner.astro

# US1 parallel group:
T021 services.json content

# US3 parallel group:
T039 testimonials.json
T040 stats.json
T041 portfolio.json + placeholders

# US4 parallel group (all 6 blog articles):
T049 FR article #1
T050 FR article #2
T051 FR article #3
T052 EN article #1
T053 EN article #2
T054 EN article #3
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1 (homepage + contact form)
4. **STOP and VALIDATE**: Homepage readable in 5s, form submits, lead arrives in Formspree
5. Deploy MVP to Netlify

### Incremental Delivery

1. Setup + Foundational → skeleton ready
2. **US1** → homepage + working lead form → **MVP deployed** 🚀
3. **US2** → services + how it works + FAQ → full content site
4. **US3** → social proof + portfolio → trust layer added
5. **US4** → blog live → SEO content live
6. **US5** → bilingual toggle polished → international audience ready
7. Polish → performance + accessibility → production-grade

---

## Notes

- [P] = different files, no shared dependencies within the phase
- Use `/frontend-design` skill for T022, T023, T031, T032, T042, T043, T044, T055 — pass brand tokens and mobile-first constraint in each prompt
- Mock data tasks (T039, T040, T041, T049–T054) can be done by the client or AI; mark all with `<!-- MOCK DATA -->` comment
- Commit after each phase checkpoint
- Run `npm run build` before every commit to catch schema/type errors early
