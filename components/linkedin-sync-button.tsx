"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { RefreshCw, Linkedin, Check, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { syncLinkedInData, getCachedLinkedInData, shouldSync } from "@/lib/linkedin-sync"

export function LinkedInSyncButton() {
    const [isSyncing, setIsSyncing] = useState(false)
    const [syncStatus, setSyncStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [lastSync, setLastSync] = useState<string | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        // Check if we have a LinkedIn access token
        const token = localStorage.getItem('linkedin_access_token')
        setIsAuthenticated(!!token)

        // Check last sync time
        const { lastSync } = getCachedLinkedInData()
        setLastSync(lastSync)

        // Auto-sync if needed
        if (token && shouldSync()) {
            handleSync()
        }
    }, [])

    const handleLinkedInLogin = () => {
        // Redirect to LinkedIn OAuth
        window.location.href = '/api/linkedin?action=login'
    }

    const handleSync = async () => {
        const token = localStorage.getItem('linkedin_access_token')
        if (!token) {
            handleLinkedInLogin()
            return
        }

        setIsSyncing(true)
        setSyncStatus('idle')

        try {
            await syncLinkedInData(token)
            setSyncStatus('success')
            setLastSync(new Date().toISOString())

            // Reload the page to show updated data
            setTimeout(() => {
                window.location.reload()
            }, 1500)
        } catch (error) {
            console.error('Sync error:', error)
            setSyncStatus('error')

            // If token expired, clear it and prompt re-login
            if (error instanceof Error && error.message.includes('401')) {
                localStorage.removeItem('linkedin_access_token')
                setIsAuthenticated(false)
            }
        } finally {
            setIsSyncing(false)
            setTimeout(() => setSyncStatus('idle'), 3000)
        }
    }

    const formatLastSync = (dateString: string | null) => {
        if (!dateString) return 'Never'

        const date = new Date(dateString)
        const now = new Date()
        const diffMs = now.getTime() - date.getTime()
        const diffMins = Math.floor(diffMs / 60000)
        const diffHours = Math.floor(diffMs / 3600000)
        const diffDays = Math.floor(diffMs / 86400000)

        if (diffMins < 1) return 'Just now'
        if (diffMins < 60) return `${diffMins}m ago`
        if (diffHours < 24) return `${diffHours}h ago`
        return `${diffDays}d ago`
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
            {/* Last Sync Info */}
            <AnimatePresence>
                {lastSync && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="text-xs text-muted-foreground bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full border border-border/50"
                    >
                        Last sync: {formatLastSync(lastSync)}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Sync Button */}
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Button
                    onClick={isAuthenticated ? handleSync : handleLinkedInLogin}
                    disabled={isSyncing}
                    className="rounded-full shadow-lg hover:shadow-xl transition-all gap-2 bg-[#0A66C2] hover:bg-[#004182] text-white"
                    size="lg"
                >
                    {isSyncing ? (
                        <>
                            <RefreshCw className="w-5 h-5 animate-spin" />
                            Syncing...
                        </>
                    ) : syncStatus === 'success' ? (
                        <>
                            <Check className="w-5 h-5" />
                            Synced!
                        </>
                    ) : syncStatus === 'error' ? (
                        <>
                            <X className="w-5 h-5" />
                            Failed
                        </>
                    ) : (
                        <>
                            <Linkedin className="w-5 h-5" />
                            {isAuthenticated ? 'Sync LinkedIn' : 'Connect LinkedIn'}
                        </>
                    )}
                </Button>
            </motion.div>

            {/* Status Message */}
            <AnimatePresence>
                {syncStatus === 'success' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/50 px-4 py-2 rounded-full border border-green-200 dark:border-green-800"
                    >
                        ✓ LinkedIn data synced successfully!
                    </motion.div>
                )}
                {syncStatus === 'error' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/50 px-4 py-2 rounded-full border border-red-200 dark:border-red-800"
                    >
                        ✗ Sync failed. Please try again.
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
