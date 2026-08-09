"use client"

import { useEffect, useState, useRef } from "react"

export function MouseSpotlight() {
  const [pos, setPos] = useState({ x: -9999, y: -9999 })
  const [visible, setVisible] = useState(false)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    let targetX = -9999, targetY = -9999
    let currentX = -9999, currentY = -9999

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX
      targetY = e.clientY
      setVisible(true)
    }
    const onLeave = () => setVisible(false)

    // Smooth lerp follow
    const loop = () => {
      currentX += (targetX - currentX) * 0.08
      currentY += (targetY - currentY) * 0.08
      setPos({ x: currentX, y: currentY })
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)

    window.addEventListener("mousemove", onMove)
    document.addEventListener("mouseleave", onLeave)
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseleave", onLeave)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-500"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {/* Wide outer glow */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(700px circle at ${pos.x}px ${pos.y}px, rgba(204,0,0,0.06), transparent 60%)`,
        }}
      />
      {/* Tight inner glow */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(200px circle at ${pos.x}px ${pos.y}px, rgba(204,0,0,0.12), transparent 70%)`,
        }}
      />
    </div>
  )
}
