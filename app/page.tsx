import HomePage from "@/lib/pages/home-page";
import LoggedInHomePage from "@/lib/pages/logged-in-page";
import { cookies } from "next/headers";
import { validateSession } from "@/utils/auth";
import { dev } from "@/utils/dev-log";
import pool from "@/utils/db";

export default async function Page() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session_token")?.value;

  try {
    const deleteResult = await pool.query(
      `DELETE FROM user_sessions WHERE expires_at < NOW()`
    );
    const cleaned = deleteResult.rowCount ?? 0;
    dev.log(`Success: Cleaned up ${cleaned} expired sessions`);
  } catch (err) {
    dev.log(`Failed: Could not clean up expired sessions - ${err}`);
  }

  if (!sessionToken) {
    return <HomePage />;
  }

  const session = await validateSession(sessionToken);

  // ✅ Proper null check (type narrowing)
  if (!session) {
    return <HomePage />;
  }

  return <LoggedInHomePage />;
}
