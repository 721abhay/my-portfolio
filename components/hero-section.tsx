"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Download, ArrowUpRight } from "lucide-react"

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen bg-[#080808] flex flex-col overflow-hidden">

      {/* ── Top meta bar ── */}
      <div className="flex items-center justify-between px-6 md:px-14 pt-16 pb-3 border-b border-white/[0.06] text-[10px] font-bebas tracking-[0.35em] text-white/30 uppercase z-20 relative">
        <span>Creative Portfolio · 2025</span>
        <button
          onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          className="flex items-center gap-1 text-red-500 hover:text-red-400 transition-colors"
        >
          Available for work <ArrowUpRight className="w-3 h-3 ml-0.5" />
        </button>
      </div>

      {/* ── Giant PORTFOLIO outline text ── */}
      <div className="relative px-2 md:px-4 overflow-hidden">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="font-bebas text-center select-none leading-none"
          style={{
            fontSize: "clamp(72px, 16.5vw, 270px)",
            WebkitTextStroke: "2px rgba(204, 0, 0, 0.5)",
            color: "transparent",
            lineHeight: 0.87,
          }}
        >
          PORTFOLIO
        </motion.h1>

        {/* Tags row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex justify-center gap-4 mt-1.5"
        >
          {["Full Stack", "Mobile", "AI", "Web"].map((tag, i) => (
            <span key={i} className="font-bebas text-sm md:text-lg tracking-widest text-white/20">
              {tag}
              {i < 3 && <span className="text-red-700 mx-2">·</span>}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── Profile photo overlapping the text ── */}
      <motion.div
        initial={{ opacity: 0, y: 70 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.25, ease: "easeOut" }}
        className="absolute inset-x-0 flex justify-center pointer-events-none z-10"
        style={{ top: "8%", bottom: 0 }}
      >
        <div className="relative h-full" style={{ width: "clamp(220px, 28vw, 400px)" }}>
          <Image
            src="/images/removed-background.png"
            alt="Abhay Vishwakarma"
            fill
            className="object-contain object-bottom drop-shadow-2xl"
            priority
          />
        </div>
      </motion.div>

      {/* ── Bottom info grid ── */}
      <div className="mt-auto grid grid-cols-1 md:grid-cols-2 border-t border-white/[0.06] relative z-20">

        {/* Left — specialisations + socials */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.55, duration: 0.7 }}
          className="px-6 md:px-14 py-8 border-b md:border-b-0 md:border-r border-white/[0.06]"
        >
          <p className="font-bebas text-[9px] tracking-[0.4em] text-white/25 uppercase mb-3">Specialising In</p>
          <div className="space-y-0.5 mb-6">
            {[
              "Full Stack Development",
              "Mobile App Creation",
              "AI Integration",
              "Database Architecture",
            ].map((r) => (
              <p key={r} className="font-bebas text-lg md:text-xl tracking-wide text-white/65">{r}</p>
            ))}
          </div>

          <div className="flex gap-3">
            {[
              { Icon: Github,   href: "https://github.com/721abhay",                       label: "GitHub" },
              { Icon: Linkedin, href: "https://linkedin.com/in/abhay-vishwakarma721",       label: "LinkedIn" },
              { Icon: Mail,     href: "mailto:abhayvishwakarma0814@gmail.com",             label: "Email" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="w-9 h-9 border border-white/10 flex items-center justify-center text-white/35
                           hover:border-red-600/60 hover:text-red-500 transition-all"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right — name, bio, stats, CTAs */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.65, duration: 0.7 }}
          className="px-6 md:px-14 py-8"
        >
          <h2 className="font-bebas text-4xl md:text-5xl lg:text-6xl leading-none tracking-tight text-white mb-1">
            ABHAY
            <br />
            <span className="text-red-600">VISHWAKARMA</span>
          </h2>
          <p className="font-bebas text-[10px] tracking-[0.3em] text-white/30 uppercase mb-3">
            Full Stack &amp; Mobile Developer
          </p>
          <p className="text-sm text-white/45 leading-relaxed max-w-xs">
            I build scalable, production-ready web &amp; mobile applications — from concept to
            deployment, using modern frameworks and AI-powered tools.
          </p>

          {/* Stats */}
          <div className="flex gap-7 mt-5 pt-5 border-t border-white/[0.06]">
            {[{ n: "2+", l: "Years Exp" }, { n: "5+", l: "Projects" }, { n: "7.33", l: "CGPA" }].map((s) => (
              <div key={s.l}>
                <p className="font-bebas text-2xl text-red-500 leading-none">{s.n}</p>
                <p className="text-[9px] text-white/25 uppercase tracking-wider mt-0.5">{s.l}</p>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex gap-3 mt-5">
            <a
              href="/abhay-vishwakarma-cv.pdf"
              download
              className="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white font-bebas
                         text-sm tracking-widest hover:bg-red-700 transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Download CV
            </a>
            <button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="flex items-center gap-2 px-5 py-2.5 border border-white/15 text-white/55
                         font-bebas text-sm tracking-widest hover:border-red-600/50 hover:text-white transition-all"
            >
              View Work
            </button>
          </div>
        </motion.div>
      </div>

      {/* ── Bottom status bar ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
        className="flex items-center justify-between px-6 md:px-14 py-2.5 border-t border-white/[0.06] relative z-20"
      >
        <p className="font-bebas text-[9px] tracking-[0.35em] text-white/20 uppercase">Hyderabad, India 🇮🇳</p>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <p className="font-bebas text-[9px] tracking-[0.35em] text-white/20 uppercase">Open to Work</p>
        </div>
        <p className="font-bebas text-[9px] tracking-[0.35em] text-white/20 uppercase hidden md:block">
          © 2025 Abhay Vishwakarma
        </p>
      </motion.div>
    </section>
  )
}
