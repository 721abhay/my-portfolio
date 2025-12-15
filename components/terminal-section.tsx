"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Terminal } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"

export function TerminalSection() {
  const [output, setOutput] = useState<string[]>([
    "Welcome to Abhay Vishwakarma's interactive portfolio terminal v2.0.0",
    "Type 'help' to see available commands.",
    "",
  ])
  const [input, setInput] = useState("")
  const bottomRef = useRef<HTMLDivElement>(null)
  const hasInteracted = useRef(false)

  useEffect(() => {
    if (hasInteracted.current) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [output])

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault()
    hasInteracted.current = true
    const cmd = input.trim().toLowerCase()
    const newOutput = [...output, `$ ${input}`]

    switch (cmd) {
      case "help":
        newOutput.push(
          "",
          "Available commands:",
          "  about     - Display information about me",
          "  skills    - List technical skills and expertise",
          "  projects  - Show project portfolio",
          "  contact   - Display contact information",
          "  education - Show educational background",
          "  clear     - Clear terminal output",
          "",
        )
        break
      case "about":
        newOutput.push(
          "",
          "Abhay Vishwakarma | Vibe Coder & Full-Stack Developer",
          "──────────────────────────────────────────────────────",
          "Location: Hyderabad, Telangana, India",
          "Email: abhayvishwakarma0814@gmail.com",
          "Phone: +91 6302745191",
          "",
          "Building production-ready applications from concept to deployment.",
          "Experienced with: React, Next.js, Node.js, Java, Python, MongoDB, MySQL",
          "AI Tools: Anthropic Claude, v0, Lovable, Bolt",
          "",
        )
        break
      case "skills":
        newOutput.push(
          "",
          "Technical Skills:",
          "─────────────────",
          "Frontend:    HTML5, CSS3, JavaScript, React, Next.js",
          "Backend:     Node.js, Java, Python",
          "Mobile:      React Native, Android Studio",
          "Databases:   MySQL, MongoDB, PostgreSQL, Firebase",
          "Tools:       Git, GitHub, v0, Lovable, Bolt, Claude API",
          "Soft Skills: Team Collaboration, Problem-Solving, AI Integration,",
          "             Production Deployment, End-to-End Development",
          "",
        )
        break
      case "projects":
        newOutput.push(
          "",
          "Featured Projects:",
          "──────────────────",
          "1. Production-Ready Mobile & Web App (Current)",
          "   Full-stack development with AI tools integration",
          "",
          "2. College Website (Jan 2024 - May 2025)",
          "   Responsive, multipage site with Java backend",
          "",
          "3. AI Integration & Automation",
          "   Leveraging Claude, v0, Lovable for rapid development",
          "",
        )
        break
      case "contact":
        newOutput.push(
          "",
          "Contact Information:",
          "────────────────────",
          "Email:    abhayvishwakarma0814@gmail.com",
          "Phone:    +91 6302745191",
          "GitHub:   github.com/721abhay",
          "LinkedIn: linkedin.com/in/abhay-vishwakarma-6a6b28364",
          "Location: Hyderabad, Telangana, India",
          "",
        )
        break
      case "education":
        newOutput.push(
          "",
          "Education:",
          "──────────",
          "Bachelor of Computer Applications (BCA)",
          "Sphoorthy Degree & PG College, Hyderabad",
          "Sep 2022 - Jun 2025 | CGPA: 7.33",
          "",
          "Advanced Diploma in Computer Applications",
          "Completed: 2024",
          "",
          "Certifications:",
          "• Cybersecurity Analyst Job Simulation (2024)",
          "• Best Performer Awards (Sports & Events)",
          "",
        )
        break
      case "clear":
        setOutput([])
        setInput("")
        return
      case "":
        // Empty command, just show prompt
        break
      default:
        newOutput.push(`Command not found: ${cmd}. Type 'help' for available commands.`, "")
    }

    setOutput(newOutput)
    setInput("")
  }

  return (
    <section className="container px-6 py-24 md:px-12">
      <ScrollReveal>
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold">
              Interactive <span className="text-gradient">Terminal</span>
            </h2>
            <p className="text-muted-foreground text-lg">Explore my portfolio through the command line</p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border/50 bg-[#0a0a0a] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-5 py-3">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer" />
                <div className="h-3 w-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors cursor-pointer" />
                <div className="h-3 w-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors cursor-pointer" />
              </div>
              <div className="flex items-center gap-2 text-xs text-white/50 font-mono">
                <Terminal className="h-3.5 w-3.5" />
                <span>abhay@portfolio:~</span>
              </div>
              <div className="w-12" />
            </div>

            <div className="h-[450px] overflow-y-auto p-6 font-mono text-sm md:text-base scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
              {output.map((line, i) => (
                <div
                  key={i}
                  className={`mb-1 ${line.startsWith("$") ? "text-cyan-400 font-semibold" : "text-green-400/90"}`}
                >
                  {line}
                </div>
              ))}
              <form onSubmit={handleCommand} className="flex items-center gap-2 text-white mt-2">
                <span className="text-blue-400 font-bold">➜</span>
                <span className="text-cyan-400 font-semibold">~</span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent outline-none placeholder:text-white/30 font-mono"
                  placeholder="Type a command..."
                  autoComplete="off"
                />
              </form>
              <div ref={bottomRef} />
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
