import { NextRequest, NextResponse } from "next/server";
import pool from "@/utils/db";
import { dev } from "@/utils/dev-log";
import { handleQuery } from "@/utils/qr-helper";

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

export async function PATCH(req: NextRequest) {
  return handleQuery(
    async () => {
      const sessionToken = req.cookies.get("session_token")?.value;

      if (!sessionToken) {
        dev.log("Failed: No session token");
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
      }

      // Parse JSON body
      const body = await req.json();
      const { first_name, last_name, birth_date } = body;

      if (!first_name || !last_name || !birth_date) {
        return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
      }

      // Get user ID from session
      const sessionResult = await pool.query(
        `SELECT user_id FROM user_sessions WHERE session_token = $1 AND expires_at > NOW()`,
        [sessionToken]
      );

      if (sessionResult.rows.length === 0) {
        dev.log(`Failed: Invalid or expired session ${sessionToken}`);
        return NextResponse.json({ message: "Session expired or invalid" }, { status: 401 });
      }

      const userId = sessionResult.rows[0].user_id;

      // Update user details
      await pool.query(
        `UPDATE users SET first_name = $1, last_name = $2, birth_date = $3 WHERE id = $4`,
        [first_name, last_name, birth_date, userId]
      );

      dev.log(`Success: Updated user info for ${userId}`);
      return NextResponse.json({ message: "User details updated successfully" }, { status: 200 });
    },
    "Failed to update user info"
  );
}