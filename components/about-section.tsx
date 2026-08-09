"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ScrollReveal } from "@/components/scroll-reveal"
import { CheckCircle2 } from "lucide-react"

const tools = [
  { name: "VS Code", icon: "https://cdn.simpleicons.org/visualstudiocode/007ACC" },
  { name: "Figma", icon: "https://cdn.simpleicons.org/figma/F24E1E" },
  { name: "Firebase", icon: "https://cdn.simpleicons.org/firebase/FFCA28" },
  { name: "GitHub", icon: "https://cdn.simpleicons.org/github/ffffff" },
  { name: "Android Studio", icon: "https://cdn.simpleicons.org/androidstudio/3DDC84" },
  { name: "Vercel", icon: "https://cdn.simpleicons.org/vercel/ffffff" },
  { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/339933" },
  { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB" },
]

const traits = [
  "Detail oriented — every pixel and function matters",
  "Problem solver — analytical approach to challenges",
  "Fast learner — always upskilling with new tech",
  "Always learning — curious and growth-focused",
]

export function AboutSection() {
  return (
    <section id="about" className="bg-background border-t border-border/30">
      {/* Header */}
      <div className="px-6 md:px-12 py-12 border-b border-border/30">
        <ScrollReveal>
          <p className="font-bebas text-xs tracking-[0.3em] text-primary mb-2 uppercase">Who I Am</p>
          <h2 className="font-bebas text-5xl md:text-7xl tracking-tight text-foreground">
            ABOUT <span className="text-primary">ME</span>
          </h2>
        </ScrollReveal>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 border-b border-border/30">
        {/* Left — Image */}
        <ScrollReveal className="border-b lg:border-b-0 lg:border-r border-border/30">
          <div className="relative h-[400px] md:h-[500px] lg:h-full min-h-[400px] overflow-hidden bg-secondary/30">
            <Image
              src="/images/removed-background.png"
              alt="Abhay Vishwakarma"
              fill
              className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
            />
            {/* Red overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent pointer-events-none" />

            {/* Photo caption */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="inline-block border border-primary/40 bg-background/80 backdrop-blur-sm px-3 py-1">
                <p className="font-bebas text-xs tracking-widest text-primary">ABHAY VISHWAKARMA · HYDERABAD, INDIA</p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Right — Bio + Traits */}
        <ScrollReveal delay={0.15}>
          <div className="p-8 md:p-12 flex flex-col h-full">
            {/* Bio */}
            <div className="mb-8">
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                I'm a Full Stack & Mobile Developer with a passion for building production-ready applications from concept to deployment.
                Experienced in developing fully functional mobile apps and web platforms using modern frameworks and AI-powered tools.
              </p>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mt-4">
                Focused on creating scalable, deployable solutions — not just prototypes. I believe great software is built at the intersection of clean code and thoughtful user experience.
              </p>
            </div>

            {/* Traits */}
            <div className="grid grid-cols-1 gap-3 mb-8">
              {traits.map((trait, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="flex items-start gap-3 text-sm text-muted-foreground"
                >
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  {trait}
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border/30 mt-auto">
              {[
                { count: "2+", label: "Years Exp" },
                { count: "5+", label: "Projects" },
                { count: "7.33", label: "CGPA" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="font-bebas text-3xl text-primary">{stat.count}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* ─── Tools I Use ─── */}
      <div className="px-6 md:px-12 py-10 border-b border-border/30">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            <div className="flex-shrink-0">
              <p className="font-bebas text-xs tracking-[0.3em] text-primary mb-1 uppercase">Stack</p>
              <h3 className="font-bebas text-2xl md:text-3xl tracking-wide text-foreground">TOOLS I USE</h3>
            </div>

            <div className="flex-1 flex flex-wrap items-center gap-4">
              {tools.map((tool, i) => (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <motion.div
                    whileHover={{ y: -4, scale: 1.1 }}
                    className="group flex flex-col items-center gap-1 cursor-default"
                  >
                    <div className="w-12 h-12 rounded border border-border/50 group-hover:border-primary/50 bg-secondary/30 flex items-center justify-center p-2.5 transition-all">
                      <img src={tool.icon} alt={tool.name} className="w-full h-full object-contain" />
                    </div>
                    <span className="text-[9px] text-muted-foreground/60 group-hover:text-primary transition-colors uppercase tracking-wider font-bebas">
                      {tool.name}
                    </span>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
