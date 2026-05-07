import { NextResponse } from "next/server";
import '@/../envConfig';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function PATCH(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const body = await request.json();

        const res = await fetch(`${API_URL}/api/classes/${id}`, {
            method: "PATCH",
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
            { message: "Update failed" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;

        const res = await fetch(`${API_URL}/api/classes/${id}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
            },
        });

        const data = await res.json();

        return NextResponse.json(data, {
            status: res.status,
        });
    } catch (error) {
        return NextResponse.json(
            { message: "Delete failed" },
            { status: 500 }
        );
    }
}