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
import { ScrollProgress } from "@/components/scroll-progress"
import { ParticleCanvas } from "@/components/particle-canvas"

import { NoiseOverlay } from "@/components/noise-overlay"

export default function Page() {
  return (
    <div className="min-h-screen bg-[#080808] text-white selection:bg-red-700 selection:text-white relative">
      {/* Global Effects */}
      <ScrollProgress />

      <NoiseOverlay />
      <ParticleCanvas />

      <SiteHeader />
      <main>
        {/* 1. HERO */}
        <HeroSection />

        {/* 2. WHAT I DO */}
        <ServicesSection />

        {/* 3. MY PROCESS + FEATURED WORK */}
        <section className="bg-[#080808] border-t border-white/10 px-6 md:px-12 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4">
              <ProcessSection />
            </div>
            <div className="lg:col-span-8">
              <ProjectsShowcaseSection />
            </div>
          </div>
        </section>

        {/* 4. TECHNICAL ARSENAL */}
        <SkillsSection />

        {/* 5. ABOUT ME */}
        <AboutSection />

        {/* 6. CONTACT */}
        <ContactSection />
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}
