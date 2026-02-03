console.log("JS loaded");

/* ===============================
   HERO KITCHEN SMOKE (FINAL)
================================ */
document.addEventListener("DOMContentLoaded", () => {
  const smokeLayer = document.querySelector(".smoke-layer");
  if (!smokeLayer) return;

  function createSmoke() {
    const smoke = document.createElement("div");
    smoke.className = "smoke";
    smokeLayer.appendChild(smoke);

    const size = 220 + Math.random() * 180;
    const startX = Math.random() * window.innerWidth;
    const driftX = (Math.random() - 0.5) * 100;
    const duration = 9000 + Math.random() * 4000;

    smoke.style.width = size + "px";
    smoke.style.height = size + "px";
    smoke.style.left = startX + "px";

    smoke.animate(
      [
        { transform: "translate(0, 0)", opacity: 0 },
        { opacity: 0.55 },
        { transform: `translate(${driftX}px, -500px)`, opacity: 0 }
      ],
      {
        duration,
        easing: "ease-out"
      }
    );

    setTimeout(() => smoke.remove(), duration);
  }

  setInterval(createSmoke, 900);
});

