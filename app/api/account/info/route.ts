import { NextRequest, NextResponse } from "next/server";
import pool from "@/utils/db";
import { dev } from "@/utils/dev-log";

export async function GET(req: NextRequest) {
  try {
    const sessionToken = req.cookies.get("session_token")?.value;

    if (!sessionToken) {
      dev.log("Failed: No session token");
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    // Find the user by session
    const result = await pool.query(
      `SELECT u.first_name, u.last_name, u.birth_date, u.username
       FROM users u
       JOIN user_sessions s ON u.id = s.user_id
       WHERE s.session_token = $1
        AND s.expires_at > NOW()`,
      [sessionToken]
    );

    if (result.rows.length === 0) {
      dev.log(`Failed: Invalid or expired session ${sessionToken}`);
      return NextResponse.json({ message: "Session expired or invalid" }, { status: 401 });
    }

    const userData = result.rows[0];
    dev.log(`Success: Retrieved user info for session ${sessionToken}`);
    return NextResponse.json(userData, { status: 200 });
  } catch (err: any) {
    dev.log(`Failed: ${err.message}`);
    return NextResponse.json({ message: "Failed to retrieve user info" }, { status: 500 });
  }
}