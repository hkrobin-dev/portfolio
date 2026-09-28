import { requireAdmin } from "@/lib/server/auth";
import { listProjects, replaceProjects } from "@/lib/server/db/projects";
import { jsonError } from "@/lib/server/http";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return Response.json(await listProjects());
  } catch (e) {
    return jsonError(e);
  }
}

export async function PUT(req: Request) {
  const admin = requireAdmin(req);
  if (admin instanceof Response) return admin;

  try {
    return Response.json(await replaceProjects(await req.json()));
  } catch (e) {
    return jsonError(e);
  }
}
