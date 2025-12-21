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
        {session === "signed_in" && <h1>You are signed in!</h1>}
        {session === "signed_out" && <h1>You are signed out!</h1>}
      </div>
    </div>
  );
}
