"use client"

import React, { createContext, useContext, useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import initialData from "./portfolio-data.json"

export interface HeroData {
  title: string
  role: string
  subRoles: string[]
  quote: string
  socials: Array<{
    platform: string
    url: string
  }>
  firstName: string
  lastName: string
  bioRole: string
  bioText: string
  stats: Array<{ value: string; label: string }>
}

export interface ServiceData {
  icon: string
  title: string
  desc: string
}

export interface ProjectData {
  id: string
  title: string
  cat: string
  desc: string
  longDesc: string
  tags: string[]
  github: string
  demo: string
  image: string
  video?: string
  thumbnail?: string
}

export interface SkillGroupData {
  title: string
  icon: string
  skills: string[]
}

export interface AboutData {
  bioParagraphs: string[]
  traits: string[]
  stats: Array<{ value: string; label: string }>
  tools: Array<{ name: string; icon: string }>
}

export interface PortfolioData {
  hero: HeroData
  services: ServiceData[]
  projects: ProjectData[]
  skills: SkillGroupData[]
  about: AboutData
}

interface PortfolioContextType {
  portfolioData: PortfolioData
  updatePortfolioData: (newData: PortfolioData) => Promise<boolean>
  isAdminOpen: boolean
  setIsAdminOpen: (isOpen: boolean) => void
  registerAboutClick: () => void
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined)

// ── Password Modal ──────────────────────────────────────────────────────────
function AdminPasswordModal({
  onSuccess,
  onClose,
}: {
  onSuccess: () => void
  onClose: () => void
}) {
  const [input, setInput] = useState("")
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Password = today's date as DDMMYYYY
  const getPassword = () => {
    const now = new Date()
    const dd   = String(now.getDate()).padStart(2, "0")
    const mm   = String(now.getMonth() + 1).padStart(2, "0")
    const yyyy = String(now.getFullYear())
    return `${dd}${mm}${yyyy}`
  }

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 100)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input === getPassword()) {
      setError(false)
      onSuccess()
    } else {
      setError(true)
      setShake(true)
      setInput("")
      setTimeout(() => setShake(false), 500)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={shake
          ? { opacity: 1, scale: 1, x: [-10, 10, -8, 8, -4, 4, 0] }
          : { opacity: 1, scale: 1, y: 0, x: 0 }
        }
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={shake ? { duration: 0.4 } : { duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-sm mx-4 bg-[#0d0d0d] border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(204,0,0,0.15)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top glow line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-red-600/60 to-transparent" />

        <div className="p-8 space-y-6">
          {/* Icon + title */}
          <div className="text-center space-y-2">
            <motion.div
              animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="w-12 h-12 mx-auto border border-red-600/40 bg-red-950/20 rounded-full flex items-center justify-center"
            >
              <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </motion.div>
            <h2 className="font-bebas text-2xl tracking-widest text-white">DEVELOPER ACCESS</h2>
            <p className="text-[11px] text-white/35 font-sans">Enter password to continue</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative pb-5">
              <input
                ref={inputRef}
                type="password"
                value={input}
                onChange={(e) => { setInput(e.target.value); setError(false) }}
                placeholder="••••••••"
                className={`w-full bg-[#141414] border rounded-lg px-4 py-3 text-white font-mono text-center text-lg tracking-widest placeholder:text-white/20 outline-none transition-all ${
                  error
                    ? "border-red-500 shadow-[0_0_15px_rgba(204,0,0,0.3)]"
                    : "border-white/10 focus:border-red-600/60 focus:shadow-[0_0_15px_rgba(204,0,0,0.15)]"
                }`}
                autoComplete="off"
              />
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-0 left-0 right-0 text-center text-[10px] text-red-500 font-bebas tracking-widest"
                >
                  INCORRECT PASSWORD
                </motion.p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 border border-white/10 text-white/40 font-bebas text-sm tracking-widest hover:border-white/30 hover:text-white/70 transition-all rounded-lg"
              >
                CANCEL
              </button>
              <motion.button
                type="submit"
                whileHover={{ boxShadow: "0 0 20px rgba(204,0,0,0.35)" }}
                whileTap={{ scale: 0.97 }}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bebas text-sm tracking-widest transition-all rounded-lg relative overflow-hidden group"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                ENTER
              </motion.button>
            </div>
          </form>
        </div>

        {/* Hint */}
        <div className="px-8 pb-5 text-center">
          <p className="text-[9px] text-white/15 font-bebas tracking-widest uppercase">
            Hint: today&apos;s date (DDMMYYYY)
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ───────────────────────────────────────────────────────────────────────────
export function PortfolioDataProvider({ children }: { children: React.ReactNode }) {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(initialData as PortfolioData)
  const [isAdminOpen, setIsAdminOpen] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [aboutClicks, setAboutClicks] = useState(0)

  // Load override from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("portfolio_data_override")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (parsed && parsed.hero && Array.isArray(parsed.hero.socials)) {
          setPortfolioData(parsed)
        } else {
          console.warn("Outdated localStorage schema detected. Resetting to defaults.")
          localStorage.removeItem("portfolio_data_override")
        }
      } catch (e) {
        console.error("Failed to parse saved portfolio data", e)
      }
    }
  }, [])

  // Auto-hide toast
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [toastMessage])

  const showToast = (msg: string) => setToastMessage(msg)

  // 7 clicks → open password modal; hints after 3+
  const registerAboutClick = () => {
    setAboutClicks((prev) => {
      const next = prev + 1
      if (next >= 7) {
        setShowPasswordModal(true)
        return 0
      } else if (next >= 3) {
        showToast(`${7 - next} MORE CLICKS FOR DEVELOPER MODE`)
      }
      return next
    })
  }

  const handlePasswordSuccess = () => {
    setShowPasswordModal(false)
    setIsAdminOpen(true)
    showToast("ADMIN MODE ACTIVATED")
  }

  const updatePortfolioData = async (newData: PortfolioData): Promise<boolean> => {
    try {
      setPortfolioData(newData)
      localStorage.setItem("portfolio_data_override", JSON.stringify(newData))

      const res = await fetch("/api/admin/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      })

      if (res.ok) {
        showToast("CHANGES SAVED SUCCESSFULLY TO FILESYSTEM")
        return true
      } else {
        const errorData = await res.json().catch(() => ({}))
        showToast(errorData.isReadOnly ? "SAVED TO BROWSER STORAGE (PRODUCTION MODE)" : "SAVED TO BROWSER STORAGE ONLY")
        return true
      }
    } catch (err) {
      console.error("Failed to save changes via API", err)
      showToast("SAVED TO BROWSER STORAGE (API OFFLINE)")
      return true
    }
  }

  return (
    <PortfolioContext.Provider
      value={{ portfolioData, updatePortfolioData, isAdminOpen, setIsAdminOpen, registerAboutClick }}
    >
      {children}

      {/* Password Gate */}
      <AnimatePresence>
        {showPasswordModal && (
          <AdminPasswordModal
            onSuccess={handlePasswordSuccess}
            onClose={() => setShowPasswordModal(false)}
          />
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-[9999] bg-[#121010] border border-red-600/40 text-white font-bebas text-sm tracking-widest px-5 py-3 rounded-lg shadow-[0_0_30px_rgba(204,0,0,0.2)] flex items-center gap-3"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </PortfolioContext.Provider>
  )
}

export function usePortfolio() {
  const context = useContext(PortfolioContext)
  if (!context) throw new Error("usePortfolio must be used within a PortfolioDataProvider")
  return context
}
