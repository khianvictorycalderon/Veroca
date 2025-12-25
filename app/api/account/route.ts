import { NextRequest, NextResponse } from "next/server";
import pool from "@/utils/db";
import { handleQuery } from "@/utils/qr-helper";
import { dev } from "@/utils/dev-log";

export async function DELETE(req: NextRequest) {
  return handleQuery(
    async () => {
      const sessionToken = req.cookies.get("session_token")?.value;

      if (!sessionToken) {
        dev.log("Failed: No session token");
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
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

      // Delete the user (user_sessions will be auto-deleted because of ON DELETE CASCADE)
      const deleteResult = await pool.query(
        `DELETE FROM users WHERE id = $1`,
        [userId]
      );

      dev.log(`Success: Deleted user ${userId} (${deleteResult.rowCount} row(s))`);

      // Clear the cookie
      const response = NextResponse.json({ message: "Account deleted successfully" }, { status: 200 });
      response.cookies.delete("session_token");

      return response;
    },
    "Failed to delete account"
  );
}
