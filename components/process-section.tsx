"use client"

import { Search, Target, Lightbulb, Code2, CheckCircle } from "lucide-react"

const STEPS = [
  { num: "01", icon: Search, title: "DISCOVER", desc: "Understanding goals, audience and project requirements." },
  { num: "02", icon: Target, title: "DEFINE", desc: "Research, wireframing and structuring the right solution." },
  { num: "03", icon: Lightbulb, title: "DESIGN", desc: "Crafting clean, modern and user-centric visuals." },
  { num: "04", icon: Code2, title: "DEVELOP", desc: "Collaborating with code to bring the design to life." },
  { num: "05", icon: CheckCircle, title: "DELIVER", desc: "Testing, refining and delivering pixel-perfect results." },
]

export function ProcessSection() {
  return (
    <div id="process" className="space-y-6">
      <h2 className="font-bebas text-3xl md:text-4xl text-[#f3e8df] tracking-wide">
        MY <span className="text-red-600">PROCESS</span>
      </h2>

      <div className="space-y-4">
        {STEPS.map((step, i) => {
          const Icon = step.icon
          return (
            <div
              key={i}
              className="flex items-center gap-4 p-4 rounded-xl bg-[#121010] border border-white/5 hover:border-white/15 transition-all group"
            >
              <span className="font-bebas text-xl text-red-600 font-bold w-6 flex-shrink-0">
                {step.num}
              </span>

              <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02] group-hover:border-red-600/50 transition-colors flex-shrink-0">
                <Icon className="w-4 h-4 text-white/50 group-hover:text-red-500 transition-colors" />
              </div>

              <div>
                <h3 className="font-bebas text-base tracking-wider text-[#f3e8df] group-hover:text-red-400 transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs text-white/40 font-sans leading-tight mt-0.5">
                  {step.desc}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
