import { pool } from "./pool";
import { defaultContent } from "../defaultContent";

function rowToItem(row: any) {
  return {
    id: row.id,
    degree: row.degree,
    institute: row.institute,
    period: row.period,
    location: row.location,
    extra: row.extra,
    badge: row.badge,
  };
}

export async function listEducation() {
  const { rows } = await pool.query("SELECT * FROM education ORDER BY sort_order ASC");
  return rows.map(rowToItem);
}

export async function seedEducationIfEmpty() {
  const { rows } = await pool.query("SELECT id FROM education LIMIT 1");
  if (rows.length > 0) return;

  let order = 0;
  for (const item of defaultContent.education) {
    await pool.query(
      `INSERT INTO education (id, sort_order, degree, institute, period, location, extra, badge)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
      [
        item.id,
        order,
        JSON.stringify(item.degree),
        JSON.stringify(item.institute),
        item.period,
        JSON.stringify(item.location),
        JSON.stringify(item.extra),
        item.badge || "",
      ]
    );
    order++;
  }
}

export async function replaceEducation(items: any[]) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query("DELETE FROM education");
    let order = 0;
    for (const item of items) {
      const id = item.id || `edu-${Date.now()}-${order}`;
      await client.query(
        `INSERT INTO education (id, sort_order, degree, institute, period, location, extra, badge)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
        [
          id,
          order,
          JSON.stringify(item.degree),
          JSON.stringify(item.institute),
          item.period || "",
          JSON.stringify(item.location || {}),
          JSON.stringify(item.extra || {}),
          item.badge || "",
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
  return listEducation();
}
