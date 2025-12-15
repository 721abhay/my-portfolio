"use client"

import { ScrollReveal } from "@/components/scroll-reveal"
import { Briefcase, GraduationCap } from "lucide-react"

const timeline = [
  {
    year: "Jun 2025 - Nov 2025",
    title: "Android Application Developer",
    company: "Academic Project",
    description: "Built a robust Android application using Kotlin and Java with MVVM architecture. Implemented flexible repository pattern with Firebase, Supabase, and Azure backends. Resolved UI rendering and API performance issues while collaborating with a team to translate requirements into technical solutions.",
    type: "work",
  },
  {
    year: "Jan 2025 - May 2025",
    title: "Web Developer (College Platform)",
    company: "Sphoorthy Degree & PG College",
    description: "Developed a responsive multipage web application using JavaScript, HTML5, and CSS3. Integrated external RESTful APIs using asynchronous JavaScript and utilized Git/GitHub for version control in an Agile environment.",
    type: "work",
  },
  {
    year: "2025",
    title: "Bachelor of Computer Applications",
    company: "Sphoorthy Degree & PG College, Hyderabad",
    description: "Graduated with CGPA 6.5. Built strong academic foundation in programming languages, application frameworks, and databases. Active participant in technical clubs and coding contests.",
    type: "education",
  },
  {
    year: "2024 - 2025",
    title: "Certifications & Training",
    company: "Various Institutions",
    description: "Advanced Diploma in Computer Applications. Cybersecurity Analyst Job Simulation. Completed specialized courses in Android Development and Data Structures.",
    type: "education",
  },
]

export function TimelineSection() {
  return (
    <section id="experience" className="container px-6 py-24 md:px-12">
      <ScrollReveal>
        <div className="mb-16 space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter md:text-5xl">
            Experience & <span className="text-gradient">Education</span>
          </h2>
          <p className="text-muted-foreground max-w-md text-lg text-pretty">
            My professional journey and academic background.
          </p>
        </div>
      </ScrollReveal>

      <div className="relative">
        <div className="absolute left-[29px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent" />

        <div className="space-y-12">
          {timeline.map((item, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <div
                className={`relative flex items-start gap-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"} hidden md:block`}>
                  {index % 2 === 0 && (
                    <div className="space-y-2 p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(249,115,22,0.1)] group">
                      <div className="text-sm text-primary font-bold tracking-widest uppercase mb-2">{item.year}</div>
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{item.title}</h3>
                      <div className="text-muted-foreground font-medium">{item.company}</div>
                      <p className="text-sm text-muted-foreground leading-relaxed text-pretty mt-4">{item.description}</p>
                    </div>
                  )}
                </div>

                <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 border-background bg-gradient-to-br from-primary to-amber-500 shadow-[0_0_20px_rgba(249,115,22,0.4)]">
                  {item.type === "work" ? (
                    <Briefcase className="h-6 w-6 text-white" />
                  ) : (
                    <GraduationCap className="h-6 w-6 text-white" />
                  )}
                </div>

                <div className="flex-1 md:hidden">
                  <div className="space-y-2 p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(249,115,22,0.1)]">
                    <div className="text-sm text-primary font-bold tracking-widest uppercase mb-2">{item.year}</div>
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <div className="text-muted-foreground font-medium">{item.company}</div>
                    <p className="text-sm text-muted-foreground leading-relaxed text-pretty mt-4">{item.description}</p>
                  </div>
                </div>

                <div className={`flex-1 ${index % 2 === 0 ? "md:text-left" : "md:text-right"} hidden md:block`}>
                  {index % 2 === 1 && (
                    <div className="space-y-2 p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(249,115,22,0.1)] group">
                      <div className="text-sm text-primary font-bold tracking-widest uppercase mb-2">{item.year}</div>
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{item.title}</h3>
                      <div className="text-muted-foreground font-medium">{item.company}</div>
                      <p className="text-sm text-muted-foreground leading-relaxed text-pretty mt-4">{item.description}</p>
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
