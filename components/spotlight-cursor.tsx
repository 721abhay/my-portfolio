"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function SpotlightCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY })
            setIsVisible(true)
        }

        const handleMouseLeave = () => setIsVisible(false)

        window.addEventListener("mousemove", updateMousePosition)
        document.addEventListener("mouseleave", handleMouseLeave)

        return () => {
            window.removeEventListener("mousemove", updateMousePosition)
            document.removeEventListener("mouseleave", handleMouseLeave)
        }
    }, [])

    if (!isVisible) return null

    return (
        <>
            {/* Main spotlight */}
            <motion.div
                className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300"
                style={{
                    background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15), transparent 40%)`,
                }}
            />

            {/* Secondary glow */}
            <motion.div
                className="pointer-events-none fixed inset-0 z-50"
                style={{
                    background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(236, 72, 153, 0.1), transparent 40%)`,
                }}
            />

            {/* Cursor dot */}
            <motion.div
                className="pointer-events-none fixed z-50 h-4 w-4 rounded-full bg-primary/50 blur-sm"
                animate={{
                    x: mousePosition.x - 8,
                    y: mousePosition.y - 8,
                }}
                transition={{ type: "spring", damping: 30, stiffness: 200 }}
            />
        </>
    )
}
