import { motion } from 'framer-motion';
import ProjectCard, { type Project } from './ProjectCard';

const projects: Project[] = [
  {
    id: '2',
    title: 'Lugetech',
    description: "Guyana's premier tech company specializing in custom software, web/mobile apps, cloud solutions, and digital transformation since 2015.",
    category: 'site',
    image: 'https://www.lugetech.com/logo.png',
    technologies: ['Astro'],
    link: 'https://lugetech.com',
    featured: false,
  },
  {
    id: '3',
    title: 'Maad Radio',
    description: 'Elegant radio website with live video/audio streams, dynamic schedules, and custom radio platform integration.',
    category: 'site',
    image: 'https://www.maad97.com/logo.png',
    technologies: ['TypeScript', 'React', 'Streaming'],
    github: 'https://github.com/ktappdev/maad-radio',
    featured: false,
  },
  {
    id: '1',
    title: 'ReviewIt.gy',
    description: "ReviewIt (ReviewIt.gy) - Empowering Guyanese consumers with reliable reviews and giving businesses a chance to exercise excellence in customer service. Ah place where all-a-wee could talk to businesses and they could talk to we.",
    category: 'software',
    image: 'https://reviewit.gy/logo.png',
    technologies: ['Postgres', 'Redis', 'Next.js', 'Cloudinary', 'Go'],
    link: 'https://reviewit.gy',
    featured: true,
  },
  {
    id: '10',
    title: 'Scan.gy',
    description: 'URL shortening and QR code generation service. Web application with React frontend and Go backend API.',
    category: 'software',
    image: '/images/scangy-logo.webp',
    technologies: ['Go', 'Next.js', 'MongoDB', 'React'],
    link: 'https://www.scan.gy',
    featured: false,
  },
  {
    id: '11',
    title: 'SecretNotez',
    description: "Instant, encrypted notes. No signup. Just pick a word or phrase and start writing. That's your key — anyone with the same passphrase can see that note.",
    category: 'software',
    image: 'https://secretnotez.com/og-image.webp',
    technologies: ['JavaScript', 'Encryption', 'Web'],
    link: 'https://secretnotez.com',
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
    title: 'Lyricut',
    description: "Lyricut analyzes song lyrics, flags explicit phrases, and generates clear, actionable reports. Accounts keep the platform safe from abuse while it's free — sign in with Google once and you can use the full app immediately.",
    category: 'software',
    image: 'https://www.lyricut.com/logo.png',
    technologies: ['TypeScript', 'Genius API', 'NLP', 'Audio'],
    link: 'https://lyricut.com',
    featured: false,
  },
  {
    id: '8',
    title: 'SSH Thing',
    description: 'A cross-platform desktop SSH client built with Tauri, Rust backend, and vanilla HTML/JS frontend. Focuses on quick connections, clear session state, and a straightforward terminal experience with small, fast binaries and minimal overhead.',
    category: 'software',
    image: '/images/sshthing.png',
    technologies: ['Tauri', 'Rust', 'HTML/JS', 'SSH'],
    link: 'https://github.com/ktappdev/ssh-thing/releases',
    featured: false,
  },
  {
    id: '9',
    title: 'Domain Echo',
    description: 'An anonymous, real-time chat extension for Chrome that creates a unique chat room for every domain you visit. Transform web browsing into a social experience - when you visit any website, you automatically join a chat room specific to that domain where you can see other active users and engage in real-time conversations.',
    category: 'software',
    image: '/images/domain-echo-promo3.png',
    technologies: ['JavaScript', 'Chrome Extension', 'WebSocket', 'Real-time'],
    link: 'https://www.domainecho.site/',
    featured: false,
  },
];

export default function ProjectGrid() {
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 p-4 border border-accent/30 bg-accent/5 rounded-lg"
        >
          <p className="text-center text-lg">
            <span className="text-accent font-bold">FREE</span> — All projects available to use right now at no cost. Feel free to try them all!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
