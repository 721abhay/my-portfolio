"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Terminal, Cpu, Network, Play, RefreshCw, Server, Database, Lock, Code2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const TABS = [
    { id: "algo", label: "Algorithm Vis", icon: Cpu },
    { id: "ai", label: "AI Model Demo", icon: Network },
    { id: "api", label: "API Playground", icon: Server },
]

export function TechLabSection() {
    const [activeTab, setActiveTab] = useState("algo")
    const [isRunning, setIsRunning] = useState(false)
    const [output, setOutput] = useState<string[]>([])

    // Algorithm State
    const [array, setArray] = useState<number[]>([])

    // AI State
    const [confidence, setConfidence] = useState<{ label: string, score: number }[]>([])

    // API State
    const [apiResponse, setApiResponse] = useState<string | null>(null)

    // Reset/Init
    useEffect(() => {
        if (activeTab === "algo") {
            resetArray()
        } else if (activeTab === "ai") {
            setConfidence([])
        } else if (activeTab === "api") {
            setApiResponse(null)
        }
        setIsRunning(false)
        setOutput([])
    }, [activeTab])

    const resetArray = () => {
        const newArray = Array.from({ length: 15 }, () => Math.floor(Math.random() * 100) + 10)
        setArray(newArray)
    }

    const runSimulation = async () => {
        setIsRunning(true)
        setOutput(["Initializing runtime environment...", ">> Loading modules..."])

        if (activeTab === "algo") {
            await runBubbleSort()
        } else if (activeTab === "ai") {
            await runInference()
        } else if (activeTab === "api") {
            await runApiCall()
        }

        setIsRunning(false)
        setOutput(prev => [...prev, ">> Process finished successfully."])
    }

    const runBubbleSort = async () => {
        const arr = [...array]
        setOutput(prev => [...prev, ">> Starting Bubble Sort..."])

        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    // Swap
                    const temp = arr[j]
                    arr[j] = arr[j + 1]
                    arr[j + 1] = temp
                    setArray([...arr])
                    await new Promise(r => setTimeout(r, 100)) // Animation delay
                }
            }
        }
        setOutput(prev => [...prev, ">> Array sorted."])
    }

    const runInference = async () => {
        setOutput(prev => [...prev, ">> Loading TensorFlow.js model...", ">> Processing input tensor..."])
        await new Promise(r => setTimeout(r, 800))

        const classes = [
            { label: "Neural Network", score: 0.98 },
            { label: "Linear Regression", score: 0.01 },
            { label: "Random Forest", score: 0.01 }
        ]

        setConfidence([{ label: "Processing...", score: 0 }])

        for (const cls of classes) {
            setConfidence(prev => prev.filter(p => p.label !== "Processing...").concat(cls))
            await new Promise(r => setTimeout(r, 400))
        }
        setOutput(prev => [...prev, ">> Classification complete. Confidence: 98%"])
    }

    const runApiCall = async () => {
        setOutput(prev => [...prev, ">> POST /api/v1/secure-data", ">> Headers: { Authorization: 'Bearer ***' }"])
        await new Promise(r => setTimeout(r, 1000))
        const response = {
            status: 200,
            message: "Data retrieved successfully",
            data: {
                users: 1420,
                active_sessions: 45,
                encryption: "AES-256",
                region: "us-east-1"
            },
            latency: "45ms"
        }
        setApiResponse(JSON.stringify(response, null, 2))
        setOutput(prev => [...prev, ">> 200 OK Received."])
    }

    return (
        <section id="tech-lab" className="container px-6 py-24 md:px-12 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10" />

            <ScrollReveal>
                <div className="mb-12 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-wider uppercase mb-4">
                        <Terminal className="w-3 h-3" />
                        <span>Interactive Lab</span>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter md:text-5xl mb-4">
                        The <span className="text-gradient">Playground</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-xl">
                        Explore interactive demos of algorithms, AI models, and system architectures right here in the browser.
                    </p>
                </div>
            </ScrollReveal>

            <div className="grid lg:grid-cols-3 gap-8 h-[600px] lg:h-[500px]">
                {/* Control Panel */}
                <ScrollReveal delay={0.1} className="lg:col-span-1 h-full flex flex-col gap-4">
                    <div className="flex flex-col gap-2 bg-card/50 backdrop-blur-sm border border-white/10 p-2 rounded-2xl">
                        {TABS.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === tab.id
                                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                        : "hover:bg-white/5 text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                <tab.icon className="w-5 h-5" />
                                <span className="font-medium">{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    <div className="flex-1 bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl p-4 font-mono text-xs overflow-y-auto">
                        <div className="flex items-center gap-2 text-muted-foreground border-b border-white/10 pb-2 mb-2">
                            <Terminal className="w-3 h-3" />
                            <span>Console Output</span>
                        </div>
                        <div className="space-y-1">
                            {output.map((line, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={line.startsWith(">>") ? "text-primary" : "text-muted-foreground"}
                                >
                                    {line}
                                </motion.div>
                            ))}
                            {output.length === 0 && <span className="text-muted-foreground/50">Ready to start...</span>}
                        </div>
                    </div>

                    <Button
                        onClick={runSimulation}
                        disabled={isRunning}
                        className="w-full h-12 text-base font-bold tracking-wide"
                        size="lg"
                    >
                        {isRunning ? (
                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                            <Play className="w-4 h-4 mr-2" />
                        )}
                        {isRunning ? "RUNNING..." : "RUN DEMO"}
                    </Button>
                </ScrollReveal>

                {/* Display Panel */}
                <ScrollReveal delay={0.2} className="lg:col-span-2 h-full">
                    <div className="h-full w-full bg-card/30 backdrop-blur-xl border border-white/10 rounded-3xl p-6 relative overflow-hidden shadow-2xl">
                        {/* Header Bar */}
                        <div className="absolute top-0 left-0 right-0 h-10 bg-white/5 border-b border-white/10 flex items-center px-4 gap-2">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                            </div>
                            <div className="ml-4 px-3 py-0.5 rounded-full bg-black/20 text-[10px] font-mono text-muted-foreground border border-white/5">
                                {activeTab === "algo" ? "visualizer.tsx" : activeTab === "ai" ? "model_inference.py" : "api_client.ts"}
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="mt-8 h-[calc(100%-2rem)] flex items-center justify-center">
                            <AnimatePresence mode="wait">
                                {activeTab === "algo" && (
                                    <motion.div
                                        key="algo"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="flex items-end gap-1 md:gap-2 h-64 w-full justify-center px-8"
                                    >
                                        {array.map((value, i) => (
                                            <motion.div
                                                key={i}
                                                layout
                                                className="bg-primary hover:bg-primary/80 transition-colors rounded-t-md w-full max-w-[40px]"
                                                style={{ height: `${value}%` }}
                                            >
                                                <span className="hidden md:block text-[10px] text-center -mt-4 text-black font-bold">{value}</span>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                )}

                                {activeTab === "ai" && (
                                    <motion.div
                                        key="ai"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="w-full max-w-md space-y-6"
                                    >
                                        <div className="flex justify-center mb-8">
                                            <div className="relative w-32 h-32 rounded-2xl bg-gradient-to-br from-primary to-amber-600 flex items-center justify-center shadow-[0_0_50px_rgba(249,115,22,0.3)] animate-pulse">
                                                <Cpu className="w-16 h-16 text-white" />
                                                <div className="absolute inset-0 border-2 border-white/20 rounded-2xl" />
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            {confidence.map((item, i) => (
                                                <div key={i} className="space-y-1">
                                                    <div className="flex justify-between text-sm">
                                                        <span className="font-medium text-foreground">{item.label}</span>
                                                        <span className="text-muted-foreground">{(item.score * 100).toFixed(0)}%</span>
                                                    </div>
                                                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${item.score * 100}%` }}
                                                            className="h-full bg-gradient-to-r from-primary to-amber-500"
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                            {confidence.length === 0 && <p className="text-center text-muted-foreground text-sm">Waiting for input stream...</p>}
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === "api" && (
                                    <motion.div
                                        key="api"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="w-full h-full max-h-[350px] font-mono text-sm"
                                    >
                                        <div className="flex flex-col gap-4 max-w-lg mx-auto">
                                            <div className="flex items-center gap-2 p-3 bg-white/5 rounded-lg border border-white/10">
                                                <span className="px-2 py-0.5 rounded bg-green-500/20 text-green-500 text-xs font-bold border border-green-500/20">POST</span>
                                                <span className="text-muted-foreground">https://api.abhay.dev/v1/secure-data</span>
                                                <Lock className="w-3 h-3 text-primary ml-auto" />
                                            </div>

                                            <div className="p-4 rounded-xl bg-black/40 border border-white/10 h-64 overflow-y-auto">
                                                {apiResponse ? (
                                                    <pre className="text-green-400">
                                                        {apiResponse}
                                                    </pre>
                                                ) : (
                                                    <div className="h-full flex flex-col items-center justify-center text-muted-foreground/40 gap-2">
                                                        <Server className="w-8 h-8" />
                                                        <p>Send request to view response</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    )
}
