import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.date(),
    updatedDate: z.date().optional(),
    tags: z.array(z.string()),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  type: "content",
  schema: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    category: z.enum(["software", "site"]),
    image: z.string(),
    technologies: z.array(z.string()),
    link: z.string().optional(),
    github: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { blog, projects };
