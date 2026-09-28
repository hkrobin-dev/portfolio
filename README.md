# Portfolio — White-Label / Fully Editable Website

একটি সম্পূর্ণ **white-label, fully editable** পোর্টফোলিও ওয়েবসাইট, **PostgreSQL**
ডাটাবেজে সব কনটেন্ট রাখে। Admin লগইন করে Banner, About, Skills, Experience,
Education, Projects, Blog, Contact, রং/থিম — সব কিছু নিজে থেকে এডিট করা যায়।
সাইটে **Dark/Light/Device-default** মোড, visitor-নিজের-পছন্দের **Background থিম**,
এবং **Bangla/English** ভাষা টগল করার সিস্টেম আছে।

## 🧩 Project Structure

```
portfolio/
└── client/   → Next.js 14 — public site + /admin dashboard + /api (backend)
```

আগে `server/` (Express) আলাদা ফোল্ডারে ছিল। এখন **পুরোটাই একটাই Next.js অ্যাপ** —
ফ্রন্টএন্ড, অ্যাডমিন ড্যাশবোর্ড, আর ব্যাকএন্ড API (`src/app/api`) একই অ্যাপে।
তাই একটি ডোমেইনেই সব কিছু চলে, আলাদা করে কোনো backend server লাগে না।

## ⚙️ প্রথমবার সেটআপ (Setup)

### ১. PostgreSQL ডাটাবেজ বানান

লোকাল মেশিনে PostgreSQL ইনস্টল থাকলে:

```bash
createdb portfolio
```

(অথবা [Neon](https://neon.tech), [Supabase](https://supabase.com),
[Railway](https://railway.app) — যেকোনো একটায় ফ্রি PostgreSQL বানিয়ে
তার connection string ব্যবহার করুন।)

### ২. চালু করুন

```bash
cd client
cp .env.local.example .env.local
```

`.env.local` ফাইলে নিচের জিনিসগুলো বসান:

```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/portfolio
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-own-strong-password
JWT_SECRET=any-long-random-string
```

`BLOB_READ_WRITE_TOKEN` ছাড়া ছবি আপলোড কাজ করবে না (নিচে দেখুন)।

```bash
npm install
npm run dev
```

সাইট চলবে: `http://localhost:3000` — এখানেই API-ও আছে (`/api/...`)।

অ্যাপটি প্রথমবার চালু হওয়ার সময় নিজে থেকেই টেবিল তৈরি করে এবং ডিফল্ট কনটেন্ট
বসিয়ে দেয় — আলগা করে migrate/seed কমান্ড চালানোর দরকার নেই।

## 🔐 Admin Panel ব্যবহার

1. সাইটের Navbar-এ **Login** বাটনে ক্লিক করুন।
2. `.env`-এ যে username/password দিয়েছেন সেটা দিয়ে লগইন করুন।
3. লগইন হয়ে গেলে Navbar-এ **Dashboard** বাটন আসবে — সেখান থেকে `/admin` প্যানেলে যান।
4. প্রতিটি সেকশনের উপরের ডানপাশে ছোট্ট ✏️ **Edit** বাটনেও ক্লিক করে সরাসরি সেই
   সেকশনের এডিট পেজে যেতে পারবেন।

### লগইন-এ সমস্যা হলে
- `client/.env.local` ফাইলে আসলেই `ADMIN_USERNAME`/`ADMIN_PASSWORD` বসিয়েছেন কিনা চেক
  করুন, আর `.env.local` বদলানোর পর ডেভ সার্ভার **রিস্টার্ট** করুন।
- Browser console-এ Network ট্যাব খুলে `/api/auth/login` রিকোয়েস্টের status code
  দেখুন — `401` মানে ভুল username/password, `500` মানে `.env.local`-এর
  `DATABASE_URL` ভুল বা ডাটাবেজে পৌঁছানো যাচ্ছে না।
- **CORS আর আলাদা server address-এর সমস্যা আর নেই** — সাইট আর API একই origin-এ,
  তাই `NEXT_PUBLIC_API_URL` সেট করার কোনো দরকার নেই (এটা শুধু একটা legacy
  override হিসেবে কোডে আছে)।

### Admin Panel থেকে যা যা এডিট করা যায়:
- **Theme & Colors** — Primary/Secondary রং, Dark/Light-এর background/text রং, ডিফল্ট মোড (Dark/Light/Device default)
- **Banner / Hero** — নাম, টাইটেল, ডেসক্রিপশন, ইমেইল-ফোন-হোয়াটসঅ্যাপ, রিজিউম লিংক, সোশ্যাল লিংক, টেক-স্ট্যাক ট্যাগ
- **About Me** — ছবি (আপলোড বা URL), বায়ো প্যারাগ্রাফ, স্ট্যাটস
- **Skills** — যেকোনো ক্যাটাগরি ও স্কিল আইটেম add/remove
- **Experience** — কাজের অভিজ্ঞতা add/edit/remove, প্রতিটির জন্য bullet points ও tech stack
- **Education** — শিক্ষাগত যোগ্যতা add/edit/remove
- **Projects** — স্ক্রিনশট, শর্ট + ফুল বিবরণ, লাইভ/কোড লিংক, ফিচার হাইলাইট — প্রতিটা প্রজেক্টের নিজস্ব **"See More" পেজ** (`/projects/[id]`) থাকে
- **Blog Posts** — কভার ছবি, শর্ট ডেসক্রিপশন, ফুল কনটেন্ট — প্রতিটা পোস্টের নিজস্ব **পেজ** (`/blog/[id]`) থাকে
- **Contact Info** — ইমেইল, ফোন, লোকেশন, ফুটার তথ্য
- **Settings** — সাইট টাইটেল, favicon

প্রতিটি টেক্সট ফিল্ডে **English** ও **বাংলা** — দুইটা আলাদা বক্স থাকে, দুইটাই লিখলে
ভিজিটর Navbar-এর ভাষা টগল থেকে বাংলা/ইংরেজি সুইচ করতে পারবে।

## 🎨 Dark / Light / Device Default

Navbar-এর সান/মুন/মনিটর আইকনে ক্লিক করলে মোড ঘোরে: **Dark → Light → Device
Default → Dark...**। "Device Default" বেছে নিলে ভিজিটরের ফোন/কম্পিউটারের
সিস্টেম থিম অনুযায়ী সাইট নিজে থেকেই Dark/Light হয়ে যাবে, এবং ভিজিটর তার ডিভাইসের
থিম বদলালে সাইটও সাথে সাথে বদলে যাবে। Admin Panel-এর Theme পেজ থেকে সাইটের
ডিফল্ট মোড (নতুন ভিজিটরদের জন্য) ঠিক করা যায়।

## 🖌️ Background থিম (শুধু ভিজিটরের নিজের জন্য)

পেজের নিচে ডানদিকে একটা রঙিন **পেইন্ট বাটন** আছে — এতে ক্লিক করলে Aurora Glow,
Starfield, Grid, Dots, Plain — এই কয়েকটা background স্টাইলের মধ্যে থেকে বেছে
নেওয়া যায়। এই পছন্দ **শুধু সেই ভিজিটরের ব্রাউজারে সেভ থাকে** (localStorage) —
সার্ভারে কিছু সেভ হয় না, তাই সাইটের মালিকের কনটেন্টে কোনো প্রভাব ফেলে না। প্রতিটা
ভিজিটর নিজের মতো করে উপভোগ করতে পারবে।

## 🌐 ভাষা (Bangla/English)

Navbar-এর EN/বাং বাটনে ক্লিক করলে ভাষা পরিবর্তন হয়, পছন্দ ভিজিটরের ব্রাউজারে
(localStorage) সেভ থাকে।

## 🖼️ ছবি আপলোড

Admin Panel-এর যেকোনো ইমেজ ফিল্ডে "Upload Image" বাটনে ক্লিক করে সরাসরি কম্পিউটার
থেকে ছবি দেওয়া যায়, অথবা চাইলে সরাসরি কোনো ইমেজ URL পেস্ট করেও দেওয়া যায়।

আপলোড করা ছবি **Vercel Blob** storage-তে জমা হয় (লোকাল ডিস্কে কিছু সেভ হয় না)।
সার্ভার ছবিটা নিয়ে ঘুরিয়ে দাঁড করায়, ১৬০০px চওড়ায় ছোট করে, WebP (q82) তে
কম্প্রেস করে তারপর Blob-এ আপলোড করে — তাই ছবি হালকা থাকে ও সব platform-এ কাজ করে।

এটার জন্য `BLOB_READ_WRITE_TOKEN` লাগে (নিচের Deploy সেকশন দেখুন)। ছবি **৪ MB বা
এর কম** হতে হবে — Vercel বড় request body আটকে দেয়, তাই এর বেশি হলে আপলোড
আগেই থেমে যায়।

## 📄 "See More" / "Read More" ডিটেইল পেজ

- প্রতিটা Project কার্ডে ক্লিক করলে বা "See More"-এ ক্লিক করলে `/projects/[id]`
  পেজে পুরো বিবরণ, ফিচার লিস্ট, Live Demo ও Source Code বাটন দেখা যাবে।
- প্রতিটা Blog কার্ডের "Read More"-এ ক্লিক করলে `/blog/[id]` পেজে পুরো পোস্ট
  পড়া যাবে।
- Admin Panel-এ এই ডিটেইল কনটেন্ট (Full Description / Full Content) আলাদা
  ফিল্ড হিসেবে এডিট করা যায়।

## 🚀 Deploy করা — Vercel (একটাই প্রজেক্ট, একটাই ডোমেইন)

আগে দুটো আলাদা Vercel প্রজেক্ট লাগত (একটা client-এর জন্য, একটা Express server-এর
জন্য)। এখন **একটাই** প্রজেক্ট — Next.js অ্যাপ নিজেই সাইট, অ্যাডমিন প্যানেল আর API
তিনটাই সার্ভ করে।

1. **PostgreSQL বানান** — [Neon](https://neon.tech) বা [Supabase](https://supabase.com)-এ ফ্রি একটা
   Postgres ডাটাবেজ বানিয়ে connection string (`DATABASE_URL`) নিন।
2. Vercel-এ গিয়ে **New Project** → এই রিপোর ট্রান্সফার করুন → প্রজেক্ট সেটিংসে
   **Root Directory = `client`** করে দিন। Framework অটো-ডিটেক্ট হয়ে Next.js পাবে,
   build command ও এখন `next build`।
3. প্রজেক্টের **Storage** ট্যাব থেকে একটা **Blob** স্টোর যোগ করুন — এটা automatic
   ভাবে `BLOB_READ_WRITE_TOKEN` env variable বসিয়ে দেবে, কিছু করা লাগবে না।
4. **Settings → Environment Variables**-এ বসান:
   ```
   DATABASE_URL=...
   ADMIN_USERNAME=...
   ADMIN_PASSWORD=...
   JWT_SECRET=...
   ```
   `NEXT_PUBLIC_API_URL` লাগবে **না** — API একই origin-এ চলে।
5. Deploy করুন। Vercel একটা URL দেবে (যেমন `https://your-app.vercel.app`),
   পরে **Settings → Domains** থেকে আপনার ডোমেইন যুক্ত করুন।

> ⚠️ **ডোমেইন আগে বদলাবেন না।** আগে `*.vercel.app` ঠিকানায় গিয়ে চোখে দেখে নিন যে
> সাইট, লগইন, এডিট সেভ, আর ছবি আপলোড ঠিকভাবে কাজ করছে। তারপর ডোমেইন পয়েন্ট করুন।

### লোকাল কম্পিউটারে সেটআপের সময় (Vercel Blob-এর জন্য)
লোকাল ডেভেলপমেন্টে ছবি আপলোড টেস্ট করতে চাইলে, Vercel প্রজেক্টের Storage ট্যাব থেকে
Blob-এর `BLOB_READ_WRITE_TOKEN` কপি করে `client/.env.local`-এ বসান।

### Vercel ছাড়া অন্য কোথাও (Railway/Render/VPS)
যেকোনো Node.js হোস্টিংয়েই চলবে — `cd client && npm run build && npm start`।
ছবি এখনও Vercel Blob-এই যাবে (শুধু `BLOB_READ_WRITE_TOKEN` env variable-এ থাকলেই),
তাই hosting বদলালেও image upload ভাঙবে না।

## 🗄️ Backend কোথায় আছে

API রুটগুলো Next.js-এর নিজস্ব route handler হিসেবে `client/src/app/api/`-তে আছে:

```
/api/settings        GET          /api/projects       GET, PUT
/api/settings/[sec]   PUT          /api/projects/[id]  GET
/api/skills          GET, PUT     /api/blogs          GET, PUT
/api/experience      GET, PUT     /api/blogs/[id]     GET
/api/education       GET, PUT     /api/testimonials   GET, PUT
/api/auth/login      POST         /api/upload         POST
/api/auth/me         GET          /api/contact        POST
```

DB লজিক (`src/lib/server/db/`) সরাসরি `pg` ব্যবহার করে — কোনো ORM নেই।
`src/lib/server/` ফোল্ডারের শুরুতে `import "server-only"` আছে, তাই কোনো
client component ভুল করে এখান থেকে কিছু import করলে build-ই fail হয়ে যাবে
(secrets browser-এ চলে যাওয়ার আগেই ধরা পড়বে)।

## 🔧 Tech Stack

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion
- **Backend:** Next.js Route Handlers (API), TypeScript, JWT auth, `sharp` (image processing)
- **Database:** PostgreSQL (via the `pg` driver, plain SQL — no ORM binaries to fight with)
