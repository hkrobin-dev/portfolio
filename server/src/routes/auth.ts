import { Router } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET, requireAdmin, AuthedRequest } from "../middleware/auth";

const router = Router();

router.post("/login", (req, res) => {
  const username = (req.body?.username || "").trim();
  const password = (req.body?.password || "").trim();

  const ADMIN_USERNAME = (process.env.ADMIN_USERNAME || "admin").trim();
  const ADMIN_PASSWORD = (process.env.ADMIN_PASSWORD || "change-this-password").trim();

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ message: "Invalid username or password." });
  }

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "7d" });
  res.json({ token, username });
});

router.get("/me", requireAdmin, (req: AuthedRequest, res) => {
  res.json({ username: req.admin?.username });
});

export default router;
