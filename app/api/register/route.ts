import { dev } from "@/utils/dev-log";
import { NextRequest, NextResponse } from "next/server";

// Trying to register
export async function POST(request: NextRequest) {
    const { 
        first_name, 
        last_name,
        username,
        email,
        birth_date,
        password
    } = await request.json();

    dev.log(`First name: ${first_name}`);
    dev.log(`Last name: ${last_name}`);
    dev.log(`Username: ${username}`);
    dev.log(`Email: ${email}`);
    dev.log(`Birth date: ${birth_date}`);
    dev.log(`Password: ${password}`);

    return NextResponse.json({
        message: "Recieved"
    }, { status: 200 });

    // if (username === "admin" && password == "1234") {
    //     const response = NextResponse.json({ message: "Login Successful!" }, { status: 200 })

    //     // Set cookie
    //     response.cookies.set({
    //         name: "signed_in_user",
    //         value: sessionID, // This session ID must match user ID on database for actual implementation
    //         path: "/",
    //         httpOnly: true,
    //         maxAge: 3600,
    //         sameSite: "lax"
    //     });

    //     return response;
    // }

    // return NextResponse.json({
    //     message: "User doesn't exist or bad request"
    // }, { status: 401 });

}