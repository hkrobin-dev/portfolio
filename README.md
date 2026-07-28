# Portfolio — Client + Server

Two independent apps:

```
portfolio/
├── client/   → Next.js frontend (the site people see)
└── server/   → Express backend (handles the contact form)
```

## 1. Run the server first

```bash
cd server
npm install
cp .env.example .env
```

Fill in `.env`:
- `SMTP_USER` / `SMTP_PASS` — for Gmail, create an "App Password" at
  https://myaccount.google.com/apppasswords (regular password won't work)
- `CONTACT_RECEIVER` — the email address you want messages sent to

Then:
```bash
npm run dev
```
Server runs at `http://localhost:5000`.

## 2. Run the client

In a second terminal:
```bash
cd client
npm install
cp .env.local.example .env.local
npm run dev
```
Site runs at `http://localhost:3000`. The contact form on the site calls
the server's `/api/contact` endpoint.

## Where to edit content (client side)

- `client/src/data/projects.ts` — your projects
- `client/src/data/skills.ts` — your skills
- `client/src/data/experience.ts` — your work history
- `client/src/components/Hero.tsx` — name, title, tagline
- `client/src/components/About.tsx` — bio + stats
- `client/src/components/Footer.tsx` — social links
- `client/public/resume.pdf` — add your resume, then link it
- `client/public/profile.jpg` — add your photo, use in About.tsx

## Deploy

- **Client** → Vercel (auto-detects Next.js). Set `NEXT_PUBLIC_API_URL` env
  var to your deployed server's URL.
- **Server** → Render, Railway, or Fly.io (all have free tiers for small
  Node/Express apps). Set the same env vars as your local `.env`, and set
  `CLIENT_URL` to your deployed client's URL (for CORS).
