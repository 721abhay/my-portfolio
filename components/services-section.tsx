"use client"

import { motion } from "framer-motion"
import { Code2, Smartphone, Brain, Database, Layers } from "lucide-react"

const SERVICES = [
  {
    icon: Code2,
    title: "WEB DEVELOPMENT",
    desc: "Building scalable, high-performance web applications with React & Next.js.",
  },
  {
    icon: Smartphone,
    title: "MOBILE APPS",
    desc: "Cross-platform mobile experiences with Kotlin & Flutter that feel native on every device.",
  },
  {
    icon: Brain,
    title: "AI INTEGRATION",
    desc: "Integrating LLMs and AI tools to create intelligent, automated features.",
  },
  {
    icon: Database,
    title: "DATABASE DESIGN",
    desc: "Designing robust data schemas and managing databases for scalable backends.",
  },
  {
    icon: Layers,
    title: "SYSTEM ARCHITECTURE",
    desc: "Planning complete system architectures from backend APIs to cloud deployments.",
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="bg-[#080808] border-t border-white/10 px-6 md:px-12 py-12">
      {/* Section Header */}
      <div className="mb-8">
        <h2 className="font-bebas text-3xl md:text-4xl text-[#f3e8df] tracking-wide">
          WHAT I <span className="text-red-600">DO</span>
        </h2>
      </div>

      {/* 5 horizontal rounded cards (matching reference design) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {SERVICES.map((s, i) => {
          const Icon = s.icon
          return (
            <motion.div
              key={i}
              whileHover={{ y: -4, borderColor: "rgba(204,0,0,0.5)" }}
              className="bg-[#121010] border border-white/10 rounded-xl p-6 flex flex-col justify-between transition-all group"
            >
              <div>
                <div className="w-10 h-10 rounded-lg border border-red-600/30 bg-red-950/20 flex items-center justify-center mb-6 group-hover:border-red-500 transition-colors">
                  <Icon className="w-5 h-5 text-red-500" />
                </div>
                <h3 className="font-bebas text-lg tracking-wider text-[#f3e8df] mb-2 group-hover:text-red-500 transition-colors">
                  {s.title}
                </h3>
                <p className="text-xs text-white/50 leading-relaxed font-sans">
                  {s.desc}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
