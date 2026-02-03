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

  smoke.style.left = "50%";
  smoke.style.transform = "translateX(-50%)";

  smoke.animate(
    [
      { transform: "translate(-50%, 0)", opacity: 0 },
      { opacity: 1 },
      { transform: "translate(-50%, -400px)", opacity: 0 }
    ],
    {
      duration: 6000,
      easing: "ease-out"
    }
  );

  setTimeout(() => smoke.remove(), 6000);
}

  // Start smoke slowly
  setInterval(createSmoke, 1000);

});
