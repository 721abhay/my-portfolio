import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { ProcessSection } from "@/components/process-section"
import { ProjectsShowcaseSection } from "@/components/projects-showcase-section"
import { SkillsSection } from "@/components/skills-section"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { BackToTop } from "@/components/back-to-top"

export default function Page() {
  return (
    <div className="min-h-screen bg-[#080808] text-white selection:bg-red-700 selection:text-white relative">
      <SiteHeader />
      <main>
        <HeroSection />
        <ServicesSection />
        <ProcessSection />
        <ProjectsShowcaseSection />
        <SkillsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}
