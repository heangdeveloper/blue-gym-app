import { NextResponse } from "next/server";

const API_URL = "http://127.0.0.1:8000";

export async function POST(req: Request) {
    const cookie = req.headers.get("cookie") || "";

    const res = await fetch(`${API_URL}/api/logout`, {
        method: "POST",
        headers: {
            Cookie: cookie,
        },
        credentials: "include",
    });

    const data = await res.json();

    const response = NextResponse.json(data);

    // 🔥 remove cookie in browser
    response.headers.set(
        "set-cookie",
        "token=; Path=/; HttpOnly; Max-Age=0; SameSite=Lax"
    );

    return response;
}