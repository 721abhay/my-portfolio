"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function BackgroundBlobs() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-background" />

      {/* Blob 1 - Purple/Cyan */}
      <motion.div
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -50, 20, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        className="absolute -top-[10%] -left-[10%] w-[40vw] h-[40vw] rounded-full mix-blend-multiply filter blur-[100px] opacity-40 bg-gradient-to-r from-purple-600 to-cyan-500 animate-blob"
      />

      {/* Blob 2 - Pink/Orange */}
      <motion.div
        animate={{
          x: [0, -30, 20, 0],
          y: [0, 50, -20, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        className="absolute top-[20%] -right-[10%] w-[35vw] h-[35vw] rounded-full mix-blend-multiply filter blur-[100px] opacity-40 bg-gradient-to-r from-pink-500 to-orange-400 animate-blob animation-delay-2000"
      />

      {/* Blob 3 - Emerald/Blue - Interactive with subtle mouse movement */}
      <motion.div
        animate={{
          x: mousePosition.x * 0.02,
          y: mousePosition.y * 0.02,
        }}
        className="absolute bottom-[10%] left-[20%] w-[45vw] h-[45vw] rounded-full mix-blend-multiply filter blur-[100px] opacity-30 bg-gradient-to-r from-emerald-500 to-blue-600 transition-transform duration-1000 ease-out"
      />

      {/* Blob 4 - Rose/Purple */}
      <motion.div
        animate={{
          x: [0, 40, -40, 0],
          y: [0, -40, 40, 0],
        }}
        transition={{
          duration: 30,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        className="absolute -bottom-[10%] -right-[5%] w-[50vw] h-[50vw] rounded-full mix-blend-multiply filter blur-[100px] opacity-30 bg-gradient-to-r from-rose-500 to-purple-600"
      />
    </div>
  )
}
