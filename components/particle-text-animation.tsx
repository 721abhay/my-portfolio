"use client"

import { useEffect, useRef } from "react"

interface Particle {
  originalX: number
  originalY: number
  currentX: number
  currentY: number
  size: number
}

export function ParticleTextAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const devicePixelRatio = window.devicePixelRatio || 1
    canvas.width = window.innerWidth * devicePixelRatio
    canvas.height = window.innerHeight * devicePixelRatio
    ctx.scale(devicePixelRatio, devicePixelRatio)

    const width = window.innerWidth
    const height = window.innerHeight
    const fontSize = Math.min(width * 0.14, 140)
    const particleSize = 4
    const sphereRadius = 80

    const createTextParticles = () => {
      const tempCanvas = document.createElement("canvas")
      tempCanvas.width = width
      tempCanvas.height = height
      const tempCtx = tempCanvas.getContext("2d")
      if (!tempCtx) return []

      tempCtx.font = `bold ${fontSize}px 'Bebas Neue', sans-serif`
      tempCtx.textAlign = "center"
      tempCtx.textBaseline = "middle"
      tempCtx.fillStyle = "#00FFFF"

      const text = "ABHAY"
      tempCtx.fillText(text, width / 2, height / 2)

      const imageData = tempCtx.getImageData(0, 0, width, height)
      const data = imageData.data
      const particles: Particle[] = []

      // Sample every Nth pixel to create uniform grid of particles
      const step = 6
      for (let i = 0; i < data.length; i += 4 * step) {
        if (data[i + 3] > 200) {
          const pixelIndex = i / 4
          const x = pixelIndex % width
          const y = Math.floor(pixelIndex / width)

          particles.push({
            originalX: x,
            originalY: y,
            currentX: x,
            currentY: y,
            size: particleSize,
          })
        }
      }

      return particles
    }

    const particles = createTextParticles()
    particlesRef.current = particles

    let phaseTime = 0
    const collapseTime = 2000
    const holdTime = 800
    const expandTime = 2000
    const totalCycle = collapseTime + holdTime + expandTime

    const animate = () => {
      ctx.fillStyle = "#000000"
      ctx.fillRect(0, 0, width, height)

      phaseTime += 16
      const cycleTime = phaseTime % totalCycle
      const centerX = width / 2
      const centerY = height / 2

      if (cycleTime < collapseTime) {
        const progress = cycleTime / collapseTime
        const easeProgress = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress

        particles.forEach((p) => {
          const angle = Math.atan2(p.originalY - centerY, p.originalX - centerX)
          const originalDistance = Math.sqrt(Math.pow(p.originalX - centerX, 2) + Math.pow(p.originalY - centerY, 2))

          const targetDistance = sphereRadius
          const currentDistance = originalDistance * (1 - easeProgress) + targetDistance * easeProgress

          p.currentX = centerX + Math.cos(angle) * currentDistance
          p.currentY = centerY + Math.sin(angle) * currentDistance
        })
      } else if (cycleTime < collapseTime + holdTime) {
        particles.forEach((p) => {
          const angle = Math.atan2(p.originalY - centerY, p.originalX - centerX)
          p.currentX = centerX + Math.cos(angle) * sphereRadius
          p.currentY = centerY + Math.sin(angle) * sphereRadius
        })
      } else {
        const expandProgress = (cycleTime - collapseTime - holdTime) / expandTime
        const easeProgress =
          expandProgress < 0.5 ? 2 * expandProgress * expandProgress : -1 + (4 - 2 * expandProgress) * expandProgress

        particles.forEach((p) => {
          const angle = Math.atan2(p.originalY - centerY, p.originalX - centerX)
          const originalDistance = Math.sqrt(Math.pow(p.originalX - centerX, 2) + Math.pow(p.originalY - centerY, 2))

          const currentDistance = sphereRadius + (originalDistance - sphereRadius) * easeProgress

          p.currentX = centerX + Math.cos(angle) * currentDistance
          p.currentY = centerY + Math.sin(angle) * currentDistance
        })
      }

      ctx.fillStyle = "#00FFFF"
      ctx.globalCompositeOperation = "lighter"

      particles.forEach((p) => {
        ctx.fillRect(p.currentX - particleSize / 2, p.currentY - particleSize / 2, particleSize, particleSize)
      })

      ctx.globalCompositeOperation = "source-over"

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 z-30" />
}
