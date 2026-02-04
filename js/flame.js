const canvas = document.getElementById("fireCanvas");
const ctx = canvas.getContext("2d");

let w, h;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

/* FLAME PARTICLES */
const flames = [];
const MAX_FLAMES = 90;

/* CREATE STOVE-STYLE FLAME (BOTTOM ONLY) */
function createFlame() {
  return {
    x: w / 2 + (Math.random() * 220 - 110), // stove width
    y: h + Math.random() * 30,              // bottom origin
    r: Math.random() * 18 + 8,              // flame size
    vy: Math.random() * 2 + 1.5,            // upward speed
    alpha: 1,
    drift: Math.random() * 0.6 - 0.3        // sideways flicker
  };
}

/* ANIMATE */
function animate() {
  ctx.clearRect(0, 0, w, h);

  /* soft heat glow at bottom */
  ctx.fillStyle = "rgba(255,120,20,0.05)";
  ctx.fillRect(0, h - 140, w, 140);

  if (flames.length < MAX_FLAMES) {
    flames.push(createFlame());
  }

  for (let i = flames.length - 1; i >= 0; i--) {
    const f = flames[i];

    f.y -= f.vy;
    f.x += f.drift;
    f.alpha -= 0.008;

    const gradient = ctx.createRadialGradient(
      f.x, f.y, 0,
      f.x, f.y, f.r
    );

    /* realistic stove flame colors */
    gradient.addColorStop(0, `rgba(255,220,120,${f.alpha})`);
    gradient.addColorStop(0.4, `rgba(255,120,20,${f.alpha})`);
    gradient.addColorStop(0.7, `rgba(120,20,0,${f.alpha})`);
    gradient.addColorStop(1, `rgba(0,0,0,0)`);

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
    ctx.fill();

    if (f.alpha <= 0 || f.y + f.r < 0) {
      flames.splice(i, 1);
    }
  }

  requestAnimationFrame(animate);
}

animate();
