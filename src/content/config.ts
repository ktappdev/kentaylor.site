import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.date(),
    tags: z.array(z.string()),
    image: z.string().optional(),
  }),
});

export const collections = { blog };
