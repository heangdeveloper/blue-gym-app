import { NextResponse } from "next/server";
import '@/../envConfig'; // Load environment variables

export async function POST(request: Request) {
    const credentials = await request.json();
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const csrfRes = await fetch(`${API_URL}/sanctum/csrf-cookie`, {
        method: 'GET',
    });

    const setCookie = csrfRes.headers.get('set-cookie');

    const loginRes = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Cookie': setCookie || '', // Forward the CSRF cookie
        },
        body: JSON.stringify(credentials),
    });

    const data = await loginRes.json();

    if (!loginRes.ok) return NextResponse.json({ success: false, message: data.message, user: data.user });

    const response = NextResponse.json({ success: true, user: data.user});

    response.cookies.set({
        name: 'auth_token',
        value: data.auth_token,
        httpOnly: true, // Prevents JS access for security
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return response;
}