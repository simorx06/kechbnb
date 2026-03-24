# Contract: i18n Translation Key Structure

**Type**: JSON key-value contract
**Files**: `src/i18n/fr.json` (primary) and `src/i18n/en.json` (secondary)
**Enforcement**: TypeScript type generation at build time — missing keys = build error

---

## Required Key Groups

Every key listed here MUST exist in both language files with a non-empty string value.

### `nav` — Navigation

| Key | FR value (example) | EN value (example) |
|-----|-------------------|-------------------|
| `nav.home` | Accueil | Home |
| `nav.services` | Services | Services |
| `nav.how-it-works` | Comment ça marche | How It Works |
| `nav.portfolio` | Décoration intérieure | Interior Design |
| `nav.faq` | FAQ | FAQ |
| `nav.blog` | Blog | Blog |
| `nav.contact` | Contact | Contact |
| `nav.cta` | Estimation gratuite | Free Estimate |
| `nav.lang-toggle` | EN | FR |

### `hero` — Homepage Hero

| Key | Description |
|-----|-------------|
| `hero.headline` | Main headline (max 60 chars) |
| `hero.subheadline` | Supporting line (max 120 chars) |
| `hero.cta` | CTA button label |
| `hero.badge` | Trust badge text (e.g. "20% commission tout inclus") |

### `services` — Services Page

| Key | Description |
|-----|-------------|
| `services.page-title` | `<title>` tag value |
| `services.meta-description` | Meta description (max 160 chars) |
| `services.headline` | Page H1 |
| `services.intro` | Introductory paragraph |
| `services.commission-note` | Note explaining 20% covers all services |
| `services.cta` | Bottom-of-page CTA label |

### `how-it-works` — How It Works Page

| Key | Description |
|-----|-------------|
| `how-it-works.page-title` | `<title>` tag value |
| `how-it-works.meta-description` | Meta description |
| `how-it-works.headline` | Page H1 |
| `how-it-works.step-{1..6}.title` | Step title (6 keys) |
| `how-it-works.step-{1..6}.description` | Step description (6 keys) |
| `how-it-works.cta` | Bottom CTA label |

### `portfolio` — Interior Design Page

| Key | Description |
|-----|-------------|
| `portfolio.page-title` | `<title>` tag value |
| `portfolio.meta-description` | Meta description |
| `portfolio.headline` | Page H1 |
| `portfolio.intro` | Introductory paragraph |
| `portfolio.cta` | CTA label |

### `contact` — Contact Page & Form

| Key | Description |
|-----|-------------|
| `contact.page-title` | `<title>` tag value |
| `contact.meta-description` | Meta description |
| `contact.headline` | Page H1 |
| `contact.form.name` | Name field label |
| `contact.form.phone` | Phone field label |
| `contact.form.email` | Email field label |
| `contact.form.neighborhood` | Neighborhood field label |
| `contact.form.num-properties` | Number of properties label |
| `contact.form.message` | Message field label |
| `contact.form.submit` | Submit button label |
| `contact.form.success` | Success message |
| `contact.form.error` | Generic error message |
| `contact.form.error-required` | Inline required field error |
| `contact.form.error-email` | Inline email format error |
| `contact.phone` | KechBnb phone number |
| `contact.email` | KechBnb email address |
| `contact.address` | KechBnb address |

### `faq` — FAQ Page

| Key | Description |
|-----|-------------|
| `faq.page-title` | `<title>` tag value |
| `faq.meta-description` | Meta description |
| `faq.headline` | Page H1 |
| `faq.cta` | Bottom CTA label |

### `blog` — Blog Index & Article Pages

| Key | Description |
|-----|-------------|
| `blog.page-title` | Index `<title>` tag |
| `blog.meta-description` | Index meta description |
| `blog.headline` | Index H1 |
| `blog.category.tips` | Category label: Tips for Landlords |
| `blog.category.market` | Category label: Marrakech Market |
| `blog.category.guest-experience` | Category label: Guest Experience |
| `blog.read-more` | "Read more" link label |
| `blog.article-cta` | In-article CTA label |
| `blog.published` | "Published on" prefix |

### `footer` — Footer

| Key | Description |
|-----|-------------|
| `footer.tagline` | Short tagline under logo |
| `footer.nav-title` | Navigation column title |
| `footer.contact-title` | Contact column title |
| `footer.social-title` | Social media column title |
| `footer.copyright` | Copyright line |

### `common` — Shared UI Strings

| Key | Description |
|-----|-------------|
| `common.cta-global` | Global CTA label used across pages |
| `common.loading` | Loading state text |
| `common.skip-to-content` | Accessibility skip link |
| `common.close` | Close button aria-label |
| `common.expand` | Expand button aria-label (accordion) |
| `common.collapse` | Collapse button aria-label (accordion) |

---

## Enforcement

- A TypeScript utility `getTranslation(lang, key)` is typed against a generated type
  from `fr.json` — any key used in code that doesn't exist in the JSON files causes a
  TypeScript compile error.
- Both language files MUST have identical top-level key sets; a CI check compares the
  key lists and fails the build if they diverge.
