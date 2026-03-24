# Quickstart: KechBnb Website — Local Development

**Branch**: `001-kechbnb-website` | **Date**: 2026-03-24

---

## Prerequisites

- Node.js ≥ 18
- npm ≥ 9 (or pnpm ≥ 8)
- A Formspree account + form endpoint (get at formspree.io — free tier)
- Git

---

## 1. Install Dependencies

```bash
npm install
```

---

## 2. Configure Environment

Copy the example env file and fill in your Formspree form ID:

```bash
cp .env.example .env
```

Edit `.env`:

```
PUBLIC_FORMSPREE_ID=your_form_id_here
```

> **Where to find your form ID**: In your Formspree dashboard → Forms → copy the
> alphanumeric ID from the endpoint URL (e.g. `xrgvkpqb`).

---

## 3. Start Development Server

```bash
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser.

- French site: [http://localhost:4321/fr/](http://localhost:4321/fr/)
- English site: [http://localhost:4321/en/](http://localhost:4321/en/)

---

## 4. Add Your Logo

Place your logo file at:

```
src/assets/logo.svg    (preferred)
src/assets/logo.png    (fallback)
```

The `<Header>` component already references `src/assets/logo.svg`.

---

## 5. Add Interior Design Photos

Drop your "after" photos into:

```
src/assets/images/portfolio/
```

Then update `src/content/portfolio.json` with the corresponding entries
(see [data-model.md](./data-model.md) for the schema).

---

## 6. Add FAQ Content

Edit `src/content/faq/fr.json` and `src/content/faq/en.json` with your question-answer
pairs (see [data-model.md](./data-model.md) for the schema).

---

## 7. Write a Blog Article

Create a Markdown file in both language directories:

```
src/content/blog/fr/mon-article.md
src/content/blog/en/mon-article.md
```

Required frontmatter:

```markdown
---
title: "Titre de l'article"
slug: mon-article
category: tips
pubDate: 2026-03-24
excerpt: "Résumé de 50 à 160 caractères."
---

Article body here (minimum 400 words)...
```

---

## 8. Build for Production

```bash
npm run build
```

Output is in `dist/`. The entire `dist/` folder is a static bundle — no server needed.

---

## 9. Preview Production Build Locally

```bash
npm run preview
```

---

## 10. Deploy to Netlify

Option A — drag and drop: Go to [netlify.com](https://netlify.com) → drag the `dist/` folder.

Option B — git integration (recommended):
1. Push repo to GitHub
2. Connect repo to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add environment variable `PUBLIC_FORMSPREE_ID` in Netlify dashboard

---

## Validation Checklist (before every deploy)

- [ ] `npm run build` completes with zero errors
- [ ] Run `npx lighthouse http://localhost:4321/fr/` — Performance ≥ 90 mobile
- [ ] Run `npx axe-core` or browser extension — zero WCAG AA violations on all 7 pages
- [ ] Test contact form submission — confirm lead arrives in Formspree dashboard
- [ ] Test language toggle on all 7 pages — all content switches correctly
- [ ] Test on mobile viewport (375px) — no horizontal scroll on any page
- [ ] Confirm all 7 required pages exist and render without errors
