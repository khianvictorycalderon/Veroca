import pool from "@/utils/db";

export type ValidSession = {
  user_id: string;
};

export async function validateSession(
  sessionToken: string
): Promise<ValidSession | null> {
  const result = await pool.query<ValidSession>(
    `
    SELECT user_id
    FROM user_sessions
    WHERE session_token = $1
      AND expires_at > NOW()
    `,
    [sessionToken]
  );

  if (result.rowCount === 0) {
    return null;
  }

  return result.rows[0];
}