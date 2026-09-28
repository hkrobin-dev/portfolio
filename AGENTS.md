# AGENTS.md — Context for working in this repo

## What this project is

A **white-label, fully editable portfolio website**. All content lives in PostgreSQL and is
edited through an `/admin` dashboard — no code changes needed to change copy, images, colors,
projects, blog posts, etc.

It is a **single Next.js app** — the public site, the admin dashboard, and the backend API all
live in `client/` and deploy to **one domain**:

```
client/src/app/         → pages (public site + /admin)
client/src/app/api/     → backend API (Next.js Route Handlers)
client/src/lib/server/  → server-only code: DB layer, auth, http helpers
```

There is no separate Express server. It was removed when the backend moved into Next.js; the
old code is still in git history at commit `2af7e06` if you ever need to look at it.

## Stack

| Layer | Choice |
|---|---|
| Frontend | Next.js 14 (App Router, all client components), TypeScript, Tailwind 3, Framer Motion, lucide-react, react-icons, sonner (toasts), react-hook-form + zod |
| Backend | Next.js Route Handlers in `src/app/api`, `pg` (no ORM), jsonwebtoken, sharp, @vercel/blob, nodemailer |
| DB | PostgreSQL. Neon/Supabase in prod, local `createdb portfolio` in dev |
| Deploy | Vercel — one project, **Root Directory = `client`** |

## Commands

```bash
# everything runs from client/
cd client && npm install && npm run dev     # next dev, port 3000 (site + API)
cd client && npm run build && npm start    # production server
cd client && npx tsc --noEmit              # typecheck only
cd client && npm run lint
```

The API is served by `npm run dev` / `npm start` too — there is no second process. If the
frontend can reach the database, the API works. Schema creation and seeding happen
automatically on the first query of each server instance.

## Env vars

`client/.env.local` (gitignored; copy from `.env.local.example`): `DATABASE_URL`,
`ADMIN_USERNAME`, `ADMIN_PASSWORD`, `JWT_SECRET`, `BLOB_READ_WRITE_TOKEN` (image upload),
`SMTP_HOST/PORT/USER/PASS` + `CONTACT_RECEIVER` (only if you wire up the contact endpoint),
and optionally `DATABASE_POOL_MAX`.

`NEXT_PUBLIC_API_URL` is **not needed** — the API is same-origin. It survives in `lib/api.ts`
only as a legacy escape hatch. Never point it at `localhost:5000`; nothing listens there now.

Next.js loads `.env.local` itself, so there is no `dotenv` call anywhere in the codebase.

## Architecture

### Data flow (client)

`Providers.tsx` nests contexts in this **required** order:

```
SiteProvider → BackgroundProvider → ThemeProvider → LanguageProvider → AuthProvider
```

- `SiteContext` — fetches **all** content once on mount (`Promise.all` over 7 endpoints),
  exposes `content`, `loading`, `error`, `refresh()`, `updateSection(section, value)`.
  Every admin page and every public section reads from here. No per-component fetching.
- `BackgroundContext` — per-visitor background style, localStorage only, never sent to the
  server. Sits **above** `ThemeProvider` because it has no dependencies of its own and
  `ThemeContext` needs to read `bgStyle` (see the Starfield coupling below). Moving it back
  under `AuthProvider` breaks the build.
- `ThemeContext` — depends on `useSite()` (reads `content.theme.colors` + `defaultMode`) and
  on `useBackground()`. Writes CSS variables onto `document.documentElement` and adds a
  `dark`/`light` class to `<html>`.
- `LanguageContext` — `lang` (`en` | `bn`), `toggleLang()`, `t(field)` translator,
  and `ui` = static UI strings (nav labels, buttons) per language.
- `AuthContext` — JWT (`admin_token` in localStorage), `isAdmin`, `login`, `logout`.

### The API (`src/app/api`)

Every endpoint is a Route Handler. The mechanical translations from the old Express code:

| Express | Route Handler |
|---|---|
| `req.body` | `await req.json()` |
| `res.json(x)` | `Response.json(x)` |
| `res.status(n).json(x)` | `Response.json(x, { status: n })` |
| `req.params.id` | `({ params }: { params: { id: string } })` |
| `asyncHandler(...)` | nothing — Next awaits handlers and catches throws |
| `cors()` | nothing — same origin |
| `express.json({ limit })` | nothing |

`requireAdmin` was middleware and is now a **function** returning *either* the admin or a
401 `Response`:

```ts
const admin = requireAdmin(req);
if (admin instanceof Response) return admin;
```

End every try/catch with `return jsonError(e)` so the thrown message survives into the JSON
body — Next would otherwise replace it with a generic 500 page.

### Data model

Two shapes only:

1. **Singleton sections** → one `settings` row (`id = 1`) with JSONB columns:
   `meta`, `theme`, `hero`, `about`, `contact`, `footer`.
   API: `GET /api/settings`, `PUT /api/settings/:section` (section name whitelisted).
2. **List collections** → their own tables with a `sort_order` column:
   `skill_groups`, `experience`, `education`, `projects`, `blog_posts`, `testimonials`.
   API: `GET /api/<name>`, `GET /api/<name>/:id` (projects, blogs only), and
   `PUT /api/<name>` = **bulk replace the entire list** (DELETE all + re-INSERT in a
   transaction, `sort_order` = array index). No per-item endpoints by design.

Seed data lives in `src/lib/server/defaultContent.ts` and is only inserted when a table is
empty. `src/lib/server/db/init.ts` runs `SCHEMA_SQL` then the seeders; `db/index.ts` calls it
lazily on the first query of each instance (see gotcha 1).

Auth: `POST /api/auth/login` compares against env vars, returns a 7-day JWT.
`requireAdmin` guards every `PUT` and the upload route. All `GET`s are public.

## Conventions to follow

### Adding a NEW content section (end-to-end checklist)

1. `src/lib/server/db/schema.ts` — add `CREATE TABLE IF NOT EXISTS` (or a new `settings` column).
2. `src/lib/server/db/<name>.ts` — `rowToItem`, `list<Name>`, `replace<Name>`, optional seeder.
   Copy the `projects.ts` / `skills.ts` shape exactly (transaction + `sort_order` loop).
   Import `pool` from `"./index"`, **not** `"./pool"` — see gotcha 1.
3. `src/lib/server/defaultContent.ts` — add seed data (skip for opt-in sections like testimonials).
4. `src/app/api/<name>/route.ts` — `GET`, optional `../[id]/route.ts` for `GET /:id`, and
   `PUT` guarded by `requireAdmin`. Every GET that reads the DB needs
   `export const dynamic = "force-dynamic"` (gotcha 3). Every try/catch ends in `jsonError(e)`.
5. `src/lib/server/db/init.ts` — register the seeder (if it has one), passing the raw pool.
6. `src/lib/api.ts` — add `get<Name>` / `update<Name>` to the `api` object.
7. `src/context/SiteContext.tsx` — add to `LIST_SECTIONS` **and** to the
   `Promise.all` destructuring in `refresh()`.
8. `src/app/admin/<name>/page.tsx` — copy an existing admin page (see below).
9. `src/app/admin/layout.tsx` — add to `NAV` (sidebar) **and**
   `src/app/admin/page.tsx` `CARDS` (dashboard grid).
10. `src/components/<Name>.tsx` — public section, add it to `src/app/page.tsx`.
11. Nav link (optional): `Navbar.tsx` `BASE_LINK_KEYS` + a matching `ui` key in
    **both** `en` and `bn` in `LanguageContext.tsx`.

### Route handler template (the exact shape used everywhere)

```ts
import { requireAdmin } from "@/lib/server/auth";
import { list<Name>, replace<Name> } from "@/lib/server/db/<name>";
import { jsonError } from "@/lib/server/http";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return Response.json(await list<Name>());
  } catch (e) {
    return jsonError(e);
  }
}

export async function PUT(req: Request) {
  const admin = requireAdmin(req);
  if (admin instanceof Response) return admin;

  try {
    return Response.json(await replace<Name>(await req.json()));
  } catch (e) {
    return jsonError(e);
  }
}
```

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

- Defined in `src/app/globals.css` (`--color-*`), registered in `tailwind.config.ts`.
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
  `src/context/LanguageContext.tsx` — **always add both `en` and `bn`** and read via `ui.key`.
- `t(someObj)` is truthy-checked in JSX (`t(edu.location) && ...`) because an empty
  `{en:"",bn:""}` object is truthy — use `t(x)` string output, not the object, for conditions.

### Images

- Always render `<img>` with `resolveMediaUrl(url)` (not `next/image`) — the existing code
  disables the lint rule inline. Content image URLs come from Vercel Blob after upload.
- Uploads: `POST /api/upload` (Bearer token) → `req.formData()` → sharp rotate + resize to
  1600px wide + webp q82 → `@vercel/blob` `put()` → returns a public URL. Nothing touches disk.
- Static assets live in `public/` (`/images/...`, resume PDF at
  `/FullStack-Hasan-Kabir-Robin.pdf`).

## Gotchas / known sharp edges

### The lazy-DB-init deadlock (read this before adding a seeder)

1. **`db/index.ts` exports a fake `pool` that runs `initDatabase()` first.** Every DB module
   imports `pool` from `"./index"`, and the first `pool.query(...)` of a server instance
   triggers the schema + seed step; all later queries reuse the resolved promise.
   **Anything that runs *inside* `initDatabase()` must use the raw pool from `"./pool"`** —
   the seeders otherwise call `ensureDb()` from inside the very promise `ensureDb()` is
   waiting on, and every request hangs until the platform times it out. That bug is easy to
   reintroduce and has no type error, so each `seed*` function takes the pool as a **required
   `db: Pool` argument** and `init.ts` passes the raw one. Symptoms if you get it wrong:
   `/api/auth/me` responds in <1s (no DB) while any DB route never returns.
2. **Init failures are not cached.** `db/index.ts` clears `ready` on rejection so a transient
   cold-start blip does not permanently poison a warm instance.

### Vercel / Next.js

3. **Every DB-reading GET needs `export const dynamic = "force-dynamic"`.** Without it Next
   prerenders the route at build time — which hits the database during `next build` and then
   serves a frozen snapshot until the next deploy.
4. **`serverComponentsExternalPackages`** in `next.config.js` keeps `pg`, `sharp`,
   `@vercel/blob`, `nodemailer` and `jsonwebtoken` out of the bundler, so their native and
   optional dependencies are not traced. It is the Next 14 name; Next 15 renamed it to
   `serverExternalPackages`.
5. **DB connections are capped at 1 per instance** (`DATABASE_POOL_MAX` overrides). Each warm
   Vercel instance is its own process, so pg's default of 10 exhausts a managed provider's
   connection limit under concurrency and produces intermittent
   "timeout exceeded when trying to connect".
6. **`sslmode=require` in `DATABASE_URL` is treated as `verify-full` by pg 8.23** (it prints a
   warning on boot). Managed providers (Neon/Supabase) work, but a certificate-chain error here
   surfaces as a 500 from the route, not a build error — check the function's runtime logs.
7. **Uploads are capped at 4 MB on purpose.** Vercel rejects request bodies over ~4.5MB before
   the function runs, so a higher limit is never enforced by our own check — the request just
   dies with an opaque gateway error. `upload/route.ts` and `api.uploadImage` in `lib/api.ts`
   both enforce 4MB so the user gets a readable message.
8. `BLOB_READ_WRITE_TOKEN` must exist in Vercel (Storage tab) or image upload 500s at runtime
   with a clear message. `DATABASE_URL`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `JWT_SECRET` are
   all required in Vercel env — `.env.local` is gitignored, so nothing carries over from local.
9. **The Blob store's Access setting must be Public.** `upload/route.ts` calls `put()` with
   `access: "public"`, and a store created as Private rejects it with *"Cannot use public
   access on a private store"*. This is not cosmetic: images are rendered by plain `<img>`
   tags that send no auth header, so private blobs (which need expiring signed URLs) would not
   display. Fix is Vercel → Storage → the store → Settings → Access → Public, then redeploy.
   Adding a token to `.env.local` is not enough — the store setting lives in Vercel.

### Codebase

10. **`import "server-only"` guards the server layer.** It sits at the top of `lib/server/auth.ts`,
    `http.ts` and `db/index.ts`, so a client component that imports them fails `next build`
    with "You're importing a component that needs server-only" instead of shipping secrets to
    the browser. Add it to any new module a route handler imports.
11. **Do not add `src/middleware.ts` to guard `/admin`.** The JWT lives in `localStorage`,
    which middleware cannot read, so it would either be useless or give a false sense of
    protection. Admin gating is client-side (`AuthContext`) plus `requireAdmin` per route.
    Moving to an httpOnly cookie is a real auth rewrite, not a drop-in.
12. **Adding a column to an existing table won't apply on a deployed DB.**
    `schema.ts` only runs `CREATE TABLE IF NOT EXISTS`. For a new column you must add an
    idempotent `ALTER TABLE ... ADD COLUMN IF NOT EXISTS` statement.
13. **Bulk-replace means IDs matter.** `replace*` regenerates an id when the item has none
    (`proj-${Date.now()}-${order}`), which breaks `/projects/[id]` and `/blog/[id]` links.
    Always assign a stable `id` when creating items (`newProject()` does this).
14. **The contact form does not use the backend.** `components/Contact.tsx` composes a
    `mailto:` link. The nodemailer endpoint (`POST /api/contact`) exists but is unwired.
15. `src/app/admin/login/page.tsx` calls `router.replace()` during render (existing smell).
16. `resolveMediaUrl` prefixes `API_URL` for legacy `/uploads/...` paths; Vercel Blob URLs pass
    through untouched. `/images/...` and `http...` are returned as-is. Nothing writes to
    `/uploads` any more — it is kept only so old database rows still resolve.
17. `SiteContext.refresh()`'s `Promise.all` is a hardcoded list — forgetting to register a new
    collection there means the admin panel can't load it.
18. `tailwind.config.ts` `content` globs cover `src/app/**` and `src/components/**` only —
    new component locations need a glob update.
19. No automated tests. `npm run lint` and `npx tsc --noEmit` are the available checks, plus
    the manual round-trip: hit a `GET`, `PUT` the identical payload back, and confirm the
    `GET` is unchanged.
20. **The `stars` background forces dark mode.** `SpaceField` paints a near-black sky, and
    light mode's `--color-text` is near-black, so body copy would be invisible. `ThemeContext`
    therefore derives `modeForced = bgStyle === "stars"` and overrides only the *effective*
    mode. Never write the override back to `modePref`/localStorage — that is what makes it
    reversible: switch the background away and the visitor's real preference returns. This is
    also the only reason `BackgroundProvider` sits above `ThemeProvider`.
21. **`getComputedStyle` must not be called inside the `SpaceField` rAF loop.** It forces a
    style recalculation every frame. The component reads `--color-text` / `--color-primary`
    once and re-reads them from a `MutationObserver` on `<html>`'s `class`/`style`, which is
    where `ThemeContext` writes them. Same trap applies to any future per-frame code.
22. **The navbar's selected link must come from `useActiveSection`, never the link's array
    index.** The original code styled `index === 0`, which lit Home permanently — even at the
    bottom of the page. Two things to preserve: the hook's effect depends on
    `hrefs.join(",")` because `LINK_KEYS` is rebuilt every render (depending on the array
    would re-add every listener each frame), and the active/inactive classes must carry the
    *same* padding and border, differing only in colour — giving active its own padding makes
    the nav reflow horizontally as the highlight moves.

## Page / route map

```
/                      Hero → About → Projects → Skills → Experience → Education
                       → Blog → Testimonials → ScrollCue → Contact → Footer
/blog/[id]             post detail (client fetch, notFound state on 404)
/projects/[id]         project detail (client fetch, gallery slider + features)
/admin/login           login page (rendered bare, no sidebar)
/admin                 dashboard grid of section links
/admin/{theme,hero,about,skills,experience,education,projects,blog,
       testimonials,contact,settings}

/api/settings          GET                  /api/projects        GET, PUT
/api/settings/[section] PUT (admin)         /api/projects/[id]   GET
/api/skills            GET, PUT             /api/blogs           GET, PUT
/api/experience        GET, PUT             /api/blogs/[id]      GET
/api/education         GET, PUT             /api/testimonials    GET, PUT
/api/auth/login        POST                 /api/upload          POST (admin)
/api/auth/me           GET (admin)          /api/contact         POST
```
