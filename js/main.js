console.log("JS loaded");

/* ===============================
   WAIT FOR DOM
================================ */
document.addEventListener("DOMContentLoaded", () => {

  const smokeLayer = document.querySelector(".smoke-layer");

  // SAFETY CHECK
  if (!smokeLayer) {
    console.warn("Smoke layer not found. Skipping smoke animation.");
    return;
  }

  console.log("Smoke layer found. Starting smoke animation.");

  function createSmoke() {
    const smoke = document.createElement("div");
    smoke.className = "smoke";
    smokeLayer.appendChild(smoke);

    const size = 180 + Math.random() * 120;
    const x = Math.random() * window.innerWidth;

    smoke.style.width = size + "px";
    smoke.style.height = size + "px";
    smoke.style.left = x + "px";

    smoke.animate(
      [
        { transform: "translateY(0)", opacity: 0 },
        { opacity: 0.25 },
        { transform: "translateY(-600px)", opacity: 0 }
      ],
      {
        duration: 8000,
        easing: "ease-out"
      }
    );

    setTimeout(() => {
      smoke.remove();
    }, 8000);
  }

  // Start smoke slowly
  setInterval(createSmoke, 1000);

});
