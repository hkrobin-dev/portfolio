import type { Pool } from "pg";
import { pool } from "./index";
import { defaultContent } from "../defaultContent";

const SECTIONS = ["meta", "theme", "hero", "about", "contact", "footer"] as const;
type Section = (typeof SECTIONS)[number];

export async function readSettings() {
  const { rows } = await pool.query("SELECT * FROM settings WHERE id = 1");
  const row = rows[0];
  if (!row) return null;

  return {
    meta: row.meta,
    theme: row.theme,
    hero: row.hero,
    about: row.about,
    contact: row.contact,
    footer: row.footer,
    updatedAt: row.updated_at,
  };
}

// `db` is the raw pool, passed in by init.ts. Seeders cannot use the lazy pool
// from "./index" — they run *inside* initDatabase(), and the lazy pool would
// wait on the very promise that is running them.
export async function seedSettingsIfEmpty(db: Pool) {
  const { rows } = await db.query("SELECT id FROM settings WHERE id = 1");
  if (rows.length > 0) return;

  await db.query(
    `INSERT INTO settings (id, meta, theme, hero, about, contact, footer)
     VALUES (1, $1, $2, $3, $4, $5, $6)`,
    [
      JSON.stringify(defaultContent.meta),
      JSON.stringify(defaultContent.theme),
      JSON.stringify(defaultContent.hero),
      JSON.stringify(defaultContent.about),
      JSON.stringify(defaultContent.contact),
      JSON.stringify(defaultContent.footer),
    ]
  );
}

export async function updateSettingsSection(section: string, value: unknown) {
  if (!SECTIONS.includes(section as Section)) {
    throw new Error(`Unknown settings section "${section}".`);
  }

  await pool.query(
    `UPDATE settings SET ${section} = $1, updated_at = now() WHERE id = 1`,
    [JSON.stringify(value)]
  );

  return readSettings();
}
