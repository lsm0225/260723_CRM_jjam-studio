-- Cloudflare D1 schema (JJAM AGENCY CMS)
-- 적용:  npx wrangler d1 execute jjam-db --remote --file=./schema.sql

CREATE TABLE IF NOT EXISTS content (
  key        TEXT PRIMARY KEY,
  value      TEXT NOT NULL,
  updated_at TEXT
);

CREATE TABLE IF NOT EXISTS portfolio (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  title      TEXT,
  video_id   TEXT,          -- 유튜브 영상 ID
  url        TEXT,          -- 원본 링크
  category   TEXT,
  sort_order INTEGER
);

CREATE TABLE IF NOT EXISTS clients (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  name       TEXT,
  logo_url   TEXT,
  link       TEXT,
  sort_order INTEGER
);

CREATE TABLE IF NOT EXISTS submissions (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  company    TEXT,
  name       TEXT,
  phone      TEXT,
  email      TEXT,
  type       TEXT,
  ref_url    TEXT,
  message    TEXT,
  created_at TEXT
);
