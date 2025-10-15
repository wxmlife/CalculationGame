<template>
  <!-- 背景画布：全屏 + 数字雨 -->
  <canvas id="homeCanvas" class="bg-canvas"></canvas>

  <!-- 浮在背景上的内容 -->
  <div class="content">
    <h1>Calculation Game</h1>
    <!-- 三句副标题循环，每次只显示一句 -->
    <transition name="fade" mode="out-in">
      <p class="subtitle" :key="subtitleIndex">
        {{ subtitles[subtitleIndex] }}
      </p>
    </transition>
    <button class="btn primary" @click="startGame">开始游戏</button>
  </div>

  <!-- 数学字符装饰（浮在背景） -->
  <div class="math-decoration">
    <span>3×7=21</span>
    <span>15+28=43</span>
    <span>100÷4=25</span>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const emit = defineEmits(["module-selected"]);

/* 1. 三句副标题循环 */
const subtitleIndex = ref(0);
const subtitles = [
  "欢迎来到数学计算游戏",
  "坚持练习，保持数感",
  "让数字成为你的朋友",
];
let subtitleTimer = null;

function startSubtitleLoop() {
  subtitleTimer = setInterval(() => {
    subtitleIndex.value = (subtitleIndex.value + 1) % subtitles.length;
  }, 3000);
}

function stopSubtitleLoop() {
  clearInterval(subtitleTimer);
}

/* 2. 原生数字雨背景 */
let canvas = null;
let ctx = null;
let animId = null;

function startDigitalRain() {
  canvas = document.getElementById("homeCanvas");
  ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const matrix = "0123456789+-×÷=<>";
  const drops = 120;
  const rain = [];

  for (let i = 0; i < drops; i++) {
    rain.push({
      x: Math.random() * canvas.width,
      y: Math.random() * -500,
      speed: Math.random() * 3 + 3,
      char: matrix.charAt(Math.floor(Math.random() * matrix.length)),
      size: Math.random() * 20 + 14,
      alpha: Math.random() * 100 + 100,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(255,255,255,0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    rain.forEach((d) => {
      ctx.fillStyle = `rgba(0,0,0,${d.alpha / 255})`;
      ctx.font = `${d.size}px monospace`;
      ctx.fillText(d.char, d.x, d.y);
      d.y += d.speed;
      d.alpha -= 0.5;
      if (Math.random() < 0.02)
        d.char = matrix.charAt(Math.floor(Math.random() * matrix.length));
      if (d.y > canvas.height || d.alpha <= 0) {
        d.y = Math.random() * -200;
        d.alpha = Math.random() * 100 + 100;
      }
    });
    animId = requestAnimationFrame(draw);
  }
  draw();
}

function stopDigitalRain() {
  if (animId) cancelAnimationFrame(animId);
  if (canvas) canvas.remove();
}

/* 3. 跳转到 AaddB 模块 */
function startGame() {
  emit("module-selected", "AaddB");
}

/* 4. 挂载 & 卸载 */
onMounted(() => {
  startSubtitleLoop();
  startDigitalRain();
  window.addEventListener("resize", () => {
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  });
});

onUnmounted(() => {
  stopSubtitleLoop();
  stopDigitalRain();
  window.removeEventListener("resize", () => {});
});
</script>

<style scoped>
/* ===== 黑白主题 + 全设备填满 ===== */
.home {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  font-family: "Helvetica Neue", Arial, sans-serif;
  background: #ffffff;
  color: #000000;
}

.bg-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.content {
  position: relative;
  z-index: 1;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 20px;
}

h1 {
  font-size: clamp(2rem, 8vw, 4rem);
  font-weight: 900;
  letter-spacing: 4px;
  margin: 0;
  background: linear-gradient(90deg, #000000 0%, #444444 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.subtitle {
  font-size: clamp(1rem, 3vw, 1.6rem);
  margin: 1rem 0 2rem;
  color: #666666;
  letter-spacing: 1px;
}

button {
  padding: clamp(0.5rem, 2vw, 0.75rem) clamp(1rem, 3vw, 2rem);
  font-size: clamp(0.9rem, 2.5vw, 1.1rem);
  border: 1px solid #000000;
  border-radius: 10%;
  cursor: pointer;
  transition: all 0.3s;
  background: #000000;
  color: #ffffff;
}

button:hover {
  background: #ffffff;
  color: #000000;
}

/* 数学字符装饰（浮在背景） */
.math-decoration {
  position: absolute;
  bottom: clamp(1rem, 3vw, 2rem);
  right: clamp(1rem, 3vw, 2rem);
  font-size: clamp(1rem, 3vw, 1.4rem);
  color: #888888;
  opacity: 0.6;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.math-decoration span {
  animation: float 6s infinite ease-in-out;
}

.math-decoration span:nth-child(2) {
  animation-delay: 1s;
}
.math-decoration span:nth-child(3) {
  animation-delay: 2s;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* 响应式：手机/PC 都能填满 */
@media (max-width: 768px) {
  h1 {
    font-size: clamp(1.8rem, 8vw, 2.5rem);
  }
  .subtitle {
    font-size: clamp(0.9rem, 4vw, 1.2rem);
  }
  button {
    padding: clamp(0.4rem, 2vw, 0.6rem) clamp(0.8rem, 3vw, 1.5rem);
  }
}
</style>
