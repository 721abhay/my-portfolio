import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get('code')
    const error = searchParams.get('error')

    if (error) {
        // Redirect to home with error
        return NextResponse.redirect(new URL('/?linkedin_error=' + error, request.url))
    }

    if (code) {
        // Redirect to home with code (client will handle token exchange)
        return NextResponse.redirect(new URL('/?linkedin_code=' + code, request.url))
    }

    return NextResponse.redirect(new URL('/', request.url))
}
