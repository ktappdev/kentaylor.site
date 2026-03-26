import type { APIRoute, GetStaticPaths } from "astro";
import {
  getPublishedBlogPosts,
  type BlogPost,
} from "../../../lib/blog";
import { getPostSlug } from "../../../lib/post-slug";
import {
  createBlogOgImage,
  isOgStructuredRatio,
  OG_STRUCTURED_SIZES,
  type OgStructuredRatio,
} from "../../../lib/og";

interface StaticPathProps {
  post: BlogPost;
  ratio: OgStructuredRatio;
}

export const getStaticPaths = (async () => {
  const posts = await getPublishedBlogPosts();
  const ratios = Object.keys(OG_STRUCTURED_SIZES) as OgStructuredRatio[];

  return posts.flatMap((post) =>
    ratios.map((ratio) => ({
      params: { slug: getPostSlug(post), ratio },
      props: { post, ratio },
    })),
  );
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const { post, ratio } = props as StaticPathProps;

  if (!isOgStructuredRatio(ratio)) {
    return new Response("Not found", { status: 404 });
  }

  const size = OG_STRUCTURED_SIZES[ratio];
  const buffer = await createBlogOgImage({
    title: post.data.title,
    excerpt: post.data.excerpt,
    tags: post.data.tags,
    width: size.width,
    height: size.height,
  });

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
