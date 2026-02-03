console.log("JS loaded");

/* HERO TEXT FADE IN */
window.addEventListener("load", () => {
  document.querySelector(".hero-content").style.opacity = "1";
});

/* KITCHEN SMOKE EFFECT */
const smokeLayer = document.querySelector(".smoke-layer");

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

  setTimeout(() => smoke.remove(), 8000);
}

setInterval(createSmoke, 1000);
