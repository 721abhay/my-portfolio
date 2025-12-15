"use client"

import { useRef } from "react"
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useMotionValue,
    useVelocity,
    useAnimationFrame,
} from "framer-motion"

const wrap = (min: number, max: number, v: number) => {
    const rangeSize = max - min
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min
}

interface ParallaxProps {
    children: string
    baseVelocity: number
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {
    const baseX = useMotionValue(0)
    const { scrollY } = useScroll()
    const scrollVelocity = useVelocity(scrollY)
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    })
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    })

    // Magic wrapping logic
    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`)

    const directionFactor = useRef<number>(1)
    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000)

        // Change direction if scrolling up/down
        if (velocityFactor.get() < 0) {
            directionFactor.current = -1
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get()

        baseX.set(baseX.get() + moveBy)
    })

    return (
        <div className="overflow-hidden m-0 whitespace-nowrap flex flex-nowrap">
            <motion.div className="font-bebas text-9xl font-bold uppercase tracking-tighter flex whitespace-nowrap flex-nowrap" style={{ x }}>
                <span className="block mr-12 text-primary/20">{children} </span>
                <span className="block mr-12 text-primary/20">{children} </span>
                <span className="block mr-12 text-primary/20">{children} </span>
                <span className="block mr-12 text-primary/20">{children} </span>
            </motion.div>
        </div>
    )
}

export function VelocityScroll() {
    return (
        <section className="py-24 relative z-10">
            <ParallaxText baseVelocity={-2}>INNOVATION DESIGN EXPERIENCED</ParallaxText>
            <ParallaxText baseVelocity={2}>DEVELOPER CREATIVE VISIONARY</ParallaxText>
        </section>
    )
}
