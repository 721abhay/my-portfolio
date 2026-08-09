"use client"

import { useState } from "react"
import { Music, Disc } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function SpotifyWidget() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 left-6 z-50 hidden md:flex items-end gap-2">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.8 }}
            className="mb-2 rounded-xl border border-white/10 bg-black/50 p-3 backdrop-blur-xl"
          >
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-md">
                <img
                  src="/lofi-album-art.jpg"
                  alt="Album Art"
                  className="h-full w-full object-cover animate-[spin_8s_linear_infinite]"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="h-3 w-3 rounded-full bg-black/50 backdrop-blur-sm" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white">Coding Focus</span>
                <span className="text-[10px] text-white/60">Lofi Girl</span>
                <div className="mt-1 h-1 w-24 rounded-full bg-white/10">
                  <div className="h-full w-1/2 rounded-full bg-green-500" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/50 backdrop-blur-xl transition-all hover:scale-110 hover:bg-green-500/20 hover:border-green-500/50"
      >
        <motion.div animate={{ rotate: isOpen ? 360 : 0 }} transition={{ duration: 0.5 }}>
          {isOpen ? (
            <Disc className="h-5 w-5 text-green-500" />
          ) : (
            <Music className="h-5 w-5 text-white/60 group-hover:text-green-500" />
          )}
        </motion.div>
      </button>
    </div>
  )
}
