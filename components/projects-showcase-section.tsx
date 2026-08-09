"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Github, ExternalLink, X, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react"
import { usePortfolio, ProjectData } from "@/lib/portfolio-provider"

export function ProjectsShowcaseSection() {
  const { portfolioData } = usePortfolio()
  const { projects } = portfolioData
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length)
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const handleCardClick = (idx: number) => {
    if (idx === activeIndex) {
      setSelectedProject(projects[idx])
    } else {
      setActiveIndex(idx)
    }
  }

  if (!projects || projects.length === 0) return null

  return (
    <div id="projects" className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center justify-between"
      >
        <div>
          <p className="font-bebas text-[9px] tracking-[0.4em] text-red-600 uppercase mb-1">Selected Work</p>
          <h2 className="font-bebas text-3xl md:text-4xl text-[#f3e8df] tracking-wide">
            FEATURED <span className="text-red-600">WORK</span>
          </h2>
        </div>
        <motion.a
          href="https://github.com/721abhay"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ x: 3, color: "#fff" }}
          className="font-bebas text-xs tracking-widest text-red-500 flex items-center gap-1 uppercase transition-colors group"
        >
          View All <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </motion.a>
      </motion.div>

      {/* Main Grid for 3D Stack (left) and Active Details (right) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center min-h-[420px] pt-4">
        
        {/* Left Column: Interactive 3D Stack */}
        <div 
          className="md:col-span-6 flex flex-col items-center justify-center relative select-none"
          style={{ 
            perspective: "1200px", 
            transformStyle: "preserve-3d",
            height: "360px"
          }}
        >
          {projects.map((p, index) => {
            // Calculate relative position in stack rotation loop
            const position = (index - activeIndex + projects.length) % projects.length
            const isActive = index === activeIndex

            return (
              <motion.div
                key={p.id}
                style={{
                  transformStyle: "preserve-3d",
                  transformOrigin: "bottom center",
                  zIndex: projects.length - position,
                }}
                animate={{
                  y: position * -28,
                  z: position * -65,
                  rotateX: position * 11,
                  scale: 1 - position * 0.065,
                  opacity: position === 3 ? 0.2 : 1 - position * 0.25,
                }}
                transition={{
                  type: "spring",
                  stiffness: 150,
                  damping: 19
                }}
                onClick={() => handleCardClick(index)}
                className={`absolute w-full max-w-[270px] sm:max-w-[310px] aspect-[4/3] rounded-xl border overflow-hidden cursor-pointer transition-colors duration-300 relative group ${
                  isActive 
                    ? "border-red-600/40 bg-[#121010] shadow-[0_15px_40px_rgba(204,0,0,0.15)]" 
                    : "border-white/10 bg-[#0c0c0c]/90 hover:border-white/25"
                }`}
              >
                {/* Browser-style Tab Header Mockup */}
                <div className="flex items-center justify-between px-3 py-1.5 bg-[#090909] border-b border-white/5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600/70" />
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-600/70" />
                    <span className="w-1.5 h-1.5 rounded-full bg-green-600/70" />
                  </div>
                  <div className="text-[7px] font-mono text-white/30 bg-white/[0.02] px-2.5 py-0.5 rounded border border-white/[0.03] uppercase">
                    {p.cat.toLowerCase()}.dev
                  </div>
                  <div className="w-6" />
                </div>

                {/* Card Screen Image Content */}
                <div className="relative flex-1 h-[calc(100%-25px)] overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover opacity-80 group-hover:opacity-95 transition-opacity duration-300"
                    priority={index === 0}
                  />
                  {/* Glossy gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  
                  {/* Category Pill */}
                  <span className="absolute top-2.5 left-2.5 font-bebas text-[8px] tracking-widest text-red-500 border border-red-600/30 px-1.5 py-0.5 rounded bg-[#080808]/90 uppercase">
                    {p.cat}
                  </span>

                  {/* Title overlay */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="font-bebas text-sm sm:text-base tracking-wider text-[#f3e8df] leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
                      {p.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            )
          })}

          {/* Navigation Arrows & Indicator */}
          <div className="absolute -bottom-4 flex items-center gap-4 z-40 bg-[#080808]/90 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
            <button
              onClick={handlePrev}
              className="text-white/40 hover:text-white transition-colors p-0.5"
              aria-label="Previous Project"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="font-bebas text-xs tracking-widest text-[#ebd4c2] select-none">
              0{activeIndex + 1} / 0{projects.length}
            </span>
            <button
              onClick={handleNext}
              className="text-white/40 hover:text-white transition-colors p-0.5"
              aria-label="Next Project"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column: Active Details Panel */}
        <div className="md:col-span-6 space-y-4 md:pt-4 self-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              <div className="space-y-1.5">
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="font-bebas text-xs text-red-500 tracking-widest uppercase flex items-center gap-1.5"
                >
                  <span className="w-1 h-1 rounded-full bg-red-500 inline-block" />
                  {projects[activeIndex].cat}
                </motion.span>
                <div className="overflow-hidden">
                  <motion.h3
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className="font-bebas text-2xl md:text-3xl text-[#f3e8df] tracking-wide leading-none"
                  >
                    {projects[activeIndex].title}
                  </motion.h3>
                </div>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xs sm:text-sm text-white/50 leading-relaxed font-sans"
              >
                {projects[activeIndex].longDesc}
              </motion.p>

              <div className="flex flex-wrap gap-1.5">
                {projects[activeIndex].tags.map((t, ti) => (
                  <motion.span
                    key={t}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.25 + ti * 0.04, ease: "backOut" }}
                    whileHover={{ scale: 1.1, borderColor: "rgba(204,0,0,0.5)", color: "#fff" }}
                    className="font-bebas text-[9px] tracking-wider text-white/40 border border-white/10 px-2 py-0.5 rounded cursor-default transition-colors"
                  >
                    {t}
                  </motion.span>
                ))}
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                {projects[activeIndex].github && (
                  <motion.a
                    href={projects[activeIndex].github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.04, borderColor: "rgba(255,255,255,0.5)" }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 font-bebas text-xs tracking-widest text-white border border-white/20 px-4 py-2 transition-colors relative group overflow-hidden"
                  >
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/8 to-transparent" />
                    <Github className="w-3.5 h-3.5" /> VIEW CODE
                  </motion.a>
                )}
                {projects[activeIndex].demo && (
                  <motion.a
                    href={projects[activeIndex].demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.04, boxShadow: "0 0 20px rgba(204,0,0,0.4)" }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 font-bebas text-xs tracking-widest text-white bg-red-600 hover:bg-red-500 px-4 py-2 transition-colors relative group overflow-hidden"
                  >
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                    <ExternalLink className="w-3.5 h-3.5" /> LIVE DEMO
                  </motion.a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

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
                    className="flex items-center gap-2 font-bebas text-xs tracking-widest text-white bg-red-600 hover:bg-red-700 px-4 py-2 transition-colors"
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
