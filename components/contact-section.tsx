"use client"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Mail, MapPin, Phone, Send } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { MagneticButton } from "@/components/magnetic-button"

export function ContactSection() {
  return (
    <section id="contact" className="container px-6 py-24 md:px-12 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 -z-10" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 -z-10" />

      <div className="mx-auto max-w-5xl relative z-10">
        <ScrollReveal>
          <div className="mb-12 text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter md:text-5xl">
              Let's work <span className="text-gradient">together</span>
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground text-lg text-pretty">
              Have a project in mind? I'd love to hear about it. Send me a message and let's start the conversation.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-1 space-y-6">
            <ScrollReveal delay={0.1}>
              <div className="h-full space-y-6">
                {/* Contact Cards */}
                {[
                  { icon: Mail, label: "Email", value: "abhayvishwakarma0814@gmail.com", href: "mailto:abhayvishwakarma0814@gmail.com" },
                  { icon: Phone, label: "Phone", value: "+91 6302745191", href: "tel:+916302745191" },
                  { icon: MapPin, label: "Location", value: "Hyderabad, India", href: "#" }
                ].map((item, i) => (
                  <div key={i} className="group flex items-center gap-4 p-4 rounded-2xl bg-card/30 border border-border/50 hover:bg-card/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="font-medium text-sm text-muted-foreground mb-0.5">{item.label}</p>
                      <a href={item.href} className="text-sm font-semibold truncate block hover:text-primary transition-colors">
                        {item.value}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          <div className="md:col-span-2">
            <ScrollReveal delay={0.2}>
              <Card className="border border-white/10 bg-card/50 backdrop-blur-md shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <CardContent className="p-6 md:p-8 relative z-10">
                  <form className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label htmlFor="first-name" className="text-sm font-medium">First name</label>
                        <Input id="first-name" placeholder="John" required className="bg-background/50 border-white/10 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="last-name" className="text-sm font-medium">Last name</label>
                        <Input id="last-name" placeholder="Doe" required className="bg-background/50 border-white/10 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email</label>
                      <Input id="email" placeholder="john@example.com" type="email" required className="bg-background/50 border-white/10 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">Message</label>
                      <Textarea id="message" placeholder="Tell me about your project..." className="min-h-[150px] bg-background/50 border-white/10 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300" required />
                    </div>
                    <MagneticButton className="w-full md:w-auto">
                      <button type="submit" className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 font-medium text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:scale-[1.02] hover:shadow-primary/25">
                        Send Message <Send className="w-4 h-4" />
                      </button>
                    </MagneticButton>
                  </form>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
