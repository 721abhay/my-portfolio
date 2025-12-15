"use client"

import { useEffect, useRef } from "react"

export function NoiseGradientBackground() {
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

        let time = 0

        // Thermal Brutalism Palette
        // Maroon, Gold, Deep Red, Void
        const colors = [
            [74, 4, 4],    // Maroon
            [255, 215, 0], // Gold
            [139, 0, 0],   // Deep Red
            [20, 0, 0]     // Dark Void
        ]

        const noise = (x: number, y: number, z: number) => {
            // Simple pseudo-noise for distinct, shifting bands
            return Math.sin(x * 0.002 + z) * Math.cos(y * 0.002 + z) * Math.sin(x * y * 0.00001 + z)
        }

        const render = () => {
            ctx.fillStyle = "#000000"
            ctx.fillRect(0, 0, w, h)

            const gradient = ctx.createLinearGradient(0, 0, w, h)

            // Dynamic stops based on sine waves
            const t = time * 0.0005

            const p1 = 0.5 + Math.sin(t) * 0.3
            const p2 = 0.5 + Math.cos(t * 1.5) * 0.3
            const p3 = 0.5 + Math.sin(t * 0.7 + 2) * 0.3

            gradient.addColorStop(0, `rgb(${colors[3].join(',')})`)
            gradient.addColorStop(Math.abs(p1 % 1), `rgb(${colors[0].join(',')})`)
            gradient.addColorStop(Math.abs(p2 % 1), `rgb(${colors[2].join(',')})`)
            gradient.addColorStop(Math.abs(p3 % 1), `rgb(${colors[1].join(',')})`)
            gradient.addColorStop(1, `rgb(${colors[3].join(',')})`)

            ctx.fillStyle = gradient
            ctx.fillRect(0, 0, w, h)

            // Add Noise Overlay
            const imageData = ctx.getImageData(0, 0, w, h)
            const data = imageData.data
            for (let i = 0; i < data.length; i += 4) {
                const noiseVal = (Math.random() - 0.5) * 20
                data[i] = data[i] + noiseVal
                data[i + 1] = data[i + 1] + noiseVal
                data[i + 2] = data[i + 2] + noiseVal
            }
            ctx.putImageData(imageData, 0, 0)

            time++
            requestAnimationFrame(render)
        }

        const animation = requestAnimationFrame(render)

        const handleResize = () => {
            w = window.innerWidth
            h = window.innerHeight
            canvas.width = w
            canvas.height = h
        }

        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
            cancelAnimationFrame(animation)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none opacity-60 mix-blend-hard-light"
        />
    )
}
