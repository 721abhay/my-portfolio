"use client"

import { motion } from "framer-motion"

export function BeamEffect() {
    return (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
            {/* Vertical beams */}
            {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                    key={`beam-${i}`}
                    className="absolute w-px h-full bg-gradient-to-b from-transparent via-[#f97316] to-transparent opacity-20"
                    style={{ left: `${(i + 1) * 12}%` }}
                    initial={{ scaleY: 0, opacity: 0 }}
                    animate={{
                        scaleY: [0, 1, 0],
                        opacity: [0, 0.5, 0],
                        y: ["-100%", "0%", "100%"],
                    }}
                    transition={{
                        duration: 3,
                        delay: i * 0.3,
                        repeat: Infinity,
                        repeatDelay: 2,
                        ease: "easeInOut",
                    }}
                />
            ))}

            {/* Diagonal beams */}
            {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                    key={`diag-${i}`}
                    className="absolute w-full h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-10"
                    style={{
                        top: `${20 + i * 15}%`,
                        transform: "rotate(-45deg)",
                        transformOrigin: "center",
                    }}
                    animate={{
                        scaleX: [0, 1.5, 0],
                        opacity: [0, 0.3, 0],
                    }}
                    transition={{
                        duration: 4,
                        delay: i * 0.5,
                        repeat: Infinity,
                        repeatDelay: 3,
                    }}
                />
            ))}

            {/* Radial beams from center */}
            {Array.from({ length: 12 }).map((_, i) => {
                const angle = (i * 360) / 12
                return (
                    <motion.div
                        key={`radial-${i}`}
                        className="absolute top-1/2 left-1/2 w-1 h-96 bg-gradient-to-t from-[#f97316]/30 to-transparent origin-bottom"
                        style={{
                            transform: `rotate(${angle}deg)`,
                        }}
                        animate={{
                            scaleY: [0, 1, 0],
                            opacity: [0, 0.4, 0],
                        }}
                        transition={{
                            duration: 2,
                            delay: i * 0.1,
                            repeat: Infinity,
                            repeatDelay: 4,
                        }}
                    />
                )
            })}
        </div>
    )
}
