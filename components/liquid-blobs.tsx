"use client"

import { motion } from "framer-motion"

export function LiquidBlobs() {
    const blobs = [
        {
            size: "w-96 h-96",
            color: "bg-orange-400/20",
            position: "top-0 -left-48",
            delay: 0,
        },
        {
            size: "w-[500px] h-[500px]",
            color: "bg-slate-800/20",
            position: "top-1/4 -right-64",
            delay: 1,
        },
        {
            size: "w-80 h-80",
            color: "bg-orange-600/20",
            position: "bottom-0 left-1/4",
            delay: 2,
        },
        {
            size: "w-96 h-96",
            color: "bg-amber-400/15",
            position: "bottom-1/4 right-0",
            delay: 1.5,
        },
    ]

    return (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
            {blobs.map((blob, index) => (
                <motion.div
                    key={index}
                    className={`absolute ${blob.size} ${blob.color} ${blob.position} rounded-full blur-3xl`}
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, 50, 0],
                        y: [0, 30, 0],
                        rotate: [0, 90, 0],
                    }}
                    transition={{
                        duration: 20,
                        delay: blob.delay,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                    }}
                />
            ))}

            {/* Additional morphing blobs */}
            {Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                    key={`morph-${i}`}
                    className="absolute w-64 h-64 rounded-full blur-2xl"
                    style={{
                        background: `radial-gradient(circle, rgba(249, 115, 22, 0.15) 0%, transparent 70%)`,
                        top: `${30 + i * 20}%`,
                        left: `${20 + i * 30}%`,
                    }}
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 0.6, 0.3],
                        borderRadius: ["50%", "40%", "50%"],
                    }}
                    transition={{
                        duration: 8,
                        delay: i * 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    )
}
