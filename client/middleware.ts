import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    if (pathname.startsWith('/api')) {
        // Remove the '/api' prefix from the path
        const newPath = pathname.replace('/api', '')

        // Construct the new URL for your Express backend
        const backendUrl = `http://localhost:8080${newPath}`

        // Rewrite the request to the backend URL
        return NextResponse.rewrite(backendUrl)
    }

    return NextResponse.next()
}