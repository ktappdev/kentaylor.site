import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const links = [
    { href: 'https://github.com/kentaylor', label: 'GitHub' },
    { href: 'https://twitter.com/kentaylor', label: 'Twitter' },
    { href: 'https://linkedin.com/in/kentaylor', label: 'LinkedIn' },
    { href: 'mailto:hello@kentaylor.site', label: 'Email' },
  ];
  
  return (
    <footer className="py-12 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <a href="/" className="font-mono text-2xl font-bold">
              <span className="text-accent">/</span>KT
            </a>
            <p className="text-muted text-sm mt-2">
              Building the future, one line at a time.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex gap-6"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-accent transition-colors text-sm font-mono"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 pt-8 border-t border-border text-center"
        >
          <p className="text-muted text-sm font-mono">
            © {currentYear} Ken Taylor. All rights reserved.
          </p>
          <p className="text-muted/50 text-xs mt-2 font-mono">
            Built with Astro + React + Three.js
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
