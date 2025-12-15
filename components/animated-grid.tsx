"use client"

import { motion } from "framer-motion"

export function AnimatedGrid() {
    return (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-20">
            {/* Horizontal lines */}
            {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                    key={`h-${i}`}
                    className="absolute h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent"
                    style={{ top: `${i * 5}%` }}
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 0.3 }}
                    transition={{
                        duration: 2,
                        delay: i * 0.1,
                        repeat: Infinity,
                        repeatType: "reverse",
                        repeatDelay: 1,
                    }}
                />
            ))}

            {/* Vertical lines */}
            {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                    key={`v-${i}`}
                    className="absolute w-px h-full bg-gradient-to-b from-transparent via-purple-500 to-transparent"
                    style={{ left: `${i * 5}%` }}
                    initial={{ scaleY: 0, opacity: 0 }}
                    animate={{ scaleY: 1, opacity: 0.3 }}
                    transition={{
                        duration: 2,
                        delay: i * 0.1,
                        repeat: Infinity,
                        repeatType: "reverse",
                        repeatDelay: 1,
                    }}
                />
            ))}

            {/* Animated dots at intersections */}
            {Array.from({ length: 100 }).map((_, i) => {
                const row = Math.floor(i / 10)
                const col = i % 10
                return (
                    <motion.div
                        key={`dot-${i}`}
                        className="absolute w-1 h-1 rounded-full bg-primary"
                        style={{
                            top: `${row * 10}%`,
                            left: `${col * 10}%`,
                        }}
                        animate={{
                            scale: [0, 1.5, 0],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: 3,
                            delay: i * 0.05,
                            repeat: Infinity,
                            repeatDelay: 2,
                        }}
                    />
                )
            })}
        </div>
    )
}
