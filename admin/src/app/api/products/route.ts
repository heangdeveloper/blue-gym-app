import { NextResponse } from "next/server";
import '@/../envConfig'; // Load environment variables

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET() {
    const res = await fetch(`${API_URL}/api/products`, {
        headers: { 'Accept': 'application/json' },
    });
    const data = await res.json();
    console.log("API response for GET /products:", data);
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