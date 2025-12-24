import HomePage from "@/lib/pages/home-page";
import LoggedInHomePage from "@/lib/pages/logged-in-page";
import { cookies } from "next/headers";
import { validateSession } from "@/utils/auth";

export default async function Page() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session_token")?.value;

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
