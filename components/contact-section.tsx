"use client"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone, Send, ArrowUpRight } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { motion } from "framer-motion"

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export function ContactSection() {
  return (
    <section id="contact" className="bg-background border-t border-border/30">
      {/* Header */}
      <div className="px-6 md:px-12 py-12 border-b border-border/30">
        <ScrollReveal>
          <p className="font-bebas text-xs tracking-[0.3em] text-primary mb-2 uppercase">Get In Touch</p>
          <h2 className="font-bebas text-5xl md:text-7xl lg:text-8xl tracking-tight text-foreground leading-none">
            LET'S{" "}
            <span className="text-primary">COLLABORATE</span>
          </h2>
        </ScrollReveal>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 border-b border-border/30">
        {/* Left — Contact Info */}
        <ScrollReveal className="border-b lg:border-b-0 lg:border-r border-border/30">
          <div className="p-8 md:p-12 flex flex-col h-full">
            <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-md">
              Have a project in mind? I'd love to hear about it. Let's build something great together — send me a message to start the conversation.
            </p>

            <div className="space-y-6 mb-10">
              {[
                { icon: Mail, label: "Email", value: "abhayvishwakarma0814@gmail.com", href: "mailto:abhayvishwakarma0814@gmail.com" },
                { icon: Phone, label: "Phone", value: "+91 6302745191", href: "tel:+916302745191" },
                { icon: MapPin, label: "Location", value: "Hyderabad, India", href: "#" },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className="group flex items-center gap-4 hover:opacity-80 transition-opacity"
                >
                  <div className="w-10 h-10 border border-border/50 group-hover:border-primary/50 flex items-center justify-center transition-colors">
                    <item.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs font-bebas tracking-widest text-muted-foreground uppercase">{item.label}</p>
                    <p className="text-sm text-foreground">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Tagline box matching the reference */}
            <div className="mt-auto border border-border/30 p-6">
              <p className="font-bebas text-xs tracking-[0.2em] text-primary uppercase mb-3">DESIGNING EXPERIENCES</p>
              <p className="font-bebas text-2xl md:text-3xl text-foreground leading-tight">
                BUILDING CLEAN CODE &<br />DIGITAL CONNECTION
              </p>
              <div className="flex items-center gap-2 mt-4">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <p className="text-xs text-muted-foreground font-bebas tracking-widest">OPEN TO OPPORTUNITIES</p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Right — Form */}
        <ScrollReveal delay={0.15}>
          <div className="p-8 md:p-12">
            <ContactForm />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: any) => {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error("Failed to send message")

      toast.success("Message sent successfully!", {
        description: "I'll get back to you as soon as possible.",
      })
      reset()
    } catch (error) {
      toast.error("Something went wrong.", {
        description: "Please try again later or email me directly.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="firstName" className="text-xs font-bebas tracking-widest uppercase text-muted-foreground">
            First Name
          </label>
          <Input
            id="firstName"
            placeholder="Arjun"
            {...register("firstName")}
            className="bg-transparent border-border/50 focus:border-primary rounded-none h-12 transition-all"
          />
          {errors.firstName && (
            <p className="text-xs text-red-500">{errors.firstName.message as string}</p>
          )}
        </div>
        <div className="space-y-2">
          <label htmlFor="lastName" className="text-xs font-bebas tracking-widest uppercase text-muted-foreground">
            Last Name
          </label>
          <Input
            id="lastName"
            placeholder="Sharma"
            {...register("lastName")}
            className="bg-transparent border-border/50 focus:border-primary rounded-none h-12 transition-all"
          />
          {errors.lastName && (
            <p className="text-xs text-red-500">{errors.lastName.message as string}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-xs font-bebas tracking-widest uppercase text-muted-foreground">
          Email Address
        </label>
        <Input
          id="email"
          placeholder="your@email.com"
          type="email"
          {...register("email")}
          className="bg-transparent border-border/50 focus:border-primary rounded-none h-12 transition-all"
        />
        {errors.email && (
          <p className="text-xs text-red-500">{errors.email.message as string}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-xs font-bebas tracking-widest uppercase text-muted-foreground">
          Your Message
        </label>
        <Textarea
          id="message"
          placeholder="Tell me about your project..."
          className="min-h-[160px] bg-transparent border-border/50 focus:border-primary rounded-none resize-none transition-all"
          {...register("message")}
        />
        {errors.message && (
          <p className="text-xs text-red-500">{errors.message.message as string}</p>
        )}
      </div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full flex items-center justify-center gap-3 bg-primary text-white font-bebas text-lg tracking-widest py-4 hover:bg-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
        {!isSubmitting && <Send className="w-4 h-4" />}
      </motion.button>
    </form>
  )
}
