import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    // Declared so a frontmatter slug survives validation. getPostSlug() reads it
    // and falls back to the filename, and astro.config.mjs reads it too, so the
    // field has to exist in the schema for both paths to agree.
    slug: z.string().optional(),
    updatedDate: z.coerce.date().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    imageCaption: z.string().optional(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    category: z.string(),
    image: z.string(),
    technologies: z.array(z.string()),
    link: z.string().url().optional(),
    featured: z.boolean(),
    github: z.string().url().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
  projects: projectsCollection,
};
