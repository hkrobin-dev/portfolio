import { Request, Response, NextFunction, RequestHandler } from "express";

// Express 4 does not catch a rejected promise from an async handler — it just
// becomes an unhandled rejection. On Vercel that kills the warm function
// instance, so the visitor gets a 500 (or a hung request) with no useful body.
//
// Wrapping every async route in this funnels those errors into Express's error
// handler instead, which returns a readable JSON message.
export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>
): RequestHandler {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
