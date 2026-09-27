import { Router } from "express";
import { listTestimonials, replaceTestimonials } from "../db/testimonials";
import { requireAdmin } from "../middleware/auth";
import { asyncHandler } from "../middleware/asyncHandler";

const router = Router();

router.get(
  "/",
  asyncHandler(async (_req, res) => {
    res.json(await listTestimonials());
  })
);

router.put(
  "/",
  requireAdmin,
  asyncHandler(async (req, res) => {
    res.json(await replaceTestimonials(req.body));
  })
);

export default router;
