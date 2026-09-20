import { pool } from "./pool";
import { defaultContent } from "../defaultContent";

function rowToItem(row: any) {
  return {
    id: row.id,
    role: row.role,
    company: row.company,
    companyUrl: row.company_url,
    location: row.location,
    period: row.period,
    points: row.points,
    stack: row.stack,
  };
}

export async function listExperience() {
  const { rows } = await pool.query("SELECT * FROM experience ORDER BY sort_order ASC");
  return rows.map(rowToItem);
}

export async function seedExperienceIfEmpty() {
  const { rows } = await pool.query("SELECT id FROM experience LIMIT 1");
  if (rows.length > 0) return;

  let order = 0;
  for (const item of defaultContent.experience) {
    await pool.query(
      `INSERT INTO experience (id, sort_order, role, company, company_url, location, period, points, stack)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
      [
        item.id,
        order,
        JSON.stringify(item.role),
        item.company,
        item.companyUrl || "",
        JSON.stringify(item.location),
        item.period,
        JSON.stringify(item.points),
        JSON.stringify(item.stack),
      ]
    );
    order++;
  }
}

export async function replaceExperience(items: any[]) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query("DELETE FROM experience");
    let order = 0;
    for (const item of items) {
      const id = item.id || `exp-${Date.now()}-${order}`;
      await client.query(
        `INSERT INTO experience (id, sort_order, role, company, company_url, location, period, points, stack)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
        [
          id,
          order,
          JSON.stringify(item.role),
          item.company || "",
          item.companyUrl || "",
          JSON.stringify(item.location || {}),
          item.period || "",
          JSON.stringify(item.points || []),
          JSON.stringify(item.stack || []),
        ]
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
  return listExperience();
}
