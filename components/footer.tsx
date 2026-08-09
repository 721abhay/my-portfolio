"use client"

import Link from "next/link"
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react"

export function Footer() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })

  return (
    <footer className="relative bg-[#080808] border-t border-white/[0.06] overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 border-b border-white/[0.06]">
        {/* Left Column */}
        <div className="px-6 md:px-14 py-12 border-b md:border-b-0 md:border-r border-white/[0.06]">
          <Link href="/" className="inline-block mb-4">
            <span className="font-bebas text-3xl tracking-wider text-white">
              ABHAY<span className="text-red-600">DEV</span>
            </span>
          </Link>
          <p className="text-sm text-white/35 max-w-xs leading-relaxed font-sans mb-6">
            Crafting digital experiences designed to leave a lasting impression. Full stack developer based in Hyderabad, India.
          </p>

          <div className="flex gap-3">
            {[
              { Icon: Github, href: "https://github.com/721abhay", label: "GitHub" },
              { Icon: Linkedin, href: "https://linkedin.com/in/abhay-vishwakarma721", label: "LinkedIn" },
              { Icon: Mail, href: "mailto:abhayvishwakarma0814@gmail.com", label: "Email" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="w-9 h-9 border border-white/10 flex items-center justify-center text-white/30 hover:border-red-600 hover:text-red-500 transition-all"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Right Links Grid */}
        <div className="grid grid-cols-3 px-6 md:px-14 py-12 gap-6">
          <div>
            <p className="font-bebas text-xs tracking-widest text-white mb-4 uppercase">Navigate</p>
            <ul className="space-y-2">
              {[
                ["Projects", "projects"],
                ["Services", "services"],
                ["Skills", "skills"],
                ["About", "about"],
                ["Contact", "contact"],
              ].map(([l, id]) => (
                <li key={id}>
                  <button
                    onClick={() => scrollTo(id)}
                    className="font-bebas text-sm tracking-wider text-white/30 hover:text-red-400 transition-colors"
                  >
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-bebas text-xs tracking-widest text-white mb-4 uppercase">Contact</p>
            <ul className="space-y-2 font-sans">
              <li>
                <a href="mailto:abhayvishwakarma0814@gmail.com" className="text-xs text-white/30 hover:text-red-400 transition-colors">
                  Email
                </a>
              </li>
              <li>
                <a href="tel:+916302745191" className="text-xs text-white/30 hover:text-red-400 transition-colors">
                  Phone
                </a>
              </li>
              <li>
                <span className="text-xs text-white/15">Hyderabad, IN</span>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-bebas text-xs tracking-widest text-white mb-4 uppercase">Social</p>
            <ul className="space-y-2 font-sans">
              <li>
                <a
                  href="https://github.com/721abhay"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-white/30 hover:text-red-400 transition-colors flex items-center gap-1"
                >
                  GitHub <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/abhay-vishwakarma721"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-white/30 hover:text-red-400 transition-colors flex items-center gap-1"
                >
                  LinkedIn <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between px-6 md:px-14 py-4 text-[10px] font-bebas tracking-widest text-white/20 uppercase gap-2">
        <span>© {new Date().getFullYear()} Abhay Vishwakarma. Built with Next.js</span>
        <span>All Rights Reserved</span>
      </div>
    </footer>
  )
}
