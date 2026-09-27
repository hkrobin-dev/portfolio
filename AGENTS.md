# AGENTS.md — Context for working in this repo

## What this project is

A **white-label, fully editable portfolio website**. All content lives in PostgreSQL and is
edited through an `/admin` dashboard — no code changes needed to change copy, images, colors,
projects, blog posts, etc.

Two deployable apps in one repo:

```
client/  → Next.js 14 (App Router) — public site + /admin dashboard   → port 3000
server/  → Express + plain SQL (pg) — content API, JWT auth, uploads  → port 5000
```

`Food resturent/` is an unrelated standalone static HTML/CSS demo — ignore it.

## Stack

| Layer | Choice |
|---|---|
| Frontend | Next.js 14 (App Router, all client components), TypeScript, Tailwind 3, Framer Motion, lucide-react, react-icons, sonner (toasts), react-hook-form + zod |
| Backend | Express 4, TypeScript, `pg` (no ORM), jsonwebtoken, multer (memory storage), sharp, @vercel/blob, nodemailer |
| DB | PostgreSQL. Neon/Supabase in prod, local `createdb portfolio` in dev |
| Deploy | `server` → Vercel serverless (`server/api/index.ts` + `server/vercel.json`); `client` → Vercel |

## Commands

```bash
# server  (auto-creates tables + seeds on first boot)
cd server && npm install && npm run dev        # tsx watch, port 5000
cd server && npm run build && npm start       # tsc -> dist, node dist/index.js
cd server && npm run typecheck                # checks src/ AND api/ (the Vercel function)

# client
cd client && npm install && npm run dev        # port 3000
cd client && npm run build
```

## Env vars

`server/.env`: `DATABASE_URL`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `JWT_SECRET`, `PORT`,
`CLIENT_URL`, `SMTP_HOST/PORT/USER/PASS`, `CONTACT_RECEIVER`, plus `BLOB_READ_WRITE_TOKEN`
(add manually for local image-upload testing).

`client/.env` or `.env.local`: `NEXT_PUBLIC_API_URL` (defaults to `http://localhost:5000`).
Changing it needs a client restart.

## Architecture

### Data flow (client)

`Providers.tsx` nests contexts in this **required** order:

```
SiteProvider → ThemeProvider → LanguageProvider → AuthProvider → BackgroundProvider
```

- `SiteContext` — fetches **all** content once on mount (`Promise.all` over 7 endpoints),
  exposes `content`, `loading`, `error`, `refresh()`, `updateSection(section, value)`.
  Every admin page and every public section reads from here. No per-component fetching.
- `ThemeContext` — depends on `useSite()` (reads `content.theme.colors` + `defaultMode`).
  Writes CSS variables onto `document.documentElement` and adds a `dark`/`light` class to `<html>`.
- `LanguageContext` — `lang` (`en` | `bn`), `toggleLang()`, `t(field)` translator,
  and `ui` = static UI strings (nav labels, buttons) per language.
- `AuthContext` — JWT (`admin_token` in localStorage), `isAdmin`, `login`, `logout`.
- `BackgroundContext` — per-visitor background style, localStorage only, never sent to the server.

### Data model (server)

Two shapes only:

1. **Singleton sections** → one `settings` row (`id = 1`) with JSONB columns:
   `meta`, `theme`, `hero`, `about`, `contact`, `footer`.
   API: `GET /api/settings`, `PUT /api/settings/:section` (section name whitelisted).
2. **List collections** → their own tables with a `sort_order` column:
   `skill_groups`, `experience`, `education`, `projects`, `blog_posts`, `testimonials`.
   API: `GET /api/<name>`, `GET /api/<name>/:id` (projects, blogs only), and
   `PUT /api/<name>` = **bulk replace the entire list** (DELETE all + re-INSERT in a transaction,
   `sort_order` = array index). No per-item endpoints by design.

Seed data lives in `server/src/defaultContent.ts` and is only inserted when a table is empty.
`server/src/db/init.ts` runs `SCHEMA_SQL` then the seeders; it is called on boot and once per
warm serverless instance.

Auth: `POST /api/auth/login` compares against env vars, returns a 7-day JWT.
`requireAdmin` middleware guards every `PUT` and the upload route. All `GET`s are public.

## Conventions to follow

### Adding a NEW content section (end-to-end checklist)

1. `server/src/db/schema.ts` — add `CREATE TABLE IF NOT EXISTS` (or a new `settings` column).
2. `server/src/db/<name>.ts` — `rowToItem`, `list<Name>`, `replace<Name>`, optional seeder.
   Copy the `projects.ts` / `skills.ts` shape exactly (transaction + `sort_order` loop).
3. `server/src/defaultContent.ts` — add seed data (skip for opt-in sections like testimonials).
4. `server/src/routes/<name>.ts` — `GET /`, optional `GET /:id`, `PUT /` with `requireAdmin`.
   **Wrap every async handler in `asyncHandler(...)` from `../middleware/asyncHandler`** — Express 4
   does not catch rejected promises. A final error middleware in `app.ts` turns them into JSON.
5. `server/src/app.ts` — `app.use("/api/<name>", <name>Routes)`.
6. `server/src/db/init.ts` — register the seeder (if it has one).
7. `client/src/lib/api.ts` — add `get<Name>` / `update<Name>` to the `api` object.
8. `client/src/context/SiteContext.tsx` — add to `LIST_SECTIONS` **and** to the
   `Promise.all` destructuring in `refresh()`.
9. `client/src/app/admin/<name>/page.tsx` — copy an existing admin page (see below).
10. `client/src/app/admin/layout.tsx` — add to `NAV` (sidebar) **and**
    `client/src/app/admin/page.tsx` `CARDS` (dashboard grid).
11. `client/src/components/<Name>.tsx` — public section, add it to `client/src/app/page.tsx`.
12. Nav link (optional): `Navbar.tsx` `BASE_LINK_KEYS` + a matching `ui` key in
    **both** `en` and `bn` in `LanguageContext.tsx`.

### Admin page template (the exact shape used everywhere)

```tsx
"use client";
import { useEffect, useState } from "react";
import { useSite } from "@/context/SiteContext";
import { AdminCard, SaveButton, AddItemButton, ItemCard } from "@/components/admin/AdminUI";
import { BilingualInput, PlainInput, TagsInput } from "@/components/admin/BilingualInput";
import { toast } from "sonner";

export default function XAdminPage() {
  const { content, updateSection } = useSite();
  const [form, setForm] = useState<any[] | null>(null);   // any, or any for singletons
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (content?.x) setForm(JSON.parse(JSON.stringify(content.x)));  // deep clone on load
  }, [content]);

  if (!form) return <p className="text-muted">Loading...</p>;

  const save = async () => {
    setSaving(true);
    try { await updateSection("x", form); toast.success("X updated!"); }
    catch (e: any) { toast.error(e?.message || "Failed to save."); }
    finally { setSaving(false); }
  };

  const update = (i: number, patch: any) => {           // immutable index update
    const next = [...form]; next[i] = { ...next[i], ...patch }; setForm(next);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Title</h1>
      {/* AdminCard / BilingualInput / PlainInput / TagsInput / ImageUploader */}
      <AddItemButton label="Add ..." onClick={() => setForm([...form, newItem()])} />
      <SaveButton saving={saving} onClick={save} />
    </div>
  );
}
```

### Reusable admin building blocks

- `components/admin/AdminUI.tsx` — `AdminCard`, `SaveButton`, `AddItemButton`, `RemoveItemButton`, `ItemCard`
- `components/admin/BilingualInput.tsx` — `BilingualInput` (en+bn side by side),
  `PlainInput` (string), `TagsInput` (comma-separated `string[]`),
  `BilingualListInput` (parallel-line textareas → `Bilingual[]`)
- `components/admin/ImageUploader.tsx` — upload button + paste-URL field, uses `api.uploadImage`
- `components/EditFab.tsx` — floating ✏️ link, auto-hidden unless `isAdmin`

### Public section template

```tsx
"use client";
import { motion } from "framer-motion";
import { useSite } from "@/context/SiteContext";
import { useLanguage } from "@/context/LanguageContext";
import EditFab from "@/components/EditFab";

export default function X() {
  const { content } = useSite();
  const { t, ui } = useLanguage();
  const items = content?.x || [];
  if (!content?.x) return <section id="x" className="py-24" />;  // graceful pre-load state
  return (
    <section id="x" className="relative px-6 py-24 text-foreground">
      <EditFab href="/admin/x" />
      {/* framer-motion whileInView + viewport={{ once: true }} */}
    </section>
  );
}
```

### Styling rules

Colors are **CSS variables**, never hex literals in JSX. Tailwind aliases:

```
bg-background  text-foreground  text-muted  bg-surface  border-border
bg-primary  text-primary  from-primary  to-secondary  bg-accent
```

- Defined in `client/src/app/globals.css` (`--color-*`), registered in `client/tailwind.config.ts`.
- Admin-editable: primary, secondary, accent, backgroundDark/Light, surfaceDark/Light, textDark/Light.
- **Not** admin-editable (hardcoded in globals.css): `--color-border`, `--color-muted`
  (border/muted are re-declared under `html.light`).
- Brand look: `rounded-2xl`/`rounded-3xl` cards, `border border-border`, `bg-surface/60`,
  `bg-gradient-to-r from-primary to-secondary` for CTA buttons, `text-muted` for secondary text.
- Width helpers: `max-w-content` (1100px), `max-w-7xl`, `max-w-4xl` (admin panel).
- Section anchors need `scroll-margin-top: 6.5rem` — already global for `section[id]`.
- Navbar is `fixed top-4` → page sections use `pt-24`/`pt-36` to clear it.

### Bilingual content

- Content fields are `{ en, bn }` in JSONB; render with `t(field)`, which falls back
  `field[lang] → field.en → field.bn`.
- `t()` also accepts a plain `string`, so `t(contact.email)` is valid.
- Static UI labels (nav items, buttons) live in `UI_STRINGS` inside
  `client/src/context/LanguageContext.tsx` — **always add both `en` and `bn`** and read via `ui.key`.
- `t(someObj)` is truthy-checked in JSX (`t(edu.location) && ...`) because an empty
  `{en:"",bn:""}` object is truthy — use `t(x)` string output, not the object, for conditions.

### Images

- Always render `<img>` with `resolveMediaUrl(url)` (not `next/image`) — the existing code
  disables the lint rule inline. Content image URLs come from Vercel Blob after upload.
- Uploads: `POST /api/upload` (Bearer token) → sharp rotate + resize to 1600px wide +
  webp q82 → `@vercel/blob` `put()` → returns a public URL. Nothing touches local disk.
- Static assets live in `client/public` (`/images/...`, resume PDF at
  `/FullStack-Hasan-Kabir-Robin.pdf`).

## Gotchas / known sharp edges

### Vercel / serverless

1. **Two tsconfigs, deliberately.** `tsconfig.json` is the base used by the editor and by
   Vercel when it type-checks the function: it covers **both** `src/` and `api/` and is
   `noEmit` with **no `rootDir`**. `tsconfig.build.json` is what `npm run build` uses: it pins
   `rootDir: "src"` so the emit stays `dist/index.js` (what `main` and `npm start` point at).
   Putting `api/` into the build config reproduces `error TS6059: File 'api/index.ts' is not
   under 'rootDir' 'src'` — that is the trap this split exists to avoid.
2. **`api/index.ts` is the real deploy artifact.** Vercel bundles it with `@vercel/node` via
   `vercel.json`'s rewrite of `/(.*)` → `/api/index`. The `dist/` emit is *not* used by Vercel.
3. **DB connections are capped at 1 per instance** (`DATABASE_POOL_MAX` overrides). Each warm
   Vercel instance is its own process, so the pg default of 10 exhausts a managed provider's
   connection limit under concurrency and produces intermittent
   "timeout exceeded when trying to connect".
4. **`initDatabase()` failures are not cached.** `api/index.ts` clears `dbReady` on rejection so
   a transient cold-start blip does not permanently poison a warm instance.
5. **`sslmode=require` in `DATABASE_URL` is treated as `verify-full` by pg 8.23** (it prints a
   warning on boot). Managed providers (Neon/Supabase) work, but a certificate-chain error here
   surfaces as a 500 from the function, not a build error — check the function's runtime logs.
6. `BLOB_READ_WRITE_TOKEN` must exist in Vercel (Storage tab) or image upload 500s at runtime.
   `DATABASE_URL`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `JWT_SECRET` are all required in Vercel
   env — `server/.env` is gitignored, so nothing carries over from local.

### Codebase

7. **Adding a column to an existing table won't apply on a deployed DB.**
   `schema.ts` only runs `CREATE TABLE IF NOT EXISTS`. For a new column you must add an
   idempotent `ALTER TABLE ... ADD COLUMN IF NOT EXISTS` statement.
8. **Bulk-replace means IDs matter.** `replace*` regenerates an id when the item has none
   (`proj-${Date.now()}-${order}`), which breaks `/projects/[id]` and `/blog/[id]` links.
   Always assign a stable `id` when creating items (`newProject()` does this).
9. **The contact form does not use the backend.** `components/Contact.tsx` composes a
   `mailto:` link. The nodemailer endpoint (`POST /api/contact`) exists but is unwired.
10. `client/src/app/admin/login/page.tsx` calls `router.replace()` during render (existing smell).
11. `resolveMediaUrl` only prefixes `API_URL` for legacy `/uploads/...` paths; Vercel Blob URLs
    pass through untouched. `/images/...` and `http...` are returned as-is.
12. `SiteContext.refresh()`'s `Promise.all` is a hardcoded list — forgetting to register a new
    collection there means the admin panel can't load it.
13. `tailwind.config.ts` `content` globs cover `src/app/**` and `src/components/**` only —
    new component locations need a glob update.
14. No tests and no shared ESLint config beyond `eslint-config-next`; `npm run lint` is available
    in `client` only.

## Page / route map

```
/                      Hero → About → Projects → Skills → Experience → Education
                       → Blog → Testimonials → ResumeCta → Contact → Footer
/blog/[id]             post detail (client fetch, notFound state on 404)
/projects/[id]         project detail (client fetch, gallery slider + features)
/admin/login           login page (rendered bare, no sidebar)
/admin                 dashboard grid of section links
/admin/{theme,hero,about,skills,experience,education,projects,blog,
       testimonials,contact,settings}
```
