// This module is the ONLY caller of the seeders, and it runs them on the raw
// pool. That is not an optimisation — it is the only correct thing to do.
//
// db/index.ts makes the first `pool.query(...)` of an instance wait for
// initDatabase() to finish. The seeders live in the same modules as the reads
// (settings.ts, skills.ts, …), so if they used that lazy pool they would call
// ensureDb() from *inside* the promise ensureDb() is waiting on, and neither
// would ever resolve. Every request would hang until the platform killed it.
//
// Hence: raw pool here, and `db: Pool` is a required argument on each seeder
// so this can't be reintroduced by accident.
import { pool } from "./pool";
import { SCHEMA_SQL } from "./schema";
import { seedSettingsIfEmpty } from "./settings";
import { seedSkillsIfEmpty } from "./skills";
import { seedExperienceIfEmpty } from "./experience";
import { seedEducationIfEmpty } from "./education";
import { seedProjectsIfEmpty } from "./projects";
import { seedBlogPostsIfEmpty } from "./blogs";

export async function initDatabase() {
  await pool.query(SCHEMA_SQL);
  await seedSettingsIfEmpty(pool);
  await seedSkillsIfEmpty(pool);
  await seedExperienceIfEmpty(pool);
  await seedEducationIfEmpty(pool);
  await seedProjectsIfEmpty(pool);
  await seedBlogPostsIfEmpty(pool);
  console.log("✅ Database ready (schema applied, seeded if empty).");
}
