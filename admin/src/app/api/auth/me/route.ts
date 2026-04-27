import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    const res = await fetch(`${API_URL}/api/me`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
        },
    });

    if (!res.ok) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.next(); 
}