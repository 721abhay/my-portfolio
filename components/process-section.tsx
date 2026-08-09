"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Search, Target, Lightbulb, Code2, CheckCircle } from "lucide-react"

const STEPS = [
  { num: "01", icon: Search,       title: "DISCOVER", desc: "Understanding goals, audience and project requirements.", color: "#CC0000" },
  { num: "02", icon: Target,       title: "DEFINE",   desc: "Research, wireframing and structuring the right solution.", color: "#AA0000" },
  { num: "03", icon: Lightbulb,    title: "DESIGN",   desc: "Crafting clean, modern and user-centric visuals.", color: "#CC0000" },
  { num: "04", icon: Code2,        title: "DEVELOP",  desc: "Collaborating with code to bring the design to life.", color: "#AA0000" },
  { num: "05", icon: CheckCircle,  title: "DELIVER",  desc: "Testing, refining and delivering pixel-perfect results.", color: "#CC0000" },
]

export function ProcessSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <div id="process" className="space-y-6">
      {/* Header */}
      <div className="overflow-hidden">
        <motion.h2
          initial={{ y: "110%", opacity: 0 }}
          whileInView={{ y: "0%", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-bebas text-3xl md:text-4xl text-[#f3e8df] tracking-wide"
        >
          MY <span className="text-red-600">PROCESS</span>
        </motion.h2>
      </div>

      {/* Timeline steps */}
      <div ref={ref} className="relative space-y-0">
        {/* Vertical line */}
        <div className="absolute left-[22px] top-5 bottom-5 w-px bg-white/[0.06] z-0" />
        {/* Animated fill line */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-[22px] top-5 bottom-5 w-px bg-gradient-to-b from-red-600 via-red-800 to-transparent z-0 origin-top"
        />

        {STEPS.map((step, i) => {
          const Icon = step.icon
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex items-start gap-4 p-4 group cursor-default"
            >
              {/* Timeline dot */}
              <div className="relative z-10 flex-shrink-0 mt-0.5">
                <motion.div
                  whileHover={{ scale: 1.3 }}
                  className="w-[18px] h-[18px] rounded-full border-2 border-red-600/60 bg-[#080808] flex items-center justify-center transition-colors group-hover:border-red-500 group-hover:bg-red-950/40"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 group-hover:bg-red-400 transition-colors" />
                </motion.div>
              </div>

              {/* Content card */}
              <motion.div
                whileHover={{ x: 4, borderColor: "rgba(204,0,0,0.3)", boxShadow: "0 4px 20px rgba(204,0,0,0.08)" }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="flex-1 flex items-center gap-3 p-3.5 rounded-xl bg-[#121010] border border-white/5 transition-colors overflow-hidden relative"
              >
                {/* Hover bg sweep */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "radial-gradient(ellipse at left, rgba(204,0,0,0.07) 0%, transparent 70%)" }}
                />

                {/* Number */}
                <motion.span
                  animate={{ opacity: [0.15, 0.4, 0.15] }}
                  transition={{ duration: 3.5, repeat: Infinity, delay: i * 0.6 }}
                  className="font-bebas text-3xl text-red-600/30 w-7 flex-shrink-0 leading-none"
                >
                  {step.num}
                </motion.span>

                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.15 }}
                  className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02] group-hover:border-red-600/50 transition-colors flex-shrink-0"
                >
                  <Icon className="w-3.5 h-3.5 text-white/40 group-hover:text-red-500 transition-colors" />
                </motion.div>

                <div className="min-w-0">
                  <h3 className="font-bebas text-sm tracking-wider text-[#f3e8df] group-hover:text-red-400 transition-colors leading-none mb-1">
                    {step.title}
                  </h3>
                  <p className="text-[10px] text-white/35 font-sans leading-tight">{step.desc}</p>
                </div>

                {/* Active indicator line */}
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={isInView ? { scaleY: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.12 }}
                  className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-600 to-red-900 origin-top rounded-l-full opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
