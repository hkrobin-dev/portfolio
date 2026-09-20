import { Router } from "express";
import { listExperience, replaceExperience } from "../db/experience";
import { requireAdmin } from "../middleware/auth";

const router = Router();

router.get("/", async (_req, res) => {
  res.json(await listExperience());
});

router.put("/", requireAdmin, async (req, res) => {
  res.json(await replaceExperience(req.body));
});

export default router;
