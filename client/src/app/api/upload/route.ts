import "server-only";
import sharp from "sharp";
import { put } from "@vercel/blob";
import { requireAdmin } from "@/lib/server/auth";

// multer is gone; Request.formData() parses the multipart body for us and
// gives us a real File, so the image never touches local disk on any platform.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const MAX_WIDTH = 1600; // large enough for any section on the site, small enough to load fast

// Vercel rejects request bodies over ~4.5MB before the function is even
// invoked, so a limit above that is never enforced by our own check — the
// request just dies with an opaque gateway error. Stay under it and reject
// with a message the admin panel can actually display.
const MAX_BYTES = 4 * 1024 * 1024;

export async function POST(req: Request) {
  const admin = requireAdmin(req);
  if (admin instanceof Response) return admin;

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return Response.json(
      {
        message:
          "Image storage isn't configured. Add a Vercel Blob store to this project (or BLOB_READ_WRITE_TOKEN to client/.env.local for local dev).",
      },
      { status: 500 }
    );
  }

  // Duck-typed rather than `instanceof File`.
  //
  // `Request.formData()` hands back undici's own File class, which is not the
  // same object as Node's `File` global. On Node 20+ they line up, but on
  // Node 18 `File` is not a global at all — `instanceof` would throw a
  // ReferenceError, and because this check sat outside the try/catch that
  // turned into a generic HTML 500 page instead of the JSON the client parses.
  // Checking for the methods we actually call works on every runtime.
  let entry: FormDataEntryValue | null = null;
  try {
    entry = (await req.formData()).get("image");
  } catch {
    return Response.json({ message: "No file uploaded." }, { status: 400 });
  }

  if (
    !entry ||
    typeof entry === "string" ||
    typeof (entry as Blob).arrayBuffer !== "function"
  ) {
    return Response.json({ message: "No file uploaded." }, { status: 400 });
  }

  const file = entry as File;

  if (!/^image\//.test(file.type)) {
    return Response.json({ message: "Only image files are allowed." }, { status: 400 });
  }

  if (file.size > MAX_BYTES) {
    return Response.json(
      { message: "That image is too large. Please pick one under 4 MB." },
      { status: 400 }
    );
  }

  try {
    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}.webp`;

    const processed = await sharp(Buffer.from(await file.arrayBuffer()))
      .rotate() // respect EXIF orientation from phone cameras
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toBuffer();

    // `access` must match how the Blob store itself is configured. A store set
    // to Private rejects this with "Cannot use public access on a private
    // store" — see the note below on why public is the right choice here.
    const blob = await put(filename, processed, {
      access: "public",
      contentType: "image/webp",
    });

    return Response.json({ url: blob.url });
  } catch (err) {
    console.error("Image processing/upload failed:", err);

    // Blob failures are almost always a store misconfiguration rather than a
    // bad file, and the generic message used to send people hunting for a
    // corrupt image that was fine. Pass the provider's own wording through.
    const raw = err instanceof Error ? err.message : String(err);
    if (/blob|store|access denied|private store/i.test(raw)) {
      return Response.json(
        {
          message:
            "Image storage rejected the upload. In Vercel, open Storage → your Blob store → Settings and switch Access to Public, then redeploy.",
          detail: raw,
        },
        { status: 500 }
      );
    }

    return Response.json(
      { message: "Could not process the image. Try a different file." },
      { status: 500 }
    );
  }
}
