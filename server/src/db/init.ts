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
  await seedSettingsIfEmpty();
  await seedSkillsIfEmpty();
  await seedExperienceIfEmpty();
  await seedEducationIfEmpty();
  await seedProjectsIfEmpty();
  await seedBlogPostsIfEmpty();
  console.log("✅ Database ready (schema applied, seeded if empty).");
}
