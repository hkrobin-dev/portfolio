import { Router } from "express";
import { readSettings, updateSettingsSection } from "../db/settings";
import { requireAdmin } from "../middleware/auth";

const router = Router();

router.get("/", async (_req, res) => {
  const settings = await readSettings();
  res.json(settings);
});

router.put("/:section", requireAdmin, async (req, res) => {
  try {
    const updated = await updateSettingsSection(req.params.section, req.body);
    res.json(updated);
  } catch (e: any) {
    res.status(400).json({ message: e.message || "Failed to update settings." });
  }
});

export default router;
