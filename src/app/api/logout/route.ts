import { logout } from "@/services/userService";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;
    await logout(session);

    return new Response("Log out successful", {
      status: 200,
      headers: {
        "Set-Cookie": `session=''; HttpOnly; Path=/; Max-Age=0; SameSite=Strict`,
      },
    });
  } catch (error) {
    console.log("Caught an error trying to log out", error);
    return new Response("ok", { status: 200 });
  }
}
