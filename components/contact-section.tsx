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
    <section id="contact" className="bg-[#080808] border-t border-white/[0.06]">
      {/* Header */}
      <div className="px-6 md:px-14 py-10 border-b border-white/[0.06]">
        <p className="font-bebas text-[9px] tracking-[0.4em] text-red-600 uppercase mb-1">Get In Touch</p>
        <h2
          className="font-bebas leading-none tracking-tight text-white"
          style={{ fontSize: "clamp(36px, 6vw, 96px)" }}
        >
          LET'S <span className="text-red-600">COLLABORATE</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 border-b border-white/[0.06]">
        {/* Left Contact Info */}
        <div className="p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-white/[0.06] flex flex-col justify-between">
          <div>
            <p className="text-base text-white/45 leading-relaxed mb-10 max-w-sm font-sans">
              Have a project in mind? I'd love to hear about it. Let's build something great together — send me a message to start the conversation.
            </p>

            <div className="space-y-5 mb-10">
              {[
                {
                  Icon: Mail,
                  l: "Email",
                  v: "abhayvishwakarma0814@gmail.com",
                  h: "mailto:abhayvishwakarma0814@gmail.com",
                },
                {
                  Icon: Phone,
                  l: "Phone",
                  v: "+91 6302745191",
                  h: "tel:+916302745191",
                },
                {
                  Icon: MapPin,
                  l: "Location",
                  v: "Hyderabad, India",
                  h: "#",
                },
              ].map(({ Icon, l, v, h }) => (
                <a key={l} href={h} className="group flex items-center gap-4 hover:opacity-70 transition-opacity">
                  <div className="w-9 h-9 border border-white/10 group-hover:border-red-600/40 flex items-center justify-center transition-all flex-shrink-0">
                    <Icon className="w-4 h-4 text-white/30 group-hover:text-red-500 transition-colors" />
                  </div>
                  <div>
                    <p className="font-bebas text-[10px] tracking-widest text-white/25 uppercase">{l}</p>
                    <p className="text-sm text-white/55 font-sans">{v}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="border border-white/[0.06] p-6 bg-[#0c0c0c]">
            <p className="font-bebas text-[10px] tracking-[0.25em] text-red-600 uppercase mb-2">Designing Experiences</p>
            <p className="font-bebas text-2xl text-white leading-tight">
              BUILDING CLEAN CODE &amp;<br />DIGITAL CONNECTION
            </p>
            <div className="flex items-center gap-2 mt-4">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <p className="font-bebas text-[10px] tracking-widest text-white/25 uppercase">Open To Opportunities</p>
            </div>
          </div>
        </div>

        {/* Right Form */}
        <div className="p-8 md:p-12">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bebas text-[10px] tracking-widest text-white/25 uppercase block mb-1">
                  First Name
                </label>
                <input
                  id="firstName"
                  placeholder="Arjun"
                  {...register("firstName")}
                  className="w-full h-11 bg-transparent border border-white/10 focus:border-red-600 px-3 text-sm text-white placeholder-white/20 outline-none transition-colors"
                />
                {errors.firstName && <p className="text-[10px] text-red-500 mt-1">{errors.firstName.message as string}</p>}
              </div>

              <div>
                <label className="font-bebas text-[10px] tracking-widest text-white/25 uppercase block mb-1">
                  Last Name
                </label>
                <input
                  id="lastName"
                  placeholder="Sharma"
                  {...register("lastName")}
                  className="w-full h-11 bg-transparent border border-white/10 focus:border-red-600 px-3 text-sm text-white placeholder-white/20 outline-none transition-colors"
                />
                {errors.lastName && <p className="text-[10px] text-red-500 mt-1">{errors.lastName.message as string}</p>}
              </div>
            </div>

            <div>
              <label className="font-bebas text-[10px] tracking-widest text-white/25 uppercase block mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                {...register("email")}
                className="w-full h-11 bg-transparent border border-white/10 focus:border-red-600 px-3 text-sm text-white placeholder-white/20 outline-none transition-colors"
              />
              {errors.email && <p className="text-[10px] text-red-500 mt-1">{errors.email.message as string}</p>}
            </div>

            <div>
              <label className="font-bebas text-[10px] tracking-widest text-white/25 uppercase block mb-1">
                Your Message
              </label>
              <textarea
                id="message"
                placeholder="Tell me about your project..."
                {...register("message")}
                rows={5}
                className="w-full bg-transparent border border-white/10 focus:border-red-600 px-3 py-2.5 text-sm text-white placeholder-white/20 outline-none transition-colors resize-none"
              />
              {errors.message && <p className="text-[10px] text-red-500 mt-1">{errors.message.message as string}</p>}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-bebas text-base tracking-widest transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {submitting ? "SENDING..." : "SEND MESSAGE"}
              {!submitting && <Send className="w-4 h-4" />}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
