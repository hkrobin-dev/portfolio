import { requireAdmin } from "@/lib/server/auth";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const admin = requireAdmin(req);
  if (admin instanceof Response) return admin;

  return Response.json({ username: admin.username });
}
