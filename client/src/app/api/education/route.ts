import { requireAdmin } from "@/lib/server/auth";
import { listEducation, replaceEducation } from "@/lib/server/db/education";
import { jsonError } from "@/lib/server/http";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return Response.json(await listEducation());
  } catch (e) {
    return jsonError(e);
  }
}

export async function PUT(req: Request) {
  const admin = requireAdmin(req);
  if (admin instanceof Response) return admin;

  try {
    return Response.json(await replaceEducation(await req.json()));
  } catch (e) {
    return jsonError(e);
  }
}
