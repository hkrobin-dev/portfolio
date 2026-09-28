import { requireAdmin } from "@/lib/server/auth";
import { updateSettingsSection } from "@/lib/server/db/settings";
import { jsonError } from "@/lib/server/http";

export async function PUT(req: Request, { params }: { params: { section: string } }) {
  const admin = requireAdmin(req);
  if (admin instanceof Response) return admin;

  // Whitelisted here rather than relying on the error thrown by
  // updateSettingsSection(), so an unknown section is a 400 and not a 500.
  // db/settings.ts keeps its own check as the second line of defence.
  const SECTIONS = ["meta", "theme", "hero", "about", "contact", "footer"];
  if (!SECTIONS.includes(params.section)) {
    return Response.json(
      { message: `Unknown settings section "${params.section}".` },
      { status: 400 }
    );
  }

  try {
    return Response.json(await updateSettingsSection(params.section, await req.json()));
  } catch (e) {
    return jsonError(e);
  }
}
