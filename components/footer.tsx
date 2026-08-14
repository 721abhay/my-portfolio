"use client"

import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react"

export function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })

  const NAV = [["Projects","projects"],["Services","services"],["Skills","skills"],["About","about"],["Contact","contact"]]
  const SOCIAL = [
    { Icon: Github,   href: "https://github.com/721abhay",                   label: "GitHub" },
    { Icon: Linkedin, href: "https://linkedin.com/in/abhay-vishwakarma721",  label: "LinkedIn" },
    { Icon: Mail,     href: "mailto:abhayvishwakarma0814@gmail.com",         label: "Email" },
  ]

  return (
    <footer ref={ref} className="relative bg-[#080808] border-t border-white/[0.06] overflow-hidden">
      {/* Top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-red-600/40 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[80px] bg-red-950/10 blur-[40px] pointer-events-none" />

      <div className="grid grid-cols-1 md:grid-cols-2 border-b border-white/[0.06]">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="px-6 md:px-14 py-12 border-b md:border-b-0 md:border-r border-white/[0.06]"
        >
          <Link href="/" className="inline-block mb-4 group">
            <motion.span
              whileHover={{ letterSpacing: "0.15em" }}
              transition={{ duration: 0.3 }}
              className="font-bebas text-3xl tracking-wider text-white transition-all"
            >
              ABHAY<span className="text-red-600">DEV</span>
            </motion.span>
          </Link>
          <p className="text-sm text-white/35 max-w-xs leading-relaxed font-sans mb-6">
            Crafting digital experiences designed to leave a lasting impression. Full stack developer based in Hyderabad, India.
          </p>

          <div className="flex gap-3">
            {SOCIAL.map(({ Icon, href, label }, i) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                whileHover={{ y: -4, scale: 1.12, borderColor: "rgba(204,0,0,0.7)", color: "rgba(239,68,68,1)", boxShadow: "0 0 15px rgba(204,0,0,0.25)" }}
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 border border-white/10 flex items-center justify-center text-white/30 transition-all"
              >
                <Icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Right links */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-3 px-6 md:px-14 py-12 gap-6"
        >
          <div>
            <p className="font-bebas text-xs tracking-widest text-white mb-4 uppercase">Navigate</p>
            <ul className="space-y-2">
              {NAV.map(([l, id], i) => (
                <motion.li
                  key={id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.06 }}
                >
                  <button
                    onClick={() => scrollTo(id)}
                    className="font-bebas text-sm tracking-wider text-white/30 hover:text-red-400 transition-colors flex items-center gap-1 group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-red-500 transition-all duration-200" />
                    {l}
                  </button>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-bebas text-xs tracking-widest text-white mb-4 uppercase">Contact</p>
            <ul className="space-y-2 font-sans">
              {[
                { href: "mailto:abhayvishwakarma0814@gmail.com", label: "Email" },
              ].map(({ href, label }, i) => (
                <motion.li
                  key={label}
                  initial={{ opacity: 0, x: 10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.25 + i * 0.08 }}
                >
                  <a href={href} className="text-xs text-white/30 hover:text-red-400 transition-colors">{label}</a>
                </motion.li>
              ))}
              <li><span className="text-xs text-white/15">Hyderabad, IN</span></li>
            </ul>
          </div>

          <div>
            <p className="font-bebas text-xs tracking-widest text-white mb-4 uppercase">Social</p>
            <ul className="space-y-2 font-sans">
              {[
                { href: "https://github.com/721abhay", label: "GitHub" },
                { href: "https://linkedin.com/in/abhay-vishwakarma721", label: "LinkedIn" },
              ].map(({ href, label }, i) => (
                <motion.li
                  key={label}
                  initial={{ opacity: 0, x: 10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08 }}
                >
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-white/30 hover:text-red-400 transition-colors flex items-center gap-1 group"
                  >
                    {label}
                    <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Copyright */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5 }}
        className="flex flex-col sm:flex-row items-center justify-between px-6 md:px-14 py-4 text-[10px] font-bebas tracking-widest text-white/20 uppercase gap-2"
      >
        <span>© {new Date().getFullYear()} Abhay Vishwakarma. Built with Next.js</span>
        <motion.span
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          All Rights Reserved
        </motion.span>
      </motion.div>
    </footer>
  )
}
