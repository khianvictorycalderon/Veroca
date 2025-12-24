import pool from "@/utils/db";
import { dev } from "@/utils/dev-log";
import { handleQuery } from "@/utils/qr-helper";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";

const registerSchema = z.object({
  first_name: z
    .string()
    .min(1, "First name is required")
    .regex(/^[A-Za-z\s]+$/, "First name cannot contain numbers or special characters"),
  last_name: z
    .string()
    .min(1, "Last name is required")
    .regex(/^[A-Za-z\s]+$/, "Last name cannot contain numbers or special characters"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters"),
  birth_date: z
    .string()
    .refine((value) => {
      const birthDate = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      const dayDiff = today.getDate() - birthDate.getDate();
      const actualAge = m < 0 || (m === 0 && dayDiff < 0) ? age - 1 : age;
      return actualAge >= 12;
    }, "You must be at least 12 years old"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/(?=.*[a-z])/, "Password must contain a lowercase letter")
    .regex(/(?=.*[A-Z])/, "Password must contain an uppercase letter")
    .regex(/(?=.*\d)/, "Password must contain a number")
    .regex(/(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])/, "Password must contain a special character")
});

export async function POST(request: NextRequest) {
    const { 
        first_name, 
        last_name,
        username,
        birth_date,
        password
    } = await request.json();

    // For debugging purpose
    dev.log(`First Name: ${first_name}`);
    dev.log(`Last Name: ${last_name}`);
    dev.log(`Username: ${username}`);
    dev.log(`Birth date: ${birth_date}`);
    dev.log(`Password: ${password}`);
    
    // Validate zod
    const parseResult = registerSchema.safeParse({
        first_name,
        last_name,
        username,
        birth_date,
        password
    });

    if (!parseResult.success) {
        const errors = parseResult.error.flatten().fieldErrors;
        return NextResponse.json({ errors }, { status: 400 });
    }

    // Use the validated data
    const { first_name: validFirstName, last_name: validLastName, username: validUsername, birth_date: validBirthDate, password: validPassword } = parseResult.data;

    return handleQuery(
        async () => {
            // Hash the password before storing it
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert user into the database safely using parameterized query
            const query = `
                INSERT INTO users (first_name, last_name, username, birth_date, password)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING id, username
            `;
            const values = [validFirstName, validLastName, validUsername, validBirthDate, hashedPassword];

            const result = await pool.query(query, values);

            return NextResponse.json({
                message: "Successfully registered!",
                user: result.rows[0]
            }, { status: 201 });
            },
            "Failed to register user"
    );
}
