/* =====================================================
   ASIAN ICONIC RESTAURANTS
   CINEMATIC ANIMATION ENGINE
===================================================== */

/* -----------------------------
   0. DEVICE & PERFORMANCE GUARDS
------------------------------ */
const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* -----------------------------
   1. LENIS-STYLE SMOOTH SCROLL
------------------------------ */
let lenis;

if (!isTouchDevice && !prefersReducedMotion && typeof Lenis !== "undefined") {
  lenis = new Lenis({
    duration: 1.25,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

/* -----------------------------
   2. GSAP SETUP
------------------------------ */
if (typeof gsap !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  if (lenis) {
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  }
}

/* -----------------------------
   3. GLOBAL SETTINGS
------------------------------ */
const EASE = "power3.out";
const FAST = 0.7;
const NORMAL = 1.1;
const $$ = (sel) => document.querySelectorAll(sel);

/* -----------------------------
   4. HERO INTRO ANIMATION
------------------------------ */
if ($$(".hero-content h1").length) {
  gsap.from(".hero-content h1", {
    y: 120,
    opacity: 0,
    duration: 1.4,
    ease: EASE
  });
}

if ($$(".hero-content p").length) {
  gsap.from(".hero-content p", {
    y: 80,
    opacity: 0,
    delay: 0.25,
    duration: NORMAL,
    ease: EASE
  });
}

if ($$(".hero-btn").length) {
  gsap.from(".hero-btn", {
    scale: 0.9,
    opacity: 0,
    delay: 0.45,
    duration: FAST,
    ease: "back.out(1.6)"
  });
}

/* -----------------------------
   5. GENERIC SECTION REVEALS
------------------------------ */
$$("section").forEach((section) => {
  if (!section.classList.contains("hero")) {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: "top 85%"
      },
      y: 60,
      opacity: 0,
      duration: NORMAL,
      ease: EASE
    });
  }
});

/* -----------------------------
   6. REGION / COUNTRY CARDS
------------------------------ */
if ($$(".country-card").length) {
  gsap.from(".country-card", {
    scrollTrigger: {
      trigger: ".country-grid",
      start: "top 75%"
    },
    y: 50,
    opacity: 0,
    stagger: 0.12,
    duration: FAST,
    ease: EASE
  });
}

/* -----------------------------
   7. FEATURED CARDS HOVER
------------------------------ */
$$(".featured-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    gsap.to(card, { y: -10, duration: 0.3, ease: EASE });
  });
  card.addEventListener("mouseleave", () => {
    gsap.to(card, { y: 0, duration: 0.3, ease: EASE });
  });
});

/* -----------------------------
   8. FOUNDER QUOTE REVEAL
------------------------------ */
if ($$(".founder-quote").length) {
  gsap.from(".founder-quote", {
    scrollTrigger: {
      trigger: ".founder-quote",
      start: "top 80%"
    },
    y: 40,
    opacity: 0,
    duration: NORMAL,
    ease: EASE
  });
}

/* -----------------------------
   9. FILTER TAG MICRO EFFECT
------------------------------ */
$$(".filter-tags span").forEach((tag) => {
  tag.addEventListener("mouseenter", () => {
    gsap.to(tag, { scale: 1.06, duration: 0.2 });
  });
  tag.addEventListener("mouseleave", () => {
    gsap.to(tag, { scale: 1, duration: 0.2 });
  });
});

/* -----------------------------
   10. CTA EMPHASIS
------------------------------ */
if ($$(".cta .hero-btn").length) {
  gsap.from(".cta .hero-btn", {
    scrollTrigger: {
      trigger: ".cta",
      start: "top 80%"
    },
    scale: 0.95,
    opacity: 0,
    duration: FAST,
    ease: EASE
  });
}

/* =====================================================
   11. HERO KITCHEN SMOKE ANIMATION (IDEA 6)
===================================================== */

const smokeLayer = document.querySelector(".smoke-layer");

if (smokeLayer && !prefersReducedMotion) {

  function createSmoke() {
    const smoke = document.createElement("div");
    smoke.className = "smoke";
    smokeLayer.appendChild(smoke);

    const startX = Math.random() * window.innerWidth;
    const driftX = (Math.random() - 0.5) * 120;
    const size = 180 + Math.random() * 140;
    const duration = 6000 + Math.random() * 4000;

    smoke.style.width = size + "px";
    smoke.style.height = size + "px";
    smoke.style.left = startX + "px";

    smoke.animate(
      [
        { transform: "translate(0, 0)", opacity: 0 },
        { opacity: 0.22 },
        { transform: `translate(${driftX}px, -600px)`, opacity: 0 }
      ],
      {
        duration: duration,
        easing: "ease-out"
      }
    );

    setTimeout(() => smoke.remove(), duration);
  }

  // slow & calm smoke
  setInterval(createSmoke, 1000);
}

/* -----------------------------
   12. FINAL SAFETY REFRESH
------------------------------ */
if (typeof ScrollTrigger !== "undefined") {
  ScrollTrigger.refresh();
}
