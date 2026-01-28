/* =====================================================
   ASIAN ICONIC RESTAURANTS
   CINEMATIC ANIMATION ENGINE
   Smooth Scroll + GSAP + Parallax + Cursor
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

if (!isTouchDevice && !prefersReducedMotion) {
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
gsap.registerPlugin(ScrollTrigger);

if (lenis) {
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
}

/* -----------------------------
   3. GLOBAL ANIMATION SETTINGS
------------------------------ */
const EASE = "power3.out";
const FAST = 0.7;
const NORMAL = 1.1;

/* Utility: Safe selector */
const $$ = (sel) => document.querySelectorAll(sel);

/* -----------------------------
   4. HERO CINEMATIC INTRO
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

if ($$(".hero-content .btn-primary").length) {
  gsap.from(".hero-content .btn-primary", {
    scale: 0.85,
    opacity: 0,
    delay: 0.5,
    duration: FAST,
    ease: "back.out(1.7)"
  });
}

/* -----------------------------
   5. GENERIC SECTION REVEALS
------------------------------ */
$$("section").forEach((section) => {
  gsap.from(section, {
    scrollTrigger: {
      trigger: section,
      start: "top 85%",
      toggleActions: "play none none reverse"
    },
    y: 80,
    opacity: 0,
    duration: NORMAL,
    ease: EASE
  });
});

/* -----------------------------
   6. COUNTRY / REGION STAGGER
------------------------------ */
if ($$(".country").length) {
  gsap.from(".country", {
    scrollTrigger: {
      trigger: ".asia-selector",
      start: "top 70%"
    },
    y: 60,
    opacity: 0,
    stagger: 0.15,
    duration: FAST,
    ease: EASE
  });
}

/* -----------------------------
   7. FEATURED RESTAURANT CARDS
------------------------------ */
if ($$(".featured-card").length) {
  gsap.from(".featured-card", {
    scrollTrigger: {
      trigger: ".featured",
      start: "top 70%"
    },
    scale: 0.92,
    opacity: 0,
    stagger: 0.2,
    duration: NORMAL,
    ease: EASE
  });
}

/* Card hover lift */
$$(".featured-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    gsap.to(card, { y: -14, duration: 0.35, ease: EASE });
  });
  card.addEventListener("mouseleave", () => {
    gsap.to(card, { y: 0, duration: 0.35, ease: EASE });
  });
});

/* -----------------------------
   8. SIGNATURE DISH HORIZONTAL SCROLL
------------------------------ */
if ($$(".dish-track").length) {
  gsap.to(".dish-track", {
    xPercent: -50,
    ease: "none",
    scrollTrigger: {
      trigger: ".signature",
      start: "top center",
      end: "bottom center",
      scrub: true
    }
  });
}

/* -----------------------------
   9. FOUNDER STORY REVEALS
------------------------------ */
if ($$(".founder-text h2").length) {
  gsap.from(".founder-text h2", {
    scrollTrigger: {
      trigger: ".founder",
      start: "top 75%"
    },
    x: -90,
    opacity: 0,
    duration: NORMAL,
    ease: EASE
  });
}

if ($$(".founder-text blockquote").length) {
  gsap.from(".founder-text blockquote", {
    scrollTrigger: {
      trigger: ".founder",
      start: "top 70%"
    },
    y: 40,
    opacity: 0,
    delay: 0.25,
    duration: FAST,
    ease: EASE
  });
}

/* -----------------------------
   10. PARALLAX FOOD IMAGERY
------------------------------ */
if (!isTouchDevice && !prefersReducedMotion) {
  $$(".parallax-img").forEach((img) => {
    gsap.fromTo(
      img,
      { y: -60 },
      {
        y: 60,
        ease: "none",
        scrollTrigger: {
          trigger: img,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    );
  });
}

/* -----------------------------
   11. CINEMATIC CURSOR EFFECT
------------------------------ */
const cursorGlow = document.querySelector(".cursor-glow");

if (!isTouchDevice && cursorGlow) {
  window.addEventListener("mousemove", (e) => {
    gsap.to(cursorGlow, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.6,
      ease: EASE
    });
  });

  const heroContent = document.querySelector(".hero-content");
  if (heroContent) {
    window.addEventListener("mousemove", (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;

      gsap.to(heroContent, {
        x,
        y,
        duration: 0.9,
        ease: EASE
      });
    });
  }
}

/* -----------------------------
   12. FILTER TAG MICRO-INTERACTION
------------------------------ */
$$(".filter-tags span").forEach((tag) => {
  tag.addEventListener("mouseenter", () => {
    gsap.to(tag, { scale: 1.08, duration: 0.2 });
  });
  tag.addEventListener("mouseleave", () => {
    gsap.to(tag, { scale: 1, duration: 0.2 });
  });
});

/* -----------------------------
   13. FINAL CTA EMPHASIS
------------------------------ */
if ($$(".cta h2").length) {
  gsap.from(".cta h2", {
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

/* -----------------------------
   14. FINAL REFRESH (SAFETY)
------------------------------ */
ScrollTrigger.refresh();

