import { requireAdmin } from "@/lib/server/auth";
import { listBlogPosts, replaceBlogPosts } from "@/lib/server/db/blogs";
import { jsonError } from "@/lib/server/http";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return Response.json(await listBlogPosts());
  } catch (e) {
    return jsonError(e);
  }
}

export async function PUT(req: Request) {
  const admin = requireAdmin(req);
  if (admin instanceof Response) return admin;

  try {
    return Response.json(await replaceBlogPosts(await req.json()));
  } catch (e) {
    return jsonError(e);
  }
}
