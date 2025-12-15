"use client"

import { useEffect, useRef } from "react"

export function RetroGridBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let w = window.innerWidth
        let h = window.innerHeight
        canvas.width = w
        canvas.height = h

        // Configuration
        const gridSpacing = 40
        const horizonY = h * 0.4 // Horizon line height
        const speed = 1.5
        let offset = 0

        // Midnight Navy & Orange Palette
        const colors = {
            background: "#02040a", // Deep Navy/Black
            gridLines: "rgba(249, 115, 22, 0.2)", // Subtle Orange
            sunGradient: ["#fef3c7", "#fcd34d", "#f97316", "#ea580c", "#c2410c"], // Warm Amber Sun
            stars: "#ffffff"
        }

        const drawSun = () => {
            const cx = w / 2
            const cy = horizonY
            const radius = Math.min(w, h) * 0.15

            // Create Sun Gradient
            const gradient = ctx.createLinearGradient(cx, cy - radius, cx, cy + radius)
            colors.sunGradient.forEach((color, i) => {
                gradient.addColorStop(i / (colors.sunGradient.length - 1), color)
            })

            ctx.fillStyle = gradient
            ctx.beginPath()
            ctx.arc(cx, cy, radius, 0, Math.PI * 2)
            ctx.fill()

            // Sun stripes (retro style)
            for (let i = 0; i < 10; i++) {
                const y = cy + (i * radius / 5) - radius / 2
                const height = radius / 15 + i * 2
                if (y > cy + radius) break;

                ctx.fillStyle = colors.background
                ctx.fillRect(cx - radius * 1.5, y, radius * 3, height)
            }

            // Glow
            ctx.shadowBlur = 40
            ctx.shadowColor = "#f97316"
            ctx.fill()
            ctx.shadowBlur = 0
        }

        const drawGrid = () => {
            // Perspective Grid
            // Vertical lines converge to vanishing point at center horizon
            const cx = w / 2
            const cy = horizonY
            const maxDist = Math.max(w, h)

            ctx.strokeStyle = colors.gridLines
            ctx.lineWidth = 1

            // Vertical Lines
            for (let x = -w; x < w * 2; x += gridSpacing) {
                // Need perspective math or simple radiating lines
                // Radiating from (cx, cy) downwards
                const angle = Math.atan2(h - cy, x - cx)

                ctx.beginPath()
                ctx.moveTo(cx, cy)
                ctx.lineTo(x, h)
                // Only draw below horizon
                // Actually, radiating lines from vanishing point
                // Let's just draw lines from vanishing point to bottom edge
            }

            // A simpler approach for vertical lines: 
            // Iterate along bottom edge
            const numVLines = 40
            for (let i = -numVLines / 2; i <= numVLines / 2; i++) {
                const x = cx + (i * gridSpacing * 4)
                ctx.beginPath()
                ctx.moveTo(cx, cy)
                ctx.lineTo(x, h)
                ctx.stroke()
            }

            // Horizontal Lines (moving)
            // Spacing increases exponentially as we get closer to viewer
            offset = (offset + speed) % gridSpacing

            // We draw horizontal lines from horizon to bottom
            // y = horizonY + (distance)
            // distance needs to be exponential 

            for (let i = 0; i < h; i += 10) {
                // Perspective Z projection
                // z goes from near to far
                // y screen coord = cy + (cameraHeight / z)

                // Simplified:
                // Just widely spaced lines
            }

            // Let's use a standard perspective loop
            const fov = 300
            const camHeight = 150

            // Horizontal lines moving towards viewer
            // Logic: z decreases

            // Let's just animate parallel lines for now but with increasing spacing
            let z = 0.1
            while (z < 10) {
                const y = cy + (camHeight / z)
                if (y > h) break;
                if (y < cy) { z += 0.1; continue; }

                // Move z
                // Effective z for animation
                const effectiveZ = z - (offset * 0.001) // simple offset

                // Redraw with proper offset logic? 
                // Let's stick to standard 3D projection logic
                // .. omitted complex math for brevity, using simple linear interpolation for V1
            }

            // Moving Horizontal Lines
            // Calculate y positions based on a looped offset
            const totalLines = 20
            for (let i = 0; i < totalLines; i++) {
                const progress = (i + (offset / gridSpacing)) / totalLines
                // Exponential spacing: y = horizonY + (h-horizonY) * (progress^2)
                const y = horizonY + (h - horizonY) * (progress * progress)

                ctx.beginPath()
                ctx.moveTo(0, y)
                ctx.lineTo(w, y)
                ctx.stroke()
            }
        }

        const render = () => {
            ctx.fillStyle = colors.background
            ctx.fillRect(0, 0, w, h)

            // Draw Stars
            ctx.fillStyle = colors.stars
            for (let i = 0; i < 100; i++) {
                const x = (Math.sin(i * 123.45) * w + w) % w
                const y = (Math.cos(i * 67.89) * horizonY + horizonY) % horizonY
                ctx.fillRect(x, y, Math.random() * 2, Math.random() * 2)
            }

            drawSun()
            drawGrid()

            // Mountains/Terrain silhouette
            ctx.fillStyle = "#05000a"
            ctx.beginPath()
            ctx.moveTo(0, h)
            ctx.lineTo(0, horizonY)
            // generate jagged peaks
            for (let x = 0; x <= w; x += 10) {
                const noise = Math.sin(x * 0.01) * 20 + Math.cos(x * 0.02) * 10
                ctx.lineTo(x, horizonY - Math.abs(noise))
            }
            ctx.lineTo(w, horizonY)
            ctx.lineTo(w, h)
            ctx.fill()

            requestAnimationFrame(render)
        }

        const animationId = requestAnimationFrame(render)

        const handleResize = () => {
            w = window.innerWidth
            h = window.innerHeight
            canvas.width = w
            canvas.height = h
        }

        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
            cancelAnimationFrame(animationId)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
        />
    )
}
