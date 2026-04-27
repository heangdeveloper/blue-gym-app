import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 1. Specify protected and public routes
const protectedRoutes = ['/dashboard']
const publicRoutes = ['/login']

export default async function proxy(request: NextRequest) {
    // 2. Check if the current route is protected or public
    const path = request.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)

    // 3. Decrypt the token from the cookie
    const token = request.cookies.get('auth_token')?.value

    // 4. Redirect to /login if the user is not authenticated
    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }

    // 5. Redirect to /dashboard if the user is authenticated
    if (isPublicRoute && token) {
        return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/login"],
};