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

(function initPortfolioSlider() {
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
    s.appendChild(f); s.classList.add("playing");
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
      `<button class="pf-slide" data-id="${v.id}"><img src="https://i.ytimg.com/vi/${v.id}/maxresdefault.jpg" onerror="this.onerror=null;this.src='https://i.ytimg.com/vi/${v.id}/hqdefault.jpg'" alt=""><span class="pf-play"></span><span class="pf-stit">${v.t}</span></button>`
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

  // 탭 구성
  const cats = ["전체", ...new Set(PF_VIDEOS.map((v) => v.c))];
  tabsEl.innerHTML = cats.map((c, i) => `<button class="pf-tab${i === 0 ? " on" : ""}" data-c="${c}">${c}</button>`).join("");
  const listFor = (c) => (c === "전체" ? PF_VIDEOS : PF_VIDEOS.filter((v) => v.c === c));

  // 더보기 → 그리드 토글
  const section = document.getElementById("portfolio");
  const grid = document.getElementById("pfGrid");
  const moreBtn = document.getElementById("pfMore");
  let currentList = PF_VIDEOS, gridMode = false;
  function renderGrid(list) {
    grid.innerHTML = list.map((v, i) =>
      `<button class="pf-gtile" data-id="${v.id}" style="animation-delay:${(i * 0.05).toFixed(2)}s"><img src="https://i.ytimg.com/vi/${v.id}/maxresdefault.jpg" onerror="this.onerror=null;this.src='https://i.ytimg.com/vi/${v.id}/hqdefault.jpg'" alt=""><span class="pf-gplay"></span><span class="pf-gtit">${v.t}</span></button>`
    ).join("");
    grid.querySelectorAll(".pf-gtile").forEach((t) => t.addEventListener("click", () => {
      if (t.querySelector("iframe")) return;
      const f = document.createElement("iframe");
      f.src = `https://www.youtube-nocookie.com/embed/${t.dataset.id}?autoplay=1&mute=1&rel=0&playsinline=1`;
      f.allow = "autoplay; fullscreen; picture-in-picture"; f.allowFullscreen = true;
      t.appendChild(f); t.classList.add("playing");
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
    if (gridMode) renderGrid(currentList); else switchTo(currentList);
  });

  // 초기: 전체 목록 빌드 + 활성 세팅, 슬라이드는 화면 오른쪽 밖에서 투명 대기
  buildTrack(PF_VIDEOS);
  setActive(); center(); track.classList.remove("is-sliding");
  (function preHide() { track.style.transition = "none"; track.style.transform = `translateX(${targetX() + vpW()}px)`; slides().forEach((s) => (s.style.opacity = "0")); void track.offsetWidth; track.style.transition = ""; })();
  window.addEventListener("resize", center);
  new IntersectionObserver((es) => { if (es[0].isIntersecting && !entered) { entered = true; firstEntrance(); } }, { threshold: 0.3 }).observe(host);
})();

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

form.addEventListener("submit", (e) => {
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
  window.location.href = `mailto:ej74321@hanmail.net?subject=${subject}&body=${body}`;

  formNote.textContent = "메일 앱이 열립니다. 전송 버튼을 눌러 문의를 완료해주세요.";
});
