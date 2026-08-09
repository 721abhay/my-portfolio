"use client"

import { Code2, Smartphone, Database, Terminal, Cpu, Layout, Server, Sparkles } from "lucide-react"

const SKILL_GROUPS = [
  {
    title: "Frontend Development",
    icon: Layout,
    skills: ["React.js", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML5/CSS3"],
  },
  {
    title: "Backend & Systems",
    icon: Server,
    skills: ["Node.js", "Express.js", "REST APIs", "GraphQL", "Python", "C/C++"],
  },
  {
    title: "Mobile Development",
    icon: Smartphone,
    skills: ["Kotlin", "Android SDK", "Flutter", "React Native", "Jetpack Compose"],
  },
  {
    title: "Databases & Cloud",
    icon: Database,
    skills: ["MySQL", "PostgreSQL", "MongoDB", "Firebase", "Supabase", "AWS S3"],
  },
  {
    title: "AI & Tools",
    icon: Cpu,
    skills: ["Git / GitHub", "VS Code", "MediaPipe", "Playwright", "Docker", "Figma"],
  },
]

export function SkillsSection() {
  return (
    <section id="skills" className="bg-[#080808] border-t border-white/[0.06]">
      {/* Header */}
      <div className="px-6 md:px-14 py-10 border-b border-white/[0.06]">
        <p className="font-bebas text-[9px] tracking-[0.4em] text-red-600 uppercase mb-1">Capabilities</p>
        <h2 className="font-bebas text-5xl md:text-7xl tracking-tight text-white leading-none">
          TECHNICAL <span className="text-red-600">ARSENAL</span>
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y lg:divide-y-0 md:divide-x divide-white/[0.06]">
        {SKILL_GROUPS.map((group, i) => {
          const Icon = group.icon
          return (
            <div
              key={group.title}
              className={`p-8 border-b border-white/[0.06] flex flex-col justify-between hover:bg-white/[0.01] transition-colors ${
                i >= 3 ? "lg:border-t lg:border-white/[0.06]" : ""
              }`}
            >
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 border border-white/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-red-500" />
                  </div>
                  <h3 className="font-bebas text-xl tracking-wide text-white uppercase">{group.title}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="font-bebas text-xs tracking-wider text-white/60 bg-[#0c0c0c] border border-white/10 px-3 py-1.5 hover:border-red-600/50 hover:text-white transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/[0.04] flex items-center justify-between text-[10px] font-bebas tracking-widest text-white/20">
                <span>MODULE 0{i + 1}</span>
                <span className="text-red-600">PRODUCTION READY</span>
              </div>
            </div>
          )
        })}

        {/* 6th Box — Summary statement */}
        <div className="p-8 border-b border-white/[0.06] flex flex-col justify-between bg-red-950/[0.05]">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 border border-red-600/40 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-red-500" />
              </div>
              <h3 className="font-bebas text-xl tracking-wide text-white uppercase">Continuous Growth</h3>
            </div>
            <p className="text-xs text-white/40 leading-relaxed font-sans">
              Always expanding expertise into emerging AI frameworks, low-level optimization, and cloud architecture to deliver cutting-edge software solutions.
            </p>
          </div>
          <div className="pt-6 mt-6 border-t border-white/[0.04] flex items-center justify-between text-[10px] font-bebas tracking-widest text-white/20">
            <span>ALWAYS LEARNING</span>
            <span className="text-red-600">2025</span>
          </div>
        </div>
      </div>
    </section>
  )
}
