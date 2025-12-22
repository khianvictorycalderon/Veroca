import HomePage from "@/lib/pages/home-page";
import LoggedInHomePage from "@/lib/pages/logged-in-page";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = await cookies();

  const session = cookieStore.get("signed_in_user")?.value;

  return (
    <>
      {session ? <LoggedInHomePage/> : <HomePage/>}
    </>
  );
}
