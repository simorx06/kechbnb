# Data Model: KechBnb Promotional Website

**Phase 1 output** | Branch: `001-kechbnb-website` | Date: 2026-03-24

All entities are static content — no database. Data lives in files under `src/content/`
or `src/i18n/`. The "schema" is enforced at build time by Astro Content Collections.

---

## Entity 1: Blog Article

**Storage**: `src/content/blog/{lang}/{slug}.md`

### Frontmatter Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | yes | Article title (shown in `<h1>` and `<title>` tag) |
| `slug` | string | yes | URL-safe identifier, e.g. `gerer-airbnb-marrakech` |
| `category` | enum | yes | `tips` \| `market` \| `guest-experience` |
| `pubDate` | date (YYYY-MM-DD) | yes | Publication date |
| `excerpt` | string (max 160 chars) | yes | Shown on blog index and as meta description |
| `metaDescription` | string (max 160 chars) | no | Overrides excerpt for SEO if provided |
| `featured` | boolean | no | If true, shown prominently on blog index |

### Validation Rules
- `title` must be non-empty and ≤ 70 characters (SEO title length).
- `excerpt` must be ≤ 160 characters (fits meta description limit).
- `pubDate` must be a valid ISO date; future dates result in draft status.
- `category` must match one of the defined enum values; build fails otherwise.
- Body content must be ≥ 400 words (validated by a build-time content check).

### Relationships
- One article belongs to one category.
- Each article exists in both `fr/` and `en/` with matching `slug` values so the
  language toggle can link `fr/{slug}` ↔ `en/{slug}`.

---

## Entity 2: FAQ Item

**Storage**: `src/content/faq/{lang}.json` (array of items)

### Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | yes | Stable identifier, e.g. `what-is-commission` |
| `question` | string | yes | The question text |
| `answer` | string (HTML allowed) | yes | The answer text; may include links |
| `order` | integer | yes | Display order in the accordion |

### Validation Rules
- `id` must be unique within the file.
- `order` values must be unique and sequential starting at 1.
- Matching `id` values must exist in both `fr.json` and `en.json`.

---

## Entity 3: Testimonial

**Storage**: `src/content/testimonials.json` (single file, bilingual)

### Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | yes | Stable identifier |
| `name` | string | yes | Landlord first name + initial (e.g. "Karim B.") |
| `propertyType` | string | yes | e.g. "Appartement 2 pièces, Médina" |
| `quote.fr` | string | yes | Quote in French |
| `quote.en` | string | yes | Quote in English |
| `result` | string | yes | Headline stat, e.g. "+40% de revenus" |
| `avatar` | string (path) | no | Optional avatar image path |

### Validation Rules
- Minimum 3 testimonials required (build warning if fewer).
- `result` must be a concrete quantified statement (enforced by convention, not schema).

---

## Entity 4: Statistic

**Storage**: `src/content/stats.json` (bilingual)

### Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | yes | Stable identifier |
| `value` | string | yes | Display value, e.g. "87%" or "+40%" |
| `label.fr` | string | yes | Label in French |
| `label.en` | string | yes | Label in English |
| `footnote.fr` | string | no | Optional disclaimer in French |
| `footnote.en` | string | no | Optional disclaimer in English |

### Validation Rules
- Minimum 3 statistics required (homepage social proof section).
- Mock stats MUST include a footnote marking them as illustrative (e.g.
  "Données illustratives basées sur des propriétés similaires à Marrakech").

---

## Entity 5: Portfolio Item (Interior Design)

**Storage**: `src/content/portfolio.json` + images in `src/assets/images/portfolio/`

### Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | yes | Stable identifier |
| `image` | string (path) | yes | Path to "after" photo in assets |
| `alt.fr` | string | yes | Alt text in French for accessibility |
| `alt.en` | string | yes | Alt text in English |
| `caption.fr` | string | yes | Caption in French |
| `caption.en` | string | yes | Caption in English |
| `propertyType` | string | yes | e.g. "Riad, Médina de Marrakech" |
| `order` | integer | yes | Display order in gallery |

### Validation Rules
- If image file is missing at build time, Astro's image component will throw a build error.
- Placeholder images (e.g. gray boxes with dimensions) are used until client provides photos.
- Alt text must be descriptive, not empty (accessibility requirement, Principle VI).

---

## Entity 6: Service

**Storage**: `src/content/services.json` (bilingual)

### Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | yes | Stable identifier |
| `icon` | string | yes | Heroicons icon name |
| `title.fr` | string | yes | Service name in French |
| `title.en` | string | yes | Service name in English |
| `description.fr` | string | yes | Description in French |
| `description.en` | string | yes | Description in English |
| `order` | integer | yes | Display order |

### Services at launch (6 items)

| id | title (FR) |
|----|------------|
| `listing` | Création d'annonce |
| `communication` | Communication invités |
| `cleaning` | Coordination ménage |
| `pricing` | Tarification dynamique |
| `maintenance` | Suivi maintenance |
| `design` | Assistance décoration intérieure |

---

## Entity 7: Lead (Contact Form Submission)

**Storage**: Formspree (external service) — not stored in the static site.

### Form Fields Sent to Formspree

| Field name | Type | Required | Validation |
|------------|------|----------|------------|
| `name` | string | yes | Non-empty, ≤ 100 chars |
| `phone` | string | yes | Moroccan format preferred; non-empty |
| `email` | string | yes | Valid email format |
| `neighborhood` | string | yes | Non-empty |
| `num_properties` | integer | no | 1–50 range if provided |
| `message` | string | no | ≤ 1000 chars |
| `_language` | hidden string | yes | `fr` or `en` — set by JS based on current language |

### Notes
- `_language` is a hidden field that records which language the visitor was using
  when they submitted, helping KechBnb respond in the right language.
- Formspree honeypot field `_gotcha` is included to reduce spam.

---

## Translation Key Structure

**Storage**: `src/i18n/fr.json` and `src/i18n/en.json`

Top-level keys mirror the page/section structure:

```
nav.*          — navigation labels
hero.*         — homepage hero section
services.*     — services page strings
how-it-works.* — how it works page strings
portfolio.*    — interior design page strings
contact.*      — contact page + form strings
faq.*          — FAQ page strings
blog.*         — blog index + article strings
footer.*       — footer strings
common.*       — shared UI strings (buttons, errors, success messages)
```

All keys must exist in both language files. Missing keys cause a TypeScript build error
(Astro's typed i18n feature ensures exhaustive key coverage).
