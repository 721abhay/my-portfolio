"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { ScrollReveal } from "@/components/scroll-reveal"
import { InfiniteMarquee } from "@/components/infinite-marquee"
import { motion } from "framer-motion"

const skills = [
  { name: "Full-Stack Development", level: 90 },
  { name: "AI & ML Integration", level: 85 },
  { name: "Mobile App Development", level: 85 },
  { name: "Problem Solving", level: 90 },
]

const techStack = {
  frontend: [
    { name: "HTML5", icon: "https://cdn.simpleicons.org/html5/E34C26", desc: "Markup" },
    { name: "CSS3", icon: "https://cdn.simpleicons.org/css3/1572B6", desc: "Styling" },
    { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript/F7DF1E", desc: "Programming" },
    { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB", desc: "UI Library" },
  ],
  backend: [
    { name: "Java", icon: "https://cdn.simpleicons.org/openjdk/ED8B00", desc: "Backend" },
    { name: "Python", icon: "https://cdn.simpleicons.org/python/3776AB", desc: "AI/Backend" },
    { name: "Anthropic Claude", icon: "https://cdn.simpleicons.org/openai/412991", desc: "AI Tool" },
    { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/339933", desc: "Runtime" },
  ],
  database: [
    { name: "MySQL", icon: "https://cdn.simpleicons.org/mysql/4479A1", desc: "Relational DB" },
    { name: "MongoDB", icon: "https://cdn.simpleicons.org/mongodb/47A248", desc: "NoSQL" },
    { name: "Firebase", icon: "https://cdn.simpleicons.org/firebase/FFCA28", desc: "BaaS" },
    { name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql/4169E1", desc: "Database" },
  ],
  tools: [
    { name: "Git", icon: "https://cdn.simpleicons.org/git/F05032", desc: "Version Control" },
    { name: "GitHub", icon: "https://cdn.simpleicons.org/github/181717/white", desc: "Repository" },
    { name: "v0", icon: "https://cdn.simpleicons.org/vercel/000000/white", desc: "AI Dev Tool" },
    { name: "Bolt", icon: "https://cdn.simpleicons.org/bolt/000000", desc: "Dev Tool" },
  ],
}

export function AboutSection() {
  return (
    <section id="about" className="container px-6 py-32 md:px-12">
      <div className="grid gap-16 lg:grid-cols-2 items-center">
        <div className="space-y-8">
          <ScrollReveal>
            <div className="inline-block rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-sm font-medium text-primary mb-4">
              ABOUT ME
            </div>
            <h2 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-6xl flex flex-col gap-2">
              Full-Stack Developer & <span className="text-primary">AI Enthusiast</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              Vibe coder building production-ready applications from concept to deployment. Experienced in developing
              fully functional mobile apps and websites using AI-powered tools like v0, Lovable, and Bolt. Focused on
              creating scalable, deployable solutions—not just prototypes.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="space-y-6 py-4">
              {skills.map((skill, index) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-foreground">{skill.name}</span>
                    <span className="text-muted-foreground font-semibold">{skill.level}%</span>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-secondary/70 border border-border/30">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1.2, delay: index * 0.15, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-orange-500 to-amber-500 shadow-lg glow-bar"
                    />
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              {[
                { count: "1+", label: "Years Exp" },
                { count: "3+", label: "Projects" },
                { count: "6", label: "Skills" },
                { count: "7.33", label: "CGPA" },
              ].map((stat, index) => (
                <Card
                  key={index}
                  className="border-border/50 bg-card/80 backdrop-blur-sm hover:border-primary/50 transition-all hover:scale-105 hover:shadow-lg"
                >
                  <CardContent className="p-6 text-center">
                    <h3 className="text-3xl font-bold text-primary mb-1">
                      {stat.count}
                    </h3>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollReveal>
        </div>

        <div className="relative">
          <ScrollReveal delay={0.3} className="w-full">
            <div className="relative rounded-3xl overflow-hidden bg-card/50 backdrop-blur-md border border-border/50 p-8 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />

              <h3 className="text-2xl font-bold mb-8 text-center relative z-10">
                Tech Stack & <span className="text-primary">Expertise</span>
              </h3>

              <TooltipProvider>
                <div className="space-y-8 relative z-10">
                  {Object.entries(techStack).map(([category, tools], idx) => (
                    <div key={category} className="relative mask-linear-fade">
                      <InfiniteMarquee
                        speed={20 + idx * 5}
                        direction={idx % 2 === 0 ? "left" : "right"}
                        items={tools.map((tech, i) => (
                          <Tooltip key={i}>
                            <TooltipTrigger asChild>
                              <div className="h-16 w-16 mx-4 rounded-xl bg-card border border-border/50 flex items-center justify-center p-3 hover:bg-primary/10 hover:border-primary/50 hover:scale-110 transition-all cursor-pointer shadow-lg">
                                <img
                                  src={tech.icon || "/placeholder.svg"}
                                  alt={tech.name}
                                  className="w-full h-full object-contain opacity-90 hover:opacity-100"
                                />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="bg-popover border-border">
                              <p className="font-semibold">{tech.name}</p>
                              <p className="text-xs text-muted-foreground">{tech.desc}</p>
                            </TooltipContent>
                          </Tooltip>
                        ))}
                      />
                    </div>
                  ))}
                </div>
              </TooltipProvider>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
