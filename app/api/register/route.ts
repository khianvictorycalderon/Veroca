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

}