"use client"

import { motion } from "framer-motion"

export function AuroraBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#02040a] [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#f97316_100%)] opacity-50" />

      <motion.div
        initial={{ opacity: 0.3 }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute -top-[20%] -left-[10%] h-[60vh] w-[60vw] rounded-full bg-orange-500/20 blur-[120px] mix-blend-screen"
      />

      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute top-[10%] right-[10%] h-[50vh] w-[50vw] rounded-full bg-amber-500/20 blur-[100px] mix-blend-screen"
      />

      <motion.div
        animate={{
          x: [0, -30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute bottom-[10%] left-[20%] h-[40vh] w-[40vw] rounded-full bg-blue-900/20 blur-[110px] mix-blend-screen"
      />
    </div>
  )
}
