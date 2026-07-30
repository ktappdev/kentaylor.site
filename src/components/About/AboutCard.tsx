import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function AboutCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['15deg', '-15deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-15deg', '15deg']);
  
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ['0%', '100%']);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };
  
  const stats = [
    { label: 'ROLE', value: 'Software Engineer' },
    { label: 'LOCATION', value: 'Georgetown, Guyana' },
    { label: 'LEVEL', value: 'Self-Taught' },
    { label: 'STATUS', value: 'Currently Debugging Life' },
  ];
  
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">

      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent font-mono text-sm tracking-wider">IDENTITY_VERIFIED</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 text-accent">
            The Human Behind The Code
          </h2>
        </motion.div>
        
        <div className="flex justify-center">
          <motion.div
            ref={cardRef}
            initial={{ y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={
              prefersReducedMotion
                ? {}
                : {
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d',
                  }
            }
            className="relative w-full max-w-2xl"
          >
            {/* Card Container */}
            <div 
              className="relative bg-surface/80 backdrop-blur-xl border border-border rounded-2xl overflow-hidden"
              style={{ transform: 'translateZ(0)' }}
            >
              {/* Holographic gradient overlay */}
              <motion.div
                style={{
                  background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(0, 255, 136, 0.15) 0%, transparent 50%)`,
                }}
                className="absolute inset-0 pointer-events-none z-20"
              />
              
              {/* Animated border glow */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0.3 }}
                className="absolute inset-0 border-2 border-accent/30 rounded-2xl pointer-events-none z-10"
                style={{
                  boxShadow: isHovered 
                    ? '0 0 30px rgba(0, 255, 136, 0.3), inset 0 0 30px rgba(0, 255, 136, 0.1)' 
                    : 'none',
                }}
              />
              
              {/* Card Header */}
              <div className="relative bg-accent/10 border-b border-border/50 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                  <span className="font-mono text-xs text-accent tracking-wider">LUGETECH_INDUSTRIES</span>
                </div>
                <span className="font-mono text-xs text-muted">ID: KEN-001-GY</span>
              </div>
              
              {/* Card Content */}
              <div className="p-8 md:p-10">
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                  {/* Photo with hexagonal frame */}
                  <motion.div 
                    className="relative flex-shrink-0"
                    style={{ transform: 'translateZ(40px)' }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {/* Hexagonal clip container */}
                    <div className="relative w-40 h-44 md:w-48 md:h-52">
                      {/* Outer glow ring */}
                      <div className="absolute inset-0 bg-accent/20 rounded-3xl blur-xl" />
                      
                      {/* Hexagon shape with image */}
                      <div 
                        className="relative w-full h-full overflow-hidden border-2 border-accent/50"
                        style={{
                          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                        }}
                      >
                        <img
                          src="https://www.lugetech.com/team/ken.webp"
                          alt="Ken Taylor"
                          className="w-full h-full object-cover"
                          width="192"
                          height="208"
                          loading="lazy"
                          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                        />
                      </div>
                      
                      {/* Corner accents */}
                      <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-accent" />
                      <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-accent" />
                      <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-accent" />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-accent" />
                    </div>
                  </motion.div>
                  
                  {/* Stats */}
                  <div className="flex-1 w-full" style={{ transform: 'translateZ(30px)' }}>
                    <motion.h3 
                      className="text-3xl md:text-4xl font-bold font-mono mb-1"
                      initial={{ x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                    >
                      KEN TAYLOR
                    </motion.h3>
                    
                    <motion.p 
                      className="text-accent font-mono text-sm mb-6 tracking-wider"
                      initial={{ x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 }}
                    >
                      // Full Stack Developer & Creative
                    </motion.p>
                    
                    <div className="space-y-4">
                      {stats.map((stat, index) => (
                        <motion.div
                          key={stat.label}
                          initial={{ x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 pb-3 border-b border-border/50 last:border-0"
                        >
                          <span className="font-mono text-xs text-muted uppercase tracking-wider w-24 flex-shrink-0">
                            {stat.label}
                          </span>
                          <span className="text-text font-medium">
                            {stat.value}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Bio text */}
                    <motion.p
                      initial={{}}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.9 }}
                      className="mt-6 text-muted text-sm leading-relaxed"
                    >
                      Co-founder of Lugetech & creator of ReviewIt.gy. A self-taught software engineer from Georgetown, Guyana who believes the best code is written with headphones on. When not shipping products, I'm exploring new ways to build for the Caribbean.
                    </motion.p>
                  </div>
                </div>
              </div>
              
              {/* Card Footer */}
              <div className="relative bg-surface border-t border-border/50 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-muted">AUTHENTICATED</span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ 
                            duration: 1.5, 
                            repeat: Infinity, 
                            delay: i * 0.2 
                          }}
                          className="w-1 h-1 bg-accent rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                  <span className="font-mono text-xs text-accent">CLEARANCE_LEVEL: ADMIN</span>
                </div>
              </div>
            </div>
            
            {/* Shadow */}
            <motion.div
              animate={{
                opacity: isHovered ? 0.4 : 0.2,
                scale: isHovered ? 1.05 : 1,
              }}
              className="absolute -inset-4 bg-accent/20 blur-3xl -z-10 rounded-3xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
