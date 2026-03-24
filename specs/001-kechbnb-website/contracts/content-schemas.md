# Contract: Content Collection Schemas

**Type**: Astro Content Collection frontmatter schemas
**Enforcement**: Zod schema validation at build time — invalid frontmatter = build error

---

## Blog Article Schema

```typescript
// src/content/config.ts (Astro content collection definition)
const blogSchema = z.object({
  title:           z.string().min(1).max(70),
  slug:            z.string().regex(/^[a-z0-9-]+$/),
  category:        z.enum(["tips", "market", "guest-experience"]),
  pubDate:         z.coerce.date(),
  excerpt:         z.string().min(50).max(160),
  metaDescription: z.string().max(160).optional(),
  featured:        z.boolean().default(false),
});
```

**Content rules**:
- Body must be ≥ 400 words (enforced by a build-time remark plugin).
- Each article must have a matching slug in the opposite language directory.

---

## Portfolio Item Schema

```typescript
const portfolioSchema = z.object({
  id:           z.string(),
  image:        z.string(),          // relative path to src/assets/images/portfolio/
  alt:          z.object({ fr: z.string(), en: z.string() }),
  caption:      z.object({ fr: z.string(), en: z.string() }),
  propertyType: z.string(),
  order:        z.number().int().positive(),
});
```

---

## Testimonial Schema

```typescript
const testimonialSchema = z.object({
  id:           z.string(),
  name:         z.string(),
  propertyType: z.string(),
  quote:        z.object({ fr: z.string(), en: z.string() }),
  result:       z.string(),          // e.g. "+40% de revenus"
  avatar:       z.string().optional(),
});
```

Minimum 3 items enforced by a build-time check.

---

## Statistic Schema

```typescript
const statSchema = z.object({
  id:       z.string(),
  value:    z.string(),
  label:    z.object({ fr: z.string(), en: z.string() }),
  footnote: z.object({ fr: z.string(), en: z.string() }).optional(),
});
```

All mock statistics MUST include a `footnote` with an illustrative data disclaimer.

---

## Service Schema

```typescript
const serviceSchema = z.object({
  id:          z.string(),
  icon:        z.string(),           // Heroicons icon name
  title:       z.object({ fr: z.string(), en: z.string() }),
  description: z.object({ fr: z.string(), en: z.string() }),
  order:       z.number().int().positive(),
});
```

---

## FAQ Item Schema

```typescript
const faqSchema = z.object({
  id:       z.string(),
  question: z.object({ fr: z.string(), en: z.string() }),
  answer:   z.object({ fr: z.string(), en: z.string() }),
  order:    z.number().int().positive(),
});
```
