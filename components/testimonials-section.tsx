"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechStart",
    avatar: "/placeholder.svg?key=dgtjz",
    content:
      "Alex transformed our vision into reality. The attention to detail and technical expertise is unmatched. Our platform handles 10x the traffic we expected!",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Product Manager, InnovateCo",
    avatar: "/placeholder.svg?key=d222h",
    content:
      "Working with Alex was a game-changer. Not only did they deliver ahead of schedule, but the code quality and architecture decisions were outstanding.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Designer, Creative Studio",
    avatar: "/placeholder.svg?key=la5nq",
    content:
      "Finally, a developer who truly understands design! Alex brought my Figma files to life with pixel-perfect precision and smooth animations.",
    rating: 5,
  },
  {
    name: "David Kim",
    role: "Founder, StartupXYZ",
    avatar: "/placeholder.svg?key=8j7h0",
    content:
      "Alex's full-stack capabilities saved us from hiring multiple developers. From database design to beautiful UI, they handled everything brilliantly.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="container px-6 py-24 md:px-12 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary/3 rounded-full blur-[120px] -z-10" />

      <ScrollReveal>
        <div className="mb-16 space-y-2 text-center">
          <h2 className="text-3xl font-bold tracking-tighter md:text-5xl">
            Client <span className="text-gradient">Testimonials</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-lg text-pretty">
            What people say about working with me.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                <div className="p-2 h-full">
                  <Card className="h-full border border-white/10 bg-card/60 backdrop-blur-md shadow-xl hover:border-primary/50 transition-all duration-300 relative group overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <CardContent className="flex flex-col gap-6 p-8 h-full relative z-10">
                      <div className="flex gap-1.5">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-orange-500 text-orange-500" />
                        ))}
                      </div>
                      <p className="text-muted-foreground leading-relaxed flex-1 text-pretty italic relative">
                        <span className="text-6xl text-primary/10 absolute -top-4 -left-2 font-serif">"</span>
                        {testimonial.content}
                      </p>
                      <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                        <Avatar className="h-10 w-10 ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all">
                          <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {testimonial.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-bold text-foreground group-hover:text-primary transition-colors">{testimonial.name}</div>
                          <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{testimonial.role}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12 border-primary/20 text-primary hover:bg-primary hover:text-white" />
          <CarouselNext className="hidden md:flex -right-12 border-primary/20 text-primary hover:bg-primary hover:text-white" />
        </Carousel>
      </ScrollReveal>
    </section>
  )
}
