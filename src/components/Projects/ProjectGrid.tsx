import { motion } from "framer-motion";
import type { CollectionEntry } from "astro:content";
import ProjectCard from "./ProjectCard";

type Project = CollectionEntry<"projects">;

interface ProjectGridProps {
  projects: Project[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-accent">#</span> Projects
          </h2>
          <p className="text-muted max-w-2xl">
            Software, platforms, and creative projects built for Guyana and
            beyond.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 p-4 border border-accent/30 bg-accent/5 rounded-lg"
        >
          <p className="text-center text-lg">
            <span className="text-accent font-bold">FREE</span> — All projects
            available to use right now at no cost. Feel free to try them all!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <ProjectCard project={project.data} index={index} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-muted mb-4">
            Check out my other open-source projects on GitHub:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://github.com/ktappdev/termigram"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-border text-text font-medium text-sm rounded hover:border-accent hover:text-accent transition-colors"
            >
              termigram
            </a>
            <a
              href="https://github.com/ktappdev/contexting"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-border text-text font-medium text-sm rounded hover:border-accent hover:text-accent transition-colors"
            >
              contexting
            </a>
            <a
              href="https://github.com/ktappdev/gitcomm"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-border text-text font-medium text-sm rounded hover:border-accent hover:text-accent transition-colors"
            >
              gitcomm
            </a>
            <a
              href="https://github.com/ktappdev"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-accent text-bg font-medium text-sm rounded hover:bg-accent-dim transition-colors"
            >
              View all on GitHub
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
