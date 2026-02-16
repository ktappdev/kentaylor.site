import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard, { type Project } from './ProjectCard';

const projects: Project[] = [
  {
    id: '1',
    title: 'ReviewIt.gy',
    description: "Guyana's first business review platform connecting consumers and businesses through authentic reviews. 1,000+ reviews, 500+ products, 20+ categories.",
    category: 'software',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    technologies: ['Go', 'TypeScript', 'Cloud', 'PocketBase'],
    link: 'https://reviewit.gy',
    featured: true,
  },
  {
    id: '2',
    title: 'Lugetech',
    description: "Guyana's premier tech company specializing in custom software, web/mobile apps, cloud solutions, and digital transformation since 2015.",
    category: 'site',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    technologies: ['Go', 'TypeScript', 'Next.js', 'Cloud'],
    link: 'https://lugetech.com',
    featured: false,
  },
  {
    id: '3',
    title: 'Maad Radio',
    description: 'Elegant radio website with live video/audio streams, dynamic schedules, and custom radio platform integration.',
    category: 'site',
    image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80',
    technologies: ['TypeScript', 'React', 'Streaming'],
    github: 'https://github.com/ktappdev/maad-radio',
    featured: false,
  },
  {
    id: '4',
    title: 'Bad Words Thing',
    description: 'AI lyrics scanner for radio that flags explicit content before airplay. Clean broadcasting automation tool.',
    category: 'software',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    technologies: ['TypeScript', 'AI', 'NLP'],
    github: 'https://github.com/ktappdev/bad-words-thing',
    featured: false,
  },
  {
    id: '5',
    title: 'CICD Thing',
    description: 'GitHub-triggered auto-deploy system for sites and applications. Streamlined deployment automation.',
    category: 'software',
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&q=80',
    technologies: ['Go', 'GitHub Actions', 'DevOps'],
    github: 'https://github.com/ktappdev/cicd-thing',
    featured: false,
  },
  {
    id: '6',
    title: 'Hitman',
    description: 'Dark-themed TUI application to kill processes by port with animated interface. Elite developer utility.',
    category: 'software',
    image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&q=80',
    technologies: ['Go', 'TUI', 'Terminal'],
    github: 'https://github.com/ktappdev/hitman',
    featured: false,
  },
  {
    id: '7',
    title: 'KendaBeatMaker',
    description: 'Music production channel with 6.65K+ subscribers featuring beats, remixes, tutorials, and studio sessions.',
    category: 'site',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80',
    technologies: ['Ableton', 'Audio', 'Production'],
    link: 'https://www.youtube.com/@KendaBeatMaker',
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
            Software, platforms, and creative projects built for Guyana and beyond.
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
