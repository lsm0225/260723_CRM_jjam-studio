/* ============================================
   J JAM STUDIO — Interactions
   ============================================ */

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
const sections = ["services", "about", "portfolio", "contact"].map((id) => document.getElementById(id));
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

// ----- Contact form (mailto fallback) -----
const form = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  const subject = encodeURIComponent(`[홈페이지 문의] ${name}님의 프로젝트 문의`);
  const body = encodeURIComponent(`이름: ${name}\n이메일: ${email}\n\n${message}`);
  window.location.href = `mailto:hello@jjamstudio.com?subject=${subject}&body=${body}`;

  formNote.textContent = "메일 앱이 열립니다. 전송 버튼을 눌러 문의를 완료해주세요.";
});
