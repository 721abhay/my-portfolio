import { NextRequest, NextResponse } from 'next/server'

/**
 * LinkedIn OAuth Configuration
 * Add these to your .env.local:
 * LINKEDIN_CLIENT_ID=your_client_id
 * LINKEDIN_CLIENT_SECRET=your_client_secret
 * LINKEDIN_REDIRECT_URI=http://localhost:3000/api/linkedin/callback
 */

const LINKEDIN_AUTH_URL = 'https://www.linkedin.com/oauth/v2/authorization'
const LINKEDIN_TOKEN_URL = 'https://www.linkedin.com/oauth/v2/accessToken'

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const action = searchParams.get('action')

    if (action === 'login') {
        // Redirect to LinkedIn OAuth
        const clientId = process.env.LINKEDIN_CLIENT_ID
        const redirectUri = process.env.LINKEDIN_REDIRECT_URI || 'http://localhost:3000/api/linkedin/callback'
        const scope = 'r_liteprofile r_emailaddress w_member_social'

        const authUrl = `${LINKEDIN_AUTH_URL}?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`

        return NextResponse.redirect(authUrl)
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
}

export async function POST(request: NextRequest) {
    try {
        const { code } = await request.json()

        if (!code) {
            return NextResponse.json({ error: 'Authorization code required' }, { status: 400 })
        }

        // Exchange code for access token
        const tokenResponse = await fetch(LINKEDIN_TOKEN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                code,
                client_id: process.env.LINKEDIN_CLIENT_ID!,
                client_secret: process.env.LINKEDIN_CLIENT_SECRET!,
                redirect_uri: process.env.LINKEDIN_REDIRECT_URI || 'http://localhost:3000/api/linkedin/callback',
            }),
        })

        if (!tokenResponse.ok) {
            throw new Error('Failed to get access token')
        }

        const tokenData = await tokenResponse.json()

        return NextResponse.json({
            access_token: tokenData.access_token,
            expires_in: tokenData.expires_in,
        })
    } catch (error) {
        console.error('LinkedIn auth error:', error)
        return NextResponse.json({ error: 'Authentication failed' }, { status: 500 })
    }
}
