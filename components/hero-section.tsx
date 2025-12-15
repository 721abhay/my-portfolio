"use client"

import { Github, Linkedin, Mail, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import confetti from "canvas-confetti"
import { ProfileDialog } from "@/components/profile-dialog"
import Image from "next/image"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { TextDecode } from "@/components/ui/text-decode"
import { useRef } from "react"

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 200]) // Parallax text

  const handleConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#f97316", "#f59e0b", "#0f172a"],
    })
  }

  const handleDownloadCV = () => {
    handleConfetti()
    const link = document.createElement("a")
    link.href = "/abhay-vishwakarma-cv.pdf"
    link.download = "Abhay_Vishwakarma_CV.pdf"
    link.click()
  }

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen flex-col justify-center px-6 md:px-12 pt-24 overflow-hidden"
    >
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <motion.div style={{ y }} className="font-bebas text-center leading-none tracking-tighter w-full select-none">
          <h1
            className="text-[18vw] md:text-[16rem] lg:text-[20rem]"
            style={{ WebkitTextStroke: "2px rgba(249, 115, 22, 0.3)", color: "transparent" }}
          >
            ABHAY
          </h1>
          <h2
            className="text-[10vw] md:text-[8rem] lg:text-[10rem] -mt-4 md:-mt-12"
            style={{ WebkitTextStroke: "2px rgba(249, 115, 22, 0.3)", color: "transparent" }}
          >
            VISHWAKARMA
          </h2>
        </motion.div>
      </div>


      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <motion.div
          initial={{ y: "20vh", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative w-[300px] h-[400px] md:w-[400px] md:h-[500px] lg:w-[500px] lg:h-[600px]"
        >
          <Image
            src="/images/removed-background.png"
            alt="Abhay Vishwakarma"
            fill
            className="object-contain drop-shadow-2xl"
            priority
          />
        </motion.div>
      </div>


      <div className="absolute bottom-0 left-0 right-0 z-20 p-8 md:p-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="space-y-2"
            >
              <p className="text-primary font-bebas text-xl tracking-widest">STARRING</p>
              <div className="flex flex-col space-y-1 text-primary/80 font-bebas text-2xl md:text-3xl">
                <TextDecode text="FULL STACK DEVELOPER" delay={1.0} />
                <TextDecode text="MOBILE APP CREATOR" delay={1.2} />
                <TextDecode text="AI ENTHUSIAST" delay={1.4} />
                <TextDecode text="DATABASE ARCHITECT" delay={1.6} />
              </div>

              <div className="flex gap-4 pt-6">
                {[
                  { Icon: Github, href: "https://github.com/721abhay", label: "GitHub" },
                  {
                    Icon: Linkedin,
                    href: "https://www.linkedin.com/in/abhay-vishwakarma721",
                    label: "LinkedIn",
                  },
                  { Icon: Mail, href: "mailto:abhayvishwakarma0814@gmail.com", label: "Email" },
                ].map(({ Icon, href, label }, i) => (
                  <MagneticButton key={i}>
                    <Link
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="h-10 w-10 rounded-full bg-primary/20 hover:bg-primary/30 flex items-center justify-center transition-colors border border-primary/30"
                      aria-label={label}
                    >
                      <Icon className="h-5 w-5 text-primary" />
                    </Link>
                  </MagneticButton>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-col gap-4 items-start md:items-end"
            >
              <ProfileDialog>
                <MagneticButton>
                  <Button
                    size="lg"
                    className="rounded-full px-8 text-base h-14 font-bebas text-xl tracking-wider"
                    style={{ backgroundColor: "var(--primary)", color: "#02040a" }}
                  >
                    VIEW PORTFOLIO
                  </Button>
                </MagneticButton>
              </ProfileDialog>

              <MagneticButton>
                <Button
                  onClick={handleDownloadCV}
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 text-base h-14 font-bebas text-xl tracking-wider border-primary/50 text-primary hover:bg-primary/10 bg-transparent flex items-center gap-2"
                >
                  <Download className="h-5 w-5" />
                  DOWNLOAD CV
                </Button>
              </MagneticButton>

              <div className="mt-4 border-2 border-primary/50 px-4 py-2 rounded">
                <p className="font-bebas text-primary text-2xl tracking-wider">OPEN TO WORK</p>
                <p className="text-primary/60 text-xs">Available for full-time opportunities</p>
              </div>
            </motion.div >
          </div >

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="flex items-center justify-between mt-8 pt-6 border-t border-primary/20"
          >
            <p className="text-primary/60 text-sm">Hyderabad, India 🇮🇳</p>
            <p className="text-primary/60 text-sm">© 2025 Abhay Vishwakarma. All Rights Reserved.</p>
          </motion.div>
        </div >
      </div >

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1.5, duration: 2, repeat: Number.POSITIVE_INFINITY }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-primary/60 hidden md:flex flex-col items-center gap-2 z-30"
      >
        <span className="text-xs uppercase tracking-widest font-bebas">Scroll Down</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-primary to-transparent"></div>
      </motion.div>
    </section >
  )
}
