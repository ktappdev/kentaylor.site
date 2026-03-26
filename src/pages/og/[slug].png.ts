import type { APIRoute, GetStaticPaths } from "astro";
import {
  getPublishedBlogPosts,
  type BlogPost,
} from "../../lib/blog";
import { getPostSlug } from "../../lib/post-slug";
import { createBlogOgImage, OG_SOCIAL_SIZE } from "../../lib/og";

interface StaticPathProps {
  post: BlogPost;
}

export const getStaticPaths = (async () => {
  const posts = await getPublishedBlogPosts();

  return posts.map((post) => ({
    params: { slug: getPostSlug(post) },
    props: { post },
  }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const { post } = props as StaticPathProps;
  const buffer = await createBlogOgImage({
    title: post.data.title,
    excerpt: post.data.excerpt,
    tags: post.data.tags,
    width: OG_SOCIAL_SIZE.width,
    height: OG_SOCIAL_SIZE.height,
  });

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
