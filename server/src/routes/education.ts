import { Router } from "express";
import { listEducation, replaceEducation } from "../db/education";
import { requireAdmin } from "../middleware/auth";
import { asyncHandler } from "../middleware/asyncHandler";

const router = Router();

router.get(
  "/",
  asyncHandler(async (_req, res) => {
    res.json(await listEducation());
  })
);

router.put(
  "/",
  requireAdmin,
  asyncHandler(async (req, res) => {
    res.json(await replaceEducation(req.body));
  })
);

export default router;
