import { Router } from "express";
import { listEducation, replaceEducation } from "../db/education";
import { requireAdmin } from "../middleware/auth";

const router = Router();

router.get("/", async (_req, res) => {
  res.json(await listEducation());
});

router.put("/", requireAdmin, async (req, res) => {
  res.json(await replaceEducation(req.body));
});

export default router;
