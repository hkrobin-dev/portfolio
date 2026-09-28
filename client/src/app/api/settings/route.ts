import { readSettings } from "@/lib/server/db/settings";
import { jsonError } from "@/lib/server/http";

// Without this, Next tries to statically prerender the GET at build time —
// which would hit the database during `next build` and then serve a frozen
// snapshot from the build until the app is redeployed.
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return Response.json(await readSettings());
  } catch (e) {
    return jsonError(e);
  }
}
