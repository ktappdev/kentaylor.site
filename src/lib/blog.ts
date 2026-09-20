import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { getCollection, type CollectionEntry } from "astro:content";
import { OG_SOCIAL_SIZE } from "./og";
import { getPostSlug } from "./post-slug";
import { SITE } from "./site";

export type BlogPost = CollectionEntry<"blog">;

export interface PostImageMetadata {
  width: number;
  height: number;
  type?: string;
}

export interface PostSocialImage extends PostImageMetadata {
  src: string;
  alt: string;
}

const WORDS_PER_MINUTE = 200;

const IMAGE_TYPE_BY_FORMAT: Record<string, string> = {
  avif: "image/avif",
  gif: "image/gif",
  heif: "image/heif",
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  png: "image/png",
  svg: "image/svg+xml",
  tiff: "image/tiff",
  webp: "image/webp",
};

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  const posts = await getCollection("blog", ({ data }) => !data.draft);

  return posts.sort(
    (left, right) => right.data.date.valueOf() - left.data.date.valueOf(),
  );
}

export function getPostUrl(postOrSlug: BlogPost | string): string {
  return `/blog/${getPostSlug(postOrSlug)}/`;
}

export function getPostOgImageUrl(postOrSlug: BlogPost | string): string {
  return `/og/${getPostSlug(postOrSlug)}.png`;
}

export function getPostStructuredImageUrls(
  postOrSlug: BlogPost | string,
): string[] {
  const slug = getPostSlug(postOrSlug);
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

export async function getPostSocialImage(
  post: BlogPost,
): Promise<PostSocialImage> {
  const cover = post.data.image;
  const coverMetadata = cover ? await getPostImageMetadata(cover) : null;

  if (cover && coverMetadata) {
    return {
      src: cover,
      alt: getPostImageAlt(post),
      width: coverMetadata.width,
      height: coverMetadata.height,
      type: coverMetadata.type,
    };
  }

  return {
    src: getPostOgImageUrl(post),
    alt: getPostImageAlt(post),
    width: OG_SOCIAL_SIZE.width,
    height: OG_SOCIAL_SIZE.height,
    type: "image/png",
  };
}

const imageMetadataCache = new Map<string, PostImageMetadata | null>();

export async function getPostImageMetadata(
  publicPath: string,
): Promise<PostImageMetadata | null> {
  const cached = imageMetadataCache.get(publicPath);
  if (cached !== undefined) {
    return cached;
  }

  const resolved = resolvePublicAsset(publicPath);
  let metadata: PostImageMetadata | null = null;

  if (resolved) {
    const read = await sharp(resolved)
      .metadata()
      .catch(() => null);

    if (read?.width && read.height) {
      metadata = {
        width: read.width,
        height: read.height,
        type: read.format ? IMAGE_TYPE_BY_FORMAT[read.format] : undefined,
      };
    }
  }

  imageMetadataCache.set(publicPath, metadata);
  return metadata;
}

export function getPostReadingTimeMinutes(post: BlogPost): number {
  const wordCount = countWords(post.body ?? "");
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

function resolvePublicAsset(path: string): string | null {
  if (!path.startsWith("/")) {
    return null;
  }

  try {
    const resolved = fileURLToPath(
      new URL(`../../../public${path}`, import.meta.url),
    );
    return existsSync(resolved) ? resolved : null;
  } catch {
    return null;
  }
}
