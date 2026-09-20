import { Router } from "express";
import { listBlogPosts, getBlogPostById, replaceBlogPosts } from "../db/blogs";
import { requireAdmin } from "../middleware/auth";

const router = Router();

router.get("/", async (_req, res) => {
  res.json(await listBlogPosts());
});

router.get("/:id", async (req, res) => {
  const post = await getBlogPostById(req.params.id);
  if (!post) return res.status(404).json({ message: "Blog post not found." });
  res.json(post);
});

router.put("/", requireAdmin, async (req, res) => {
  res.json(await replaceBlogPosts(req.body));
});

export default router;
