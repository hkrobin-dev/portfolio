import { Router } from "express";
import { listSkillGroups, replaceSkillGroups } from "../db/skills";
import { requireAdmin } from "../middleware/auth";

const router = Router();

router.get("/", async (_req, res) => {
  res.json(await listSkillGroups());
});

router.put("/", requireAdmin, async (req, res) => {
  res.json(await replaceSkillGroups(req.body));
});

export default router;
