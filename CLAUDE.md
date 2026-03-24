# KechBnb — Claude Code Context

## Project Overview

Static promotional website for KechBnb, a full-service Airbnb property management company
in Marrakech, Morocco. Targets landlords. Primary goal: convert visitors into leads via
a contact form.

## Tech Stack

- **Framework**: Astro 4.x (static output — `output: "static"` in astro.config.mjs)
- **CSS**: Tailwind CSS 3.x + CSS custom properties in `styles/tokens.css`
- **Language**: TypeScript 5, HTML5, CSS3, JavaScript ES2022
- **Icons**: Heroicons (inline SVG via `src/components/ui/Icon.astro`)
- **Images**: Astro built-in `<Image>` / `<Picture>` components (WebP/AVIF output)
- **Forms**: Formspree (endpoint ID in `PUBLIC_FORMSPREE_ID` env var)
- **Blog/Content**: Astro Content Collections (Markdown files)
- **Deployment**: Netlify (or Cloudflare Pages)

## Key Constraints

- **Zero server runtime in production** — fully static output only
- **Bilingual**: French (`/fr/`) primary, English (`/en/`) secondary
- **Lighthouse Performance ≥ 90** mobile — guard this on every PR
- **WCAG 2.1 AA** — all pages must pass axe-core checks
- **Brand tokens** in `styles/tokens.css` are the single source of truth for colors/spacing
- **No dark patterns**, no fake urgency, no unverified superlative claims

## Directory Layout

```
src/
├── assets/           # Logo + portfolio images (client-provided)
├── components/
│   ├── layout/       # Header, Footer, LanguageToggle
│   ├── sections/     # Page sections (Hero, Services, etc.) — use /frontend-design skill
│   ├── ui/           # Atoms: Button, Card, CtaBanner, Icon
│   └── forms/        # ContactForm
├── content/          # JSON + Markdown content files
├── i18n/             # fr.json, en.json, utils.ts
├── layouts/          # BaseLayout, PageLayout, BlogLayout
├── pages/
│   ├── fr/           # French pages
│   └── en/           # English pages
└── index.astro       # Redirects → /fr/
styles/
└── tokens.css        # CSS custom properties (brand colors, typography, spacing)
```

## Important Files

- `specs/001-kechbnb-website/spec.md` — feature specification
- `specs/001-kechbnb-website/plan.md` — implementation plan
- `specs/001-kechbnb-website/data-model.md` — content schemas
- `specs/001-kechbnb-website/contracts/` — form, i18n, and content schema contracts
- `specs/001-kechbnb-website/quickstart.md` — local dev setup
- `.specify/memory/constitution.md` — project constitution (governance rules)

## Implementation Notes

- Use the `/frontend-design` skill for each section component individually
- Mock data files are marked `<!-- MOCK DATA — replace with real content -->`
- Language toggle persists via `localStorage` key `kechbnb_lang`
- Contact form uses AJAX POST to Formspree; falls back to native HTML POST without JS
- Blog articles must be ≥ 400 words (enforced by remark plugin at build time)
