"use client"

import { Github, Linkedin, Mail, Download, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"
import confetti from "canvas-confetti"

export function HeroSection() {
  const handleDownloadCV = () => {
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 }, colors: ["#CC0000", "#FF3333", "#ffffff"] })
    const link = document.createElement("a")
    link.href = "/abhay-vishwakarma-cv.pdf"
    link.download = "Abhay_Vishwakarma_CV.pdf"
    link.click()
  }

  return (
    <section className="relative min-h-screen bg-background overflow-hidden flex flex-col">
      {/* ─── Top Bar ─── */}
      <div className="flex items-center justify-between px-6 md:px-12 pt-24 pb-4 border-b border-border/30 z-20 relative">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs font-bebas tracking-[0.3em] text-muted-foreground uppercase"
        >
          Creative Portfolio
        </motion.p>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 text-xs font-bebas tracking-[0.2em] text-primary uppercase cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
        >
          Available for work
          <ArrowUpRight className="w-3.5 h-3.5" />
        </motion.div>
      </div>

      {/* ─── PORTFOLIO Giant Text ─── */}
      <div className="relative flex-1 flex flex-col">
        <div className="relative px-4 md:px-8 lg:px-12 pt-4 overflow-hidden">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-bebas text-[22vw] md:text-[20vw] lg:text-[18vw] leading-[0.85] tracking-tight select-none text-center"
            style={{
              WebkitTextStroke: "2px rgba(204,0,0,0.6)",
              color: "transparent",
              lineHeight: "0.9",
            }}
          >
            PORTFOLIO
          </motion.h1>

          {/* Sub labels below PORTFOLIO */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center gap-4 mt-2 mb-0"
          >
            {["UI", "UX", "WEB", "MOBILE", "AI"].map((tag, i) => (
              <span key={i} className="font-bebas text-lg md:text-2xl tracking-widest text-muted-foreground">
                {tag} {i < 4 && <span className="text-primary">·</span>}{" "}
              </span>
            ))}
          </motion.div>
        </div>

        {/* ─── Profile Image Overlay ─── */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 flex items-end justify-center pointer-events-none z-10"
          style={{ width: "clamp(220px, 30vw, 420px)" }}
        >
          <Image
            src="/images/removed-background.png"
            alt="Abhay Vishwakarma"
            width={420}
            height={560}
            className="object-contain object-bottom w-full drop-shadow-2xl"
            priority
          />
        </motion.div>

        {/* ─── Name & Info Grid ─── */}
        <div className="relative z-20 grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-border/30 mt-auto">
          {/* Left — Role labels */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="px-6 md:px-12 py-8 border-r border-border/30"
          >
            <p className="text-xs font-bebas tracking-[0.25em] text-muted-foreground mb-3 uppercase">Specializing in</p>
            <div className="space-y-1">
              {["Full Stack Development", "Mobile App Creation", "AI Integration", "Database Architecture"].map((role, i) => (
                <p key={i} className="font-bebas text-xl md:text-2xl tracking-wider text-foreground/80">
                  {role}
                </p>
              ))}
            </div>

            {/* Social Icons */}
            <div className="flex gap-3 mt-6">
              {[
                { Icon: Github, href: "https://github.com/721abhay", label: "GitHub" },
                { Icon: Linkedin, href: "https://www.linkedin.com/in/abhay-vishwakarma721", label: "LinkedIn" },
                { Icon: Mail, href: "mailto:abhayvishwakarma0814@gmail.com", label: "Email" },
              ].map(({ Icon, href, label }, i) => (
                <Link
                  key={i}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="h-9 w-9 rounded-full bg-primary/10 hover:bg-primary/30 border border-primary/20 hover:border-primary/60 flex items-center justify-center transition-all"
                >
                  <Icon className="h-4 w-4 text-primary" />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Right — Name + Bio + Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="px-6 md:px-12 py-8"
          >
            <h2 className="font-bebas text-4xl md:text-5xl lg:text-6xl leading-none tracking-tight text-foreground mb-3">
              ABHAY
              <br />
              <span className="text-primary">VISHWAKARMA</span>
            </h2>
            <p className="text-sm text-muted-foreground mb-1 font-bebas tracking-widest">FULL STACK & MOBILE DEVELOPER</p>
            <p className="text-sm text-muted-foreground/70 max-w-xs leading-relaxed mt-3">
              I'm a developer crafting clean, modern and scalable applications. I help brands build, deploy and grow through thoughtful digital solutions.
            </p>

            {/* Stats */}
            <div className="flex gap-8 mt-6 pt-6 border-t border-border/20">
              {[
                { count: "2+", label: "Years Experience" },
                { count: "5+", label: "Projects Completed" },
                { count: "7.33", label: "CGPA" },
              ].map((stat, i) => (
                <div key={i}>
                  <p className="font-bebas text-3xl text-primary leading-none">{stat.count}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleDownloadCV}
                className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-bebas text-sm tracking-wider rounded hover:bg-primary/80 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download CV
              </button>
              <button
                onClick={() => document.getElementById("projects-showcase")?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center gap-2 px-5 py-2.5 border border-primary/40 text-primary font-bebas text-sm tracking-wider rounded hover:bg-primary/10 transition-colors"
              >
                View Portfolio
              </button>
            </div>
          </motion.div>
        </div>

        {/* ─── Bottom Info Bar ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="flex items-center justify-between px-6 md:px-12 py-3 border-t border-border/30 relative z-20"
        >
          <p className="text-xs text-muted-foreground font-bebas tracking-widest">HYDERABAD, INDIA 🇮🇳</p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <p className="text-xs text-muted-foreground font-bebas tracking-widest">OPEN TO WORK</p>
          </div>
          <p className="text-xs text-muted-foreground font-bebas tracking-widest hidden md:block">
            © 2025 ABHAY VISHWAKARMA
          </p>
        </motion.div>
      </div>
    </section>
  )
}
