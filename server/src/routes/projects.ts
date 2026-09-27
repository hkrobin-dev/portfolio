import { Router } from "express";
import { listProjects, getProjectById, replaceProjects } from "../db/projects";
import { requireAdmin } from "../middleware/auth";
import { asyncHandler } from "../middleware/asyncHandler";

const router = Router();

router.get(
  "/",
  asyncHandler(async (_req, res) => {
    res.json(await listProjects());
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const project = await getProjectById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found." });
    res.json(project);
  })
);

router.put(
  "/",
  requireAdmin,
  asyncHandler(async (req, res) => {
    res.json(await replaceProjects(req.body));
  })
);

export default router;
