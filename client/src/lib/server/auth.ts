import "server-only";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "change-this-secret";

export type Admin = { username: string };

export function signToken(username: string) {
  return jwt.sign({ username }, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(req: Request): Admin | null {
  const header = req.headers.get("authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return null;

  try {
    return jwt.verify(token, JWT_SECRET) as Admin;
  } catch {
    return null;
  }
}

// Replaces the old `requireAdmin` Express middleware.
//
// A middleware could reject the request and move on; a plain function can't, so
// this returns *either* the admin or a ready-to-send 401. Every write handler
// starts with the same two lines:
//
//     const admin = requireAdmin(req);
//     if (admin instanceof Response) return admin;
//
// Auth still uses a Bearer token from localStorage rather than a cookie. That
// is deliberate for now: cookies would let a Next `middleware.ts` gate /admin
// before render, but that is an auth rewrite, not a migration.
export function requireAdmin(req: Request): Admin | Response {
  const admin = verifyToken(req);

  if (!admin) {
    return Response.json(
      { message: "Session expired. Please log in again." },
      { status: 401 }
    );
  }

  return admin;
}
