"use client"

import { motion } from "framer-motion"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Code2, Database, Smartphone, Brain, Server, Palette, Sparkles, Cpu, Layers } from "lucide-react"
import { PremiumCard } from "@/components/premium-card"

const skillCategories = [
  {
    title: "Frontend Development",
    icon: Code2,
    gradient: "from-blue-500 to-cyan-500",
    glow: "accent",
    skills: [
      { name: "React / Next.js", level: 90 },
      { name: "JavaScript (ES6+)", level: 95 },
      { name: "HTML5 / CSS3", level: 98 },
      { name: "Tailwind CSS", level: 95 },
    ],
  },
  {
    title: "Languages & Backend",
    icon: Server,
    gradient: "from-emerald-500 to-green-500",
    glow: "emerald",
    skills: [
      { name: "Python", level: 90 },
      { name: "Java", level: 85 },
      { name: "C / C++", level: 80 },
      { name: "Node.js", level: 85 },
    ],
  },
  {
    title: "Mobile Development",
    icon: Smartphone,
    gradient: "from-violet-500 to-purple-500",
    glow: "primary",
    skills: [
      { name: "Kotlin", level: 90 },
      { name: "Android SDK", level: 85 },
      { name: "React Native", level: 80 },
      { name: "Flutter", level: 75 },
    ],
  },
  {
    title: "Cloud & Databases",
    icon: Database,
    gradient: "from-amber-500 to-orange-500",
    glow: "gold",
    skills: [
      { name: "Firebase", level: 95 },
      { name: "Supabase", level: 90 },
      { name: "Microsoft Azure", level: 80 },
      { name: "AWS", level: 75 },
    ],
  },
  {
    title: "Tools & DevOps",
    icon: Layers,
    gradient: "from-rose-500 to-pink-500",
    glow: "rose",
    skills: [
      { name: "Git / GitHub", level: 95 },
      { name: "JIRA / Agile", level: 90 },
      { name: "Unix / Linux", level: 85 },
      { name: "CI/CD Pipelines", level: 80 },
    ],
  },
  {
    title: "Professional Attributes",
    icon: Brain,
    gradient: "from-cyan-400 to-blue-500",
    glow: "accent",
    skills: [
      { name: "Problem Solving", level: 98 },
      { name: "Team Collaboration", level: 95 },
      { name: "Communication", level: 90 },
      { name: "Adaptability", level: 95 },
    ],
  },
]

export function SkillsSection() {
  return (
    <section id="skills" className="container px-6 py-32 md:px-12 relative">
      {/* Background Decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[120px] -z-10 mix-blend-screen" />

      <ScrollReveal>
        <div className="mb-24 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium text-sm tracking-wide"
          >
            <Cpu className="w-4 h-4" />
            <span>TECHNOLOGICAL ARSENAL</span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
            Mastery of <span className="text-gradient">Modern Tech</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-xl font-light leading-relaxed">
            A battle-tested stack deployed across high-performance applications.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillCategories.map((category, categoryIndex) => {
          const Icon = category.icon
          return (
            <ScrollReveal key={categoryIndex} delay={categoryIndex * 0.1}>
              <PremiumCard glowColor={category.glow} className="h-full">
                <div className="flex items-center gap-4 mb-8">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${category.gradient} shadow-lg shimmer-element relative overflow-hidden group-hover:scale-110 transition-transform duration-500`}>
                    <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite] border-t-2 border-white/20" />
                    <Icon className="h-6 w-6 text-white relative z-10" />
                  </div>
                  <h3 className="text-2xl font-bold">{category.title}</h3>
                </div>

                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-medium text-foreground/90">{skill.name}</span>
                        <span className="font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: `var(--${category.glow})` }}>{skill.level}%</span>
                      </div>

                      {/* Liquid Progress Bar */}
                      <div className="h-2 bg-secondary/50 rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1.5, delay: categoryIndex * 0.1 + skillIndex * 0.1, ease: "circOut" }}
                          className={`h-full relative`}
                        >
                          <div className={`absolute inset-0 bg-gradient-to-r ${category.gradient}`} />
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent w-[30%] animate-[shimmer_2s_infinite]" />
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </PremiumCard>
            </ScrollReveal>
          )
        })}
      </div>
    </section>
  )
}
