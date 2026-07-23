// ============================================================
// JJAM AGENCY CMS API — Cloudflare Pages Function (/api/*)
// 필요 바인딩: DB(D1) / 환경변수: ADMIN_PASSWORD, SESSION_SECRET
// ============================================================

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};
const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", ...CORS },
  });

// ---------- 기본 콘텐츠 (DB에 값이 없을 때 반환되는 현재 사이트 내용) ----------
const DEFAULTS = {
  hero: {
    line1: "Mastering Premium",
    line2: "Content Production",
    accent: "Premium",
    desc: "제이잼스튜디오는 브랜드의 본질을 담아 오래 기억되는 콘텐츠를 만듭니다.",
  },
  about: {
    title: "방송 현업의 깊이로,\n새로운 문화를 만듭니다",
    body: [
      "jjam agency 쨈 에이전시는 오랫동안 방송 현업에서 일해 온 PD, 작가들이 이끌어가는 영상 제작 회사입니다.",
      "다년간의 경험과 기획·제작 노하우를 통해 여러분이 지금 필요한 다양한 크리에이티브 영상물을 제작하고 지원해 드립니다.",
      "엔터테인먼트, 라이프스타일, 패션, 뷰티 정보 콘텐츠를 비롯하여 예능·드라마 등 감각적인 콘텐츠와 광고 홍보 영상까지, 기업의 스토리를 담아 차별화된 콘텐츠를 만들어냅니다.",
    ],
    punch: "jjam agency와 함께한 여러분이 바로 새로운 문화를 만드는 것입니다.",
    ceo_name: "이은정",
    ceo_role: "Founder · Executive PD",
  },
  services: [
    { title: "영상 컨텐츠 제작", en: "Video Production", desc: "기업 홍보 · 병원/뷰티 · 인터뷰 · 행사 스케치 · 숏폼까지, 브랜드의 스토리를 고객과 연결하는 영상 제작" },
    { title: "유튜브 채널 운영", en: "YouTube Channel", desc: "콘텐츠 기획, 촬영·편집, 썸네일, SEO까지 채널의 모든 것을 담당하는 원스톱 채널 운영" },
    { title: "유튜브 크리에이터 교육", en: "Creator Education", desc: "1:1 채널 제작 코칭부터 크리에이터 양성 과정, 세미나·워크샵까지 맞춤형 교육 프로그램" },
    { title: "AI 영상 스튜디오", en: "AI Video Studio", desc: "AI 영상 명함 · 광고 영상 · 애니메이션 등 콘텐츠 제작의 새로운 가능성을 여는 AI 영상 솔루션" },
  ],
  why: [
    { title: "방송국 출신 제작진의 전문성", desc: "20년 이상의 현장 경험을 바탕으로 브랜드에 맞는 콘텐츠를 기획하고 제작합니다." },
    { title: "ONE-STOP 책임 PD", desc: "콘텐츠 기획부터 영상 제작, 채널 운영까지 담당 PD가 끝까지 책임집니다." },
    { title: "병원 유튜브 영상 제작 전문", desc: "의사·약사들의 퍼스널 브랜딩에 최적화된 맞춤형 솔루션을 제공합니다." },
  ],
  footer: {
    company: "제이잼 에이전시 (JJAM AGENCY)",
    ceo: "이은정",
    address: "서울 강남구 압구정로134 타워빌딩 302호",
    phone: "010-3370-1432",
    email: "ej74321@hanmail.net",
  },
  portfolio_categories: ["의료·제약", "기업·제품", "문화·라이프"],
  portfolio_heading: { sub: "영상 콘텐츠부터 유튜브 채널까지, 제이잼이 만든 작업들을 분야별로 만나보세요." },
};

// 최초 시드용 기본 포트폴리오 (현재 사이트 22개)
const DEFAULT_PORTFOLIO = [
  ["고지혈증 치료, 획기적인 신약등장!! 스타틴 부작용 있다면?", "YMkMfrhTy1U", "의료·제약"],
  ["배로 하는 척추수술(ALIF/OLIF) — 부산 우리들병원", "WV8x4BC2Iwk", "의료·제약"],
  ["위고비 Vs 마운자로, 나에게 맞는 비만 치료제는?", "d9KyiFb_DMU", "의료·제약"],
  ["[엄마약방] 처방없이 약국에서 구매하는 다이어트 약!!", "vAAuU_1JWsg", "의료·제약"],
  ["MEET THE EXPERT #10 분당서울대병원 신경과 한문구 교수", "2doDVaOWvvs", "의료·제약"],
  ["가성비 콜라겐의 끝판왕 앱솔루트콜라겐 3.5!!", "9Ujoxe-MFkI", "의료·제약"],
  ["당뇨병에 좋은 영양제! 현직 약사가 다 알려줌", "NFTjLFFpz_4", "의료·제약"],
  ["당뇨를 100% 막을 수 있는 마지막 골든타임!", "G2sN4OBMUpY", "의료·제약"],
  ["부산우리들병원", "NDu6rGoEtZg", "의료·제약"],
  ["엔지니어드 스톤 주방상판으로 괜찮을까요?", "nKmjEDQCP5I", "기업·제품"],
  ["한풍제약 공장 소개", "mQW6chRAKQ0", "기업·제품"],
  ["한풍제약 경기약사학술대회 브이로그", "5CLC1gvD4zQ", "기업·제품"],
  ["Soflisse Before&After", "MGl2tn_x5m0", "기업·제품"],
  ["Seojinsystem 홍보영상 2022", "E_LuGEFSW-s", "기업·제품"],
  ["밀로 만든 안동소주 / 맹개술도가", "y45bK2Lldf0", "문화·라이프"],
  ["정원이 아름다운 양조장 / 해창주조장", "hmSi3PG1_V0", "문화·라이프"],
  ["서울국제도서전에 갔다 왔어요", "qQcgkA9MUoA", "문화·라이프"],
  ["인페인터글로벌 아트투어 7기", "L-vzl1EGMTw", "문화·라이프"],
  ["대통령배 현장취재", "7oa3hJS4bTY", "문화·라이프"],
  ["코딩랜드 보물을 함께 찾아요 · 시즌2 11화", "rSWXxcZr-kQ", "문화·라이프"],
  ["제이잼 포트폴리오", "miUYlT1kOpA", "문화·라이프"],
  ["제이잼 포트폴리오", "S4AM6T1zqoc", "문화·라이프"],
];

// ---------- 토큰 (HMAC 서명) ----------
const b64u = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
async function hmac(secret, msg) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return b64u(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(msg)));
}
async function makeToken(secret) {
  const payload = btoa(JSON.stringify({ exp: Date.now() + 1000 * 60 * 60 * 12 })); // 12시간
  return `${payload}.${await hmac(secret, payload)}`;
}
async function verifyToken(secret, token) {
  if (!secret || !token) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  if (sig !== (await hmac(secret, payload))) return false;
  try { return JSON.parse(atob(payload)).exp > Date.now(); } catch { return false; }
}

// ---------- content 헬퍼 ----------
async function getContent(db, key) {
  const row = await db.prepare("SELECT value FROM content WHERE key=?").bind(key).first();
  if (row) { try { return JSON.parse(row.value); } catch { /* fallthrough */ } }
  return DEFAULTS[key] ?? null;
}
async function setContent(db, key, value) {
  await db
    .prepare("INSERT INTO content (key,value,updated_at) VALUES (?,?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value, updated_at=excluded.updated_at")
    .bind(key, JSON.stringify(value), new Date().toISOString())
    .run();
}

// ---------- 메인 라우터 ----------
export async function onRequest({ request, env, params }) {
  if (request.method === "OPTIONS") return new Response(null, { headers: CORS });

  const db = env.DB;
  if (!db) return json({ error: "D1 바인딩(DB)이 설정되지 않았습니다. Pages Settings → Bindings 확인" }, 500);

  const url = new URL(request.url);
  const path = "/" + (Array.isArray(params.path) ? params.path.join("/") : params.path || "");
  const method = request.method;

  const auth = request.headers.get("Authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
  const authed = await verifyToken(env.SESSION_SECRET, token);
  const needAuth = () => json({ error: "unauthorized" }, 401);

  try {
    // ---------- 로그인 ----------
    if (path === "/login" && method === "POST") {
      const { password } = await request.json();
      if (!env.ADMIN_PASSWORD) return json({ error: "ADMIN_PASSWORD 환경변수가 없습니다" }, 500);
      if (password !== env.ADMIN_PASSWORD) return json({ error: "비밀번호가 올바르지 않습니다" }, 401);
      return json({ token: await makeToken(env.SESSION_SECRET) });
    }
    if (path === "/me" && method === "GET") return json({ authed });

    // ---------- 콘텐츠 (히어로/소개/서비스/WHY/푸터/분류/포트폴리오 소제목) ----------
    if (path === "/content" && method === "GET") {
      const { results } = await db.prepare("SELECT key, value FROM content").all();
      const saved = {};
      for (const r of results) { try { saved[r.key] = JSON.parse(r.value); } catch { /* skip */ } }
      const out = {};
      for (const k of Object.keys(DEFAULTS)) out[k] = k in saved ? saved[k] : DEFAULTS[k];
      out._overrides = Object.keys(saved); // 실제로 관리자가 저장한 키 목록
      return json(out);
    }
    if (path === "/content" && method === "PUT") {
      if (!authed) return needAuth();
      const { key, value } = await request.json();
      if (!Object.keys(DEFAULTS).includes(key)) return json({ error: "unknown key" }, 400);
      await setContent(db, key, value);
      return json({ ok: true });
    }

    // ---------- 포트폴리오 ----------
    if (path === "/portfolio" && method === "GET") {
      const { results } = await db.prepare("SELECT * FROM portfolio ORDER BY sort_order ASC, id ASC").all();
      return json(results);
    }
    if (path === "/portfolio" && method === "POST") {
      if (!authed) return needAuth();
      const b = await request.json();
      const m = await db.prepare("SELECT COALESCE(MAX(sort_order),0) AS m FROM portfolio").first();
      await db.prepare("INSERT INTO portfolio (title,video_id,url,category,sort_order) VALUES (?,?,?,?,?)")
        .bind(b.title || "", b.video_id || "", b.url || "", b.category || "", (m?.m || 0) + 1).run();
      return json({ ok: true });
    }
    if (path === "/portfolio" && method === "PUT") {
      if (!authed) return needAuth();
      const b = await request.json();
      await db.prepare("UPDATE portfolio SET title=?, video_id=?, url=?, category=? WHERE id=?")
        .bind(b.title || "", b.video_id || "", b.url || "", b.category || "", b.id).run();
      return json({ ok: true });
    }
    if (path === "/portfolio" && method === "DELETE") {
      if (!authed) return needAuth();
      await db.prepare("DELETE FROM portfolio WHERE id=?").bind(url.searchParams.get("id")).run();
      return json({ ok: true });
    }
    if (path === "/portfolio/reorder" && method === "POST") {
      if (!authed) return needAuth();
      const { order } = await request.json(); // [id, id, ...]
      await db.batch(order.map((id, i) => db.prepare("UPDATE portfolio SET sort_order=? WHERE id=?").bind(i + 1, id)));
      return json({ ok: true });
    }
    if (path === "/portfolio/seed" && method === "POST") {
      if (!authed) return needAuth();
      const cnt = await db.prepare("SELECT COUNT(*) AS c FROM portfolio").first();
      if ((cnt?.c || 0) > 0) return json({ error: "이미 데이터가 있습니다. 비어있을 때만 시드할 수 있어요." }, 400);
      await db.batch(DEFAULT_PORTFOLIO.map(([t, vid, cat], i) =>
        db.prepare("INSERT INTO portfolio (title,video_id,url,category,sort_order) VALUES (?,?,?,?,?)")
          .bind(t, vid, `https://youtu.be/${vid}`, cat, i + 1)));
      return json({ ok: true, count: DEFAULT_PORTFOLIO.length });
    }

    // ---------- 클라이언트 ----------
    if (path === "/clients" && method === "GET") {
      const { results } = await db.prepare("SELECT * FROM clients ORDER BY sort_order ASC, id ASC").all();
      return json(results);
    }
    if (path === "/clients" && method === "POST") {
      if (!authed) return needAuth();
      const b = await request.json();
      const m = await db.prepare("SELECT COALESCE(MAX(sort_order),0) AS m FROM clients").first();
      await db.prepare("INSERT INTO clients (name,logo_url,link,sort_order) VALUES (?,?,?,?)")
        .bind(b.name || "", b.logo_url || "", b.link || "", (m?.m || 0) + 1).run();
      return json({ ok: true });
    }
    if (path === "/clients" && method === "PUT") {
      if (!authed) return needAuth();
      const b = await request.json();
      await db.prepare("UPDATE clients SET name=?, logo_url=?, link=? WHERE id=?")
        .bind(b.name || "", b.logo_url || "", b.link || "", b.id).run();
      return json({ ok: true });
    }
    if (path === "/clients" && method === "DELETE") {
      if (!authed) return needAuth();
      await db.prepare("DELETE FROM clients WHERE id=?").bind(url.searchParams.get("id")).run();
      return json({ ok: true });
    }
    if (path === "/clients/reorder" && method === "POST") {
      if (!authed) return needAuth();
      const { order } = await request.json();
      await db.batch(order.map((id, i) => db.prepare("UPDATE clients SET sort_order=? WHERE id=?").bind(i + 1, id)));
      return json({ ok: true });
    }

    // ---------- 문의 ----------
    if (path === "/contact" && method === "POST") {
      const b = await request.json();
      if (!b.name || !b.phone || !b.email) return json({ error: "필수 항목 누락" }, 400);
      await db.prepare("INSERT INTO submissions (company,name,phone,email,type,ref_url,message,created_at) VALUES (?,?,?,?,?,?,?,?)")
        .bind(b.company || "", b.name, b.phone, b.email, b.type || "", b.ref_url || "", b.message || "", new Date().toISOString()).run();
      return json({ ok: true });
    }
    if (path === "/contact" && method === "GET") {
      if (!authed) return needAuth();
      const { results } = await db.prepare("SELECT * FROM submissions ORDER BY id DESC LIMIT 500").all();
      return json(results);
    }
    if (path === "/contact" && method === "DELETE") {
      if (!authed) return needAuth();
      await db.prepare("DELETE FROM submissions WHERE id=?").bind(url.searchParams.get("id")).run();
      return json({ ok: true });
    }

    return json({ error: "not found", path }, 404);
  } catch (e) {
    return json({ error: String((e && e.message) || e) }, 500);
  }
}
