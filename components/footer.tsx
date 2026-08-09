"use client"

import Link from "next/link"
import { Github, Linkedin, Mail, Phone, ArrowUpRight } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative bg-background border-t border-border/30 overflow-hidden">
      {/* Top section */}
      <div className="grid grid-cols-1 md:grid-cols-2 border-b border-border/30">
        {/* Left — Branding */}
        <div className="px-6 md:px-12 py-10 border-b md:border-b-0 md:border-r border-border/30">
          <Link href="/" className="block mb-4">
            <span className="font-bebas text-4xl tracking-tight">
              ABHAY<span className="text-primary">DEV</span>
            </span>
          </Link>
          <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
            Crafting digital experiences specifically designed to leave a lasting impression. Full stack developer based in Hyderabad, India.
          </p>
          <div className="flex gap-3 mt-6">
            {[
              { Icon: Github, href: "https://github.com/721abhay", label: "GitHub" },
              { Icon: Linkedin, href: "https://www.linkedin.com/in/abhay-vishwakarma721", label: "LinkedIn" },
              { Icon: Mail, href: "mailto:abhayvishwakarma0814@gmail.com", label: "Email" },
            ].map(({ Icon, href, label }, i) => (
              <a
                key={i}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="w-9 h-9 border border-border/50 flex items-center justify-center hover:border-primary hover:text-primary transition-all"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Right — Links grid */}
        <div className="grid grid-cols-3 px-6 md:px-12 py-10 gap-8">
          <div>
            <h3 className="font-bebas tracking-widest text-sm text-foreground mb-4 uppercase">Navigate</h3>
            <ul className="space-y-2">
              {[
                { label: "Projects", id: "projects-showcase" },
                { label: "About", id: "about" },
                { label: "Skills", id: "skills" },
                { label: "Contact", id: "contact" },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors font-bebas tracking-wider"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bebas tracking-widest text-sm text-foreground mb-4 uppercase">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:abhayvishwakarma0814@gmail.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Email
                </a>
              </li>
              <li>
                <a href="tel:+916302745191" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Phone
                </a>
              </li>
              <li>
                <span className="text-sm text-muted-foreground/50">Hyderabad, IN</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bebas tracking-widest text-sm text-foreground mb-4 uppercase">Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://github.com/721abhay" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                  GitHub <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/abhay-vishwakarma721" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                  LinkedIn <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-4 gap-2 text-xs text-muted-foreground/60 font-bebas tracking-widest">
        <p>© {new Date().getFullYear()} ABHAY VISHWAKARMA. BUILT WITH NEXT.JS</p>
        <p>ALL RIGHTS RESERVED</p>
      </div>

      {/* Massive background text */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center overflow-hidden pointer-events-none opacity-[0.025] select-none">
        <span className="font-bebas text-[15vw] leading-none tracking-tighter whitespace-nowrap text-foreground">
          ABHAY VISHWAKARMA
        </span>
      </div>
    </footer>
  )
}
