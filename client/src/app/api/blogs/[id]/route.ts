import { getBlogPostById } from "@/lib/server/db/blogs";
import { jsonError } from "@/lib/server/http";

export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const post = await getBlogPostById(params.id);
    if (!post) {
      return Response.json({ message: "Blog post not found." }, { status: 404 });
    }
    return Response.json(post);
  } catch (e) {
    return jsonError(e);
  }
}
