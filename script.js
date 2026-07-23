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
const sections = ["about", "services", "portfolio", "client", "contact"].map((id) => document.getElementById(id));
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

// ----- 포트폴리오 영상 라이트박스 + 더보기 -----
const pfGrid = document.getElementById("portfolioGrid");
const pfMoreBtn = document.getElementById("pfMoreBtn");
const pfMoreWrap = document.getElementById("portfolioMore");
const videoModal = document.getElementById("videoModal");
const videoFrame = document.getElementById("videoFrame");

if (pfMoreBtn && pfGrid) {
  pfMoreBtn.addEventListener("click", () => {
    pfGrid.classList.add("is-expanded");
    if (pfMoreWrap) pfMoreWrap.style.display = "none";
  });
}

if (pfGrid && videoModal && videoFrame) {
  const openVideo = (id) => {
    videoFrame.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
    videoModal.hidden = false;
    document.body.style.overflow = "hidden";
  };
  const closeVideo = () => {
    videoModal.hidden = true;
    videoFrame.src = "about:blank";
    document.body.style.overflow = "";
  };
  pfGrid.querySelectorAll(".pf-item").forEach((btn) =>
    btn.addEventListener("click", () => openVideo(btn.dataset.id))
  );
  videoModal.querySelectorAll("[data-vclose]").forEach((el) =>
    el.addEventListener("click", closeVideo)
  );
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !videoModal.hidden) closeVideo();
  });
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
const fileInput = document.getElementById("file");
const fileName = document.getElementById("fileName");

if (fileInput && fileName) {
  fileInput.addEventListener("change", () => {
    const f = fileInput.files[0];
    if (!f) {
      fileName.hidden = true;
      return;
    }
    if (f.size > 50 * 1024 * 1024) {
      fileInput.value = "";
      fileName.hidden = false;
      fileName.textContent = "50MB를 초과하는 파일은 이메일/카카오톡으로 별도 전달해주세요.";
      return;
    }
    fileName.hidden = false;
    fileName.textContent = `첨부: ${f.name}`;
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const company = form.company.value.trim();
  const name = form.name.value.trim();
  const phone = form.phone.value.trim();
  const email = form.email.value.trim();
  const type = form.querySelector('input[name="type"]:checked');
  const message = form.message.value.trim();
  const agree = form.agree.checked;
  const attached = fileInput && fileInput.files[0] ? fileInput.files[0].name : "";

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

  const subject = encodeURIComponent(`[무료 상담신청] ${name}님 — ${type.value}`);
  const lines = [
    `업체명: ${company || "-"}`,
    `이름: ${name}`,
    `연락처: ${phone}`,
    `이메일: ${email}`,
    `문의 유형: ${type.value}`,
    attached ? `첨부 예정 파일: ${attached} (메일에 직접 첨부해주세요)` : "",
    "",
    message,
  ].filter(Boolean);
  const body = encodeURIComponent(lines.join("\n"));
  window.location.href = `mailto:hello@jjamstudio.com?subject=${subject}&body=${body}`;

  formNote.textContent = attached
    ? "메일 앱이 열립니다. 선택하신 파일을 메일에 첨부한 뒤 전송해주세요."
    : "메일 앱이 열립니다. 전송 버튼을 눌러 문의를 완료해주세요.";
});
