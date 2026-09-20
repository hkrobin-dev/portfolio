import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import contactRoutes from "./routes/contact";
import authRoutes from "./routes/auth";
import settingsRoutes from "./routes/settings";
import skillsRoutes from "./routes/skills";
import experienceRoutes from "./routes/experience";
import educationRoutes from "./routes/education";
import projectsRoutes from "./routes/projects";
import blogsRoutes from "./routes/blogs";
import testimonialsRoutes from "./routes/testimonials";
import uploadRoutes from "./routes/upload";
import { initDatabase } from "./db/init";

const app = express();
const PORT = process.env.PORT || 5000;

// CORS: kept permissive on purpose. Auth uses a Bearer token (not cookies),
// so there is no CSRF/credential risk from allowing any origin — and it
// avoids the classic "login silently fails" issue caused by CLIENT_URL not
// exactly matching the port Next.js happened to start on.
app.use(cors());
app.use(express.json({ limit: "5mb" }));

// Uploaded images (profile photo, project screenshots, etc.)
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.get("/", (_req, res) => {
  res.json({ status: "Portfolio API is running" });
});

app.use("/api/contact", contactRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/skills", skillsRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/blogs", blogsRoutes);
app.use("/api/testimonials", testimonialsRoutes);
app.use("/api/upload", uploadRoutes);

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
