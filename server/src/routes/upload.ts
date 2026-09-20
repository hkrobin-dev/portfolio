import { Router } from "express";
import multer from "multer";
import sharp from "sharp";
import { put } from "@vercel/blob";
import { requireAdmin } from "../middleware/auth";

// Kept in memory only — we resize/compress then upload the result straight
// to Vercel Blob storage, so nothing is ever written to local disk. This
// also means uploads work the same way whether the server runs on Vercel,
// Railway, Render, or a VPS.
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

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return res.status(500).json({
      message:
        "Image storage isn't configured. Add a Vercel Blob store to this project (or BLOB_READ_WRITE_TOKEN to server/.env for local dev).",
    });
  }

  try {
    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}.webp`;

    const processed = await sharp(req.file.buffer)
      .rotate() // respect EXIF orientation from phone cameras
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toBuffer();

    const blob = await put(filename, processed, {
      access: "public",
      contentType: "image/webp",
    });

    res.json({ url: blob.url });
  } catch (err) {
    console.error("Image processing/upload failed:", err);
    res.status(500).json({ message: "Could not process the image. Try a different file." });
  }
});

export default router;
