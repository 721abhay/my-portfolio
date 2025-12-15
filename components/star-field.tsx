"use client"

import { useEffect, useRef } from "react"

export function StarField() {
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

        const stars: Star[] = []
        const numStars = 800
        const speed = 0.5

        class Star {
            x: number
            y: number
            z: number
            size: number
            color: string

            constructor() {
                this.x = Math.random() * w - w / 2
                this.y = Math.random() * h - h / 2
                this.z = Math.random() * w
                this.size = Math.random() * 2

                // Cosmic Palette: Cyan, White, Indigo, Purple
                const colors = ["#ffffff", "#22d3ee", "#a78bfa", "#818cf8"]
                this.color = colors[Math.floor(Math.random() * colors.length)]
            }

            update() {
                this.z -= speed
                if (this.z <= 0) {
                    this.z = w
                    this.x = Math.random() * w - w / 2
                    this.y = Math.random() * h - h / 2
                }
            }

            draw() {
                if (!ctx) return

                const sx = (this.x / this.z) * w + w / 2
                const sy = (this.y / this.z) * w + h / 2

                const r = (1 - this.z / w) * this.size * 2

                if (sx < 0 || sx > w || sy < 0 || sy > h) return

                ctx.beginPath()
                ctx.arc(sx, sy, r, 0, Math.PI * 2)
                ctx.fillStyle = this.color

                // Glow effect
                ctx.shadowBlur = 10
                ctx.shadowColor = this.color

                ctx.fill()
                ctx.shadowBlur = 0
            }
        }

        const init = () => {
            for (let i = 0; i < numStars; i++) {
                stars.push(new Star())
            }
        }

        const animate = () => {
            if (!ctx) return

            // Deep Space background with trail effect
            ctx.fillStyle = "rgba(2, 6, 23, 0.3)"
            ctx.fillRect(0, 0, w, h)

            stars.forEach(star => {
                star.update()
                star.draw()
            })

            requestAnimationFrame(animate)
        }

        init()
        const animationId = requestAnimationFrame(animate)

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
