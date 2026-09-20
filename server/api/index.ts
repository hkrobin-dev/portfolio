// Vercel deploys this file as a single serverless function; vercel.json
// rewrites every request path to it, and Express's own router (inside
// ../src/app) still matches routes by the original URL.
import type { VercelRequest, VercelResponse } from "@vercel/node";
import app from "../src/app";
import { initDatabase } from "../src/db/init";

// Schema creation + seeding is safe to repeat (CREATE TABLE IF NOT EXISTS),
// but we still cache the promise per warm instance so a busy function
// doesn't redo it on every request.
let dbReady: Promise<void> | null = null;
function ensureDatabaseReady() {
  if (!dbReady) dbReady = initDatabase();
  return dbReady;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    await ensureDatabaseReady();
  } catch (err) {
    console.error("❌ Could not connect to PostgreSQL. Check the DATABASE_URL env var in Vercel.", err);
    res.status(500).json({ message: "Database connection failed. Check server configuration." });
    return;
  }

  // Express apps are callable as (req, res) request handlers.
  (app as unknown as (req: VercelRequest, res: VercelResponse) => void)(req, res);
}
