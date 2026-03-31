import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().min(1).max(70),
    category: z.enum(['tips', 'market', 'guest-experience']),
    pubDate: z.coerce.date(),
    excerpt: z.string().min(50).max(160),
    metaDescription: z.string().max(160).optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = {
  blog: blogCollection,
};
