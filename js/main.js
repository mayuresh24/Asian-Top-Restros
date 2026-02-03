console.log("Golden sparks active");

document.addEventListener("DOMContentLoaded", () => {
  const sparkLayer = document.querySelector(".spark-layer");
  if (!sparkLayer) return;

  function createSparkBurst() {
    const burstX = Math.random() * window.innerWidth;
    const burstY = window.innerHeight * 0.65;

    const sparkCount = 14 + Math.floor(Math.random() * 10);

    for (let i = 0; i < sparkCount; i++) {
      const spark = document.createElement("div");
      spark.className = "spark";
      sparkLayer.appendChild(spark);

      const angle = Math.random() * Math.PI * 2;
      const distance = 80 + Math.random() * 120;
      const xMove = Math.cos(angle) * distance;
      const yMove = Math.sin(angle) * distance * -1;

      spark.style.left = burstX + "px";
      spark.style.top = burstY + "px";

      spark.animate(
        [
          { transform: "translate(0,0)", opacity: 0 },
          { opacity: 1 },
          {
            transform: `translate(${xMove}px, ${yMove}px)`,
            opacity: 0
          }
        ],
        {
          duration: 1800 + Math.random() * 800,
          easing: "ease-out"
        }
      );

      setTimeout(() => spark.remove(), 2600);
    }
  }

  // cinematic rhythm (not too frequent)
  setInterval(createSparkBurst, 2200);
});
