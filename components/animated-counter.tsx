"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"

interface AnimatedCounterProps {
  value: string
  className?: string
}

export function AnimatedCounter({ value, className }: AnimatedCounterProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [displayValue, setDisplayValue] = useState("0")

  useEffect(() => {
    if (!isInView) return

    // Extract number and suffix (e.g. "10+" → num=10, suffix="+")
    const match = value.match(/^(\d+)(.*)$/)
    if (!match) {
      setDisplayValue(value)
      return
    }

    const target = parseInt(match[1])
    const suffix = match[2] || ""
    const duration = 1800
    const steps = 60
    const increment = target / steps
    let current = 0
    let step = 0

    const timer = setInterval(() => {
      step++
      current = Math.min(Math.round(increment * step), target)
      setDisplayValue(`${current}${suffix}`)
      if (step >= steps) clearInterval(timer)
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isInView, value])

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  )
}
