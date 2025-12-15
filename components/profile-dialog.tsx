import type React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Code, FileText, Briefcase, Trophy } from "lucide-react"

export function ProfileDialog({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-3xl h-[80vh] flex flex-col p-0 gap-0 overflow-hidden bg-background/80 backdrop-blur-xl border-white/10">
        <div className="p-6 border-b border-white/10">
          <DialogHeader>
            <DialogTitle className="text-2xl">Abhay Vishwakarma</DialogTitle>
            <DialogDescription className="text-base">Full-Stack & Multi-Tool Developer</DialogDescription>
          </DialogHeader>
        </div>
        <ScrollArea className="flex-1 p-6">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="achievements">Awards</TabsTrigger>
              <TabsTrigger value="experience">Work</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Code className="w-5 h-5 text-primary" /> Technical Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "HTML/CSS/JS",
                      "React",
                      "Node.js",
                      "Express",
                      "Android Studio",
                      "React Native",
                      "MySQL",
                      "MongoDB",
                      "Java",
                      "Python",
                    ].map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" /> Education
                  </h3>
                  <div className="space-y-2">
                    <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                      <div className="font-medium">Bachelor of Computer Applications</div>
                      <div className="text-sm text-muted-foreground">Sphoorthy Degree & PG College • 2022-2025</div>
                      <div className="text-xs text-primary mt-1">CGPA: 7.33</div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-4">
              <div className="grid gap-4">
                {[
                  {
                    title: "Advanced Diploma in Computer Applications",
                    org: "Certification",
                    desc: "Comprehensive training in modern computing tools and software.",
                  },
                  {
                    title: "Cybersecurity Analyst Simulation",
                    org: "Certification",
                    desc: "Practical experience in security analysis and threat detection.",
                  },
                  {
                    title: "Best Performer Award",
                    org: "Sports",
                    desc: "Recognized for excellence in Running Race and Kabaddi competitions.",
                  },
                ].map((award, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="p-2 rounded-full bg-yellow-500/20 text-yellow-500">
                      <Trophy className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">{award.title}</h4>
                      <p className="text-sm text-primary mb-1">{award.org}</p>
                      <p className="text-muted-foreground">{award.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="experience" className="space-y-6">
              <div className="relative border-l border-white/10 ml-3 space-y-8 pl-8 py-2">
                {[
                  {
                    role: "Project Developer (Academic)",
                    company: "College Project",
                    period: "Aug 2024 - Jun 2025",
                    desc: "Built full-stack web apps, led backend API development, and collaborated with teams using Git.",
                  },
                ].map((job, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[39px] top-0 p-1.5 rounded-full bg-background border border-white/10">
                      <Briefcase className="w-4 h-4 text-primary" />
                    </div>
                    <h4 className="text-lg font-semibold">{job.role}</h4>
                    <p className="text-primary text-sm mb-2">
                      {job.company} • {job.period}
                    </p>
                    <p className="text-muted-foreground">{job.desc}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="projects" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  {
                    name: "College Website",
                    desc: "Full-stack responsive website with admin features, gallery, and course management.",
                    tech: "HTML, CSS, JS, MySQL, Java",
                  },
                  {
                    name: "Mobile App Prototype",
                    desc: "Cross-platform mobile application design focusing on user experience.",
                    tech: "React Native, Android Studio",
                  },
                ].map((project, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group"
                  >
                    <div className="aspect-video rounded-lg bg-muted mb-3 overflow-hidden relative flex items-center justify-center bg-gradient-to-br from-purple-900/20 to-blue-900/20">
                      <Code className="w-10 h-10 text-primary opacity-50" />
                    </div>
                    <h4 className="font-semibold group-hover:text-primary transition-colors">{project.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{project.desc}</p>
                    <p className="text-xs text-primary/80">{project.tech}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
