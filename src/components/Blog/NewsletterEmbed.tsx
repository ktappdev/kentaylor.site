import { motion } from 'framer-motion';

interface NewsletterEmbedProps {
  embedCode?: string;
}

export default function NewsletterEmbed({ embedCode }: NewsletterEmbedProps) {
  if (embedCode) {
    return (
      <div className="w-full">
        <div 
          dangerouslySetInnerHTML={{ __html: embedCode }}
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="p-6 rounded-lg border border-border bg-surface">
        <h3 className="text-xl font-mono font-bold mb-2">
          <span className="text-accent">~/</span>subscribe
        </h3>
        <p className="text-muted text-sm mb-4">
          Get new posts delivered to your inbox. No spam, unsubscribe anytime.
        </p>
        
        <form 
          action="https://www.getrevue.co/profile/YOUR_USERNAME/add_subscriber" 
          method="post"
          target="_blank"
          className="flex flex-col gap-3"
        >
          <input
            type="email"
            name="member[email]"
            placeholder="your@email.com"
            required
            className="w-full px-4 py-2 rounded bg-bg border border-border text-text placeholder:text-muted focus:border-accent focus:outline-none transition-colors"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 rounded bg-accent text-bg font-medium hover:bg-accent-dim transition-colors"
          >
            Subscribe
          </button>
        </form>
        
        <p className="text-muted text-xs mt-3 text-center">
          Replace this form with your Beehiiv embed code
        </p>
      </div>
    </motion.div>
  );
}
