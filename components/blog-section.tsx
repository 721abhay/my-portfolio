"use client"

import { motion } from "framer-motion"
import { ScrollReveal } from "@/components/scroll-reveal"
import { ArrowRight, BookOpen, ExternalLink, MessageSquare, Newspaper, Zap } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const articles = [
    {
        title: "The Future of AI in Web Development",
        excerpt: "How artificial intelligence is reshaping the way we build and interact with the web.",
        date: "Dec 12, 2024",
        category: "Tech Trends",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2600&auto=format&fit=crop",
        readTime: "5 min read",
        link: "#"
    },
    {
        title: "Mastering React Server Components",
        excerpt: "A deep dive into the architecture and best practices for building modern Next.js applications.",
        date: "Nov 28, 2024",
        category: "Tutorial",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2600&auto=format&fit=crop",
        readTime: "8 min read",
        link: "#"
    },
    {
        title: "Building Scalable Systems with Supabase",
        excerpt: "Lessons learned from scaling a real-time application to 100k+ users.",
        date: "Nov 15, 2024",
        category: "Case Study",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2600&auto=format&fit=crop",
        readTime: "6 min read",
        link: "#"
    }
]

export function BlogSection() {
    return (
        <section id="blog" className="container px-6 py-24 md:px-12 relative">
            <div className="absolute right-0 top-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10" />

            <ScrollReveal>
                <div className="mb-16 space-y-4 text-center md:text-left flex flex-col md:flex-row justify-between items-end gap-6">
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-wider uppercase">
                            <Newspaper className="w-3 h-3" />
                            <span>Thoughts & Insights</span>
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter md:text-5xl">
                            Latest <span className="text-gradient">Articles</span>
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-xl">
                            Sharing knowledge, tutorials, and insights on the latest technologies and industry trends.
                        </p>
                    </div>
                    <Link href="#" className="hidden md:inline-flex items-center gap-2 text-primary font-medium hover:underline underline-offset-4 group">
                        View all posts <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </ScrollReveal>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {articles.map((article, index) => (
                    <ScrollReveal key={index} delay={index * 0.1}>
                        <Link href={article.link} className="group flex flex-col h-full bg-card/40 backdrop-blur-sm border border-white/5 rounded-3xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5">
                            <div className="relative h-60 w-full overflow-hidden">
                                <Image
                                    src={article.image}
                                    alt={article.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-medium text-white">
                                        {article.category}
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col flex-1 p-6 space-y-4">
                                <div className="flex items-center gap-4 text-xs text-muted-foreground font-medium">
                                    <span className="flex items-center gap-1.5">
                                        <BookOpen className="w-3.5 h-3.5 text-primary" />
                                        {article.readTime}
                                    </span>
                                    <span>•</span>
                                    <span>{article.date}</span>
                                </div>

                                <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                                    {article.title}
                                </h3>

                                <p className="text-muted-foreground text-sm line-clamp-3 flex-1 text-pretty">
                                    {article.excerpt}
                                </p>

                                <div className="pt-4 mt-auto flex items-center text-sm font-medium text-primary group-hover:translate-x-2 transition-transform">
                                    Read Article <ExternalLink className="ml-2 w-3.5 h-3.5" />
                                </div>
                            </div>
                        </Link>
                    </ScrollReveal>
                ))}
            </div>

            <div className="mt-12 text-center md:hidden">
                <Link href="#" className="inline-flex items-center gap-2 text-primary font-medium hover:underline underline-offset-4">
                    View all posts <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </section>
    )
}
