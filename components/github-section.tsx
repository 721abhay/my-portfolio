"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ScrollReveal } from "@/components/scroll-reveal"
import { GitBranch, GitCommit, GitPullRequest, Star, GitFork, Activity, Calendar, Trophy, Sparkles } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function GitHubSection() {
    const [stats, setStats] = useState([
        { icon: Activity, label: "Total Contributions", value: "-", color: "#f97316", bg: "from-orange-500/20 to-orange-500/5", border: "group-hover:border-orange-500/50" },
        { icon: Star, label: "Stars Earned", value: "-", color: "#eab308", bg: "from-yellow-500/20 to-yellow-500/5", border: "group-hover:border-yellow-500/50" },
        { icon: GitFork, label: "Repositories", value: "-", color: "#ef4444", bg: "from-red-500/20 to-red-500/5", border: "group-hover:border-red-500/50" },
        { icon: Trophy, label: "Followers", value: "-", color: "#3b82f6", bg: "from-blue-500/20 to-blue-500/5", border: "group-hover:border-blue-500/50" },
    ])

    const [activity, setActivity] = useState<any[]>([])
    const [contributions, setContributions] = useState<number[][]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. Fetch Real Data via our API Route (GraphQL)
                const res = await fetch("/api/github")
                if (res.ok) {
                    const data = await res.json()

                    // Calculate Stats
                    const totalContributions = data.contributionsCollection.contributionCalendar.totalContributions
                    const totalStars = data.repositories.nodes.reduce((acc: number, repo: any) => acc + repo.stargazerCount, 0)
                    const totalRepos = data.repositories.totalCount
                    const followers = data.followers.totalCount

                    setStats([
                        { icon: Activity, label: "Total Contributions", value: totalContributions.toLocaleString(), color: "#f97316", bg: "from-orange-500/20 to-orange-500/5", border: "group-hover:border-orange-500/50" },
                        { icon: Star, label: "Stars Earned", value: totalStars.toLocaleString(), color: "#eab308", bg: "from-yellow-500/20 to-yellow-500/5", border: "group-hover:border-yellow-500/50" },
                        { icon: GitFork, label: "Repositories", value: totalRepos.toLocaleString(), color: "#ef4444", bg: "from-red-500/20 to-red-500/5", border: "group-hover:border-red-500/50" },
                        { icon: Trophy, label: "Followers", value: followers.toLocaleString(), color: "#3b82f6", bg: "from-blue-500/20 to-blue-500/5", border: "group-hover:border-blue-500/50" },
                    ])

                    // Process Contributions Grid
                    const weeks = data.contributionsCollection.contributionCalendar.weeks
                    const grid = weeks.map((week: any) =>
                        week.contributionDays.map((day: any) => day.contributionCount)
                    )
                    setContributions(grid)
                } else {
                    console.error("Failed to fetch contribution data. Check GITHUB_TOKEN.")
                    setError(true)
                }

                // 2. Fetch Recent Events (Public API) for the Feed
                const eventsRes = await fetch("https://api.github.com/users/721abhay/events?per_page=8")
                if (eventsRes.ok) {
                    const eventsData = await eventsRes.json()

                    if (Array.isArray(eventsData)) {
                        const mappedActivity = eventsData.map((event: any) => {
                            let type = "commit"
                            let message = "Updated repository"
                            let icon = GitCommit
                            let color = "text-orange-500"
                            let bg = "bg-orange-500/10"

                            if (event.type === "PushEvent") {
                                type = "commit"
                                message = event.payload.commits?.[0]?.message || "Pushed code"
                                icon = GitCommit
                                color = "text-orange-500"
                                bg = "bg-orange-500/10"
                            } else if (event.type === "PullRequestEvent") {
                                type = "pr"
                                message = event.payload.pull_request?.title || "Opened Pull Request"
                                icon = GitPullRequest
                                color = "text-purple-500"
                                bg = "bg-purple-500/10"
                            } else if (event.type === "WatchEvent") {
                                type = "star"
                                message = "Starred repository"
                                icon = Star
                                color = "text-yellow-500"
                                bg = "bg-yellow-500/10"
                            } else if (event.type === "CreateEvent") {
                                type = "create"
                                message = `Created ${event.payload.ref_type || "repository"}`
                                icon = Sparkles
                                color = "text-green-500"
                                bg = "bg-green-500/10"
                            } else if (event.type === "ForkEvent") {
                                type = "fork"
                                message = `Forked ${event.payload.forkee?.full_name}`
                                icon = GitFork
                                color = "text-blue-500"
                                bg = "bg-blue-500/10"
                            }

                            // Format time
                            const date = new Date(event.created_at)
                            const now = new Date()
                            const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
                            const timeStr = diffInHours < 1
                                ? "Just now"
                                : diffInHours < 24
                                    ? `${diffInHours}h ago`
                                    : `${Math.floor(diffInHours / 24)}d ago`

                            return {
                                type,
                                repo: event.repo.name.replace("721abhay/", ""),
                                message,
                                time: timeStr,
                                icon,
                                color,
                                bg
                            }
                        })
                        setActivity(mappedActivity)
                    }
                }

            } catch (err) {
                console.error("Error fetching GitHub data:", err)
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    return (
        <section id="github" className="container px-6 py-24 md:px-12 relative overflow-hidden">
            {/* Dynamic Background Elements */}
            <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] -z-10" />

            <ScrollReveal>
                <div className="mb-16 text-center space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-sm font-medium text-primary">
                        <GitBranch className="h-4 w-4" />
                        <span>OPEN SOURCE</span>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter md:text-5xl">
                        GitHub <span className="text-gradient">Activity</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Tracking my open source contributions and recent commits in real-time.
                    </p>
                </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Stats Cards - Left Column */}
                <div className="lg:col-span-4 space-y-4">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon
                        return (
                            <ScrollReveal key={index} delay={index * 0.1} width="100%">
                                <motion.div
                                    whileHover={{ x: 5, scale: 1.02 }}
                                    className={`group relative overflow-hidden rounded-2xl border border-border/50 bg-card/30 backdrop-blur-md p-5 transition-all duration-300 hover:shadow-lg ${stat.border}`}
                                >
                                    {/* Gradient Background Effect */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                    <div className="relative z-10 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div
                                                className="p-3.5 rounded-xl bg-background/80 shadow-sm border border-border/50 group-hover:scale-110 transition-transform duration-300"
                                            >
                                                <Icon className="h-6 w-6" style={{ color: stat.color }} />
                                            </div>
                                            <div>
                                                <p className="text-3xl font-bold tracking-tight text-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-foreground group-hover:to-foreground/70 transition-all">
                                                    {stat.value}
                                                </p>
                                                <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground/80 transition-colors">{stat.label}</p>
                                            </div>
                                        </div>

                                        {/* Decorative Sparkle */}
                                        <Sparkles className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity text-primary absolute right-2 top-2" />
                                    </div>
                                </motion.div>
                            </ScrollReveal>
                        )
                    })}

                    <ScrollReveal delay={0.4} width="100%">
                        <Button
                            asChild
                            className="w-full rounded-2xl h-14 text-base font-semibold shadow-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 hover:shadow-orange-500/20 transition-all duration-300"
                        >
                            <Link href="https://github.com/721abhay" target="_blank" className="flex items-center justify-center gap-2">
                                <GitBranch className="h-5 w-5" />
                                View Full GitHub Profile
                                <span className="sr-only">opens in a new tab</span>
                            </Link>
                        </Button>
                    </ScrollReveal>
                </div>

                {/* Activity Feed & Graph - Right Column */}
                <ScrollReveal delay={0.2} className="lg:col-span-8 h-full">
                    <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-card/30 backdrop-blur-md flex flex-col h-full shadow-2xl shadow-black/5">
                        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

                        <div className="p-8 h-full flex flex-col">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h3 className="text-2xl font-bold flex items-center gap-2">
                                        <Activity className="h-5 w-5 text-primary" />
                                        Recent Activity
                                    </h3>
                                    <p className="text-sm text-muted-foreground mt-1">Live updates from the code forge</p>
                                </div>
                                <div className="hidden md:flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full bg-green-500/10 text-green-500 border border-green-500/20 animate-pulse">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                    </span>
                                    Live
                                </div>
                            </div>

                            {/* Timeline Feed */}
                            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar relative pl-4 max-h-[400px] [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-muted [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/50">
                                {/* Vertical Connector Line */}
                                <div className="absolute left-[27px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-border via-border/50 to-transparent" />

                                <div className="space-y-6">
                                    {activity.length === 0 ? (
                                        <div className="text-center py-20">
                                            {loading ? (
                                                <div className="flex flex-col items-center gap-3">
                                                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent" />
                                                    <p className="text-muted-foreground animate-pulse">Syncing with GitHub...</p>
                                                </div>
                                            ) : (
                                                <div className="space-y-2 text-muted-foreground">
                                                    <Activity className="h-10 w-10 mx-auto opacity-20" />
                                                    <p>No recent public activity found.</p>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        activity.map((item, index) => {
                                            const Icon = item.icon
                                            return (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: index * 0.05 }}
                                                    viewport={{ once: true }}
                                                    className="group relative flex gap-4 items-start"
                                                >
                                                    {/* Timeline Node */}
                                                    <div className={`relative z-10 flex-shrink-0 h-7 w-7 rounded-full ${item.bg} border border-border flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                                                        <Icon className={`h-3.5 w-3.5 ${item.color}`} />
                                                    </div>

                                                    {/* Card Content */}
                                                    <div className="flex-1 min-w-0 rounded-xl bg-background/40 border border-border/50 p-4 hover:bg-background/60 hover:border-primary/20 transition-all duration-300 group-hover:translate-x-1">
                                                        <div className="flex justify-between items-start gap-2">
                                                            <Link href={`https://github.com/721abhay/${item.repo}`} target="_blank" className="font-semibold text-sm hover:text-primary transition-colors truncate block max-w-[200px] md:max-w-xs">
                                                                {item.repo}
                                                            </Link>
                                                            <span className="text-[10px] font-mono whitespace-nowrap text-muted-foreground/60 bg-muted/50 px-2 py-0.5 rounded-full">{item.time}</span>
                                                        </div>
                                                        <p className="text-sm text-muted-foreground mt-1 leading-relaxed line-clamp-2 group-hover:text-foreground transition-colors">
                                                            {item.message}
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            )
                                        })
                                    )}
                                </div>
                            </div>

                            {/* Contribution Graph */}
                            <div className="mt-8 pt-6 border-t border-border/50">
                                <div className="flex justify-between items-end mb-4">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-primary" />
                                        <p className="text-sm font-medium">Contribution Graph</p>
                                    </div>
                                    {error && <p className="text-xs text-red-400 bg-red-500/10 px-2 py-1 rounded">Update GITHUB_TOKEN in .env</p>}
                                </div>

                                <div className="w-full overflow-x-auto pb-4 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-muted [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/50">
                                    <div className="min-w-[760px]">
                                        <div className="grid grid-cols-[repeat(53,1fr)] gap-[3px]">
                                            {contributions.length > 0 ? (
                                                contributions.map((week, weekIndex) => (
                                                    <div key={weekIndex} className="space-y-[3px]">
                                                        {week.map((count, dayIndex) => (
                                                            <motion.div
                                                                key={dayIndex}
                                                                initial={{ scale: 0 }}
                                                                whileInView={{ scale: 1 }}
                                                                transition={{ delay: (weekIndex * 0.005) + (dayIndex * 0.01) }}
                                                                viewport={{ once: true }}
                                                                whileHover={{ scale: 1.4, zIndex: 20 }}
                                                                className={`w-full aspect-square rounded-[2px] transition-all cursor-pointer relative group nav-item ${count === 0
                                                                        ? "bg-black/5 dark:bg-white/5"
                                                                        : ""
                                                                    }`}
                                                                style={count > 0 ? {
                                                                    backgroundColor: `hsl(var(--primary) / ${Math.min(0.4 + (count / 10) * 0.6, 1)})`
                                                                } : undefined}
                                                            >
                                                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-popover text-popover-foreground text-[10px] font-medium rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                                                                    {count} contributions
                                                                </div>
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                ))
                                            ) : (
                                                // Loading Skeleton - Ensure contrast
                                                Array.from({ length: 53 }).map((_, i) => (
                                                    <div key={i} className="space-y-[3px]">
                                                        {Array.from({ length: 7 }).map((_, j) => (
                                                            <div key={j} className="w-full aspect-square rounded-[2px] bg-black/5 dark:bg-white/5 animate-pulse" />
                                                        ))}
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    )
}
