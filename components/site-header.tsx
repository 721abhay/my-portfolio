"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Menu, X } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, useScroll } from "framer-motion"
import { useState, useEffect } from "react"

const navLinks = [
  { label: "Projects", id: "projects-showcase" },
  { label: "Services", id: "services" },
  { label: "Skills", id: "skills" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
]

export function SiteHeader() {
  const { theme, setTheme } = useTheme()
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 80)
    })
  }, [scrollY])

  const handleDownloadResume = () => {
    const link = document.createElement("a")
    link.href = "/abhay-vishwakarma-cv.pdf"
    link.download = "Abhay_Vishwakarma_CV.pdf"
    link.click()
  }

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setMenuOpen(false)
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-12 h-16 md:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-bebas text-2xl tracking-tight">
              ABHAY<span className="text-primary">DEV</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-0">
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="px-4 py-2 text-sm font-bebas tracking-widest text-muted-foreground hover:text-foreground transition-colors relative group uppercase"
              >
                {item.label}
                <span className="absolute bottom-0 left-4 right-4 h-[1px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </button>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-none w-9 h-9 hover:bg-primary/10 hover:text-primary transition-colors"
              aria-label="Toggle theme"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            <button
              onClick={handleDownloadResume}
              className="hidden md:inline-flex items-center gap-2 px-5 py-2 border border-primary text-primary font-bebas text-sm tracking-widest hover:bg-primary hover:text-white transition-all"
            >
              Resume
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center hover:text-primary transition-colors"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-background/98 backdrop-blur-xl flex flex-col pt-20 px-8"
        >
          <nav className="flex flex-col gap-0 divide-y divide-border/30">
            {navLinks.map((item, i) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="py-5 text-left font-bebas text-3xl tracking-wider text-foreground hover:text-primary transition-colors"
              >
                <span className="text-primary/40 text-lg mr-3">0{i + 1}</span>
                {item.label}
              </button>
            ))}
          </nav>
          <button
            onClick={handleDownloadResume}
            className="mt-8 px-6 py-3 bg-primary text-white font-bebas text-lg tracking-widest hover:bg-primary/80 transition-colors text-center"
          >
            Download Resume
          </button>
        </motion.div>
      )}
    </>
  )
}
