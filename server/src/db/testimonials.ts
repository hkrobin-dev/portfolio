import { pool } from "./pool";

function rowToItem(row: any) {
  return {
    id: row.id,
    quote: row.quote,
    name: row.name,
    role: row.role,
    company: row.company,
    companyUrl: row.company_url,
    avatar: row.avatar,
  };
}

export async function listTestimonials() {
  const { rows } = await pool.query("SELECT * FROM testimonials ORDER BY sort_order ASC");
  return rows.map(rowToItem);
}

// No default seed data on purpose — this section stays hidden on the site
// until the admin adds the first testimonial from the panel.
export async function replaceTestimonials(items: any[]) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query("DELETE FROM testimonials");
    let order = 0;
    for (const item of items) {
      const id = item.id || `testimonial-${Date.now()}-${order}`;
      await client.query(
        `INSERT INTO testimonials (id, sort_order, quote, name, role, company, company_url, avatar)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
        [
          id,
          order,
          JSON.stringify(item.quote || {}),
          item.name || "",
          item.role || "",
          item.company || "",
          item.companyUrl || "",
          item.avatar || "",
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
  return listTestimonials();
}
