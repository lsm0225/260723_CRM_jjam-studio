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
    line1: "Premium Content",
    line2: "Creator Company",
    accent: "Premium",
    desc: "브랜드의 성장을 만드는 콘텐츠 파트너",
    video: "https://vimeo.com/1207998411", // 배경 영상 (Vimeo 링크)
  },
  about: {
    title: "방송 현업의 깊이로,\n새로운 문화를 만듭니다",
    body: [
      "jjam agency 쨈 에이전시는 오랫동안 방송 현업에서 일해 온 PD, 작가들이 이끌어가는 영상 제작 회사입니다.",
      "다년간의 경험과 기획, 제작 노하우를 통해 여러분이 지금 필요한 다양한 크리에이티브 영상물을 제작, 지원해 드립니다.",
      "여러분의 브랜드 홍보를 위해 엔터테인먼트, 라이프스타일, 패션, 뷰티 정보 콘텐츠를 비롯하여 예능, 드라마 등의 감각적인 콘텐츠와 광고 홍보 영상 등 기업의 스토리를 담아 차별화된 콘텐츠를 만들어냅니다.",
    ],
    punch: "jjam agency와 함께한 여러분이 바로 새로운 문화를 만드는 것입니다.",
    ceo_name: "이은정",
    ceo_role: "Founder · Executive PD",
  },
  services: [
    {
      title: "영상 컨텐츠 제작", en: "Video Production",
      desc: "브랜드의 스토리를 영상으로 담아 고객과 연결합니다.",
      items: ["기업 홍보 영상", "병원·뷰티 콘텐츠", "인터뷰 영상", "행사 스케치 영상", "숏폼 콘텐츠 제작"],
    },
    {
      title: "유튜브 채널 운영", en: "YouTube Channel",
      desc: "채널 전략 수립부터 콘텐츠 제작, 업로드, 분석까지 원스톱으로 운영합니다.",
      items: ["콘텐츠 기획", "촬영 및 편집", "썸네일 제작", "SEO 최적화"],
    },
    {
      title: "유튜브 크리에이터 교육", en: "Creator Education",
      desc: "유튜브를 시작하고 싶은 다양한 분야의 일반인들에게 맞춤형 교육 프로그램을 제공합니다.",
      items: ["1:1 프라이빗 유튜브 채널 제작 코칭", "유튜브 크리에이터 양성 과정", "AI 영상 콘텐츠 제작 교육", "다양한 세미나 및 워크샵"],
    },
    {
      title: "AI 영상 스튜디오", en: "AI Video Studio",
      desc: "최신 AI 기술로 콘텐츠 제작의 새로운 가능성을 제시합니다.",
      items: ["AI 영상 명함", "AI 광고 영상", "AI 애니메이션", "AI 영상 컨텐츠 채널 운영"],
    },
  ],
  why: [
    { title: "의료·병원 전문 영상 제작사", desc: "병원과 의료진의 특성을 이해하고 병원의 진료 분야와 타깃 환자에 맞는 콘텐츠를 기획합니다.", img: "" },
    { title: "방송국 출신 제작진의 전문성", desc: "20년 이상의 현장 경험을 바탕으로 브랜드에 맞는 콘텐츠를 기획하고 제작합니다.", img: "" },
    { title: "ONE-STOP 책임 PD", desc: "콘텐츠 기획부터 영상 제작, 채널 운영까지 담당 PD가 끝까지 책임집니다.", img: "" },
    { title: "고객 맞춤형 콘텐츠 제작", desc: "상상만 하세요! 원하는 내용과 스타일에 따라 드라마, 예능, 교양, 다큐까지 고객 맞춤으로 제작합니다.", img: "" },
    { title: "합리적인 비용", desc: "클라이언트 예산에 맞춰 만들 수 있는 고품질 영상을 제안해 드립니다.", img: "" },
    { title: "빠른 소통", desc: "프로젝트 전용 채팅방 개설로 실시간 피드백이 가능합니다.", img: "" },
  ],
  slogan: {
    items: [
      { en: "NEW", ko: "언제나 새롭게" },
      { en: "TRENDY", ko: "트렌디하게" },
      { en: "CREATIVE", ko: "창의적으로" },
    ],
    tagline: "당신의 브랜딩 파트너 영상 제작사",
    tagline_brand: "jjam agency 쨈 에이전시",
  },
  process: {
    sub: "체계적인 제작 프로세스",
    intro: "상담부터 영상 제작 운영까지 모든 과정을 체계적으로 관리합니다.",
    steps: [
      { title: "문의 및 상담", desc: "전화·카카오톡·문의 폼 어디로 연락 주셔도 좋습니다. 담당 PD가 목표와 예산을 먼저 듣고 방향을 잡아 드립니다." },
      { title: "브랜드 분석", desc: "브랜드의 강점과 타깃, 경쟁 채널을 분석해 어떤 콘텐츠가 실제로 효과를 낼지 판단합니다." },
      { title: "콘텐츠 기획", desc: "분석 결과를 바탕으로 구성안과 촬영 계획을 세우고, 확정 전에 함께 검토합니다." },
      { title: "촬영 및 제작", desc: "방송 현업 제작진이 촬영부터 편집, 자막·그래픽 작업까지 직접 진행합니다." },
      { title: "검수 및 수정", desc: "초안을 확인하시고 편하게 의견 주세요. 만족하실 때까지 함께 다듬습니다." },
      { title: "업로드 및 다양한 홍보 활동", desc: "채널 업로드와 썸네일·SEO 최적화는 물론, 이후 홍보 활동까지 이어서 지원합니다." },
    ],
  },
  cta: {
    eyebrow: "당신의 브랜딩 파트너 영상 제작사",
    title: "jjam agency",
    accent: "쨈 에이전시",
    btn1: "무료 상담 신청하기",
    btn2: "포트폴리오 보기",
  },
  contact: {
    sub: "프로젝트를 소개해 주세요.",
    intro: "영상 제작이 처음이어도 괜찮습니다.\n브랜드와 목표를 알려주시면 가장 효과적인 콘텐츠 전략을 제안해 드립니다.",
    headline: "유튜브 채널 운영, 영상 제작\n아직도 혼자 고민 중이신가요?",
    subcopy: "방송국 출신 제작진이 기획부터\n촬영, 편집, 운영까지 함께합니다.",
    concerns: [
      "어떤 콘텐츠를 만들어야 할지 모르겠어요.",
      "영상 제작 시간이 부족해요.",
      "조회수가 오르지 않아요.",
      "퍼스널 브랜딩이 필요해요.",
      "유튜브 채널로 마케팅을 하고 싶어요.",
    ],
    solution: "쨈 에이전시는 전략 수립부터 제작, 운영까지 원스톱으로 제공합니다.",
    solution_accent: "원스톱",
  },
  profile: {
    name: "이은정",
    role: "PD",
    directing: [
      "MBC 〈요리보고 세계보고〉 · MBC 〈찾아라 맛있는 TV〉",
      "MBC 〈똑똑 키즈스쿨〉 · MBC 〈공감 특별한 세상〉",
      "MBN 〈맛있는 여행〉 · MBC에브리원 〈인생은 항구다〉",
      "EBS 〈세계테마기행〉 · EBS 〈스페셜 프로젝트〉 외 다수 연출",
    ],
    lecture: ["한국방송예술교육진흥원 〈TV연출〉 〈TV다큐멘터리〉 〈VJ제작실습〉 강의"],
    quote: "20년 경력의 자신감으로 다양한 분야의 영상 제작 전문가로서\n최선을 다해 여러분의 니즈를 충족시켜 드립니다.",
  },
  links: {
    kakao: "",
  },
  footer: {
    company: "jjam agency 쨈 에이전시",
    ceo: "이은정",
    address: "서울특별시 강남구 압구정로 134 타워빌딩 302호",
    phone: "010-3370-1432",
    email: "jjamagency@gmail.com",
  },
  portfolio_categories: ["의료·제약", "기업·제품", "문화·라이프"],
  portfolio_heading: { sub: "영상 콘텐츠부터 유튜브 채널까지, 제이잼이 만든 작업들을 분야별로 만나보세요." },
};

// 최초 시드용 기본 포트폴리오 (현재 사이트 22개)
const DEFAULT_PORTFOLIO = [
  ["부산우리들병원 〈배로 하는 척추 수술편〉", "WV8x4BC2Iwk", "의료·제약"],
  ["부산우리들병원 원내 홍보영상", "NDu6rGoEtZg", "의료·제약"],
  ["청담 주앤클리닉 〈젊어지는 주앤TV〉", "YMkMfrhTy1U", "의료·제약"],
  ["(주)어웰 〈K닥터스〉", "G2sN4OBMUpY", "의료·제약"],
  ["한국피부성형학회 〈뷰티고민 원터치〉", "d9KyiFb_DMU", "의료·제약"],
  ["대한중환자의학회 〈MEET THE EXPERT〉", "2doDVaOWvvs", "의료·제약"],
  ["(주)한풍제약 〈경기약사학술대회〉", "5CLC1gvD4zQ", "의료·제약"],
  ["(주)한풍제약 〈한풍제약 공장 소개〉", "mQW6chRAKQ0", "의료·제약"],
  ["(주)경남제약 〈리놀 인플루언서 세미나〉", "S4AM6T1zqoc", "의료·제약"],
  ["샘물약국 현고은 약사 〈엄마약방〉", "vAAuU_1JWsg", "의료·제약"],
  ["인천 21세기 약국 〈유쾌한 김약사의 톡톡〉", "miUYlT1kOpA", "의료·제약"],
  ["(주)Wellver 〈Wellver TV〉", "9Ujoxe-MFkI", "의료·제약"],
  ["(주)굿팜 〈굿팜TV 약사에게 물어봐〉", "NFTjLFFpz_4", "의료·제약"],
  ["(주)라미크 이태리 〈돌파는언니TV〉", "nKmjEDQCP5I", "기업·제품"],
  ["(주)소프리스 〈소프리스 풋케어 홍보〉", "MGl2tn_x5m0", "기업·제품"],
  ["(주)로보로보 〈아로프렌즈〉", "rSWXxcZr-kQ", "기업·제품"],
  ["(주)서진시스템 홍보영상", "E_LuGEFSW-s", "기업·제품"],
  ["서울마사회 조교사협회 〈말할수밖에〉", "7oa3hJS4bTY", "문화·라이프"],
  ["술술술술 〈안동 진맥소주〉", "y45bK2Lldf0", "문화·라이프"],
  ["술술술술 〈해창주조〉", "hmSi3PG1_V0", "문화·라이프"],
  ["도파민TV 〈서울국제도서전〉", "qQcgkA9MUoA", "문화·라이프"],
  ["아트투어 〈일본 에히메편〉", "L-vzl1EGMTw", "문화·라이프"],
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
