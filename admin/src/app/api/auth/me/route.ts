import { cookies } from 'next/headers';
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const token = request.cookies.get('apiToken')

    const res = await fetch(`${API_URL}/api/me`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
        },
    });
    const data = await res.json()

    return Response.json({ data })
}