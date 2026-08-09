"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Sun, Moon, Download, Menu, X } from "lucide-react"
import { useTheme } from "next-themes"
import { usePortfolio } from "@/lib/portfolio-provider"

const NAV_ITEMS = [
  { label: "Projects", id: "projects" },
  { label: "Services", id: "services" },
  { label: "Skills",   id: "skills" },
  { label: "About",    id: "about" },
  { label: "Contact",  id: "contact" },
]

export function SiteHeader() {
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { registerAboutClick } = usePortfolio()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setOpen(false)
    if (id === "about") registerAboutClick()
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-14 h-16 border-b transition-all duration-300 ${
          scrolled
            ? "bg-[#080808]/98 backdrop-blur-xl border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.6)]"
            : "bg-[#080808]/90 backdrop-blur-md border-white/[0.06]"
        }`}
      >
        {/* Brand */}
        <Link href="/" className="font-bebas text-2xl tracking-wider text-white flex items-center gap-1 group">
          <motion.span whileHover={{ letterSpacing: "0.12em" }} transition={{ duration: 0.3 }}>
            ABHAY<span className="text-red-600">DEV</span>
          </motion.span>
          <motion.span
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-red-600 ml-0.5"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-0">
          {NAV_ITEMS.map((item, i) => (
            <motion.button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07, duration: 0.5 }}
              whileHover={{ color: "rgba(255,255,255,1)" }}
              className="px-4 py-2 font-bebas text-sm tracking-widest text-white/50 uppercase relative group"
            >
              {item.label}
              <span className="absolute bottom-0 left-4 right-4 h-px bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-250 origin-left" />
            </motion.button>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-9 h-9 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all"
            aria-label="Toggle theme"
          >
            <Sun className="w-4 h-4 rotate-0 scale-100 dark:-rotate-90 dark:scale-0 transition-all" />
            <Moon className="absolute w-4 h-4 rotate-90 scale-0 dark:rotate-0 dark:scale-100 transition-all" />
          </button>

          <a
            href="/abhay-vishwakarma-cv.pdf"
            download
            className="hidden md:flex items-center gap-2 px-4 py-2 border border-red-600 text-red-500 font-bebas text-sm tracking-widest hover:bg-red-600 hover:text-white transition-all"
          >
            <Download className="w-3.5 h-3.5" /> RESUME
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-9 h-9 border border-white/10 flex items-center justify-center text-white"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-40 bg-[#080808] flex flex-col pt-24 px-8"
          >
            <nav className="flex flex-col divide-y divide-white/[0.06]">
              {NAV_ITEMS.map((item, i) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="py-5 text-left font-bebas text-4xl tracking-wider text-white hover:text-red-500 transition-colors"
                >
                  <span className="text-red-600/40 text-xl mr-3 font-mono">0{i + 1}</span>
                  {item.label}
                </button>
              ))}
            </nav>

            <a
              href="/abhay-vishwakarma-cv.pdf"
              download
              className="mt-8 py-3.5 bg-red-600 text-white font-bebas text-lg tracking-widest text-center"
            >
              DOWNLOAD RESUME
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
