import "server-only";
import { pool as rawPool } from "./pool";
import { initDatabase } from "./init";
import type { PoolClient, QueryResult, QueryResultRow } from "pg";

// Schema creation + seeding is safe to repeat (CREATE TABLE IF NOT EXISTS),
// but we still cache the promise per warm instance so a busy instance doesn't
// redo it on every request.
//
// Next.js route handlers have no equivalent of the old "init then dispatch"
// entry point, so instead of asking each handler to remember to boot the
// database we hang it off the pool itself: the first `pool.query(...)` in an
// instance triggers the migration, everything after it is a plain query.
//
// Deadlock warning — this is why init runs on the RAW pool.
//
// The first `pool.query(...)` in an instance kicks off initDatabase(), and
// every other query in that instance waits for it. But initDatabase() itself
// has to run queries (the schema, plus the six seeders). If any of those went
// through this wrapper they would call ensureDb() from *inside* the promise
// ensureDb() is waiting on, and neither would ever resolve — every request
// would hang until the platform timed it out.
//
// So: init.ts and the seeders both use the raw pool, and each seeder takes it
// as a required argument. If you add a seeder, pass the pool in; do not let it
// default to the lazy one.
let ready: Promise<void> | null = null;

function ensureDb(): Promise<void> {
  if (!ready) {
    ready = initDatabase().catch((err) => {
      // Don't cache the failure. A cold-start race or a one-off network blip
      // would otherwise leave this instance permanently broken — every later
      // request would replay the same rejected promise and 500 until Vercel
      // happened to recycle the instance. Clearing it lets the next request
      // retry, which is what you want for a transient database problem.
      ready = null;
      throw err;
    });
  }
  return ready;
}

// Typed to cover exactly what the db/*.ts files do — a SQL string and an
// optional values array. Every call site in this folder is one of those two
// shapes, so widening it further would only add noise.
export const pool = {
  query<R extends QueryResultRow = QueryResultRow>(
    queryText: string,
    values?: unknown[]
  ): Promise<QueryResult<R>> {
    return ensureDb().then(() => rawPool.query<R>(queryText, values));
  },

  connect(): Promise<PoolClient> {
    return ensureDb().then(() => rawPool.connect());
  },
};
