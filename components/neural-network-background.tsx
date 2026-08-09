"use client"

import { useEffect, useRef } from "react"

export function NeuralNetworkBackground() {
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

        const particles: Particle[] = []
        const particleCount = 100 // Adjust for density
        const connectionDistance = 150
        const mouseDistance = 200

        let mouse = { x: -1000, y: -1000 }

        class Particle {
            x: number
            y: number
            vx: number
            vy: number
            size: number
            color: string

            constructor() {
                this.x = Math.random() * w
                this.y = Math.random() * h
                this.vx = (Math.random() - 0.5) * 0.5
                this.vy = (Math.random() - 0.5) * 0.5
                this.size = Math.random() * 2 + 1
                // Gold / Amber shades
                this.color = `rgba(232, 180, 84, ${Math.random() * 0.5 + 0.5})`
            }

            update() {
                this.x += this.vx
                this.y += this.vy

                // Bounce off edges
                if (this.x < 0 || this.x > w) this.vx *= -1
                if (this.y < 0 || this.y > h) this.vy *= -1

                // Mouse interaction
                const dx = mouse.x - this.x
                const dy = mouse.y - this.y
                const distance = Math.sqrt(dx * dx + dy * dy)

                if (distance < mouseDistance) {
                    const forceDirectionX = dx / distance
                    const forceDirectionY = dy / distance
                    const force = (mouseDistance - distance) / mouseDistance
                    const directionX = forceDirectionX * force * 0.6
                    const directionY = forceDirectionY * force * 0.6
                    this.vx += directionX
                    this.vy += directionY
                }
            }

            draw() {
                if (!ctx) return
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx.fillStyle = this.color
                ctx.fill()
            }
        }

        const init = () => {
            particles.length = 0
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle())
            }
        }

        const animate = () => {
            if (!ctx) return
            // Deep Maroon/Void Background
            ctx.fillStyle = "#050000"
            ctx.fillRect(0, 0, w, h)

            // subtle gradient overlay
            const gradient = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w);
            gradient.addColorStop(0, "rgba(74, 4, 4, 0.2)"); // Center Maroon glow
            gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, w, h);

            particles.forEach(particle => {
                particle.update()
                particle.draw()
            })

            // Draw connections
            ctx.strokeStyle = "rgba(232, 180, 84, 0.15)" // Gold lines
            ctx.lineWidth = 0.5

            for (let i = 0; i < particles.length; i++) {
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x
                    const dy = particles[i].y - particles[j].y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < connectionDistance) {
                        ctx.beginPath()
                        ctx.strokeStyle = `rgba(232, 180, 84, ${1 - distance / connectionDistance})`
                        ctx.moveTo(particles[i].x, particles[i].y)
                        ctx.lineTo(particles[j].x, particles[j].y)
                        ctx.stroke()
                    }
                }
            }

            requestAnimationFrame(animate)
        }

        init()
        const animationId = requestAnimationFrame(animate)

        const handleResize = () => {
            w = window.innerWidth
            h = window.innerHeight
            canvas.width = w
            canvas.height = h
            init()
        }

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX
            mouse.y = e.clientY
        }

        window.addEventListener("resize", handleResize)
        window.addEventListener("mousemove", handleMouseMove)

        return () => {
            window.removeEventListener("resize", handleResize)
            window.removeEventListener("mousemove", handleMouseMove)
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
