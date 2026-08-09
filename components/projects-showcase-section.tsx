"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Code2, Github, ExternalLink, X, ArrowUpRight } from "lucide-react"

const PROJECTS = [
  {
    id: "1",
    title: "AI-Powered Job Application System",
    cat: "Full Stack",
    desc: "Automated job application platform with AI-powered form filling and LinkedIn integration.",
    longDesc: "A comprehensive automation platform that streamlines the job application process. Features include intelligent form detection, AI-powered question answering, session management, and real-time application tracking.",
    tags: ["React", "Node.js", "Playwright", "AI", "TypeScript"],
    github: "https://github.com/721abhay/autoapply",
    demo: "https://autoapply-demo.vercel.app",
    date: "DEC 2024",
    featured: true,
    highlights: ["AI-powered form filling", "LinkedIn Easy Apply automation", "Real-time tracking dashboard", "Session persistence"],
  },
  {
    id: "2",
    title: "Hand Tracking Rhythm Game",
    cat: "AI/ML",
    desc: "Interactive rhythm game using computer vision and real-time hand tracking technology.",
    longDesc: "An innovative browser-based game that uses MediaPipe hand tracking to create an immersive rhythm game experience. Players use hand gestures to hit targets in sync with music.",
    tags: ["JavaScript", "MediaPipe", "WebGL", "Computer Vision"],
    github: "https://github.com/721abhay/hand-tracking-game",
    demo: "https://hand-game.vercel.app",
    date: "DEC 2024",
    featured: true,
    highlights: ["Real-time hand tracking", "Dynamic difficulty system", "Achievement system", "Particle effects"],
  },
  {
    id: "3",
    title: "Coin Circle — Expense Tracker",
    cat: "Full Stack",
    desc: "Modern expense tracking app with analytics, charts and smart budget management features.",
    longDesc: "A comprehensive personal finance management tool that helps users track expenses, set budgets, and visualize spending patterns with charts and insights.",
    tags: ["React", "Firebase", "Chart.js", "Tailwind CSS"],
    github: "https://github.com/721abhay/coin-circle",
    demo: "https://coin-circle.vercel.app",
    date: "NOV 2024",
    featured: false,
    highlights: ["Real-time expense tracking", "Budget analytics", "Category management", "CSV export"],
  },
  {
    id: "4",
    title: "Database Backup Utility",
    cat: "Open Source",
    desc: "Automated database backup system with scheduling, compression and cloud storage integration.",
    longDesc: "A robust backup solution for MongoDB and PostgreSQL databases with automated scheduling, compression, and cloud storage support.",
    tags: ["Python", "MongoDB", "PostgreSQL", "AWS S3"],
    github: "https://github.com/721abhay/db-backup-utility",
    demo: "",
    date: "DEC 2024",
    featured: false,
    highlights: ["Automated scheduling", "Multi-database support", "Cloud storage integration", "Compression & encryption"],
  },
]

const CATEGORIES = ["ALL", "Full Stack", "AI/ML", "Open Source"]

export function ProjectsShowcaseSection() {
  const [activeCategory, setActiveCategory] = useState("ALL")
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null)

  const filteredProjects = activeCategory === "ALL"
    ? PROJECTS
    : PROJECTS.filter(p => p.cat === activeCategory)

  return (
    <section id="projects" className="bg-[#080808] border-t border-white/[0.06]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between px-6 md:px-14 py-10 border-b border-white/[0.06] gap-6">
        <div>
          <p className="font-bebas text-[9px] tracking-[0.4em] text-red-600 uppercase mb-1">Portfolio</p>
          <h2 className="font-bebas text-5xl md:text-7xl tracking-tight text-white leading-none">
            FEATURED <span className="text-red-600">WORK</span>
          </h2>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-0 border border-white/[0.06]">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 font-bebas text-xs tracking-widest uppercase border-r last:border-r-0 border-white/[0.06] transition-colors ${
                activeCategory === cat
                  ? "bg-red-600 text-white"
                  : "text-white/40 hover:text-white hover:bg-white/[0.02]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/[0.06]">
        {filteredProjects.map((project, i) => (
          <div
            key={project.id}
            className={`group relative border-b border-white/[0.06] flex flex-col justify-between ${
              i >= 2 ? "md:border-t md:border-white/[0.06]" : ""
            }`}
          >
            {/* Visual Header / Cover Box */}
            <div
              onClick={() => setSelectedProject(project)}
              className="relative h-52 bg-[#0c0c0c] border-b border-white/[0.06] cursor-pointer overflow-hidden flex items-center justify-center"
            >
              <Code2 className="w-14 h-14 text-white/[0.05] group-hover:text-red-600/20 group-hover:scale-110 transition-all duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-80" />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="font-bebas text-[9px] tracking-widest text-white/40 border border-white/10 px-2 py-0.5 uppercase bg-[#080808]/60">
                  {project.cat}
                </span>
                {project.featured && (
                  <span className="font-bebas text-[9px] tracking-widest text-red-500 border border-red-600/40 px-2 py-0.5 uppercase bg-red-950/20">
                    Featured
                  </span>
                )}
              </div>

              <span className="absolute top-4 right-4 font-bebas text-[9px] tracking-widest text-white/30">
                {project.date}
              </span>
            </div>

            {/* Content Area */}
            <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
              <div>
                <h3
                  onClick={() => setSelectedProject(project)}
                  className="font-bebas text-2xl tracking-wide text-white group-hover:text-red-500 transition-colors cursor-pointer leading-tight mb-2"
                >
                  {project.title}
                </h3>
                <p className="text-xs text-white/40 leading-relaxed mb-6">
                  {project.desc}
                </p>
              </div>

              <div>
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tags.map((t) => (
                    <span key={t} className="font-bebas text-[9px] tracking-wider text-white/30 border border-white/[0.08] px-2 py-0.5">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 font-bebas text-xs tracking-widest text-white/40 hover:text-white transition-colors border border-white/10 hover:border-white/30 px-3 py-1.5"
                      >
                        <Github className="w-3.5 h-3.5" /> CODE
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 font-bebas text-xs tracking-widest text-white bg-red-600 hover:bg-red-700 transition-colors px-3 py-1.5"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> LIVE
                      </a>
                    )}
                  </div>
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="font-bebas text-xs tracking-widest text-white/40 hover:text-red-500 transition-colors flex items-center gap-1"
                  >
                    DETAILS <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-2xl w-full bg-[#0c0c0c] border border-white/10 p-8 max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="font-bebas text-[10px] tracking-widest text-red-600 uppercase border border-red-600/30 px-2 py-0.5">
                {selectedProject.cat}
              </span>

              <h3 className="font-bebas text-3xl md:text-4xl text-white mt-3 mb-4 leading-none">
                {selectedProject.title}
              </h3>

              <p className="text-sm text-white/60 leading-relaxed mb-6">
                {selectedProject.longDesc}
              </p>

              {selectedProject.highlights && (
                <div className="mb-6">
                  <p className="font-bebas text-xs tracking-widest text-white/40 mb-3 uppercase">Key Highlights</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedProject.highlights.map((h) => (
                      <div key={h} className="flex items-center gap-2 text-xs text-white/50">
                        <span className="w-1 h-1 rounded-full bg-red-600 flex-shrink-0" />
                        {h}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-1.5 mb-8">
                {selectedProject.tags.map((t) => (
                  <span key={t} className="font-bebas text-[10px] tracking-wider text-white/30 border border-white/10 px-2 py-1">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-bebas tracking-widest text-xs text-white border border-white/20 hover:border-white px-5 py-2.5 transition-colors"
                  >
                    <Github className="w-4 h-4" /> VIEW CODE
                  </a>
                )}
                {selectedProject.demo && (
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-bebas tracking-widest text-xs text-white bg-red-600 hover:bg-red-700 px-5 py-2.5 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" /> LIVE DEMO
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
