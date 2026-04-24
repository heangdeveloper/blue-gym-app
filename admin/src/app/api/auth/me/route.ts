import { NextResponse } from "next/server";

const API_URL = "http://127.0.0.1:8000";

export async function GET(req: Request) {
    const cookie = req.headers.get("cookie") || "";

    const res = await fetch(`${API_URL}/api/me`, {
        method: "GET",
        headers: {
            Cookie: cookie,
            Accept: "application/json",
        },
        credentials: "include",
    });

    if (!res.ok) {
        return NextResponse.json({ user: null }, { status: 401 });
    }

    const data = await res.json();

    return NextResponse.json({ user: data });
}