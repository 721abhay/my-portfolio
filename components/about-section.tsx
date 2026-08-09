"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"

const TOOLS = [
  { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB" },
  { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/ffffff" },
  { name: "Kotlin", icon: "https://cdn.simpleicons.org/kotlin/7F52FF" },
  { name: "Python", icon: "https://cdn.simpleicons.org/python/3776AB" },
  { name: "Firebase", icon: "https://cdn.simpleicons.org/firebase/FFCA28" },
  { name: "GitHub", icon: "https://cdn.simpleicons.org/github/ffffff" },
  { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/339933" },
  { name: "MongoDB", icon: "https://cdn.simpleicons.org/mongodb/47A248" },
]

export function AboutSection() {
  return (
    <section id="about" className="bg-[#080808] border-t border-white/[0.06]">
      {/* Section Header */}
      <div className="px-6 md:px-14 py-10 border-b border-white/[0.06]">
        <p className="font-bebas text-[9px] tracking-[0.4em] text-red-600 uppercase mb-1">Who I Am</p>
        <h2 className="font-bebas text-5xl md:text-7xl tracking-tight text-white leading-none">
          ABOUT <span className="text-red-600">ME</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 border-b border-white/[0.06]">
        {/* Photo Container */}
        <div className="relative h-[380px] lg:h-auto lg:min-h-[440px] bg-[#0d0d0d] border-b lg:border-b-0 lg:border-r border-white/[0.06] overflow-hidden">
          <Image
            src="/images/removed-background.png"
            alt="Abhay Vishwakarma"
            fill
            className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-4">
            <span className="font-bebas text-[10px] tracking-[0.25em] text-red-600 uppercase border border-red-600/30 px-2 py-1 bg-[#080808]/70 backdrop-blur-sm">
              Abhay Vishwakarma · Hyderabad, India
            </span>
          </div>
        </div>

        {/* Bio & Details */}
        <div className="p-8 md:p-12 flex flex-col justify-between">
          <div>
            <p className="text-base text-white/50 leading-relaxed mb-4 font-sans">
              I'm a Full Stack &amp; Mobile Developer with a passion for building production-ready applications from concept to deployment. Experienced in developing fully functional mobile apps and web platforms using modern frameworks and AI-powered tools.
            </p>
            <p className="text-base text-white/50 leading-relaxed mb-8 font-sans">
              Focused on creating scalable, deployable solutions — not just prototypes. I believe great software is built at the intersection of clean code and thoughtful user experience.
            </p>

            <div className="space-y-2.5 mb-8">
              {[
                "Detail oriented — every pixel and function matters",
                "Problem solver — analytical approach to every challenge",
                "Fast learner — always upskilling with new tech",
                "Collaborative — love working with teams to ship great products",
              ].map((trait) => (
                <div key={trait} className="flex items-start gap-2.5 text-xs text-white/40">
                  <CheckCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>{trait}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/[0.06]">
            {[
              { n: "2+", l: "Years Exp" },
              { n: "5+", l: "Projects" },
              { n: "7.33", l: "CGPA" },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <p className="font-bebas text-3xl text-red-500">{s.n}</p>
                <p className="text-[10px] text-white/25 uppercase tracking-wider">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tools Strip */}
      <div className="px-6 md:px-14 py-8 border-b border-white/[0.06]">
        <div className="flex flex-col md:flex-row md:items-center gap-8">
          <div className="flex-shrink-0">
            <p className="font-bebas text-[10px] tracking-[0.3em] text-red-600 uppercase mb-1">Stack</p>
            <h3 className="font-bebas text-2xl md:text-3xl tracking-wide text-white">TOOLS I USE</h3>
          </div>
          <div className="flex flex-wrap gap-4">
            {TOOLS.map((t, i) => (
              <motion.div key={i} whileHover={{ y: -3 }} className="group flex flex-col items-center gap-1">
                <div className="w-11 h-11 border border-white/10 group-hover:border-red-600/40 bg-white/[0.02] flex items-center justify-center p-2.5 transition-all">
                  <img src={t.icon} alt={t.name} className="w-full h-full object-contain" />
                </div>
                <span className="font-bebas text-[9px] tracking-wider text-white/25 group-hover:text-red-500 transition-colors uppercase">
                  {t.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
