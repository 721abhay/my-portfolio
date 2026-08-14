"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"
import { Mail, Phone, MapPin, Send, Sparkles } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const formSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Valid email required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

export function ContactSection() {
  const [submitting, setSubmitting] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(formSchema) })

  const onSubmit = async (data: any) => {
    setSubmitting(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error("Failed")
      const result = await res.json()
      
      if (result.message && result.message.includes("Mock Mode")) {
        toast.warning("Message received (Mock Mode)", {
          description: "Configure EMAIL_USER & EMAIL_PASS in env to send real emails.",
        })
      } else {
        toast.success("Message sent successfully!", {
          description: "I'll get back to you as soon as possible.",
        })
      }
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
    <section
      id="contact"
      className="bg-[#080808] border-t border-white/10 px-6 md:px-12 py-16 relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[500px] h-[300px] bg-red-950/10 blur-[100px] rounded-full" />
        <div className="absolute top-0 right-0 w-[300px] h-[200px] bg-red-900/8 blur-[80px] rounded-full" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(204,0,0,0.5) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(204,0,0,0.5) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <p className="font-bebas text-[9px] tracking-[0.4em] text-red-600 uppercase mb-1">Get In Touch</p>
        <h2 className="font-bebas text-3xl md:text-5xl text-[#f3e8df] tracking-wide">
          LET'S <span className="text-red-600">COLLABORATE</span>
        </h2>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 64 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-2 h-0.5 bg-gradient-to-r from-red-600 to-transparent"
        />
      </motion.div>

      <div ref={ref} className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Info */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="lg:col-span-5 space-y-6"
        >
          <motion.p variants={itemVariants} className="text-xs text-white/50 leading-relaxed font-sans max-w-sm">
            Have a project in mind? I'd love to hear about it. Let me help you bring your ideas to life.
          </motion.p>

          <motion.div variants={containerVariants} className="space-y-4 font-sans text-xs text-white/60">
            {[
              { href: "mailto:abhayvishwakarma0814@gmail.com", icon: Mail, label: "abhayvishwakarma0814@gmail.com" },
              { href: undefined, icon: MapPin, label: "Hyderabad, India" },
            ].map(({ href, icon: Icon, label }, idx) => {
              const content = (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ x: 4, color: "rgba(248,113,113,1)" }}
                  className="flex items-center gap-3 transition-colors"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, borderColor: "rgba(204,0,0,0.5)" }}
                    className="w-8 h-8 rounded-lg border border-white/10 bg-white/[0.02] flex items-center justify-center transition-all"
                  >
                    <Icon className="w-4 h-4 text-red-500" />
                  </motion.div>
                  <span>{label}</span>
                </motion.div>
              )
              return href ? <a key={idx} href={href}>{content}</a> : <div key={idx}>{content}</div>
            })}
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ borderColor: "rgba(204,0,0,0.25)", boxShadow: "0 0 30px rgba(204,0,0,0.08)" }}
            className="bg-[#121010] border border-white/10 rounded-xl p-6 transition-all relative overflow-hidden"
          >
            {/* Breathing inner glow */}
            <motion.div
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute inset-0 rounded-xl"
              style={{ background: "radial-gradient(ellipse at bottom left, rgba(204,0,0,0.06) 0%, transparent 70%)" }}
            />

            <div className="relative z-10">
              <p className="font-bebas text-xs tracking-widest text-red-500 mb-1 uppercase flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                Designing Experiences
              </p>
              <p className="font-bebas text-2xl text-[#f3e8df] leading-tight">
                BUILDING CLEAN CODE &<br />DIGITAL CONNECTION
              </p>
              <div className="flex items-center gap-2 mt-4">
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-green-500"
                />
                <p className="font-bebas text-[10px] tracking-widest text-white/30 uppercase">Open to Work</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 relative"
        >
          <motion.div
            whileHover={{ borderColor: "rgba(204,0,0,0.2)" }}
            className="bg-[#121010] border border-white/10 rounded-xl p-6 md:p-8 transition-colors relative overflow-hidden"
          >
            {/* Form inner glow */}
            <div className="absolute inset-0 rounded-xl pointer-events-none"
              style={{ background: "radial-gradient(ellipse at top right, rgba(204,0,0,0.04) 0%, transparent 60%)" }}
            />

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.div whileFocus={{ scale: 1.01 }}>
                  <label className="font-bebas text-xs tracking-widest text-white/40 uppercase block mb-1">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    placeholder="Arjun"
                    {...register("firstName")}
                    className="w-full h-11 bg-white/[0.02] border border-white/10 focus:border-red-600 focus:shadow-[0_0_15px_rgba(204,0,0,0.1)] rounded-lg px-3 text-xs text-white placeholder-white/20 outline-none transition-all"
                  />
                  {errors.firstName && <p className="text-[10px] text-red-500 mt-1">{errors.firstName.message as string}</p>}
                </motion.div>

                <div>
                  <label className="font-bebas text-xs tracking-widest text-white/40 uppercase block mb-1">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    placeholder="Sharma"
                    {...register("lastName")}
                    className="w-full h-11 bg-white/[0.02] border border-white/10 focus:border-red-600 focus:shadow-[0_0_15px_rgba(204,0,0,0.1)] rounded-lg px-3 text-xs text-white placeholder-white/20 outline-none transition-all"
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
                  className="w-full h-11 bg-white/[0.02] border border-white/10 focus:border-red-600 focus:shadow-[0_0_15px_rgba(204,0,0,0.1)] rounded-lg px-3 text-xs text-white placeholder-white/20 outline-none transition-all"
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
                  className="w-full bg-white/[0.02] border border-white/10 focus:border-red-600 focus:shadow-[0_0_15px_rgba(204,0,0,0.1)] rounded-lg px-3 py-2.5 text-xs text-white placeholder-white/20 outline-none transition-all resize-none"
                />
                {errors.message && <p className="text-[10px] text-red-500 mt-1">{errors.message.message as string}</p>}
              </div>

              <motion.button
                type="submit"
                disabled={submitting}
                whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(204,0,0,0.35)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bebas text-sm tracking-widest uppercase rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 relative overflow-hidden group"
              >
                {/* Shimmer sweep on hover */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <span className="relative">
                  {submitting ? "SENDING..." : "SEND MESSAGE"}
                </span>
                {!submitting && (
                  <motion.div
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Send className="w-3.5 h-3.5 relative" />
                  </motion.div>
                )}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
