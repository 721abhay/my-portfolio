"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Download, ArrowUpRight } from "lucide-react"

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen bg-[#080808] text-white flex flex-col justify-between overflow-hidden">

      {/* ── Top Meta Bar ── */}
      <div className="flex items-center justify-between px-6 md:px-12 pt-20 pb-4 border-b border-white/10 z-30 relative">
        <span className="font-bebas text-xs tracking-[0.35em] text-white/40 uppercase">
          Creative Portfolio · 2025
        </span>
        <button
          onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          className="flex items-center gap-1 font-bebas text-xs tracking-[0.25em] text-red-500 hover:text-red-400 uppercase transition-colors"
        >
          Available for Work <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
        </button>
      </div>

      {/* ── Hero Main Workspace: Headline + Central Portrait Grid ── */}
      <div className="relative pt-6 pb-12 flex-1 flex flex-col justify-center">

        {/* ── Giant PORTFOLIO Headline ── */}
        <div className="relative z-10 text-center select-none mb-2 md:mb-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-bebas text-center leading-none tracking-tight"
            style={{
              fontSize: "clamp(72px, 16vw, 240px)",
              color: "#f3e8df",
              opacity: 0.95,
              lineHeight: 0.85,
            }}
          >
            PORTFOLIO
          </motion.h1>
        </div>

        {/* ── 3-Column Hero Content Grid ── */}
        <div className="relative z-20 max-w-7xl mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">

          {/* ── Left Column: Tags + Quote ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-3 space-y-6 text-left pb-4"
          >
            <div>
              <h3 className="font-bebas text-2xl md:text-3xl tracking-wider text-[#f3e8df] leading-tight">
                FULL STACK / MOBILE
              </h3>
              <p className="text-[10px] text-white/40 uppercase tracking-widest font-bebas mt-1">
                AI INTEGRATION · WEB DEV · SYSTEMS
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2">
              <span className="font-serif text-3xl text-red-600 leading-none block">“</span>
              <p className="text-xs text-white/60 leading-relaxed font-sans italic">
                I design &amp; build digital experiences that are intuitive, scalable and high-performing.
              </p>
              <div className="pt-1">
                <span className="font-bebas text-xs tracking-widest text-red-500 uppercase">
                  Abhay Vishwakarma
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-1">
              {[
                { Icon: Github, href: "https://github.com/721abhay", label: "GitHub" },
                { Icon: Linkedin, href: "https://linkedin.com/in/abhay-vishwakarma721", label: "LinkedIn" },
                { Icon: Mail, href: "mailto:abhayvishwakarma0814@gmail.com", label: "Email" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/40 hover:border-red-500 hover:text-red-500 transition-all"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* ── Center Column: Portrait Photo with Red Halo Spotlight ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-5 relative flex justify-center items-end h-[440px] md:h-[520px]"
          >
            {/* Dark Red Circular Glow / Spotlight behind photo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full bg-gradient-to-tr from-red-950 via-red-900/40 to-transparent blur-2xl opacity-80 pointer-events-none" />

            {/* Person Photo */}
            <div className="relative w-[320px] md:w-[420px] h-full z-10">
              <Image
                src="/images/abhay-suit-transparent.png"
                alt="Abhay Vishwakarma"
                fill
                className="object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
                priority
              />
            </div>
          </motion.div>

          {/* ── Right Column: Name + Bio + Stats Row ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-4 space-y-5 text-left pb-4"
          >
            <div>
              <h2 className="font-bebas text-4xl md:text-5xl text-[#f3e8df] leading-none tracking-tight">
                ABHAY<br />
                <span className="text-red-600">VISHWAKARMA</span>
              </h2>
              <p className="font-bebas text-[10px] tracking-[0.25em] text-red-500 uppercase mt-1.5">
                FULL STACK &amp; MOBILE DEVELOPER
              </p>
            </div>

            <p className="text-xs text-white/60 leading-relaxed font-sans max-w-sm">
              I'm a full stack developer crafting clean, modern, and high-performance web &amp; mobile applications. I help brands communicate, engage and grow through thoughtful digital solutions.
            </p>

            {/* Stats Bar */}
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/10">
              <div>
                <p className="font-bebas text-2xl text-[#f3e8df]">2+</p>
                <p className="text-[9px] text-white/40 uppercase tracking-widest font-bebas">Years Exp</p>
              </div>
              <div>
                <p className="font-bebas text-2xl text-red-500">5+</p>
                <p className="text-[9px] text-white/40 uppercase tracking-widest font-bebas">Projects</p>
              </div>
              <div>
                <p className="font-bebas text-2xl text-[#f3e8df]">7.33</p>
                <p className="text-[9px] text-white/40 uppercase tracking-widest font-bebas">CGPA</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href="/abhay-vishwakarma-cv.pdf"
                download
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bebas text-xs tracking-widest uppercase transition-colors"
              >
                <Download className="w-3.5 h-3.5" /> Download CV
              </a>
              <button
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="px-4 py-2 border border-white/20 hover:border-white text-white/70 hover:text-white font-bebas text-xs tracking-widest uppercase transition-colors"
              >
                View Work
              </button>
            </div>
          </motion.div>

        </div>
      </div>

      {/* ── Bottom Status Bar ── */}
      <div className="flex items-center justify-between px-6 md:px-12 py-3 border-t border-white/10 z-20 relative text-[10px] font-bebas tracking-[0.3em] text-white/30 uppercase">
        <span>Hyderabad, India 🇮🇳</span>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span>Open to Opportunities</span>
        </div>
        <span className="hidden md:inline">© 2025 Abhay Vishwakarma</span>
      </div>
    </section>
  )
}
