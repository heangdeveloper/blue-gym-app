import { NextResponse } from "next/server";
import '@/../envConfig';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET() {
    const res = await fetch(`${API_URL}/api/categories`, {
        headers: {
            'Accept': 'application/json'        
        }
    });
    const data = await res.json()
 
    return Response.json({ data })
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const res = await fetch(`${API_URL}/api/categories`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(body),
        });

        const data = await res.json();

        return NextResponse.json(data, {
            status: res.status,
        });
    } catch (error) {
        return NextResponse.json(
            { message: "Create failed" },
            { status: 500 }
        );
    }
}