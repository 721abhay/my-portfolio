"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Code2, Smartphone, Palette, Zap, Database, Sparkles, ArrowRight } from "lucide-react"
import { PremiumCard } from "@/components/premium-card"
import { MagneticButton } from "@/components/magnetic-button"
import { useRef } from "react"
import Link from "next/link"

const services = [
    {
        icon: Code2,
        title: "Web Development",
        description: "Architecting scalable, high-performance web applications with next-generation frameworks.",
        gradient: "from-orange-500 to-amber-500",
        glow: "primary",
        className: "md:col-span-2",
        features: ["React & Next.js Ecosystem", "Advanced TypeScript Patterns", "WebGL & 3D Integration", "Micro-frontend Architecture"],
    },
    {
        icon: Smartphone,
        title: "Mobile Experience",
        description: "Crafting fluid, native-like mobile experiences that feel tangible.",
        gradient: "from-blue-500 to-cyan-500",
        glow: "accent",
        className: "md:col-span-1",
        features: ["Cross-Platform Flutter/RN", "Swift & Kotlin Native", "Offline-First Architecture", "Biometric Security"],
    },
    {
        icon: Database,
        title: "System Architecture",
        description: "Designing robust, fault-tolerant backend systems.",
        gradient: "from-slate-500 to-gray-500",
        glow: "accent",
        className: "md:col-span-1",
        features: ["Distributed Systems", "Serverless & Edge Computing", "Real-time Event Streaming", "GraphQL Federation"],
    },
    {
        icon: Sparkles,
        title: "AI Engineering",
        description: "Integrating state-of-the-art LLMs and neural networks to create intelligent applications.",
        gradient: "from-rose-500 to-orange-500",
        glow: "gold",
        className: "md:col-span-2",
        features: ["LLM Integration (GPT/Claude)", "Vector Database Search", "Autonomous Agents", "Predictive Analytics"],
    },
    {
        icon: Palette,
        title: "Creative Design",
        description: "Pushing the boundaries of UI/UX with motion, depth, and immersive interactions.",
        gradient: "from-purple-500 to-pink-500",
        glow: "rose",
        className: "md:col-span-2",
        features: ["Design Systems", "Motion Choreography", "3D Modeling (Spline/Three.js)", "Accessibility First"],
    },
    {
        icon: Zap,
        title: "Performance",
        description: "Obsessive optimization for lightning-fast load times.",
        gradient: "from-emerald-500 to-green-500",
        glow: "emerald",
        className: "md:col-span-1",
        features: ["Core Web Vitals", "Bundle Size Optimization", "Server-Side Rendering", "WASM Acceleration"],
    },
]

export function ServicesSection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    })

    const y = useTransform(scrollYProgress, [0, 1], [100, -100])

    return (
        <section ref={containerRef} id="services" className="relative container px-6 py-32 md:px-12 overflow-hidden">
            {/* Parallax Background Elements */}
            <motion.div style={{ y }} className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] mix-blend-screen" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px] mix-blend-screen" />
            </motion.div>

            <ScrollReveal>
                <div className="mb-24 text-center space-y-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md text-primary font-medium text-sm tracking-wide"
                    >
                        <Sparkles className="w-4 h-4" />
                        <span>WORLD-CLASS EXPERTISE</span>
                    </motion.div>

                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
                        Engineering <br />
                        <span className="text-gradient">Digital Excellence</span>
                    </h2>

                    <p className="text-muted-foreground max-w-2xl mx-auto text-xl font-light leading-relaxed">
                        I don't just build websites; I craft immersive digital ecosystems that define the future of interaction.
                    </p>
                </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                {services.map((service, index) => {
                    const Icon = service.icon
                    return (
                        <div key={index} className={service.className}>
                            <ScrollReveal delay={index * 0.1} className="h-full">
                                <PremiumCard glowColor={service.glow} className="h-full">
                                    <div className="space-y-6 h-full flex flex-col">
                                        {/* Icon Housing */}
                                        <div className="relative inline-block">
                                            <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
                                            <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} p-[1px]`}>
                                                <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center">
                                                    <Icon className="w-8 h-8 text-foreground" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="space-y-4 flex-grow">
                                            <h3 className="text-2xl font-bold group-hover:text-primary transition-colors duration-300">
                                                {service.title}
                                            </h3>
                                            <p className="text-muted-foreground leading-relaxed">
                                                {service.description}
                                            </p>
                                        </div>

                                        {/* Feature List */}
                                        <div className="pt-4 space-y-3 border-t border-border/50">
                                            {service.features.map((feature, idx) => (
                                                <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground/80 group-hover:text-foreground transition-colors">
                                                    <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient}`} />
                                                    {feature}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </PremiumCard>
                            </ScrollReveal>
                        </div>
                    )
                })}
            </div>

            {/* Premium CTA */}
            <div className="mt-32 flex justify-center relative z-10">
                <ScrollReveal delay={0.4}>
                    <Link href="#contact">
                        <MagneticButton strength={0.4} className="group relative inline-flex h-16 items-center justify-center overflow-hidden rounded-full bg-primary px-10 font-medium text-primary-foreground shadow-2xl transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out" />
                            <span className="flex items-center gap-3 text-lg">
                                Start Your Transformation <ArrowRight className="h-5 w-5" />
                            </span>
                        </MagneticButton>
                    </Link>
                </ScrollReveal>
            </div>
        </section>
    )
}
