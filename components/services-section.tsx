"use client"

import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion"
import { useRef } from "react"
import * as LucideIcons from "lucide-react"
import { usePortfolio } from "@/lib/portfolio-provider"

// Real 3D tilt card with shine
function TiltServiceCard({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 180, damping: 20 })
  const sy = useSpring(y, { stiffness: 180, damping: 20 })
  const rotateX = useTransform(sy, [-0.5, 0.5], ["12deg", "-12deg"])
  const rotateY = useTransform(sx, [-0.5, 0.5], ["-12deg", "12deg"])
  const shineX = useTransform(sx, [-0.5, 0.5], ["0%", "100%"])
  const shineY = useTransform(sy, [-0.5, 0.5], ["0%", "100%"])

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: "800px" }}
      className={`relative cursor-default ${className}`}
    >
      <div style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>
      {/* Dynamic shine */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-xl"
        style={{
          background: `radial-gradient(circle at ${shineX} ${shineY}, rgba(255,255,255,0.08) 0%, transparent 60%)`,
        }}
      />
    </motion.div>
  )
}

export function ServicesSection() {
  const { portfolioData } = usePortfolio()
  const { services } = portfolioData
  const headerRef = useRef(null)
  const isInView = useInView(headerRef, { once: true, margin: "-60px" })

  const getIconComponent = (iconName: string) => {
    const I = (LucideIcons as any)[iconName]
    return I || LucideIcons.HelpCircle
  }

  return (
    <section id="services" className="bg-[#080808] border-t border-white/10 px-6 md:px-12 py-16 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[200px] bg-red-950/15 blur-[90px]"
        />
      </div>

      {/* Header */}
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, x: -40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-10"
      >
        <p className="font-bebas text-[9px] tracking-[0.4em] text-red-600 uppercase mb-1">What I Offer</p>
        <h2 className="font-bebas text-3xl md:text-5xl text-[#f3e8df] tracking-wide">
          WHAT I <span className="text-red-600">DO</span>
        </h2>
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: 80 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-2 h-0.5 bg-gradient-to-r from-red-600 to-transparent"
        />
      </motion.div>

      {/* 3D Tilt Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4" style={{ perspective: "1200px" }}>
        {services.map((s, i) => {
          const Icon = getIconComponent(s.icon)
          return (
            <TiltServiceCard key={i} delay={i * 0.1}>
              <div className="bg-[#111] border border-white/8 rounded-xl p-6 flex flex-col gap-5 h-full group relative overflow-hidden transition-colors hover:border-red-900/50">
                {/* Card inner glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
                  style={{ background: "radial-gradient(ellipse at top left, rgba(204,0,0,0.07) 0%, transparent 70%)" }}
                />
                {/* Number label */}
                <span className="absolute top-4 right-4 font-bebas text-[11px] text-white/10 tracking-widest">
                  0{i + 1}
                </span>

                <motion.div
                  whileHover={{ scale: 1.15, rotate: [0, -8, 8, 0] }}
                  transition={{ duration: 0.4 }}
                  className="w-11 h-11 rounded-xl border border-red-600/25 bg-red-950/20 flex items-center justify-center group-hover:border-red-500/60 group-hover:bg-red-950/40 transition-all"
                >
                  <Icon className="w-5 h-5 text-red-500" />
                </motion.div>

                <div>
                  <h3 className="font-bebas text-lg tracking-wider text-[#f3e8df] mb-2 group-hover:text-red-400 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-xs text-white/45 leading-relaxed font-sans">{s.desc}</p>
                </div>

                {/* Animated bottom line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                  className="mt-auto w-full h-px bg-gradient-to-r from-red-900/60 to-transparent origin-left"
                />
              </div>
            </TiltServiceCard>
          )
        })}
      </div>
    </section>
  )
}
