import "dotenv/config";
import express from "express";
import cors from "cors";
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

const app = express();

// CORS: kept permissive on purpose. Auth uses a Bearer token (not cookies),
// so there is no CSRF/credential risk from allowing any origin — and it
// avoids the classic "login silently fails" issue caused by CLIENT_URL not
// exactly matching the port/domain the frontend happened to be served from.
app.use(cors());
app.use(express.json({ limit: "5mb" }));

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

export default app;
