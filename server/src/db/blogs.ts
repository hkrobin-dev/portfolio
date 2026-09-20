import { pool } from "./pool";
import { defaultContent } from "../defaultContent";

function rowToItem(row: any) {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    content: row.content,
    date: row.date,
    category: row.category,
    image: row.image,
  };
}

export async function listBlogPosts() {
  const { rows } = await pool.query("SELECT * FROM blog_posts ORDER BY sort_order ASC");
  return rows.map(rowToItem);
}

export async function getBlogPostById(id: string) {
  const { rows } = await pool.query("SELECT * FROM blog_posts WHERE id = $1", [id]);
  return rows[0] ? rowToItem(rows[0]) : null;
}

export async function seedBlogPostsIfEmpty() {
  const { rows } = await pool.query("SELECT id FROM blog_posts LIMIT 1");
  if (rows.length > 0) return;

  let order = 0;
  for (const item of defaultContent.blogs as any[]) {
    await pool.query(
      `INSERT INTO blog_posts (id, sort_order, title, description, content, date, category, image)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
      [
        item.id,
        order,
        JSON.stringify(item.title),
        JSON.stringify(item.description),
        JSON.stringify(item.content || item.description),
        item.date || "",
        item.category || "",
        item.image || "",
      ]
    );
    order++;
  }
}

export async function replaceBlogPosts(items: any[]) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query("DELETE FROM blog_posts");
    let order = 0;
    for (const item of items) {
      const id = item.id || `blog-${Date.now()}-${order}`;
      await client.query(
        `INSERT INTO blog_posts (id, sort_order, title, description, content, date, category, image)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
        [
          id,
          order,
          JSON.stringify(item.title || {}),
          JSON.stringify(item.description || {}),
          JSON.stringify(item.content || item.description || {}),
          item.date || "",
          item.category || "",
          item.image || "",
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
  return listBlogPosts();
}
