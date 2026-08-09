"use client"

import { motion, useInView, useMotionValue, useSpring } from "framer-motion"
import { useEffect, useRef } from "react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Code2, Coffee, Rocket, Users, Trophy, Star } from "lucide-react"

const stats = [
    {
        icon: Code2,
        value: 50,
        suffix: "+",
        label: "Projects Delivered",
        description: "From concept to production-ready applications",
        color: "rgb(249, 115, 22)", // orange
        gradient: "from-orange-500 to-red-600"
    },
    {
        icon: Users,
        value: 120,
        suffix: "+",
        label: "Happy Clients & Peers",
        description: "Collaborations across 5+ countries representing diverse industries",
        color: "rgb(245, 158, 11)", // amber
        gradient: "from-amber-500 to-orange-500"
    },
    {
        icon: Rocket,
        value: 1500,
        suffix: "+",
        label: "Commits Pushed",
        description: "Consistent contribution to open source and private repositories",
        color: "rgb(234, 88, 12)", // dark orange
        gradient: "from-orange-600 to-amber-700"
    },
    {
        icon: Star,
        value: 5,
        suffix: "yrs",
        label: "Years Experience",
        description: "Continuous learning and improved technological mastery",
        color: "rgb(250, 204, 21)", // yellow
        gradient: "from-yellow-500 to-amber-500"
    },
]

function Counter({ value, suffix }: { value: number; suffix: string }) {
    const ref = useRef<HTMLSpanElement>(null)
    const motionValue = useMotionValue(0)
    const springValue = useSpring(motionValue, { duration: 2500, bounce: 0.1 })
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    useEffect(() => {
        if (isInView) {
            motionValue.set(value)
        }
    }, [motionValue, isInView, value])

    useEffect(() => {
        springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = Math.floor(latest).toLocaleString() + suffix
            }
        })
    }, [springValue, suffix])

    return <span ref={ref} />
}

export function StatsSection() {
    return (
        <section className="container px-6 py-24 md:px-12">
            <ScrollReveal>
                <div className="relative overflow-hidden rounded-[2.5rem] bg-card/30 border border-white/10 backdrop-blur-2xl shadow-2xl">
                    {/* Dynamic Ambient Glow */}
                    <div className="absolute inset-0 z-0">
                        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] animate-pulse mix-blend-screen" />
                        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[100px] animate-pulse delay-1000 mix-blend-screen" />
                    </div>

                    <div className="relative z-10 p-12 md:p-20">
                        <div className="text-center mb-16 space-y-6">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-foreground font-medium text-sm tracking-wide backdrop-blur-md"
                            >
                                <Trophy className="w-4 h-4 text-primary" />
                                <span>MILESTONES REACHED</span>
                            </motion.div>

                            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground">
                                Impact by the <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500">Numbers</span>
                            </h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto text-xl font-light">
                                A quantitative look at the passion and dedication poured into every line of code.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {stats.map((stat, index) => {
                                const Icon = stat.icon
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1, duration: 0.5 }}
                                        viewport={{ once: true }}
                                        whileHover={{ y: -5 }}
                                        className="relative group"
                                    >
                                        <div className="relative h-full overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-8 hover:bg-white/10 transition-colors duration-500">
                                            {/* Top Line Gradient */}
                                            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />

                                            <div className="flex flex-col items-center text-center space-y-4">
                                                <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.gradient} shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
                                                    <Icon className="h-6 w-6 text-white" />
                                                </div>

                                                <div className="space-y-2">
                                                    <div
                                                        className="text-4xl md:text-5xl font-bold tracking-tight text-foreground"
                                                    >
                                                        <Counter value={stat.value} suffix={stat.suffix} />
                                                    </div>
                                                    <h3 className="text-lg font-semibold text-foreground/90">{stat.label}</h3>
                                                </div>

                                                <p className="text-sm text-muted-foreground leading-relaxed font-light">
                                                    {stat.description}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Glass sheen effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                </div>
            </ScrollReveal>
        </section>
    )
}
