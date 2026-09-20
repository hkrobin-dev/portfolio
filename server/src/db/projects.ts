import { pool } from "./pool";
import { defaultContent } from "../defaultContent";

function rowToItem(row: any) {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    longDescription: row.long_description,
    image: row.image,
    gallery: row.gallery,
    stack: row.stack,
    liveUrl: row.live_url,
    codeUrl: row.code_url,
    category: row.category,
    features: row.features,
  };
}

export async function listProjects() {
  const { rows } = await pool.query("SELECT * FROM projects ORDER BY sort_order ASC");
  return rows.map(rowToItem);
}

export async function getProjectById(id: string) {
  const { rows } = await pool.query("SELECT * FROM projects WHERE id = $1", [id]);
  return rows[0] ? rowToItem(rows[0]) : null;
}

export async function seedProjectsIfEmpty() {
  const { rows } = await pool.query("SELECT id FROM projects LIMIT 1");
  if (rows.length > 0) return;

  let order = 0;
  for (const item of defaultContent.projects as any[]) {
    await pool.query(
      `INSERT INTO projects (id, sort_order, title, description, long_description, image, gallery, stack, live_url, code_url, category, features)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
      [
        item.id,
        order,
        item.title,
        JSON.stringify(item.description),
        JSON.stringify(item.longDescription || item.description),
        item.image || "",
        JSON.stringify(item.gallery || []),
        JSON.stringify(item.stack || []),
        item.liveUrl || "",
        item.codeUrl || "",
        JSON.stringify(item.category || {}),
        JSON.stringify(item.features || []),
      ]
    );
    order++;
  }
}

export async function replaceProjects(items: any[]) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query("DELETE FROM projects");
    let order = 0;
    for (const item of items) {
      const id = item.id || `proj-${Date.now()}-${order}`;
      await client.query(
        `INSERT INTO projects (id, sort_order, title, description, long_description, image, gallery, stack, live_url, code_url, category, features)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
        [
          id,
          order,
          item.title || "",
          JSON.stringify(item.description || {}),
          JSON.stringify(item.longDescription || item.description || {}),
          item.image || "",
          JSON.stringify(item.gallery || []),
          JSON.stringify(item.stack || []),
          item.liveUrl || "",
          item.codeUrl || "",
          JSON.stringify(item.category || {}),
          JSON.stringify(item.features || []),
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
  return listProjects();
}
