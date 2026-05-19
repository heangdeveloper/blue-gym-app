import { NextResponse } from "next/server";
import '@/../envConfig';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(request: Request) {
    try {
        const res = await fetch(`${API_URL}/api/branchs`, {
            headers: {
                'Content-Type': 'application/json',
            },
            cache: "no-store",
        });

        const data = await res.json();

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to fetch branchs" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const res = await fetch(`${API_URL}/api/branchs`, {
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