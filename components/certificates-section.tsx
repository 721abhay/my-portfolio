"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Award, X, Download, ExternalLink, Calendar, Building2, Linkedin } from "lucide-react"
import { PremiumCard } from "@/components/premium-card"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getCachedLinkedInData } from "@/lib/linkedin-sync"

interface Certificate {
    id: string
    title: string
    issuer: string
    date: string
    description: string
    image: string
    credentialUrl?: string
    downloadUrl?: string
    skills: string[]
    featured?: boolean
    fromLinkedIn?: boolean
}

// Manual certificates (you can add your own here)
const manualCertificates: Certificate[] = [
    {
        id: "1",
        title: "AWS Certified Solutions Architect",
        issuer: "Amazon Web Services",
        date: "December 2024",
        description: "Professional certification demonstrating expertise in designing distributed systems on AWS.",
        image: "/placeholder.jpg", // Replace with your certificate: /certificates/aws-cert.png
        credentialUrl: "https://aws.amazon.com/verification",
        skills: ["AWS", "Cloud Architecture", "DevOps"],
        featured: true,
    },
    {
        id: "2",
        title: "Full Stack Web Development",
        issuer: "Coursera",
        date: "November 2024",
        description: "Comprehensive course covering modern web development with React, Node.js, and databases.",
        image: "/placeholder.jpg", // Replace with your certificate: /certificates/fullstack-cert.png
        credentialUrl: "https://coursera.org/verify",
        skills: ["React", "Node.js", "MongoDB"],
        featured: true,
    },
    {
        id: "3",
        title: "Machine Learning Specialization",
        issuer: "Stanford Online",
        date: "October 2024",
        description: "Advanced machine learning concepts including neural networks and deep learning.",
        image: "/placeholder.jpg", // Replace with your certificate: /certificates/ml-cert.png
        credentialUrl: "https://stanford.edu/verify",
        skills: ["Python", "TensorFlow", "ML"],
    },
    // Add more certificates here - see HOW_TO_ADD_CONTENT.md for instructions
]

export function CertificatesSection() {
    const [selectedCert, setSelectedCert] = useState<Certificate | null>(null)
    const [filter, setFilter] = useState<"all" | "featured">("all")
    const [allCertificates, setAllCertificates] = useState<Certificate[]>(manualCertificates)

    // Load LinkedIn certificates on mount
    useEffect(() => {
        const { certificates: linkedInCerts } = getCachedLinkedInData()
        if (linkedInCerts && linkedInCerts.length > 0) {
            // Mark LinkedIn certificates
            const markedLinkedInCerts = linkedInCerts.map((cert: Certificate) => ({
                ...cert,
                fromLinkedIn: true,
            }))

            // Merge with manual certificates (LinkedIn first)
            setAllCertificates([...markedLinkedInCerts, ...manualCertificates])
        }
    }, [])

    const filteredCertificates = filter === "all"
        ? allCertificates
        : allCertificates.filter(cert => cert.featured)

    return (
        <section id="certificates" className="relative py-32 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />

            <div className="container relative z-10 mx-auto px-4">
                {/* Section Header */}
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
                        >
                            <Award className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium text-primary">Certifications & Achievements</span>
                        </motion.div>

                        <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                            Professional Certifications
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Continuous learning and professional development through industry-recognized certifications
                        </p>
                    </div>
                </ScrollReveal>

                {/* Filter Tabs */}
                <ScrollReveal delay={0.1}>
                    <div className="flex justify-center gap-4 mb-12">
                        <Button
                            variant={filter === "all" ? "default" : "outline"}
                            onClick={() => setFilter("all")}
                            className="rounded-full"
                        >
                            All Certificates
                        </Button>
                        <Button
                            variant={filter === "featured" ? "default" : "outline"}
                            onClick={() => setFilter("featured")}
                            className="rounded-full"
                        >
                            Featured
                        </Button>
                    </div>
                </ScrollReveal>

                {/* Certificates Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredCertificates.map((cert, index) => (
                        <ScrollReveal key={cert.id} delay={index * 0.1}>
                            <div
                                className="cursor-pointer"
                                onClick={() => setSelectedCert(cert)}
                            >
                                <PremiumCard className="group h-full">
                                    <div className="relative h-48 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5">
                                        {/* Certificate Image */}
                                        <Image
                                            src={cert.image}
                                            alt={cert.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />

                                        {/* Featured Badge */}
                                        {cert.featured && (
                                            <div className="absolute top-3 right-3">
                                                <Badge className="bg-primary/90 backdrop-blur-sm">
                                                    Featured
                                                </Badge>
                                            </div>
                                        )}

                                        {/* LinkedIn Badge */}
                                        {cert.fromLinkedIn && (
                                            <div className="absolute top-3 left-3">
                                                <Badge className="bg-[#0A66C2]/90 backdrop-blur-sm gap-1">
                                                    <Linkedin className="w-3 h-3" />
                                                    LinkedIn
                                                </Badge>
                                            </div>
                                        )}

                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <Button size="sm" variant="secondary" className="gap-2">
                                                <ExternalLink className="w-4 h-4" />
                                                View Details
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Certificate Info */}
                                    <div className="space-y-3">
                                        <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                                            {cert.title}
                                        </h3>

                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Building2 className="w-4 h-4" />
                                            <span>{cert.issuer}</span>
                                        </div>

                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Calendar className="w-4 h-4" />
                                            <span>{cert.date}</span>
                                        </div>

                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                            {cert.description}
                                        </p>

                                        {/* Skills Tags */}
                                        <div className="flex flex-wrap gap-2 pt-2">
                                            {cert.skills.map((skill) => (
                                                <Badge key={skill} variant="outline" className="text-xs">
                                                    {skill}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </PremiumCard>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Certificate Modal */}
                <AnimatePresence>
                    {selectedCert && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
                            onClick={() => setSelectedCert(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                transition={{ type: "spring", damping: 25 }}
                                className="relative max-w-4xl w-full max-h-[90vh] overflow-auto"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <PremiumCard className="p-8">
                                    {/* Close Button */}
                                    <button
                                        onClick={() => setSelectedCert(null)}
                                        className="absolute top-4 right-4 p-2 rounded-full bg-background/50 hover:bg-background transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>

                                    {/* Certificate Image */}
                                    <div className="relative h-96 mb-6 rounded-lg overflow-hidden">
                                        <Image
                                            src={selectedCert.image}
                                            alt={selectedCert.title}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>

                                    {/* Certificate Details */}
                                    <div className="space-y-4">
                                        <h2 className="text-3xl font-bold">{selectedCert.title}</h2>

                                        <div className="flex items-center gap-4 text-muted-foreground">
                                            <div className="flex items-center gap-2">
                                                <Building2 className="w-5 h-5" />
                                                <span>{selectedCert.issuer}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-5 h-5" />
                                                <span>{selectedCert.date}</span>
                                            </div>
                                        </div>

                                        <p className="text-lg text-muted-foreground">
                                            {selectedCert.description}
                                        </p>

                                        {/* Skills */}
                                        <div className="flex flex-wrap gap-2">
                                            {selectedCert.skills.map((skill) => (
                                                <Badge key={skill} variant="secondary">
                                                    {skill}
                                                </Badge>
                                            ))}
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-4 pt-4">
                                            {selectedCert.credentialUrl && (
                                                <Button asChild className="gap-2">
                                                    <a href={selectedCert.credentialUrl} target="_blank" rel="noopener noreferrer">
                                                        <ExternalLink className="w-4 h-4" />
                                                        View Credential
                                                    </a>
                                                </Button>
                                            )}
                                            {selectedCert.downloadUrl && (
                                                <Button variant="outline" asChild className="gap-2">
                                                    <a href={selectedCert.downloadUrl} download>
                                                        <Download className="w-4 h-4" />
                                                        Download
                                                    </a>
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </PremiumCard>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    )
}
