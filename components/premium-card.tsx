"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ReactNode, useRef } from "react"

interface PremiumCardProps {
    children: ReactNode
    className?: string
    glowColor?: string
}

export function PremiumCard({ children, className = "", glowColor = "primary", contentClassName = "p-8" }: PremiumCardProps & { contentClassName?: string }) {
    const ref = useRef<HTMLDivElement>(null)

    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseXSpring = useSpring(x)
    const mouseYSpring = useSpring(y)

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"])
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return

        const rect = ref.current.getBoundingClientRect()
        const width = rect.width
        const height = rect.height
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top

        const xPct = mouseX / width - 0.5
        const yPct = mouseY / height - 0.5

        x.set(xPct)
        y.set(yPct)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    const glowColors = {
        primary: "rgba(249, 115, 22, 0.4)", // Orange
        accent: "rgba(15, 23, 42, 0.4)", // Navy
        gold: "rgba(251, 146, 60, 0.4)", // Amber
        rose: "rgba(255, 255, 255, 0.2)", // White/Silver
        emerald: "rgba(20, 184, 166, 0.4)", // Teal
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
            }}
            whileHover={{ scale: 1.02 }}
            className={`relative group ${className}`}
        >
            {/* Animated gradient border */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-accent to-primary rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500 animate-gradient-shift" style={{ backgroundSize: "200% 200%" }} />

            {/* Glow effect */}
            <motion.div
                className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
                style={{
                    background: `radial-gradient(circle at ${useTransform(
                        mouseXSpring,
                        [-0.5, 0.5],
                        ["0%", "100%"]
                    )} ${useTransform(
                        mouseYSpring,
                        [-0.5, 0.5],
                        ["0%", "100%"]
                    )}, ${glowColors[glowColor as keyof typeof glowColors]} 0%, transparent 70%)`,
                }}
            />

            {/* Card content */}
            <div
                className="relative glass-card-premium rounded-2xl overflow-hidden h-full"
                style={{
                    transform: "translateZ(50px)",
                    transformStyle: "preserve-3d",
                }}
            >
                {/* Shimmer overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="shimmer absolute inset-0" />
                </div>

                {/* Spotlight effect */}
                <motion.div
                    className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                        background: `radial-gradient(600px circle at ${useTransform(
                            mouseXSpring,
                            [-0.5, 0.5],
                            ["0%", "100%"]
                        )} ${useTransform(
                            mouseYSpring,
                            [-0.5, 0.5],
                            ["0%", "100%"]
                        )}, rgba(255,255,255,0.1) 0%, transparent 40%)`,
                    }}
                />

                {/* Content */}
                <div className={`relative z-10 h-full ${contentClassName}`}>
                    {children}
                </div>

                {/* Bottom gradient accent */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
        </motion.div>
    )
}
