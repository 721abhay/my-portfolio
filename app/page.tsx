import { BlogSection } from "@/components/blog-section"
import { TechLabSection } from "@/components/tech-lab-section"
import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { HorizontalScrollSection } from "@/components/horizontal-scroll-section"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { VelocityScroll } from "@/components/velocity-scroll"
import { TestimonialsSection } from "@/components/testimonials-section"
import { TimelineSection } from "@/components/timeline-section"
import { TerminalSection } from "@/components/terminal-section"
import { SkillsSection } from "@/components/skills-section"
import { StatsSection } from "@/components/stats-section"
import { GitHubSection } from "@/components/github-section"
import { ThemeToggle } from "@/components/theme-toggle"
import { ServicesSection } from "@/components/services-section"
import { BackToTop } from "@/components/back-to-top"
import { HomeEffects } from "@/components/home-effects"
import { ScrollProgress } from "@/components/scroll-progress"
import { CertificatesSection } from "@/components/certificates-section"
import { ProjectsShowcaseSection } from "@/components/projects-showcase-section"
import { LinkedInSyncButton } from "@/components/linkedin-sync-button"

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground relative">
      <ScrollProgress />
      <HomeEffects />

      {/* ===== CONTENT LAYER ===== */}
      <div className="relative z-10">
        <SiteHeader />
        <main>
          <HeroSection />
          <VelocityScroll />
          <HorizontalScrollSection />
          <ServicesSection />
          <TechLabSection />
          <StatsSection />
          <AboutSection />
          <SkillsSection />
          <GitHubSection />
          <ProjectsShowcaseSection />
          <CertificatesSection />
          <TimelineSection />
          <TerminalSection />
          <TestimonialsSection />
          <BlogSection />
          <ContactSection />
        </main>
        <Footer />
      </div>

      {/* ===== FLOATING UI ELEMENTS ===== */}
      <ThemeToggle />
      <BackToTop />
      <LinkedInSyncButton />
    </div>
  )
}
