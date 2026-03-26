import { motion } from 'framer-motion';
import type { CollectionEntry } from 'astro:content';
import { getPostSlug } from '../../lib/post-slug';

const WORDS_PER_MINUTE = 200;

interface BlogCardProps {
  post: CollectionEntry<'blog'>;
  index: number;
}

function calculateReadingTime(body: string): number {
  const cleaned = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, ' ')
    .replace(/\[[^\]]*\]\([^)]+\)/g, ' ')
    .replace(/[#>*_~-]/g, ' ')
    .trim();

  if (!cleaned) return 1;
  const wordCount = cleaned.split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}

export default function BlogCard({ post, index }: BlogCardProps) {
  const { title, excerpt, date, tags } = post.data;
  const readingTime = calculateReadingTime(post.body || '');
  
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
        href={`/blog/${getPostSlug(post)}/`}
        className="block p-6 bg-surface border border-border rounded-lg hover:border-accent/50 transition-all duration-300"
      >
        <div className="flex items-center gap-3 mb-4 text-sm text-muted font-mono">
          <time dateTime={date.toString()}>{formatDate(date)}</time>
          <span>•</span>
          <span>{readingTime} min read</span>
        </div>
        
        <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-accent transition-colors">
          {title}
        </h3>
        
        <p className="text-muted line-clamp-2 mb-4">
          {excerpt}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 3).map((tag: string) => (
            <a
              key={tag}
              href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}/`}
              className="px-2 py-1 text-xs font-mono text-accent/80 bg-accent/10 rounded hover:bg-accent/20 transition-colors"
            >
              #{tag}
            </a>
          ))}
        </div>
      </a>
    </motion.article>
  );
}
