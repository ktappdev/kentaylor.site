import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { getCollection, type CollectionEntry } from "astro:content";
import { SITE } from "./site";

export type BlogPost = CollectionEntry<"blog">;

const WORDS_PER_MINUTE = 200;

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  const posts = await getCollection("blog", ({ data }) => !data.draft);

  return posts.sort(
    (left, right) => right.data.date.valueOf() - left.data.date.valueOf(),
  );
}

export function getPostUrl(postOrSlug: BlogPost | string): string {
  const slug = typeof postOrSlug === "string" ? postOrSlug : postOrSlug.slug || (postOrSlug.id ? postOrSlug.id.split('/').pop() : 'default-slug');
  return `/blog/${slug}/`;
}

export function getPostOgImageUrl(postOrSlug: BlogPost | string): string {
  const slug = typeof postOrSlug === "string" ? postOrSlug : postOrSlug.slug;
  return `/og/${slug}.png`;
}

export function getPostStructuredImageUrls(
  postOrSlug: BlogPost | string,
): string[] {
  const slug = typeof postOrSlug === "string" ? postOrSlug : postOrSlug.slug;
  return [
    `/og/${slug}/16x9.png`,
    `/og/${slug}/4x3.png`,
    `/og/${slug}/1x1.png`,
  ];
}

export function getPostSeoTitle(post: BlogPost): string {
  return post.data.seoTitle ?? `${post.data.title} | ${SITE.name}`;
}

export function getPostSeoDescription(post: BlogPost): string {
  return post.data.seoDescription ?? post.data.excerpt;
}

export function getPostUpdatedDate(post: BlogPost): Date {
  return post.data.updatedDate ?? post.data.date;
}

export function getPostImageAlt(post: BlogPost): string {
  return post.data.imageAlt ?? `${post.data.title} cover image`;
}

export function getPostCoverImage(post: BlogPost): string {
  if (post.data.image && publicAssetExists(post.data.image)) {
    return post.data.image;
  }

  return getPostOgImageUrl(post);
}

export function getPostReadingTimeMinutes(post: BlogPost): number {
  const wordCount = countWords(post.body);
  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}

export function getPostReadingTimeLabel(post: BlogPost): string {
  return `${getPostReadingTimeMinutes(post)} min read`;
}

function countWords(content: string): number {
  const cleaned = content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/[#>*_~-]/g, " ")
    .trim();

  if (!cleaned) {
    return 0;
  }

  return cleaned.split(/\s+/).length;
}

function publicAssetExists(path: string): boolean {
  if (!path.startsWith("/")) {
    return false;
  }

  try {
    return existsSync(
      fileURLToPath(new URL(`../../public${path}`, import.meta.url)),
    );
  } catch {
    return false;
  }
}
