console.log("JS loaded");

/* ===============================
   HERO KITCHEN SMOKE (FINAL)
================================ */
document.addEventListener("DOMContentLoaded", () => {

  const smokeLayer = document.querySelector(".smoke-layer");

  // SAFETY: if hero or smoke layer missing, do nothing
  if (!smokeLayer) {
    console.warn("Smoke layer not found. Smoke animation skipped.");
    return;
  }

  function createSmoke() {
    const smoke = document.createElement("div");
    smoke.className = "smoke";
    smokeLayer.appendChild(smoke);

    const size = 200 + Math.random() * 160;
    const startX = Math.random() * window.innerWidth;
    const driftX = (Math.random() - 0.5) * 140;
    const duration = 8000 + Math.random() * 4000;

    smoke.style.width = size + "px";
    smoke.style.height = size + "px";
    smoke.style.left = startX + "px";

    smoke.animate(
      [
        {
          transform: "translate(0, 0)",
          opacity: 0
        },
        {
          opacity: 0.35
        },
        {
          transform: `translate(${driftX}px, -650px)`,
          opacity: 0
        }
      ],
      {
        duration: duration,
        easing: "ease-out"
      }
    );

    setTimeout(() => {
      smoke.remove();
    }, duration);
  }

  // Gentle, cinematic frequency
  setInterval(createSmoke, 1200);
});
