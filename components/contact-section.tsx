"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"
import { Mail, Phone, MapPin, Send } from "lucide-react"

const formSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Valid email required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export function ContactSection() {
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: any) => {
    setSubmitting(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error("Failed to send message")

      toast.success("Message sent successfully!", {
        description: "I'll get back to you as soon as possible.",
      })
      reset()
    } catch {
      toast.error("Something went wrong.", {
        description: "Please try again later or email me directly.",
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="bg-[#080808] border-t border-white/10 px-6 md:px-12 py-12">
      <div className="mb-8">
        <h2 className="font-bebas text-3xl md:text-5xl text-[#f3e8df] tracking-wide">
          LET'S <span className="text-red-600">COLLABORATE</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Contact Info & Design Quote Card */}
        <div className="lg:col-span-5 space-y-6">
          <p className="text-xs text-white/50 leading-relaxed font-sans max-w-sm">
            Have a project in mind? I'd love to hear about it. Let me help you bring your ideas to life.
          </p>

          <div className="space-y-4 font-sans text-xs text-white/60">
            <a href="mailto:abhayvishwakarma0814@gmail.com" className="flex items-center gap-3 hover:text-red-400 transition-colors">
              <div className="w-8 h-8 rounded-lg border border-white/10 bg-white/[0.02] flex items-center justify-center">
                <Mail className="w-4 h-4 text-red-500" />
              </div>
              <span>abhayvishwakarma0814@gmail.com</span>
            </a>
            <a href="tel:+916302745191" className="flex items-center gap-3 hover:text-red-400 transition-colors">
              <div className="w-8 h-8 rounded-lg border border-white/10 bg-white/[0.02] flex items-center justify-center">
                <Phone className="w-4 h-4 text-red-500" />
              </div>
              <span>+91 6302745191</span>
            </a>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg border border-white/10 bg-white/[0.02] flex items-center justify-center">
                <MapPin className="w-4 h-4 text-red-500" />
              </div>
              <span>Hyderabad, India</span>
            </div>
          </div>

          <div className="bg-[#121010] border border-white/10 rounded-xl p-6">
            <p className="font-bebas text-xs tracking-widest text-red-500 mb-1 uppercase">DESIGNING EXPERIENCES</p>
            <p className="font-bebas text-2xl text-[#f3e8df] leading-tight">
              BUILDING CLEAN CODE &amp;<br />DIGITAL CONNECTION
            </p>
            <div className="flex items-center gap-2 mt-4">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <p className="font-bebas text-[10px] tracking-widest text-white/30 uppercase">Open to Work</p>
            </div>
          </div>
        </div>

        {/* Right Form */}
        <div className="lg:col-span-7 bg-[#121010] border border-white/10 rounded-xl p-6 md:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bebas text-xs tracking-widest text-white/40 uppercase block mb-1">
                  First Name
                </label>
                <input
                  id="firstName"
                  placeholder="Arjun"
                  {...register("firstName")}
                  className="w-full h-11 bg-white/[0.02] border border-white/10 focus:border-red-600 rounded-lg px-3 text-xs text-white placeholder-white/20 outline-none transition-colors"
                />
                {errors.firstName && <p className="text-[10px] text-red-500 mt-1">{errors.firstName.message as string}</p>}
              </div>

              <div>
                <label className="font-bebas text-xs tracking-widest text-white/40 uppercase block mb-1">
                  Last Name
                </label>
                <input
                  id="lastName"
                  placeholder="Sharma"
                  {...register("lastName")}
                  className="w-full h-11 bg-white/[0.02] border border-white/10 focus:border-red-600 rounded-lg px-3 text-xs text-white placeholder-white/20 outline-none transition-colors"
                />
                {errors.lastName && <p className="text-[10px] text-red-500 mt-1">{errors.lastName.message as string}</p>}
              </div>
            </div>

            <div>
              <label className="font-bebas text-xs tracking-widest text-white/40 uppercase block mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                {...register("email")}
                className="w-full h-11 bg-white/[0.02] border border-white/10 focus:border-red-600 rounded-lg px-3 text-xs text-white placeholder-white/20 outline-none transition-colors"
              />
              {errors.email && <p className="text-[10px] text-red-500 mt-1">{errors.email.message as string}</p>}
            </div>

            <div>
              <label className="font-bebas text-xs tracking-widest text-white/40 uppercase block mb-1">
                Your Message
              </label>
              <textarea
                id="message"
                placeholder="Tell me about your project..."
                {...register("message")}
                rows={4}
                className="w-full bg-white/[0.02] border border-white/10 focus:border-red-600 rounded-lg px-3 py-2.5 text-xs text-white placeholder-white/20 outline-none transition-colors resize-none"
              />
              {errors.message && <p className="text-[10px] text-red-500 mt-1">{errors.message.message as string}</p>}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bebas text-sm tracking-widest uppercase rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {submitting ? "SENDING..." : "SEND MESSAGE"}
              {!submitting && <Send className="w-3.5 h-3.5" />}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
