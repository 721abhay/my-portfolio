"use client"

import Image from "next/image"
import { motion } from "framer-motion"

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
    <section id="about" className="bg-[#080808] border-t border-white/10 px-6 md:px-12 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ── Left Column: ABOUT ME ── */}
        <div className="lg:col-span-6 space-y-6">
          <h2 className="font-bebas text-3xl md:text-4xl text-[#f3e8df] tracking-wide">
            ABOUT <span className="text-red-600">ME</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 bg-[#121010] border border-white/10 rounded-xl p-6">
            {/* Red Bordered Photo */}
            <div className="sm:col-span-5 relative h-52 rounded-lg overflow-hidden border border-red-600/50">
              <Image
                src="/images/abhay-suit-transparent.png"
                alt="Abhay Vishwakarma"
                fill
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-red-950/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Bio & Checklist */}
            <div className="sm:col-span-7 space-y-4 flex flex-col justify-between">
              <p className="text-xs text-white/60 leading-relaxed font-sans">
                I'm a Full Stack &amp; Mobile Developer with a passion for building clean, performant interfaces and seamless backends. I believe great software is not just about how it looks, but how it works.
              </p>

              <ul className="space-y-1.5 font-sans text-xs text-white/50">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 flex-shrink-0" />
                  Detail oriented
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 flex-shrink-0" />
                  Problem solver
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 flex-shrink-0" />
                  Minimal &amp; modern
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 flex-shrink-0" />
                  Always learning
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ── Right Column: TOOLS I USE + Feedback ── */}
        <div className="lg:col-span-6 space-y-6">
          <h2 className="font-bebas text-3xl md:text-4xl text-[#f3e8df] tracking-wide">
            TOOLS <span className="text-red-600">I USE</span>
          </h2>

          <div className="space-y-4">
            {/* Tools Grid */}
            <div className="bg-[#121010] border border-white/10 rounded-xl p-6 flex flex-wrap gap-4">
              {TOOLS.map((t, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -3 }}
                  className="flex flex-col items-center gap-1 group cursor-default"
                >
                  <div className="w-12 h-12 rounded-lg border border-white/10 bg-white/[0.02] group-hover:border-red-600/50 flex items-center justify-center p-2.5 transition-all">
                    <img src={t.icon} alt={t.name} className="w-full h-full object-contain" />
                  </div>
                  <span className="font-bebas text-[9px] tracking-wider text-white/30 group-hover:text-red-500 uppercase transition-colors">
                    {t.name}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Testimonial / Feedback Quote box matching reference */}
            <div className="bg-[#121010] border border-white/10 rounded-xl p-6 flex items-start gap-4">
              <span className="font-serif text-3xl text-red-600 leading-none">“</span>
              <div>
                <p className="text-xs text-white/50 italic leading-relaxed font-sans">
                  Abhay is an exceptional developer who delivers outstanding work on time and understands modern digital solutions like no one else.
                </p>
                <p className="font-bebas text-[10px] tracking-widest text-red-500 mt-2 uppercase">
                  — Client Feedback
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
