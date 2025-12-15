"use client"

import Link from "next/link"
import { Github, Linkedin, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer id="contact" className="relative border-t border-border/40 bg-background overflow-hidden">
      <div className="container relative z-10 flex flex-col gap-12 px-6 py-24 md:px-12">
        <div className="grid gap-12 lg:grid-cols-2 items-start">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-tighter">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-mono">AV</span>
              <span>ABHAY<span className="text-primary">DEV</span></span>
            </Link>
            <p className="text-xl md:text-2xl font-medium leading-relaxed max-w-md text-foreground/80">
              Crafting digital experiences specifically designed to leave a lasting impression.
            </p>
            <div className="flex gap-4 pt-4">
              {[
                { Icon: Github, href: "https://github.com/721abhay", label: "GitHub" },
                { Icon: Linkedin, href: "https://www.linkedin.com/in/abhay-vishwakarma721", label: "LinkedIn" },
                { Icon: Twitter, href: "#", label: "Twitter" },
                { Icon: Instagram, href: "#", label: "Instagram" },
              ].map(({ Icon, href, label }, i) => (
                <a
                  key={i}
                  href={href}
                  aria-label={label}
                  className="group flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground hover:scale-110"
                >
                  <Icon className="h-5 w-5 transition-transform group-hover:rotate-12" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:justify-items-end">
            <div className="space-y-4">
              <h3 className="font-bold text-lg">Navigation</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li><Link href="#work" className="hover:text-primary transition-colors">Work</Link></li>
                <li><Link href="#experience" className="hover:text-primary transition-colors">Experience</Link></li>
                <li><Link href="#about" className="hover:text-primary transition-colors">About</Link></li>
                <li><Link href="#contact" className="hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-bold text-lg">Contact</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li><a href="mailto:abhayvishwakarma0814@gmail.com" className="hover:text-primary transition-colors">Email</a></li>
                <li><a href="tel:+916302745191" className="hover:text-primary transition-colors">Phone</a></li>
                <li className="text-foreground/50 cursor-default">Hyderabad, IN</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-bold text-lg">Legal</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li><Link href="#" className="hover:text-primary transition-colors">Privacy</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Terms</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Cookies</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-border/40 pt-8 text-sm text-foreground/60">
          <p>&copy; {new Date().getFullYear()} Abhay Vishwakarma. Built with Next.js & Tailwind.</p>
          <div className="flex gap-6 font-medium">
            <span>Local Time: {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' })}</span>
          </div>
        </div>
      </div>

      {/* Massive Background Text */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center overflow-hidden pointer-events-none opacity-[0.03] select-none">
        <span className="text-[15vw] font-black leading-none tracking-tighter whitespace-nowrap text-foreground">
          ABHAY VISHWAKARMA
        </span>
      </div>
    </footer>
  )
}
