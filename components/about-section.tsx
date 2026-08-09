"use client"

import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { CheckCircle2 } from "lucide-react"
import { usePortfolio } from "@/lib/portfolio-provider"
import { AnimatedCounter } from "./animated-counter"

export function AboutSection() {
  const { portfolioData, registerAboutClick } = usePortfolio()
  const { about } = portfolioData

  const leftRef = useRef(null)
  const rightRef = useRef(null)
  const toolsRef = useRef(null)
  const leftInView = useInView(leftRef, { once: true, margin: "-80px" })
  const rightInView = useInView(rightRef, { once: true, margin: "-80px" })
  const toolsInView = useInView(toolsRef, { once: true, margin: "-50px" })

  return (
    <section id="about" className="bg-[#080808] border-t border-white/10 scroll-mt-16 relative overflow-hidden">
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="px-6 md:px-14 pt-10 pb-0"
      >
        <p className="font-bebas text-[9px] tracking-[0.4em] text-red-600 uppercase mb-1">The Person Behind The Code</p>
        <h2 className="font-bebas text-5xl md:text-7xl tracking-tight text-white leading-none">
          ABOUT <span className="text-red-600">ME</span>
        </h2>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 64 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-3 h-0.5 bg-gradient-to-r from-red-600 to-transparent"
        />
      </motion.div>

      {/* ── 2-Column Main About Layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-white/10 min-h-[620px] mt-8">

        {/* ── Left: Portrait ── */}
        <motion.div
          ref={leftRef}
          initial={{ opacity: 0, x: -60 }}
          animate={leftInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          onClick={registerAboutClick}
          className="lg:col-span-6 relative bg-[#090909] min-h-[480px] lg:min-h-[650px] flex items-end justify-center border-b lg:border-b-0 lg:border-r border-white/10 overflow-hidden group cursor-pointer"
        >
          {/* Animated glow orb */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full bg-red-950/40 blur-3xl pointer-events-none"
          />

          {/* Hover spotlight */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{ background: "radial-gradient(ellipse at center, rgba(204,0,0,0.08) 0%, transparent 70%)" }}
          />

          {/* Click to view hint */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={leftInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/60 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-full"
          >
            <span className="font-bebas text-[9px] tracking-widest text-white/60 uppercase">View Profile</span>
          </motion.div>

          <div className="relative w-full h-full min-h-[480px] lg:min-h-[650px] flex items-end justify-center">
            <motion.div
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 200, damping: 30 }}
              className="relative w-full h-full"
            >
              <Image
                src="/images/abhay-suit-transparent.png"
                alt="Abhay Vishwakarma"
                fill
                className="object-cover object-top scale-110 lg:scale-115 transition-transform duration-700 group-hover:scale-[1.18]"
                priority
              />
            </motion.div>
          </div>
        </motion.div>

        {/* ── Right: Bio + Traits + Stats ── */}
        <motion.div
          ref={rightRef}
          initial={{ opacity: 0, x: 60 }}
          animate={rightInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 p-8 md:p-14 flex flex-col justify-between space-y-8 bg-[#080808]"
        >
          <div className="space-y-6">
            {about.bioParagraphs.map((para, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={rightInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + idx * 0.15, duration: 0.6 }}
                className="text-base md:text-lg text-white/80 leading-relaxed font-sans font-light"
              >
                {para}
              </motion.p>
            ))}

            {/* Trait checklist */}
            <div className="space-y-3.5 pt-3">
              {about.traits.map((trait, idx) => (
                <motion.div
                  key={trait}
                  initial={{ opacity: 0, x: 20 }}
                  animate={rightInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + idx * 0.1, duration: 0.5 }}
                  className="flex items-center gap-3 text-xs md:text-sm text-white/70 font-sans group/trait cursor-default"
                >
                  <motion.div whileHover={{ scale: 1.3, rotate: 10 }}>
                    <CheckCircle2 className="w-4 h-4 text-red-600 flex-shrink-0 transition-colors group-hover/trait:text-red-400" />
                  </motion.div>
                  <span className="group-hover/trait:text-white transition-colors">{trait}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Animated Stats Row */}
          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10">
            {about.stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={rightInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + idx * 0.15, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                className="cursor-default"
              >
                <p className="font-bebas text-4xl md:text-5xl text-red-600 leading-none">
                  <AnimatedCounter value={stat.value} />
                </p>
                <p className="text-[10px] text-white/40 uppercase tracking-widest font-bebas mt-1.5">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Tools I Use Strip ── */}
      <motion.div
        ref={toolsRef}
        initial={{ opacity: 0, y: 30 }}
        animate={toolsInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="px-6 md:px-14 py-10 bg-[#080808] relative"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex-shrink-0">
            <p className="font-bebas text-[10px] tracking-[0.3em] text-red-600 uppercase mb-0.5">Stack</p>
            <h3 className="font-bebas text-2xl md:text-3xl tracking-wide text-[#f3e8df]">TOOLS I USE</h3>
          </div>
          <div className="flex flex-wrap gap-4">
            {about.tools.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={toolsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.06, duration: 0.4, ease: "backOut" }}
                whileHover={{ y: -6, scale: 1.1 }}
                className="group flex flex-col items-center gap-1"
              >
                <motion.div
                  whileHover={{ borderColor: "rgba(204,0,0,0.6)", boxShadow: "0 0 15px rgba(204,0,0,0.2)" }}
                  className="w-11 h-11 rounded-lg border border-white/10 bg-white/[0.02] flex items-center justify-center p-2.5 transition-all"
                >
                  <img src={t.icon} alt={t.name} className="w-full h-full object-contain" />
                </motion.div>
                <span className="font-bebas text-[9px] tracking-wider text-white/30 group-hover:text-red-500 transition-colors uppercase">
                  {t.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
