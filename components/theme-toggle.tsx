"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur-md shadow-lg transition-all hover:border-primary/50 hover:shadow-xl"
            aria-label="Toggle theme"
        >
            {theme === "dark" ? (
                <Sun className="h-5 w-5 text-primary" />
            ) : (
                <Moon className="h-5 w-5 text-primary" />
            )}
        </motion.button>
    )
}
