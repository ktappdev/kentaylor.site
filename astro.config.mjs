// @ts-check
import { readdirSync, readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

import { tagToSlug } from './src/lib/tags.ts';

const BLOG_CONTENT_DIR = new URL('./src/content/blog/', import.meta.url);

// The sitemap integration runs outside the content layer, so it cannot call
// getPublishedBlogPosts(). Read the frontmatter directly instead; both failure
// modes are benign (a page stays listed, or a lastmod is left off).
function readBlogFrontmatter() {
  const posts = [];

  for (const file of readdirSync(BLOG_CONTENT_DIR)) {
    if (!file.endsWith('.mdx')) continue;

    const source = readFileSync(new URL(file, BLOG_CONTENT_DIR), 'utf8');
    const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1];
    if (!frontmatter) continue;
    if (/^draft:\s*true\s*$/m.test(frontmatter)) continue;

    const date =
      readScalar(frontmatter, 'updatedDate') ?? readScalar(frontmatter, 'date');
    if (!date) continue;

    posts.push({
      slug: readScalar(frontmatter, 'slug') ?? file.replace(/\.mdx$/, ''),
      date,
      tags: readTags(frontmatter),
    });
  }

  return posts;
}

function readScalar(frontmatter, key) {
  const value = frontmatter.match(new RegExp(`^${key}:\\s*(.+?)\\s*$`, 'm'))?.[1];
  return value?.replace(/^["']|["']$/g, '') || undefined;
}

// tags may be an inline array or a multi-line flow sequence, so collect every
// quoted string up to the closing bracket rather than matching a single line.
function readTags(frontmatter) {
  const start = frontmatter.search(/^tags:/m);
  if (start === -1) return [];

  const rest = frontmatter.slice(start + 'tags:'.length);
  const closing = rest.indexOf(']');
  const block = closing === -1 ? rest.split('\n')[0] : rest.slice(0, closing + 1);

  return [...block.matchAll(/"([^"]*)"|'([^']*)'/g)]
    .map((match) => match[1] ?? match[2])
    .filter(Boolean);
}

const blogPosts = readBlogFrontmatter();

const blogLastmod = new Map();
for (const post of blogPosts) {
  const date = new Date(post.date);
  if (!Number.isNaN(date.valueOf())) {
    blogLastmod.set(`/blog/${post.slug}/`, date.toISOString());
  }
}

const tagPostCounts = new Map();
for (const post of blogPosts) {
  for (const slug of new Set(post.tags.map(tagToSlug))) {
    tagPostCounts.set(slug, (tagPostCounts.get(slug) ?? 0) + 1);
  }
}

// A noindex page must not also be advertised in the sitemap.
const noindexPaths = new Set([
  '/blog/search/',
  ...[...tagPostCounts]
    .filter(([, count]) => count < 2)
    .map(([slug]) => `/blog/tag/${slug}/`),
]);

// https://astro.build/config
export default defineConfig({
  site: 'https://kentaylor.dev',
  output: 'static',
  build: {
    inlineStylesheets: 'always',
  },
  legacy: {
    collectionsBackwardsCompat: true,
  },
  integrations: [
    react(),
    mdx(),
    sitemap({
      filter: (page) => !noindexPaths.has(new URL(page).pathname),
      // Only content pages get a lastmod. Stamping every page with the build time
      // produces a signal Google learns to ignore.
      serialize: (item) => {
        const lastmod = blogLastmod.get(new URL(item.url).pathname);
        return lastmod ? { ...item, lastmod } : item;
      },
    }),
    vercel({
      imageService: true,
    }),
  ],
  image: {
    remotePatterns: [{ hostname: 'kentaylor.dev' }],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
