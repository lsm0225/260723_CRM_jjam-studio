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

-- 방문 통계 (API가 최초 사용 시 자동 생성하기도 함)
CREATE TABLE IF NOT EXISTS visits (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ts TEXT NOT NULL,          -- UTC ISO8601, 집계 시 +9시간(KST)으로 변환
  device TEXT NOT NULL,      -- 'pc' | 'mobile'
  vid TEXT NOT NULL          -- 브라우저별 임의 식별자(개인정보 아님)
);
CREATE INDEX IF NOT EXISTS idx_visits_ts ON visits (ts);

-- 관리자 설정 (비밀번호 해시 등). API가 최초 사용 시 자동 생성
CREATE TABLE IF NOT EXISTS settings (
  key   TEXT PRIMARY KEY,
  value TEXT NOT NULL       -- admin_password: pbkdf2$<salt>$<hash> (원문 저장 안 함)
);
