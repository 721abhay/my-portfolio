"use client"

import { motion } from "framer-motion"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Code2, Smartphone, Database, Brain, Layers, ArrowRight } from "lucide-react"

const services = [
  {
    icon: Code2,
    title: "Web Development",
    description: "Building scalable, high-performance web applications with React, Next.js and modern frameworks. From concept to deployment.",
    features: ["React & Next.js", "TypeScript", "REST & GraphQL APIs", "Performance Optimization"],
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "Crafting cross-platform mobile experiences with Kotlin & Flutter that feel native and fluid on every device.",
    features: ["Kotlin / Android SDK", "React Native", "Flutter", "Firebase Integration"],
  },
  {
    icon: Brain,
    title: "AI Integration",
    description: "Integrating state-of-the-art LLMs and AI tools to create intelligent, automated application features.",
    features: ["Claude / GPT APIs", "AI Automation", "Computer Vision", "Prompt Engineering"],
  },
  {
    icon: Database,
    title: "Database Architecture",
    description: "Designing robust data schemas and managing databases for scalable, reliable application backends.",
    features: ["MySQL & PostgreSQL", "MongoDB", "Firebase / Supabase", "Data Modeling"],
  },
  {
    icon: Layers,
    title: "System Design",
    description: "Planning and building complete system architectures from backend APIs to cloud deployments.",
    features: ["REST API Design", "Cloud Deployment", "CI/CD Pipelines", "Microservices"],
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="relative bg-background border-t border-border/30">
      {/* Section Header */}
      <div className="px-6 md:px-12 py-12 border-b border-border/30">
        <ScrollReveal>
          <div className="flex items-end justify-between">
            <div>
              <p className="font-bebas text-xs tracking-[0.3em] text-primary mb-2 uppercase">Services</p>
              <h2 className="font-bebas text-5xl md:text-7xl tracking-tight text-foreground">
                WHAT I <span className="text-primary">DO</span>
              </h2>
            </div>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="hidden md:flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-bebas tracking-widest group"
            >
              Hire Me <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </ScrollReveal>
      </div>

      {/* Services Grid — magazine table layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {services.map((service, index) => {
          const Icon = service.icon
          return (
            <ScrollReveal key={index} delay={index * 0.08}>
              <motion.div
                whileHover={{ backgroundColor: "rgba(204,0,0,0.04)" }}
                className="group relative p-8 border-r border-b border-border/30 last:border-r-0 flex flex-col gap-6 min-h-[320px] transition-colors"
              >
                {/* Number */}
                <span className="font-bebas text-5xl text-border/40 group-hover:text-primary/20 transition-colors leading-none select-none">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Icon */}
                <div className="w-12 h-12 rounded border border-primary/30 flex items-center justify-center bg-primary/5 group-hover:bg-primary/10 group-hover:border-primary/60 transition-all">
                  <Icon className="w-6 h-6 text-primary" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="font-bebas text-xl tracking-wide text-foreground mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-1">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground/70">
                        <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Hover line accent */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-500" />
              </motion.div>
            </ScrollReveal>
          )
        })}
      </div>
    </section>
  )
}
