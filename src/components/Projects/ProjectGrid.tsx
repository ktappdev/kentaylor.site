import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard, { type Project } from './ProjectCard';

const projects: Project[] = [
  {
    id: '1',
    title: 'Neural Canvas',
    description: 'AI-powered creative tool that transforms sketches into stunning artwork using machine learning and generative algorithms.',
    category: 'software',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
    technologies: ['Python', 'TensorFlow', 'React', 'WebGL'],
    link: 'https://neuralcanvas.io',
    github: 'https://github.com/kentaylor/neural-canvas',
    featured: true,
  },
  {
    id: '2',
    title: 'DevFlow',
    description: 'Modern project management tool built for developer teams with GitHub integration.',
    category: 'software',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    technologies: ['TypeScript', 'Next.js', 'PostgreSQL'],
    link: 'https://devflow.app',
    featured: false,
  },
  {
    id: '3',
    title: 'Sitemaps Generator',
    description: 'Automated sitemap generation tool with SEO optimization suggestions.',
    category: 'site',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    technologies: ['Go', 'React', 'AWS Lambda'],
    github: 'https://github.com/kentaylor/sitemaps',
    featured: false,
  },
  {
    id: '4',
    title: 'CodeSnap',
    description: 'Beautiful code screenshot tool with syntax highlighting and custom themes.',
    category: 'software',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
    technologies: ['Rust', 'WASM', 'React'],
    link: 'https://codesnap.dev',
    github: 'https://github.com/kentaylor/codesnap',
    featured: false,
  },
  {
    id: '5',
    title: 'CloudCost',
    description: 'Cloud infrastructure cost monitoring and optimization platform.',
    category: 'software',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    technologies: ['Node.js', 'React', 'Docker', 'Kubernetes'],
    link: 'https://cloudcost.io',
    featured: false,
  },
  {
    id: '6',
    title: 'Portfolio Starter',
    description: 'Open source portfolio template for developers with dark mode and animations.',
    category: 'site',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    technologies: ['Astro', 'React', 'Tailwind'],
    github: 'https://github.com/kentaylor/portfolio-starter',
    featured: false,
  },
];

const filters = ['all', 'software', 'site'] as const;

export default function ProjectGrid() {
  const [activeFilter, setActiveFilter] = useState<typeof filters[number]>('all');
  
  const filteredProjects = projects.filter((project) => {
    if (activeFilter === 'all') return true;
    return project.category === activeFilter;
  });
  
  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-accent">#</span> Projects
          </h2>
          <p className="text-muted max-w-2xl">
            A selection of software and sites I've built. From AI tools to developer utilities.
          </p>
        </motion.div>
        
        <div className="flex gap-4 mb-8">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 font-mono text-sm uppercase tracking-wider transition-all duration-300 ${
                activeFilter === filter
                  ? 'text-accent border-b-2 border-accent'
                  : 'text-muted hover:text-text'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard project={project} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
