/* ═══════════════════════════════════════════════════════════════
   SEYIT AHMET TÜRKSOY — PORTFOLIO  ·  JS v2
   ═══════════════════════════════════════════════════════════════ */

// ── DOM References ────────────────────────────────────────────
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const yearEl = document.getElementById("year");
const scrollBar = document.getElementById("scrollProgress");
const siteHeader = document.getElementById("siteHeader");

// ── Year ──────────────────────────────────────────────────────
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// ── Mobile Menu ───────────────────────────────────────────────
if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
  navLinks.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => navLinks.classList.remove("open"))
  );
}

// ── Scroll Progress Bar ──────────────────────────────────────
function updateScrollProgress() {
  if (!scrollBar) return;
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
  scrollBar.style.width = progress + "%";
}

// ── Header shrink on scroll ──────────────────────────────────
function updateHeader() {
  if (!siteHeader) return;
  siteHeader.classList.toggle("scrolled", window.scrollY > 50);
}

// ── Scroll Reveal (IntersectionObserver) ─────────────────────
function initReveal() {
  const revealEls = document.querySelectorAll("[data-reveal]");
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.05 }
  );

  revealEls.forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.03}s`;
    observer.observe(el);
  });
}

// ── Typing Animation ─────────────────────────────────────────
function initTyping() {
  const el = document.getElementById("typedText");
  if (!el) return;

  const text =
    "Robotik sistemler, kontrol algoritmaları ve Li-ion batarya " +
    "teknolojileri üzerine çalışan; AR-GE, üretim ve saha deneyimini " +
    "bir araya getiren mekatronik odaklı mühendis adayı.";

  let idx = 0;
  const speed = 28; // ms per character

  function type() {
    if (idx < text.length) {
      el.textContent += text.charAt(idx);
      idx++;
      setTimeout(type, speed);
    }
  }
  // Start after a short delay for dramatic effect
  setTimeout(type, 600);
}

// ── Counter Animation ────────────────────────────────────────
function initCounters() {
  const counters = document.querySelectorAll("[data-count]");
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          animateCounter(el, target);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((c) => observer.observe(c));
}

function animateCounter(el, target) {
  const duration = 1600; // ms
  const start = performance.now();

  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target) + "+";
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// ── Active Nav Highlight ─────────────────────────────────────
function initActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const links = document.querySelectorAll(".nav-links a");
  if (!sections.length || !links.length) return;

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) current = section.getAttribute("id");
    });

    links.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });
}

// ── Smooth scroll for hash links ─────────────────────────────
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const id = this.getAttribute("href");
      if (id === "#") return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

// ── Video Playlist Cycler ────────────────────────────────────
function initVideoPlaylist() {
  const bgVideo = document.getElementById("bgVideo");
  if (!bgVideo) return;

  const videos = [
    "assets/factory-bg.mp4",     // Welding
    "assets/factory-bg-2.mp4",   // Robotics/Tech
    "assets/factory-bg-3.mp4"    // Automated line
  ];
  let currentIndex = 0;

  bgVideo.addEventListener("ended", () => {
    // Fade out slightly
    bgVideo.style.opacity = 0;

    setTimeout(() => {
      currentIndex = (currentIndex + 1) % videos.length;
      bgVideo.src = videos[currentIndex];
      bgVideo.play();

      // Fade back in
      setTimeout(() => {
        bgVideo.style.opacity = 0.75;
      }, 50);
    }, 400); // Wait for fade out
  });

  // Base transition for smooth fading
  bgVideo.style.transition = "opacity 0.4s ease";
}

// ── Init ──────────────────────────────────────────────────────
window.addEventListener("scroll", () => {
  updateScrollProgress();
  updateHeader();
});

document.addEventListener("DOMContentLoaded", () => {
  initReveal();
  initTyping();
  initCounters();
  initActiveNav();
  initSmoothScroll();
  initVideoPlaylist();
  updateScrollProgress();
  updateHeader();
});
