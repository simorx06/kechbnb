# Research: KechBnb Promotional Website

**Phase 0 output** | Branch: `001-kechbnb-website` | Date: 2026-03-24

---

## Decision 1: Static Site Framework

**Decision**: Astro (static output mode)

**Rationale**:
- Outputs 100% static HTML/CSS/JS — zero server runtime in production, satisfying the
  constitution's deployment constraint.
- Built-in i18n routing (`/fr/…`, `/en/…`) handles the bilingual requirement natively
  without custom hacks.
- Content Collections (Markdown/MDX) provide a clean, file-based blog and FAQ authoring
  workflow — no CMS required at launch.
- Component-based architecture means /frontend-design skill output (HTML/CSS) slots directly
  into `.astro` component files with minimal adaptation.
- Built-in image optimization pipeline outputs WebP/AVIF with automatic JPEG/PNG fallbacks
  via `<picture>`, satisfying Principle III (Performance & SEO).

**Alternatives considered**:
- *Pure HTML/CSS/JS*: Too manual for bilingual content management and blog article rendering
  at scale; acceptable for MVP but creates significant maintenance debt.
- *Eleventy*: Solid alternative but weaker TypeScript tooling and no built-in image optimizer.
- *Next.js / Nuxt (static export)*: Oversized for this use case; heavier JS bundle conflicts
  with Lighthouse ≥ 90 target.

---

## Decision 2: CSS Strategy

**Decision**: Tailwind CSS (utility-first) + CSS custom properties for brand tokens

**Rationale**:
- Tailwind's utility classes pair naturally with /frontend-design skill output, which
  typically produces utility-heavy markup.
- A `tokens.css` file with CSS custom properties (colors, spacing, typography) remains
  the single source of truth per Principle VII (Brand Consistency). Tailwind is configured
  to consume these tokens via its config.
- PurgeCSS is built into Tailwind's production build — unused classes are stripped,
  keeping CSS bundle minimal for Lighthouse performance targets.

**Alternatives considered**:
- *Vanilla CSS with BEM*: More portable but higher cognitive load for consistent spacing;
  harder to maintain brand tokens across all components.
- *CSS Modules*: Good scoping but friction with /frontend-design output format.

---

## Decision 3: Contact Form Service

**Decision**: Formspree (free tier)

**Rationale**:
- Zero-backend form handling: POST from plain HTML form to Formspree endpoint; no JS
  required for basic submission (satisfies progressive enhancement requirement).
- Free tier (50 submissions/month) is sufficient for MVP lead volume.
- AJAX submission option available for better UX (no redirect on success).
- Spam protection built-in (honeypot + reCAPTCHA option).

**Alternatives considered**:
- *Netlify Forms*: Excellent if deployed on Netlify (zero config), but ties deployment
  platform. Note to plan.md: if Netlify is chosen for hosting, switch to Netlify Forms.
- *EmailJS*: Client-side only, exposes API keys; less secure.
- *Basin, Getform*: Similar to Formspree; Formspree has the best free tier and docs.

---

## Decision 4: Bilingual (i18n) Strategy

**Decision**: Astro i18n routing with JSON translation files; client-side language switcher
using `localStorage` to persist preference.

**Rationale**:
- Astro's built-in i18n generates separate URL trees: `/fr/services`, `/en/services`.
  This means each language version is fully crawlable and indexable by search engines
  (critical for SEO per Principle III).
- Translation strings live in `src/i18n/fr.json` and `src/i18n/en.json` — a single file
  per language makes handoff to translators straightforward.
- A lightweight `<LanguageToggle>` component reads `localStorage` and redirects to the
  equivalent page in the target language on click, preserving the current page context.
- Blog articles are authored as separate Markdown files per language
  (`src/content/blog/fr/` and `src/content/blog/en/`).

**Alternatives considered**:
- *Single page, JS-driven language swap*: Simpler toggle UX but all content in DOM at once,
  doubling page weight and breaking SEO (search engines see only one language).
- *Subdomain per language* (fr.kechbnb.com / en.kechbnb.com): Overkill for two languages;
  adds DNS complexity.

---

## Decision 5: Deployment Platform

**Decision**: Netlify (recommended) or Cloudflare Pages

**Rationale**:
- Both are CDN-native static hosts, satisfy the constitution's deployment requirement,
  and offer free tiers suitable for launch.
- Netlify provides: automatic deploys from git, branch previews, built-in form handling
  (if switching from Formspree), and easy custom domain + HTTPS setup.
- Cloudflare Pages offers better global edge performance and unlimited bandwidth on free tier.
- **Recommendation**: Netlify for simplicity at launch; migrate to Cloudflare Pages if
  traffic grows significantly.

---

## Decision 6: Blog Content Management

**Decision**: Astro Content Collections (Markdown files, no CMS)

**Rationale**:
- Blog articles are authored as `.md` files in `src/content/blog/fr/` and
  `src/content/blog/en/`. No database, no CMS login, no additional cost.
- Astro's content collection schema enforces required frontmatter fields (title, date,
  category, excerpt, meta description) — missing fields cause a build error, not a
  silent production bug.
- At launch: 3 starter articles per language (6 files total). Growth path: author
  adds a Markdown file and pushes to git → site rebuilds and deploys automatically.

**Alternatives considered**:
- *Decap CMS / Tina CMS*: Nice editorial UX but adds complexity not needed at launch;
  can be added later without changing the underlying Markdown structure.

---

## Decision 7: Icon Library

**Decision**: Heroicons (SVG, inline via Astro components)

**Rationale**:
- Single source, consistent visual weight, MIT license.
- Inlined SVGs avoid extra HTTP requests and are ARIA-labelable for accessibility
  (Principle VI).
- Astro's component model makes icon wrapping trivial.

---

## Decision 8: Image Handling

**Decision**: Astro's built-in `<Image>` component + `<Picture>` for art-directed images

**Rationale**:
- Automatic WebP/AVIF output with JPEG/PNG fallback via `<picture srcset>` — satisfies
  the constitution's image format requirement without manual conversion.
- Explicit `width` and `height` props prevent CLS (Cumulative Layout Shift), protecting
  the CLS ≤ 0.1 Core Web Vital target.
- Client-provided photos dropped into `src/assets/images/` are automatically optimized
  at build time.

---

## Resolved Clarifications

| # | Question | Resolution |
|---|----------|------------|
| 1 | Framework for static site with i18n + blog | Astro (static output) |
| 2 | CSS approach compatible with /frontend-design | Tailwind + CSS custom properties |
| 3 | Form backend | Formspree free tier |
| 4 | Language switching mechanism | Astro i18n routing + localStorage |
| 5 | Deployment target | Netlify (recommended) |
| 6 | Blog CMS | No CMS — Astro Content Collections (Markdown) |
| 7 | Icon library | Heroicons (inline SVG) |
| 8 | Image optimization | Astro built-in Image/Picture component |
