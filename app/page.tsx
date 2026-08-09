import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { ProcessSection } from "@/components/process-section"
import { AboutSection } from "@/components/about-section"
import { SkillsSection } from "@/components/skills-section"
import { ProjectsShowcaseSection } from "@/components/projects-showcase-section"
import { CertificatesSection } from "@/components/certificates-section"
import { TimelineSection } from "@/components/timeline-section"
import { GitHubSection } from "@/components/github-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { BackToTop } from "@/components/back-to-top"
import { ScrollProgress } from "@/components/scroll-progress"

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-white relative">
      <ScrollProgress />

      {/* ===== CONTENT LAYER ===== */}
      <div className="relative z-10">
        <SiteHeader />
        <main>
          {/* HERO — Magazine editorial with giant PORTFOLIO text */}
          <HeroSection />

          {/* WHAT I DO — Grid of services */}
          <ServicesSection />

          {/* MY PROCESS — Numbered steps */}
          <ProcessSection />

          {/* FEATURED WORK — Projects showcase */}
          <ProjectsShowcaseSection />

          {/* SKILLS — Technical arsenal */}
          <SkillsSection />

          {/* ABOUT ME + TOOLS */}
          <AboutSection />

          {/* EXPERIENCE / TIMELINE */}
          <TimelineSection />

          {/* GITHUB ACTIVITY */}
          <GitHubSection />

          {/* CERTIFICATES */}
          <CertificatesSection />

          {/* LET'S COLLABORATE — Contact */}
          <ContactSection />
        </main>
        <Footer />
      </div>

      {/* ===== FLOATING UI ===== */}
      <BackToTop />
    </div>
  )
}
