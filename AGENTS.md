# Agent Guidelines for kentaylor.dev

## Tailwind CSS v4 - Important Differences

This project uses **Tailwind CSS v4**, which has significant changes from v3 that commonly trip up LLMs:

### 1. No tailwind.config.js
- Configuration is done entirely in CSS via `@theme` blocks
- Found in: `src/styles/global.css`

### 2. Plugin Import Syntax
```css
/* WRONG (v3 style) */
@import "@tailwindcss/typography";

/* CORRECT (v4 style) */
@plugin "@tailwindcss/typography";
```

### 3. Main Import
```css
/* v4 uses this */
@import "tailwindcss";

/* NOT these (v3 style) */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 4. CSS-First Configuration
All custom colors, fonts, etc. are defined in the `@theme` block in global.css:
```css
@theme {
  --color-bg: #0a0a0a;
  --color-surface: #141414;
  --font-mono: 'JetBrains Mono', monospace;
}
```

### 5. No Content Configuration
Tailwind v4 automatically detects content - no `content: []` array needed.

## Project Stack
- **Framework**: Astro 6.x (content layer with `legacy.collectionsBackwardsCompat`)
- **Styling**: Tailwind CSS v4 + custom CSS
- **UI Components**: React + Framer Motion
- **Content**: MDX for blog posts and projects
- **3D**: React Three Fiber (@react-three/fiber)

## Key Files
- `src/styles/global.css` - Tailwind config + global styles
- `src/content/blog/*.mdx` - Blog posts
- `src/content/projects/*.mdx` - Project entries
- `src/content.config.ts` - Collection schemas (blog, projects)
- `src/lib/site.ts` - Site constants, author identity, geo data
- `src/lib/blog.ts` - Post helpers: slugs, reading time, OG fallback, tag counts
- `src/lib/tags.ts` - Tag slug helpers. **Keep dependency-free**: `astro.config.mjs` imports it, so it must not pull in `astro:content`.
- `src/lib/structured-data.ts` - JSON-LD builders
- `src/layouts/Layout.astro` - Root layout
- `BLOG-GUIDE.md` - Authoritative blog writing, voice, and tagging rules

## Site Config
- `src/lib/site.ts` is the single source of truth for title, description,
  canonical URL, social handles, and location. Change it there, not in pages.
- `astro.config.mjs` duplicates frontmatter parsing for the sitemap because the
  integration runs outside the content layer. If blog frontmatter changes shape,
  update `readBlogFrontmatter()` in the same commit.

## Blog Posts and SEO
- New blog posts automatically get SEO metadata, structured data, sitemap inclusion, RSS inclusion, and social image support when they follow the existing MDX frontmatter format.
- For new blog posts, follow the format of the existing files in `src/content/blog/*.mdx`.
- Required blog frontmatter:
  - `title`
  - `excerpt`
  - `date`
  - `tags`
- Optional blog frontmatter:
  - `updatedDate`
  - `image`
  - `imageAlt`
  - `seoTitle`
  - `seoDescription`
  - `draft`
- If `image` is omitted or the referenced file does not exist, the site falls back to an auto-generated OG image for that post.
- No extra manual SEO step is required for each new blog post after adding the file and deploying.
- `slug` is optional frontmatter. It is declared in `src/content.config.ts` so `getPostSlug()` and the sitemap's frontmatter parser agree. Omit it unless you need a URL that differs from the filename.

## Tagging Rules (important for SEO)
- Tags come from a fixed controlled vocabulary documented in `BLOG-GUIDE.md`: `programming`, `ai`, `self-hosting`, `development`, `guyana`, `personal`, `career`, `music`, `opinion`.
- Pick 2 to 5 tags per post.
- Do not invent per-post tags. `astro.config.mjs` marks a tag page `noindex` and strips it from the sitemap when fewer than 2 posts share it, so a one-off tag creates a dead page.
- Do not tag proper nouns, event names, sponsors, technologies, or project names. Those terms belong in the prose and in `seoTitle`/`seoDescription`.
- Tag pages are internal-link hubs linked from `/blog/` via `getTagCounts()` in `src/lib/blog.ts`. Keep that list in sync by using the vocabulary rather than ad-hoc tags.

## Common Mistakes to Avoid
1. Don't create a `tailwind.config.js` file
2. Don't use `@import` for Tailwind plugins - use `@plugin`
3. Custom colors use CSS variables (`--color-*`) not JS config
4. The typography plugin classes work differently in v4
5. Don't add a one-off blog tag; it produces a noindexed dead-end tag page
6. Don't hardcode site metadata in a page; edit `src/lib/site.ts`
7. Don't move tag logic into `astro.config.mjs` helpers that need `astro:content`

## Writing Style — Anti-AI-Tell Rules

Blog posts on this site start as the author's spoken thoughts, then get rewritten for clarity. DO NOT introduce AI stylistic fingerprints during rewriting.

### Banned patterns (remove if you see them)
- **Em dashes (—)** — Use commas, periods, semicolons, or sentence breaks instead. A real person doesn't lean on — for every aside.
- **"Here's the thing" / "Here's where it gets interesting" / "Here's the setup"** — Cut these. AI transition filler.
- **"I must tell you something" / "Trust me" / "Don't get me wrong"** — AI rapport-building. Cut it.
- **"Full stop." / "Big time." / "Period."** — AI trying to sound punchy. Remove.
- **"Think about that." / rhetorical nudges** — Cut. The reader doesn't need to be told to think.
- **"We're talking..." / "I'm talking..."** — Just state the thing. Not "we're talking RTX 4060 level" but "RTX 4060 level."
- **"The clever part?" / "The [adj] part?"** — Rephrase naturally. AI loves this structure.

### Reduce (use sparingly, if at all)
- **"Honestly" / "Genuinely" / "Actually"** — 90% can be cut without losing meaning.
- **Italic emphasis** (*word*) — One or two per post max. Not every paragraph.
- **Bold emphasis** (**word**) — Only for structural purposes (list headers, key terms on first use). Never for dramatic effect.
- **"Way" as intensifier** — "Way better" → "much better." "Way too slow" → "too slow."
- **"Let me..." / "Let's be..."** — Just say the thing. Don't announce you're about to say it.

### Keep
- **Contractions** — "I'm", "don't", "it's" are natural. Use them.
- **Sentence fragments** — Real people write fragments. They're fine.
- **The author's actual opinions and facts** — Never change what's being said, only how it's said.
- **Imperfect grammar** — If something reads like natural speech (run-ons, casual phrasing), leave it. Over-correction is itself an AI tell.

### North star
After writing, ask: would someone who knows the author recognize his voice? If the answer is no, rewrite.
