import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import sharp from "sharp";
import { requireAdmin } from "../middleware/auth";

const UPLOAD_DIR = path.join(__dirname, "..", "..", "uploads");
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// Keep the original in memory only — we always re-save a resized/compressed
// version, so we never write giant, un-optimized uploads to disk.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB raw upload ceiling before compression
  fileFilter: (_req, file, cb) => {
    if (/^image\//.test(file.mimetype)) cb(null, true);
    else cb(new Error("Only image files are allowed."));
  },
});

const MAX_WIDTH = 1600; // large enough for any section on the site, small enough to load fast

const router = Router();

router.post("/", requireAdmin, upload.single("image"), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded." });

  try {
    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}.webp`;
    const outputPath = path.join(UPLOAD_DIR, filename);

    await sharp(req.file.buffer)
      .rotate() // respect EXIF orientation from phone cameras
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(outputPath);

    res.json({ url: `/uploads/${filename}` });
  } catch (err) {
    console.error("Image processing failed:", err);
    res.status(500).json({ message: "Could not process the image. Try a different file." });
  }
});

export default router;
