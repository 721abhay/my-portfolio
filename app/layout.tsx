import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono, Bebas_Neue } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })
const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" })

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf9" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL("https://abhay-portfolio.vercel.app"),
  title: "Abhay Vishwakarma | Top 1% Full Stack Developer & AI Engineer",
  description: "Portfolio of Abhay Vishwakarma. Building world-class digital experiences with Next.js, AI, and modern web technologies. Specialized in high-performance web apps and intelligent systems.",
  keywords: ["Full Stack Developer", "AI Engineer", "Next.js", "React", "TypeScript", "Machine Learning", "Web Development", "Software Engineer", "Portfolio"],
  authors: [{ name: "Abhay Vishwakarma", url: "https://abhay.dev" }],
  creator: "Abhay Vishwakarma",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://abhay.dev",
    title: "Abhay Vishwakarma | Top 1% Full Stack Developer",
    description: "Building world-class digital experiences with Next.js, AI, and modern web technologies.",
    siteName: "Abhay Vishwakarma Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Abhay Vishwakarma Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhay Vishwakarma | Full Stack Developer",
    description: "Building world-class digital experiences with Next.js, AI, and modern web technologies.",
    creator: "@abhaydev", // Placeholder
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`font-sans antialiased ${geist.variable} ${geistMono.variable} ${bebasNeue.variable} selection:bg-orange-500 selection:text-white`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
