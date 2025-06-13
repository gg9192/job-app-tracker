import { validateLoginAndReturnSession } from "@/services/userService";

interface RequestData {
  username: string,
  password: string
}

export async function POST(request: Request) {
  try {
    const body: RequestData = await request.json();
    const token = validateLoginAndReturnSession(body.username, body.password)
    
    if (token === null) {
      return new Response('Invalid credentials', { status: 401 });
    }

     return new Response('Login successful', {
      status: 200,
      headers: {
        'Set-Cookie': `session=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict`
      }
    });

  }
  catch (error) {
    console.log("Caught an error trying to log in", error)
    return new Response('Internal Server Error', { status: 500 });
  }
}
