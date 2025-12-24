import { NextRequest, NextResponse } from "next/server";
import pool from "@/utils/db";
import { handleQuery } from "@/utils/qr-helper";
import { dev } from "@/utils/dev-log";

export async function DELETE(request: NextRequest) {
  return handleQuery(
    async () => {
      const cookieHeader = request.headers.get("cookie");
      const cookies = cookieHeader?.split("; ").reduce<Record<string, string>>((acc, cur) => {
        const [key, value] = cur.split("=");
        acc[key.trim()] = value;
        return acc;
      }, {}) ?? {};

      const sessionToken = cookies["session_token"];

      if (sessionToken) {
        const result = await pool.query(
          "DELETE FROM user_sessions WHERE session_token = $1",
          [sessionToken]
        );
        dev.log(`Success: Deleted ${result.rowCount ?? 0} session(s)`);
      }

      const response = NextResponse.json({ message: "Logout successful!" }, { status: 200 });

      // Remove cookie
      response.cookies.delete("session_token");

      return response;
    },
    "Failed to logout"
  );
}