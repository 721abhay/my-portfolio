"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface MarqueeProps {
  items: ReactNode[]
  speed?: number
  direction?: "left" | "right"
}

export function InfiniteMarquee({ items, speed = 50, direction = "left" }: MarqueeProps) {
  return (
    <div className="overflow-hidden whitespace-nowrap flex">
      <motion.div
        className="inline-flex gap-4 min-w-full"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
          duration: speed,
        }}
      >
        {items.map((item, index) => (
          <div key={`original-${index}`} className="flex-shrink-0">
            {item}
          </div>
        ))}
        {items.map((item, index) => (
          <div key={`duplicate-${index}`} className="flex-shrink-0">
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
