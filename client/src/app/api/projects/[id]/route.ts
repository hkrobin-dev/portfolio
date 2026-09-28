import { getProjectById } from "@/lib/server/db/projects";
import { jsonError } from "@/lib/server/http";

export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const project = await getProjectById(params.id);
    if (!project) {
      return Response.json({ message: "Project not found." }, { status: 404 });
    }
    return Response.json(project);
  } catch (e) {
    return jsonError(e);
  }
}
