"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Github, ExternalLink, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { PremiumCard } from "@/components/premium-card"
import { ScrollReveal } from "@/components/scroll-reveal"
import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const projects = [
  {
    title: "FinTech Dashboard",
    category: "Full Stack",
    description: "Production-ready financial dashboard with real-time data visualization, predictive analytics, and bank-grade security protocols.",
    tags: ["Next.js 14", "TypeScript", "Prisma", "PostgreSQL"],
    image: "/images/finance-dashboard-dark-ui.jpg",
    github: "https://github.com/721abhay",
    demo: "#",
    colSpan: "md:col-span-2",
    glow: "primary",
    featured: true,
  },
  {
    title: "AI Canvas",
    category: "AI",
    description: "Collaborative whiteboard with generative AI capabilities, allowing users to sketch and generate assets in real-time.",
    tags: ["React", "Fabric.js", "OpenAI API", "Socket.io"],
    image: "/images/abstract-3d-web-design.jpg",
    github: "https://github.com/721abhay",
    demo: "#",
    colSpan: "md:col-span-1",
    glow: "accent",
    featured: false,
  },
  {
    title: "Campus Connect",
    category: "Full Stack",
    description: "Comprehensive academic management system handling varied workflows for students, faculty, and administration.",
    tags: ["Java Spring", "React", "MySQL", "AWS"],
    image: "/images/campus-connect.png",
    github: "https://github.com/721abhay",
    demo: "#",
    colSpan: "md:col-span-1",
    glow: "gold",
    featured: false,
  },
]

export function ProjectGrid() {
  const [filter, setFilter] = useState("All")
  const categories = ["All", "Full Stack", "AI"]
  const filteredProjects = filter === "All" ? projects : projects.filter((p) => p.category === filter)

  return (
    <section id="work" className="container px-6 py-32 md:px-12 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 -z-10 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px]" />

      <ScrollReveal>
        <div className="mb-20 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent font-medium text-sm tracking-wide"
            >
              <Sparkles className="w-4 h-4" />
              <span>SELECTED WORKS</span>
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
              Digital <span className="text-gradient">Masterpieces</span>
            </h2>
            <p className="text-muted-foreground max-w-xl text-xl font-light leading-relaxed">
              A curated collection of production-grade applications that push the boundaries of what's possible on the web.
            </p>
          </div>

          <Link
            href="https://github.com/721abhay"
            target="_blank"
            className="group flex items-center gap-2 text-base font-medium text-foreground hover:text-primary transition-colors"
          >
            <span className="relative">
              View GitHub Profile
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </span>
            <div className="rounded-full border border-border p-2 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:border-primary group-hover:bg-primary/10">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </Link>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <Tabs defaultValue="All" className="mb-16">
          <TabsList className="w-full justify-start bg-transparent p-0 gap-4 flex-wrap h-auto">
            {categories.map((cat) => (
              <TabsTrigger
                key={cat}
                value={cat}
                onClick={() => setFilter(cat)}
                className="rounded-full border border-border bg-card/50 backdrop-blur-sm px-6 py-2.5 text-base font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white data-[state=active]:border-transparent transition-all hover:border-primary/50"
              >
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </ScrollReveal>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 auto-rows-[500px]">
        {filteredProjects.map((project, index) => (
          <ScrollReveal key={index} delay={index * 0.1} className={project.colSpan}>
            <PremiumCard glowColor={project.glow || "primary"} className="h-full group" contentClassName="p-0">
              <div className="absolute inset-0 z-0 h-full w-full">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110 will-change-transform"
                />

                {/* Cinema-grade overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
              </div>

              <div className="relative z-10 flex h-full flex-col justify-between p-8">
                <div className="flex justify-between items-start translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <Badge
                    variant="secondary"
                    className="bg-white/10 backdrop-blur-md border-white/20 text-white font-medium"
                  >
                    {project.category}
                  </Badge>

                  <div className="flex gap-3">
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-10 w-10 rounded-full bg-black/40 backdrop-blur-md hover:bg-white hover:text-black border-white/20 transition-all duration-300 hover:scale-110"
                      asChild
                    >
                      <Link href={project.github} target="_blank" aria-label="View Source">
                        <Github className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-10 w-10 rounded-full bg-black/40 backdrop-blur-md hover:bg-white hover:text-black border-white/20 transition-all duration-300 hover:scale-110"
                      asChild
                    >
                      <Link href={project.demo} target="_blank" aria-label="View Live Demo">
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="space-y-4 transform transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-all">
                    {project.title}
                  </h3>

                  <p className="text-gray-300 line-clamp-2 text-lg font-light leading-relaxed group-hover:text-white transition-colors duration-300">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="bg-white/5 border-white/10 text-gray-300 backdrop-blur-sm"
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </PremiumCard>
          </ScrollReveal>
        ))}
      </div>

      {/* Decorative View All Button */}
      <div className="mt-20 flex justify-center">
        <Link href="https://github.com/721abhay" target="_blank" className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <span className="text-sm font-medium tracking-widest uppercase border-b border-transparent group-hover:border-foreground transition-all">View All Work</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </Link>
      </div>
    </section>
  )
}
