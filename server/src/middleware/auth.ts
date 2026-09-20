import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "change-this-secret";

export interface AuthedRequest extends Request {
  admin?: { username: string };
}

export function requireAdmin(req: AuthedRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: "Login required." });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { username: string };
    req.admin = { username: payload.username };
    next();
  } catch {
    return res.status(401).json({ message: "Session expired. Please log in again." });
  }
}

export { JWT_SECRET };
