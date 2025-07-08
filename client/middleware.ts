import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    if (path.startsWith('/api/')) {
        const newUrl = `http://localhost:8080${path.replace('/api', '')}`;
        return NextResponse.rewrite(newUrl);
    }

    return NextResponse.next();
}