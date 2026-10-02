# kentaylor.dev

Personal site, blog, and project portfolio for Ken Taylor (@ktappdev), a
self-taught software engineer and entrepreneur in Georgetown, Guyana.

## Stack

- **Astro 6** (static output) with content-layer collections
- **React 19** islands + **Framer Motion** for interactive components
- **React Three Fiber** for the 3D hero scene
- **Tailwind CSS v4** (CSS-first config, no `tailwind.config.js`)
- **MDX** for blog posts and projects
- **sharp** for build-time OG image generation
- Deployed to **Vercel** with sitemap, RSS, and Analytics

## Commands

| Command | Action |
|---------|--------|
| `npm install` | Install dependencies |
| `npm run dev` | Start the dev server at `localhost:4321` |
| `npm run build` | Build to `dist/` |
| `npm run preview` | Preview the built site |

## Project structure

```
src/
  components/       Astro and React components (Blog, Hero, Projects, SEO, UI)
  content/
    blog/*.mdx      Blog posts
    projects/*.mdx  Project entries
  layouts/          Layout.astro root layout
  lib/              site config, blog helpers, tags, JSON-LD builders, OG images
  pages/            Routes, including generated /og/ PNG routes
  styles/           global.css holds the Tailwind v4 @theme tokens
public/             Static assets, including blog images and the CV PDF
```

## Adding a blog post

1. Create `src/content/blog/<slug>.mdx`.
2. Add frontmatter: `title`, `excerpt`, `date`, `tags` (2-5 tags from the
   controlled vocabulary), and optionally `image`, `imageAlt`, `seoTitle`,
   `seoDescription`, `draft`.
3. Drop the cover image in `public/images/blog/` and reference it in frontmatter.
4. Build to verify.

Follow `BLOG-GUIDE.md` for the writing voice and the tag vocabulary. SEO
metadata, JSON-LD, sitemap, RSS, and OG image fallback are all automatic; there
is no manual SEO step per post.

## Site configuration

`src/lib/site.ts` is the single source of truth for the site title, default
description, canonical URL, social links, and author geo data. Update it there
rather than editing individual pages.

`astro.config.mjs` also parses blog frontmatter directly (for sitemap URLs and
`lastmod`) because the sitemap integration runs outside the content layer. If the
blog frontmatter shape changes, update `readBlogFrontmatter()` in the same change.

## SEO notes

- Tag pages (`/blog/tag/<tag>/`) are `noindex` when fewer than two posts share
  the tag, and are excluded from the sitemap. This keeps thin tag pages out of
  the index.
- The sitemap only stamps `lastmod` on blog URLs, so Google does not learn to
  ignore build-time timestamps.
- `sitemap: true` and `public/robots.txt` point to the sitemap index.
