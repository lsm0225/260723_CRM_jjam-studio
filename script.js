/* ============================================
   J JAM STUDIO — Interactions
   ============================================ */

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

// ----- Count-up stats -----
const animateCount = (el) => {
  const target = Number(el.dataset.count);
  const duration = 1400;
  const start = performance.now();
  const tick = (now) => {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * eased);
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);
document.querySelectorAll("[data-count]").forEach((el) => statObserver.observe(el));

// ----- Active nav highlight -----
const sections = ["about", "services", "contact"].map((id) => document.getElementById(id));
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
