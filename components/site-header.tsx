"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Sun, Moon, Download, Menu, X } from "lucide-react"
import { useTheme } from "next-themes"

const NAV_ITEMS = [
  { label: "Projects", id: "projects" },
  { label: "Services", id: "services" },
  { label: "Skills", id: "skills" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
]

export function SiteHeader() {
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setOpen(false)
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-14 h-16 bg-[#080808]/90 backdrop-blur-md border-b border-white/[0.06]">
        {/* Brand */}
        <Link href="/" className="font-bebas text-2xl tracking-wider text-white flex items-center gap-1">
          ABHAY<span className="text-red-600">DEV</span>
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse ml-0.5" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-0">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="px-4 py-2 font-bebas text-sm tracking-widest text-white/50 hover:text-white uppercase transition-colors relative group"
            >
              {item.label}
              <span className="absolute bottom-0 left-4 right-4 h-px bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </button>
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
      </header>

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
