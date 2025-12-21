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
    <div className="flex h-screen w-screen items-center justify-center bg-neutral-950 text-white">
      <div className="text-center">
        {session === "signed_in" && <HomePage/>}
        {session === "signed_out" && <LoggedInHomePage/>}
      </div>
    </div>
  );
}
