const canvas = document.getElementById("fireCanvas");
const ctx = canvas.getContext("2d");

let w, h;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const flames = [];

function createFlame() {
  return {
    x: Math.random() * w,
    y: h,
    r: Math.random() * 20 + 10,
    vy: Math.random() * 2 + 1,
    alpha: 1
  };
}

function animate() {
  ctx.clearRect(0, 0, w, h);

  if (flames.length < 120) flames.push(createFlame());

  flames.forEach((f, i) => {
    f.y -= f.vy;
    f.alpha -= 0.008;

    const gradient = ctx.createRadialGradient(
      f.x, f.y, 0,
      f.x, f.y, f.r
    );

    gradient.addColorStop(0, `rgba(255,200,50,${f.alpha})`);
    gradient.addColorStop(0.5, `rgba(255,80,0,${f.alpha})`);
    gradient.addColorStop(1, `rgba(0,0,0,0)`);

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
    ctx.fill();

    if (f.alpha <= 0) flames.splice(i, 1);
  });

  requestAnimationFrame(animate);
}

animate();
