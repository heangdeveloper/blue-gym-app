import { NextResponse } from "next/server";

const API_URL = "http://127.0.0.1:8000";

export async function POST(request: Request) {
    const body = await request.json();

    const csrf = await fetch(`${API_URL}/sanctum/csrf-cookie`, {
        credentials: "include",
    });

    const res = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Cookie: csrf.headers.get("set-cookie") || "",
        },
        body: JSON.stringify(body),
        credentials: "include",
    });

    const data = await res.json();

    console.log("API response:", data);
    
    const response = NextResponse.json(data);

    // forward cookies to browser
    const setCookie = res.headers.get("set-cookie");
    if (setCookie) {
        response.headers.set("set-cookie", setCookie);
    }

    return response;
}