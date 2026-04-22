import { NextResponse } from "next/server";

const API_URL = "http://127.0.0.1:8000";

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { id } = params;
    const body = await request.json();

    const res = await fetch(`${API_URL}/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });

    const updatedItem = await res.json();
    return NextResponse.json(updatedItem);
}

export async function DELETE(
    _request: Request,
    { params }: { params: { id: string } }
) {
    const { id } = params;
    await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE'
    });
    return NextResponse.json({ message: 'Deleted successfully' });
}