"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"

const TRAITS = [
  "Detail oriented — every pixel and function matters",
  "Problem solver — analytical approach to every challenge",
  "Fast learner — always upskilling with new tech",
  "Collaborative — love working with teams to ship great products",
]

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
    <section id="about" className="bg-[#080808] border-t border-white/10 scroll-mt-16">
      
      {/* ── 2-Column Main About Layout with Prominent Large Portrait ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-white/10 min-h-[620px]">

        {/* ── Left Column: Prominent Large Suit Photo ── */}
        <div className="lg:col-span-6 relative bg-[#090909] min-h-[480px] lg:min-h-[650px] flex items-end justify-center border-b lg:border-b-0 lg:border-r border-white/10 overflow-hidden group">
          {/* Ambient Red Glow behind photo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full bg-red-950/40 blur-3xl pointer-events-none" />

          {/* Large Image Container */}
          <div className="relative w-full h-full min-h-[480px] lg:min-h-[650px] flex items-end justify-center">
            <Image
              src="/images/abhay-suit-transparent.png"
              alt="Abhay Vishwakarma"
              fill
              className="object-cover object-top scale-110 lg:scale-115 transition-transform duration-700 group-hover:scale-120"
              priority
            />
          </div>
        </div>

        {/* ── Right Column: Bio + Red Checkmarks + Stats ── */}
        <div className="lg:col-span-6 p-8 md:p-14 flex flex-col justify-between space-y-8 bg-[#080808]">
          <div className="space-y-6">
            <p className="text-base md:text-lg text-white/80 leading-relaxed font-sans font-light">
              I'm a Full Stack &amp; Mobile Developer with a passion for building production-ready applications from concept to deployment. Experienced in developing fully functional mobile apps and web platforms using modern frameworks and AI-powered tools.
            </p>

            <p className="text-base md:text-lg text-white/80 leading-relaxed font-sans font-light">
              Focused on creating scalable, deployable solutions — not just prototypes. I believe great software is built at the intersection of clean code and thoughtful user experience.
            </p>

            {/* Red Checkmark Traits List */}
            <div className="space-y-3.5 pt-3">
              {TRAITS.map((trait) => (
                <div key={trait} className="flex items-center gap-3 text-xs md:text-sm text-white/70 font-sans">
                  <CheckCircle2 className="w-4 h-4 text-red-600 flex-shrink-0" />
                  <span>{trait}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Stats Row */}
          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10">
            <div>
              <p className="font-bebas text-4xl md:text-5xl text-red-600 leading-none">2+</p>
              <p className="text-[10px] text-white/40 uppercase tracking-widest font-bebas mt-1.5">Years Exp</p>
            </div>
            <div>
              <p className="font-bebas text-4xl md:text-5xl text-red-600 leading-none">5+</p>
              <p className="text-[10px] text-white/40 uppercase tracking-widest font-bebas mt-1.5">Projects</p>
            </div>
            <div>
              <p className="font-bebas text-4xl md:text-5xl text-red-600 leading-none">7.33</p>
              <p className="text-[10px] text-white/40 uppercase tracking-widest font-bebas mt-1.5">CGPA</p>
            </div>
          </div>
        </div>

      </div>

      {/* ── Tools I Use Strip ── */}
      <div className="px-6 md:px-14 py-8 bg-[#080808]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex-shrink-0">
            <p className="font-bebas text-[10px] tracking-[0.3em] text-red-600 uppercase mb-0.5">Stack</p>
            <h3 className="font-bebas text-2xl md:text-3xl tracking-wide text-[#f3e8df]">TOOLS I USE</h3>
          </div>
          <div className="flex flex-wrap gap-4">
            {TOOLS.map((t, i) => (
              <motion.div key={i} whileHover={{ y: -3 }} className="group flex flex-col items-center gap-1">
                <div className="w-11 h-11 rounded-lg border border-white/10 group-hover:border-red-600/40 bg-white/[0.02] flex items-center justify-center p-2.5 transition-all">
                  <img src={t.icon} alt={t.name} className="w-full h-full object-contain" />
                </div>
                <span className="font-bebas text-[9px] tracking-wider text-white/30 group-hover:text-red-500 transition-colors uppercase">
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
