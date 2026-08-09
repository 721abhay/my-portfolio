"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Download, ArrowUpRight, Award, FolderCheck, Star } from "lucide-react"

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen bg-[#080808] text-white flex flex-col justify-between overflow-hidden">

      {/* ── Top Bar ── */}
      <div className="flex items-center justify-between px-6 md:px-12 pt-16 pb-3 border-b border-white/10 z-30 relative text-[10px] font-bebas tracking-[0.35em] text-white/40 uppercase">
        <span>Creative Portfolio</span>
        <button
          onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          className="flex items-center gap-1 text-red-500 hover:text-red-400 transition-colors"
        >
          Available for Work <ArrowUpRight className="w-3 h-3 ml-0.5" />
        </button>
      </div>

      {/* ── Main Hero Composition Area ── */}
      <div className="relative flex-1 flex flex-col justify-between pt-2 pb-6 z-20">

        {/* ── Giant Edge-to-Edge PORTFOLIO Headline ── */}
        <div className="relative z-10 text-center select-none overflow-hidden">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-bebas text-center leading-none tracking-tighter"
            style={{
              fontSize: "clamp(90px, 19.5vw, 290px)",
              color: "#ebd4c2",
              lineHeight: 0.8,
            }}
          >
            PORTFOLIO
          </motion.h1>
        </div>

        {/* ── Central Overlay Grid (Quote Left | Red Spotlight & Photo Center | Bio Right) ── */}
        <div className="relative z-20 max-w-7xl mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end -mt-16 sm:-mt-24 md:-mt-32">

          {/* ── Left Column: Tags & Quote ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-3 space-y-4 text-left pb-2"
          >
            <div>
              <h3 className="font-bebas text-2xl md:text-3xl tracking-wider text-[#ebd4c2] leading-none">
                FULL STACK / MOBILE
              </h3>
              <div className="text-[10px] text-white/40 uppercase tracking-widest font-bebas space-y-0.5 mt-2">
                <p>FULL STACK DEVELOPMENT</p>
                <p>MOBILE APP CREATION</p>
                <p>AI INTEGRATION &amp; CLOUD</p>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 space-y-1.5">
              <span className="font-serif text-3xl text-red-600 leading-none block">“</span>
              <p className="text-[11px] text-white/60 leading-relaxed font-sans italic max-w-xs">
                I design &amp; build digital experiences that are intuitive, beautiful and impactful.
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-1">
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
                  className="w-7 h-7 rounded-full border border-white/15 flex items-center justify-center text-white/40 hover:border-red-500 hover:text-red-500 transition-all"
                >
                  <Icon className="w-3 h-3" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* ── Center Column: Person Photo overlapping PORTFOLIO inside Red Circle Spotlight ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-6 relative flex justify-center items-end h-[360px] md:h-[460px]"
          >
            {/* Dark Crimson Circular Spotlight (Exact match to reference image) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] md:w-[380px] md:h-[380px] rounded-full bg-[#350707] border border-red-900/30 shadow-[0_0_80px_rgba(204,0,0,0.25)] pointer-events-none" />

            {/* Suit Photo overlapping PORTFOLIO text */}
            <div className="relative w-[300px] md:w-[400px] h-full z-10">
              <Image
                src="/images/abhay-suit-transparent.png"
                alt="Abhay Vishwakarma"
                fill
                className="object-contain object-bottom filter brightness-105 drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]"
                priority
              />
            </div>
          </motion.div>

          {/* ── Right Column: Name + Bio + Icon Stats ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-3 space-y-4 text-left pb-2"
          >
            <div>
              <h2 className="font-bebas text-3xl md:text-4xl text-[#ebd4c2] leading-none tracking-tight">
                ABHAY<br />
                VISHWAKARMA
              </h2>
              <p className="font-bebas text-[10px] tracking-[0.25em] text-red-500 uppercase mt-1">
                FULL STACK &amp; MOBILE DEVELOPER
              </p>
            </div>

            <p className="text-[11px] text-white/60 leading-relaxed font-sans max-w-xs">
              I'm a digital developer crafting clean, modern and user-focused designs. I help brands communicate, engage and grow through thoughtful design solutions.
            </p>

            {/* Icon Stats Row (Matching reference circles) */}
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/10 text-center">
              <div className="flex flex-col items-center">
                <div className="w-7 h-7 rounded-full border border-white/15 flex items-center justify-center mb-1">
                  <Award className="w-3.5 h-3.5 text-red-500" />
                </div>
                <p className="font-bebas text-base text-[#ebd4c2] leading-none">2+</p>
                <p className="text-[8px] text-white/40 uppercase tracking-widest font-bebas mt-0.5">Years Exp</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-7 h-7 rounded-full border border-white/15 flex items-center justify-center mb-1">
                  <FolderCheck className="w-3.5 h-3.5 text-red-500" />
                </div>
                <p className="font-bebas text-base text-[#ebd4c2] leading-none">5+</p>
                <p className="text-[8px] text-white/40 uppercase tracking-widest font-bebas mt-0.5">Projects</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-7 h-7 rounded-full border border-white/15 flex items-center justify-center mb-1">
                  <Star className="w-3.5 h-3.5 text-red-500" />
                </div>
                <p className="font-bebas text-base text-[#ebd4c2] leading-none">7.33</p>
                <p className="text-[8px] text-white/40 uppercase tracking-widest font-bebas mt-0.5">CGPA</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-1">
              <a
                href="/abhay-vishwakarma-cv.pdf"
                download
                className="flex items-center gap-1.5 px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white font-bebas text-[11px] tracking-widest uppercase transition-colors"
              >
                <Download className="w-3 h-3" /> CV
              </a>
              <button
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="px-3.5 py-2 border border-white/20 hover:border-white text-white/70 hover:text-white font-bebas text-[11px] tracking-widest uppercase transition-colors"
              >
                Work
              </button>
            </div>
          </motion.div>

        </div>
      </div>

      {/* ── Bottom Status Bar ── */}
      <div className="flex items-center justify-between px-6 md:px-12 py-2.5 border-t border-white/10 z-20 relative text-[10px] font-bebas tracking-[0.3em] text-white/30 uppercase">
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
