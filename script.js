const canvas = document.querySelector("#field");
const ctx = canvas.getContext("2d");
const glow = document.querySelector(".cursor-glow");
const seatmapSection = document.querySelector(".seatmap-product");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let width = 0;
let height = 0;
let points = [];
let pointer = { x: window.innerWidth * 0.62, y: window.innerHeight * 0.42 };
let tick = 0;

function resize() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * ratio);
  canvas.height = Math.floor(height * ratio);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  const count = Math.max(42, Math.floor((width * height) / 18500));
  points = Array.from({ length: count }, (_, index) => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.34,
    vy: (Math.random() - 0.5) * 0.34,
    r: 1.2 + Math.random() * 2.8,
    hue: index % 4,
  }));
}

function palette(index) {
  return ["203,255,69", "25,216,189", "255,111,97", "20,118,255"][index];
}

function draw() {
  tick += 0.005;
  ctx.clearRect(0, 0, width, height);

  const glowGradient = ctx.createRadialGradient(pointer.x, pointer.y, 10, pointer.x, pointer.y, 360);
  glowGradient.addColorStop(0, "rgba(203,255,69,0.2)");
  glowGradient.addColorStop(0.38, "rgba(25,216,189,0.08)");
  glowGradient.addColorStop(1, "rgba(25,216,189,0)");
  ctx.fillStyle = glowGradient;
  ctx.fillRect(0, 0, width, height);

  points.forEach((point, index) => {
    point.x += point.vx + Math.sin(tick * 2 + index) * 0.04;
    point.y += point.vy + Math.cos(tick * 2 + index) * 0.04;

    if (point.x < -20) point.x = width + 20;
    if (point.x > width + 20) point.x = -20;
    if (point.y < -20) point.y = height + 20;
    if (point.y > height + 20) point.y = -20;

    const dx = pointer.x - point.x;
    const dy = pointer.y - point.y;
    const distance = Math.hypot(dx, dy);

    if (distance < 220) {
      point.x -= dx * 0.0008;
      point.y -= dy * 0.0008;
    }

    for (let next = index + 1; next < points.length; next += 1) {
      const other = points[next];
      const linkDistance = Math.hypot(point.x - other.x, point.y - other.y);
      if (linkDistance < 142) {
        ctx.strokeStyle = `rgba(${palette(point.hue)},${0.16 - linkDistance / 1200})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
        ctx.lineTo(other.x, other.y);
        ctx.stroke();
      }
    }

    ctx.fillStyle = `rgba(${palette(point.hue)},0.78)`;
    ctx.beginPath();
    ctx.arc(point.x, point.y, point.r, 0, Math.PI * 2);
    ctx.fill();
  });

  if (!prefersReducedMotion) {
    requestAnimationFrame(draw);
  }
}

function movePointer(event) {
  pointer = { x: event.clientX, y: event.clientY };
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
}

function revealOnScroll() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.16 }
  );

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}

function tiltCards() {
  document.querySelectorAll(".service-card, .case-card, .team-card").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${y * -4}deg) rotateY(${x * 5}deg) translateY(-3px)`;
    });

    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });
}

function updateMacbookOpen() {
  if (!seatmapSection) return;

  const rect = seatmapSection.getBoundingClientRect();
  const start = window.innerHeight * 1.08;
  const end = window.innerHeight * 0.18;
  const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
  seatmapSection.style.setProperty("--mac-open", progress.toFixed(3));
}

document.querySelector(".contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const button = event.currentTarget.querySelector("button");
  const originalText = button.textContent;
  button.textContent = "Запрос готов";
  button.disabled = true;

  window.setTimeout(() => {
    button.textContent = originalText;
    button.disabled = false;
    event.currentTarget.reset();
  }, 1800);
});

window.addEventListener("resize", resize);
window.addEventListener("pointermove", movePointer);
window.addEventListener("scroll", updateMacbookOpen, { passive: true });

resize();
revealOnScroll();
tiltCards();
updateMacbookOpen();
movePointer({ clientX: pointer.x, clientY: pointer.y });
draw();
