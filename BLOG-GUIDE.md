# Blog Creation Guide

This project uses MDX files in `src/content/blog/`. Each post needs proper frontmatter, voice, and assets. Follow this guide for every new blog post.

---

## File Location

`src/content/blog/[slug].mdx`

Slug is kebab-case, descriptive, and matches the image filename when possible.

## Frontmatter

```yaml
---
title: "Punchy, Conversational Title — Part X"
excerpt: "One or two sentences. Hook the reader. No fluff."
date: YYYY-MM-DD
tags: ["programming", "self-hosting", "personal"]
image: "/images/blog/slug.png"
---
```

- **title** — Punchy, conversational. Can use em-dash for subtitle. Examples: "Never Applied for a Job Before — Part One", "From Internet Cafes to VPS", "Local LLMs on Intel Arc"
- **excerpt** — Short hook. No age references unless specifically requested.
- **date** — YYYY-MM-DD format.
- **tags** — See the controlled vocabulary below. These are not free-form.
- **image** — Path format `/images/blog/filename.png`. Must exist in `public/images/blog/`. Must be `.png` or `.jpg`, see Image Rules.

## Tag Vocabulary (controlled)

Tags are a fixed set, not free-form. Every tag below is already used by at
least two posts, which is what keeps each `/blog/tag/<tag>/` page out of the
`noindex` bucket and useful as a topical hub.

| Tag | Use it for |
|-----|-----------|
| `programming` | Code craft, languages, debugging, how something was built |
| `ai` | LLMs, agents, local models, AI tooling and industry takes |
| `self-hosting` | VPS, infrastructure, deployment, running your own services |
| `development` | Shipping products, tools you built, the business of building |
| `guyana` | Guyana and Caribbean tech scene, local context, local events |
| `personal` | Personal narrative and story-led posts |
| `career` | Professional path, work, growth, job hunting |
| `music` | Music production, audio engineering, radio |
| `opinion` | Takes and editorials where the post argues a position |

Rules:

- Pick 2 to 5 per post. Fewer is fine.
- Do not invent a new tag for a single post. A tag used once gets `noindex` and
  is filtered out of the sitemap, so it buys nothing.
- Do not tag proper nouns, sponsors, employers, event names, technologies, or
  project names. `"SBM Offshore Guyana"`, `"qwen"`, `"Lyricut"` and similar belong
  in the prose, not the tag list. The technical term still ranks through the body
  copy and the post's `seoTitle`/`seoDescription`.
- Two to five tags per post, chosen from the table above.
- When you publish a draft, re-check counts: a new post should push an existing
  tag up, not introduce a new one.

## Image Rules

- **Location**: `public/images/blog/`
- **Naming**: kebab-case, descriptive, matches article slug when possible
- **Reference in frontmatter as**: `/images/blog/filename.png`

### Cover format: use PNG or JPEG, not WebP

The frontmatter `image` is used for three things: the in-article cover, the
`og:image` / `twitter:image` social card, and the dimensions and MIME type that
`getPostSocialImage()` reads through sharp.

Because it becomes the social card, **do not point `image` at a `.webp` file**.
X, LinkedIn, Facebook, and WhatsApp do not reliably render WebP, so the preview
silently breaks while the page itself looks fine. Use `.png` or `.jpg` for
covers.

`.webp` is still fine for images that only appear inside the article body, where
there is no social-platform compatibility constraint. It is a good way to keep a
large inline screenshot small.

If a cover is very large, prefer trimming or re-exporting it as an optimized
`.png`/`.jpg` over converting it to `.webp`. Some covers in this folder are over
1 MB and are worth re-exporting.

## Voice & Tone

This is non-negotiable. The blog has a distinct voice:

- **First person, conversational**. Write like someone is talking, not lecturing.
- **Keep natural speech patterns**: "you know", "anyhow", "I don't know", "that kind of stuff", "right?" — these are part of the voice.
- **Self-deprecating and honest**. No corporate polish. No false confidence.
- **Fix grammar where it hurts readability**, but don't iron out the personality. "He's very something" stays. "People is doing" gets fixed.
- **No AI-style em-dash parentheticals**. Specifically: never write `"thing—insertion—rest of thing"`. That pattern with dashes on both sides reads like AI. If you need an aside, restructure the sentence or use commas naturally.
- **Avoid choppy sentences**. Too many periods in a row reads robotic. Combine short thoughts into flowing sentences where it makes sense.
- **Guyanese perspective** when relevant. Sign-off line references Guyana naturally.

### Examples of voice preserved

| Keep | Fix |
|------|-----|
| "Anyhow, I hate Java." | "People is doing" → "people are doing" |
| "He's very something" | "I'll give it sometime" → "I'll give it some time" |
| "you know how programmers go" | Repeated filler cleaned up |
| "that kind of stuff" | Run-on sentences broken up |

### AI tells to avoid

- `"—phrase—"` parenthetical flanked by em-dashes
- Overly structured sentences that don't sound like speech
- Corporate or academic phrasing
- Too many short, choppy sentences in a row

## Section Structure

- Use `##` for section headings (not `#`)
- Headings should be conversational but descriptive: "So It Turns Out I'm a Job Seeker Now", "The Coding Thing Was Always There"
- Break the article into 4-6 logical sections
- End with a section that wraps and hints at follow-up if applicable
- Sign-off at the bottom using italic: `*Written from Guyana, South America, where ...*`

## Process

1. Take the raw transcription/notes
2. Identify the core narrative thread
3. Break into sections with headings
4. Rewrite for flow — combine choppy sentences, fix grammar, keep voice
5. Check for AI tells (em-dash parentheticals, overly structured)
6. Check for period density — read aloud to test flow
7. Set the frontmatter with a strong title and excerpt
8. Name and place the image in `public/images/blog/`
9. Final read-through before publishing

## Checklist

- [ ] Frontmatter: title, excerpt, date, tags, image
- [ ] Every tag comes from the controlled vocabulary table above
- [ ] No new one-off tag introduced
- [ ] Image is in `public/images/blog/` as `.png` or `.jpg` (not `.webp`, it is used as the social card)
- [ ] Image path in frontmatter matches actual file
- [ ] No age references unless explicitly requested
- [ ] No AI-style `"—phrase—"` parenthetical dashes
- [ ] Sentences flow — not too many periods
- [ ] Voice is natural, not corporate
- [ ] Sign-off at the end
- [ ] Read aloud test passes
- [ ] `npx astro build` succeeds and the post shows up in `dist/sitemap-0.xml`
