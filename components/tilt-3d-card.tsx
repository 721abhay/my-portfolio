"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ReactNode, useRef } from "react"

interface Tilt3DCardProps {
    children: ReactNode
    className?: string
}

export function Tilt3DCard({ children, className = "" }: Tilt3DCardProps) {
    const ref = useRef<HTMLDivElement>(null)

    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseXSpring = useSpring(x)
    const mouseYSpring = useSpring(y)

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"])
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"])

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
            className={`relative ${className}`}
        >
            <div
                style={{
                    transform: "translateZ(75px)",
                    transformStyle: "preserve-3d",
                }}
            >
                {children}
            </div>

            {/* Shine effect */}
            <motion.div
                className="pointer-events-none absolute inset-0 rounded-2xl"
                style={{
                    background: `radial-gradient(circle at ${useTransform(
                        mouseXSpring,
                        [-0.5, 0.5],
                        ["0%", "100%"]
                    )} ${useTransform(
                        mouseYSpring,
                        [-0.5, 0.5],
                        ["0%", "100%"]
                    )}, rgba(255,255,255,0.2) 0%, transparent 50%)`,
                }}
            />
        </motion.div>
    )
}
