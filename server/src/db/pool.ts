import { Pool } from "pg";

if (!process.env.DATABASE_URL) {
  console.warn(
    "⚠️  DATABASE_URL is not set. Add it to server/.env, e.g.\n" +
      "   DATABASE_URL=postgresql://user:password@localhost:5432/portfolio"
  );
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on("error", (err) => {
  console.error("Unexpected PostgreSQL error:", err);
});
