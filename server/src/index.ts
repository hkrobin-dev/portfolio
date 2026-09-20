// Local / traditional server entry point (used by `npm run dev`, or when
// deploying to Railway, Render, a VPS, etc). Vercel uses api/index.ts instead.
import app from "./app";
import { initDatabase } from "./db/init";

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await initDatabase();
  } catch (err) {
    console.error("❌ Could not connect to PostgreSQL. Check DATABASE_URL in server/.env");
    console.error(err);
    process.exit(1);
  }

  if (!process.env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD === "change-this-password") {
    console.warn(
      "⚠️  You are using the default ADMIN_PASSWORD. Change ADMIN_USERNAME/ADMIN_PASSWORD in server/.env before deploying!"
    );
  }

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

start();
