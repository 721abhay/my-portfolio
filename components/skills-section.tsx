"use client"

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import { Code2, Smartphone, Database, Cpu, Layout, Server, Sparkles } from "lucide-react"

const SKILL_GROUPS = [
  { title: "Frontend Development", icon: Layout, color: "#CC0000", skills: ["React.js", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML5/CSS3"] },
  { title: "Backend & Systems", icon: Server, color: "#AA0000", skills: ["Node.js", "Express.js", "REST APIs", "GraphQL", "Python", "C/C++"] },
  { title: "Mobile Development", icon: Smartphone, color: "#990000", skills: ["Kotlin", "Android SDK", "Flutter", "React Native", "Jetpack Compose"] },
  { title: "Databases & Cloud", icon: Database, color: "#CC0000", skills: ["MySQL", "PostgreSQL", "MongoDB", "Firebase", "Supabase", "AWS S3"] },
  { title: "AI & Tools", icon: Cpu, color: "#AA0000", skills: ["Git / GitHub", "VS Code", "MediaPipe", "Playwright", "Docker", "Figma"] },
]

// 3D tilt skill cell
function SkillCell({ group, index }: { group: typeof SKILL_GROUPS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const cellRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cellRef, { once: true, margin: "-50px" })
  const [hovered, setHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 150, damping: 20 })
  const sy = useSpring(y, { stiffness: 150, damping: 20 })
  const rotateX = useTransform(sy, [-0.5, 0.5], ["6deg", "-6deg"])
  const rotateY = useTransform(sx, [-0.5, 0.5], ["-6deg", "6deg"])

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const onLeave = () => { x.set(0); y.set(0); setHovered(false) }
  const Icon = group.icon

  return (
    <motion.div
      ref={cellRef}
      initial={{ opacity: 0, clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
      animate={isInView ? { opacity: 1, clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)" } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onMouseEnter={() => setHovered(true)}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: "600px" }}
        className={`p-8 border-b border-white/[0.06] flex flex-col justify-between relative overflow-hidden transition-colors cursor-default ${
          index >= 3 ? "lg:border-t lg:border-white/[0.06]" : ""
        }`}
      >
        {/* Background glow that tracks mouse */}
        <motion.div
          animate={hovered
            ? { opacity: 1, background: `radial-gradient(ellipse at center, ${group.color}18 0%, transparent 70%)` }
            : { opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 pointer-events-none"
        />

        <div style={{ transform: "translateZ(15px)" }}>
          <div className="flex items-center gap-3 mb-6">
            <motion.div
              animate={hovered ? { rotate: 360, scale: 1.1 } : { rotate: 0, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-9 h-9 border border-white/10 flex items-center justify-center"
              style={{ background: hovered ? `${group.color}22` : "transparent", borderColor: hovered ? `${group.color}60` : "rgba(255,255,255,0.1)" }}
            >
              <Icon className="w-4 h-4 text-red-500" />
            </motion.div>
            <h3 className="font-bebas text-xl tracking-wide text-white uppercase" style={{ color: hovered ? "#fff" : "#ddd" }}>
              {group.title}
            </h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {group.skills.map((skill, si) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1 + si * 0.04 + 0.3, duration: 0.35, ease: "backOut" }}
                whileHover={{ scale: 1.12, borderColor: group.color + "aa", color: "#fff", boxShadow: `0 0 12px ${group.color}44` }}
                className="font-bebas text-xs tracking-wider text-white/55 bg-[#0d0d0d] border border-white/10 px-3 py-1.5 transition-all cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="pt-6 mt-6 border-t border-white/[0.04] flex items-center justify-between text-[10px] font-bebas tracking-widest text-white/20" style={{ transform: "translateZ(15px)" }}>
          <span>MODULE 0{index + 1}</span>
          <motion.span
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.4 }}
            className="text-red-600"
          >PRODUCTION READY</motion.span>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function SkillsSection() {
  const headerRef = useRef(null)
  const isInView = useInView(headerRef, { once: true, margin: "-80px" })

  return (
    <section id="skills" className="bg-[#080808] border-t border-white/[0.06] relative overflow-hidden">
      {/* Drifting ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ x: [0, 60, 0], y: [0, -40, 0], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-1/4 w-[500px] h-[300px] bg-red-950/20 blur-[100px] rounded-full"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 30, 0], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute top-0 right-1/4 w-[400px] h-[250px] bg-red-900/15 blur-[80px] rounded-full"
        />
      </div>

      {/* Header with clip-path reveal */}
      <div ref={headerRef} className="px-6 md:px-14 py-10 border-b border-white/[0.06] relative">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-bebas text-[9px] tracking-[0.4em] text-red-600 uppercase mb-1"
        >Capabilities</motion.p>

        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: "110%" }}
            animate={isInView ? { y: "0%" } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-bebas text-5xl md:text-7xl tracking-tight text-white leading-none"
          >
            TECHNICAL <span className="text-red-600">ARSENAL</span>
          </motion.h2>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-3 h-0.5 bg-gradient-to-r from-red-600 to-transparent origin-left"
          style={{ width: 80 }}
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y lg:divide-y-0 md:divide-x divide-white/[0.06]" style={{ perspective: "800px" }}>
        {SKILL_GROUPS.map((group, i) => (
          <SkillCell key={group.title} group={group} index={i} />
        ))}

        {/* 6th Box — Continuous Growth */}
        <motion.div
          initial={{ opacity: 0, clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
          whileInView={{ opacity: 1, clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="p-8 border-b border-white/[0.06] flex flex-col justify-between relative overflow-hidden"
        >
          <motion.div
            animate={{
              background: [
                "radial-gradient(circle at 20% 80%, rgba(204,0,0,0.1) 0%, transparent 60%)",
                "radial-gradient(circle at 80% 20%, rgba(204,0,0,0.1) 0%, transparent 60%)",
                "radial-gradient(circle at 20% 80%, rgba(204,0,0,0.1) 0%, transparent 60%)",
              ],
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 pointer-events-none"
          />
          <div>
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="w-9 h-9 border border-red-600/40 flex items-center justify-center"
              >
                <Sparkles className="w-4 h-4 text-red-500" />
              </motion.div>
              <h3 className="font-bebas text-xl tracking-wide text-white uppercase">Continuous Growth</h3>
            </div>
            <p className="text-xs text-white/40 leading-relaxed font-sans">
              Always expanding into emerging AI frameworks, low-level optimization, and cloud architecture to deliver cutting-edge software solutions.
            </p>
          </div>
          <div className="pt-6 mt-6 border-t border-white/[0.04] flex items-center justify-between text-[10px] font-bebas tracking-widest text-white/20">
            <span>ALWAYS LEARNING</span>
            <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2.5, repeat: Infinity }} className="text-red-600">2025</motion.span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
