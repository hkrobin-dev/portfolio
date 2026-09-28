export const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS settings (
  id INT PRIMARY KEY DEFAULT 1,
  meta JSONB NOT NULL,
  theme JSONB NOT NULL,
  hero JSONB NOT NULL,
  about JSONB NOT NULL,
  contact JSONB NOT NULL,
  footer JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS skill_groups (
  id TEXT PRIMARY KEY,
  sort_order INT NOT NULL DEFAULT 0,
  category JSONB NOT NULL,
  items JSONB NOT NULL DEFAULT '[]'
);

CREATE TABLE IF NOT EXISTS experience (
  id TEXT PRIMARY KEY,
  sort_order INT NOT NULL DEFAULT 0,
  role JSONB NOT NULL,
  company TEXT DEFAULT '',
  company_url TEXT DEFAULT '',
  location JSONB DEFAULT '{}',
  period TEXT DEFAULT '',
  points JSONB DEFAULT '[]',
  stack JSONB DEFAULT '[]'
);

CREATE TABLE IF NOT EXISTS education (
  id TEXT PRIMARY KEY,
  sort_order INT NOT NULL DEFAULT 0,
  degree JSONB NOT NULL,
  institute JSONB NOT NULL,
  period TEXT DEFAULT '',
  location JSONB DEFAULT '{}',
  extra JSONB DEFAULT '{}',
  badge TEXT DEFAULT ''
);

CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  sort_order INT NOT NULL DEFAULT 0,
  title TEXT NOT NULL DEFAULT '',
  description JSONB DEFAULT '{}',
  long_description JSONB DEFAULT '{}',
  image TEXT DEFAULT '',
  gallery JSONB DEFAULT '[]',
  stack JSONB DEFAULT '[]',
  live_url TEXT DEFAULT '',
  code_url TEXT DEFAULT '',
  category JSONB DEFAULT '{}',
  features JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id TEXT PRIMARY KEY,
  sort_order INT NOT NULL DEFAULT 0,
  title JSONB NOT NULL,
  description JSONB DEFAULT '{}',
  content JSONB DEFAULT '{}',
  date TEXT DEFAULT '',
  category TEXT DEFAULT '',
  image TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS testimonials (
  id TEXT PRIMARY KEY,
  sort_order INT NOT NULL DEFAULT 0,
  quote JSONB NOT NULL,
  name TEXT NOT NULL DEFAULT '',
  role TEXT DEFAULT '',
  company TEXT DEFAULT '',
  company_url TEXT DEFAULT '',
  avatar TEXT DEFAULT ''
);
`;
