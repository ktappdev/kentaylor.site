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
- **Framework**: Astro 5.x
- **Styling**: Tailwind CSS v4 + custom CSS
- **UI Components**: React + Framer Motion
- **Content**: MDX for blog posts
- **3D**: React Three Fiber (@react-three/fiber)

## Key Files
- `src/styles/global.css` - Tailwind config + global styles
- `src/content/blog/*.mdx` - Blog posts
- `src/layouts/Layout.astro` - Root layout

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

## Common Mistakes to Avoid
1. Don't create a `tailwind.config.js` file
2. Don't use `@import` for Tailwind plugins - use `@plugin`
3. Custom colors use CSS variables (`--color-*`) not JS config
4. The typography plugin classes work differently in v4

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
