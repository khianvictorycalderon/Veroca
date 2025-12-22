import HomePage from "@/lib/pages/home-page";
import LoggedInHomePage from "@/lib/pages/logged-in-page";
import { HomeSessionType } from "@/lib/types";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = await cookies();

  const session: HomeSessionType = 
    cookieStore.get("session")?.value === "signed_in"
      ? "signed_in"
      : "signed_out";

  return (
    <>
      {session === "signed_in" && <LoggedInHomePage/>}
      {session === "signed_out" && <HomePage/>}
    </>
  );
}
