import { Router } from "express";
import { listSkillGroups, replaceSkillGroups } from "../db/skills";
import { requireAdmin } from "../middleware/auth";
import { asyncHandler } from "../middleware/asyncHandler";

const router = Router();

router.get(
  "/",
  asyncHandler(async (_req, res) => {
    res.json(await listSkillGroups());
  })
);

router.put(
  "/",
  requireAdmin,
  asyncHandler(async (req, res) => {
    res.json(await replaceSkillGroups(req.body));
  })
);

export default router;
