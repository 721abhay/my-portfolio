"use client"

import { motion } from "framer-motion"

const STEPS = [
  { num: "01", title: "DISCOVER",  desc: "Gathering goals, audience and project requirements. Deep understanding of the problem space before writing a single line of code." },
  { num: "02", title: "DEFINE",    desc: "Research, analyzing and choosing the right solution. Setting clear milestones and deliverables for the project." },
  { num: "03", title: "DESIGN",    desc: "Creating modern, user-friendly interfaces. Wireframes, prototypes and visual systems that reflect the brand." },
  { num: "04", title: "DEVELOP",   desc: "Bringing the design to life with clean, scalable and maintainable code — tested at every step." },
  { num: "05", title: "DELIVER",   desc: "Testing and delivering the polished final product. Deployment, monitoring and ongoing support after launch." },
]

export function ProcessSection() {
  return (
    <section id="process" className="bg-[#080808] border-t border-white/[0.06]">

      {/* Header */}
      <div className="px-6 md:px-14 py-10 border-b border-white/[0.06]">
        <p className="font-bebas text-[9px] tracking-[0.4em] text-red-600 uppercase mb-1">How I Work</p>
        <h2 className="font-bebas text-5xl md:text-7xl tracking-tight text-white leading-none">
          MY <span className="text-red-600">PROCESS</span>
        </h2>
      </div>

      {/* Steps list */}
      <div className="divide-y divide-white/[0.06]">
        {STEPS.map((step, i) => (
          <motion.div
            key={i}
            whileHover={{ x: 5 }}
            className="group flex items-center gap-6 px-6 md:px-14 py-5
                       hover:bg-red-950/[0.08] transition-colors cursor-default"
          >
            {/* Number */}
            <span className="font-bebas text-3xl md:text-4xl text-red-600 leading-none w-14 flex-shrink-0">
              {step.num}
            </span>

            {/* Title */}
            <h3 className="font-bebas text-xl md:text-2xl tracking-wider text-white
                           group-hover:text-red-400 transition-colors w-40 flex-shrink-0">
              {step.title}
            </h3>

            {/* Divider */}
            <div className="hidden md:block w-px h-8 bg-white/[0.06] flex-shrink-0" />

            {/* Description */}
            <p className="hidden md:block text-sm text-white/30 leading-relaxed flex-1">
              {step.desc}
            </p>

            {/* Arrow */}
            <span className="hidden md:block font-bebas text-2xl text-red-600
                             opacity-0 group-hover:opacity-100 transition-opacity ml-auto">
              →
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
