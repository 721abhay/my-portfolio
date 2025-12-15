"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ScrollReveal } from "@/components/scroll-reveal"
import { GitBranch, GitCommit, GitPullRequest, Star, GitFork, Activity } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function GitHubSection() {
    const [stats, setStats] = useState([
        { icon: Activity, label: "Total Contributions", value: "-", color: "#f97316" },
        { icon: Star, label: "Stars Earned", value: "-", color: "#facc15" },
        { icon: GitFork, label: "Repositories", value: "-", color: "#ef4444" },
        { icon: Activity, label: "Followers", value: "-", color: "#3b82f6" },
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
                        { icon: Activity, label: "Total Contributions", value: totalContributions.toLocaleString(), color: "#f97316" },
                        { icon: Star, label: "Stars Earned", value: totalStars.toLocaleString(), color: "#facc15" },
                        { icon: GitFork, label: "Repositories", value: totalRepos.toLocaleString(), color: "#ef4444" },
                        { icon: Activity, label: "Followers", value: followers.toLocaleString(), color: "#3b82f6" },
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
                const eventsRes = await fetch("https://api.github.com/users/721abhay/events?per_page=6")
                if (eventsRes.ok) {
                    const eventsData = await eventsRes.json()

                    if (Array.isArray(eventsData)) {
                        const mappedActivity = eventsData.map((event: any) => {
                            let type = "commit"
                            let message = "Updated repository"

                            if (event.type === "PushEvent") {
                                type = "commit"
                                message = event.payload.commits?.[0]?.message || "Pushed code"
                            } else if (event.type === "PullRequestEvent") {
                                type = "pr"
                                message = event.payload.pull_request?.title || "Opened Pull Request"
                            } else if (event.type === "WatchEvent") {
                                type = "star"
                                message = "Starred repository"
                            } else if (event.type === "CreateEvent") {
                                type = "create"
                                message = `Created ${event.payload.ref_type || "repository"}`
                            } else if (event.type === "ForkEvent") {
                                type = "fork"
                                message = `Forked ${event.payload.forkee?.full_name}`
                            }

                            // Format time
                            const date = new Date(event.created_at)
                            const now = new Date()
                            const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
                            const timeStr = diffInHours < 24
                                ? `${diffInHours} hours ago`
                                : `${Math.floor(diffInHours / 24)} days ago`

                            return {
                                type,
                                repo: event.repo.name.replace("721abhay/", ""),
                                message,
                                time: timeStr
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
        <section id="github" className="container px-6 py-24 md:px-12">
            <ScrollReveal>
                <div className="mb-16 text-center space-y-4">
                    <div className="inline-block rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-sm font-medium text-primary">
                        OPEN SOURCE
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter md:text-5xl">
                        GitHub <span className="text-gradient">Activity</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Real-time updates from my open source contributions.
                    </p>
                </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Stats Cards */}
                <div className="lg:col-span-1 space-y-4">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon
                        return (
                            <ScrollReveal key={index} delay={index * 0.1}>
                                <motion.div
                                    whileHover={{ x: 8 }}
                                    className="group relative overflow-hidden rounded-xl border border-border bg-card/50 backdrop-blur-sm p-4 transition-all hover:border-primary/50 hover:shadow-lg"
                                >
                                    <div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity"
                                        style={{ backgroundColor: stat.color }}
                                    />
                                    <div className="relative z-10 flex items-center gap-4">
                                        <div
                                            className="p-3 rounded-lg"
                                            style={{ backgroundColor: `${stat.color}20` }}
                                        >
                                            <Icon className="h-5 w-5" style={{ color: stat.color }} />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold" style={{ color: stat.color }}>
                                                {stat.value}
                                            </p>
                                            <p className="text-sm text-muted-foreground">{stat.label}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </ScrollReveal>
                        )
                    })}

                    <ScrollReveal delay={0.4}>
                        <Button
                            asChild
                            className="w-full rounded-xl h-12 bg-gradient-to-r from-orange-500 to-amber-600 hover:opacity-90 transition-opacity"
                        >
                            <Link href="https://github.com/721abhay" target="_blank">
                                <GitBranch className="mr-2 h-4 w-4" />
                                View Full Profile
                            </Link>
                        </Button>
                    </ScrollReveal>
                </div>

                {/* Activity Feed */}
                <ScrollReveal delay={0.2} className="lg:col-span-2">
                    <div className="relative overflow-hidden rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 h-full flex flex-col">
                        <div className="mb-6">
                            <h3 className="text-xl font-bold mb-2">Recent Activity</h3>
                            <p className="text-sm text-muted-foreground">Live feed from GitHub</p>
                        </div>

                        <div className="space-y-4 flex-1">
                            {activity.length === 0 ? (
                                <div className="text-center py-10 text-muted-foreground">
                                    {loading ? "Syncing with GitHub..." : "No recent public activity found."}
                                </div>
                            ) : (
                                activity.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        whileHover={{ x: 4 }}
                                        className="group relative overflow-hidden rounded-xl border border-border bg-background/50 p-4 transition-all hover:border-primary/50"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="mt-1">
                                                {item.type === "commit" && (
                                                    <div className="p-2 rounded-lg bg-orange-500/10">
                                                        <GitCommit className="h-4 w-4 text-orange-500" />
                                                    </div>
                                                )}
                                                {item.type === "pr" && (
                                                    <div className="p-2 rounded-lg bg-amber-500/10">
                                                        <GitPullRequest className="h-4 w-4 text-amber-500" />
                                                    </div>
                                                )}
                                                {item.type === "star" && (
                                                    <div className="p-2 rounded-lg bg-red-500/10">
                                                        <Star className="h-4 w-4 text-red-500" />
                                                    </div>
                                                )}
                                                {item.type === "create" && (
                                                    <div className="p-2 rounded-lg bg-blue-500/10">
                                                        <Activity className="h-4 w-4 text-blue-500" />
                                                    </div>
                                                )}
                                                {item.type === "fork" && (
                                                    <div className="p-2 rounded-lg bg-purple-500/10">
                                                        <GitFork className="h-4 w-4 text-purple-500" />
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-sm mb-1 group-hover:text-primary transition-colors">
                                                    {item.repo}
                                                </p>
                                                <p className="text-sm text-muted-foreground line-clamp-1">
                                                    {item.message}
                                                </p>
                                                <p className="text-xs text-muted-foreground/60 mt-2">{item.time}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Contribution Graph */}
                        <div className="mt-8 pt-8 border-t border-border">
                            <div className="flex justify-between items-end mb-4">
                                <p className="text-sm text-muted-foreground">Contribution Graph (Last Year)</p>
                                {error && <p className="text-xs text-red-400">Add GITHUB_TOKEN to .env.local to see graph</p>}
                            </div>

                            <div className="w-full overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
                                <div className="min-w-[700px]">
                                    <div className="grid grid-cols-[repeat(53,1fr)] gap-1">
                                        {contributions.length > 0 ? (
                                            contributions.map((week, weekIndex) => (
                                                <div key={weekIndex} className="space-y-1">
                                                    {week.map((count, dayIndex) => (
                                                        <motion.div
                                                            key={dayIndex}
                                                            initial={{ scale: 0 }}
                                                            whileInView={{ scale: 1 }}
                                                            transition={{ delay: (weekIndex * 0.01) + (dayIndex * 0.001) }} // Optimized delay
                                                            viewport={{ once: true }}
                                                            whileHover={{ scale: 1.5, zIndex: 10 }}
                                                            className="w-full aspect-square rounded-[2px] transition-all cursor-pointer relative group"
                                                            style={{
                                                                backgroundColor: count === 0
                                                                    ? "hsl(var(--muted))"
                                                                    : `hsl(var(--primary) / ${Math.min(0.3 + (count / 10) * 0.7, 1)})`
                                                            }}
                                                        >
                                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                                                                {count} contributions
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            ))
                                        ) : (
                                            // Loading Skeleton
                                            Array.from({ length: 53 }).map((_, i) => (
                                                <div key={i} className="space-y-1">
                                                    {Array.from({ length: 7 }).map((_, j) => (
                                                        <div key={j} className="w-full aspect-square rounded-[2px] bg-muted/50 animate-pulse" />
                                                    ))}
                                                </div>
                                            ))
                                        )}
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
