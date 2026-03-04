import { motion } from 'framer-motion';
import type { CollectionEntry } from 'astro:content';

interface BlogCardProps {
  post: CollectionEntry<'blog'>;
  index: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
  const { title, excerpt, date, tags } = post.data;
  
  const formatDate = (dateString: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(dateString);
  };
  
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group"
    >
      <a
        href={`/blog/${post.slug}/`}
        className="block p-6 bg-surface border border-border rounded-lg hover:border-accent/50 transition-all duration-300"
      >
        <div className="flex items-center gap-3 mb-4 text-sm text-muted font-mono">
          <time dateTime={date.toString()}>{formatDate(date)}</time>
          <span>•</span>
          <span>5 min read</span>
        </div>
        
        <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-accent transition-colors">
          {title}
        </h3>
        
        <p className="text-muted line-clamp-2 mb-4">
          {excerpt}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 3).map((tag: string) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs font-mono text-accent/80 bg-accent/10 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
      </a>
    </motion.article>
  );
}
