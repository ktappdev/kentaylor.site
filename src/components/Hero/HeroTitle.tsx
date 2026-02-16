import { motion } from 'framer-motion';

interface HeroTitleProps {
  className?: string;
}

export default function HeroTitle({ className = '' }: HeroTitleProps) {
  const name = 'KEN TAYLOR';
  const letters = name.split('');
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };
  
  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 100,
      rotateX: -90,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring' as const,
        damping: 12,
        stiffness: 100,
      },
    },
  };
  
  return (
    <div className={className}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="overflow-hidden"
      >
        <h1 className="text-[12vw] md:text-[10vw] lg:text-[8vw] xl:text-[7vw] font-bold leading-none tracking-tighter whitespace-nowrap">
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              className="inline-block hover:text-accent transition-colors duration-300 cursor-default"
              style={{ display: 'inline-block' }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </h1>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="mt-6 md:mt-8"
      >
        <p className="text-muted text-lg md:text-xl font-mono tracking-wide">
          <span className="text-accent">&gt;</span> Developer • Creator • Builder
        </p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="mt-8 h-px bg-gradient-to-r from-accent via-accent/50 to-transparent origin-left"
      />
    </div>
  );
}
