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
tags: ["tag1", "tag2", "tag3"]
image: "/images/blog/slug.webp"
---
```

- **title** — Punchy, conversational. Can use em-dash for subtitle. Examples: "Never Applied for a Job Before — Part One", "From Internet Cafes to VPS", "Local LLMs on Intel Arc"
- **excerpt** — Short hook. No age references unless specifically requested.
- **date** — YYYY-MM-DD format.
- **tags** — Relevant keywords. Common tags: `personal`, `career`, `programming`, `guyana`, `opinion`, `ai`, `development`, `music`, `production`, `self-hosting`, `job-hunt`
- **image** — Path format `/images/blog/filename.webp`. Must exist in `public/images/blog/`.

## Image Rules

- **Location**: `public/images/blog/`
- **Naming**: kebab-case, descriptive, matches article slug when possible
- **Format**: `.webp` preferred
- **Reference in frontmatter as**: `/images/blog/filename.webp`

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
- [ ] Image is in `public/images/blog/` as `.webp`
- [ ] Image path in frontmatter matches actual file
- [ ] No age references unless explicitly requested
- [ ] No AI-style `"—phrase—"` parenthetical dashes
- [ ] Sentences flow — not too many periods
- [ ] Voice is natural, not corporate
- [ ] Sign-off at the end
- [ ] Read aloud test passes
