"use client"

import { motion } from "framer-motion"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Search, Target, Lightbulb, Code2, CheckCircle } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Search,
    title: "DISCOVER",
    description: "Gathering goals, audience and project requirements. Understanding the problem space deeply.",
  },
  {
    number: "02",
    icon: Target,
    title: "DEFINE",
    description: "Research, analyzing and choosing the right solution. Setting clear milestones and deliverables.",
  },
  {
    number: "03",
    icon: Lightbulb,
    title: "DESIGN",
    description: "Creating modern and user-friendly interfaces. Wireframes, prototypes and visual systems.",
  },
  {
    number: "04",
    icon: Code2,
    title: "DEVELOP",
    description: "Collaborating with developers to bring the design to life. Clean, scalable and maintainable code.",
  },
  {
    number: "05",
    icon: CheckCircle,
    title: "DELIVER",
    description: "Testing and delivering a polished final studio. Deployment, monitoring and ongoing support.",
  },
]

export function ProcessSection() {
  return (
    <section id="process" className="bg-background border-t border-border/30">
      {/* Header */}
      <div className="px-6 md:px-12 py-12 border-b border-border/30">
        <ScrollReveal>
          <p className="font-bebas text-xs tracking-[0.3em] text-primary mb-2 uppercase">How I Work</p>
          <h2 className="font-bebas text-5xl md:text-7xl tracking-tight text-foreground">
            MY <span className="text-primary">PROCESS</span>
          </h2>
        </ScrollReveal>
      </div>

      {/* Steps */}
      <div className="divide-y divide-border/30">
        {steps.map((step, index) => {
          const Icon = step.icon
          return (
            <ScrollReveal key={index} delay={index * 0.08}>
              <motion.div
                whileHover={{ x: 6 }}
                className="group grid grid-cols-[80px_1fr] md:grid-cols-[100px_200px_1fr_auto] items-center gap-6 px-6 md:px-12 py-6 hover:bg-primary/3 transition-colors cursor-default"
              >
                {/* Step Number */}
                <span className="font-bebas text-4xl md:text-5xl text-primary leading-none">
                  {step.number}
                </span>

                {/* Icon + Title */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded border border-border/50 group-hover:border-primary/40 flex items-center justify-center transition-colors">
                    <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="font-bebas text-xl md:text-2xl tracking-wider text-foreground group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed hidden md:block">
                  {step.description}
                </p>

                {/* Arrow */}
                <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity text-primary font-bebas text-2xl">
                  →
                </div>
              </motion.div>
            </ScrollReveal>
          )
        })}
      </div>
    </section>
  )
}
