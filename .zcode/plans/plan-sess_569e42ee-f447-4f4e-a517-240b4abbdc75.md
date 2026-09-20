## Blog SEO: fix the defects and tighten crawl hygiene

Scope is the two chosen items: the real defects plus index hygiene, and `noindex` for single-post tag pages. No blog content is edited.

### 1. Report the real social-image size instead of a hardcoded 1200x630

Today every post declares `og:image:width=1200` / `og:image:height=630` while the actual images are 1200x800, 682x384, 1086x724, 1600x753, 1200x655, 1000x659. Aspect ratios range 1.5 to 2.1 against a declared 1.905, which is what makes a preview get cropped or downgraded.

- `src/lib/blog.ts`: add `getPostSocialImage(post)` returning `{ src, alt, width, height, type }`. If the post has a cover image that exists in `public/`, read its true dimensions and format with `sharp` (already a dependency) and map the format to a MIME type. Otherwise fall back to the generated `/og/{slug}.png` and take the dimensions from `OG_SOCIAL_SIZE`. Cache results in a module-level map so sharp runs once per image.
- `src/pages/blog/[slug].astro`: replace the hardcoded `width: 1200, height: 630` and the extension-only `type` ternary with the values from that helper. This also emits the `og:image:type` that is currently missing for the `.webp` cover on `multi-agent-coding-setup`.
- Same file, optional: pass the real width/height to the in-body `<Image>` instead of 1200x630. No visual change (the CSS sets `h-auto`), it just stops the intrinsic-size hint from lying.

### 2. Make the generated card match its declared size

`src/lib/og.ts` calls `sharp(svg, { density: 144 })`, which rasterizes at 2x, so the "1200x630" social card is actually 2400x1260 and the structured variants are 3200x1800 rather than 1600x900. Remove the density multiplier so the output equals the requested dimensions and `OG_SOCIAL_SIZE` / `OG_STRUCTURED_SIZES` become truthful. The file sizes drop about 4x, so the OG routes build faster, and the shapes Google asks for (16x9, 4x3, 1x1, at least 1200px wide) still hold. If you would rather keep the crisper 2x rasters, the alternative is to keep the density and declare the doubled numbers.

### 3. Keep URLs we just marked noindex out of the sitemap

An indexable/noindex URL submitted in a sitemap is a contradictory signal and shows up in Search Console as "submitted URL marked noindex", so this part has to travel with the noindex changes.

- `src/pages/blog/search.astro`: pass `robots="noindex,follow"` to the Layout. `follow` stays so the blog links are still crawled.
- `src/lib/tags.ts` (new): extract the `tagToSlug` rule that is currently inlined in the tag page and in the post page's tag links, so the slug format has one definition.
- `src/pages/blog/tag/[tag].astro`: add a single-post check and pass `robots="noindex,follow"` only for those. Passing `undefined` for the rest falls through to `SeoHead`'s existing `index,follow` default, so the tag pages backed by two or more posts keep indexing normally. Today that leaves 8 indexed tags (music, programming, guyana, personal, self-hosting, ai, development, opinion) and noindexes 27. Every page stays reachable for visitors.
- `astro.config.mjs`: read the MDX frontmatter at config time to build a post-date map and the set of tag slugs backed by fewer than two published posts, then use `sitemap({ filter, serialize })` to drop `/blog/search/` and the thin tag URLs and to attach `lastmod` to blog posts only. Note the `tags:` blocks include a multi-line flow sequence, so the reader scans quoted strings rather than matching a single-line array.

### Tradeoffs to accept

The config file cannot read `astro:content`, so this parsing is a second reader of the same frontmatter. Both failure modes are benign: a page stays in the sitemap, or a `lastmod` is left off. If you would rather have a single source of truth, the alternative is a hand-rolled `src/pages/sitemap.xml.ts` that calls `getPublishedBlogPosts()`, at the cost of a larger diff and losing the integration's automatic page listing.

`lastmod` is only as accurate as `updatedDate`, which is set on 0 of 8 posts, so every post would report its publish date. Setting `updatedDate` when editing a post is what makes this, and the existing `article:modified_time` / `dateModified`, tell the truth.

Other pages get no `lastmod` rather than a build-time stamp, since a lastmod that changes on every deploy is the kind Google learns to ignore.

### Files touched

`src/lib/blog.ts`, `src/lib/og.ts`, `src/lib/tags.ts` (new), `src/pages/blog/[slug].astro`, `src/pages/blog/search.astro`, `src/pages/blog/tag/[tag].astro`, `astro.config.mjs`. No changes to `src/content/blog/*.mdx`.

### Verification

Run `npm run build` and inspect `dist/`. Confirm blog post HTML reports the real image dimensions (for example `from-internet-cafes-to-vps` should read 1200x800, `3d-portfolio` 1200x630 from the now-truthful card) and that `og:image:type` appears for the webp cover. Confirm `noindex` on the search page and on the 27 single-post tag pages but not the 8 multi-post ones. Confirm `sitemap-0.xml` carries `lastmod` on blog posts only and no longer lists `/blog/search/` or the single-post tag URLs.