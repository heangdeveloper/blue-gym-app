import { NextResponse } from "next/server";

const API_URL = "http://127.0.0.1:8000";

export async function GET() {
    const res = await fetch(`${API_URL}/products`, {
        headers: { 'Accept': 'application/json' },
    });
    const data = await res.json();
    return NextResponse.json(data);
}

export async function POST(request: Request) {
    const body = await request.json();
    const res = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });
    const newItem = await res.json();
    return NextResponse.json(newItem, { status: 201 });
} 