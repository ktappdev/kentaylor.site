import { motion } from 'framer-motion';
import type { CollectionEntry } from 'astro:content';
import BlogCard from './BlogCard';

interface BlogListProps {
  posts: CollectionEntry<'blog'>[];
}

export default function BlogList({ posts }: BlogListProps) {
  return (
    <section id="blog" className="py-24 md:py-32 bg-surface/50">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-accent">#</span> Blog
          </h2>
          <p className="text-muted">
            Thoughts, tutorials, and insights from my journey as a developer.
          </p>
        </motion.div>
        
        <div className="space-y-6">
          {posts.map((post, index) => (
            <BlogCard key={post.slug} post={post} index={index} />
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 border border-accent text-accent font-mono text-sm uppercase tracking-wider hover:bg-accent hover:text-bg transition-all duration-300"
          >
            View All Posts
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
