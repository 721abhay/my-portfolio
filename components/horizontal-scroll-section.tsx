"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"

const projects = [
    {
        title: "COIN CIRCLE",
        category: "FinTech Mobile App",
        image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=1974&auto=format&fit=crop",
        href: "#",
    },
    {
        title: "ANDROID ECOSYSTEM",
        category: "Native Architecture",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop",
        href: "#",
    },
    {
        title: "CAMPUS CONNECT",
        category: "Web Platform",
        image: "/images/campus-connect.png",
        href: "#",
    },
    {
        title: "AI LAB PARTNER",
        category: "EdTech Innovation",
        image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2070&auto=format&fit=crop",
        href: "https://devpost.com/software/lab-partner-ai-assistant",
    }
]

export function HorizontalScrollSection() {
    const targetRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"]
    })

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-75%"])

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-background">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <motion.div style={{ x }} className="flex gap-16 px-16">
                    <div className="flex flex-col justify-center min-w-[30vw]">
                        <h2 className="text-8xl font-bebas text-primary leading-none">
                            FEATURED <br />
                            <span className="text-foreground/20">WORKS</span>
                        </h2>
                        <p className="mt-8 text-xl text-muted-foreground max-w-sm">
                            A curated selection of projects pushing the boundaries of web and mobile technology.
                        </p>
                    </div>

                    {projects.map((project, i) => (
                        <Link key={i} href={project.href} className="group relative h-[60vh] w-[40vw] overflow-hidden bg-card rounded-3xl border border-white/10 grayscale hover:grayscale-0 transition-all duration-500 hover:scale-[1.02]">
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                                <span className="text-primary font-mono text-sm tracking-wider mb-2">{project.category}</span>
                                <h3 className="text-white font-bebas text-5xl">{project.title}</h3>
                            </div>
                        </Link>
                    ))}

                    {/* End Card */}
                    <div className="flex flex-col justify-center min-w-[30vw] pl-16">
                        <h3 className="text-6xl font-bebas text-primary/50">
                            AND MANY MORE...
                        </h3>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
