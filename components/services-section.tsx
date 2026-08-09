"use client"

import { motion } from "framer-motion"
import { Code2, Smartphone, Brain, Database, Layers, ArrowUpRight } from "lucide-react"

const SERVICES = [
  {
    num: "01", icon: Code2,
    title: "Web Development",
    desc: "Building scalable, high-performance web apps with React & Next.js. From concept to deployment.",
    tags: ["React", "Next.js", "TypeScript", "REST APIs"],
  },
  {
    num: "02", icon: Smartphone,
    title: "Mobile Apps",
    desc: "Cross-platform mobile experiences with Kotlin & Flutter that feel native on every device.",
    tags: ["Kotlin", "Android SDK", "React Native", "Firebase"],
  },
  {
    num: "03", icon: Brain,
    title: "AI Integration",
    desc: "Integrating LLMs and AI tools to create intelligent, automated features for your applications.",
    tags: ["Claude / GPT", "AI Automation", "Computer Vision"],
  },
  {
    num: "04", icon: Database,
    title: "Database Design",
    desc: "Designing robust data schemas and managing databases for scalable, reliable backends.",
    tags: ["MySQL", "MongoDB", "PostgreSQL", "Firebase"],
  },
  {
    num: "05", icon: Layers,
    title: "System Architecture",
    desc: "Planning complete system architectures from backend APIs to cloud deployments.",
    tags: ["REST API", "Cloud Deploy", "CI/CD", "Microservices"],
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="bg-[#080808] border-t border-white/[0.06]">

      {/* Header */}
      <div className="flex items-end justify-between px-6 md:px-14 py-10 border-b border-white/[0.06]">
        <div>
          <p className="font-bebas text-[9px] tracking-[0.4em] text-red-600 uppercase mb-1">Services</p>
          <h2 className="font-bebas text-5xl md:text-7xl tracking-tight text-white leading-none">
            WHAT I <span className="text-red-600">DO</span>
          </h2>
        </div>
        <button
          onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          className="hidden md:flex items-center gap-1.5 font-bebas text-sm tracking-widest text-white/25
                     hover:text-white transition-colors"
        >
          Hire Me <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* 5-column grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
        {SERVICES.map((s, i) => {
          const Icon = s.icon
          return (
            <motion.div
              key={i}
              whileHover={{ backgroundColor: "rgba(204,0,0,0.04)" }}
              className="group relative p-7 border-r border-b border-white/[0.06]
                         [&:nth-child(5n)]:border-r-0 sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(5n)]:border-r-0
                         lg:[&:nth-child(2n)]:border-r flex flex-col gap-5 transition-colors min-h-[300px]"
            >
              {/* Big number bg */}
              <span className="font-bebas text-6xl leading-none select-none text-white/[0.04]
                               group-hover:text-red-900/20 transition-colors">
                {s.num}
              </span>

              {/* Icon */}
              <div className="w-10 h-10 border border-white/10 group-hover:border-red-600/40
                              flex items-center justify-center transition-all">
                <Icon className="w-5 h-5 text-white/35 group-hover:text-red-500 transition-colors" />
              </div>

              {/* Text */}
              <div className="flex-1">
                <h3 className="font-bebas text-lg tracking-wide text-white mb-2
                               group-hover:text-red-400 transition-colors">
                  {s.title}
                </h3>
                <p className="text-xs text-white/30 leading-relaxed mb-3">{s.desc}</p>
                <ul className="space-y-1">
                  {s.tags.map((t) => (
                    <li key={t} className="flex items-center gap-1.5 text-[10px] text-white/20">
                      <span className="w-1 h-1 rounded-full bg-red-600 flex-shrink-0" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom hover line */}
              <div className="absolute bottom-0 left-0 w-0 h-px bg-red-600
                              group-hover:w-full transition-all duration-500" />
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
