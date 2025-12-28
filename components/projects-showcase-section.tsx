"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
    Github,
    ExternalLink,
    Play,
    X,
    Code2,
    Sparkles,
    Calendar,
    Users,
    Star
} from "lucide-react"
import { PremiumCard } from "@/components/premium-card"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Project {
    id: string
    title: string
    category: "Web App" | "Mobile App" | "Full Stack" | "AI/ML" | "Open Source"
    description: string
    longDescription: string
    tags: string[]
    image?: string
    video?: string
    thumbnail?: string
    github?: string
    demo?: string
    date: string
    team?: string
    stars?: number
    featured?: boolean
    highlights?: string[]
}

const projects: Project[] = [
    {
        id: "1",
        title: "AI-Powered Job Application System",
        category: "Full Stack",
        description: "Automated job application system with AI-powered form filling and LinkedIn integration.",
        longDescription: "A comprehensive automation platform that streamlines the job application process. Features include intelligent form detection, AI-powered question answering, session management, and real-time application tracking.",
        tags: ["React", "Node.js", "Playwright", "AI", "TypeScript"],
        // video: "/projects/autoapply-demo.mp4", // Add your video here
        thumbnail: "/placeholder.jpg", // Replace: /projects/autoapply-thumb.png
        github: "https://github.com/721abhay/autoapply",
        demo: "https://autoapply-demo.vercel.app",
        date: "December 2024",
        featured: true,
        highlights: [
            "AI-powered form filling",
            "LinkedIn Easy Apply automation",
            "Real-time tracking dashboard",
            "Session persistence"
        ]
    },
    {
        id: "2",
        title: "Hand Tracking Rhythm Game",
        category: "AI/ML",
        description: "Interactive rhythm game using computer vision and hand tracking technology.",
        longDescription: "An innovative browser-based game that uses MediaPipe hand tracking to create an immersive rhythm game experience. Players use hand gestures to hit targets in sync with music.",
        tags: ["JavaScript", "MediaPipe", "WebGL", "Computer Vision"],
        image: "/placeholder.jpg", // Replace: /projects/hand-game.png
        // video: "/projects/hand-game-demo.mp4", // Add your video
        thumbnail: "/placeholder.jpg", // Replace: /projects/hand-game-thumb.png
        github: "https://github.com/721abhay/hand-tracking-game",
        demo: "https://hand-game.vercel.app",
        date: "December 2024",
        stars: 45,
        featured: true,
        highlights: [
            "Real-time hand tracking",
            "Dynamic difficulty system",
            "Achievement system",
            "Particle effects"
        ]
    },
    {
        id: "3",
        title: "Coin Circle - Expense Tracker",
        category: "Full Stack",
        description: "Modern expense tracking application with analytics and budget management.",
        longDescription: "A comprehensive personal finance management tool that helps users track expenses, set budgets, and visualize spending patterns with beautiful charts and insights.",
        tags: ["React", "Firebase", "Chart.js", "Tailwind CSS"],
        image: "/placeholder.jpg", // Replace: /projects/coin-circle.png
        github: "https://github.com/721abhay/coin-circle",
        demo: "https://coin-circle.vercel.app",
        date: "November 2024",
        stars: 32,
        highlights: [
            "Real-time expense tracking",
            "Budget analytics",
            "Category management",
            "Export to CSV"
        ]
    },
    {
        id: "4",
        title: "Database Backup Utility",
        category: "Open Source",
        description: "Automated database backup system with scheduling and cloud storage integration.",
        longDescription: "A robust backup solution for MongoDB and PostgreSQL databases with automated scheduling, compression, and cloud storage support.",
        tags: ["Python", "MongoDB", "PostgreSQL", "AWS S3"],
        image: "/placeholder.jpg", // Replace: /projects/db-backup.png
        github: "https://github.com/721abhay/db-backup-utility",
        date: "December 2024",
        highlights: [
            "Automated scheduling",
            "Multiple database support",
            "Cloud storage integration",
            "Compression & encryption"
        ]
    },
    // Add more projects here - see HOW_TO_ADD_CONTENT.md for instructions
]

export function ProjectsShowcaseSection() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)
    const [filter, setFilter] = useState<string>("all")
    const [playingVideo, setPlayingVideo] = useState<string | null>(null)

    const categories = ["all", ...Array.from(new Set(projects.map(p => p.category)))]

    const filteredProjects = filter === "all"
        ? projects
        : projects.filter(p => p.category === filter)

    return (
        <section id="projects-showcase" className="relative py-32 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(120,119,198,0.1),transparent_50%)]" />

            <div className="container relative z-10 mx-auto px-4">
                {/* Section Header */}
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6"
                        >
                            <Code2 className="w-4 h-4 text-secondary" />
                            <span className="text-sm font-medium text-secondary">Featured Work</span>
                        </motion.div>

                        <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-secondary to-foreground bg-clip-text text-transparent">
                            Project Showcase
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Explore my latest projects featuring cutting-edge technologies and innovative solutions
                        </p>
                    </div>
                </ScrollReveal>

                {/* Category Filter */}
                <ScrollReveal delay={0.1}>
                    <Tabs value={filter} onValueChange={setFilter} className="mb-12">
                        <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 lg:grid-cols-6">
                            {categories.map((category) => (
                                <TabsTrigger key={category} value={category} className="capitalize">
                                    {category}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>
                </ScrollReveal>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {filteredProjects.map((project, index) => (
                        <ScrollReveal key={project.id} delay={index * 0.1}>
                            <PremiumCard className="group overflow-hidden h-full flex flex-col">
                                {/* Project Media */}
                                <div
                                    className="relative h-64 mb-6 rounded-lg overflow-hidden bg-gradient-to-br from-secondary/20 to-secondary/5 cursor-pointer"
                                    onClick={() => setSelectedProject(project)}
                                >
                                    {project.video ? (
                                        <>
                                            {/* Video Thumbnail */}
                                            <Image
                                                src={project.thumbnail || project.image || "/placeholder.jpg"}
                                                alt={project.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            />

                                            {/* Play Button Overlay */}
                                            <div className="absolute inset-0 bg-background/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <motion.div
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center"
                                                >
                                                    <Play className="w-8 h-8 text-primary-foreground ml-1" />
                                                </motion.div>
                                            </div>
                                        </>
                                    ) : project.image ? (
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <Code2 className="w-16 h-16 text-muted-foreground/20" />
                                        </div>
                                    )}

                                    {/* Featured Badge */}
                                    {project.featured && (
                                        <div className="absolute top-3 left-3">
                                            <Badge className="bg-primary/90 backdrop-blur-sm gap-1">
                                                <Sparkles className="w-3 h-3" />
                                                Featured
                                            </Badge>
                                        </div>
                                    )}

                                    {/* Category Badge */}
                                    <div className="absolute top-3 right-3">
                                        <Badge variant="secondary" className="backdrop-blur-sm">
                                            {project.category}
                                        </Badge>
                                    </div>
                                </div>

                                {/* Project Info */}
                                <div className="flex-1 flex flex-col space-y-4">
                                    <div>
                                        <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                                            {project.title}
                                        </h3>
                                        <p className="text-muted-foreground">
                                            {project.description}
                                        </p>
                                    </div>

                                    {/* Meta Info */}
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            <span>{project.date}</span>
                                        </div>
                                        {project.stars && (
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                                                <span>{project.stars}</span>
                                            </div>
                                        )}
                                        {project.team && (
                                            <div className="flex items-center gap-1">
                                                <Users className="w-4 h-4" />
                                                <span>{project.team}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                            <Badge key={tag} variant="outline" className="text-xs">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-3 pt-4 mt-auto">
                                        {project.github && (
                                            <Button variant="outline" size="sm" asChild className="gap-2">
                                                <a href={project.github} target="_blank" rel="noopener noreferrer">
                                                    <Github className="w-4 h-4" />
                                                    Code
                                                </a>
                                            </Button>
                                        )}
                                        {project.demo && (
                                            <Button size="sm" asChild className="gap-2">
                                                <a href={project.demo} target="_blank" rel="noopener noreferrer">
                                                    <ExternalLink className="w-4 h-4" />
                                                    Live Demo
                                                </a>
                                            </Button>
                                        )}
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setSelectedProject(project)}
                                            className="gap-2 ml-auto"
                                        >
                                            View Details
                                        </Button>
                                    </div>
                                </div>
                            </PremiumCard>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Project Detail Modal */}
                <AnimatePresence>
                    {selectedProject && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
                            onClick={() => {
                                setSelectedProject(null)
                                setPlayingVideo(null)
                            }}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                transition={{ type: "spring", damping: 25 }}
                                className="relative max-w-5xl w-full max-h-[90vh] overflow-auto"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <PremiumCard className="p-8">
                                    {/* Close Button */}
                                    <button
                                        onClick={() => {
                                            setSelectedProject(null)
                                            setPlayingVideo(null)
                                        }}
                                        className="absolute top-4 right-4 p-2 rounded-full bg-background/50 hover:bg-background transition-colors z-10"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>

                                    {/* Project Media */}
                                    <div className="relative h-96 mb-6 rounded-lg overflow-hidden">
                                        {selectedProject.video && playingVideo === selectedProject.id ? (
                                            <video
                                                src={selectedProject.video}
                                                controls
                                                autoPlay
                                                className="w-full h-full object-contain"
                                            />
                                        ) : (
                                            <>
                                                <Image
                                                    src={selectedProject.thumbnail || selectedProject.image || "/placeholder.jpg"}
                                                    alt={selectedProject.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                                {selectedProject.video && (
                                                    <div className="absolute inset-0 bg-background/40 backdrop-blur-sm flex items-center justify-center">
                                                        <Button
                                                            size="lg"
                                                            onClick={() => setPlayingVideo(selectedProject.id)}
                                                            className="gap-2"
                                                        >
                                                            <Play className="w-5 h-5" />
                                                            Play Demo Video
                                                        </Button>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>

                                    {/* Project Details */}
                                    <div className="space-y-6">
                                        <div>
                                            <div className="flex items-start justify-between mb-4">
                                                <div>
                                                    <h2 className="text-3xl font-bold mb-2">{selectedProject.title}</h2>
                                                    <Badge variant="secondary">{selectedProject.category}</Badge>
                                                </div>
                                            </div>

                                            <p className="text-lg text-muted-foreground">
                                                {selectedProject.longDescription}
                                            </p>
                                        </div>

                                        {/* Highlights */}
                                        {selectedProject.highlights && selectedProject.highlights.length > 0 && (
                                            <div>
                                                <h3 className="text-xl font-semibold mb-3">Key Features</h3>
                                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                    {selectedProject.highlights.map((highlight, i) => (
                                                        <li key={i} className="flex items-center gap-2 text-muted-foreground">
                                                            <Sparkles className="w-4 h-4 text-primary flex-shrink-0" />
                                                            <span>{highlight}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {/* Technologies */}
                                        <div>
                                            <h3 className="text-xl font-semibold mb-3">Technologies Used</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedProject.tags.map((tag) => (
                                                    <Badge key={tag} variant="outline">
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Meta Info */}
                                        <div className="flex items-center gap-6 text-muted-foreground">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-5 h-5" />
                                                <span>{selectedProject.date}</span>
                                            </div>
                                            {selectedProject.stars && (
                                                <div className="flex items-center gap-2">
                                                    <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                                                    <span>{selectedProject.stars} stars</span>
                                                </div>
                                            )}
                                            {selectedProject.team && (
                                                <div className="flex items-center gap-2">
                                                    <Users className="w-5 h-5" />
                                                    <span>{selectedProject.team}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-4 pt-4">
                                            {selectedProject.github && (
                                                <Button asChild className="gap-2">
                                                    <a href={selectedProject.github} target="_blank" rel="noopener noreferrer">
                                                        <Github className="w-4 h-4" />
                                                        View on GitHub
                                                    </a>
                                                </Button>
                                            )}
                                            {selectedProject.demo && (
                                                <Button variant="outline" asChild className="gap-2">
                                                    <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer">
                                                        <ExternalLink className="w-4 h-4" />
                                                        Live Demo
                                                    </a>
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </PremiumCard>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    )
}
