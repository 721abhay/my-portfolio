/**
 * LinkedIn Profile Sync Utility
 * Automatically syncs certificates and projects from LinkedIn
 */

interface LinkedInCertificate {
    name: string
    authority: string
    licenseNumber?: string
    startDate: {
        month: number
        year: number
    }
    url?: string
}

interface LinkedInProject {
    title: string
    description: string
    url?: string
    startDate: {
        month: number
        year: number
    }
    endDate?: {
        month: number
        year: number
    }
    members?: Array<{
        name: string
    }>
}

interface LinkedInProfile {
    certificates: LinkedInCertificate[]
    projects: LinkedInProject[]
}

/**
 * Fetch LinkedIn profile data
 * Note: This requires LinkedIn API access token
 */
export async function fetchLinkedInProfile(accessToken: string): Promise<LinkedInProfile> {
    try {
        const response = await fetch('https://api.linkedin.com/v2/me', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            throw new Error('Failed to fetch LinkedIn profile')
        }

        const data = await response.json()

        // Fetch certificates
        const certificatesResponse = await fetch(
            'https://api.linkedin.com/v2/certifications?q=member&member=me',
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            }
        )

        // Fetch projects
        const projectsResponse = await fetch(
            'https://api.linkedin.com/v2/projects?q=member&member=me',
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            }
        )

        const certificates = certificatesResponse.ok ? await certificatesResponse.json() : { elements: [] }
        const projects = projectsResponse.ok ? await projectsResponse.json() : { elements: [] }

        return {
            certificates: certificates.elements || [],
            projects: projects.elements || [],
        }
    } catch (error) {
        console.error('Error fetching LinkedIn profile:', error)
        throw error
    }
}

/**
 * Convert LinkedIn certificate to portfolio format
 */
export function convertLinkedInCertificate(cert: LinkedInCertificate) {
    const date = new Date(cert.startDate.year, cert.startDate.month - 1)
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December']

    return {
        id: cert.licenseNumber || `cert-${Date.now()}`,
        title: cert.name,
        issuer: cert.authority,
        date: `${monthNames[date.getMonth()]} ${date.getFullYear()}`,
        description: `Professional certification from ${cert.authority}`,
        image: "/placeholder.jpg", // You'll need to add actual images
        credentialUrl: cert.url,
        skills: [], // Extract from description if available
        featured: false,
    }
}

/**
 * Convert LinkedIn project to portfolio format
 */
export function convertLinkedInProject(project: LinkedInProject) {
    const startDate = new Date(project.startDate.year, project.startDate.month - 1)
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December']

    return {
        id: `project-${Date.now()}`,
        title: project.title,
        category: "Full Stack" as const, // Default category
        description: project.description.substring(0, 150) + '...',
        longDescription: project.description,
        tags: [], // Extract from description if available
        image: "/placeholder.jpg", // You'll need to add actual images
        demo: project.url,
        date: `${monthNames[startDate.getMonth()]} ${startDate.getFullYear()}`,
        team: project.members ? `${project.members.length} members` : undefined,
        featured: false,
        highlights: [],
    }
}

/**
 * Sync LinkedIn data to local storage
 */
export async function syncLinkedInData(accessToken: string) {
    try {
        const profile = await fetchLinkedInProfile(accessToken)

        const certificates = profile.certificates.map(convertLinkedInCertificate)
        const projects = profile.projects.map(convertLinkedInProject)

        // Store in localStorage for client-side access
        if (typeof window !== 'undefined') {
            localStorage.setItem('linkedin_certificates', JSON.stringify(certificates))
            localStorage.setItem('linkedin_projects', JSON.stringify(projects))
            localStorage.setItem('linkedin_last_sync', new Date().toISOString())
        }

        return { certificates, projects }
    } catch (error) {
        console.error('Error syncing LinkedIn data:', error)
        throw error
    }
}

/**
 * Get cached LinkedIn data
 */
export function getCachedLinkedInData() {
    if (typeof window === 'undefined') {
        return { certificates: [], projects: [], lastSync: null }
    }

    const certificates = JSON.parse(localStorage.getItem('linkedin_certificates') || '[]')
    const projects = JSON.parse(localStorage.getItem('linkedin_projects') || '[]')
    const lastSync = localStorage.getItem('linkedin_last_sync')

    return { certificates, projects, lastSync }
}

/**
 * Check if sync is needed (older than 24 hours)
 */
export function shouldSync(): boolean {
    if (typeof window === 'undefined') return false

    const lastSync = localStorage.getItem('linkedin_last_sync')
    if (!lastSync) return true

    const lastSyncDate = new Date(lastSync)
    const now = new Date()
    const hoursSinceSync = (now.getTime() - lastSyncDate.getTime()) / (1000 * 60 * 60)

    return hoursSinceSync >= 24
}
