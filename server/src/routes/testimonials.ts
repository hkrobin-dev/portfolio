import { Router } from "express";
import { listTestimonials, replaceTestimonials } from "../db/testimonials";
import { requireAdmin } from "../middleware/auth";

const router = Router();

router.get("/", async (_req, res) => {
  res.json(await listTestimonials());
});

router.put("/", requireAdmin, async (req, res) => {
  res.json(await replaceTestimonials(req.body));
});

export default router;
