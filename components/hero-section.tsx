"use client"

import Image from "next/image"
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { useRef, useState } from "react"
import { 
  Github, Linkedin, Mail, Download, ArrowUpRight, Award, FolderCheck, Star,
  Twitter, Youtube, Instagram, Globe, Link as LinkIcon, Zap
} from "lucide-react"
import { usePortfolio } from "@/lib/portfolio-provider"
import { Typewriter } from "./typewriter"
import { GlitchText } from "./glitch-text"

// Magnetic element hook
function useMagnetic(strength = 0.4) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 15 })
  const sy = useSpring(y, { stiffness: 200, damping: 15 })

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * strength)
    y.set((e.clientY - cy) * strength)
  }
  const onLeave = () => { x.set(0); y.set(0) }
  return { sx, sy, onMove, onLeave }
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 50, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}

export function HeroSection() {
  const { portfolioData, registerAboutClick } = usePortfolio()
  const { hero } = portfolioData
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const [imageHover, setImageHover] = useState(false)

  // Parallax scroll
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] })
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const titleScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92])

  // 3D tilt on photo
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const stiltX = useSpring(tiltX, { stiffness: 120, damping: 18 })
  const stiltY = useSpring(tiltY, { stiffness: 120, damping: 18 })
  const rotateX = useTransform(stiltY, [-0.5, 0.5], ["8deg", "-8deg"])
  const rotateY = useTransform(stiltX, [-0.5, 0.5], ["-8deg", "8deg"])

  const handleImageMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = imageRef.current?.getBoundingClientRect()
    if (!rect) return
    tiltX.set((e.clientX - rect.left) / rect.width - 0.5)
    tiltY.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const handleImageLeave = () => { tiltX.set(0); tiltY.set(0) }

  // Magnetic buttons
  const cvMag = useMagnetic(0.5)
  const workMag = useMagnetic(0.5)

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "github": return Github
      case "linkedin": return Linkedin
      case "email": case "mail": return Mail
      case "twitter": case "x": return Twitter
      case "youtube": return Youtube
      case "instagram": return Instagram
      case "website": case "globe": return Globe
      default: return LinkIcon
    }
  }

  const getStatIcon = (index: number) => {
    switch (index) {
      case 0: return <Award className="w-3.5 h-3.5 text-red-500" />
      case 1: return <FolderCheck className="w-3.5 h-3.5 text-red-500" />
      default: return <Star className="w-3.5 h-3.5 text-red-500" />
    }
  }

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen bg-[#080808] text-white flex flex-col justify-between overflow-hidden"
    >
      {/* ── Layered ambient orbs ── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-red-950/25 blur-[140px]"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-red-900/20 blur-[120px]"
        />
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-red-950/10 blur-[100px]"
        />
        {/* Noise grain overlay */}
        <div
          className="absolute inset-0 opacity-[0.025] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
          }}
        />
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(rgba(204,0,0,0.6) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* ── Top Bar ── */}
      <motion.div
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center justify-between px-6 md:px-12 pt-16 pb-4 border-b border-white/10 z-30 relative text-[10px] font-bebas tracking-[0.35em] text-white/40 uppercase"
      >
        <span className="flex items-center gap-2">
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <Zap className="w-3 h-3 text-red-600" />
          </motion.span>
          Creative Portfolio
        </span>
        <button
          onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          className="flex items-center gap-1.5 text-red-500 hover:text-white transition-colors group relative"
        >
          <motion.span
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-green-500"
          />
          Available for Work
          <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-red-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
        </button>
      </motion.div>

      {/* ── Main content ── */}
      <div className="relative flex-1 flex flex-col justify-between pt-6 pb-8 z-20">

        {/* ── GLITCH PORTFOLIO TITLE with parallax ── */}
        <motion.div
          style={{ y: titleY, opacity: titleOpacity, scale: titleScale }}
          className="relative z-10 text-center select-none overflow-hidden pt-4 pb-2"
        >
          <motion.h1
            initial={{ opacity: 0, y: 80, filter: "blur(30px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-bebas text-center leading-none tracking-[0.12em]"
            style={{
              fontSize: "clamp(75px, 16vw, 240px)",
              color: "#ebd4c2",
              lineHeight: 0.85,
            }}
          >
            <GlitchText text={hero.title.toUpperCase()} style={{ color: "#ebd4c2" }} />
          </motion.h1>
        </motion.div>

        {/* ── Grid layout ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-20 max-w-7xl mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end -mt-10 sm:-mt-14 md:-mt-16"
        >

          {/* ── Left ── */}
          <motion.div variants={fadeUp} className="lg:col-span-3 space-y-4 text-left pb-2">
            <div>
              <h3 className="font-bebas text-2xl md:text-3xl tracking-wider text-[#ebd4c2] leading-none">
                {hero.role}
              </h3>
              {/* Typewriter roles */}
              <div className="text-[11px] text-red-500 uppercase tracking-widest font-bebas mt-2 h-5">
                <Typewriter
                  words={hero.subRoles}
                  className="text-red-500"
                  speed={70}
                  deleteSpeed={35}
                  pauseMs={2000}
                />
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 space-y-1.5">
              <span className="font-serif text-3xl text-red-600 leading-none block">"</span>
              <p className="text-[11px] text-white/60 leading-relaxed font-sans italic max-w-xs">
                {hero.quote}
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-1">
              {hero.socials.map((social, idx) => {
                const IconComponent = getSocialIcon(social.platform)
                return (
                  <motion.a
                    key={idx}
                    href={social.url}
                    target={social.url.startsWith("http") ? "_blank" : undefined}
                    rel={social.url.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={social.platform}
                    title={social.platform}
                    whileHover={{ scale: 1.25, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + idx * 0.07, type: "spring", stiffness: 300 }}
                    className="w-7 h-7 rounded-full border border-white/15 flex items-center justify-center text-white/40 hover:text-red-500 hover:border-red-500/50 hover:shadow-[0_0_12px_rgba(204,0,0,0.4)] transition-all"
                  >
                    <IconComponent className="w-3 h-3" />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>

          {/* ── Center: 3D tilt photo ── */}
          <motion.div
            variants={fadeUp}
            onClick={registerAboutClick}
            ref={imageRef}
            onMouseMove={handleImageMove}
            onMouseLeave={handleImageLeave}
            onMouseEnter={() => setImageHover(true)}
            className="lg:col-span-6 relative flex justify-center items-end h-[360px] md:h-[450px] cursor-pointer"
            style={{ perspective: "1000px" }}
          >
            {/* Pulsing rings */}
            <motion.div
              animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[270px] h-[270px] md:w-[370px] md:h-[370px] rounded-full bg-[#350707] border border-red-900/30 pointer-events-none"
              style={{ boxShadow: "0 0 60px rgba(204,0,0,0.2), inset 0 0 60px rgba(204,0,0,0.1)" }}
            />
            {/* Slow orbit ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] md:w-[430px] md:h-[430px] rounded-full border border-dashed border-red-900/20 pointer-events-none"
            />
            {/* Counter-orbit ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] md:w-[480px] md:h-[480px] rounded-full border border-red-950/15 pointer-events-none"
              style={{ borderStyle: "dashed", borderDasharray: "4 8" }}
            />

            {/* 3D tilt image */}
            <motion.div
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative w-[300px] md:w-[390px] h-full z-10"
            >
              <Image
                src="/images/abhay-suit-transparent.png"
                alt={`${hero.firstName} ${hero.lastName}`}
                fill
                className="object-contain object-bottom filter brightness-105 drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)]"
                priority
              />
              {/* Shine layer */}
              <motion.div
                className="absolute inset-0 pointer-events-none rounded-full"
                style={{
                  background: `radial-gradient(circle at ${useTransform(stiltX, [-0.5, 0.5], ["20%", "80%"])} ${useTransform(stiltY, [-0.5, 0.5], ["20%", "80%"])}, rgba(255,255,255,0.06) 0%, transparent 60%)`,
                }}
              />
            </motion.div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-6 right-0 md:right-6 bg-red-600/95 backdrop-blur-sm px-3 py-1.5 rounded-full border border-red-400/30 z-20 shadow-[0_0_20px_rgba(204,0,0,0.5)]"
            >
              <span className="font-bebas text-[10px] tracking-widest text-white uppercase">✦ Open to Work</span>
            </motion.div>

            {/* Bottom label */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 text-center"
            >
              <span className="font-bebas text-[8px] tracking-[0.4em] text-white/20 uppercase">Click to explore</span>
            </motion.div>
          </motion.div>

          {/* ── Right ── */}
          <motion.div variants={fadeUp} className="lg:col-span-3 space-y-4 text-left pb-2">
            <div>
              <h2 className="font-bebas text-3xl md:text-4xl text-[#ebd4c2] leading-none tracking-tight">
                {hero.firstName}<br />{hero.lastName}
              </h2>
              <p className="font-bebas text-[10px] tracking-[0.25em] text-red-500 uppercase mt-1">
                {hero.bioRole}
              </p>
            </div>

            <p className="text-[11px] text-white/60 leading-relaxed font-sans max-w-xs">
              {hero.bioText}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/10 text-center">
              {hero.stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + idx * 0.12, type: "spring", stiffness: 260, damping: 20 }}
                  whileHover={{ scale: 1.12, y: -2 }}
                  className="flex flex-col items-center cursor-default group"
                >
                  <div className="w-7 h-7 rounded-full border border-white/15 group-hover:border-red-500/50 flex items-center justify-center mb-1 transition-colors">
                    {getStatIcon(idx)}
                  </div>
                  <p className="font-bebas text-base text-[#ebd4c2] leading-none">{stat.value}</p>
                  <p className="text-[8px] text-white/40 uppercase tracking-widest font-bebas mt-0.5">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Magnetic CTA Buttons */}
            <div className="flex items-center gap-2 pt-1">
              <motion.div
                onMouseMove={cvMag.onMove as any}
                onMouseLeave={cvMag.onLeave}
                style={{ x: cvMag.sx, y: cvMag.sy }}
              >
                <motion.a
                  href="/abhay-vishwakarma-cv.pdf"
                  download
                  whileHover={{ boxShadow: "0 0 25px rgba(204,0,0,0.5)", scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="flex items-center gap-1.5 px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bebas text-[11px] tracking-widest uppercase transition-all relative overflow-hidden group"
                >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                  <Download className="w-3 h-3" /> CV
                </motion.a>
              </motion.div>

              <motion.div
                onMouseMove={workMag.onMove as any}
                onMouseLeave={workMag.onLeave}
                style={{ x: workMag.sx, y: workMag.sy }}
              >
                <motion.button
                  onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                  whileHover={{ borderColor: "rgba(255,255,255,0.6)" }}
                  whileTap={{ scale: 0.96 }}
                  className="px-4 py-2.5 border border-white/20 text-white/70 hover:text-white font-bebas text-[11px] tracking-widest uppercase transition-all"
                >
                  Work
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Bottom Bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="flex items-center justify-between px-6 md:px-12 py-2.5 border-t border-white/10 z-20 relative text-[10px] font-bebas tracking-[0.3em] text-white/30 uppercase"
      >
        <span>Hyderabad, India 🇮🇳</span>
        <div className="flex items-center gap-2">
          <motion.span
            animate={{ opacity: [1, 0.2, 1], scale: [1, 1.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-green-500"
          />
          <span>Open to Opportunities</span>
        </div>
        <span className="hidden md:inline">© 2025 {hero.firstName} {hero.lastName}</span>
      </motion.div>
    </section>
  )
}
