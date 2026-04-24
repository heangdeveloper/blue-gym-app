import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function proxy(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const { pathname } = request.nextUrl;

    const isAuthPage = pathname.startsWith("/login");
    const isDashboard = pathname.startsWith("/dashboard");

    // 🔒 Protect dashboard
    if (!token && isDashboard) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // 🚫 Prevent logged-in users from login page
    if (token && isAuthPage) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/login"],
}