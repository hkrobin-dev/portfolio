import { requireAdmin } from "@/lib/server/auth";
import { listTestimonials, replaceTestimonials } from "@/lib/server/db/testimonials";
import { jsonError } from "@/lib/server/http";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return Response.json(await listTestimonials());
  } catch (e) {
    return jsonError(e);
  }
}

export async function PUT(req: Request) {
  const admin = requireAdmin(req);
  if (admin instanceof Response) return admin;

  try {
    return Response.json(await replaceTestimonials(await req.json()));
  } catch (e) {
    return jsonError(e);
  }
}
