import pool from "@/utils/db";
import { dev } from "@/utils/dev-log";
import { handleQuery } from "@/utils/qr-helper";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// Trying to register
export async function POST(request: NextRequest) {
    const { 
        first_name, 
        last_name,
        username,
        birth_date,
        password
    } = await request.json();

    // For debugging purpose
    dev.log(`First name: ${first_name}`);
    dev.log(`Last name: ${last_name}`);
    dev.log(`Username: ${username}`);
    dev.log(`Birth date: ${birth_date}`);
    dev.log(`Password: ${password}`);

    return handleQuery(
        async () => {

            // Hash the password before storing it
            bcrypt
            const hashedPassword = await bcrypt.hash(password, 10);

            pool.query(`
               INSERT INTO users 
            `);
            return NextResponse.json({
                message: "Successfully registered!"
            }, { status: 200 });
        },
        "Failed to register user",
        async () => {
            // Optional: custom error action
        },
        async () => {
            // Optional: final action after try/catch
        }
    );

}