import { pool } from "./pool";
import { defaultContent } from "../defaultContent";

function rowToGroup(row: any) {
  return { id: row.id, category: row.category, items: row.items };
}

export async function listSkillGroups() {
  const { rows } = await pool.query("SELECT * FROM skill_groups ORDER BY sort_order ASC");
  return rows.map(rowToGroup);
}

export async function seedSkillsIfEmpty() {
  const { rows } = await pool.query("SELECT id FROM skill_groups LIMIT 1");
  if (rows.length > 0) return;

  let order = 0;
  for (const group of defaultContent.skills) {
    await pool.query(
      `INSERT INTO skill_groups (id, sort_order, category, items) VALUES ($1, $2, $3, $4)`,
      [`skill-${order}`, order, JSON.stringify(group.category), JSON.stringify(group.items)]
    );
    order++;
  }
}

// Replaces the whole list at once — simplest model for a small admin-managed collection.
export async function replaceSkillGroups(groups: any[]) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query("DELETE FROM skill_groups");
    let order = 0;
    for (const group of groups) {
      const id = group.id || `skill-${Date.now()}-${order}`;
      await client.query(
        `INSERT INTO skill_groups (id, sort_order, category, items) VALUES ($1, $2, $3, $4)`,
        [id, order, JSON.stringify(group.category), JSON.stringify(group.items)]
      );
      order++;
    }
    await client.query("COMMIT");
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
  return listSkillGroups();
}
