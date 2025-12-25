import { NextRequest, NextResponse } from "next/server";
import pool from "@/utils/db";
import bcrypt from "bcryptjs";
import { handleQuery } from "@/utils/qr-helper";
import { dev } from "@/utils/dev-log";
import crypto from "crypto";

// Trying to login
export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  // For debugging purpose
  dev.log(`Username: ${username}`);
  dev.log(`Password: ${password}`);

  // Duration of a session
  const maxDuration = 60 * 60 * 6; // Max of 6 hours per login session

  return handleQuery(
    async () => {
      // Find user in database
      const result = await pool.query(
        "SELECT id, password FROM users WHERE username = $1",
        [username]
      );

      if (result.rows.length === 0) {
        return NextResponse.json(
          { message: "Invalid username/password" },
          { status: 401 }
        );
      }

      const user = result.rows[0];

      // Verify password
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return NextResponse.json(
          { message: "Invalid username/password" },
          { status: 401 }
        );
      }

      // Generate a session token
      const sessionToken = crypto.randomUUID(); // or crypto.randomBytes(32).toString("hex")

      // Optional: store in user_sessions table (recommended)
      const expiresAt = new Date();
      expiresAt.setSeconds(expiresAt.getSeconds() + maxDuration);

      // Get user IP and user agent
      const ipAddress =
        req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
      const userAgent = req.headers.get("user-agent") || "unknown";

      await pool.query(
        `INSERT INTO user_sessions (user_id, session_token, expires_at, ip_address, user_agent)
         VALUES ($1, $2, $3, $4, $5)`,
        [user.id, sessionToken, expiresAt, ipAddress, userAgent]
      );

      // Step 4: Set HTTP-only cookie with session token
      const response = NextResponse.json({ message: "Login successful!" });
      response.cookies.set({
        name: "session_token",
        value: sessionToken,
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: maxDuration
      });

      dev.log(`Success: Created session for user ${user.id}, IP: ${ipAddress}, UA: ${userAgent}`);

      return response;
    },
    "Failed to login"
  );
}
