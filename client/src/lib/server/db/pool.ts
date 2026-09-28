import "server-only";
import { Pool } from "pg";

if (!process.env.DATABASE_URL) {
  console.warn(
    "⚠️  DATABASE_URL is not set. Add it to client/.env.local, e.g.\n" +
      "   DATABASE_URL=postgresql://user:password@localhost:5432/portfolio"
  );
}

// Serverless connection budget.
//
// On Vercel every warm instance is its own Node process, and each one would
// otherwise open up to pg's default of 10 connections. A couple of concurrent
// instances can then exhaust the connection limit of a managed provider (Neon,
// Supabase, Railway) and the API starts failing with "timeout exceeded when
// trying to connect" — intermittently, and only under traffic, which makes it
// miserable to debug.
//
// One connection per instance is plenty here: the handlers are short single
// queries, so they queue instead of piling up connections. Raise it with
// DATABASE_POOL_MAX if you move to a host with a generous connection limit.
const max = Number(process.env.DATABASE_POOL_MAX) || 1;

// This is the *raw* pool. Nothing outside of db/index.ts should import it —
// that module wraps it so the schema/seed step runs before the first query.
// db/init.ts is the one deliberate exception: it has to bootstrap through the
// raw pool or it would wait on itself forever.
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max,
  // Don't hold a connection open forever — an instance that idles between
  // requests should release it so the provider sees fewer live connections.
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 10_000,
});

pool.on("error", (err) => {
  console.error("Unexpected PostgreSQL error:", err);
});
