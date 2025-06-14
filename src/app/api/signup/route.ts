import { createUser } from "@/services/userService";
import { ZodError } from "zod";
import { isUniqueConstraintError } from "@/lib/utils/isUniqueConstraintError";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await createUser(body);

    return new Response('', {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return new Response(JSON.stringify({ errors: error.errors }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    if (isUniqueConstraintError(error, "email")) {
      return new Response(JSON.stringify({ errors: "email must be unique" }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    console.log("caught an error creating the user", error)
    return new Response('Internal Server Error', { status: 500 });
  }
}
