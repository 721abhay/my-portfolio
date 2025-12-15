"use client"

import dynamic from "next/dynamic"

const AuroraBackground = dynamic(() => import("@/components/aurora-background").then(mod => mod.AuroraBackground), { ssr: false })
const LiquidBlobs = dynamic(() => import("@/components/liquid-blobs").then(mod => mod.LiquidBlobs), { ssr: false })
const AnimatedGrid = dynamic(() => import("@/components/animated-grid").then(mod => mod.AnimatedGrid), { ssr: false })
const BeamEffect = dynamic(() => import("@/components/beam-effect").then(mod => mod.BeamEffect), { ssr: false })
const SpotlightCursor = dynamic(() => import("@/components/spotlight-cursor").then(mod => mod.SpotlightCursor), { ssr: false })
const SpotifyWidget = dynamic(() => import("@/components/spotify-widget").then(mod => mod.SpotifyWidget), { ssr: false })

export function HomeEffects() {
    return (
        <>
            {/* ===== BACKGROUND EFFECTS LAYER ===== */}
            <AuroraBackground />
            <LiquidBlobs />
            <AnimatedGrid />
            <BeamEffect />

            {/* Noise texture overlay */}
            <div
                className="fixed inset-0 z-40 pointer-events-none opacity-[0.04] mix-blend-overlay"
                style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
            ></div>

            {/* ===== INTERACTIVE EFFECTS LAYER ===== */}
            <SpotlightCursor />
            <SpotifyWidget />
        </>
    )
}
