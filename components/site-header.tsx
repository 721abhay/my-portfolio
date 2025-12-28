"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, useScroll } from "framer-motion"
import { useState, useEffect } from "react"

export function SiteHeader() {
  const { theme, setTheme } = useTheme()
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50)
    })
  }, [scrollY])

  const handleDownloadResume = () => {
    const link = document.createElement("a")
    link.href = "/abhay-vishwakarma-cv.pdf"
    link.download = "Abhay_Vishwakarma_CV.pdf"
    link.click()
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 ${isScrolled ? "pt-4" : "pt-0 md:pt-6"
        }`}
    >
      <div
        className={`relative flex items-center justify-between transition-all duration-300 ${isScrolled
          ? "w-[95%] md:w-full max-w-5xl rounded-full border border-white/10 bg-background/80 backdrop-blur-xl shadow-2xl px-6 h-16"
          : "w-full max-w-7xl px-6 md:px-12 h-20 bg-transparent border-transparent"
          }`}
      >
        <Link href="/" className="text-xl font-bold tracking-tighter hover:scale-105 transition-transform flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-mono text-sm">AV</span>
          <span className={isScrolled ? "text-foreground" : "text-foreground shadow-black"}>ABHAY<span className="text-primary">DEV</span></span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-background/50 border border-border/50 backdrop-blur-sm">
          {["Projects", "Certificates", "Experience", "About", "Contact"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="px-4 py-2 text-sm font-medium rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-300"
              onClick={(e) => {
                e.preventDefault()
                const sectionId = item === "Projects" ? "projects-showcase" : item === "Certificates" ? "certificates" : item.toLowerCase()
                document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              {item}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
            aria-label="Toggle theme"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          <Button
            className="hidden md:inline-flex rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-lg hover:shadow-primary/25 transition-all hover:scale-105 px-6"
            onClick={handleDownloadResume}
          >
            Resume
          </Button>
        </div>
      </div>
    </motion.header>
  )
}
