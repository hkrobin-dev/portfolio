# Portfolio — White-Label / Fully Editable Website

একটি সম্পূর্ণ **white-label, fully editable** পোর্টফোলিও ওয়েবসাইট, **PostgreSQL**
ডাটাবেজে সব কনটেন্ট রাখে। Admin লগইন করে Banner, About, Skills, Experience,
Education, Projects, Blog, Contact, রং/থিম — সব কিছু নিজে থেকে এডিট করা যায়।
সাইটে **Dark/Light/Device-default** মোড, visitor-নিজের-পছন্দের **Background থিম**,
এবং **Bangla/English** ভাষা টগল করার সিস্টেম আছে।

## 🧩 Project Structure

```
portfolio-main/
├── client/   → Next.js frontend (public site + /admin dashboard)
└── server/   → Express + PostgreSQL backend (content API, auth, image upload)
```

## ⚙️ প্রথমবার সেটআপ (Setup)

### ১. PostgreSQL ডাটাবেজ বানান

লোকাল মেশিনে PostgreSQL ইনস্টল থাকলে:

```bash
createdb portfolio
```

(অথবা [Neon](https://neon.tech), [Supabase](https://supabase.com),
[Railway](https://railway.app) — যেকোনো একটায় ফ্রি PostgreSQL বানিয়ে
তার connection string ব্যবহার করুন।)

### ২. Server চালু করুন

```bash
cd server
cp .env.example .env
```

`.env` ফাইলে নিচের জিনিসগুলো বসান:

```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/portfolio
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-own-strong-password
JWT_SECRET=any-long-random-string
```

```bash
npm install
npm run dev
```

সার্ভার প্রথমবার চালু হওয়ার সময় নিজে থেকেই টেবিল তৈরি করে এবং ডিফল্ট কনটেন্ট
বসিয়ে দেয় — আলাদা করে migrate/seed কমান্ড চালানোর দরকার নেই। Server চলবে:
`http://localhost:5000`

### ৩. Client চালু করুন

```bash
cd client
cp .env.local.example .env.local
npm install
npm run dev
```

Site চলবে: `http://localhost:3000`

## 🔐 Admin Panel ব্যবহার

1. সাইটের Navbar-এ **Login** বাটনে ক্লিক করুন।
2. `.env`-এ যে username/password দিয়েছেন সেটা দিয়ে লগইন করুন।
3. লগইন হয়ে গেলে Navbar-এ **Dashboard** বাটন আসবে — সেখান থেকে `/admin` প্যানেলে যান।
4. প্রতিটি সেকশনের উপরের ডানপাশে ছোট্ট ✏️ **Edit** বাটনেও ক্লিক করে সরাসরি সেই
   সেকশনের এডিট পেজে যেতে পারবেন।

### লগইন-এ সমস্যা হলে
- `.env` ফাইলে আসলেই `ADMIN_USERNAME`/`ADMIN_PASSWORD` বসিয়েছেন কিনা আর server
  restart করেছেন কিনা চেক করুন (`.env` বদলালে সার্ভার রিস্টার্ট লাগবে)।
- Client-এর `.env.local`-এ `NEXT_PUBLIC_API_URL` server-এর ঠিকানার সাথে মিলছে কিনা
  দেখুন। বদলালে client-ও রিস্টার্ট করতে হবে (env পরিবর্তন rebuild ছাড়া কাজ করে না)।
- Browser console-এ Network ট্যাব খুলে `/api/auth/login` রিকোয়েস্ট status code
  দেখুন — 401 মানে ভুল username/password, network error/CORS মানে server address
  ভুল বা server বন্ধ আছে।
- Server-এর CORS ইচ্ছাকৃতভাবে সব origin allow করে (JWT bearer token ব্যবহার করা
  হয়, cookie না — তাই cross-origin ঝুঁকি নেই), তাই সাধারণত CORS সমস্যা হবার কথা না।

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
থেকে ছবি দেওয়া যায় (server-এর `server/uploads` ফোল্ডারে সেভ হয়), অথবা চাইলে সরাসরি
কোনো ইমেজ URL পেস্ট করেও দেওয়া যায়।

## 📄 "See More" / "Read More" ডিটেইল পেজ

- প্রতিটা Project কার্ডে ক্লিক করলে বা "See More"-এ ক্লিক করলে `/projects/[id]`
  পেজে পুরো বিবরণ, ফিচার লিস্ট, Live Demo ও Source Code বাটন দেখা যাবে।
- প্রতিটা Blog কার্ডের "Read More"-এ ক্লিক করলে `/blog/[id]` পেজে পুরো পোস্ট
  পড়া যাবে।
- Admin Panel-এ এই ডিটেইল কনটেন্ট (Full Description / Full Content) আলাদা
  ফিল্ড হিসেবে এডিট করা যায়।

## 🚀 Deploy করার সময়

- Server-এর জন্য একটা PostgreSQL ডাটাবেজ (Neon/Supabase/Railway/নিজস্ব VPS) ও
  আপলোড করা ছবির জন্য persistent storage লাগবে (তাই server pure serverless
  platform-এ না দিয়ে VPS/Railway/Render-এ দিন)।
- Client Vercel-এ normal ভাবেই ডিপ্লয় করা যায় — শুধু `NEXT_PUBLIC_API_URL`-কে
  আপনার backend-এর পাবলিক URL-এ সেট করে দিন।

Production build:

```bash
# server
cd server && npm run build && npm start

# client
cd client && npm run build && npm start
```

## 🔧 Tech Stack

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion
- **Backend:** Express, TypeScript, JWT auth, Multer (image upload)
- **Database:** PostgreSQL (via the `pg` driver, plain SQL — no ORM binaries to fight with)
