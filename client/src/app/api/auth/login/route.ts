import { signToken } from "@/lib/server/auth";
import { jsonError } from "@/lib/server/http";

const ADMIN_USERNAME = (process.env.ADMIN_USERNAME || "admin").trim();
const ADMIN_PASSWORD = (process.env.ADMIN_PASSWORD || "change-this-password").trim();

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const username = (body?.username || "").trim();
    const password = (body?.password || "").trim();

    if (!username || !password) {
      return Response.json(
        { message: "Username and password are required." },
        { status: 400 }
      );
    }

    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return Response.json(
        { message: "Invalid username or password." },
        { status: 401 }
      );
    }

    return Response.json({ token: signToken(username), username });
  } catch (e) {
    return jsonError(e);
  }
}
