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
        {/* 1. HERO — Centered suit photo with red spotlight halo, PORTFOLIO title, left quote, right bio */}
        <HeroSection />

        {/* 2. WHAT I DO — 5 rounded horizontal cards */}
        <ServicesSection />

        {/* 3. MY PROCESS (Left) + FEATURED WORK (Right) — Side-by-Side 2-column section matching reference */}
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

        {/* 4. TECHNICAL ARSENAL — Skills */}
        <SkillsSection />

        {/* 5. ABOUT ME (Left) + TOOLS I USE (Right) — Matching reference layout */}
        <AboutSection />

        {/* 6. LET'S COLLABORATE — Contact */}
        <ContactSection />
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}
