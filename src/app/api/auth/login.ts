import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { email, password } = await request.json();

    // TODO: Add authentication logic here (e.g., call your backend or database)

    if (email === "test@example.com" && password === "password") {
        // Successful authentication
        return NextResponse.json(
            { message: "Login successful" },
            { status: 200 }
        );
    } else {
        return NextResponse.json(
            { message: "Invalid credentials" },
            { status: 401 }
        );
    }
}
