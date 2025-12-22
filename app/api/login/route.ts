import { dev } from "@/utils/dev-log";
import { NextRequest, NextResponse } from "next/server";

// Trying to login
export async function POST(request: NextRequest) {
    const { username, password } = await request.json();

    dev.log(`Username: ${username}`);
    dev.log(`Password: ${password}`);

    const sampleUserID = "e7dvm-3idms-39wmx-3mskv";

    if (username === "admin" && password == "1234") {
        const response = NextResponse.json({ message: "Login Successful!" }, { status: 200 })

        // Set cookie
        response.cookies.set({
            name: "signed_in_user",
            value: sampleUserID,
            path: "/",
            httpOnly: true,
            maxAge: 3600,
            sameSite: "lax"
        });

        return response;
    }

    return NextResponse.json({
        message: "User doesn't exist or bad request"
    }, { status: 401 });

}