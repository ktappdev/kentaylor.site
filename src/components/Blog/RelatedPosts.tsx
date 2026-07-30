import { motion } from 'framer-motion';
import type { CollectionEntry } from 'astro:content';
import { getPostSlug } from '../../lib/post-slug';

interface RelatedPostsProps {
  posts: CollectionEntry<'blog'>[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };
  
  return (
    <section className="mt-16 pt-12 border-t border-border">
      <h2 className="text-2xl font-bold mb-6">
        <span className="text-accent">#</span> Related Posts
      </h2>
      
      <div className="grid gap-4 md:grid-cols-2">
        {posts.slice(0, 2).map((post, index) => (
          <motion.article
            key={getPostSlug(post)}
            initial={{ y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <a
              href={`/blog/${getPostSlug(post)}/`}
              className="block p-4 bg-surface border border-border rounded-lg hover:border-accent/50 transition-all"
            >
              <div className="text-xs text-muted font-mono mb-2">
                {formatDate(post.data.date)}
              </div>
              <h3 className="font-bold mb-1 hover:text-accent transition-colors">
                {post.data.title}
              </h3>
              <p className="text-sm text-muted line-clamp-2">
                {post.data.excerpt}
              </p>
            </a>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
