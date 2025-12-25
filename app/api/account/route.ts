import { NextRequest, NextResponse } from "next/server";
// import pool from "@/utils/db";
// import bcrypt from "bcryptjs";
// import { handleQuery } from "@/utils/qr-helper";
// import { dev } from "@/utils/dev-log";

export async function DELETE(req: NextRequest) {
//   return handleQuery(
//     async () => {
//       const sessionToken = req.cookies.get("session_token")?.value;

//       if (!sessionToken) {
//         dev.log("Failed: No session token");
//         return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
//       }

//       // Parse JSON body
//       const body = await req.json();
//       const { old_password, new_password } = body;

//       if (!old_password || !new_password) {
//         return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
//       }

//       // Get user ID and current password from session
//       const sessionResult = await pool.query(
//         `SELECT u.id, u.password 
//          FROM users u
//          JOIN user_sessions s ON u.id = s.user_id
//          WHERE s.session_token = $1
//            AND s.expires_at > NOW()`,
//         [sessionToken]
//       );

//       if (sessionResult.rows.length === 0) {
//         dev.log(`Failed: Invalid or expired session ${sessionToken}`);
//         return NextResponse.json({ message: "Session expired or invalid" }, { status: 401 });
//       }

//       const user = sessionResult.rows[0];

//       // Verify old password
//       const isOldPasswordCorrect = await bcrypt.compare(old_password, user.password);
//       if (!isOldPasswordCorrect) {
//         return NextResponse.json({ message: "Old password is incorrect" }, { status: 401 });
//       }

//       // Hash new password
//       const hashedNewPassword = await bcrypt.hash(new_password, 10);

//       // Update password in the database
//       await pool.query(`UPDATE users SET password = $1 WHERE id = $2`, [hashedNewPassword, user.id]);

//       dev.log(`Success: Updated password for user ${user.id}`);
//       return NextResponse.json({ message: "Password updated successfully" }, { status: 200 });
//     },
//     "Failed to update password"
//   );
}
