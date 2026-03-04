import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPublishedBlogPosts, getPostSeoDescription, getPostUrl } from '../lib/blog';
import { SITE } from '../lib/site';

export async function GET(context: APIContext) {
  const sortedPosts = await getPublishedBlogPosts();

  return rss({
    title: 'Ken Taylor - Blog',
    description: 'Thoughts, tutorials, and insights on tech, music production, and entrepreneurship from a Guyanese developer.',
    site: context.site ?? SITE.url,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: getPostSeoDescription(post),
      link: getPostUrl(post),
    })),
    customData: `<language>en-us</language>`,
  });
}
