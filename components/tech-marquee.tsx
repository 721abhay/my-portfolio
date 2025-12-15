import { InfiniteMarquee } from "@/components/infinite-marquee"

const technologies = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "Framer Motion",
  "Node.js",
  "Express.js",
  "PostgreSQL",
  "MongoDB",
  "Supabase",
  "Firebase",
  "GraphQL",
  "REST APIs",
  "Python",
  "Java",
  "Flutter",
  "React Native",
  "Three.js",
  "GSAP",
  "Figma",
  "WebGL",
  "Git",
  "Docker",
  "AWS",
  "Vercel",
]

export function TechMarquee() {
  return (
    <section className="relative py-20 border-y border-border/40 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-purple-500/5 to-primary/5" />

      {/* Animated gradient orbs */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative container px-6 md:px-12 mb-8">
        <div className="text-center space-y-2">
          <div className="inline-block rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-sm font-medium text-primary mb-2">
            TECH STACK
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
            Technologies I <span className="text-gradient">Master</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Building modern applications with cutting-edge tools and frameworks
          </p>
        </div>
      </div>

      <div className="relative">
        <InfiniteMarquee items={technologies} speed={40} />
      </div>

      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none" />
    </section>
  )
}
