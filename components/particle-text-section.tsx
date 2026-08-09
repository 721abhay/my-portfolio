"use client"

import { ParticleTextAnimation } from "@/components/particle-text-animation"

export function ParticleTextSection() {
  return (
    <section className="relative w-full min-h-screen bg-black flex items-center justify-center overflow-hidden">
      <ParticleTextAnimation />
    </section>
  )
}
