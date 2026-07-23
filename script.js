/* ============================================
   J JAM STUDIO — Interactions
   ============================================ */

// ----- 새로고침 시 항상 히어로(최상단)에서 시작 -----
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
const scrollToHero = () => window.scrollTo(0, 0);
window.addEventListener("load", () => {
  // 해시로 인한 자동 점프까지 덮어써서 최상단으로
  scrollToHero();
  requestAnimationFrame(scrollToHero);
});

// ----- 로고 클릭 시 새로고침 -----
const headerLogo = document.querySelector(".header__logo");
if (headerLogo) {
  headerLogo.addEventListener("click", (e) => {
    e.preventDefault();
    history.replaceState(null, "", location.pathname + location.search);
    location.reload();
  });
}

// ----- Hero video fade-in (블랙 화면 대신 재생 시작 시 페이드인) -----
const heroVideo = document.querySelector(".hero__video");
if (heroVideo) {
  const showVideo = () => heroVideo.classList.add("is-playing");

  // Vimeo 플레이어 postMessage 이벤트로 실제 재생 시점 감지
  window.addEventListener("message", (e) => {
    if (!/vimeo\.com$/.test(new URL(e.origin).hostname)) return;
    let data;
    try {
      data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
    } catch {
      return;
    }
    if (data.event === "ready") {
      heroVideo.contentWindow.postMessage(
        JSON.stringify({ method: "addEventListener", value: "play" }),
        "https://player.vimeo.com"
      );
    }
    if (data.event === "play") showVideo();
  });

  // 이벤트를 못 받는 경우를 대비한 폴백: iframe 로드 후 2초 뒤 표시
  heroVideo.addEventListener("load", () => setTimeout(showVideo, 2000));
}

// ----- Header scroll state -----
const header = document.getElementById("header");
const onScroll = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 8);
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// ----- Mobile menu -----
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

const closeMenu = () => {
  menuBtn.classList.remove("is-open");
  mobileMenu.classList.remove("is-open");
  menuBtn.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
};

menuBtn.addEventListener("click", () => {
  const open = !mobileMenu.classList.contains("is-open");
  menuBtn.classList.toggle("is-open", open);
  mobileMenu.classList.toggle("is-open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
  document.body.style.overflow = open ? "hidden" : "";
});

mobileMenu.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));

// ----- Scroll reveal -----
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// ----- Active nav highlight -----
const sections = ["hero", "about", "services", "portfolio", "client", "contact"].map((id) => document.getElementById(id));
const navLinks = document.querySelectorAll(".nav-link");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) =>
          link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`)
        );
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);
sections.forEach((s) => s && sectionObserver.observe(s));

// ----- 포트폴리오 카테고리 슬라이더 -----
const PF_VIDEOS = [
  { id: "YMkMfrhTy1U", t: "고지혈증 치료, 획기적인 신약등장!! 스타틴 부작용 있다면?", c: "의료·제약" },
  { id: "WV8x4BC2Iwk", t: "배로 하는 척추수술(ALIF/OLIF) — 부산 우리들병원", c: "의료·제약" },
  { id: "d9KyiFb_DMU", t: "위고비 Vs 마운자로, 나에게 맞는 비만 치료제는?", c: "의료·제약" },
  { id: "vAAuU_1JWsg", t: "[엄마약방] 처방없이 약국에서 구매하는 다이어트 약!!", c: "의료·제약" },
  { id: "2doDVaOWvvs", t: "MEET THE EXPERT #10 분당서울대병원 신경과 한문구 교수", c: "의료·제약" },
  { id: "9Ujoxe-MFkI", t: "가성비 콜라겐의 끝판왕 앱솔루트콜라겐 3.5!!", c: "의료·제약" },
  { id: "NFTjLFFpz_4", t: "당뇨병에 좋은 영양제! 현직 약사가 다 알려줌", c: "의료·제약" },
  { id: "G2sN4OBMUpY", t: "당뇨를 100% 막을 수 있는 마지막 골든타임!", c: "의료·제약" },
  { id: "NDu6rGoEtZg", t: "부산우리들병원", c: "의료·제약" },
  { id: "nKmjEDQCP5I", t: "엔지니어드 스톤 주방상판으로 괜찮을까요?", c: "기업·제품" },
  { id: "mQW6chRAKQ0", t: "한풍제약 공장 소개", c: "기업·제품" },
  { id: "5CLC1gvD4zQ", t: "한풍제약 경기약사학술대회 브이로그", c: "기업·제품" },
  { id: "MGl2tn_x5m0", t: "Soflisse Before&After", c: "기업·제품" },
  { id: "E_LuGEFSW-s", t: "Seojinsystem 홍보영상 2022", c: "기업·제품" },
  { id: "y45bK2Lldf0", t: "밀로 만든 안동소주 / 맹개술도가", c: "문화·라이프" },
  { id: "hmSi3PG1_V0", t: "정원이 아름다운 양조장 / 해창주조장", c: "문화·라이프" },
  { id: "qQcgkA9MUoA", t: "서울국제도서전에 갔다 왔어요", c: "문화·라이프" },
  { id: "L-vzl1EGMTw", t: "인페인터글로벌 아트투어 7기", c: "문화·라이프" },
  { id: "7oa3hJS4bTY", t: "대통령배 현장취재", c: "문화·라이프" },
  { id: "rSWXxcZr-kQ", t: "코딩랜드 보물을 함께 찾아요 · 시즌2 11화", c: "문화·라이프" },
  { id: "miUYlT1kOpA", t: "제이잼 포트폴리오", c: "문화·라이프" },
  { id: "S4AM6T1zqoc", t: "제이잼 포트폴리오", c: "문화·라이프" },
];

function initPortfolioSlider(videos, catNames) {
  const host = document.getElementById("pfSlider");
  const tabsEl = document.getElementById("pfTabs");
  if (!host || !tabsEl) return;

  host.innerHTML =
    '<div class="wm"></div>' +
    '<div class="pf-viewport"><div class="pf-track"></div></div>' +
    '<button class="pf-nav prev" aria-label="이전">‹</button>' +
    '<button class="pf-nav next" aria-label="다음">›</button>' +
    '<div class="pf-foot"><div class="pf-count"><span class="cur">01</span> / <span class="tot"></span></div>' +
    '<div class="pf-bar"><span></span></div><div class="pf-dots"></div></div>';

  const track = host.querySelector(".pf-track");
  const wm = host.querySelector(".wm");
  wm.innerHTML = [..."PORTFOLIO"].map((ch, i) => `<span style="animation-delay:${(i * 0.025).toFixed(3)}s">${ch}</span>`).join("");
  const dotsEl = host.querySelector(".pf-dots");
  const cur = host.querySelector(".cur"), tot = host.querySelector(".tot"), bar = host.querySelector(".pf-bar span");
  const GAP = 18;
  let items = [], idx = 0, entered = false;

  const slides = () => [...track.children];
  const vpW = () => host.querySelector(".pf-viewport").getBoundingClientRect().width;
  function layout() { const w = vpW(); const sw = Math.round(w * (w < 640 ? 0.84 : 0.58)); slides().forEach((s) => (s.style.width = sw + "px")); return { w, sw }; }
  function targetX() { const { w, sw } = layout(); return w / 2 - (idx * (sw + GAP) + sw / 2); }
  function center() { track.style.transform = `translateX(${targetX()}px)`; }
  function flashBlur() { track.classList.remove("is-sliding"); void track.offsetWidth; track.classList.add("is-sliding"); }
  function stopAll() { slides().forEach((s) => { const f = s.querySelector("iframe"); if (f) f.remove(); s.classList.remove("playing"); }); }
  function playActive() {
    const s = slides()[idx]; if (!s || s.querySelector("iframe")) return;
    const f = document.createElement("iframe");
    f.src = `https://www.youtube-nocookie.com/embed/${s.dataset.id}?autoplay=1&mute=1&rel=0&playsinline=1`;
    f.allow = "autoplay; fullscreen; picture-in-picture"; f.allowFullscreen = true;
    s.querySelector(".pf-smedia").appendChild(f); s.classList.add("playing");
    const pl = s.querySelector(".pf-play"); if (pl) pl.style.opacity = "";
  }
  function setActive() {
    slides().forEach((s, i) => { s.classList.toggle("active", i === idx); const pl = s.querySelector(".pf-play"); if (pl) pl.style.opacity = i === idx ? "1" : ""; });
    [...dotsEl.children].forEach((d, i) => d.classList.toggle("on", i === idx));
    cur.textContent = String(idx + 1).padStart(2, "0");
    bar.style.width = ((idx + 1) / items.length) * 100 + "%";
  }
  function paint() { stopAll(); setActive(); center(); flashBlur(); }
  function go(i) { const n = Math.max(0, Math.min(items.length - 1, i)); if (n === idx) return; idx = n; paint(); }
  host.querySelector(".prev").onclick = () => go(idx - 1);
  host.querySelector(".next").onclick = () => go(idx + 1);

  function buildTrack(list) {
    items = list; idx = 0;
    track.innerHTML = list.map((v) =>
      `<button class="pf-slide" data-id="${v.id}"><span class="pf-smedia"><img src="https://i.ytimg.com/vi/${v.id}/maxresdefault.jpg" onerror="this.onerror=null;this.src='https://i.ytimg.com/vi/${v.id}/hqdefault.jpg'" alt=""><span class="pf-play"></span></span><span class="pf-stit">${v.t}</span></button>`
    ).join("");
    dotsEl.innerHTML = list.map((_, i) => `<button class="pf-dot" data-i="${i}"></button>`).join("");
    tot.textContent = String(list.length).padStart(2, "0");
    slides().forEach((s, i) => (s.onclick = () => { if (i !== idx) go(i); else if (!s.classList.contains("playing")) playActive(); }));
    [...dotsEl.children].forEach((d) => (d.onclick = () => go(+d.dataset.i)));
  }

  // 최초 1회: 글씨 써짐 → 0.5초 후 오른쪽 → 가운데 진입 (스크롤로 뷰 진입 시)
  function firstEntrance() {
    wm.classList.add("write");
    setTimeout(() => {
      wm.classList.add("fade");
      host.classList.add("show-nav"); // 글씨 사라짐과 동시에 화살표 천천히 등장
      track.style.transition = "transform .95s cubic-bezier(.5,0,.2,1)";
      center(); flashBlur();
      slides().forEach((s, i) => { s.style.transition = `opacity .6s ease ${i * 0.05}s, transform .5s cubic-bezier(.22,1,.36,1)`; s.style.opacity = ""; });
      setTimeout(() => { track.style.transition = ""; slides().forEach((s) => (s.style.transition = "")); }, 1050);
    }, 500);
  }
  // 탭 변경: 글씨/딜레이 없이, 새 영상들이 오른쪽 → 가운데로 다시 슬라이드 인
  function switchTo(list) {
    buildTrack(list);
    setActive();
    track.style.transition = "none";
    track.style.transform = `translateX(${targetX() + vpW() * 0.6}px)`; // 오른쪽 대기
    slides().forEach((s) => (s.style.opacity = "0"));
    void track.offsetWidth;                                            // 리플로우
    track.style.transition = "transform .7s cubic-bezier(.5,0,.2,1)";
    center(); flashBlur();                                             // 가운데로 진입 + 모션 블러
    slides().forEach((s, i) => { s.style.transition = `opacity .5s ease ${i * 0.04}s`; s.style.opacity = ""; });
    setTimeout(() => { track.style.transition = ""; slides().forEach((s) => (s.style.transition = "")); }, 760);
  }

  // 탭 구성 (관리자에서 분류를 저장하면 그 순서를 따름)
  const cats = ["전체", ...(catNames && catNames.length ? catNames : [...new Set(videos.map((v) => v.c))])];
  tabsEl.innerHTML = cats.map((c, i) => `<button class="pf-tab${i === 0 ? " on" : ""}" data-c="${c}">${c}</button>`).join("");
  const listFor = (c) => (c === "전체" ? videos : videos.filter((v) => v.c === c));

  // 더보기 → 그리드 토글
  const section = document.getElementById("portfolio");
  const grid = document.getElementById("pfGrid");
  const moreBtn = document.getElementById("pfMore");
  let currentList = videos, gridMode = false;
  function renderGrid(list) {
    grid.innerHTML = list.map((v, i) =>
      `<button class="pf-gtile" data-id="${v.id}" style="animation-delay:${(i * 0.05).toFixed(2)}s"><span class="pf-gthumb"><img src="https://i.ytimg.com/vi/${v.id}/maxresdefault.jpg" onerror="this.onerror=null;this.src='https://i.ytimg.com/vi/${v.id}/hqdefault.jpg'" alt=""><span class="pf-gplay"></span></span><span class="pf-gtit">${v.t}</span></button>`
    ).join("");
    grid.querySelectorAll(".pf-gtile").forEach((t) => t.addEventListener("click", () => {
      if (t.querySelector("iframe")) return;
      const f = document.createElement("iframe");
      f.src = `https://www.youtube-nocookie.com/embed/${t.dataset.id}?autoplay=1&mute=1&rel=0&playsinline=1`;
      f.allow = "autoplay; fullscreen; picture-in-picture"; f.allowFullscreen = true;
      t.querySelector(".pf-gthumb").appendChild(f); t.classList.add("playing");
    }));
  }
  function stopGrid() { grid.querySelectorAll("iframe").forEach((f) => f.remove()); grid.querySelectorAll(".pf-gtile").forEach((t) => t.classList.remove("playing")); }
  if (moreBtn) moreBtn.addEventListener("click", () => {
    gridMode = !gridMode;
    if (gridMode) { stopAll(); renderGrid(currentList); section.classList.add("is-grid"); moreBtn.innerHTML = '접기 <span>▴</span>'; }
    else { stopGrid(); section.classList.remove("is-grid"); moreBtn.innerHTML = '더보기 <span>▾</span>'; }
    // 토글 후 포트폴리오 섹션으로 스크롤 복귀(높이 변화로 페이지가 튀는 것 방지)
    const y = section.getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({ top: y, behavior: "smooth" });
  });

  tabsEl.addEventListener("click", (e) => {
    const b = e.target.closest(".pf-tab"); if (!b) return;
    tabsEl.querySelectorAll(".pf-tab").forEach((t) => t.classList.remove("on")); b.classList.add("on");
    currentList = listFor(b.dataset.c);
    renderGrid(currentList);                    // 그리드(모바일 상시 + 데스크톱 더보기) 갱신
    if (!gridMode) switchTo(currentList);        // 슬라이더(데스크톱) 갱신
  });

  // 초기: 전체 목록 빌드 + 활성 세팅, 슬라이드는 화면 오른쪽 밖에서 투명 대기
  buildTrack(videos);
  renderGrid(videos);                             // 모바일에서 슬라이더 대신 바로 보이도록 그리드 미리 렌더
  setActive(); center(); track.classList.remove("is-sliding");
  (function preHide() { track.style.transition = "none"; track.style.transform = `translateX(${targetX() + vpW()}px)`; slides().forEach((s) => (s.style.opacity = "0")); void track.offsetWidth; track.style.transition = ""; })();
  window.addEventListener("resize", center);
  new IntersectionObserver((es) => { if (es[0].isIntersecting && !entered) { entered = true; firstEntrance(); } }, { threshold: 0.3 }).observe(host);
}

// ----- 대표 약력 모달 -----
const profileBtn = document.getElementById("profileBtn");
const profileModal = document.getElementById("profileModal");

if (profileBtn && profileModal) {
  const openModal = () => {
    profileModal.hidden = false;
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    profileModal.hidden = true;
    document.body.style.overflow = "";
  };

  profileBtn.addEventListener("click", openModal);
  profileModal.querySelectorAll("[data-close]").forEach((el) => el.addEventListener("click", closeModal));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !profileModal.hidden) closeModal();
  });
}

// ----- Contact form (mailto fallback) -----
const form = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

// 연락처 자동 하이픈 (010-XXXX-XXXX)
const phoneInput = document.getElementById("phone");
if (phoneInput) {
  phoneInput.addEventListener("input", () => {
    const v = phoneInput.value.replace(/\D/g, "").slice(0, 11);
    phoneInput.value =
      v.length < 4 ? v :
      v.length < 8 ? `${v.slice(0, 3)}-${v.slice(3)}` :
      `${v.slice(0, 3)}-${v.slice(3, 7)}-${v.slice(7)}`;
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const company = form.company.value.trim();
  const name = form.name.value.trim();
  const phone = form.phone.value.trim();
  const email = form.email.value.trim();
  const type = form.querySelector('input[name="type"]:checked');
  const refUrl = form.refUrl.value.trim();
  const message = form.message.value.trim();
  const agree = form.agree.checked;

  if (!name || !phone || !email) {
    formNote.textContent = "이름, 연락처, 이메일은 필수 입력 항목입니다.";
    return;
  }
  if (!type) {
    formNote.textContent = "문의 유형을 선택해주세요.";
    return;
  }
  if (!agree) {
    formNote.textContent = "개인정보 수집 및 이용에 동의해주세요.";
    return;
  }

  // 1) 서버(DB) 저장 시도 — Cloudflare에서 동작, 관리자 화면 '문의내역'에 쌓임
  try {
    const r = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ company, name, phone, email, type: type.value, ref_url: refUrl, message }),
    });
    if (r.ok) {
      form.reset();
      formNote.textContent = "문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다. 감사합니다!";
      return;
    }
  } catch { /* 정적 호스팅 등 API 미지원 환경 → 메일 폴백 */ }

  // 2) 폴백: 메일 앱 열기
  const subject = encodeURIComponent(`[문의] ${name}님 — ${type.value}`);
  const lines = [
    `업체명: ${company || "-"}`,
    `이름: ${name}`,
    `연락처: ${phone}`,
    `이메일: ${email}`,
    `문의 유형: ${type.value}`,
    refUrl ? `레퍼런스 링크: ${refUrl}` : "",
    "",
    message,
  ].filter(Boolean);
  const body = encodeURIComponent(lines.join("\n"));
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

  formNote.textContent = "메일 앱이 열립니다. 전송 버튼을 눌러 문의를 완료해주세요.";
});

// ============================================
// CMS(관리자 화면) 콘텐츠 연동
// /api/* 는 Cloudflare Pages Functions — 관리자에서 저장한 값만 반영하고,
// 저장된 적 없거나 API가 없는 환경(GitHub Pages)에서는 기본 콘텐츠 그대로 표시
// ============================================
let CONTACT_EMAIL = "ej74321@hanmail.net";

const escHtml = (s) => {
  const d = document.createElement("div");
  d.textContent = s ?? "";
  return d.innerHTML;
};

function applyContent(c, ov) {
  // 히어로
  if (ov.has("hero") && c.hero) {
    const h = c.hero;
    const mark = (line) => {
      const t = escHtml(line);
      return h.accent && line.includes(h.accent) ? t.replace(escHtml(h.accent), `<em>${escHtml(h.accent)}</em>`) : t;
    };
    const l1 = document.querySelector(".hero__line.delay-1");
    const l2 = document.querySelector(".hero__line.delay-2");
    if (l1 && h.line1) l1.innerHTML = mark(h.line1);
    if (l2 && h.line2) l2.innerHTML = mark(h.line2);
    const hd = document.querySelector(".hero__desc");
    if (hd && h.desc) hd.textContent = h.desc;
    // 배경 영상 교체 (Vimeo 링크 → 플레이어 src)
    if (h.video) {
      const m = String(h.video).match(/vimeo\.com\/(?:video\/)?(\d+)/) || String(h.video).match(/^(\d{6,})$/);
      const hv = document.querySelector(".hero__video");
      if (m && hv && !hv.src.includes(`/video/${m[1]}?`)) {
        hv.src = `https://player.vimeo.com/video/${m[1]}?background=1&autoplay=1&loop=1&muted=1&byline=0&title=0&portrait=0&controls=0&dnt=1`;
      }
    }
  }

  // About
  if (ov.has("about") && c.about) {
    const a = c.about;
    const at = document.querySelector(".about__title");
    if (at && a.title) at.innerHTML = escHtml(a.title).replace(/\n/g, "<br />");
    const ab = document.querySelector(".about__body");
    if (ab && Array.isArray(a.body) && a.body.length) {
      ab.innerHTML =
        a.body.map((p) => `<p>${escHtml(p)}</p>`).join("") +
        (a.punch ? `<p class="about__punch">${escHtml(a.punch)}</p>` : "");
    }
    const cn = document.querySelector(".ceo-name");
    if (cn && a.ceo_name) cn.innerHTML = `<em>CEO</em> ${escHtml(a.ceo_name)}`;
    const cr = document.querySelector(".ceo-role");
    if (cr && a.ceo_role) cr.textContent = a.ceo_role;
  }

  // 서비스 (아이콘은 기존 4종을 순환 재사용)
  if (ov.has("services") && Array.isArray(c.services) && c.services.length) {
    const rows = document.querySelector(".services__rows");
    if (rows) {
      const icons = [...rows.querySelectorAll(".svc-row__icon")].map((el) => el.outerHTML);
      rows.innerHTML = c.services
        .map(
          (s, i) => `
        <div class="svc-row reveal">
          <div class="svc-row__title"><h3>${escHtml(s.title)}</h3><p>${escHtml(s.en)}</p></div>
          <p class="svc-row__desc">${escHtml(s.desc)}</p>
          ${icons[i % icons.length] || ""}
        </div>`
        )
        .join("");
      rows.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));
    }
  }

  // WHY JJAM? (개수가 늘면 레이아웃 자동 조정)
  if (ov.has("why") && Array.isArray(c.why) && c.why.length) {
    const g = document.querySelector(".why__grid");
    if (g) {
      g.innerHTML = c.why
        .map(
          (w, i) => `
        <div class="why-item reveal">
          <span class="why-item__num">${String(i + 1).padStart(2, "0")}</span>
          <h3>${escHtml(w.title)}</h3><p>${escHtml(w.desc)}</p>
        </div>`
        )
        .join("");
      g.classList.toggle("n4", c.why.length === 4);
      g.classList.toggle("nmany", c.why.length > 4);
      g.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));
    }
  }

  // 포트폴리오 소제목
  if (ov.has("portfolio_heading") && c.portfolio_heading && c.portfolio_heading.sub) {
    const el = document.querySelector(".pf-sub");
    if (el) el.textContent = c.portfolio_heading.sub;
  }

  // 푸터
  if (ov.has("footer") && c.footer) {
    const f = c.footer;
    if (f.email) CONTACT_EMAIL = f.email;
    const colTitle = document.querySelector(".footer__col .footer__col-title");
    if (colTitle && f.company) {
      const m = f.company.match(/^(.*?)\s*(\(.+\))\s*$/);
      colTitle.innerHTML = m ? `${escHtml(m[1])} <span>${escHtml(m[2])}</span>` : escHtml(f.company);
    }
    const lists = document.querySelectorAll(".footer__list");
    if (lists[0]) lists[0].innerHTML = `<li><span>대표</span> ${escHtml(f.ceo)}</li><li><span>주소</span> ${escHtml(f.address)}</li>`;
    if (lists[1]) lists[1].innerHTML =
      `<li><span>전화</span> <a href="tel:${escHtml(f.phone)}">${escHtml(f.phone)}</a></li>` +
      `<li><span>메일</span> <a href="mailto:${escHtml(f.email)}">${escHtml(f.email)}</a></li>`;
  }
}

function applyClients(list) {
  if (!Array.isArray(list) || !list.length) return; // 등록 전에는 LOGO 자리표시 유지
  const grid = document.querySelector(".client__grid");
  if (!grid) return;
  grid.innerHTML = list
    .map((cl) => {
      const inner = cl.logo_url
        ? `<img src="${escHtml(cl.logo_url)}" alt="${escHtml(cl.name)}" loading="lazy" />`
        : `<span class="client__name">${escHtml(cl.name)}</span>`;
      return cl.link
        ? `<a class="client__logo" href="${escHtml(cl.link)}" target="_blank" rel="noopener">${inner}</a>`
        : `<div class="client__logo">${inner}</div>`;
    })
    .join("");
  const note = document.querySelector(".client__note");
  if (note) note.remove();
}

(async function bootCMS() {
  const j = (u) => fetch(u).then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))));
  const timeout = (ms) => new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), ms));
  let videos = PF_VIDEOS, cats = null;
  try {
    const [content, pf, clients] = await Promise.race([
      Promise.all([j("/api/content"), j("/api/portfolio"), j("/api/clients")]),
      timeout(4000),
    ]);
    const ov = new Set(content._overrides || []);
    applyContent(content, ov);
    applyClients(clients);
    if (Array.isArray(pf) && pf.length) videos = pf.map((p) => ({ id: p.video_id, t: p.title || "", c: p.category || "" }));
    if (ov.has("portfolio_categories") && Array.isArray(content.portfolio_categories)) cats = content.portfolio_categories;
  } catch { /* API 없음/실패 → 기본 콘텐츠로 진행 */ }
  initPortfolioSlider(videos, cats);
})();
