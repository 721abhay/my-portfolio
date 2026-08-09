"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Code2, Github, ExternalLink, X, ArrowUpRight } from "lucide-react"

const PROJECTS = [
  {
    id: "1",
    title: "AI-POWERED JOB APPLICATION SYSTEM",
    cat: "FULL STACK",
    desc: "Automated job application platform with AI form filling.",
    longDesc: "A comprehensive automation platform that streamlines the job application process. Features include intelligent form detection, AI-powered question answering, session management, and real-time application tracking.",
    tags: ["React", "Node.js", "Playwright", "AI"],
    github: "https://github.com/721abhay/autoapply",
    demo: "https://autoapply-demo.vercel.app",
    image: "/images/finance-dashboard-dark-ui.jpg"
  },
  {
    id: "2",
    title: "HAND TRACKING RHYTHM GAME",
    cat: "AI / ML",
    desc: "Interactive rhythm game using computer vision and MediaPipe.",
    longDesc: "An innovative browser-based game that uses MediaPipe hand tracking to create an immersive rhythm game experience. Players use hand gestures to hit targets in sync with music.",
    tags: ["JavaScript", "MediaPipe", "WebGL"],
    github: "https://github.com/721abhay/hand-tracking-game",
    demo: "https://hand-game.vercel.app",
    image: "/images/abstract-3d-web-design.jpg"
  },
  {
    id: "3",
    title: "COIN CIRCLE — EXPENSE TRACKER",
    cat: "FULL STACK",
    desc: "Modern expense tracking app with analytics and charts.",
    longDesc: "A comprehensive personal finance management tool that helps users track expenses, set budgets, and visualize spending patterns with charts and insights.",
    tags: ["React", "Firebase", "Chart.js"],
    github: "https://github.com/721abhay/coin-circle",
    demo: "https://coin-circle.vercel.app",
    image: "/images/clean-ecommerce-ui.jpg"
  },
  {
    id: "4",
    title: "DATABASE BACKUP UTILITY",
    cat: "OPEN SOURCE",
    desc: "Automated DB backup system with scheduling & S3 cloud storage.",
    longDesc: "A robust backup solution for MongoDB and PostgreSQL databases with automated scheduling, compression, and cloud storage support.",
    tags: ["Python", "MongoDB", "PostgreSQL", "AWS S3"],
    github: "https://github.com/721abhay/db-backup-utility",
    demo: "",
    image: "/images/minimalist-productivity-app.jpg"
  },
]

export function ProjectsShowcaseSection() {
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null)

  return (
    <div id="projects" className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-bebas text-3xl md:text-4xl text-[#f3e8df] tracking-wide">
          FEATURED <span className="text-red-600">WORK</span>
        </h2>
        <a
          href="https://github.com/721abhay"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bebas text-xs tracking-widest text-red-500 hover:text-red-400 flex items-center gap-1 uppercase transition-colors"
        >
          View More Projects <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* 2x2 Grid of Rounded Dark Cards (matching reference image) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {PROJECTS.map((p) => (
          <div
            key={p.id}
            onClick={() => setSelectedProject(p)}
            className="bg-[#121010] border border-white/10 rounded-xl overflow-hidden hover:border-red-600/40 transition-all cursor-pointer group flex flex-col justify-between h-full"
          >
            {/* Visual Cover Box with Mockup Image */}
            <div className="relative h-44 bg-[#0c0c0c] border-b border-white/5 overflow-hidden">
              <Image
                src={p.image}
                alt={p.title}
                fill
                className="object-cover opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121010] via-[#121010]/40 to-transparent" />
              
              <span className="absolute top-3 left-3 font-bebas text-[9px] tracking-widest text-red-500 border border-red-600/30 px-2 py-0.5 rounded bg-[#121010]/80 uppercase z-10">
                {p.cat}
              </span>
            </div>

            {/* Title & Desc */}
            <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bebas text-base tracking-wider text-[#f3e8df] group-hover:text-red-400 transition-colors leading-tight">
                  {p.title}
                </h3>
                <p className="text-xs text-white/40 leading-relaxed font-sans line-clamp-2 mt-1">
                  {p.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Details Modal */}
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
              className="relative max-w-xl w-full bg-[#121010] border border-white/10 rounded-xl p-6 max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="font-bebas text-[10px] tracking-widest text-red-500 border border-red-600/30 px-2 py-0.5 rounded bg-red-950/20 uppercase">
                {selectedProject.cat}
              </span>

              <h3 className="font-bebas text-2xl text-[#f3e8df] mt-2 mb-3 leading-tight">
                {selectedProject.title}
              </h3>

              <div className="relative h-48 w-full bg-[#0c0c0c] border border-white/10 rounded-lg overflow-hidden mb-4">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
              </div>

              <p className="text-xs text-white/60 font-sans leading-relaxed mb-4">
                {selectedProject.longDesc}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {selectedProject.tags.map((t) => (
                  <span key={t} className="font-bebas text-[9px] tracking-wider text-white/40 border border-white/10 px-2 py-0.5 rounded">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-bebas text-xs tracking-widest text-white border border-white/20 hover:border-white px-4 py-2 rounded transition-colors"
                  >
                    <Github className="w-4 h-4" /> VIEW CODE
                  </a>
                )}
                {selectedProject.demo && (
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-bebas text-xs tracking-widest text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" /> LIVE DEMO
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
