import { Router } from "express";
import { listExperience, replaceExperience } from "../db/experience";
import { requireAdmin } from "../middleware/auth";
import { asyncHandler } from "../middleware/asyncHandler";

const router = Router();

router.get(
  "/",
  asyncHandler(async (_req, res) => {
    res.json(await listExperience());
  })
);

router.put(
  "/",
  requireAdmin,
  asyncHandler(async (req, res) => {
    res.json(await replaceExperience(req.body));
  })
);

export default router;
