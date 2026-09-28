import "server-only";

// Stand-in for the Express error middleware at the bottom of the old app.ts.
//
// Next.js route handlers await the returned promise and turn a thrown error
// into a generic 500 page, which throws away the message. Throwing HttpError
// from a handler and ending with `return jsonError(e)` keeps the JSON body
// shape the client already parses (`data.message`).
export class HttpError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = "HttpError";
  }
}

export function jsonError(e: unknown): Response {
  if (e instanceof HttpError) {
    return Response.json({ message: e.message }, { status: e.status });
  }

  console.error("Unhandled request error:", e);
  const message = e instanceof Error ? e.message : "Internal server error.";
  return Response.json({ message }, { status: 500 });
}
