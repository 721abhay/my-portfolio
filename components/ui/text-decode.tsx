"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"

interface TextDecodeProps {
    text: string;
    className?: string;
    delay?: number; // Delay start in seconds
    duration?: number; // Total duration of decode
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+-=[]{}|;:,.<>?"

export function TextDecode({ text, className, delay = 0, duration = 2 }: TextDecodeProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })
    const [displayText, setDisplayText] = useState(text)
    const [isDecoded, setIsDecoded] = useState(false)

    useEffect(() => {
        if (!isInView) return

        let interval: NodeJS.Timeout
        let step = 0
        const totalSteps = 20 // Number of shuffles per character roughly
        const stepDuration = (duration * 1000) / totalSteps

        // Start slightly after delay
        const startTimeout = setTimeout(() => {
            interval = setInterval(() => {
                step++
                if (step >= totalSteps) {
                    setDisplayText(text)
                    setIsDecoded(true)
                    clearInterval(interval)
                    return
                }

                const scrambled = text.split("").map((char, index) => {
                    if (char === " ") return " "
                    // Decode progressively from left to right roughly
                    if (index < (step / totalSteps) * text.length) {
                        return text[index]
                    }
                    return CHARS[Math.floor(Math.random() * CHARS.length)]
                }).join("")

                setDisplayText(scrambled)
            }, stepDuration)
        }, delay * 1000)

        return () => {
            clearTimeout(startTimeout)
            clearInterval(interval)
        }
    }, [isInView, text, delay, duration])

    return (
        <motion.span
            ref={ref}
            className={className}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: delay }}
        >
            {displayText}
        </motion.span>
    )
}
